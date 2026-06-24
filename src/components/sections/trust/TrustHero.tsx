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
        <div className="relative h-[560px] sm:h-[620px] md:h-[660px] lg:h-[760px] w-full">
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
          <div className="absolute inset-0 flex items-center md:items-center">
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
            <div className="hidden md:block w-full text-white pl-[130px] pr-8 lg:pl-[180px]">
              <div className="max-w-[640px]">
                <div className="hero-content-fade flex items-center gap-4 mb-6">
                  <span className="font-rethink text-[11px] tracking-[0.32em] uppercase text-white/80">
                    ERAM EDUCATIONAL & WELFARE TRUST
                  </span>
                </div>

                <h1 className="font-display leading-[1.05] text-[clamp(2.5rem,4vw,3.8rem)] ">
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

                {/* <button className="font-rethink hero-content-fade mt-8 bg-[#ae1431] text-white px-6 py-3 rounded-[10px] text-sm tracking-wide hover:bg-black hover:text-white transition cursor-pointer inline-flex items-center gap-2 whitespace-nowrap">
  VIEW OUR COMMUNITY INTERVENTIONS
  <Play className="w-4 h-4 transition-all duration-300" />
</button> */}
                <button
                  className="
    font-rethink
    hero-content-fade
    mt-6 md:mt-8

    inline-flex items-center gap-2
    w-fit

    bg-[#ae1431]
    text-white

    px-5 py-3
    sm:px-6 sm:py-3.5
    md:px-8 md:py-4

    rounded-xl

    text-xs
    sm:text-sm
    md:text-base

    uppercase
    tracking-[0.12em]

    shadow-lg
    transition-all
    duration-300

    hover:bg-black
    hover:shadow-xl
    hover:-translate-y-1

    cursor-pointer
    whitespace-nowrap
    group
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
