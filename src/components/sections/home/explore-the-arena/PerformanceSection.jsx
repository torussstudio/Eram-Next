import { memo, useRef } from "react";
import { Landmark, LayoutGrid, Lightbulb, Shield } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ───────────────────────────────────────────────────── */
const CARDS = [
  {
    no: "01",
    title: "Open-Air\nAmphitheatre",
    desc: "With a seating capacity of 1,000, the Arena is designed as an open-air amphitheatre that accommodates large audiences while maintaining clear sightlines and gathering scale. Its architectural layout enables visibility, flow, and shared experience — for sporting events, convocations, or cultural programs.",
    
    labels: ["Capacity", "Format", "Sightlines"],
    values: ["1,000 Spectators", "Open-Air Design", "Unobstructed, All Tiers"],
    Icon: Landmark,
  },
  {
    no: "02",
    title: "Multi-Court\nAthletic\nLayout",
    desc: "At its core, the Arena integrates a competitive multi-court system that supports structured training, competitive matches, and tournament-level play. Designed to transition seamlessly between practice, competition, and event configurations.",
    
    labels: ["Primary Court", "Badminton Court", "Configuration"],
    values: ["47m × 22m", "13.40m × 6.10m", "Multi-Sport Ready"],
    Icon: LayoutGrid,
  },
  {
    no: "03",
    title: "Event-Ready\nIllumination",
    desc: "Equipped with a full floodlighting system, the Arena enables evening matches, large-scale programs, and extended event scheduling — transforming the venue into a fully functional day-to-night event space without interruption.",
   
    labels: ["Floodlight Poles", "LED Lights", "Operation"],
    values: ["8 Poles (10m Height)", "38 High-Intensity Units", "Day to Night Capable"],
    Icon: Lightbulb,
  },
  {
    no: "04",
    title: "Secure &\nAccessible\nInfrastructure",
    desc: "The Arena integrates essential support systems ensuring smooth, safe, and efficient operation for every event — whether institutional or public. Safety, accessibility, and operational efficiency are embedded into its design from the ground up.",

    labels: ["Car Parking", "Security", "Access"],
    values: ["50+ Vehicles", "CCTV Surveillance", "Controlled Campus Entry"],
    Icon: Shield,
  },
];

const BG_WORDS = ["ARENA", "COURTS", "LIGHTS", "SECURE"];

