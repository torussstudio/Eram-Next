import { useEffect, useRef, useState } from "react";

/* ── Keyframes (custom animations — Tailwind config ഇല്ലാതെ inject ചെയ്യണം) ── */
const STYLES = `
@keyframes blink-cursor {
  0%,100% { border-right-color: #8B1E1E; }
  50%      { border-right-color: transparent; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes ink-drop {
  0%   { opacity: 0; filter: blur(14px) saturate(0); transform: scale(1.15) translateY(8px); letter-spacing: 0.18em; }
  40%  { opacity: 1; filter: blur(3px)  saturate(0.4); transform: scale(1.04) translateY(2px); letter-spacing: 0.04em; }
  100% { opacity: 1; filter: blur(0)    saturate(1);   transform: scale(1)    translateY(0);   letter-spacing: normal; }
}
@keyframes line-draw {
  from { stroke-dashoffset: 1200; }
  to   { stroke-dashoffset: 0; }
}
@media (min-width: 768px) { .stat-divider { display: block !important; } }
`;

function injectStyles() {
  if (document.getElementById("eram-anim")) return;
  const s = document.createElement("style");
  s.id = "eram-anim";
  s.textContent = STYLES;
  document.head.appendChild(s);
}

/* ── Word-by-word ink-bleed reveal ── */
function InkHeading({ text, active }) {
  const words = text.split(" ");
  return (
    <h2 className="font-display text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15] text-[#1a1a1a] font-light m-0">
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.22em",
            opacity: active ? 1 : 0,
            animation: active
              ? `ink-drop 0.75s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.07}s both`
              : "none",
          }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}

/* ── Typewriter italic quote ── */
function TypewriterQuote({ text, active }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    setDisplayed("");
    setDone(false);
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, 38);
    return () => clearInterval(iv);
  }, [active, text]);

  return (
    <p
      className="mt-5 text-[13px] italic text-black/60 overflow-hidden whitespace-nowrap inline-block pr-[2px]"
      style={{
        borderRight: done ? "2px solid transparent" : "2px solid #8B1E1E",
        animation: done ? "none" : "blink-cursor 0.7s step-end infinite",
        opacity: active ? 1 : 0,
        transition: "opacity 0.3s ease 0.5s",
        maxWidth: "100%",
      }}
    >
      {displayed}
    </p>
  );
}

/* ── Counter ── */
function useCounter(target, active, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1800, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, delay]);
  return val;
}

/* ── Stat card ── */
function StatCard({ stat, index, active }) {
  const count = useCounter(stat.value, active, index * 120 + 200);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-center cursor-default"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.12}s`,
      }}
    >
      {index !== 0 && (
        <span className="stat-divider hidden absolute left-0 top-1/2 -translate-y-1/2 h-[60px] w-px bg-white/10" />
      )}

      {hovered && (
        <span className="absolute top-1/2 left-1/2 w-[60px] h-[60px] -ml-[30px] -mt-[30px] rounded-full border border-[rgba(192,57,43,0.5)] pointer-events-none animate-[pulse-ring_0.8s_ease-out_forwards]" />
      )}

      <h3
        className="font-serif text-[clamp(2rem,2.5vw,2.8rem)] leading-none m-0"
        style={{
          color: hovered ? "#c0392b" : "#ffffff",
          transition: "color 0.3s ease",
          textShadow: hovered ? "0 0 30px rgba(192,57,43,0.4)" : "none",
        }}
      >
        {count}{stat.suffix}
      </h3>

      <p
        className="mt-3 text-[12px] tracking-[0.2em] uppercase leading-[1.6] px-2"
        style={{
          color: active ? "rgba(255,255,255,0.6)" : "transparent",
          transition: `color 0.8s ease ${index * 0.12 + 0.4}s`,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

/* ── SVG animated divider ── */
function AnimatedDivider({ active }) {
  return (
    <svg width="100%" height="20" viewBox="0 0 1100 20" preserveAspectRatio="none" className="block">
      <line
        x1="0" y1="10" x2="1100" y2="10"
        stroke="rgba(139,30,30,0.25)" strokeWidth="1"
        strokeDasharray="1200"
        strokeDashoffset={active ? 0 : 1200}
        style={{ transition: active ? "stroke-dashoffset 1.2s ease" : "none" }}
      />
      <circle
        cx="550" cy="10" r="3" fill="#8B1E1E"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0)",
          transformOrigin: "550px 10px",
          transition: "opacity 0.5s ease 0.9s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.9s",
        }}
      />
    </svg>
  );
}

