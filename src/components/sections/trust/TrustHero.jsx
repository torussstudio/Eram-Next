import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

function TrustHero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-img",
        { scale: 1.15 },
        { scale: 1.08, duration: 1.2, ease: "power3.out" },
      );

      tl.to(
        ".hero-heading-line",
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=1",
      );

      tl.to(
        ".hero-content-fade",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.8",
      );

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
    <section
      ref={containerRef}
     className={`${shell}
       bg-[#F5EFE8] py-9`}
    >
      
        <div className="rounded-[28px] overflow-hidden shadow-sm">
          <div className="relative h-[560px] sm:h-[620px] md:h-[660px] lg:h-[760px] w-full">
            {/* IMAGE */}
            <div className="absolute inset-0">
              <div className="hero-img absolute inset-0 scale-110">
                <OptimizedImage
                  src="/images/about-hero.webp"
                  alt="students"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/45 md:bg-black/35" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center md:items-center">
              {/* MOBILE */}
              <div className="w-full flex flex-col items-center text-center text-white px-6 pb-10 md:hidden">
                {/* TOP LABEL */}
                <span className="font-rethink hero-content-fade text-[10px] tracking-[0.25em] uppercase text-white/70 mb-4 opacity-0 translate-y-6">
                  ERAM EDUCATIONAL & WELFARE TRUST
                </span>

                {/* HEADING */}
               <h1 className="font-display text-white leading-[1.15] text-[clamp(1.9rem,7vw,2.5rem)] font-light tracking-[-0.03em]">
  <span className="block overflow-hidden">
    <span className="hero-heading-line block">
      Purpose in Action.
    </span>
  </span>

  <span className="block overflow-hidden italic text-white/90">
    <span className="hero-heading-line block">
      Responsibility
    </span>
  </span>

  <span className="block overflow-hidden">
    <span className="hero-heading-line block">
      in Structure.
    </span>
  </span>

</h1>

                {/* PARAGRAPH */}
                <p className="font-rethink hero-content-fade mt-4 text-[0.85rem] text-white/80 leading-[1.7] max-w-[320px] opacity-0 translate-y-8">
                  Across communities, ERAM implements long-term initiatives
                  designed to strengthen access, equity, and opportunity —
                  guided by measurable and accountable impact.
                </p>

                {/* BUTTON */}
                <button className=" font-rethink hero-content-fade mt-6 bg-[#B3201D] text-white px-5 py-2.5 rounded-[10px] text-xs tracking-wide font-medium opacity-0 translate-y-8">
                  VIEW COMMUNITY WORK →
                </button>
              </div>

              {/* DESKTOP */}
              <div className="hidden md:block w-full text-white pl-[130px] pr-8 lg:pl-[180px]">
                <div className="max-w-[640px]">
                  <div className="hero-content-fade flex items-center gap-4 mb-6 opacity-0 translate-y-6">
                    {/* MAROON LINE */}
                    {/* <span className="w-[32px] h-[2px] bg-[#8B1E1E]"></span> */}

                    {/* TEXT */}
                    <span className=" font-rethink text-[11px] tracking-[0.32em] uppercase text-white/80">
                      ERAM EDUCATIONAL & WELFARE TRUST
                    </span>
                  </div>

                  {/* HEADING */}
                  <h1 className="font-display leading-[1.05] text-[clamp(2.5rem,4vw,3.8rem)] font-light">
                    <span className="block ">
                      <span className="hero-heading-line block">
                        Purpose in Action.
                      </span>
                    </span>

                    <span className="font-display block italic text-white/90 overflow-hidden">
                      <span className="hero-heading-line block">
                        Responsibility
                      </span>
                    </span>

                    <span className="font-display block">
                      <span className="hero-heading-line block">
                        in Structure.
                      </span>
                    </span>
                  </h1>

                  {/* PARAGRAPH */}
                  <p className=" font-rethink hero-content-fade mt-6 text-[1.05rem] text-white/85 leading-relaxed opacity-0 translate-y-8">
                    Across communities, ERAM Educational & Welfare Trust
                    implements long-term initiatives designed to strengthen
                    access, equity, and opportunity — guided by the principle
                    that sustainable impact must be deliberate, measurable, and
                    accountable.
                  </p>

                  {/* BUTTON */}
                  <button className="font-rethink hero-content-fade mt-8 bg-[#B3201D] text-white px-6 py-3 rounded-[10px] text-sm tracking-wide font-medium opacity-0 translate-y-8 hover:bg-[#F5EFE8] hover:text-black transition cursor-pointer">
                    VIEW OUR COMMUNITY INTERVENTIONS →
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
