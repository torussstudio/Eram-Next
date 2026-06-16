"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

const benchmarks = [
  {
    tag: "Academic Record",
    title: "14 Consecutive Years — 100% Higher Secondary Results",
    desc: "A sustained record of complete pass results, maintained through disciplined academic systems, structured student monitoring, and exam-focused revision cycles ",
  },
  {
    tag: "Sports Development",
    title: "Academic Strength & Athletic Development — Hand in Hand",
    desc: "Students identified early, trained systematically, and supported to compete at state and national levels — from FIFA Talent Academy to Kerala State Football selections. ",
  },
];

const excellence = [
  {
    tag: "Football · National",
    title: "Mohammed Sinan",
    sub: "Grade 10",
    desc: "Selected to FIFA Talent Academy Odisha",
  },
  {
    tag: "Football · State",
    title: "Mohammed Razan",
    sub: "Grade 9",
    desc: "Selected to the Sub Junior Kerala State Football Team",
  },
  {
    tag: "Football · Club",
    title: "Mohammed Amar",
    sub: "grade 10",
    desc: "Selected for Punjab FC",
  },
  {
    tag: "Athletics · State",
    title: "Ajmal Rahman",
    sub: "grade 9",
    desc: "Bronze Medal – State Level Neeraj Chopra Javelin Throw Competition",
  },
  {
    tag: "Combat Sports · State",
    title: "Fathima Mehrin",
    sub: "grade 7",
    desc: "Gold Medal – 4th Kerala State Sambo Championship 2026",
  },
  {
    tag: "Scouts & Guides",
    title: "Fathima Mehrin",
    sub: "Governor's Award — Scouts & Guides",
    desc: "25+ students qualified — highest Governor's Award for Scouts & Guides.",
  },
];

const stats = [
  {
    value: "25",
    unit: "+",
    label: "Students — Rajyapuraskar Qualification\n(Governor's Award, Scouts & Guides)",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
  {
    value: "150",
    unit: "+",
    label: "Active Scout & Guide \nStudent Engagement",
    bg: "bg-[#ae1431]",
    valC: "text-white",
    unitC: "text-white/60",
    descC: "text-white/55",
  },
  {
    value: "5",
    unit: "+",
    label: "National & State Level\nSports Selections (2026)",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
];

// ─── Reusable reveal animation helper (scoped) ───────────────────────────────────────────────
export default function BeyondAcademics() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      // ── Initial states ────────────────────────────────────────────────
      gsap.set(
        q(
          ".anim-header, .anim-bench-label, .anim-bench, .anim-excel-label, .anim-excel, .anim-stat-label, .anim-stat"
        ),
        {
          opacity: 0,
          y: 28,
        }
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

        const labelEl = q(labelClass);
        const cardsEl = q(cardsClass);

        if (labelEl.length > 0) {
          tl.to(labelEl, {
            opacity: 1,
            y: 0,
            duration: 0.45,
          });
        }
        if (cardsEl.length > 0) {
          tl.to(
            cardsEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.09,
            },
            "-=0.15"
          );
        }
      }

      // ── Section reveals ───────────────────────────────────────────────
      revealScopedSection(
        ".anim-bench-wrap",
        ".anim-bench-label",
        ".anim-bench"
      );

      revealScopedSection(
        ".anim-excel-wrap",
        ".anim-excel-label",
        ".anim-excel"
      );

      revealScopedSection(
        ".anim-stat-wrap",
        ".anim-stat-label",
        ".anim-stat"
      );
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section ref={containerRef} className={`${shell} bg-[#F5EFE8] -mt-8 md:-mt-12 lg:-mt-14`}>
  <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14">

        {/* ── HEADER ── */}
        <div className="anim-header-wrap grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-6 lg:mb-8">
          <div className="anim-header">
            <h2 className="font-display text-[#1a1209] leading-[1.05] tracking-[-0.02em] text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]">
              Early Pathways
              <br />
              to Higher Performance
            </h2>
          </div>
          <div className="anim-header flex items-end">
            <p className=" font-rethink text-[14.5px] md:text-[15.5px] leading-[1.85] text-[#6b5f54] max-w-[520px]">
              Academic consistency at MMPS is matched by active participation in competitive platforms, particularly
              in football and athletics. Our students actively represent the school across competitive platforms.
            </p>
          </div>
        </div>

        {/* ── BENCHMARKS ── */}
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
                <span className="inline-block bg-[#fdf6ef] text-[#ae1431] text-[9px] tracking-[0.22em] uppercase px-3 py-1 mb-6 ">
                  {card.tag}
                </span>
                <h3 className=" text-[#1a1209] font-display text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] mb-3">
                  {card.title}
                </h3>
                <p className="text-[13px] font-rethink text-[#6b5f54] leading-[1.7] max-w-[480px]">
                  {card.desc}
                </p>
                {/* <span className="absolute bottom-4 right-5 font-serif text-[60px] text-[#e8dfd4] leading-none select-none pointer-events-none font-medium tracking-[-0.03em] opacity-70">
                  14
                </span> */}
              </div>
            ))}
          </div>
        </div>

        {/* ── STUDENT EXCELLENCE ── */}
        <div className="anim-excel-wrap mb-12">
          <p className="anim-excel-label font-display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Student Excellence
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {excellence.map((card, i) => {
              const isRed = i === 0 || i === 4;
              const isDark = i === 1 || i === 5;
              const isWhite = i === 2 || i === 3;

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
                isRed || isDark
                  ? "text-white"
                  : "text-[#1a1209]";

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
                    className={`inline-block font-display text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-6  ${badge}`}
                  >
                    {card.tag}
                  </span>

                  <h3
                    className={` text-[22px] font-display sm:text-[24px] leading-tight mb-1 ${titleC}`}
                  >
                    {card.title}
                  </h3>

                  <p className={`text-[12px] font-rethink mb-5 ${subC}`}>
                    {card.sub}
                  </p>

                  <p className={`text-[13px] font-rethink leading-[1.65] ${descC}`}>
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CIVIC LEADERSHIP & NSS ── */}
        <div className="anim-stat-wrap">
          <p className="anim-stat-label font-display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Civic Leadership &amp; NSS
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <div key={i} className={`anim-stat px-8 py-10 ${stat.bg}`}>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    data-target={stat.value}
                    className={`counter-num font-display  text-[56px] sm:text-[64px] leading-none  tracking-[-0.02em] ${stat.valC}`}
                  >
                    {stat.value}
                  </span>
                  <span className={`text-[18px] font-display  ${stat.unitC}`}>
                    {stat.unit}
                  </span>
                </div>
                <p className={`text-[12px] font-rethink sm:text-[13px] leading-[1.65] whitespace-pre-line ${stat.descC}`}>
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