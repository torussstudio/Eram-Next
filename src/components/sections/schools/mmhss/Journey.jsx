// import { shell } from "../../../../constants/homeStyles";

// const milestones = [
//   {
//     year: "2005",
//     title: "MMHSS Established",
//     desc: "Higher Secondary School founded under the ERAM Educational & Welfare Trust, beginning with modest performance benchmarks.",
//   },
//   {
//     year: "2008",
//     title: "Structured Academic Systems Introduced",
//     desc: "Categorized student attention, morning study sessions, and supervised revision cycles implemented across all streams.",
//   },
//   {
//     year: "2011",
//     title: "First 100% Result Achieved",
//     desc: "Systematic monitoring and structured exam preparation leads to the institution's first complete pass result — a milestone that reset expectations.",
//   },
//   {
//     year: "2015",
//     title: "Parent Communication System Formalised",
//     desc: "Mandatory WhatsApp-based communication system introduced — bringing attendance, performance, and departmental updates directly to parents in real time.",
//   },
//   {
//     year: "2026",
//     title: "14 Consecutive Years — 100% Results",
//     desc: "A record sustained across every stream — Biology Science, Computer Science, and Commerce — reinforcing the school as one of Palakkad's top-ranked institutions.",
//   },
// ];

// export default function Journey() {
//   return (
//     <section className={`${shell} bg-[#F5EFE8]`}>
//       {/* Same max-width + padding as Hero's TOP SECTION */}
//       <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-20">
//           {/* ── LEFT COLUMN ── */}
//           <div className="flex flex-col">
//             <div className="flex items-center gap-3 mb-8 md:mb-10">
//               <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase font-medium">
//                 Our Journey
//               </p>
//             </div>

//             <h2
//               className="font-serif text-[#1a1209] leading-[1.0] tracking-[-0.02em]
//               text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] xl:text-[64px]"
//             >
//               A Transformation
//               <br />
//               in Performance
//             </h2>

//             <div className="w-12 h-[2px] bg-[#F5EFE8] mt-6 mb-8" />

//             <div className="space-y-5 text-[14px] md:text-[15px] leading-[1.85] text-[#3d3128]">
//               <p>
//                 When MMHSS began in 2005, it entered a competitive academic
//                 environment with modest score brackets. Over time, through
//                 structured intervention and systematic academic discipline, the
//                 school witnessed a significant transformation.
//               </p>
//               <p>
//                 Moving from single-digit high performers to consistent top
//                 scorers, the institution redefined what was possible through
//                 deliberate systems — not chance.
//               </p>
//             </div>

//             <blockquote className="border-l-[3px] border-[#ae1431] pl-5 my-8">
//               <p className="font-serif italic text-[#ae1431] text-[16px] sm:text-[18px] md:text-[19px] leading-[1.65]">
//                 "For 14 consecutive years, we have maintained a 100% Higher
//                 Secondary result."
//               </p>
//             </blockquote>

//             <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#3d3128]">
//               We always ensure academic attention, extended study systems, and
//               continuous parent communication — across every batch, every year.
//             </p>
//           </div>

//           {/* ── RIGHT COLUMN ── */}
//           <div className="flex flex-col">
//             <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-10 hidden lg:block">
//               From Modest Beginnings to Measured Excellence
//             </p>

//             {/* Timeline */}
//             <div className="flex flex-col">
//               {milestones.map((item, i) => (
//                 <div key={i} className="flex min-h-0">
//                   {/* Year */}
//                   <div className="w-[72px] flex-shrink-0 pt-[2px]">
//                     <span className="text-[12px] sm:text-[13px] text-[#8a7d6e] tracking-[0.03em] tabular-nums">
//                       {item.year}
//                     </span>
//                   </div>

//                   {/* Vertical line */}
//                   <div className="flex-shrink-0 w-[1px] bg-[#c0b5a6] mr-7 sm:mr-8 self-stretch" />

