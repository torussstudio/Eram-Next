// import { ArrowRight } from "lucide-react";

// export default function AdmissionsPage() {
//   return (
//     <div className="font-sans">
//       {/* TOP RED BORDER */}
//       <div className="h-1 bg-[#8B1A14]" />

//       {/* HERO SECTION */}
//       <section className="bg-[#F5EFE8] px-10 py-16">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
//           {/* LEFT */}
//           <div className="max-w-xl">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-6 h-[1.5px] bg-[#8B1A14]" />
//               <span className="text-xs tracking-widest uppercase text-[#8B1A14] font-medium">
//                 Admissions 2026–27
//               </span>
//             </div>

//             <h1 className="font-serif text-[#1a1209] text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] mb-8 whitespace-nowrap">
//               Begin the Journey at MMHSS.
//             </h1>

//             <p className="text-[#3a3228] text-base leading-relaxed max-w-sm">
//               Admissions are now open for Higher Secondary streams — Biology
//               Science, Computer Science, and Commerce. Join an institution with
//               a proven record of academic excellence, structured discipline, and
//               consistent results.
//             </p>
//           </div>

//           {/* RIGHT — BUTTONS */}
//           <div className="flex flex-col gap-3 lg:min-w-[280px]">
//             <button className="bg-[#8B1A14] text-white px-6 py-4 text-xs tracking-widest uppercase flex items-center justify-between gap-4 hover:bg-[#7a1410] transition-colors cursor-pointer">
//               Apply Now — 2026–27
//               <ArrowRight size={14} />
//             </button>
//             <button className="border border-[#1a1209] text-[#1a1209] px-6 py-4 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
//               Book a Campus Visit
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* INSTITUTIONS SECTION */}
//       <section className="bg-[#F5EFE8] px-10 py-12">
//         <div className="max-w-7xl mx-auto">
//           <p className="text-xs tracking-widest uppercase text-[#6b6256] mb-6">
//             Explore All ERAM Institutions
//           </p>

//           {/* CARDS */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1 border border-[#c4bdb3]">
//             <div className="bg-white border-r border-[#c4bdb3] p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
//               <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
//                 LP School
//               </p>
//               <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
//                 AMLP
//               </p>
//               <p className="text-xs text-[#6b6256] group-hover:text-white/60">
//                 Aided Mappila LP School
//               </p>
//             </div>

//             <div className="bg-white border-r border-[#c4bdb3] p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
//               <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
//                 High School
//               </p>
//               <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
//                 MMPS
//               </p>
//               <p className="text-xs text-[#6b6256] group-hover:text-white/60">
//                 Mariyumma Memorial Public School
//               </p>
//             </div>

//             {/* ACTIVE — no hover */}
//             <div className="bg-[#8B1A14] border-r border-[#7a1410] p-6">
//               <p className="text-[10px] tracking-widest uppercase text-white/60 mb-3">
//                 Higher Secondary
//               </p>
//               <p className="font-serif text-white text-xl font-bold mb-1">
//                 MMHSS
//               </p>
//               <p className="text-xs text-white/70">
//                 Mariyumma Memorial Hr. Sec. School
//               </p>
//             </div>

//             <div className="bg-white border-r border-[#c4bdb3] p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
//               <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
//                 CBSE School
//               </p>
//               <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
//                 EASE
//               </p>
//               <p className="text-xs text-[#6b6256] group-hover:text-white/60">
//                 ERAM Academy for Sports & Excellence
//               </p>
//             </div>

//             <div className="bg-white p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
//               <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
//                 Teacher Training
//               </p>
//               <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
//                 MMITE
//               </p>
//               <p className="text-xs text-[#6b6256] group-hover:text-white/60">
//                 Mariyumma Memorial Institute of Teacher Ed.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// OPTIMIZATION: Extracted static card data to keep the JSX clean
const institutions = [
  {
    type: "LP School",
    name: "AMLP",
    desc: "Aided Mappila LP School",
    isActive: false,
  },
  {
    type: "High School",
    name: "MMPS",
    desc: "Mariyumma Memorial Public School",
    isActive: false,
  },
  {
    type: "Higher Secondary",
    name: "MMHSS",
    desc: "Mariyumma Memorial Hr. Sec. School",
    isActive: true,
  },
  {
    type: "CBSE School",
    name: "EASE",
    desc: "ERAM Academy for Sports & Excellence",
    isActive: false,
  },
  {
    type: "Teacher Training",
    name: "MMITE",
    desc: "Mariyumma Memorial Institute of Teacher Ed.",
    isActive: false,
  },
];

