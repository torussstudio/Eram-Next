import { useEffect, useRef, useState } from "react";

const KEYFRAMES = `
  @keyframes ink-drop {
    0%   { opacity:0; filter:blur(16px) saturate(0) brightness(1.4);
           transform:scale(1.12) translateY(10px) skewX(-2deg); letter-spacing:.22em; }
    35%  { opacity:.7; filter:blur(4px) saturate(.3) brightness(1.1);
           transform:scale(1.03) translateY(2px) skewX(-.5deg); letter-spacing:.06em; }
    65%  { opacity:.95; filter:blur(1px) saturate(.8) brightness(1.02);
           transform:scale(1.005) translateY(0) skewX(0); letter-spacing:.01em; }
    100% { opacity:1; filter:blur(0) saturate(1) brightness(1);
           transform:scale(1) translateY(0) skewX(0); letter-spacing:normal; }
  }
  @keyframes pulse-ring {
    0%   { transform:scale(.8); opacity:.8; }
    100% { transform:scale(2.4); opacity:0; }
  }
  @keyframes shimmer-pass {
    0%   { left:-60%; }
    100% { left:120%; }
  }
  @keyframes scanline-drift {
    0%   { background-position:0 0; }
    100% { background-position:0 40px; }
  }
  @keyframes dot-breathe {
    0%,100% { transform:scale(1); opacity:.9; }
    50%     { transform:scale(1.5); opacity:1; }
  }
  @keyframes cursor-blink {
    0%,49%   { opacity:1; }
    50%,100% { opacity:0; }
  }

  .animate-ink-drop    { animation: ink-drop var(--dur,.9s) cubic-bezier(.16,1,.3,1) var(--d,0s) both; }
  .animate-pulse-ring  { animation: pulse-ring .9s ease-out var(--d,0s) forwards; }
  .animate-shimmer     { animation: shimmer-pass .8s ease-out forwards; }
  .animate-scanlines   { animation: scanline-drift 8s linear infinite; }
  .animate-dot-breathe { animation: dot-breathe 2.5s ease-in-out var(--d,1.2s) infinite; }
  .animate-cursor      { animation: cursor-blink .65s step-end infinite; }

  .transition-spring    { transition-timing-function: cubic-bezier(.22,1,.36,1); }
  .transition-overshoot { transition-timing-function: cubic-bezier(.34,1.56,.64,1); }
  .delay-var            { transition-delay: var(--d,0s); }
`;

function injectStyles() {
  if (document.getElementById("eram-kf")) return;
  const s = document.createElement("style");
  s.id = "eram-kf";
  s.textContent = KEYFRAMES;
  document.head.appendChild(s);
}

/* ── useInView ── */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ── useCounter — quintic ease-out ── */
function useCounter(target: number, active: boolean, delayMs = 0) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      let start: number | null = null;
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 2000, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 5)) * target));
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delayMs);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, delayMs]);
  return val;
}

