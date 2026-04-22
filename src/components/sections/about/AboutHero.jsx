// import { memo, useRef } from "react";
// import OptimizedImage from "../../ui/OptimizedImage";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { FaPlay } from "react-icons/fa6";


// gsap.registerPlugin(ScrollTrigger);

// function AboutHero() {
//   const containerRef = useRef(null);

//   useGSAP(
//     () => {
//       const tl = gsap.timeline();

//       tl.fromTo(
//         ".hero-img",
//         { scale: 1.04 },
//         { scale: 1, duration: 1.2, ease: "power3.out" },
//       );

//       tl.to(
//         ".hero-heading-line",
//         {
//           yPercent: 0,
//           duration: 1,
//           stagger: 0.12,
//           ease: "power3.out",
//         },
//         "-=1",
//       );

//       tl.to(
//         ".hero-content-fade",
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.1,
//         },
//         "-=0.8",
//       );

//       // Parallax animation with fastScrollEnd for better performance
//       gsap.to(".hero-img", {
//         yPercent: 6,
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//           fastScrollEnd: true
//         },
//       })
//     },
//     { scope: containerRef },
//   );

//   return (
//     <section
//       ref={containerRef}
//       className="bg-[#F5EFE8] py-9 px-[20px] md:px-[28px]"
//     >
//       {/* full width wrapper */}

//       <div className="w-full">
//         <div className="rounded-[28px] overflow-hidden shadow-sm transform-gpu">
//           {/* HERO */}

//           <div className="relative h-[560px] md:h-[760px] w-full">
//             {/* image */}

//             <div className="hero-image absolute inset-0 w-full h-full overflow-hidden">
//              <div className="hero-img w-full h-[115%] absolute -top-[7.5%]">
//                <OptimizedImage
//                  src="/images/about-hero.webp"
//                  alt="students"
//                  className="w-full h-full object-cover block"
//                  loading="eager"
//                  sizes="100vw"
//                  disableTransition
//                />
//              </div>
//             </div>

//             <div className="absolute inset-0 bg-black/30" />

//             {/* content */}

//             <div className="absolute inset-0 flex items-center">
//               <div className="pl-[32px] md:pl-[120px] lg:pl-[160px] text-white">
//                 <div className="max-w-[640px]">
//                   <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-display leading-[1.05]">
//                     <div className="overflow-hidden">
//                       <span className="hero-heading-line block translate-y-[100%]">
//                         A Legacy of Structure.
//                       </span>
//                     </div>

//                     <div className="overflow-hidden">
//                       <span className="hero-heading-line block translate-y-[100%]">
//                         A Future of Opportunity.
//                       </span>
//                     </div>
//                   </h1>

//                   <p className="hero-content-fade mt-6 text-[0.98rem] md:text-[1.05rem] text-white/90 leading-relaxed opacity-0 translate-y-8">
//                     Founded under the CSR vision of the Eram Group, ERAM
//                     Educational & Welfare Trust was established to expand access
//                     to disciplined, value-based education while upholding
//                     structured academic standards across its institutions.
//                   </p>
//                   <br />
//                   <p>More than a network of schools, ERAM represents a structured educational ecosystem where governance, mentorship, and infrastructure work in alignment to shape future-ready individuals.</p>

//                  <button className="hero-content-fade mt-8 bg-white text-black px-6 py-3 rounded-[12px] text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition opacity-0 translate-y-8">
//   EXPLORE OUR INSTITUTIONS
//   <FaPlay className="text-black text-xs" />
// </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default memo(AboutHero);


import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

function AboutHero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Image intro (no layout hacks)
      tl.fromTo(
        ".hero-img",
        { scale: 1.15 },
        { scale: 1.08, duration: 1.2, ease: "power3.out" }
      );

      // Heading animation
      tl.to(
        ".hero-heading-line",
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=1"
      );

      // Content fade
      tl.to(
        ".hero-content-fade",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.8"
      );

      // Smooth parallax (safe values)
      gsap.to(".hero-img", {
        y: 60, // 🔥 use px instead of yPercent to avoid gaps
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#F5EFE8] py-9 px-[20px] md:px-[28px]"
    >
      <div className="w-full">
        <div className="rounded-[28px] overflow-hidden shadow-sm transform-gpu [contain:paint]">
          {/* HERO */}
          <div className="relative h-[560px] md:h-[760px] w-full">
            
            {/* IMAGE */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="hero-img absolute inset-0 scale-110 will-change-transform">
                <OptimizedImage
                  src="/images/about-hero.webp"
                  alt="students"
                  className="w-full h-full object-cover block"
                  loading="eager"
                  sizes="100vw"
                  disableTransition
                />
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
              <div className="pl-[32px] md:pl-[120px] lg:pl-[160px] text-white">
                <div className="max-w-[640px]">
                  
                 <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-display leading-[1.05]">
  <span className="block overflow-hidden">
    <span className="hero-heading-line block">
      A Legacy of Structure.
    </span>
  </span>

  <span className="block overflow-hidden">
    <span className="hero-heading-line block">
      A Future of Opportunity.
    </span>
  </span>
</h1>

                  <p className="hero-content-fade mt-6 text-[0.98rem] md:text-[1.05rem] text-white/90 leading-relaxed opacity-0 translate-y-8">
                    Founded under the CSR vision of the Eram Group, ERAM
                    Educational & Welfare Trust was established to expand access
                    to disciplined, value-based education while upholding
                    structured academic standards across its institutions.
                  </p>

                  <p className="hero-content-fade mt-4 text-white/90 leading-relaxed opacity-0 translate-y-8">
                    More than a network of schools, ERAM represents a structured
                    educational ecosystem where governance, mentorship, and
                    infrastructure work in alignment to shape future-ready individuals.
                  </p>

                  <button className="hero-content-fade mt-8 bg-white text-black px-6 py-3 rounded-[12px] text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition opacity-0 translate-y-8">
                    EXPLORE OUR INSTITUTIONS
                    <FaPlay className="text-black text-xs" />
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutHero);