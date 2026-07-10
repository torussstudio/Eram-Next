"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";
import { Play } from "lucide-react";
import { useSmoothScroll } from "../../../../hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const supportItems = [
  ["Theoretical Foundations of Education", "Pedagogical Methodology"],
  ["Child Psychology & Development", "Classroom Management Training"],
  ["Practical Teaching Assignments", "Structured Internal Assessment"],
  ["Internship in International Schools", "15-Day Residential Leadership Camp"],
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AcademicStreams() {
  const sectionRef = useRef<HTMLElement>(null);
  const subLabelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const principalRef = useRef<HTMLDivElement>(null);

  const scrollTo = useSmoothScroll();

  useGSAP(
    () => {
      const ease = "power3.out";
      const easeExp = "expo.out";

      const st = (trigger: any, start = "top 86%") => ({
        trigger,
        start,
        toggleActions: "play none none none",
      });

      // ── Section bg ────────────────────────────────────────────────────────
      // ── Section fade in ───────────────────────────────────────────────────
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0.85 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ── Label animation ───────────────────────────────────────────────────
      if (subLabelRef.current) {
        gsap.fromTo(
          subLabelRef.current,
          { opacity: 0, letterSpacing: "0.55em" },
          {
            opacity: 1,
            letterSpacing: "0.28em",
            duration: 0.9,
            ease,
            scrollTrigger: st(subLabelRef.current),
          },
        );
      }

      // ── Support cards animation ──────────────────────────────────────────
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".support-card");

        if (cards.length) {
          cards.forEach((card, i) => {
            const col = i % 2;
            const rowIdx = Math.floor(i / 2);

            const xFrom = col === 0 ? -38 : 38;

            const accent = card.querySelector(".card-accent");
            const shimmer = card.querySelector(".card-shimmer");
            const text = card.querySelector("p");

            const stCfg = {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            };

            gsap.fromTo(
              card,
              { opacity: 0, x: xFrom, filter: "blur(7px)" },
              {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.72,
                ease: easeExp,
                delay: rowIdx * 0.1 + col * 0.07,
                scrollTrigger: stCfg,
              },
            );

            if (accent) {
              gsap.fromTo(
                accent,
                { scaleY: 0, transformOrigin: "top center" },
                {
                  scaleY: 1,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: rowIdx * 0.1 + col * 0.07 + 0.22,
                  scrollTrigger: stCfg,
                },
              );
            }

            if (shimmer) {
              gsap.fromTo(
                shimmer,
                { x: "-115%" },
                {
                  x: "115%",
                  duration: 0.75,
                  ease: "power2.inOut",
                  delay: rowIdx * 0.1 + col * 0.07 + 0.38,
                  scrollTrigger: stCfg,
                },
              );
            }

            if (text) {
              gsap.fromTo(
                text,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  ease,
                  delay: rowIdx * 0.1 + col * 0.07 + 0.32,
                  scrollTrigger: stCfg,
                },
              );
            }
          });
        }
      }

      // ── Principal section animation ──────────────────────────────────────
      if (principalRef.current) {
        gsap.fromTo(
          principalRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: easeExp,
            scrollTrigger: st(principalRef.current),
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`${shell} bg-[#F5EFE8] relative overflow-hidden`}
    >
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
          {/* ══ LEFT COLUMN ═════════════════════════════════════ */}
          <div className="flex flex-col mt-5 lg:mt-11">
            <p
              ref={subLabelRef}
              className="font-rethink text-[12px] sm:text-[12px] tracking-[0.28em] text-[#6b5f54] uppercase mb-5 hidden lg:block"
            >
              Academic Support Systems
            </p>

            <div
              ref={gridRef}
              className="flex flex-col gap-1 rounded-2xl overflow-hidden"
            >
              {supportItems.map(([left, right], i) => (
                <div key={i} className="grid grid-cols-2 gap-1">
                  {[left, right].map((text, j) => (
                    <div
                      key={j}
                      className="support-card relative bg-[#252525] px-5 py-5 overflow-hidden"
                    >
                      {/* Accent */}
                      <div className="card-accent absolute left-0 top-0 bottom-0 w-[4px] bg-[#ae1431] rounded-l-[20px]" />

                      {/* Shimmer */}
                      <div
                        className="card-shimmer absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.05) 50%, transparent 62%)",
                          transform: "translateX(-115%)",
                        }}
                      />

                      <p className="relative font-rethink z-10 text-[13px] sm:text-[14px] text-[#c4b9ae] leading-[1.65]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("academics")}
              className="structured-btn inline-flex w-fit self-left mt-5 md:mt-6 border bg-[#ae1431] text-white border-[#ae1431] px-4 py-2 rounded-lg text-sm items-center gap-2 hover:bg-black hover:border-black transition-all duration-300 cursor-pointer font-rethink"
            >
              Explore
               <Play className="w-4 h-4 shrink-0 transition-all duration-300" />
            </button>
          </div>

          {/* ══ RIGHT COLUMN ═══════════════════════════════════ */}
          <div
            ref={principalRef}
            className="group relative overflow-hidden mt-6 lg:mt-12 rounded-[28px] h-[350px] md:h-[450px] border border-white/10"
          >
            {/* Principal Image */}
            <img
              src="/images/mmiteprincipal.avif"
              alt="Principal"
              className="w-full h-full object-cover  transition-all duration-700 group-hover:scale-105 "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10" />

            {/* Static Content */}
            <div
              className="
    absolute bottom-0 left-0 w-full p-8 md:p-10 z-20
    transition-all duration-700
    group-hover:bottom-40
  "
            >
              <p className="font-rethink text-[11px] tracking-[0.28em] text-white uppercase mb-6">
                Our Principal
              </p>

              <h2 className="font-display text-white text-[42px] md:text-[56px] leading-[0.95] tracking-[-0.03em]">
                VIGI S
              </h2>

              <p className="text-[#e4dad2] mt-4 text-[14px]">
                Principal · MMITE
              </p>
            </div>

            {/* Hover Reveal */}
            <div className="absolute inset-0 flex items-end p-8 md:p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 pointer-events-none">
              <div className="translate-y-10 group-hover:translate-y-0 transition-all duration-500">
                <div className="w-12 h-[2px] bg-[#ae1431] mb-6" />

                <p className="text-[#e4dad2] text-[14px] leading-[1.9] max-w-[420px]">
                 A committed teacher educator, mentoring future educators, fostering professional excellence, reflective practice, and a lifelong commitment to quality teaching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