/* ── Scanlines ── */
function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />
  );
}

/* ── Data ── */
const stats = [
  { value: 30,  suffix: "+",  label: "Medical Camps Conducted" },
  { value: 4,   suffix: "k+", label: "Cataract Surgeries Completed" },
  { value: 50,  suffix: "+",  label: "Homes Built for Homeless Families" },
  { value: 242, suffix: "",   label: "BPL Families Supported" },
];

/* ── Main ── */
export default function CommitmentSection() {
  const topRef   = useRef(null);
  const stripRef = useRef(null);
  const lineRef  = useRef(null);

  const [topVisible,   setTopVisible]   = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [lineVisible,  setLineVisible]  = useState(false);

  useEffect(() => {
    injectStyles();
    const observe = (ref, setter, threshold = 0.15) => {
      const el = ref.current;
      if (!el) return () => {};
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };
    const c1 = observe(topRef,   setTopVisible);
    const c2 = observe(stripRef, setStatsVisible);
    const c3 = observe(lineRef,  setLineVisible, 0.5);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <section className="bg-[#F5EFE8] overflow-hidden">

      {/* TOP CONTENT */}
      <div ref={topRef} className="max-w-[1100px] mx-auto px-3 py-[90px]">
        <div className="grid md:grid-cols-2 gap-[80px]">

          {/* LEFT */}
          <div>
            {/* LABEL */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-[30px] h-[1.5px] bg-[#8B1E1E] block origin-left"
                style={{
                  transform: topVisible ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.55s ease 0.05s",
                }}
              />
              <span
                className=" font-rethink text-[11px] tracking-[0.32em] uppercase text-black/70"
                style={{
                  opacity: topVisible ? 1 : 0,
                  transform: topVisible ? "translateX(0)" : "translateX(12px)",
                  transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
                }}
              >
                OUR COMMITMENT
              </span>
            </div>

            {/* HEADING */}
            <InkHeading 
              text="Our Commitment To Structured Responsibility"
              active={topVisible}
            />

            {/* QUOTE */}
            <TypewriterQuote
              text='"Commitment Beyond Institutions"'
              active={topVisible}
            />
          </div>

          {/* RIGHT */}
          <div className=" font-rethink text-[15px] leading-[1.9] text-black/80 space-y-6">
            {[
              "ERAM Educational & Welfare Trust advances its mission through structured interventions across education, healthcare, rehabilitation, environmental resilience, youth development, and community infrastructure.",
              "Each initiative begins with a clearly identified need and evolves into a designed response — planned, executed, and monitored with institutional discipline. Whether restoring water systems, strengthening public health access, enabling dignified rehabilitation, or expanding structured education, the Trust approaches community development as a long-term responsibility.",
              "These efforts are not parallel acts of service. They form a cohesive model of engagement — one that addresses access gaps, strengthens local systems, and creates measurable outcomes.",
            ].map((text, i) => (
              <div key={i} className="overflow-hidden">
                <p
                  className="m-0"
                  style={{
                    opacity: topVisible ? 1 : 0,
                    transform: topVisible ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 0.7s ease ${0.35 + i * 0.18}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.18}s`,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div ref={lineRef} className="max-w-[1100px] mx-auto px-3">
        <AnimatedDivider active={lineVisible} />
      </div>

      {/* DARK STATS STRIP */}
      <div ref={stripRef} className="bg-[#0E0E0E] py-[90px] relative overflow-hidden">
        <Scanlines />
        <div className="font-rethink max-w-[1100px] mx-auto px-3 grid grid-cols-2 md:grid-cols-4 text-center relative z-[1]">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} active={statsVisible} />
          ))}
        </div>
      </div>

    </section>
  );
}