//                   {/* Content */}
//                   <div
//                     className={`flex-1 ${i < milestones.length - 1 ? "pb-9 sm:pb-10" : "pb-0"}`}
//                   >
//                     <h3 className="font-serif text-[#1a1209] text-[17px] sm:text-[18px] md:text-[19px] leading-snug mb-2 tracking-[-0.01em]">
//                       {item.title}
//                     </h3>
//                     <p className="text-[13px] sm:text-[14px] text-[#5a4e43] leading-[1.75]">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const milestones = [
  {
    year: "2005",
    title: "MMHSS Established",
    desc: "Higher Secondary School founded under the ERAM Educational & Welfare Trust, beginning with modest performance benchmarks.",
  },
  {
    year: "2008",
    title: "Structured Academic Systems Introduced",
    desc: "Categorized student attention, morning study sessions, and supervised revision cycles implemented across all streams.",
  },
  {
    year: "2011",
    title: "First 100% Result Achieved",
    desc: "Systematic monitoring and structured exam preparation leads to the institution's first complete pass result — a milestone that reset expectations.",
  },
  {
    year: "2015",
    title: "Parent Communication System Formalised",
    desc: "Mandatory WhatsApp-based communication system introduced — bringing attendance, performance, and departmental updates directly to parents in real time.",
  },
  {
    year: "2026",
    title: "14 Consecutive Years — 100% Results",
    desc: "A record sustained across every stream — Biology Science, Computer Science, and Commerce — reinforcing the school as one of Palakkad's top-ranked institutions.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Journey() {
  const sectionRef   = useRef(null);
  const badgeRef     = useRef(null);
  const headingRef   = useRef(null);
  const dividerRef   = useRef(null);
  const parasRef     = useRef(null);
  const quoteRef     = useRef(null);
  const lastParaRef  = useRef(null);
  const subLabelRef  = useRef(null);
  const timelineRef  = useRef(null);
  const lineRef      = useRef(null);   // vertical spine

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = "power3.out";

      /* ── Shared ScrollTrigger factory ── */
      const st = (trigger, start = "top 82%") => ({
        trigger,
        start,
        toggleActions: "play none none none",
      });

      /* ── 1. LEFT COLUMN — staggered entrance ── */

      // Badge label
      gsap.fromTo(badgeRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease, scrollTrigger: st(badgeRef.current) }
      );

      // Heading: word-by-word clip reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
          duration: 1.05, ease,
          scrollTrigger: st(headingRef.current, "top 85%"),
        }
      );

      // Red divider draws left → right
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 0.6, ease: "power2.inOut",
          scrollTrigger: st(dividerRef.current),
        }
      );

      // Paragraphs stagger up
      const paraItems = parasRef.current?.querySelectorAll("p");
      if (paraItems?.length) {
        gsap.fromTo(paraItems,
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.18, ease,
            scrollTrigger: st(parasRef.current),
          }
        );
      }

      // Blockquote slides in from left with a slight rotation
      gsap.fromTo(quoteRef.current,
        { opacity: 0, x: -30, rotateZ: -0.6 },
        {
          opacity: 1, x: 0, rotateZ: 0, duration: 0.9, ease,
          scrollTrigger: st(quoteRef.current),
        }
      );

      // Last paragraph
      gsap.fromTo(lastParaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease,
          scrollTrigger: st(lastParaRef.current),
        }
      );

      /* ── 2. RIGHT COLUMN — sub-label ── */
      if (subLabelRef.current) {
        gsap.fromTo(subLabelRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1, y: 0, duration: 0.6, ease,
            scrollTrigger: st(subLabelRef.current),
          }
        );
      }

      /* ── 3. Timeline vertical spine grows downward ── */
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.4, ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── 4. Milestone rows — stagger in as you scroll ── */
      const rows = timelineRef.current?.querySelectorAll(".milestone-row");
      if (rows?.length) {
        rows.forEach((row, i) => {
          const year    = row.querySelector(".ms-year");
          const content = row.querySelector(".ms-content");
          const dot     = row.querySelector(".ms-dot");

          // Year fades from left
          gsap.fromTo(year,
            { opacity: 0, x: -14 },
            {
              opacity: 1, x: 0, duration: 0.55, ease,
              scrollTrigger: { trigger: row, start: "top 84%", toggleActions: "play none none none" },
            }
          );

          // Dot pops in with scale
          gsap.fromTo(dot,
            { opacity: 0, scale: 0, transformOrigin: "center center" },
            {
              opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)",
              scrollTrigger: { trigger: row, start: "top 84%", toggleActions: "play none none none" },
              delay: 0.08,
            }
          );

          // Content slides in from right with stagger
          gsap.fromTo(content,
            { opacity: 0, x: 24 },
            {
              opacity: 1, x: 0, duration: 0.65, ease,
              scrollTrigger: { trigger: row, start: "top 84%", toggleActions: "play none none none" },
              delay: 0.12,
            }
          );

          // Last milestone gets a subtle red glow pulse
          if (i === rows.length - 1) {
            gsap.to(dot, {
              boxShadow: "0 0 0 6px rgba(174,20,49,0.18)",
              duration: 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1,
            });
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${shell} bg-[#F5EFE8]`}>
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-20">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col">
            {/* Badge */}
            <div ref={badgeRef} className="flex items-center gap-3 mb-8 md:mb-10">
              <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase font-medium">
                Our Journey
              </p>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-serif text-[#1a1209] leading-[1.0] tracking-[-0.02em]
                text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] xl:text-[64px]"
            >
              A Transformation
              <br />
              in Performance
            </h2>

            {/* Divider */}
            <div ref={dividerRef} className="w-12 h-[2px] bg-[#ae1431] mt-6 mb-8" />

            {/* Paragraphs */}
            <div ref={parasRef} className="space-y-5 text-[14px] md:text-[15px] leading-[1.85] text-[#3d3128]">
              <p>
                When MMHSS began in 2005, it entered a competitive academic
                environment with modest score brackets. Over time, through
                structured intervention and systematic academic discipline, the
                school witnessed a significant transformation.
              </p>
              <p>
                Moving from single-digit high performers to consistent top
                scorers, the institution redefined what was possible through
                deliberate systems — not chance.
              </p>
            </div>

            {/* Blockquote */}
            <blockquote ref={quoteRef} className="border-l-[3px] border-[#ae1431] pl-5 my-8">
              <p className="font-serif italic text-[#ae1431] text-[16px] sm:text-[18px] md:text-[19px] leading-[1.65]">
                "For 14 consecutive years, we have maintained a 100% Higher
                Secondary result."
              </p>
            </blockquote>

            {/* Last para */}
            <p ref={lastParaRef} className="text-[14px] md:text-[15px] leading-[1.85] text-[#3d3128]">
              We always ensure academic attention, extended study systems, and
              continuous parent communication — across every batch, every year.
            </p>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col">
            <p
              ref={subLabelRef}
              className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-10 hidden lg:block"
            >
              From Modest Beginnings to Measured Excellence
            </p>

            {/* Timeline */}
            <div ref={timelineRef} className="flex flex-col relative">
              {milestones.map((item, i) => (
                <div key={i} className="milestone-row flex min-h-0">

                  {/* Year */}
                  <div className="ms-year w-[72px] flex-shrink-0 pt-[2px]">
                    <span className="text-[12px] sm:text-[13px] text-[#8a7d6e] tracking-[0.03em] tabular-nums">
                      {item.year}
                    </span>
                  </div>

                  {/* Vertical spine + dot */}
                  <div className="flex-shrink-0 flex flex-col items-center mr-7 sm:mr-8 self-stretch">
                    {/* Dot */}
                    <div
                      className={[
                        "ms-dot w-[7px] h-[7px] rounded-full flex-shrink-0 mt-[5px]",
                        i === milestones.length - 1
                          ? "bg-[#ae1431]"
                          : "bg-[#c0b5a6]",
                      ].join(" ")}
                    />
                    {/* Spine segment — hidden on last item */}
                    {i < milestones.length - 1 && (
                      <div
                        ref={i === 0 ? lineRef : null}
                        className="w-[1px] flex-1 bg-[#c0b5a6] mt-1"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={[
                      "ms-content flex-1",
                      i < milestones.length - 1 ? "pb-9 sm:pb-10" : "pb-0",
                    ].join(" ")}
                  >
                    <h3 className="font-serif text-[#1a1209] text-[17px] sm:text-[18px] md:text-[19px] leading-snug mb-2 tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#5a4e43] leading-[1.75]">
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