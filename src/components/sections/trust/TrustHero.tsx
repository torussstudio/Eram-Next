"use client";

import { memo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function TrustHero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Image zoom in
      tl.fromTo(
        ".hero-img",
        { scale: 1.15 },
        { scale: 1.08, duration: 1.2, ease: "power3.out" },
      );

      // 2. fromTo — yPercent: 100 → 0 (masked reveal)
      tl.fromTo(
        ".hero-heading-line",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=1",
      );

      // 3. fromTo — explicit y and opacity start values
      tl.fromTo(
        ".hero-content-fade",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.8",
      );

      // Parallax scroll
      gsap.to(".hero-img", {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-[#F5EFE8] py-9 px-3 md:px-6">
      <div className="rounded-[28px] overflow-hidden shadow-sm max-w-[1520px] mx-auto">
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
          {/* VIDEO */}
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
          <div className="absolute inset-0 bg-black/45 md:bg-black/35" />

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
            {/* ── MOBILE ── */}
            <div className="w-full flex flex-col items-center text-center text-white px-6 pb-10 md:hidden">
              <span className="font-rethink hero-content-fade text-[10px] tracking-[0.25em] uppercase text-white mb-4">
                ERAM EDUCATIONAL & WELFARE TRUST
              </span>

              {/* HEADING —  overflow-hidden wrapper for masked reveal */}
              <h1 className="font-display text-white leading-[1.15] text-[clamp(1.9rem,7vw,2.5rem)] tracking-[-0.03em]">
                <span className="block overflow-hidden">
                  <span className="hero-heading-line block">
                    Purpose in Action.
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-heading-line block">
                    Responsibility
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-heading-line block">in Structure.</span>
                </span>
              </h1>

              <p className="font-rethink hero-content-fade mt-4 text-[0.85rem] text-white/80 leading-[1.7] max-w-[320px]">
                Across communities, ERAM implements long-term initiatives
                designed to strengthen access, equity, and opportunity — guided
                by measurable and accountable impact.
              </p>

              {/* BUTTON — no opacity-0/translate classes */}
              <button className="font-rethink hero-content-fade mt-6 bg-[#ae1431] text-white px-5 py-2.5 rounded-[10px] text-xs tracking-wide ">
                VIEW COMMUNITY WORK →
              </button>
            </div>

            {/* ── DESKTOP ── */}
            <div className="max-w-[720px] text-white mx-auto xl:mx-22">
              <div className="max-w-[720px]">
                <div className="hero-content-fade flex items-center gap-4 mb-6">
                  <span className="font-rethink text-[11px] tracking-[0.32em] uppercase text-white/80">
                    ERAM EDUCATIONAL & WELFARE TRUST
                  </span>
                </div>

                <h1 className="font-display leading-[1.05] text-[clamp(2.4rem,6vw,3.75rem)] ">
                  <span className="block ">
                    <span className="hero-heading-line block">
                      Purpose in Action.
                    </span>
                  </span>
                  <span className="block  text-white/90">
                    <span className="hero-heading-line block">
                      Responsibility
                    </span>
                  </span>
                  <span className="block ">
                    <span className="hero-heading-line block">
                      in Structure.
                    </span>
                  </span>
                </h1>

                <p className="font-rethink hero-content-fade mt-6 text-[1.05rem] text-white/85 leading-relaxed">
                  Across communities, ERAM Educational & Welfare Trust
                  implements long-term initiatives designed to strengthen
                  access, equity, and opportunity.
                  <br />
                  Founded under the CSR vision of the Eram Group, the Trust
                  advances structured community initiatives focused on
                  education, healthcare, sanitation, and social equity. Its work
                  is guided by the principle: sustainable impact must be
                  deliberate, measurable, and accountable.
                </p>
                <button
                className="
  hero-content-fade
  mt-8

  inline-flex
  items-center
  gap-2

  bg-[#ae1431]
  hover:bg-black

  text-white

  px-5 py-3
  sm:px-6 sm:py-3.5
  md:px-8 md:py-4

  rounded-[12px]

  text-sm

  transition-all
  duration-300

  shadow-lg
  font-semibold
  font-rethink
  uppercase

  hover:shadow-xl
  hover:-translate-y-1

  opacity-0
  translate-y-8
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

export default memo(TrustHero);
