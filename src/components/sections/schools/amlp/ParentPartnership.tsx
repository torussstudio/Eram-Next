"use client";

import { useRef } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Continuous classroom monitoring",
  "Structured attendance supervision",
  "Parent communication coordination",
  "Teacher-guided activity sessions",
  "Foundational assessment practices",
  "Community-rooted yet system-driven delivery",
];

const messages = [
  {
    emoji: "📋",
    tag: "Academic Update",
    text: "Grade 3 formative assessment completed. Progress reports will be shared by Friday.",
    meta: "02-06-2026 · Academic Monitoring",
    accent: true,
  },
  {
    emoji: "✅",
    tag: "Attendance",
    text: "Your ward was present today. School hours: 9:00 AM – 3:30 PM.",
    meta: "22-05-2026 · Attendance System",
    accent: false,
  },
  {
    emoji: "📣",
    tag: "Notice",
    text: " School Annual Day celebrations scheduled for next Friday. All parents warmly invited.",
    meta: "21-05-2026 · Schoo, Management.",
    accent: true,
  },
  {
    emoji: "🏆",
    tag: "Activity",
    text: " Art & craft activity session completed for Grade 1 & 2 — photos shared in gallery.",
    meta: "30-04-2026 · Class Teacher",
    accent: false,
  },
];

export default function ParentPartnership() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ── Set all initial states before first paint ─────────────────────
      gsap.set(
        [
          ".anim-subtitle",
          ".anim-title",
          ".anim-desc",
          ".anim-bullet",
          ".anim-quote",
          ".anim-btn",
        ],
        { opacity: 0, y: 20 }
      );
      gsap.set(".anim-divider",       { opacity: 0, scaleX: 0, transformOrigin: "left center" });
      gsap.set(".anim-mockup",        { opacity: 0, y: 32 });
      gsap.set(".anim-mockup-header", { opacity: 0 });
      gsap.set(".anim-msg",           { opacity: 0, y: 14 });

      const trigger = {
        trigger: containerRef.current,
        start: "top 78%",
        toggleActions: "play none none none",
      };

      // ── Left column ───────────────────────────────────────────────────
      // Each element gets a deliberate beat; nothing fires simultaneously.
      const leftTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: trigger,
      });

      leftTl
        .to(".anim-subtitle", { opacity: 1, y: 0, duration: 0.45 })
        .to(".anim-title",    { opacity: 1, y: 0, duration: 0.65 }, "-=0.15")
        .to(".anim-divider",  { opacity: 1, scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.2")
        .to(".anim-desc",     { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
        .to(".anim-bullet",   { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.25")
        .to(".anim-quote",    { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .to(".anim-btn",      { opacity: 1, y: 0, duration: 0.45 }, "-=0.2");

      const rightTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: trigger,
      });

      rightTl
        .to(".anim-mockup",        { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(".anim-mockup-header", { opacity: 1, duration: 0.4 },       "-=0.2")
        .to(".anim-msg", {
            opacity: 1, y: 0,
            duration: 0.45,
            stagger: 0.09,        // messages trickle like a live feed
          }, "-=0.15");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`${shell} bg-[#F5EFE8] overflow-hidden`}
    >
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-2 md:pt-4 lg:pt-4 pb-8 md:pb-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col">
            <div className="anim-subtitle flex items-center gap-3 mb-8">
              <p className="font-rethink text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase ">
                Institutional Strengths
              </p>
            </div>

            <h2 className="font-display anim-title text-[#1a1209] leading-[1.05] tracking-[-0.02em]
              text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px]">
              Enduring Legacy.<br/>Early Discipline.<br/>Structured Supervision.
            </h2>

            <div className="anim-divider w-10 h-[2px] bg-[#ae1431] mt-6 mb-8" />

            <p className="anim-desc font-rethink  text-[14.5px] md:text-[15.5px] leading-[1.85] text-[#3d3128] max-w-[560px]">
              At the Lower Primary level, learning requires foundation, 
              close supervision, and coordinated communication. 
              AMLP maintains structured systems to support young learners
               — ensuring early academic gaps are addressed promptly and
                that learning habits are formed with discipline
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((item, i) => (
                <li
                  key={i}
                  className="font-rethink anim-bullet flex items-center gap-3 text-[14px] md:text-[15px] text-[#3d3128]"
                >
                  <span className="w-[6px] h-[6px] rounded-full bg-[#ae1431] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="font-display anim-quote mt-7 font-serif italic text-[14px] sm:text-[15px] text-[#9a8f84]">
              No student goes unnoticed. No parent remains uninformed.
            </p>

            <div className="mt-8 anim-btn">
              <button className="font-rethink bg-[#1a1209] text-white text-[11px] sm:text-[12px] tracking-[0.14em] uppercase
                px-7 py-4 flex items-center gap-3 cursor-pointer hover:bg-[#2e2318] transition-colors duration-200 rounded-[10px]">
                Access Parent Portal
                <span className="text-[15px]">→</span>
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN — WhatsApp mockup ── */}
          <div className="anim-mockup font-rethink w-full rounded-[14px] bg-[#181818] p-4 shadow-2xl">
            <div className="anim-mockup-header bg-[#ae1431] rounded-[6px] px-5 py-4 mb-3">
              <p className="text-white  text-[13px] sm:text-[14px] tracking-[0.01em]">
                MMHSS Parent Communication Channel
              </p>
            </div>

            <div className="flex flex-col gap-[6px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`anim-msg bg-[#242424] rounded-[5px] px-4 py-4
                    ${msg.accent ? "border-l-[3px] border-[#ae1431]" : "border-l-[3px] border-transparent"}`}
                >
                  <p className="inline-flex items-center px-3 py-1 text-[11px] bg-[#1f1f1f] border border-[#2d2d2d] rounded-full text-[#c8c0b8] tracking-[0.02em] mb-2">
                    {msg.meta}
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#c8c0b8] leading-[1.65]">
                    <span className="mr-1">{msg.emoji}</span>
                    <span className="font-rethink text-white">{msg.tag}:</span>{" "}
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}