// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const data = [
//   {
//     id: "pillar-1",
//     label: "/01",
//     title: "Education",
//     desc: "Structured institutions, special needs schools, and teacher training programs expanding access and excellence.",
//   },
//   {
//     id: "pillar-2",
//     label: "/02",
//     title: "Health & Sanitation",
//     desc: "Preventive medical camps, surgical access, dialysis support, and sustainable public sanitation solutions.",
//   },
//   {
//     id: "pillar-3",
//     label: "/03",
//     title: "Humanitarian & Rehabilitation",
//     desc: "Housing, repatriation support, rehabilitation aid, and targeted livelihood initiatives for vulnerable communities.",
//   },
//   {
//     id: "pillar-4",
//     label: "/04",
//     title: "Youth & Sports",
//     desc: "National athlete support, professional sports patronage, and the development of the ERAM Sports Arena.",
//   },
//   {
//     id: "pillar-5",
//     label: "/05",
//     title: "Environment",
//     desc: "Water conservation, river restoration, check dams, and over 180 wells serving rural Palakkad communities.",
//   },
//   {
//     id: "pillar-6",
//     label: "/06",
//     title: "Community Infrastructure & Welfare",
//     desc: "Ambulance sponsorship, sanitation infrastructure, and interreligious harmony programs.",
//   },
// ];

// const css = `
//   /* ── grid wrapper ── */
//   .sf-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
//     border-top: 1px solid rgba(255,255,255,0.08);
//     border-left: 1px solid rgba(255,255,255,0.08);
//   }

//   /* ── each cell ── */
//   .sf-cell {
//     border-right: 1px solid rgba(255,255,255,0.08);
//     border-bottom: 1px solid rgba(255,255,255,0.08);
//     position: relative;
//     isolation: isolate;
//   }

//   /* ── card (fills cell fully, no transform that would shift layout) ── */
//   .sf-card {
//     position: relative;
//     padding: clamp(24px, 3.5vw, 40px);
//     min-height: clamp(190px, 22vw, 240px);
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     cursor: pointer;
//     overflow: hidden;
//     /* NO translateY — use inset shadow + bg instead */
//     transition: background 0.35s ease;
//     background: transparent;
//   }

//   /* Red glow overlay — fades in on hover */
//   .sf-card::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: radial-gradient(ellipse at 25% 55%, rgba(179,32,29,0.13) 0%, transparent 60%);
//     opacity: 0;
//     transition: opacity 0.45s ease;
//     pointer-events: none;
//     z-index: 0;
//   }
//   .sf-card:hover::before { opacity: 1; }

//   /* Top highlight line — slides in from left on hover */
//   .sf-card::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 2px;
//     width: 100%;
//     background: linear-gradient(90deg, #B3201D 0%, transparent 75%);
//     transform: scaleX(0);
//     transform-origin: left center;
//     transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
//     pointer-events: none;
//     z-index: 1;
//   }
//   .sf-card:hover::after { transform: scaleX(1); }

//   .sf-card > * { position: relative; z-index: 2; }

//   /* ── inner content transitions ── */
//   .sf-card .c-label {
//     display: block;
//     font-size: 10px;
//     letter-spacing: 0.22em;
//     color: #B3201D;
//     font-family: sans-serif;
//     margin-bottom: 14px;
//     transition: letter-spacing 0.4s ease, color 0.3s ease;
//   }
//   .sf-card:hover .c-label {
//     letter-spacing: 0.32em;
//     color: #E53935;
//   }

//   .sf-card .c-title {
//     font-family: Georgia, serif;
//     font-size: clamp(15px, 1.8vw, 18px);
//     font-weight: 400;
//     margin: 0 0 10px;
//     line-height: 1.3;
//     color: #fff;
//     transition: color 0.3s ease;
//   }
//   .sf-card:hover .c-title { color: #fff; }

