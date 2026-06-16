"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";


// ─── Data ────────────────────────────────────────────────────────────────────
const QUICK_FACTS = [
  ["D.El.Ed", "Diploma in Elementary Education · 2 Years"],
  ["50", "Students per Batch (Intake)"],
  ["NCERT", "Affiliation · SCERT | Male & Female"],
  ["20+ Yrs", "Of Teacher Preparation"],
];

const STATS = [
  { value: "45/53", desc: ["Students Cleared", "KTET 2025"] },
  { value: "4th", desc: ["PSC Top Rank", "Secured by Alumni"] },
  { value: "20+", desc: ["Years of Structured", "Teacher Preparation"] },
  { value: "50", desc: ["Students per Batch —", "Focused Mentorship"] },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const router = useRouter();

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    if (overlayRef.current) {
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9 }
      );
    }

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.4"
      );
    }

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.7"
      );
    }

    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      );
    }

    if (btnsRef.current) {
      tl.fromTo(
        btnsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      );
    }

    if (panelRef.current) {
      tl.fromTo(
        panelRef.current,
        { opacity: 0, x: 36, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
        },
        "-=0.7"
      );
    }

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5 },
        "-=0.4"
      );
    }

    if (factsRef.current) {
      const factItems = factsRef.current.querySelectorAll(".fact-item");
      if (factItems.length) {
        tl.fromTo(
          factItems,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.35"
        );
      }
    }

    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll(".stat-item");
      if (statItems.length) {
        gsap.fromTo(
          statItems,
          { y: 24, scale: 0.98 },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`${shell} bg-[#F5EFE8] py-9`}>
      {/* ── HERO CARD ── */}
      <div className="relative rounded-[28px] overflow-hidden text-white">
        {/* BACKGROUND */}
        <img
          src="/images/mmite.webp"
          alt="Hero"
          decoding="async"
          fetchPriority="high"
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
                <p className="font-rethink text-[13px] sm:text-[14px] tracking-[0.28em] text-white uppercase">
                  Teacher Training Institute · Est. 2004
                </p>
              </div>

              <h1
                ref={headingRef}
                className="font-display leading-[1.05] tracking-[-0.02em]
  text-[36px] xs:text-[42px] sm:text-[52px] md:text-[62px] lg:text-[72px]"
              >
                Mariyumma Memorial <br />
                Institute of Teacher <br />
                <span className="font-display  text-white/60">Education</span>
              </h1>
              <p
                ref={subtextRef}
                className="font-rethink mt-4 sm:mt-5 text-[1.05rem] sm:text-[14px] md:text-[15px]
                  leading-[1.8] text-white/70 max-w-[560px]"
              >
                <span className="text-white ">
                  20+ Years of Preparing Qualified Educators.
                </span>
                <br />
                Established in 2004, MMITE prepares aspiring teachers through
                 structured academic formation, disciplined supervision, and 
                 qualification-focused outcomes — shaping professionals who 
                 step into classrooms with clarity and confidence.
              </p>

              <div ref={btnsRef} className="flex flex-wrap gap-3 mt-6 sm:mt-7">
                 <button
  className="
    font-rethink bg-[#ae1431]
    px-5 md:px-7 py-2.5 md:py-3
    text-[10px] sm:text-[11px] md:text-[12px]
    tracking-[0.12em] uppercase
    cursor-pointer active:scale-[0.98]
    transition-transform rounded-[12px]
    flex items-center hover:bg-black justify-center gap-2
    whitespace-nowrap
  "
>
  <span>Admissions Open</span>
  <Play className="w-4 h-4 shrink-0 transition-all duration-300" />
</button>
               <button
                  onClick={() => router.push("/contact")}
                  className="font-rethink border border-white/30 px-5 md:px-7 py-2.5 md:py-3
                    text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.12em] uppercase
                    flex items-center gap-2 cursor-pointer 
                    active:scale-[0.98] transition-transform hover:bg-white hover:text-[#ae1431] rounded-[12px]"
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
               border border-white/10 rounded-md p-5
                lg:ml-auto lg:mr-8 mt-2 lg:mt-0 will-change-transform"
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  ref={lineRef}
                  className="w-5 h-[1px] bg-[#ae1431] block"
                />
                <p className="text-[11px] tracking-[0.28em] text-[#ae1431] uppercase">
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
                    <h3 className="text-[18px] font-display sm:text-[20px] md:text-[22px] font-display leading-tight">
                      {title}
                    </h3>
                    <p className="text-[11px] font-display sm:text-[12px] text-white/60 mt-1 leading-snug">
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
                      "py-10 sm:py-14 md:py-[40px] lg:py-[50px] px-4 sm:px-5",
                      i % 2 === 0 ? "border-r border-white/10" : "",
                      i < 2 ? "border-b border-white/10 md:border-b-0" : "",
                      i !== 3 ? "md:border-r md:border-white/10" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <h3
                      className=" text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px]
                        text-[#eae6df] font-display tracking-[-0.02em] leading-none"
                    >
                      {item.value}
                    </h3>
                    <p className="mt-3 sm:mt-[14px] text-[12px] font-rethink sm:text-[12px] md:text-[13px] text-[#8f877d] leading-[1.6]">
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