/* ─────────────────────────────────────────────
   InkHeading — word-by-word blur/skew reveal
───────────────────────────────────────────── */
function InkHeading({ text, active }: { text: string; active: boolean }) {
  return (
    <h2 className="font-display text-[clamp(2.6rem,3.6vw,3.8rem)] leading-[1.18] text-[#1a1a1a] m-0 tracking-[-0.01em]">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className={[
            "inline-block mr-[0.22em] will-change-[transform,opacity,filter]",
            active ? "animate-ink-drop" : "opacity-0",
          ].join(" ")}
          style={{ "--d": `${0.25 + i * 0.065}s` } as React.CSSProperties}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}

/* ─────────────────────────────────────────────
   TypewriterQuote
───────────────────────────────────────────── */
function TypewriterQuote({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | typing | done

  useEffect(() => {
    if (!active) return;
    let i = 0;
    setDisplayed("");
    setPhase("typing");
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setPhase("done"); }
      }, 36);
      return () => clearInterval(iv);
    }, 900);
    return () => clearTimeout(t);
  }, [active, text]);

  return (
    <p
      className={[
        "mt-[1.4rem] font-rethink text-[14.5px] italic tracking-[0.02em] text-black/55",
        "inline-flex items-center gap-px select-none",
        "transition-opacity duration-[400ms] ease-in delay-[600ms]",
        active ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      {displayed}
      <span
        className={[
          "inline-block w-[1.5px] h-[1em] bg-[#8B1E1E] ml-px align-text-bottom transition-opacity",
          phase === "typing" ? "animate-cursor opacity-100" : "",
          phase === "done"   ? "opacity-0 duration-[400ms] delay-300" : "",
          phase === "idle"   ? "opacity-100" : "",
        ].join(" ")}
      />
    </p>
  );
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

/* ─────────────────────────────────────────────
   StatCard
───────────────────────────────────────────── */
function StatCard({ stat, index, active }: { stat: StatItem; index: number; active: boolean }) {
  const count = useCounter(stat.value, active, index * 140 + 300);
  const [hovered, setHovered] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setShimmer(true), index * 140 + 300);
    return () => clearTimeout(t);
  }, [active, index]);

  const staggerDelay = `${index * 0.13}s`;
  const labelDelay   = `${index * 0.13 + 0.45}s`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "relative text-center cursor-default px-4 will-change-[transform,opacity]",
        "transition-[opacity,transform] duration-700 transition-overshoot delay-var",
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]",
      ].join(" ")}
      style={{ "--d": staggerDelay } as React.CSSProperties}
    >
      {/* Divider — md+ only, non-first cards */}
      {index !== 0 && (
        <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-14 w-px bg-white/[0.09]" />
      )}

      {/* Pulse rings */}
      {hovered && (
        <>
          <span className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 rounded-full border border-[rgba(192,57,43,0.5)] pointer-events-none animate-pulse-ring" />
          <span
            className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 rounded-full border border-[rgba(192,57,43,0.3)] pointer-events-none animate-pulse-ring"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          />
        </>
      )}

      {/* Number + shimmer */}
      <div className="relative inline-block overflow-hidden">
        <h3
          className={[
            "font-rethink text-[clamp(2rem,2.6vw,2.9rem)] leading-none m-0  tracking-[-0.01em]",
            "transition-[color,text-shadow] duration-300",
            hovered
              ? "text-[#c0392b] [text-shadow:0_0_24px_rgba(192,57,43,0.35)]"
              : "text-white",
          ].join(" ")}
        >
          {count}{stat.suffix}
        </h3>

        {shimmer && (
          <span
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none animate-shimmer"
            onAnimationEnd={() => setShimmer(false)}
          />
        )}
      </div>

      {/* Label */}
      <p
        className={[
          "mt-[0.85rem] text-[11px] tracking-[0.22em] uppercase leading-[1.65] px-2 ",
          "transition-colors duration-[900ms] delay-var",
          active ? "text-white/[0.52]" : "text-transparent",
        ].join(" ")}
        style={{ "--d": labelDelay } as React.CSSProperties}
      >
        {stat.label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AnimatedDivider — outward draw from center
   SVG transitions can't use Tailwind directly,
   so we keep only the minimal JS-driven styles.
───────────────────────────────────────────── */
function AnimatedDivider({ active }: { active: boolean }) {
  const armTransition = active
    ? "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1) 0.1s"
    : "none";

  return (
    <svg width="100%" height="24" viewBox="0 0 1100 24" preserveAspectRatio="none" className="block">
      <line x1="550" y1="12" x2="0"    y2="12" stroke="rgba(139,30,30,0.22)" strokeWidth="0.8" strokeDasharray="550" strokeDashoffset={active ? 0 : 550} style={{ transition: armTransition }} />
      <line x1="550" y1="12" x2="1100" y2="12" stroke="rgba(139,30,30,0.22)" strokeWidth="0.8" strokeDasharray="550" strokeDashoffset={active ? 0 : 550} style={{ transition: armTransition }} />

      <circle
        cx="550" cy="12" r="3" fill="#8B1E1E"
        className={active ? "animate-dot-breathe" : ""}
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0)",
          transformOrigin: "550px 12px",
          transition: active
            ? "opacity .4s ease .05s, transform .5s cubic-bezier(.34,1.56,.64,1) .05s"
            : "none",
          "--d": "1.2s",
        } as React.CSSProperties}
      />

      {[-18, 18].map((offset) => (
        <circle
          key={offset}
          cx={550 + offset} cy="12" r="1.5" fill="rgba(139,30,30,0.4)"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0)",
            transformOrigin: `${550 + offset}px 12px`,
            transition: active
              ? `opacity .4s ease ${0.1 + Math.abs(offset) / 100}s, transform .5s cubic-bezier(.34,1.56,.64,1) ${0.1 + Math.abs(offset) / 100}s`
              : "none",
          } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   RevealParagraph — overflow-clip slide-up
───────────────────────────────────────────── */
function RevealParagraph({ text, index, active }: { text: string; index: number; active: boolean }) {
  return (
    <div className="overflow-hidden">
      <p
        className={[
          "m-0 will-change-[transform,opacity]",
          "transition-[opacity,transform] duration-[750ms] transition-spring delay-var",
          active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[110%]",
        ].join(" ")}
        style={{ "--d": `${0.3 + index * 0.2}s` } as React.CSSProperties}
      >
        {text}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SectionLabel
───────────────────────────────────────────── */
function SectionLabel({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className={[
          "block w-[30px] h-[1.5px] bg-[#8B1E1E] origin-left",
          "transition-transform duration-500 transition-spring",
          active ? "scale-x-100 delay-[50ms]" : "scale-x-0",
        ].join(" ")}
      />
      <span
        className={[
          "text-[10.5px] tracking-[0.34em] uppercase text-black/65 font-rethink",
          "transition-[opacity,transform] duration-500 transition-spring",
          active ? "opacity-100 translate-x-0 delay-[180ms]" : "opacity-0 translate-x-[14px]",
        ].join(" ")}
      >
        Our Commitment
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scanlines
───────────────────────────────────────────── */
function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 animate-scanlines bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.013)_2px,rgba(255,255,255,0.013)_4px)]" />
  );
}