/* ─── COMPONENT ──────────────────────────────────────────────── */
function PerformanceSection() {
  const containerRef    = useRef(null);
  const stackSectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Heading reveal */
      mm.add("all", () => {
        gsap.fromTo(
          ".perf-eyebrow-line",
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".perf-heading-word",
          { y: "110%", opacity: 0 },
          {
            y: "0%", opacity: 1, duration: 0.9, stagger: 0.14, ease: "power4.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".perf-subtext",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.6,
            scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
          },
        );
      });

      /* Grid section reveal */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".perf-grid-card",
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.02, ease: "power3.out",
            scrollTrigger: { trigger: ".perf-grid", start: "top 80%" },
          },
        );
      });
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".perf-grid-card",
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.75, stagger: 0.18, ease: "expo.out",
            scrollTrigger: { trigger: ".perf-grid", start: "top 85%" },
          },
        );
      });

      /* ── STACKED CARDS ──────────────────────────────────────── */
      const buildStack = (scrollEndPx) => {
        const stackSection = stackSectionRef.current;
        if (!stackSection) return;

        const cards = gsap.utils.toArray(".perf-stack-card");
        const total = cards.length; // 4

        const Y_STEP     = 9;
        const ROT_STEP   = 2;
        const SCALE_STEP = 0.022;

        gsap.set(".perf-bg-word", { opacity: 0 });

        cards.forEach((card, domIndex) => {
          const depth = total - 1 - domIndex;
          gsap.set(card, {
            y: depth * Y_STEP,
            rotation: depth * ROT_STEP,
            scale: 1 - depth * SCALE_STEP,
            zIndex: domIndex + 1,
            transformOrigin: "center bottom",
            opacity: 1,
          });
        });

        const segDur = 1 / total;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:       stackSection,
            start:         "top top",
            end:           `+=${scrollEndPx}`,
            pin:           true,
            pinSpacing:    true,
            scrub:         2.8,
            anticipatePin: 1,
          },
        });

        for (let step = 0; step < total; step++) {
          const frontDOM = total - 1 - step;
          const segStart = step * segDur;

          tl.fromTo(
            cards[frontDOM],
            { y: 0, rotation: 0, scale: 1, opacity: 1 },
            { y: -700, rotation: -14, scale: 0.90, opacity: 0, ease: "power2.inOut", duration: segDur },
            segStart,
          );

          for (let d = 0; d < frontDOM; d++) {
            const depthBefore = frontDOM - d;
            const depthAfter  = frontDOM - 1 - d;
            tl.fromTo(
              cards[d],
              {
                y: depthBefore * Y_STEP,
                rotation: depthBefore * ROT_STEP,
                scale: 1 - depthBefore * SCALE_STEP,
                opacity: 1,
              },
              {
                y: depthAfter * Y_STEP,
                rotation: depthAfter * ROT_STEP,
                scale: 1 - depthAfter * SCALE_STEP,
                opacity: 1,
                ease: "power2.inOut",
                duration: segDur,
              },
              segStart,
            );
          }

          /* BG word crossfade */
          tl.fromTo(
            `.perf-bg-word[data-index="${step}"]`,
            { opacity: 0 },
            { opacity: 0.07, ease: "none", duration: segDur },
            segStart,
          );
          if (step > 0) {
            tl.fromTo(
              `.perf-bg-word[data-index="${step - 1}"]`,
              { opacity: 0.07 },
              { opacity: 0, ease: "none", duration: segDur },
              segStart,
            );
          }
        }

        tl.fromTo(
          `.perf-bg-word[data-index="${total - 1}"]`,
          { opacity: 0.07 },
          { opacity: 0, ease: "none", duration: segDur },
          (total - 1) * segDur,
        );
      };

      mm.add("(min-width: 768px)", () => { buildStack(4 * 420); });
     mm.add("(max-width: 767px)", () => { buildStack(4 * 110); });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>

      {/* ══════════════════════════════════════════
          SECTION 1 — Heading
      ══════════════════════════════════════════ */}
      <section className="bg-[#F5EFE8] overflow-hidden pt-10 pb-8 px-5 md:pt-14 md:pb-10 md:px-6">
        <div className="w-full md:max-w-[1100px] md:mx-auto">
          <div className="text-center max-w-[680px] mx-auto">

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="perf-eyebrow-line h-px bg-[#ae1431]/60 w-10"
                style={{ transformOrigin: "left center" }}
              />
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#ae1431] font-semibold">
                Key Features
              </span>
              <div
                className="perf-eyebrow-line h-px bg-[#ae1431]/60 w-10"
                style={{ transformOrigin: "right center" }}
              />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-[30px] sm:text-[38px] md:text-[48px] font-semibold leading-tight text-black">
              {["Designed", "for", "Performance", "&", "Gathering"].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                  <span className="perf-heading-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="perf-subtext mt-5 text-[13px] md:text-[15px] text-black leading-relaxed max-w-[540px] mx-auto">
              Built as a flagship infrastructure milestone within the ERAM ecosystem, the Arena
              represents the Trust's expanding vision — where structured development meets
              public-scale possibility.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — Stacked Cards (pinned)
      ══════════════════════════════════════════ */}
      <section
        ref={stackSectionRef}
        className="relative bg-[#F5EFE8]"
       style={{ minHeight: "100dvh" }}
      >
        {/* Giant background words */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {BG_WORDS.map((word, i) => (
            <span
              key={i}
              className="perf-bg-word absolute font-black text-[#ae1431] leading-none whitespace-nowrap"
              data-index={i}
              style={{
                fontSize: "clamp(68px, 16vw, 200px)",
                letterSpacing: "-0.04em",
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Card stack */}
        <div
          className="relative z-10 flex items-center justify-center"
         style={{ minHeight: "100dvh", padding: "10px 0" }}
        >
          <div
            className="relative"
            style={{
              width:  "clamp(300px, 52vw, 500px)",
              height: "clamp(480px, 62vw, 600px)",
            }}
          >
            {[...CARDS].reverse().map((card, reversedDOMIndex) => {
              const originalIndex = CARDS.length - 1 - reversedDOMIndex;
              const { Icon } = card;
              const isLight = originalIndex % 2 === 0;
              const bg = "#ffffff";
              const text = "#1a100b";
              return (
                <div
                  key={card.no}
                  className="perf-stack-card absolute inset-0 rounded-[24px] md:rounded-[30px] overflow-hidden"
                  style={{
                    background: bg,
                    boxShadow: "0 24px 70px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.08)",
                    willChange: "transform, opacity",
                  }}
                >
                  

                  <div className="relative w-full h-full flex flex-col p-6 sm:p-8 md:p-9">

                    {/* ── Row 1: number + icon ── */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="font-mono tracking-[0.18em]"
                        style={{ fontSize: "clamp(10px, 1.1vw, 11px)", color: `${text}`, opacity: 0.35 }}
                      >
                        {card.no} / 04
                      </span>
                      <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: "clamp(32px, 4vw, 38px)",
                          height: "clamp(32px, 4vw, 38px)",
                          background: "#ae1431",
                        }}
                      >
                        <Icon size={14} strokeWidth={1.6} color="#f3efe9" />
                      </div>
                    </div>

                    {/* ── Row 2: Title ── */}
                    <h3
                      className="font-black uppercase"
                      style={{
                        fontSize:      "clamp(22px, 4.2vw, 42px)",
                        lineHeight:    1.0,
                        letterSpacing: "-0.025em",
                        whiteSpace:    "pre-line",
                        color:         text,
                      }}
                    >
                      {card.title}
                    </h3>

                    {/* ── Divider ── */}
                    <div
                      className="my-4 md:my-5 flex-shrink-0"
                      style={{ height: "1px", background: `${text}`, opacity: 0.1 }}
                    />

                    {/* ── Row 3: Description ── */}
                    <p
                      className="leading-relaxed flex-shrink-0"
                      style={{
                        fontSize: "clamp(11px, 1.35vw, 13px)",
                        color:    text,
                        opacity:  0.55,
                        maxWidth: "90%",
                      }}
                    >
                      {card.desc}
                    </p>

                    {/* ── Spacer ── */}
                    <div className="flex-1" />

                    {/* ── Row 4: Specs ── */}
                    <div className="flex-shrink-0">
                      {/* Spec rows */}
                      <div className="flex flex-col gap-[6px] md:gap-[7px]">
                        {card.labels.map((label, idx) => (
                          <div
                            key={label}
                            className="flex items-center justify-between"
                            style={{
                              borderBottom: idx < card.labels.length - 1
                                ? `1px dashed rgba(26,16,11,0.12)`
                                : "none",
                              paddingBottom: idx < card.labels.length - 1 ? "6px" : "0",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "clamp(10px, 1.1vw, 11px)",
                                color:    text,
                                opacity:  0.4,
                                fontVariantNumeric: "tabular-nums",
                              }}
                            >
                              {label}
                            </span>
                            <span
                              className="font-semibold"
                              style={{
                                fontSize: "clamp(10px, 1.1vw, 11px)",
                                color:    text,
                                opacity:  0.85,
                                textAlign: "right",
                              }}
                            >
                              {card.values[idx]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(PerformanceSection);