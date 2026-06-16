"use client";

import { useRef } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Structured practice teaching exposure across real classrooms",
  "Internship opportunities in international schools",
  "15-day residential camp — empathy, adaptability & leadership",
  "Secular and inclusive institutional culture",
  "Focused batch size of 50 for individual mentorship",
  "KTET & PSC qualification-focused preparation"
];

const messages = [
  {
    emoji: "🎓",
    tag: "KTET Result",
    text: "45 out of 53 students cleared KTET 2025. Congratulations to this batch — results reflect structured preparation and discipline.",
    meta: "06-06-2026 · Academic Outcomes",
    accent: true,
  },
  {
    emoji: "📋",
    tag: "Practice Teaching",
    text: "Semester 3 teaching assignments begin Monday. Schedule shared with all students.",
    meta: "05-06-2026  · Academic Coordination",
    accent: false,
  },
  {
    emoji: "🏕️ ",
    tag: "Residential Camp",
    text: "15-day leadership camp confirmed for December. Attendance mandatory for all enrolled students.",
    meta: "04-06-2026 · Programme Coordination",
    accent: true,
  },
  {
    emoji: "📰",
    tag: " Magazine",
    text: "MMITE's annual printed magazine submissions open. All students encouraged to contribute.",
    meta: "03-06-2026  · Editorial Team",
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
        { opacity: 0, y: 20 },
      );
      gsap.set(".anim-divider", {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(".anim-mockup", { opacity: 0, y: 32 });
      gsap.set(".anim-mockup-header", { opacity: 0 });
      gsap.set(".anim-msg", { opacity: 0, y: 14 });

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
        .to(".anim-title", { opacity: 1, y: 0, duration: 0.65 }, "-=0.15")
        .to(
          ".anim-divider",
          { opacity: 1, scaleX: 1, duration: 0.55, ease: "power2.inOut" },
          "-=0.2",
        )
        .to(".anim-desc", { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
        .to(
          ".anim-bullet",
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.25",
        )
        .to(".anim-quote", { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .to(".anim-btn", { opacity: 1, y: 0, duration: 0.45 }, "-=0.2");

      const rightTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: trigger,
      });

      rightTl
        .to(".anim-mockup", { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(".anim-mockup-header", { opacity: 1, duration: 0.4 }, "-=0.2")
        .to(
          ".anim-msg",
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.09, // messages trickle like a live feed
          },
          "-=0.15",
        );
    },
    { scope: containerRef },
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
              <p className="font-rethink text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase font-medium">
                Institutional Strengths
              </p>
            </div>

            <h2
              className="font-display anim-title text-[#1a1209] leading-[1.05] tracking-[-0.02em]
              text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px]"
            >
              Discipline, Mentorship & Professional Formation
            </h2>

            <div className="anim-divider w-10 h-[2px] bg-[#ae1431] mt-6 mb-8" />

            <p className="anim-desc font-rethink  text-[14.5px] md:text-[15.5px] leading-[1.85] text-[#3d3128] max-w-[560px]">
              At MMITE, teacher formation is deliberate and supervised. 
              With a limited intake of 50 students per batch, mentorship 
              remains focused and individualised. Academic progress is 
              continuously monitored, and practical training is integrated 
              throughout the course duration.
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

            <p className="font-rethink anim-quote mt-7  text-[14px] sm:text-[15px] text-[#9a8f84]">
              No student goes unnoticed. No parent remains uninformed.
            </p>

            <div className="mt-8 anim-btn">
               <button
                className="font-rethink bg-[#ae1431] text-white text-[11px] sm:text-[12px] tracking-[0.14em] uppercase
                px-7 py-4 flex items-center gap-3 cursor-pointer hover:bg-black transition-colors duration-200 rounded-[10px]"
              >
                Access Parent Portal
                <Play className="w-4 h-4 shrink-0 transition-all duration-300" />
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN — WhatsApp mockup ── */}
          <div className="anim-mockup font-rethink w-full rounded-[14px] bg-[#181818] p-4 shadow-2xl">
            <div className="anim-mockup-header bg-[#ae1431] rounded-[6px] px-5 py-4 mb-3">
              <p className="text-white font-semibold text-[13px] sm:text-[14px] tracking-[0.01em]">
                MMITE Student Communication Channel
              </p>
            </div>

            <div className="flex flex-col gap-[6px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="anim-msg bg-[#242424] rounded-[5px] px-4 py-4 border-l-[3px] border-transparent hover:border-[#ae1431] hover:bg-[#2a2a2a] transition-all duration-300"
                >
                  <p className="inline-flex items-center px-3 py-1 text-[11px] bg-[#1f1f1f] border border-[#2d2d2d] rounded-full text-[#c8c0b8] tracking-[0.02em] mb-2">
                    {msg.meta}
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#c8c0b8] leading-[1.65]">
                    <span className="mr-1">{msg.emoji}</span>
                    <span className="font-semibold text-white">
                      {msg.tag}:
                    </span>{" "}
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
