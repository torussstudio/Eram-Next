"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const milestones = [
  {
    year: "2004",
    title: "MMITE Established",
    desc: "Mariyumma Memorial Institute of Teacher Education founded as the professional training wing of the ERAM Educational & Welfare Trust — the same year as MMPS.",
  },
  {
    year: "Early Years",
    title: "D.El.Ed Programme Structured",
    desc: "The two-year, four-semester D.El.Ed curriculum embedded — 14 papers aligned with NCERT/SCERT standards, integrating theory, pedagogy, and practical teaching assignments.",
  },
  {
    year: "Milestone",
    title: "Kerala's First TTI with a Printed Magazine",
    desc: "MMITE became Kerala's first and only Teacher Training Institute to publish a printed magazine — a marker of academic expression and institutional identity.",
  },
  {
    year: "2025",
    title: "45 of 53 Students Clear KTET",
    desc: "In 2025, 45 out of 53 students cleared the Kerala Teacher Eligibility Test — a result that reflects the strength of MMITE's focused qualification preparation system.",
  },
  {
    year: "Present",
    title: "PSC Top Ranks · Reputed Placements",
    desc: "Alumni securing 4th and 6th PSC ranks and placed in reputed institutions — reinforcing MMITE's reputation as an outcome-driven teacher education institute.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const lastParaRef = useRef<HTMLParagraphElement>(null);
  const subLabelRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null); // ← single absolute spine

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout | number | undefined;
    const handleResize = () => {
      // Debounce — recalculate after layout settles
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        recalcSpine();
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Extracted so both useEffects can call it
  const recalcSpine = () => {
    const spine = spineRef.current;
    const timeline = timelineRef.current;
    if (!spine || !timeline) return;
    const allDots = [...timeline.querySelectorAll(".ms-dot")];
    const firstDot = allDots[0];
    const lastDot = allDots[allDots.length - 1];
    if (!firstDot || !lastDot) return;
    const tlRect = timeline.getBoundingClientRect();
    const firstRect = firstDot.getBoundingClientRect();
    const lastRect = lastDot.getBoundingClientRect();
    const spineLeft = firstRect.left - tlRect.left + firstRect.width / 2;
    const spineTopOffset = firstRect.top - tlRect.top + firstRect.height / 2;
    gsap.set(spine, { left: spineLeft, top: spineTopOffset, xPercent: -50 });
  };

  useGSAP(
    () => {
      const ease = "power3.out";

      const st = (trigger: any, start = "top 82%") => ({
        trigger,
        start,
        toggleActions: "play none none none",
      });

      /* ── 1. LEFT COLUMN ── */
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease,
            scrollTrigger: st(badgeRef.current),
          },
        );
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease,
            scrollTrigger: st(headingRef.current, "top 85%"),
          },
        );
      }

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.inOut",
            scrollTrigger: st(dividerRef.current),
          },
        );
      }

      if (parasRef.current) {
        const paraItems = parasRef.current.querySelectorAll("p");
        if (paraItems.length) {
          gsap.fromTo(
            paraItems,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.18,
              ease,
              scrollTrigger: st(parasRef.current),
            },
          );
        }
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: -30, rotateZ: -0.6 },
          {
            opacity: 1,
            x: 0,
            rotateZ: 0,
            duration: 0.9,
            ease,
            scrollTrigger: st(quoteRef.current),
          },
        );
      }

      if (lastParaRef.current) {
        gsap.fromTo(
          lastParaRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease,
            scrollTrigger: st(lastParaRef.current),
          },
        );
      }

      /* ── 2. RIGHT COLUMN sub-label ── */
      if (subLabelRef.current) {
        gsap.fromTo(
          subLabelRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease,
            scrollTrigger: st(subLabelRef.current),
          },
        );
      }

      /* ── 3. MILESTONE ROWS — year + content slide in on scroll ── */
      if (timelineRef.current) {
        const rows = timelineRef.current.querySelectorAll(".milestone-row");

        if (rows.length) {
          rows.forEach((row) => {
            const year = row.querySelector(".ms-year");
            const content = row.querySelector(".ms-content");
            const dot = row.querySelector(".ms-dot");

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: row,
                  start: "top 84%",
                  toggleActions: "play none none none",
                },
              })
              .fromTo(
                year,
                { opacity: 0, x: -14 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.45,
                  ease,
                },
              )
              .fromTo(
                dot,
                {
                  opacity: 0,
                  scale: 0,
                  transformOrigin: "center center",
                },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.35,
                  ease: "back.out(1.4)",
                },
                "-=0.2",
              )
              .fromTo(
                content,
                { opacity: 0, x: 18 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                  ease,
                },
                "-=0.2",
              );
          });
        }
      }

      /* ── 4. SPINE — first dot center → last dot center ── */
      const spine = spineRef.current;
      const timeline = timelineRef.current;
      if (spine && timeline) {
        const allDots = [...timeline.querySelectorAll(".ms-dot")];
        const firstDot = allDots[0];
        const lastDot = allDots[allDots.length - 1];

        if (firstDot && lastDot) {
          const tlRect = timeline.getBoundingClientRect();
          const firstRect = firstDot.getBoundingClientRect();
          const lastRect = lastDot.getBoundingClientRect();

          const spineLeft = firstRect.left - tlRect.left + firstRect.width / 2;
          const spineTopOffset =
            firstRect.top - tlRect.top + firstRect.height / 2;
          const spineFullH =
            lastRect.top +
            lastRect.height / 2 -
            (firstRect.top + firstRect.height / 2);

          gsap.set(spine, {
            left: spineLeft,
            top: spineTopOffset,
            height: 0,
            xPercent: -50,
          });
          gsap.set(spine, {
            left: spineLeft,
            top: spineTopOffset,
            height: spineFullH,
            scaleY: 0,
            transformOrigin: "top center",
            xPercent: -50,
          });

          gsap.to(spine, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          });
        }
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={`${shell} bg-[#F5EFE8]`}>
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-20">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col">
            <div
              ref={badgeRef}
              className="flex items-center gap-3 mb-8 md:mb-10"
            >
              <p className="font-rethink text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase">
                Our Journey
              </p>
            </div>

            <h2
              ref={headingRef}
              className="font-display text-[#1a1209] leading-[1.0] tracking-[-0.02em]
                text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] xl:text-[64px]"
            >
              Two Decades of
              <br />
              Teacher Preparation
            </h2>

            <div
              ref={dividerRef}
              className="w-12 h-[2px] bg-[#ae1431] mt-6 mb-8"
            />

            <div
              ref={parasRef}
              className="font-rethink space-y-5 text-[14.5px] md:text-[15px] leading-[1.85] text-[#3d3128]"
            >
              <p>
                Every teacher begins as a student. Since 2004, MMITE has
                functioned as the professional training wing within the ERAM
                ecosystem, preparing aspiring educators for structured classroom
                leadership.
              </p>
              <p>
                Over two decades, the institute has built a reputation for
                disciplined academic execution, structured mentorship,
                qualification-focused preparation, and strong placement
                outcomes.
              </p>
            </div>

            <blockquote
              ref={quoteRef}
              className="border-l-[3px] border-[#ae1431] pl-5 my-8"
            >
              <p className="font-rethink font-bold  text-[#ae1431] text-[16px] sm:text-[18px] md:text-[19px] leading-[1.65]">
                "The journey of MMITE is not defined by scale, but by outcomes.
                Its graduates do not merely complete a course — they clear
                examinations, secure top ranks, and enter classrooms prepared."
              </p>
            </blockquote>

            <p
              ref={lastParaRef}
              className="font-rethink text-[14.5px] md:text-[15px] leading-[1.85] text-[#3d3128]"
            >
              Today, MMITE stands as the professional training pillar of the
              ERAM ecosystem — producing educators who carry institutional
              discipline into every classroom they lead.
            </p>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col">
            <p
              ref={subLabelRef}
              className="text-[11px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-10 hidden lg:block"
            >
              Two Decades of Structured Formation
            </p>

            {/* Timeline — relative container so the spine can be absolutely positioned */}
            <div ref={timelineRef} className="flex flex-col relative">
              <div
                ref={spineRef}
                className="absolute w-[1px] bg-[#ae1431]"
                style={{ height: 0 }}
                aria-hidden="true"
              />

              {milestones.map((item, i) => (
                <div key={i} className="milestone-row flex min-h-0 relative">
                  {/* Year */}
                  <div className="ms-year w-[72px] flex-shrink-0 pt-[2px]">
                    <span className="text-[12px] sm:text-[13px] text-[#8a7d6e] tracking-[0.03em] tabular-nums">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot column — no more per-segment spine segments */}
                  <div className="flex-shrink-0 flex flex-col items-center mr-7 sm:mr-8 self-stretch">
                    <div
                      className={[
                        "ms-dot w-[7px] h-[7px] rounded-full flex-shrink-0 mt-[5px] relative z-10",
                        i === milestones.length - 1
                          ? "bg-[#ae1431]"
                          : "bg-[#c0b5a6]",
                      ].join(" ")}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={[
                      "ms-content flex-1",
                      i < milestones.length - 1 ? "pb-9 sm:pb-10" : "pb-0",
                    ].join(" ")}
                  >
                    <h3 className="font-display text-[#1a1209] text-[17px] sm:text-[18px] md:text-[19px] leading-snug mb-2 tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="font-rethink text-[14px] sm:text-[14px] text-[#5a4e43] leading-[1.75]">
                      {item.desc}
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
