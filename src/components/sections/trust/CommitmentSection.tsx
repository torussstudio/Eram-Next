import { useEffect, useRef, useState, RefObject, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

type TypewriterPhase = "idle" | "typing" | "done";

// ─── Keyframes & Global Styles ───────────────────────────────────────────────

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes ink-drop {
    0%   { opacity: 0; filter: blur(14px) brightness(1.3); transform: scale(1.08) translateY(8px); }
    40%  { opacity: 0.75; filter: blur(3px) brightness(1.05); transform: scale(1.02) translateY(2px); }
    70%  { opacity: 0.95; filter: blur(0.5px); transform: scale(1.002) translateY(0); }
    100% { opacity: 1; filter: blur(0) brightness(1); transform: scale(1) translateY(0); }
  }
  @keyframes fade-up {
    0%   { opacity: 0; transform: translateY(28px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes dot-pulse {
    0%, 100% { transform: scale(1); opacity: 0.85; }
    50%       { transform: scale(1.6); opacity: 1; }
  }
  @keyframes shimmer {
    0%   { left: -80%; }
    100% { left: 130%; }
  }
  @keyframes cursor-blink {
    0%,  49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes pulse-ring-cs {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes scanlines-drift {
    0%   { background-position: 0 0; }
    100% { background-position: 0 40px; }
  }

  .eram-section * { box-sizing: border-box; margin: 0; padding: 0; }
  .eram-section { font-family: 'DM Sans', sans-serif; background: #F4EDE3; overflow: hidden; }
`;

function injectStyles(): void {
  if (document.getElementById("eram-styles")) return;
  const el = document.createElement("style");
  el.id = "eram-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15): boolean {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return visible;
}

function useCounter(target: number, active: boolean, delayMs = 0): number {
  const [val, setVal] = useState<number>(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const DURATION = 1800;

    const timer = setTimeout(() => {
      let start: number | null = null;

      const tick = (ts: number): void => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - p, 5); // quintic ease-out
        setVal(Math.round(eased * target));
        if (p < 1) {
          raf.current = requestAnimationFrame(tick);
        }
      };

      raf.current = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [active, target, delayMs]);

  return val;
}

// ─── InkHeading ──────────────────────────────────────────────────────────────

interface InkHeadingProps {
  text: string;
  active: boolean;
}

function InkHeading({ text, active }: InkHeadingProps) {
  const words = text.split(" ");

  const headingStyle: CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.2rem, 3.4vw, 3.5rem)",
    fontWeight: 700,
    lineHeight: 1.18,
    color: "#1a1208",
    letterSpacing: "-0.01em",
  };

  return (
    <h2 style={headingStyle}>
      {words.map((word, i) => {
        const wordStyle: CSSProperties = {
          display: "inline-block",
          marginRight: "0.2em",
          willChange: "transform, opacity, filter",
          animation: active
            ? `ink-drop 0.85s cubic-bezier(.16,1,.3,1) ${0.22 + i * 0.06}s both`
            : "none",
          opacity: active ? undefined : 0,
        };
        return (
          <span key={i} style={wordStyle}>
            {word}
          </span>
        );
      })}
    </h2>
  );
}

// ─── TypewriterQuote ─────────────────────────────────────────────────────────

interface TypewriterQuoteProps {
  text: string;
  active: boolean;
}

function TypewriterQuote({ text, active }: TypewriterQuoteProps) {
  const [displayed, setDisplayed] = useState<string>("");
  const [phase, setPhase] = useState<TypewriterPhase>("idle");

  useEffect(() => {
    if (!active) return;
    let i = 0;
    setDisplayed("");
    setPhase("typing");

    const delay = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setPhase("done");
        }
      }, 38);
      return () => clearInterval(iv);
    }, 850);

    return () => clearTimeout(delay);
  }, [active, text]);

  const wrapStyle: CSSProperties = {
    marginTop: "1.3rem",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    fontSize: "15px",
    color: "rgba(26,18,8,0.5)",
    letterSpacing: "0.015em",
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    opacity: active ? 1 : 0,
    transition: "opacity 0.4s ease 0.55s",
  };

  const cursorStyle: CSSProperties = {
    display: "inline-block",
    width: "1.5px",
    height: "1em",
    background: "#8B1E1E",
    marginLeft: "1px",
    verticalAlign: "text-bottom",
    animation: phase === "typing" ? "cursor-blink 0.65s step-end infinite" : "none",
    opacity: phase === "done" ? 0 : 1,
    transition: phase === "done" ? "opacity 0.3s ease 0.4s" : "none",
  };

  return (
    <p style={wrapStyle}>
      {displayed}
      <span style={cursorStyle} />
    </p>
  );
}

// ─── SectionLabel ────────────────────────────────────────────────────────────

interface SectionLabelProps {
  active: boolean;
}

function SectionLabel({ active }: SectionLabelProps) {
  const lineStyle: CSSProperties = {
    display: "block",
    width: "28px",
    height: "1.5px",
    background: "#8B1E1E",
    transformOrigin: "left",
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transition: "transform 0.5s cubic-bezier(.22,1,.36,1) 0.05s",
  };

  const textStyle: CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "rgba(26,18,8,0.6)",
    fontWeight: 500,
    opacity: active ? 1 : 0,
    transform: active ? "translateX(0)" : "translateX(12px)",
    transition: "opacity 0.5s ease 0.18s, transform 0.5s cubic-bezier(.22,1,.36,1) 0.18s",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
      <span style={lineStyle} />
      <span style={textStyle}>Our Commitment</span>
    </div>
  );
}

// ─── RevealParagraph ─────────────────────────────────────────────────────────

interface RevealParagraphProps {
  text: string;
  index: number;
  active: boolean;
}

function RevealParagraph({ text, index, active }: RevealParagraphProps) {
  const pStyle: CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    lineHeight: 1.88,
    color: "rgba(26,18,8,0.72)",
    fontWeight: 300,
    animation: active
      ? `fade-up 0.72s cubic-bezier(.22,1,.36,1) ${0.28 + index * 0.18}s both`
      : "none",
    opacity: active ? undefined : 0,
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <p style={pStyle}>{text}</p>
    </div>
  );
}

// ─── AnimatedDivider ─────────────────────────────────────────────────────────

interface AnimatedDividerProps {
  active: boolean;
}

function AnimatedDivider({ active }: AnimatedDividerProps) {
  const armTransition = active
    ? "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1) 0.1s"
    : "none";

  const sideDotStyle = (offset: number): CSSProperties => ({
    opacity: active ? 1 : 0,
    transform: active ? "scale(1)" : "scale(0)",
    transformOrigin: `${550 + offset}px 12px`,
    transition: active
      ? `opacity 0.4s ease ${0.12 + Math.abs(offset) / 100}s, transform 0.5s cubic-bezier(.34,1.56,.64,1) ${0.12 + Math.abs(offset) / 100}s`
      : "none",
  });

  const centerDotStyle: CSSProperties = {
    opacity: active ? 1 : 0,
    transform: active ? "scale(1)" : "scale(0)",
    transformOrigin: "550px 12px",
    animation: active ? "dot-pulse 2.5s ease-in-out 1.2s infinite" : "none",
    transition: active
      ? "opacity 0.4s ease 0.06s, transform 0.5s cubic-bezier(.34,1.56,.64,1) 0.06s"
      : "none",
  };

  return (
    <svg width="100%" height="24" viewBox="0 0 1100 24" preserveAspectRatio="none" style={{ display: "block" }}>
      <line
        x1="550" y1="12" x2="0" y2="12"
        stroke="rgba(139,30,30,0.2)" strokeWidth="0.8"
        strokeDasharray="550" strokeDashoffset={active ? 0 : 550}
        style={{ transition: armTransition }}
      />
      <line
        x1="550" y1="12" x2="1100" y2="12"
        stroke="rgba(139,30,30,0.2)" strokeWidth="0.8"
        strokeDasharray="550" strokeDashoffset={active ? 0 : 550}
        style={{ transition: armTransition }}
      />
      {([-20, 20] as number[]).map((offset) => (
        <circle key={offset} cx={550 + offset} cy="12" r="1.5" fill="rgba(139,30,30,0.38)" style={sideDotStyle(offset)} />
      ))}
      <circle cx="550" cy="12" r="3.5" fill="#8B1E1E" style={centerDotStyle} />
    </svg>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  stat: StatItem;
  index: number;
  active: boolean;
}

function StatCard({ stat, index, active }: StatCardProps) {
  const count = useCounter(stat.value, active, index * 150 + 280);
  const [hovered, setHovered] = useState<boolean>(false);
  const [shimmerKey, setShimmerKey] = useState<number>(0);
  const [showShimmer, setShowShimmer] = useState<boolean>(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      setShowShimmer(true);
      setShimmerKey((k) => k + 1);
    }, index * 150 + 280);
    return () => clearTimeout(t);
  }, [active, index]);

  const cardStyle: CSSProperties = {
    position: "relative",
    textAlign: "center",
    padding: "0 16px",
    cursor: "default",
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${index * 0.13}s, transform 0.65s cubic-bezier(.34,1.56,.64,1) ${index * 0.13}s`,
  };

  const dividerStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: "52px",
    width: "1px",
    background: "rgba(255,255,255,0.1)",
    display: "block",
  };

  const numStyle: CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.9rem, 2.5vw, 2.7rem)",
    fontWeight: 700,
    lineHeight: 1,
    color: hovered ? "#c0392b" : "#fff",
    textShadow: hovered ? "0 0 22px rgba(192,57,43,0.3)" : "none",
    transition: "color 0.28s ease, text-shadow 0.28s ease",
    letterSpacing: "-0.01em",
  };

  const labelStyle: CSSProperties = {
    marginTop: "0.85rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    lineHeight: 1.65,
    padding: "0 8px",
    color: active ? "rgba(255,255,255,0.48)" : "transparent",
    transition: `color 0.8s ease ${index * 0.13 + 0.45}s`,
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={cardStyle}
    >
      {index !== 0 && <span style={dividerStyle} />}

      {hovered &&
        ([0, 1] as number[]).map((ri) => (
          <span
            key={ri}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "52px",
              height: "52px",
              marginLeft: "-26px",
              marginTop: "-26px",
              borderRadius: "50%",
              border: `1px solid rgba(192,57,43,${0.5 - ri * 0.2})`,
              pointerEvents: "none",
              animation: `pulse-ring-cs 0.85s ease-out ${ri * 0.14}s forwards`,
            }}
          />
        ))}

      <div style={{ position: "relative", display: "inline-block", overflow: "hidden" }}>
        <h3 style={numStyle}>
          {count}{stat.suffix}
        </h3>

        {showShimmer && (
          <span
            key={shimmerKey}
            onAnimationEnd={() => setShowShimmer(false)}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
              pointerEvents: "none",
              animation: "shimmer 0.75s ease-out forwards",
            }}
          />
        )}
      </div>

      <p style={labelStyle}>{stat.label}</p>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { value: 30,   suffix: "+", label: "Medical Camps Conducted" },
  { value: 4000, suffix: "+", label: "Cataract Surgeries Completed" },
  { value: 50,   suffix: "+", label: "Homes Built for Families" },
  { value: 242,  suffix: "",  label: "BPL Families Supported" },
];

