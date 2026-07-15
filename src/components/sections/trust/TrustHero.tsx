"use client";

import { memo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

function AboutHero() {
  const containerRef = useRef(null);

  const line0Ref = useRef(null);
  const line1Ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // HERO IMAGE SCALE
      tl.fromTo(
        ".hero-img",
        { scale: 1.15 },
        {
          scale: 1.08,
          duration: 1.2,
          ease: "power3.out",
        },
      );

      // HEADING REVEAL
      tl.fromTo(
        ".hero-heading-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=1",
      );

      // CONTENT FADE
      tl.to(
        ".hero-content-fade",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      // PARALLAX — invalidateOnRefresh moved inside scrollTrigger ✅
      gsap.to(".hero-img", {
        y: 60,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true, 
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-[#F5EFE8] py-9 px-3 md:px-6">
      <div className="rounded-[28px] overflow-hidden shadow-sm">
        {/* HERO */}
     <div
  className="
  relative overflow-hidden rounded-[28px]

  h-[85vh]
  sm:h-[65vh]
  md:h-[70vh]
  lg:h-[75vh]
  xl:h-[85vh]

  min-h-[460px]
  sm:min-h-[520px]
  md:min-h-[560px]

  max-h-[760px]
"
>
          {/* IMAGE */}
           <div className="absolute inset-0">
             <video
               className="hero-img absolute inset-0 w-full h-full object-cover scale-110"
               autoPlay
               muted
               loop
               playsInline
               preload="auto"
             >
               <source src="/videos/Trust-Hero-Vdo.mp4" type="video/mp4" />
             </video>
         </div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/35 md:bg-black/30" />

          {/* CONTENT */}
<div
  className="
    absolute inset-0
    z-10
    flex items-center
    justify-center xl:justify-start

    text-center xl:text-left

    px-5 py-16
    sm:px-8 sm:py-20
    md:px-12 md:py-20
   lg:pl-20 lg:pr-16 lg:py-24
xl:pl-28 xl:pr-24 xl:py-24
2xl:pl-32 2xl:pr-24
  "
>
            {/* DESKTOP */}
 <div
  className="
    absolute inset-0
    z-10 flex items-center
    justify-center xl:justify-start
    text-center xl:text-left

    px-5 py-16
sm:px-8 sm:py-20
md:px-12 md:py-20
lg:px-16 lg:py-24
xl:px-24 xl:py-24
  "
>
          <div className="max-w-[720px] text-white mx-auto xl:mx-30">
          <span className="block font-rethink text-[13px] tracking-[0.25em] uppercase text-white mb-4">
    ERAM EDUCATIONAL & WELFARE TRUST
  </span>
             
<h1
  className="
    font-display
    leading-[0.95]
    tracking-[-0.04em]
    text-[clamp(2.4rem,6vw,3.75rem)]
  "
>
  <span className="block ">
    <span ref={line0Ref} className="hero-heading-line block">
      Purpose in Action.
    </span>
  </span>

  <span className="block ">
    <span ref={line1Ref} className="hero-heading-line block">
     Responsibility in Structure.
    </span>
  </span>
</h1>

                <p
                 className="
  hero-content-fade
  mt-5
  max-w-[650px]
  font-rethink
  text-[0.95rem]
  leading-[1.8]
  text-white/85
  sm:text-[1rem]
  md:text-[1.05rem]
  opacity-0
  translate-y-8
"
                >
                  Across communities, ERAM Educational & Welfare Trust implements long-term initiatives designed to strengthen access, equity, and opportunity.
Founded under the CSR vision of the Eram Group, the Trust advances structured community initiatives focused on education, healthcare, sanitation, and social equity. Its work is guided by the principle: sustainable impact must be deliberate, measurable, and accountable.
                </p>
                <br></br>
                   <button
  onClick={() => {
    router.push("the-trust");

    const scrollToSection = (attempts = 0) => {
      const section = document.getElementById("community-impact");

      if (section) {
        const yOffset = -90;
        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else if (attempts < 30) {
        setTimeout(() => scrollToSection(attempts + 1), 100);
      }
    };

    setTimeout(() => scrollToSection(), 300);
  }}
  className="
                  hero-content-fade
    font-rethink
    w-full
    sm:w-auto
    cursor-pointer
    rounded-[12px]
    border
    border-[#ae1431]
    px-7
    bg-[#ae1431]
    py-3
    text-[13px]
    uppercase
    tracking-[0.16em]
    text-white
    whitespace-nowrap
    transition-all
    duration-200
    hover:bg-black
    hover:text-white
    hover:border-black
    flex
    items-center
    justify-center
    gap-2
  "
>
  <span>View Our Community Interventions</span>
  <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
</button>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
}

export default memo(AboutHero);