export default function AdmissionsPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Hero Section Timeline (Plays immediately on load)
      const tl = gsap.timeline();

      // Top Red Border Expand
      tl.fromTo(
        ".anim-top-bar",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, ease: "expo.inOut" }
      )
      // Small Tagline line & text
      .fromTo(
        ".anim-hero-tag",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      // Main Heading
      .fromTo(
        ".anim-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        "-=0.5"
      )
      // Description Paragraph
      .fromTo(
        ".anim-hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        "-=0.8"
      )
      // Buttons (Staggered)
      .fromTo(
        ".anim-hero-btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.7"
      );

      // 2. Institutions Grid Section (Triggered on Scroll)
      const instTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".anim-inst-wrap",
          start: "top 85%", // Triggers slightly before it fully comes into view
        },
      });

      instTl
        .fromTo(
          ".anim-inst-label",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          ".anim-inst-card",
          { opacity: 0, y: 50, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2, 
            stagger: 0.12, // Heavy, sequential premium load
            ease: "expo.out" 
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="font-sans overflow-hidden">
      {/* TOP RED BORDER */}
      <div className="anim-top-bar h-1 bg-[#8B1A14]" />

      {/* HERO SECTION */}
      <section className="bg-[#F5EFE8] px-10 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          
          {/* LEFT */}
          <div className="max-w-xl">
            <div className="anim-hero-tag flex items-center gap-3 mb-6">
              <div className="w-6 h-[1.5px] bg-[#8B1A14]" />
              <span className="text-xs tracking-widest uppercase text-[#8B1A14] font-medium">
                Admissions 2026–27
              </span>
            </div>

            <h1 className="anim-hero-title font-serif text-[#1a1209] text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] mb-8 whitespace-nowrap">
              Begin the Journey at MMHSS.
            </h1>

            <p className="anim-hero-desc text-[#3a3228] text-base leading-relaxed max-w-sm">
              Admissions are now open for Higher Secondary streams — Biology
              Science, Computer Science, and Commerce. Join an institution with
              a proven record of academic excellence, structured discipline, and
              consistent results.
            </p>
          </div>

          {/* RIGHT — BUTTONS */}
          <div className="flex flex-col gap-3 lg:min-w-[280px]">
            <button className="anim-hero-btn bg-[#8B1A14] text-white px-6 py-4 text-xs tracking-widest uppercase flex items-center justify-between gap-4 hover:bg-[#7a1410] transition-colors cursor-pointer">
              Apply Now — 2026–27
              <ArrowRight size={14} />
            </button>
            <button className="anim-hero-btn border border-[#1a1209] text-[#1a1209] px-6 py-4 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
              Book a Campus Visit
            </button>
          </div>

        </div>
      </section>

      {/* INSTITUTIONS SECTION */}
      <section className="anim-inst-wrap bg-[#F5EFE8] px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="anim-inst-label text-xs tracking-widest uppercase text-[#6b6256] mb-6">
            Explore All ERAM Institutions
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1 border border-[#c4bdb3]">
            {institutions.map((inst, index) => {
              const isLast = index === institutions.length - 1;
              const borderClass = isLast 
                ? "" 
                : inst.isActive 
                  ? "border-r border-[#7a1410]" 
                  : "border-r border-[#c4bdb3]";

              if (inst.isActive) {
                // ACTIVE STATE (MMHSS) - No hover effects
                return (
                  <div key={index} className={`anim-inst-card bg-[#8B1A14] p-6 ${borderClass}`}>
                    <p className="text-[10px] tracking-widest uppercase text-white/60 mb-3">
                      {inst.type}
                    </p>
                    <p className="font-serif text-white text-xl font-bold mb-1">
                      {inst.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {inst.desc}
                    </p>
                  </div>
                );
              }

              // NORMAL STATE - With hover effects
              return (
                <div 
                  key={index} 
                  className={`anim-inst-card bg-white p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors ${borderClass}`}
                >
                  <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
                    {inst.type}
                  </p>
                  <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
                    {inst.name}
                  </p>
                  <p className="text-xs text-[#6b6256] group-hover:text-white/60">
                    {inst.desc}
                  </p>
                </div>
              );
            })}
          </div>
          
        </div>
      </section>
    </div>
  );
}