//   .sf-card .c-desc {
//     font-size: clamp(12px, 1.2vw, 13px);
//     line-height: 1.78;
//     color: rgba(255,255,255,0.5);
//     margin: 0;
//     font-family: sans-serif;
//     transition: color 0.35s ease;
//   }
//   .sf-card:hover .c-desc { color: rgba(255,255,255,0.75); }

//   /* Arrow: subtle bounce-in from bottom-left to top-right */
//   .sf-card .c-arrow {
//     color: rgba(255,255,255,0.25);
//     font-size: 18px;
//     margin-top: clamp(14px, 2.5vw, 22px);
//     display: inline-block;
//     opacity: 0;
//     transform: translate(-4px, 4px) scale(0.8);
//     transition:
//       transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
//       color 0.3s ease,
//       opacity 0.3s ease;
//   }
//   .sf-card:hover .c-arrow {
//     opacity: 1;
//     color: rgba(255,255,255,0.9);
//     transform: translate(0px, 0px) scale(1);
//   }

//   /* Active (click) feedback */
//   .sf-card:active {
//     background: rgba(179,32,29,0.06);
//   }
// `;

// export default function StructuredFramework({ setActive }) {
//   const sectionRef  = useRef(null);
//   const headerRef   = useRef(null);
//   const noteRef     = useRef(null);
//   const cellRefs    = useRef([]);

//   /* ─── SCROLL ANIMATIONS ─── */
//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       /* Header children fade-blur-up */
//       const kids = Array.from(headerRef.current.children);
//       gsap.set(kids, { y: 48, opacity: 0, filter: "blur(8px)" });
//       gsap.to(kids, {
//         y: 0, opacity: 1, filter: "blur(0px)",
//         duration: 1.1, ease: "expo.out", stagger: 0.13,
//         scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
//       });

//       /* Scan line */
//       const scan = sectionRef.current.querySelector(".scan-line");
//       if (scan) {
//         gsap.fromTo(scan,
//           { scaleX: 0, transformOrigin: "left center" },
//           { scaleX: 1, duration: 1.5, ease: "power3.inOut",
//             scrollTrigger: { trigger: scan, start: "top 88%" } }
//         );
//       }

//       /* Cards fade-up — clearProps so CSS hover is untouched */
//       gsap.set(cellRefs.current, { opacity: 0, y: 52 });
//       gsap.to(cellRefs.current, {
//         opacity: 1, y: 0,
//         duration: 0.8, ease: "power4.out",
//         stagger: { amount: 0.5 },
//         clearProps: "all",
//         scrollTrigger: { trigger: cellRefs.current[0], start: "top 85%" },
//       });

