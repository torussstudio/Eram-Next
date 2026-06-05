"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const benchmarks = [
  {
    tag: "Academic Record",
    title: "14 Consecutive Years — 100% Higher Secondary Results",
    desc: "A sustained record of complete pass results across all streams, maintained through disciplined academic systems and structured student monitoring.",
  },
  {
    tag: "District Ranking",
    title: "14th Rank Among 150 Schools in Palakkad District",
    desc: "Recognised among the top institutions in Palakkad for consistent academic output and institutional discipline across Higher Secondary streams.",
  },
];

const excellence = [
  {
    tag: "National Level · Sports",
    title: "Diya Maryam",
    sub: "Grade 11",
    desc: "🥇 1st Place — National Level Wushu Championship, Hyderabad",
  },
  {
    tag: "State Level · Cultural",
    title: "Farha Shirin",
    sub: "Grade 11",
    desc: "🥇 A Grade — State Level Kalotsavam 2026 (English Story Writing)",
  },
  {
    tag: "Scouts & Guides",
    title: "Rajyapuraskar",
    sub: "Governor's Award — Scouts & Guides",
    desc: "100% success rate in Rajyapuraskar qualification — the highest Governor's Award for Scouts & Guides.",
  },
];

const stats = [
  {
    value: "100",
    unit: "%",
    label:
      "Success Rate in Rajyapuraskar Qualification\n(Highest Governor's Award)",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
  {
    value: "50",
    unit: "+",
    label: "Blood Donations Annually\nunder NSS Program",
    bg: "bg-[#ae1431]",
    valC: "text-white",
    unitC: "text-white/60",
    descC: "text-white/55",
  },
  {
    value: "100",
    unit: "+",
    label: "Scout & Guide Activities\nConducted Annually",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
];

export default function BeyondAcademics() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      // ── Initial states ────────────────────────────────────────────────
      gsap.set(
        q(".anim-header, .anim-bench-label, .anim-bench, .anim-excel-label, .anim-excel, .anim-stat-label, .anim-stat"),
        { opacity: 0, y: 28 }
      );

      // ── Header animation ──────────────────────────────────────────────
      const headerWrap = q(".anim-header-wrap")[0];
      if (headerWrap) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: headerWrap,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          })
          .to(q(".anim-header"), {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.14,
          });
      }

      // ── Scoped reveal helper ──────────────────────────────────────────
      function revealScopedSection(
        triggerClass: string,
        labelClass: string,
        cardsClass: string
      ) {
        const triggerEl = q(triggerClass)[0];
        if (!triggerEl) return;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        const labelEls = q(labelClass);
        const cardsEls = q(cardsClass);

        if (labelEls.length > 0) {
          tl.to(labelEls, { opacity: 1, y: 0, duration: 0.45 });
        }
        if (cardsEls.length > 0) {
          tl.to(cardsEls, { opacity: 1, y: 0, duration: 0.65, stagger: 0.09 }, "-=0.15");
        }
      }

      // ── Section reveals ───────────────────────────────────────────────
      revealScopedSection(".anim-bench-wrap", ".anim-bench-label", ".anim-bench");
      revealScopedSection(".anim-excel-wrap", ".anim-excel-label", ".anim-excel");
      revealScopedSection(".anim-stat-wrap",  ".anim-stat-label",  ".anim-stat");

      // ── Counter animation ─────────────────────────────────────────────
      // One ScrollTrigger fires all counters — avoids stale-ref crashes
      // caused by multiple 'once: true' triggers sharing the same element.
      const statWrap = q(".anim-stat-wrap")[0];
      if (statWrap) {
        ScrollTrigger.create({
          trigger: statWrap,
          start: "top 82%",
          toggleActions: "play none none none",
          onEnter: () => {
            (q(".counter-num") as HTMLElement[]).forEach((el) => {
              const target = parseInt(el.getAttribute("data-target") ?? "", 10);
              if (isNaN(target)) return;
              gsap.to(el, {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                delay: 0.3,
              });
            });
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
  <section
  id="academics"
  ref={containerRef}
  className={`${shell} mb-[40px] bg-[#F5EFE8]`}  
>
  <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14">
        {/* ── HEADER ───────────────────────────────────────────── */}
        <div className="anim-header-wrap grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6 lg:mb-8">
          <div className="anim-header">
            <h2 className="font-display text-[#1a1209] leading-[1.05] tracking-[-0.02em] text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]">
              Representation,
              <br />
              Recognition &amp; Exposure
            </h2>
          </div>

          <div className="anim-header flex items-end">
            <p className="font-rethink text-[14.5px] md:text-[15.5px] leading-[1.85] text-[#6b5f54] max-w-[520px]">
              Academic consistency is matched by active participation beyond the
              classroom — ensuring competitive exposure and character
              development remain central to the student experience.
            </p>
          </div>
        </div>

        {/* ── BENCHMARKS ─────────────────────────────────────── */}
        <div className="anim-bench-wrap mb-12">
          <p className="anim-bench-label font-display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Institutional Benchmarks
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {benchmarks.map((card, i) => (
              <div
                key={i}
                className="anim-bench group relative p-8 bg-white border border-[#d4cbbf]
                border-t-4 border-t-[#d4cbbf] hover:border-t-[#ae1431]
                transition-colors duration-300 rounded-2xl overflow-hidden"
              >
                <span className="inline-block font-display bg-[#fdf6ef] text-[#ae1431] text-[9px] tracking-[0.22em] uppercase px-3 py-1 mb-6 ">
                  {card.tag}
                </span>

                <h3 className=" text-[#1a1209] text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] mb-3">
                  {card.title}
                </h3>

                <p className="text-[13px] font-rethink text-[#6b5f54] leading-[1.7] max-w-[480px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── STUDENT EXCELLENCE ─────────────────────────────── */}
        <div className="anim-excel-wrap mb-12">
          <p className="anim-excel-label  font-display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Student Excellence
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {excellence.map((card, i) => {
              const isRed = i === 0;
              const isDark = i === 1;

              const bg = isRed
                ? "bg-[#ae1431]"
                : isDark
                  ? "bg-[#1a1a1a]"
                  : "bg-white border border-[#d4cbbf]";

              const badge = isRed
                ? "bg-[#ae1431] text-white"
                : isDark
                  ? "bg-[#2a2a2a] text-[#a09488]"
                  : "bg-[#fdf6ef] border border-[#d4cbbf] text-[#ae1431]";

              const titleC =
                isRed || isDark ? "text-white" : "text-[#1a1209]";

              const subC = isRed
                ? "text-white/50"
                : isDark
                  ? "text-white/40"
                  : "text-[#8a7d6e]";

              const descC = isRed
                ? "text-white/80"
                : isDark
                  ? "text-white/70"
                  : "text-[#4a3f35]";

              return (
                <div key={i} className={`anim-excel p-7 ${bg}`}>
                  <span
                    className={`inline-block text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-6  ${badge}`}
                  >
                    {card.tag}
                  </span>

                  <h3
                    className={` text-[22px] font-display sm:text-[24px] leading-tight mb-1 ${titleC}`}
                  >
                    {card.title}
                  </h3>

                  <p className={`text-[12px] font-rethink  mb-5 ${subC}`}>
                    {card.sub}
                  </p>

                  <p className={`text-[13px]  font-rethink leading-[1.65] ${descC}`}>
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────────── */}
        <div className="anim-stat-wrap">
          <p className="anim-stat-label font display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Civic Leadership &amp; NSS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`anim-stat px-8 py-10 ${stat.bg}`}
              >
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    data-target={stat.value}
                    className={`counter-num  text-[56px] sm:text-[64px] leading-none tracking-[-0.02em] ${stat.valC}`}
                  >
                    0
                  </span>

                  <span
                    className={`text-[18px] font-display  ${stat.unitC}`}
                  >
                    {stat.unit}
                  </span>
                </div>

                <p
                  className={`text-[12px] font-rethink sm:text-[13px] leading-[1.65] whitespace-pre-line ${stat.descC}`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}