/* ── Data ── */
const stats = [
  { value: 30,  suffix: "+",  label: "Medical Camps Conducted" },
  { value: 4,   suffix: "k+", label: "Cataract Surgeries Completed" },
  { value: 50,  suffix: "+",  label: "Homes Built for Homeless Families" },
  { value: 242, suffix: "",   label: "BPL Families Supported" },
];

const paragraphs = [
  "ERAM Educational & Welfare Trust advances its mission through structured interventions across education, healthcare, rehabilitation, environmental resilience, youth development, and community infrastructure.",
  "Each initiative begins with a clearly identified need and evolves into a designed response — planned, executed, and monitored with institutional discipline. Whether restoring water systems, strengthening public health access, enabling dignified rehabilitation, or expanding structured education, the Trust approaches community development as a long-term responsibility.",
  "These efforts are not parallel acts of service. They form a cohesive model of engagement — one that addresses access gaps, strengthens local systems, and creates measurable outcomes.",
];

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function CommitmentSection() {
  const topRef   = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  const topVisible   = useInView(topRef,   0.12);
  const statsVisible = useInView(stripRef, 0.12);
  const lineVisible  = useInView(lineRef,  0.5);

  useEffect(() => { injectStyles(); }, []);

  return (
    <section className="bg-[#F5EFE8] overflow-hidden">

      {/* ── TOP CONTENT ── */}
     <div ref={topRef} className="max-w-[1100px] mx-auto px-4 pt-[55px] pb-[90px]"> 
        <div className="grid md:grid-cols-2 gap-[clamp(2.5rem,6vw,5rem)]">

          {/* LEFT */}
          <div>
            <SectionLabel active={topVisible} />
            <InkHeading
              text="Our Commitment To Structured Responsibility"
              active={topVisible}
            />
            <TypewriterQuote
              text='"Commitment Beyond Institutions"'
              active={topVisible}
            />
          </div>

          {/* RIGHT */}
          <div className="font-rethink text-[15px] leading-[1.9] text-black/[0.78] flex flex-col gap-6">
            {paragraphs.map((text, i) => (
              <RevealParagraph key={i} text={text} index={i} active={topVisible} />
            ))}
          </div>

        </div>
      </div>


    </section>
  );
}


