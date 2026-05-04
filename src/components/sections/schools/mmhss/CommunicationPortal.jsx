// import { ArrowRight } from "lucide-react";

// export default function CommunicationPortal() {
//   return (
//     <div className="min-h-screen bg-[#ae1431] text-white px-6 py-16">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//         {/* LEFT SIDE */}
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <span className="text-xs tracking-widest uppercase text-white/70">
//               Communication Portal
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
//             Centralised Access. Structured Communication.
//           </h1>

//           <p className="text-white/80 max-w-xl mb-4">
//             Academic monitoring and parent communications extend beyond the
//             classroom through a unified digital interface — designed as a single
//             point of coordination across all ERAM institutions.
//           </p>

//           <p className="text-white/80 max-w-xl mb-10">
//             The portal ensures clarity, accountability, and timely communication
//             for every student, teacher, and parent.
//           </p>

//           {/* GRID */}
//           <div className="bg-[#ae1431] p-[1px] mb-10">
//             <div className="grid grid-cols-2 gap-[2px]">
//               <div className="bg-[#7a1410] p-8">
//                 <span className="text-xs text-white/50">/01</span>
//                 <h3 className="mt-3 font-serif font-bold text-white">
//                   Academic Monitoring
//                 </h3>
//                 <p className="text-sm text-white/70 mt-2">
//                   Real-time progress tracking across all subjects
//                 </p>
//               </div>

//               <div className="bg-[#7a1410] p-8">
//                 <span className="text-xs text-white/50">/02</span>
//                 <h3 className="mt-3 font-serif font-bold text-white">
//                   Attendance Updates
//                 </h3>
//                 <p className="text-sm text-white/70 mt-2">
//                   Daily attendance communicated directly to parents
//                 </p>
//               </div>

//               <div className="bg-[#7a1410] p-8">
//                 <span className="text-xs text-white/50">/03</span>
//                 <h3 className="mt-3 font-serif font-bold text-white">
//                   Department Notices
//                 </h3>
//                 <p className="text-sm text-white/70 mt-2">
//                   Stream-specific announcements and circulars
//                 </p>
//               </div>

//               <div className="bg-[#7a1410] p-8">
//                 <span className="text-xs text-white/50">/04</span>
//                 <h3 className="mt-3 font-serif font-bold text-white">
//                   Extended Access
//                 </h3>
//                 <p className="text-sm text-white/70 mt-2">
//                   Available across all 5 ERAM institutions
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* BUTTON */}
//           <button className="bg-white text-[#ae1431] px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
//             Access the Parent Portal
//             <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="bg-[#ae1431] p-6">
//           <div className="text-sm text-white/70 bg-[#5a0e0e] px-4 py-3 mb-[2px]">
//             MMHSS — Live Communication Feed
//           </div>

//           <div className="bg-[#ae1431] p-[1px]">
//             <div className="flex flex-col gap-[2px]">
//               <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
//                 <span className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0"></span>
//                 <div>
//                   <p className="text-sm">
//                     Grade 12 Biology — Crash Course Week 2 begins tomorrow.
//                   </p>
//                   <span className="text-xs text-white/50">
//                     Academic · 2 minutes ago
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
//                 <span className="w-2 h-2 mt-2 rounded-full bg-yellow-400 shrink-0"></span>
//                 <div>
//                   <p className="text-sm">
//                     3 students flagged for attendance review in Commerce stream.
//                   </p>
//                   <span className="text-xs text-white/50">
//                     Attendance · 18 minutes ago
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
//                 <span className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"></span>
//                 <div>
//                   <p className="text-sm">
//                     Internal Assessment scores updated for Grade 11 Comp.
//                     Science.
//                   </p>
//                   <span className="text-xs text-white/50">
//                     Assessment · 1 hour ago
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
//                 <span className="w-2 h-2 mt-2 rounded-full bg-yellow-400 shrink-0"></span>
//                 <div>
//                   <p className="text-sm">
//                     Parent-Teacher meeting scheduled for 12 May 2026, 10 AM.
//                   </p>
//                   <span className="text-xs text-white/50">
//                     Notice · 3 hours ago
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
//                 <span className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0"></span>
//                 <div>
//                   <p className="text-sm">
//                     Monsoon disease prevention awareness drive — results shared.
//                   </p>
//                   <span className="text-xs text-white/50">
//                     NSS / Community · Yesterday
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// 1. OPTIMIZATION: Extracted static data outside to prevent re-renders and clean up JSX
const features = [
  {
    num: "/01",
    title: "Academic Monitoring",
    desc: "Real-time progress tracking across all subjects",
  },
  {
    num: "/02",
    title: "Attendance Updates",
    desc: "Daily attendance communicated directly to parents",
  },
  {
    num: "/03",
    title: "Department Notices",
    desc: "Stream-specific announcements and circulars",
  },
  {
    num: "/04",
    title: "Extended Access",
    desc: "Available across all 5 ERAM institutions",
  },
];

