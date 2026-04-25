// export default function StructuredFramework({ setActive }) {
//   const data = [
//     {
//       id: "pillar-1",
//       label: "/01",
//       title: "Education",
//       desc: "Structured institutions, special needs schools, and teacher training programs expanding access and excellence.",
//     },
//     {
//       id: "pillar-2",
//       label: "/02",
//       title: "Health & Sanitation",
//       desc: "Preventive medical camps, surgical access, dialysis support, and sustainable public sanitation solutions.",
//     },
//     {
//       id: "pillar-3",
//       label: "/03",
//       title: "Humanitarian & Rehabilitation",
//       desc: "Housing, repatriation support, rehabilitation aid, and targeted livelihood initiatives for vulnerable communities.",
//     },
//     {
//       id: "pillar-4",
//       label: "/04",
//       title: "Youth & Sports",
//       desc: "National athlete support, professional sports patronage, and the development of the ERAM Sports Arena.",
//     },
//     {
//       id: "pillar-5",
//       label: "/05",
//       title: "Environment",
//       desc: "Water conservation, river restoration, check dams, and over 180 wells serving rural Palakkad communities.",
//     },
//     {
//       id: "pillar-6",
//       label: "/06",
//       title: "Community Infrastructure & Welfare",
//       desc: "Ambulance sponsorship, sanitation infrastructure, and interreligious harmony programs.",
//     },
//   ];

//   // ✅ FINAL scroll + open handler
//   const handleCardClick = (id, index) => {
//     if (setActive) {
//       setActive(index); // open accordion
//     }

//     setTimeout(() => {
//       const el = document.getElementById(id);

//       if (!el) {
//         console.error("Element not found:", id);
//         return;
//       }

//       const y =
//         el.getBoundingClientRect().top + window.pageYOffset - 80;

//       window.scrollTo({
//         top: y,
//         behavior: "smooth",
//       });
//     }, 300);
//   };

//   return (
//     <section className="bg-[#0E0E0E] text-white py-[100px]">
//       <div className="max-w-[1100px] mx-auto px-[20px]">

//         {/* TOP */}
//         <div className="grid md:grid-cols-2 gap-[60px] mb-[80px]">

//           {/* LEFT */}
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <span className="w-[26px] h-[1px] bg-white/40" />
//               <span className="text-[11px] tracking-[0.3em] uppercase text-white/60">
//                 THE TRUST FRAMEWORK
//               </span>
//             </div>

//             <h2 className="font-serif text-[clamp(2.4rem,3vw,3.2rem)] leading-[1.15] font-light">
//               A Structured Approach
//               <br />
//               to Social Responsibility
//             </h2>
//           </div>

//           {/* RIGHT */}
//           <div className="text-[14px] leading-[1.9] text-white/70 max-w-[420px] ml-auto">
//             The Trust operates through clearly defined focus areas, ensuring
//             every initiative is part of a governed and accountable system.
//           </div>
//         </div>

//         {/* GRID */}
//         <div className="grid md:grid-cols-3 border border-white/10">
//           {data.map((item, i) => (
//             <div
//               key={i}
//               onClick={() => handleCardClick(item.id, i)}
//               className="
//                 cursor-pointer
//                 border-white/10
//                 p-[34px]
//                 min-h-[220px]
//                 flex flex-col justify-between
//                 transition duration-300
//                 hover:bg-white/5
//               "
//               style={{
//                 borderRight:
//                   i % 3 !== 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
//                 borderBottom:
//                   i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
//               }}
//             >
//               {/* TOP */}
//               <div>
//                 <span className="text-[11px] text-[#B3201D] tracking-[0.2em]">
//                   {item.label}
//                 </span>

//                 <h3 className="mt-4 font-serif text-[18px]">
//                   {item.title}
//                 </h3>

//                 <p className="mt-3 text-[13px] text-white/60 leading-[1.7]">
//                   {item.desc}
//                 </p>
//               </div>

//               {/* ARROW */}
//               <span className="text-white/40 text-lg mt-6">↗</span>
//             </div>
//           ))}
//         </div>

