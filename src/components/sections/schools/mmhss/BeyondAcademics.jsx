// import { shell } from "../../../../constants/homeStyles";

// export default function BeyondAcademics() {
//   return (
//     <section className={`${shell} bg-[#F5EFE8]`}>
//       <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
//         {/* ── HEADER ROW ── */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14 lg:mb-16">
//           <div>
//             <h2
//               className="font-serif text-[#1a1209] leading-[1.05] tracking-[-0.02em]
//   text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]"
//             >
//               Representation,
//               <br />
//               Recognition &amp; Exposure
//             </h2>
//           </div>
//           <div className="flex items-end">
//             <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#6b5f54] max-w-[520px]">
//               Academic consistency is matched by active participation beyond the
//               classroom — ensuring competitive exposure and character
//               development remain central to the student experience.
//             </p>
//           </div>
//         </div>

//         {/* ── SECTION 1: INSTITUTIONAL BENCHMARKS ── */}
//         <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
//           Institutional Benchmarks
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-12">
//           {[
//             {
//               tag: "Academic Record",
//               title: "14 Consecutive Years — 100% Higher Secondary Results",
//               desc: "A sustained record of complete pass results across all streams, maintained through disciplined academic systems and structured student monitoring.",
//             },
//             {
//               tag: "District Ranking",
//               title: "14th Rank Among 150 Schools in Palakkad District",
//               desc: "Recognised among the top institutions in Palakkad for consistent academic output and institutional discipline across Higher Secondary streams.",
//             },
//           ].map((card, i) => (
//             <div
//               key={i}
//               className={`group relative p-8 bg-white cursor-pointer
//                 border border-[#d4cbbf]
//                 border-t-[4px] border-t-[#d4cbbf]
//                 hover:border-t-[4px] hover:border-t-[#8b1020]
//                 transition-all duration-300`}
//             >
//               <span
//                 className="inline-block bg-[#fdf6ef] border border-[#d4cbbf] text-[#ae1431]
//                 text-[9px] tracking-[0.22em] uppercase px-3 py-1 mb-6 font-medium"
//               >
//                 {card.tag}
//               </span>
//               <h3 className="font-serif text-[#1a1209] text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] mb-3">
//                 {card.title}
//               </h3>
//               <p className="text-[13px] text-[#6b5f54] leading-[1.7] max-w-[480px]">
//                 {card.desc}
//               </p>
//               <span
//                 className="absolute bottom-4 right-5 font-serif text-[60px] text-[#e8dfd4] leading-none
//                 select-none pointer-events-none font-medium tracking-[-0.03em] opacity-70"
//               >
//                 14
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* ── SECTION 2: STUDENT EXCELLENCE ── */}
//         <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
//           Student Excellence
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-12">
//           {[
//             {
//               tag: "National Level · Sports",
//               title: "Diya Maryam",
//               sub: "Grade 11",
//               desc: "🥇 1st Place — National Level Wushu Championship, Hyderabad",
//             },
//             {
//               tag: "State Level · Cultural",
//               title: "Farha Shirin",
//               sub: "Grade 11",
//               desc: "🥇 A Grade — State Level Kalotsavam 2026 (English Story Writing)",
//             },
//             {
//               tag: "Scouts & Guides",
//               title: "Rajyapuraskar",
//               sub: "Governor's Award — Scouts & Guides",
//               desc: "100% success rate in Rajyapuraskar qualification — the highest Governor's Award for Scouts & Guides.",
//             },
//           ].map((card, i) => {
//             const isRed = i === 0;
//             const isDark = i === 1;
//             const bg = isRed
//               ? "bg-[#8b1020]"
//               : isDark
//                 ? "bg-[#1a1a1a]"
//                 : "bg-white border border-[#d4cbbf]";
//             const badge = isRed
//               ? "bg-[#ae1431] text-white"
//               : isDark
//                 ? "bg-[#2a2a2a] text-[#a09488]"
//                 : "bg-[#fdf6ef] border border-[#d4cbbf] text-[#ae1431]";
//             const titleC = isRed || isDark ? "text-white" : "text-[#1a1209]";
//             const subC = isRed
//               ? "text-white/50"
//               : isDark
//                 ? "text-white/40"
//                 : "text-[#8a7d6e]";
//             const descC = isRed
//               ? "text-white/80"
//               : isDark
//                 ? "text-white/70"
//                 : "text-[#4a3f35]";
//             return (
//               <div key={i} className={`p-7 ${bg}`}>
//                 <span
//                   className={`inline-block text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-6 font-medium ${badge}`}
//                 >
//                   {card.tag}
//                 </span>
//                 <h3
//                   className={`font-serif text-[22px] sm:text-[24px] leading-tight mb-1 ${titleC}`}
//                 >
//                   {card.title}
//                 </h3>
//                 <p className={`text-[12px] mb-5 ${subC}`}>{card.sub}</p>
//                 <p className={`text-[13px] leading-[1.65] ${descC}`}>
//                   {card.desc}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* ── SECTION 3: CIVIC LEADERSHIP & NSS ── */}
//         <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
//           Civic Leadership &amp; NSS
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-12">
//           {[
//             {
//               value: "100",
//               unit: "%",
//               label:
//                 "Success Rate in Rajyapuraskar Qualification\n(Highest Governor's Award)",
//               bg: "bg-[#1a1a1a]",
//               valC: "text-white",
//               unitC: "text-white/40",
//               descC: "text-[#5e554e]",
//             },
//             {
//               value: "50",
//               unit: "+",
//               label: "Blood Donations Annually\nunder NSS Program",
//               bg: "bg-[#8b1020]",
//               valC: "text-white",
//               unitC: "text-white/60",
//               descC: "text-white/55",
//             },
//             {
//               value: "100",
//               unit: "+",
//               label: "Scout & Guide Activities\nConducted Annually",
//               bg: "bg-[#1a1a1a]",
//               valC: "text-white",
//               unitC: "text-white/40",
//               descC: "text-[#5e554e]",
//             },
//           ].map((stat, i) => (
//             <div key={i} className={`px-8 py-10 ${stat.bg}`}>
//               <div className="flex items-baseline gap-1 mb-4">
//                 <span
//                   className={`font-serif text-[56px] sm:text-[64px] leading-none font-medium tracking-[-0.02em] ${stat.valC}`}
//                 >
//                   {stat.value}
//                 </span>
//                 <span className={`text-[18px] font-light ${stat.unitC}`}>
//                   {stat.unit}
//                 </span>
//               </div>
//               <p
//                 className={`text-[12px] sm:text-[13px] leading-[1.65] whitespace-pre-line ${stat.descC}`}
//               >
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

