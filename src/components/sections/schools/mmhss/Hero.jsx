"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const QUICK_FACTS = [
  ["2005", "Year Established"],
  ["State Board", "Curriculum · English Medium"],
  ["750+", "Student Strength"],
  ["14 Yrs", "100% Pass Record"],
];

const STATS = [
  { value: "14", desc: ["Consecutive Years", "100% Pass Rate"] },
  { value: "750+", desc: ["Students Currently", "Enrolled"] },
  { value: "#14", desc: ["Among 150 Schools", "in Palakkad District"] },
  { value: "3", desc: ["Higher Secondary", "Academic Streams"] },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const btnsRef = useRef(null);
  const panelRef = useRef(null);
  const factsRef = useRef(null);
  const statsRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Hero entrance timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background overlay fades in first
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9 },
      );

      // Heading clip-path reveal (cinematic curtain up)
      tl.fromTo(
        headingRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 40 },
        { clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0, duration: 1.1 },
        "-=0.4",
      );

      // Badge slides in from left
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.7",
      );

      // Subtext fades up
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      );

      // Buttons rise up
      tl.fromTo(
        btnsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35",
      );

      // Right panel slides in from right with slight scale
      tl.fromTo(
        panelRef.current,
        { opacity: 0, x: 60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: "power2.out" },
        "-=0.7",
      );

      // Accent line draws from left
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5 },
        "-=0.4",
      );

      // Quick-fact rows stagger in
      const factItems = factsRef.current?.querySelectorAll(".fact-item");
      if (factItems?.length) {
        tl.fromTo(
          factItems,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.35",
        );
      }

      /* ── 3. Stats reveal on scroll ── */
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems?.length) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 36, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      /* ── 4. Idle floating on panel ── */
      gsap.to(panelRef.current, {
        y: -6,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${shell} bg-[#F5EFE8] py-9`}>
      {/* ── HERO CARD ── */}
      <div className="relative rounded-[28px] overflow-hidden text-white">
        {/* BACKGROUND */}
 <img

  src="/images/mmhss.webp"
  alt="Hero"
  className="absolute inset-x-0 top-0 w-full h-[78%] object-cover object-[center_70%]"
/>
        <div ref={overlayRef} className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div
          className="relative z-10 flex flex-col justify-start pt-10 sm:pt-14 md:pt-[80px]
            min-h-[520px] sm:min-h-[560px] md:min-h-[600px] lg:min-h-[680px]"
        >
          {/* TOP SECTION */}
          <div
            className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16
              py-4 md:py-16 flex flex-col lg:flex-row gap-6 lg:gap-4 lg:items-center"
          >
            {/* LEFT */}
            <div className="flex-1 max-w-[720px]">
              <div
                ref={badgeRef}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <p className="font-rethink text-[13px] sm:text-[14px] tracking-[0.28em] text-[#ae1431] uppercase">
                  Higher Secondary · Est. 2005
                </p>
              </div>

              <h1
                ref={headingRef}
                className="font-display leading-[1.05] tracking-[-0.02em]
  text-[36px] xs:text-[42px] sm:text-[52px] md:text-[62px] lg:text-[72px]"
              >
                Mariyumma Memorial <br />
                Higher Secondary <br />
                <span className="font-display  text-white/60">School</span>
              </h1>
              <p
                ref={subtextRef}
                className="font-rethink mt-4 sm:mt-5 text-[1.05rem] sm:text-[14px] md:text-[15px]
                  leading-[1.8] text-white/70 max-w-[560px]"
              >
                <span className="text-white font-medium">
                  100% Results. Structured Academic Discipline.
                </span>
                <br />
                Over 750 students, built on academic transformation, structured
                monitoring, and strong coordination with parents — achieving
                consistent excellence in higher secondary education.
              </p>

              <div ref={btnsRef} className="flex flex-wrap gap-3 mt-6 sm:mt-7">
                <button
                  className="font-rethink bg-[#ae1431] px-5 md:px-7 py-2.5 md:py-3
                    text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.12em] uppercase cursor-pointer
                   active:scale-[0.98] transition-transform rounded-[12px]"
                >
                  Admissions Open — Book Now →
                </button>
                <button
                  className="font-rethink border border-white/30 px-5 md:px-7 py-2.5 md:py-3
                    text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.12em] uppercase
                    flex items-center gap-2 cursor-pointer 
                    active:scale-[0.98] transition-transform rounded-[12px]"
                >
                  Enquire Now
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              ref={panelRef}
              className="font-rethink w-full sm:w-[300px] lg:w-[280px]
                bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]
                backdrop-blur-md border border-white/10 rounded-md p-5
                lg:ml-auto lg:mr-8 mt-2 lg:mt-0 will-change-transform"
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  ref={lineRef}
                  className="w-5 h-[1px] bg-[#ae1431] block"
                />
                <p className="text-[10px] tracking-[0.28em] text-[#ae1431] uppercase">
                  Quick Facts
                </p>
              </div>

              <div
                ref={factsRef}
                className="grid grid-cols-2 sm:grid-cols-1 gap-0"
              >
                {QUICK_FACTS.map(([title, desc], i) => (
                  <div
                    key={i}
                    className={[
                      "fact-item py-3",
                      i % 2 === 0 && i !== 2
                        ? "sm:border-b sm:border-white/10"
                        : "",
                      i < 2 ? "border-b border-white/10" : "",
                      i % 2 === 0
                        ? "pr-3 sm:pr-0 border-r border-white/10 sm:border-r-0"
                        : "pl-3 sm:pl-0",
                      i >= 2 && i !== 3 ? "sm:border-b sm:border-white/10" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-tight">
                      {title}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-white/60 mt-1 leading-snug">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="w-full border-t border-white/10 bg-[#0e0e0e] mt-auto">
            <div className="max-w-[1400px] mx-auto">
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4">
                {STATS.map((item, i) => (
                  <div
                    key={i}
                    className={[
                      "stat-item flex flex-col items-center font-rethink justify-center text-center",
                      "py-10 sm:py-14 md:py-[60px] lg:py-[80px] px-4 sm:px-5",
                      i % 2 === 0 ? "border-r border-white/10" : "",
                      i < 2 ? "border-b border-white/10 md:border-b-0" : "",
                      i !== 3 ? "md:border-r md:border-white/10" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <h3
                      className="font-serif text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px]
                        text-[#eae6df] font-medium tracking-[-0.02em] leading-none"
                    >
                      {item.value}
                    </h3>
                    <p className="mt-3 sm:mt-[14px] text-[12px] sm:text-[12px] md:text-[13px] text-[#8f877d] leading-[1.6]">
                      {item.desc.map((line, idx) => (
                        <span key={idx} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