const feedItems = [
  {
    color: "bg-green-400",
    text: "Grade 12 Biology — Crash Course Week 2 begins tomorrow.",
    meta: "Academic · 2 minutes ago",
  },
  {
    color: "bg-yellow-400",
    text: "3 students flagged for attendance review in Commerce stream.",
    meta: "Attendance · 18 minutes ago",
  },
  {
    color: "bg-blue-400",
    text: "Internal Assessment scores updated for Grade 11 Comp. Science.",
    meta: "Assessment · 1 hour ago",
  },
  {
    color: "bg-yellow-400",
    text: "Parent-Teacher meeting scheduled for 12 May 2026, 10 AM.",
    meta: "Notice · 3 hours ago",
  },
  {
    color: "bg-green-400",
    text: "Monsoon disease prevention awareness drive — results shared.",
    meta: "NSS / Community · Yesterday",
  },
];

export default function CommunicationPortal() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const easeType = "power4.out";
      const durationTime = 1.2;

      // Left Side: Text Elements Animation
      gsap.fromTo(
        ".anim-text",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
          y: 0,
          opacity: 1,
          duration: durationTime,
          stagger: 0.15,
          ease: easeType,
        }
      );

      // Left Side: Grid Cards Animation
      gsap.fromTo(
        ".anim-grid-item",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: ".anim-grid-wrap", start: "top 85%" },
          y: 0,
          opacity: 1,
          duration: durationTime,
          stagger: 0.15,
          ease: easeType,
        }
      );

      // Right Side: Feed Header & Items Animation (Incoming message effect)
      const feedTl = gsap.timeline({
        scrollTrigger: { trigger: ".anim-feed-wrap", start: "top 80%" },
      });

      feedTl
        .fromTo(
          ".anim-feed-header",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: easeType }
        )
        .fromTo(
          ".anim-feed-item",
          { opacity: 0, x: -30 }, // Slides in slightly from left
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12, // Fast sequential pop-in
            ease: "back.out(1.2)", // Gives a nice premium settling effect
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#ae1431] text-white px-6 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT SIDE */}
        <div>
          <div className="anim-text flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase text-white/70">
              Communication Portal
            </span>
          </div>

          <h1 className="anim-text text-4xl md:text-5xl font-serif leading-tight mb-6">
            Centralised Access. Structured Communication.
          </h1>

          <p className="anim-text text-white/80 max-w-xl mb-4">
            Academic monitoring and parent communications extend beyond the
            classroom through a unified digital interface — designed as a single
            point of coordination across all ERAM institutions.
          </p>

          <p className="anim-text text-white/80 max-w-xl mb-10">
            The portal ensures clarity, accountability, and timely communication
            for every student, teacher, and parent.
          </p>

          {/* GRID */}
          <div className="anim-grid-wrap bg-[#ae1431] p-[1px] mb-10">
            <div className="grid grid-cols-2 gap-[2px]">
              {features.map((feature, i) => (
                <div key={i} className="anim-grid-item bg-[#7a1410] p-8 hover:bg-[#8f1712] transition-colors duration-300">
                  <span className="text-xs text-white/50">{feature.num}</span>
                  <h3 className="mt-3 font-serif font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-2">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button className="anim-text bg-white text-[#ae1431] px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
            Access the Parent Portal
            <ArrowRight size={16} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="anim-feed-wrap bg-[#ae1431] p-6 lg:mt-0 mt-8">
          <div className="anim-feed-header text-sm text-white/70 bg-[#5a0e0e] px-4 py-3 mb-[2px]">
            MMHSS — Live Communication Feed
          </div>

          <div className="bg-[#ae1431] p-[1px]">
            <div className="flex flex-col gap-[2px]">
              {feedItems.map((item, i) => (
                <div
                  key={i}
                  className="anim-feed-item bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200 cursor-default"
                >
                  <span
                    className={`w-2 h-2 mt-2 rounded-full shrink-0 ${item.color}`}
                  ></span>
                  <div>
                    <p className="text-sm">{item.text}</p>
                    <span className="text-xs text-white/50 block mt-1">
                      {item.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}