// Data arrays moved outside to keep component strictly for UI
const benchmarks = [
  {
    tag: "Academic Record",
    title: "14 Consecutive Years — 100% Higher Secondary Results",
    desc: "A sustained record of complete pass results across all streams, maintained through disciplined academic systems and structured student monitoring.",
  },
  {
    tag: "District Ranking",
    title: "14th Rank Among 150 Schools in Palakkad District",
    desc: "Recognised among the top institutions in Palakkad for consistent academic output and institutional discipline across Higher Secondary streams.",
  },
];

const excellence = [
  {
    tag: "National Level · Sports",
    title: "Diya Maryam",
    sub: "Grade 11",
    desc: "🥇 1st Place — National Level Wushu Championship, Hyderabad",
  },
  {
    tag: "State Level · Cultural",
    title: "Farha Shirin",
    sub: "Grade 11",
    desc: "🥇 A Grade — State Level Kalotsavam 2026 (English Story Writing)",
  },
  {
    tag: "Scouts & Guides",
    title: "Rajyapuraskar",
    sub: "Governor's Award — Scouts & Guides",
    desc: "100% success rate in Rajyapuraskar qualification — the highest Governor's Award for Scouts & Guides.",
  },
];

const stats = [
  {
    value: "100",
    unit: "%",
    label: "Success Rate in Rajyapuraskar Qualification\n(Highest Governor's Award)",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
  {
    value: "50",
    unit: "+",
    label: "Blood Donations Annually\nunder NSS Program",
    bg: "bg-[#8b1020]",
    valC: "text-white",
    unitC: "text-white/60",
    descC: "text-white/55",
  },
  {
    value: "100",
    unit: "+",
    label: "Scout & Guide Activities\nConducted Annually",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
];

export default function BeyondAcademics() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Ultra-clean looping logic for all fade-up animations
      const sections = [
        { wrap: ".anim-header-wrap", elements: ".anim-header" },
        { wrap: ".anim-bench-wrap", elements: ".anim-bench" },
        { wrap: ".anim-excel-wrap", elements: ".anim-excel" },
        { wrap: ".anim-stat-wrap", elements: ".anim-stat" },
      ];

      sections.forEach(({ wrap, elements }) => {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: wrap,
              start: "top 85%", // Triggers slightly before section enters view
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15, // Smooth sequential load
            ease: "power4.out", // Heavy & premium ease
          }
        );
      });

      // 2. Accurate Number Counter
      gsap.utils.toArray(".counter-num").forEach((el) => {
        const targetValue = parseInt(el.getAttribute("data-target"), 10);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            scrollTrigger: { trigger: ".anim-stat-wrap", start: "top 85%" },
            textContent: targetValue,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 }, // Guarantees whole numbers
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={`${shell} bg-[#F5EFE8]`}>
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
        
        {/* ── HEADER ROW ── */}
        <div className="anim-header-wrap grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14 lg:mb-16 overflow-hidden">
          <div className="anim-header">
            <h2
              className="font-serif text-[#1a1209] leading-[1.05] tracking-[-0.02em] 
              text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]"
            >
              Representation,
              <br />
              Recognition &amp; Exposure
            </h2>
          </div>
          <div className="anim-header flex items-end">
            <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#6b5f54] max-w-[520px]">
              Academic consistency is matched by active participation beyond the
              classroom — ensuring competitive exposure and character
              development remain central to the student experience.
            </p>
          </div>
        </div>

        {/* ── SECTION 1: INSTITUTIONAL BENCHMARKS ── */}
        <div className="anim-bench-wrap">
          <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Institutional Benchmarks
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-12">
            {benchmarks.map((card, i) => (
              <div
                key={i}
                className="anim-bench group relative p-8 bg-white cursor-pointer 
                border border-[#d4cbbf] border-t-[4px] border-t-[#d4cbbf] 
                hover:border-t-[4px] hover:border-t-[#8b1020] transition-all duration-300"
              >
                <span
                  className="inline-block bg-[#fdf6ef]  border-[#d4cbbf] text-[#ae1431] 
                  text-[9px] tracking-[0.22em] uppercase px-3 py-1 mb-6 font-medium"
                >
                  {card.tag}
                </span>
                <h3 className="font-serif text-[#1a1209] text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] mb-3">
                  {card.title}
                </h3>
                <p className="text-[13px] text-[#6b5f54] leading-[1.7] max-w-[480px]">
                  {card.desc}
                </p>
                <span
                  className="absolute bottom-4 right-5 font-serif text-[60px] text-[#e8dfd4] leading-none 
                  select-none pointer-events-none font-medium tracking-[-0.03em] opacity-70"
                >
                  14
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: STUDENT EXCELLENCE ── */}
        <div className="anim-excel-wrap">
          <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Student Excellence
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-12">
            {excellence.map((card, i) => {
              const isRed = i === 0;
              const isDark = i === 1;
              const bg = isRed ? "bg-[#8b1020]" : isDark ? "bg-[#1a1a1a]" : "bg-white border border-[#d4cbbf]";
              const badge = isRed ? "bg-[#ae1431] text-white" : isDark ? "bg-[#2a2a2a] text-[#a09488]" : "bg-[#fdf6ef] border border-[#d4cbbf] text-[#ae1431]";
              const titleC = isRed || isDark ? "text-white" : "text-[#1a1209]";
              const subC = isRed ? "text-white/50" : isDark ? "text-white/40" : "text-[#8a7d6e]";
              const descC = isRed ? "text-white/80" : isDark ? "text-white/70" : "text-[#4a3f35]";
              
              return (
                <div key={i} className={`anim-excel p-7 ${bg}`}>
                  <span
                    className={`inline-block text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-6 font-medium ${badge}`}
                  >
                    {card.tag}
                  </span>
                  <h3 className={`font-serif text-[22px] sm:text-[24px] leading-tight mb-1 ${titleC}`}>
                    {card.title}
                  </h3>
                  <p className={`text-[12px] mb-5 ${subC}`}>{card.sub}</p>
                  <p className={`text-[13px] leading-[1.65] ${descC}`}>
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 3: CIVIC LEADERSHIP & NSS ── */}
        <div className="anim-stat-wrap">
          <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Civic Leadership &amp; NSS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className={`anim-stat px-8 py-10 ${stat.bg}`}>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    data-target={stat.value}
                    className={`counter-num font-serif text-[56px] sm:text-[64px] leading-none font-medium tracking-[-0.02em] ${stat.valC}`}
                  >
                    0
                  </span>
                  <span className={`text-[18px] font-light ${stat.unitC}`}>
                    {stat.unit}
                  </span>
                </div>
                <p
                  className={`text-[12px] sm:text-[13px] leading-[1.65] whitespace-pre-line ${stat.descC}`}
                >
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