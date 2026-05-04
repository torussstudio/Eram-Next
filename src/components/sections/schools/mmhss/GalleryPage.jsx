// import { Drama, PartyPopper, Droplet, HeartPulse } from "lucide-react";

// const galleryItems = [
//   {
//     title: "CULTURAL PROGRAMS",
//     icon: Drama,
//   },
//   {
//     title: "SCHOOL CELEBRATIONS",
//     icon: PartyPopper,
//   },
//   {
//     title: "NSS BLOOD DONATION",
//     icon: Droplet,
//   },
//   {
//     title: "COMMUNITY HEALTH DRIVES",
//     icon: HeartPulse,
//   },
// ];

// export default function GalleryPage() {
//   return (
//     <div className=" bg-[#1f1f1f] text-white">
//       {/* SECTION */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           {/* HEADER */}
//           <div className="mb-12">
//             <div className="flex items-center gap-3 mb-4">
//               <span className="text-xs tracking-widest text-gray-400 uppercase">
//                 Gallery
//               </span>
//             </div>

//             <p className="text-gray-400 max-w-xl">
//               Cultural programs, school celebrations, NSS activities, and campus
//               life at MMHSS.
//             </p>
//           </div>

//           {/* GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
//             {galleryItems.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={index}
//                   className="relative h-[260px] border border-white/10 bg-[#2a2a2a] overflow-hidden group transition duration-300 hover:scale-[1.02]"
//                 >
//                   {/* ICON */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-50">
//                     <Icon size={36} />
//                   </div>

//                   {/* GRADIENT OVERLAY */}
//                   <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

//                   {/* TITLE */}
//                   <div className="absolute bottom-4 left-4 text-sm tracking-wide text-gray-300">
//                     {item.title}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useRef } from "react";
import { Drama, PartyPopper, Droplet, HeartPulse } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Moved outside component to prevent re-creation on renders
const galleryItems = [
  {
    title: "CULTURAL PROGRAMS",
    icon: Drama,
  },
  {
    title: "SCHOOL CELEBRATIONS",
    icon: PartyPopper,
  },
  {
    title: "NSS BLOOD DONATION",
    icon: Droplet,
  },
  {
    title: "COMMUNITY HEALTH DRIVES",
    icon: HeartPulse,
  },
];

export default function GalleryPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Header Animation
      gsap.fromTo(
        ".anim-header",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Starts before it fully enters viewport
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        }
      );

      // 2. Gallery Cards Grid Animation (Premium Scale & Slide up)
      gsap.fromTo(
        ".anim-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".anim-grid",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15, // Sequential grid reveal
          ease: "expo.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-[#1f1f1f] text-white overflow-hidden">
      {/* SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-12">
            <div className="anim-header flex items-center gap-3 mb-4">
              <span className="text-xs tracking-widest text-gray-400 uppercase">
                Gallery
              </span>
            </div>

            <p className="anim-header text-gray-400 max-w-xl">
              Cultural programs, school celebrations, NSS activities, and campus
              life at MMHSS.
            </p>
          </div>

          {/* GRID */}
          <div className="anim-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
            {galleryItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="anim-card relative h-[260px] border border-white/10 bg-[#2a2a2a] overflow-hidden group transition duration-300 hover:scale-[1.02]"
                >
                  {/* ICON */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <Icon size={36} />
                  </div>

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* TITLE */}
                  <div className="absolute bottom-4 left-4 text-sm tracking-wide text-gray-300">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </section>
    </div>
  );
}