//       /* Note */
//       gsap.fromTo(noteRef.current,
//         { opacity: 0, y: 18 },
//         { opacity: 1, y: 0, duration: 1, ease: "power3.out",
//           scrollTrigger: { trigger: noteRef.current, start: "top 93%" } }
//       );

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const handleCardClick = (id, index) => {
//     if (setActive) setActive(index);
//     setTimeout(() => {
//       const el = document.getElementById(id);
//       if (!el) return;
//       window.scrollTo({
//         top: el.getBoundingClientRect().top + window.pageYOffset - 80,
//         behavior: "smooth",
//       });
//     }, 300);
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <section
//         ref={sectionRef}
//         style={{
//           background: "#0e0e0e",
//           color: "#fff",
//           padding: "clamp(60px, 10vw, 120px) 0",
//           overflow: "hidden",
//         }}
//       >
//         <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(16px, 5vw, 40px)" }}>

//           {/* ── HEADER ── */}
//           <div
//             ref={headerRef}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "clamp(14px, 2.5vw, 24px)",
//               marginBottom: "clamp(48px, 8vw, 96px)",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.3)" }} />
//               <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontFamily: "sans-serif" }}>
//                 THE TRUST FRAMEWORK
//               </span>
//             </div>

//             <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "clamp(16px, 4vw, 56px)", justifyContent: "space-between" }}>
//               <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.9rem, 4.2vw, 3.4rem)", fontWeight: 300, lineHeight: 1.12, maxWidth: 540, margin: 0, letterSpacing: "-0.01em" }}>
//                 A Structured Approach<br />to Social Responsibility
//               </h2>
//               <p style={{ fontSize: "clamp(13px, 1.4vw, 14px)", lineHeight: 1.85, color: "rgba(255,255,255,0.6)", maxWidth: 360, margin: 0, fontFamily: "sans-serif" }}>
//                 The Trust operates through clearly defined focus areas, ensuring every initiative is part of a governed and accountable system.
//               </p>
//             </div>

//             <div className="scan-line" style={{ height: 1, background: "linear-gradient(90deg, rgba(179,32,29,0.9) 0%, rgba(255,255,255,0.06) 100%)" }} />
//           </div>

//           {/* ── GRID ── */}
//           <div className="sf-grid">
//             {data.map((item, i) => (
//               <div
//                 key={i}
//                 className="sf-cell"
//                 ref={(el) => (cellRefs.current[i] = el)}
//               >
//                 <div
//                   className="sf-card"
//                   onClick={() => handleCardClick(item.id, i)}
//                 >
//                   <div>
//                     <span className="c-label">{item.label}</span>
//                     <h3 className="c-title">{item.title}</h3>
//                     <p className="c-desc">{item.desc}</p>
//                   </div>
//                   <span className="c-arrow">↗</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── NOTE ── */}
//           <p ref={noteRef} style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: "clamp(28px, 4vw, 52px)", letterSpacing: "0.06em", fontFamily: "sans-serif" }}>
//             Each initiative is planned with long-term sustainability, institutional oversight, and measurable outcomes.
//           </p>

//         </div>
//       </section>
//     </>
//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "pillar-1",
    label: "/01",
    title: "Education",
    desc: "Structured institutions, special needs schools, and teacher training programs expanding access and excellence.",
  },
  {
    id: "pillar-2",
    label: "/02",
    title: "Health & Sanitation",
    desc: "Preventive medical camps, surgical access, dialysis support, and sustainable public sanitation solutions.",
  },
  {
    id: "pillar-3",
    label: "/03",
    title: "Humanitarian & Rehabilitation",
    desc: "Housing, repatriation support, rehabilitation aid, and targeted livelihood initiatives for vulnerable communities.",
  },
  {
    id: "pillar-4",
    label: "/04",
    title: "Youth & Sports",
    desc: "National athlete support, professional sports patronage, and the development of the ERAM Sports Arena.",
  },
  {
    id: "pillar-5",
    label: "/05",
    title: "Environment",
    desc: "Water conservation, river restoration, check dams, and over 180 wells serving rural Palakkad communities.",
  },
  {
    id: "pillar-6",
    label: "/06",
    title: "Community Infrastructure & Welfare",
    desc: "Ambulance sponsorship, sanitation infrastructure, and interreligious harmony programs.",
  },
];

