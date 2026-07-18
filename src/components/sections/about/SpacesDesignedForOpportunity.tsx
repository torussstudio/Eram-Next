"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

function SpacesDesignedForOpportunity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateArrowState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrowState();
    el.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    return () => {
      el.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, [updateArrowState]);

  const scrollByCard = (direction: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".spaces-card");
    const gap = 12; // matches gap-3
    const cardWidth = card ? card.offsetWidth + gap : el.clientWidth * 0.78 + gap;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  useGSAP(
    () => {
      gsap.to(".spaces-text", {
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

      gsap.to(".spaces-card", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spaces-grid",
          start: "top 75%",
        },
      });

      ScrollTrigger.batch(".spaces-card", {
        interval: 0.1,
        batchMax: 2,
        onEnter: (batch: Element[]) => {
          batch.forEach((element) => {
            const img = element.querySelector(".spaces-img");
            gsap.to(img, {
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            });
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-[#F5EFE8]  px-4 sm:px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* heading */}
        <div className="max-w-[720px]">
          <div className="spaces-text opacity-0 translate-y-8 flex items-center gap-2 mb-4">
    <span className="font-rethink text-xs sm:text-sm uppercase tracking-[0.2em] text-[#ae1431]">
      Infrastructure & Institutional Planning
    </span>
  </div>
          <h2
            className="
              spaces-text
              opacity-0 translate-y-8
              font-display
              text-[26px]
              sm:text-[40px]
              md:text-[48px]
              leading-[1.15]
              tracking-[-0.02em]
              text-black
            "
          >
            Spaces Designed for Opportunity
          </h2>

          <p
            className="
              spaces-text
              opacity-0 translate-y-8
              mt-3
              text-[14.5px]
              md:text-[15px]
              text-black/65
              leading-[1.65]
              max-w-[640px]
              font-rethink
            "
          >
            ERAM institutions are supported by purpose-built infrastructure that
            strengthens both academic and extracurricular engagement. Facilities
            across campuses include:
          </p>
        </div>

        {/* MOBILE CAROUSEL (below sm) — same 4 images, horizontal scroll */}
        <div className="sm:hidden mt-8">
          <div
            ref={scrollRef}
            className="
              spaces-grid-mobile
              flex
              gap-3
              overflow-x-auto
              snap-x snap-mandatory
              -mx-4 px-4
              pb-2
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]
            "
          >
          {/* classroom */}
          <div
            className="
              spaces-card
              opacity-0 translate-y-16
              relative
              w-[78%]
              shrink-0
              h-[320px]
              rounded-[16px]
              overflow-hidden
              transform-gpu
              snap-center
            "
          >
            <div className="spaces-img w-full h-full">
              <OptimizedImage
                src="/images/classroom.webp"
                alt="modern classrooms"
                className="w-full h-full object-cover block"
                sizes="78vw"
                disableTransition
              />
            </div>
            <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-[15px] leading-[1.25] max-w-[200px] font-rethink">
              Modern classrooms
              <br />
              & well-equipped
              <br />
              laboratories
            </p>
          </div>

          {/* sports */}
          <div
            className="
              spaces-card
              opacity-0 translate-y-16
              relative
              w-[78%]
              shrink-0
              h-[320px]
              rounded-[16px]
              overflow-hidden
              transform-gpu
              snap-center
            "
          >
            <div className="spaces-img w-full h-full">
              <OptimizedImage
                src="/images/sports.webp"
                alt="sports grounds"
                className="w-full h-full object-cover block"
                sizes="78vw"
                disableTransition
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-[15px] leading-[1.25] max-w-[220px] font-rethink">
              Dedicated sports grounds &
              <br />
              athletics facilities
            </p>
          </div>

          {/* amphitheatre */}
          <div
            className="
              spaces-card
              opacity-0 translate-y-16
              relative
              w-[78%]
              shrink-0
              h-[320px]
              rounded-[16px]
              overflow-hidden
              transform-gpu
              snap-center
            "
          >
            <div className="spaces-img w-full h-full scale-[1.05]">
              <OptimizedImage
                src="/images/auditorium.webp"
                alt="amphitheatre"
                className="w-full h-full object-cover block"
                sizes="78vw"
                disableTransition
              />
            </div>
            <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-[15px] leading-[1.25] max-w-[200px] font-rethink">
              Amphitheatre &
              <br />
              cultural
              <br />
              performance spaces
            </p>
          </div>

          {/* transport */}
          <div
            className="
              spaces-card
              opacity-0 translate-y-16
              relative
              w-[78%]
              shrink-0
              h-[320px]
              rounded-[16px]
              overflow-hidden
              transform-gpu
              snap-center
            "
          >
            <div className="spaces-img w-full h-full scale-[1.15]">
              <OptimizedImage
                src="/images/bus.webp"
                alt="transport system"
                className="w-full h-full object-cover block"
                sizes="78vw"
                disableTransition
              />
            </div>
            <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white text-[15px] leading-[1.25] max-w-[180px] font-rethink">
              Structured
              <br />
              transport &
              <br />
              safety systems
            </p>
          </div>
          </div>

          {/* arrows — placed in the white space below the images */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              className="
                w-9
                h-9
                rounded-full
                bg-black/45
                backdrop-blur-sm
                flex items-center justify-center
                transition-opacity
                disabled:opacity-30
                disabled:cursor-not-allowed
              "
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              className="
                w-9
                h-9
                rounded-full
                bg-black/45
                backdrop-blur-sm
                flex items-center justify-center
                transition-opacity
                disabled:opacity-30
                disabled:cursor-not-allowed
              "
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ORIGINAL LAYOUT — unchanged, now only shown from sm upward */}
        <div className="spaces-grid mt-8 md:mt-16 hidden sm:flex sm:flex-row gap-3 md:gap-6">
          {/* LEFT CARD */}
          <div
            className="
              spaces-card
              opacity-0 translate-y-16
              relative
              w-[140px]
              sm:w-[220px]
              lg:w-[360px]
              h-[320px]
              sm:h-[490px]
              lg:h-[500px]
              rounded-[16px]
              md:rounded-[28px]
              overflow-hidden
              transform-gpu
              shrink-0
            "
          >
            <div className="spaces-img w-full h-full">
              <OptimizedImage
                src="/images/classroom.webp"
                alt="modern classrooms"
                className="w-full h-full object-cover block"
                sizes="(max-width: 1024px) 140px, 360px"
                disableTransition
              />
            </div>

            <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-black/70 to-transparent" />

            <p
              className="
                absolute
                bottom-4
                sm:bottom-8
                lg:bottom-10
                left-4
                sm:left-8
                text-white
                text-[11px]
                sm:text-[18px]
                lg:text-[26px]
                leading-[1.25]
                max-w-[100px]
                sm:max-w-[180px]
                lg:max-w-[230px]
                font-rethink
              "
            >
              Modern classrooms
              <br />
              & well-equipped
              <br />
              laboratories
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3 md:gap-6 flex-1">
            {/* TOP WIDE */}
            <div
              className="
                spaces-card
                opacity-0 translate-y-16
                relative
                h-[150px]
                sm:h-[180px]
                md:h-[240px]
                rounded-[16px]
                md:rounded-[28px]
                overflow-hidden
                transform-gpu
              "
            >
              <div className="spaces-img w-full h-full">
                <OptimizedImage
                  src="/images/sports.webp"
                  alt="sports grounds"
                  className="w-full h-full object-cover block"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  disableTransition
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <p
                className="
                  absolute
                  bottom-4
                  sm:bottom-8
                  lg:bottom-10
                  left-4
                  sm:left-8
                  lg:left-10
                  text-white
                  text-[11px]
                  sm:text-[18px]
                  lg:text-[26px]
                  leading-[1.25]
                  
                  max-w-[140px]
                  sm:max-w-[260px]
                  lg:max-w-[420px]
                  font-rethink
                "
              >
                Dedicated sports grounds &
                <br />
                athletics facilities
              </p>
            </div>

            {/* BOTTOM GRID — always flex-row */}
            <div className="flex flex-row gap-3 md:gap-6">
              {/* amphitheatre */}
              <div
                className="
                  spaces-card
                  opacity-0 translate-y-16
                  relative
                  flex-1
                  h-[150px]
                  sm:h-[180px]
                  md:h-[240px]
                  rounded-[16px]
                  md:rounded-[28px]
                  overflow-hidden
                  transform-gpu
                "
              >
                <div className="spaces-img w-full h-full scale-[1.05]">
                  <OptimizedImage
                    src="/images/auditorium.webp"
                    alt="amphitheatre"
                    className="w-full h-full object-cover block"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    disableTransition
                  />
                </div>

                <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-black/70 to-transparent" />

                <p
                  className="
                    absolute
                    bottom-3
                    sm:bottom-7
                    lg:bottom-8
                    left-3
                    sm:left-7
                    lg:left-8
                    text-white
                    text-[10px]
                    sm:text-[16px]
                    lg:text-[22px]
                    leading-[1.25]
                    
                    max-w-[80px]
                    sm:max-w-[150px]
                    lg:max-w-[210px]
                    font-rethink
                  "
                >
                  Amphitheatre &
                  <br />
                  cultural
                  <br />
                  performance spaces
                </p>
              </div>

              {/* transport */}
              <div
                className="
                  spaces-card
                  opacity-0 translate-y-16
                  relative
                  flex-1
                  h-[150px]
                  sm:h-[180px]
                  md:h-[240px]
                  rounded-[16px]
                  md:rounded-[28px]
                  overflow-hidden
                  transform-gpu
                "
              >
                <div className="spaces-img w-full h-full scale-[1.15]">
                  <OptimizedImage
                    src="/images/bus.webp"
                    alt="transport system"
                    className="w-full h-full object-cover block"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    disableTransition
                  />
                </div>

                <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-black/70 to-transparent" />

                <p
                  className="
                    absolute
                    bottom-3
                    sm:bottom-7
                    lg:bottom-8
                    left-3
                    sm:left-7
                    lg:left-8
                    text-white
                    text-[10px]
                    sm:text-[16px]
                    lg:text-[22px]
                    leading-[1.25]
                   
                    max-w-[80px]
                    sm:max-w-[140px]
                    lg:max-w-[190px]
                    font-rethink
                  "
                >
                  Structured
                  <br />
                  transport &
                  <br />
                  safety systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SpacesDesignedForOpportunity);