//         {/* BOTTOM NOTE */}
//         <p className="text-center text-[12px] text-white/50 mt-[50px]">
//           Each initiative is planned with long-term sustainability,
//           institutional oversight, and measurable outcomes.
//         </p>
//       </div>
//     </section>
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
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const lineRef     = useRef(null);
  const headingRef  = useRef(null);
  const bodyTextRef = useRef(null);
  const gridRef     = useRef(null);
  const noteRef     = useRef(null);
  const cardRefs    = useRef([]);
  const hoverTls    = useRef([]);

  /* ── SCROLL ANIMATIONS ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 85%" } }
      );

      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.9, delay: 0.25, ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 85%" } }
      );

      gsap.fromTo(
        headingRef.current.querySelectorAll(".word"),
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power4.out", stagger: 0.07,
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" } }
      );

      gsap.fromTo(bodyTextRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: bodyTextRef.current, start: "top 85%" } }
      );

      gsap.fromTo(gridRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
      );

      gsap.fromTo(cardRefs.current,
        { y: 70, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power4.out", stagger: 0.09,
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" } }
      );

      gsap.fromTo(noteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: noteRef.current, start: "top 92%" } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── HOVER TIMELINES ── */
  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl
        .to(card,                            { y: -12, duration: 0.45 }, 0)
        .to(card.querySelector(".c-title"),  { y: -4,  duration: 0.4  }, 0)
        .to(card.querySelector(".c-desc"),   { y: -4, opacity: 0.9, duration: 0.4 }, 0)
        .to(card.querySelector(".c-label"),  { x: 5, letterSpacing: "0.32em", duration: 0.4 }, 0)
        .to(card.querySelector(".c-arrow"),  { x: 9, y: -9, scale: 1.45, opacity: 1,
                                               duration: 0.4, ease: "back.out(1.7)" }, 0);

      hoverTls.current[i] = tl;
    });

    return () => hoverTls.current.forEach((tl) => tl?.kill());
  }, []);

  const handleMouseEnter = (i) => hoverTls.current[i]?.play();
  const handleMouseLeave = (i) => hoverTls.current[i]?.reverse();

  /* ── CLICK ── */
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

  /* ── WORD SPLIT ── */
  const splitWords = (text) =>
    text.split(" ").map((w, i) => (
      <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.25 }}>
        <span className="word" style={{ display: "inline-block" }}>{w}&nbsp;</span>
      </span>
    ));

  return (
    <section ref={sectionRef} className="bg-[#0E0E0E] text-white py-[100px]">
      <div className="max-w-[1100px] mx-auto px-[20px]">

        <div className="grid md:grid-cols-2 gap-[60px] mb-[80px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span ref={lineRef} className="w-[26px] h-[1px] bg-white/40" style={{ display: "inline-block" }} />
              <span ref={eyebrowRef} className="text-[11px] tracking-[0.3em] uppercase text-white/60">
                THE TRUST FRAMEWORK
              </span>
            </div>
            <h2 ref={headingRef} className="font-serif text-[clamp(2.4rem,3vw,3.2rem)] leading-[1.15] font-light">
              {splitWords("A Structured Approach to Social Responsibility")}
            </h2>
          </div>

          <div ref={bodyTextRef} className="text-[14px] leading-[1.9] text-white/70 max-w-[420px] ml-auto">
            The Trust operates through clearly defined focus areas, ensuring
            every initiative is part of a governed and accountable system.
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 border border-white/10">
          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => handleCardClick(item.id, i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="cursor-pointer p-[34px] min-h-[220px] flex flex-col justify-between hover:bg-white/5 transition-colors duration-300"
              style={{
                borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                willChange: "transform",
              }}
            >
              <div>
                <span className="c-label text-[11px] text-[#B3201D] tracking-[0.2em]">
                  {item.label}
                </span>
                <h3 className="c-title mt-4 font-serif text-[18px]">
                  {item.title}
                </h3>
                <p className="c-desc mt-3 text-[13px] text-white/60 leading-[1.7]">
                  {item.desc}
                </p>
              </div>
              <span className="c-arrow text-white/40 text-lg mt-6 inline-block">↗</span>
            </div>
          ))}
        </div>

        <p ref={noteRef} className="text-center text-[12px] text-white/50 mt-[50px]">
          Each initiative is planned with long-term sustainability,
          institutional oversight, and measurable outcomes.
        </p>

      </div>
    </section>
  );
}