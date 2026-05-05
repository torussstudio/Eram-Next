import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ERAMSportsArena() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".arena-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.to(".arena-img-wrap", {
        
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arena-img-wrap",
          start: "top 85%",
        },
      });

      gsap.to(".arena-img-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arena-img-wrap",
          start: "top 60%",
        },
      });

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".arena-cta",
          start: "top 80%",
        },
      });

      ctaTl.to(".arena-cta", {
        
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      ctaTl.to(
        ".arena-cta-text",
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#F5EFE8] px-5 sm:px-6 py-16 md:py-24"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* TOP HEADER */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <h2
            className="
              arena-text
              opacity-0 translate-y-8
              font-display
              text-[30px]
              sm:text-[34px]
              md:text-[44px]
              font-semibold
              leading-[1.2]
              text-black
            "
          >
            The ERAM
            <br />
            Sports Arena
          </h2>

          <p
            className="
              arena-text
              opacity-0 translate-y-8
              text-[14.5px]
              md:text-[15px]
              text-black/70
              leading-[1.65]
              max-w-[600px]
            "
          >
            The ERAM Sports Arena further reflects the Trust's long-term
            commitment to athletics and community engagement. Designed to
            support institutional competitions and external sporting events, the
            Arena marks a significant milestone in integrating sports excellence
            within the educational ecosystem.
          </p>
        </div>

        {/* IMAGE CARD */}
        <div className="mt-10 md:mt-14">
          <div
            className="
              arena-img-wrap
              opacity-0 scale-[0.95]
              relative
              rounded-[24px]
              md:rounded-[28px]
              overflow-hidden
              will-change-transform
              transform-gpu
              h-[320px] sm:h-[400px] md:h-[480px]
            "
          >
            <div className="arena-img w-full h-full absolute inset-0">
              <OptimizedImage
                src="/images/sports-ground.webp"
                alt="sports"
                className="w-full h-full object-cover block"
                sizes="100vw"
                disableTransition
              />
            </div>

            <div className="absolute inset-0 bg-black/30" />

            <p
              className="
                arena-img-text
                opacity-0 translate-y-5
                absolute
                bottom-6
                sm:bottom-10
                md:bottom-[60px]
                left-6
                sm:left-10
                md:left-20
                right-6
                md:right-10
                text-white
                text-[14px]
                sm:text-[16px]
                md:text-[22px]
                font-semibold
                leading-[1.4]
                max-w-[260px]
                sm:max-w-[360px]
                md:max-w-[520px]
              "
            >
              Infrastructure at ERAM is planned not for scale alone, but for
              sustained opportunity.
            </p>
          </div>
        </div>

        {/* CTA BLOCK */}
        <div className="arena-cta opacity-0 scale-[0.98] mt-10 md:mt-14">
          <div
            className="
              relative
              rounded-[24px]
              md:rounded-[28px]
              overflow-hidden
            "
          >
            <OptimizedImage
              src="/images/classroom-dark.webp"
              alt="cta"
              className="w-full h-[260px] sm:h-[260px] md:h-[320px] object-cover"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div
              className="
                absolute inset-0
                flex flex-col
                items-center
                justify-center
                text-center
                px-5 sm:px-6
              "
            >
              <p
                className="
                  arena-cta-text
                  opacity-0 translate-y-5
                  text-white/90
                  text-[13px]
                  sm:text-[15px]
                  md:text-[16px]
                  font-medium
                  leading-[1.65]
                  max-w-[300px]
                  sm:max-w-[460px]
                  md:max-w-[560px]
                  mx-auto
                "
              >
                ERAM Educational & Welfare Trust continues to build an
                integrated educational ecosystem rooted in discipline, guided by
                responsibility, & strengthened by community engagement.
              </p>

              <div className="mt-4 md:mt-6 flex flex-row gap-2 sm:gap-4">
                <button
                  className="
                    arena-cta-text
                    opacity-0 translate-y-5
                    bg-[#b5122b]
                    text-white
                    px-4
                    sm:px-5
                    py-2.5
                    rounded-lg
                    text-[11px]
                    sm:text-sm
                    font-medium
                    hover:opacity-90
                    transition
                    whitespace-nowrap
                    cursor-pointer
                  "
                >
                  ADMISSIONS OPEN
                </button>

                <button
                  className="
                    arena-cta-text
                    opacity-0 translate-y-5
                    border border-white/60
                    text-white
                    px-4
                    sm:px-5
                    py-2.5
                    rounded-lg
                    text-[11px]
                    sm:text-sm
                    font-medium
                    hover:bg-white
                    hover:text-black
                    transition
                    whitespace-nowrap
                    cursor-pointer
                  "
                >
                  EXPLORE OUR INSTITUTIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ERAMSportsArena);