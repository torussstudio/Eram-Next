"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";
import { BarChart2, Zap, NotepadText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const streams = [
  {
    icon: <NotepadText size={18} />,
    title: "Continuous Progress Tracking",
    sub: "Regular assessments & structured monitoring",
  },
  {
    icon: <Zap size={18} />,
    title: "Competitive Sports Exposure",
    sub: "Early identification & systematic training",
  },
  {
    icon: <BarChart2 size={18} />,
    title: "Leadership & Civic Platforms",
    sub: "JCI, Rotary Junior Wing, Scout & Guide",
  },
];

const supportItems = [
  [
    "Categorized student attention by performance bracket",
    "Morning study sessions before regular classes",
  ],
  [
    "Supervised special study classes after hours",
    "Crash courses for critical syllabus portions",
  ],
  ["Special question practice modules", "Exam-oriented revision cycles"],
  [
    "Structured monitoring & internal assessment",
    "Teacher-guided mentorship per student",
  ],
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AcademicStreams() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const streamsRef = useRef<HTMLDivElement>(null);
  const subLabelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ease = "power3.out";
      const easeExp = "expo.out";

      const st = (trigger: any, start = "top 86%") => ({
        trigger,
        start,
        toggleActions: "play none none none",
      });

      // ── 0. Section bg lifts from deep black ───────────────────────────────
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { backgroundColor: "#0e0e0e" },
          {
            backgroundColor: "#1a1a1a",
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ── 1. Badge line extends → text appears ──────────────────────────────
      if (badgeLineRef.current && badgeRef.current) {
        gsap.fromTo(
          badgeLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.inOut",
            scrollTrigger: st(badgeRef.current),
          },
        );
      }
      if (badgeRef.current) {
        const pText = badgeRef.current.querySelector("p");
        if (pText) {
          gsap.fromTo(
            pText,
            { opacity: 0, x: 12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.55,
              ease,
              delay: 0.38,
              scrollTrigger: st(badgeRef.current),
            },
          );
        }
      }

      // ── 2. Heading — per-word 3D flip reveal ─────────────────────────────
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0, y: 64, rotateX: -18, transformOrigin: "top center" },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1.0,
              ease: easeExp,
              stagger: 0.06,
              scrollTrigger: st(headingRef.current, "top 88%"),
            },
          );
        }
      }

      // ── 3. Divider extends + red glow pulse ───────────────────────────────
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.65,
            ease: "power2.inOut",
            scrollTrigger: st(dividerRef.current),
            onComplete() {
              if (dividerRef.current) {
                gsap.to(dividerRef.current, {
                  boxShadow: "0 0 14px 3px rgba(174,20,49,0.6)",
                  duration: 0.85,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: 3,
                });
              }
            },
          },
        );
      }

      // ── 4. Body — blur fade up ────────────────────────────────────────────
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 24, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease,
            scrollTrigger: st(bodyRef.current),
          },
        );
      }

      // ── 5. Counter badge rolls up ─────────────────────────────────────────
      if (counterRef.current) {
        gsap.fromTo(
          counterRef.current,
          { opacity: 0, scale: 0.75, y: 18 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            ease: "back.out(1.5)",
            scrollTrigger: st(counterRef.current),
          },
        );
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 100,
          duration: 2.4,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: st(counterRef.current),
          onUpdate() {
            const el = counterRef.current?.querySelector(".counter-val");
            if (el) el.textContent = Math.round(obj.val) + "%";
          },
        });
      }

      // ── 6. Stream box — border draws clockwise around container ──────────
      if (streamsRef.current) {
        const bTop = streamsRef.current.querySelector(".sb-top");
        const bRight = streamsRef.current.querySelector(".sb-right");
        const bBottom = streamsRef.current.querySelector(".sb-bottom");
        const bLeft = streamsRef.current.querySelector(".sb-left");

        if (bTop && bRight && bBottom && bLeft) {
          gsap
            .timeline({ scrollTrigger: st(streamsRef.current) })
            .fromTo(
              bTop,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.3, ease: "power2.inOut" },
            )
            .fromTo(
              bRight,
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.3, ease: "power2.inOut" },
              "-=0.05",
            )
            .fromTo(
              bBottom,
              { scaleX: 0, transformOrigin: "right center" },
              { scaleX: 1, duration: 0.3, ease: "power2.inOut" },
              "-=0.05",
            )
            .fromTo(
              bLeft,
              { scaleY: 0, transformOrigin: "bottom center" },
              { scaleY: 1, duration: 0.3, ease: "power2.inOut" },
              "-=0.05",
            );
        }
      }

      // ── 7. Stream rows — 3D perspective tilt in ───────────────────────────
      if (streamsRef.current) {
        const streamRows = streamsRef.current.querySelectorAll(".stream-row");
        if (streamRows.length) {
          streamRows.forEach((row, i) => {
            const icon = row.querySelector(".stream-icon");
            const title = row.querySelector(".stream-title");
            const sub = row.querySelector(".stream-sub");
            const sep = row.querySelector(".stream-sep");

            gsap.fromTo(
              row,
              { opacity: 0, y: 36, rotateX: -10, transformPerspective: 900 },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                ease: easeExp,
                delay: i * 0.15,
                scrollTrigger: st(streamsRef.current),
              },
            );
            if (icon) {
              gsap.fromTo(
                icon,
                { scale: 0, rotation: -20, opacity: 0 },
                {
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "back.out(2.2)",
                  delay: i * 0.15 + 0.22,
                  scrollTrigger: st(streamsRef.current),
                },
              );
            }
            if (title) {
              gsap.fromTo(
                title,
                { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                {
                  opacity: 1,
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.55,
                  ease,
                  delay: i * 0.15 + 0.3,
                  scrollTrigger: st(streamsRef.current),
                },
              );
            }
            if (sub) {
              gsap.fromTo(
                sub,
                { opacity: 0, y: 5 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease,
                  delay: i * 0.15 + 0.44,
                  scrollTrigger: st(streamsRef.current),
                },
              );
            }
            if (sep) {
              gsap.fromTo(
                sep,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 0.45,
                  ease: "power2.inOut",
                  delay: i * 0.15 + 0.08,
                  scrollTrigger: st(streamsRef.current),
                },
              );
            }
          });
        }
      }

      // ── 8. Sub-label — letter-spacing collapses in ───────────────────────
      if (subLabelRef.current) {
        gsap.fromTo(
          subLabelRef.current,
          { opacity: 0, letterSpacing: "0.55em" },
          {
            opacity: 1,
            letterSpacing: "0.28em",
            duration: 0.95,
            ease,
            scrollTrigger: st(subLabelRef.current),
          },
        );
      }

      // ── 9. Support cards — blur-slide + accent draw + shimmer ─────────────
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
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`${shell} bg-[#1a1a1a] rounded-[24px] relative overflow-hidden`}
    >
      {/* Ambient red glow — top left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(174,20,49,0.07) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />
      {/* Ambient glow — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(174,20,49,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-6 sm:py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
          {/* ══ LEFT COLUMN ══════════════════════════════════════════════════ */}
          <div className="relative w-full min-h-[500px] lg:min-h-[720px] overflow-hidden rounded-[24px]">
            {/* Top Logo Section */}
            <div className="relative h-[42%] w-full overflow-hidden bg-[#111] flex items-center justify-center p-6">
              <img
                src="/images/mmpss.avif"
                alt="Logo Background"
                className="w-[92%] h-[92%] object-contain"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Bottom School Image */}
            <div className="relative h-[58%] w-full overflow-hidden">
              <img
                src="/images/mmps.webp"
                alt="Academic Structure"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* ══ RIGHT COLUMN ═════════════════════════════════════════════════ */}
          <div className="flex flex-col">
            {/* Badge */}
            <div ref={badgeRef} className="flex items-center gap-3 mb-8">
              <p className="font-rethink text-[14px] sm:text-[15px] tracking-[0.28em] text-[#ae1431] uppercase ">
                Academic Structure
              </p>
            </div>

            {/* Heading — word split */}
            <h2
              ref={headingRef}
              className="font-display text-white leading-[1.05] tracking-[-0.02em]
                text-[38px] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[62px]"
              style={{ perspective: "900px" }}
            >
              {[
                ["An Integrated", " Academic"],
                ["Athletic", "Ecosystem."],
              ].map((line, li) => (
                <span key={li} className="block">
                  {line.map((w, wi) => (
                    <span
                      key={wi}
                      className="word"
                      style={{ display: "inline-block", marginRight: "0.22em" }}
                    >
                      {w}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            {/* Divider */}
            <div
              ref={dividerRef}
              className="w-10 h-[2px] bg-[#ae1431] mt-6 mb-8"
            />

            {/* Body */}
            <p
              ref={bodyRef}
              className="font-rethink text-[14.5px] md:text-[15px] leading-[1.85] text-[#a09488] max-w-[560px]"
            >
              MMPS prepares students for board examinations through structured
              academic planning, with a curriculum structure that allows
              flexibility while maintaining consistent academic monitoring.
              Students are guided progressively from foundational years through
              board examination stages.
            </p>
            <br></br>
            {/* Streams list */}
            <div
              ref={streamsRef}
              className="relative border border-white/10 rounded-[20px] overflow-hidden"
            >
              {/* Clockwise-drawn border */}
              <div className="sb-top    absolute top-0    left-0  right-0  h-[1px] bg-white/10" />
              <div className="sb-right  absolute top-0    right-0 bottom-0 w-[1px] bg-white/10" />
              <div className="sb-bottom absolute bottom-0 left-0  right-0  h-[1px] bg-white/10" />
              <div className="sb-left   absolute top-0    left-0  bottom-0 w-[1px] bg-white/10" />

              {streams.map((item, i) => (
                <div
                  key={i}
                  className="stream-row relative px-5 py-5 flex items-center gap-4"
                >
                  {i !== 0 && (
                    <div className="stream-sep absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
                  )}
                  <div className="stream-icon w-9 h-9 bg-[#ae1431] rounded-sm flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="stream-title text-white font-rethink text-[16px] sm:text-[17px] leading-tight">
                      {item.title}
                    </h3>
                    <p className="stream-sub text-[13px] text-white/40 mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