const PARAGRAPHS: string[] = [
  "ERAM Educational & Welfare Trust advances its mission through structured interventions across education, healthcare, rehabilitation, environmental resilience, youth development, and community infrastructure.",
  "Each initiative begins with a clearly identified need and evolves into a designed response — planned, executed, and monitored with institutional discipline. Whether restoring water systems, strengthening public health access, or expanding structured education, the Trust approaches community development as a long-term responsibility.",
  "These efforts form a cohesive model of engagement — one that addresses access gaps, strengthens local systems, and creates measurable, lasting outcomes for the communities we serve.",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CommitmentSection() {
  const topRef   = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const topVisible   = useInView(topRef,   0.12);
  const statsVisible = useInView(statsRef, 0.12);

  useEffect(() => {
    injectStyles();
  }, []);

  const statsStripStyle: CSSProperties = {
    background: "linear-gradient(135deg, #1a0e0e 0%, #2c1010 50%, #1a1208 100%)",
    position: "relative",
    overflow: "hidden",
  };

  const scanlinesStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    background:
      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
    animation: "scanlines-drift 8s linear infinite",
  };

  const statsGridStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "clamp(40px, 6vw, 64px) clamp(16px, 4vw, 40px)",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 0,
  };

  return (
    <section className="eram-section">

      {/* ── Top Content ── */}
      <div
        ref={topRef}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 40px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          {/* Left column */}
          <div>
            <SectionLabel active={topVisible} />
            <InkHeading text="Our Commitment To Structured Responsibility" active={topVisible} />
            <TypewriterQuote text='"Commitment Beyond Institutions"' active={topVisible} />
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {PARAGRAPHS.map((text, i) => (
              <RevealParagraph key={i} text={text} index={i} active={topVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}