export default function StructuredFramework({ setActive }) {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const noteRef    = useRef(null);
  const cellRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const kids = Array.from(headerRef.current.children);
      gsap.set(kids, { y: 48, opacity: 0, filter: "blur(8px)" });
      gsap.to(kids, {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 1.1, ease: "expo.out", stagger: 0.13,
        scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
      });

      const scan = sectionRef.current.querySelector(".scan-line");
      if (scan) {
        gsap.fromTo(scan,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.5, ease: "power3.inOut",
            scrollTrigger: { trigger: scan, start: "top 88%" } }
        );
      }

      gsap.set(cellRefs.current, { opacity: 0, y: 52 });
      gsap.to(cellRefs.current, {
        opacity: 1, y: 0,
        duration: 0.8, ease: "power4.out",
        stagger: { amount: 0.5 },
        clearProps: "all",
        scrollTrigger: { trigger: cellRefs.current[0], start: "top 85%" },
      });

      gsap.fromTo(noteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: noteRef.current, start: "top 93%" } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id, index) => {
    if (setActive) setActive(index);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <>
      {/* Tailwind cannot express pseudo-element & group-hover combos below without a tiny style block */}
      <style>{`
        .sf-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 25% 55%, rgba(179,32,29,0.13) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
          z-index: 0;
        }
        .sf-card:hover::before { opacity: 1; }
        .sf-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 2px; width: 100%;
          background: linear-gradient(90deg, #B3201D 0%, transparent 75%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
          z-index: 1;
        }
        .sf-card:hover::after { transform: scaleX(1); }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-[#0e0e0e] text-white py-[clamp(60px,10vw,120px)] overflow-hidden"
      >
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,5vw,40px)]">

          {/* ── HEADER ── */}
          <div
            ref={headerRef}
            className="flex flex-col gap-[clamp(14px,2.5vw,24px)] mb-[clamp(48px,8vw,96px)]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block w-7 h-px bg-white/30" />
              <span className="text-[10px] tracking-[0.32em] uppercase text-white/45 font-sans">
                THE TRUST FRAMEWORK
              </span>
            </div>

            <div className="flex flex-wrap items-end gap-[clamp(16px,4vw,56px)] justify-between">
              <h2 className="font-serif text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.12] max-w-[540px] m-0 tracking-[-0.01em]">
                A Structured Approach<br />to Social Responsibility
              </h2>
              <p className="text-[clamp(13px,1.4vw,14px)] leading-[1.85] text-white/60 max-w-[360px] m-0 font-sans">
                The Trust operates through clearly defined focus areas, ensuring every initiative is part of a governed and accountable system.
              </p>
            </div>

            <div
              className="scan-line h-px"
              style={{ background: "linear-gradient(90deg, rgba(179,32,29,0.9) 0%, rgba(255,255,255,0.06) 100%)" }}
            />
          </div>

          {/* ── GRID ── */}
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-white/[0.08]">
            {data.map((item, i) => (
              <div
                key={i}
                className="border-r border-b border-white/[0.08] relative isolate"
                ref={(el) => (cellRefs.current[i] = el)}
              >
                <div
                  className="sf-card relative p-[clamp(24px,3.5vw,40px)] min-h-[clamp(190px,22vw,240px)] flex flex-col justify-between cursor-pointer overflow-hidden transition-colors duration-[350ms] ease-[ease] bg-transparent active:bg-[rgba(179,32,29,0.06)]"
                  onClick={() => handleCardClick(item.id, i)}
                >
                  <div className="relative z-[2]">
                    <span className="block text-[10px] tracking-[0.22em] text-[#B3201D] font-sans mb-[14px] transition-[letter-spacing,color] duration-[400ms,300ms] ease-[ease] group-hover:tracking-[0.32em] group-hover:text-[#E53935]">
                      {item.label}
                    </span>
                    <h3 className="font-serif text-[clamp(15px,1.8vw,18px)] font-normal m-0 mb-[10px] leading-[1.3] text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[clamp(12px,1.2vw,13px)] leading-[1.78] text-white/50 m-0 font-sans transition-colors duration-[350ms]">
                      {item.desc}
                    </p>
                  </div>
                  <span className="c-arrow relative z-[2] text-white/25 text-[18px] mt-[clamp(14px,2.5vw,22px)] inline-block opacity-0 translate-x-[-4px] translate-y-[4px] scale-[0.8] transition-[transform,color,opacity] duration-[400ms,300ms,300ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── NOTE ── */}
          <p
            ref={noteRef}
            className="text-center text-[11px] text-white/[0.38] mt-[clamp(28px,4vw,52px)] tracking-[0.06em] font-sans"
          >
            Each initiative is planned with long-term sustainability, institutional oversight, and measurable outcomes.
          </p>

        </div>
      </section>
    </>
  );
}