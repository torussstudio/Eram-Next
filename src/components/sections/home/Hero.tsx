"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────── Slide Data ─────────────────
   Ithil oro slide-inum image + content maatti
   kodukkam. Buttons ellathilum same aanu. */
const SLIDES = [
  {
    image: "/images/slide1.avif",
    titleLine1: "Building Foundations.",
    titleLine2: "Shaping Futures.",
    subline: "Holistic, disciplined, and inclusive education for every child.",
    description:
      "A disciplined educational ecosystem nurturing academic excellence, character, and opportunity.",
  },
  {
    image: "/images/slide2.avif",
    titleLine1: "Multi-Institution.",
    titleLine2: "Educational Ecosystem.",
    // subline: "Modern campuses built for focused, future-ready learning.",
    description:
      "ERAM operates an integrated educational ecosystem that supports learners across multiple stages of education.",
  },
  {
    image: "/images/slide3.avif",
    titleLine1: "India's First School with 100% CPR",
    titleLine2: "Trained Teachers & NSS Volunteers",
    // subline: "Decades of commitment to academic and personal development.",
    description:
      "Under the SATYAM (WHO–AIIMS–CCET) School First Aid & CPR Project.",
  },
  {
    image: "/images/slide4.avif",
    titleLine1: "100% Financial",
    titleLine2: "Literacy Initiative",
    subline: "In association with the State Bank of India",
    description:
      "My First Account in My Life – a 100% Financial Literacy Project",
  },
];

const SLIDE_DURATION = 5000;
const TRANSITION_DURATION = 0.8;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);

  const sublineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const router = useRouter();
  const smoothScrollTo = useSmoothScroll();

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstRender = useRef(true);

  const slide = SLIDES[activeIndex];

  /* ───────────────── Auto-slide ───────────────── */
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoSlide]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  const goNext = () => goToSlide((activeIndex + 1) % SLIDES.length);
  const goPrev = () =>
    goToSlide((activeIndex - 1 + SLIDES.length) % SLIDES.length);

  /* ───────────────── Synced image + text transition ─────────────────
     Image crossfade-um text fade-in-um ORE timeline-il, ORE start
     point-il (position 0), ORE duration-il run aakunnu — athinaal
     randum exact-aayi onnich maarum, oru bhaagam munpe varilla. */
  useEffect(() => {
    // First mount-il ee effect skip cheyyanam, entrance animation
    // (useGSAP) thanne first slide kaanikkum.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const textEls = [
      titleLine1Ref.current,
      titleLine2Ref.current,
      sublineRef.current,
      descRef.current,
    ].filter(Boolean);

    const tl = gsap.timeline();

    // Text content already swapped by React by the time this runs,
    // so just snap it invisible then fade it in — in sync with image.
    tl.set(textEls, { opacity: 0, y: 10 });

    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(
        el,
        {
          opacity: i === activeIndex ? 1 : 0,
          duration: TRANSITION_DURATION,
          ease: "power2.inOut",
        },
        0,
      );
    });

    tl.to(
      textEls,
      {
        opacity: 1,
        y: 0,
        duration: TRANSITION_DURATION,
        stagger: 0.06,
        ease: "power2.out",
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  /* ───────────────── Entrance animation (first mount) ───────────────── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const lines = [titleLine1Ref.current, titleLine2Ref.current];

      /* ───────────────── Desktop ───────────────── */
      mm.add("(min-width: 1280px)", () => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(
          imageRefs.current[0],
          {
            scale: 1.15,
          },
          {
            scale: 1.05,
            duration: 1.2,
            ease: "power3.out",
          },
        )
          .fromTo(
            lines,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.9",
          )
          .fromTo(
            sublineRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.45,
              ease: "power1.out",
            },
            "-=0.5",
          )
          .fromTo(
            descRef.current,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .fromTo(
            buttonsRef.current,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.55",
          );

        return () => {
          tl.kill();
        };
      });

      /* ───────────────── Tablet ───────────────── */
      mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
        const tl = gsap.timeline({ delay: 0.08 });

        tl.fromTo(
          lines,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          },
        )
          .fromTo(
            sublineRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
              ease: "power1.out",
            },
            "-=0.35",
          )
          .fromTo(
            descRef.current,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .fromTo(
            buttonsRef.current,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.4",
          );

        return () => {
          tl.kill();
        };
      });

      /* ───────────────── Mobile ───────────────── */
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ delay: 0.05 });

        tl.fromTo(
          lines,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power1.out",
          },
        )
          .fromTo(
            sublineRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            },
            "-=0.15",
          )
          .fromTo(
            descRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.35,
              ease: "power1.out",
            },
            "-=0.12",
          )
          .fromTo(
            buttonsRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.35,
              ease: "power1.out",
            },
            "-=0.15",
          );

        return () => {
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-[#F5EFE8] py-9 px-3 md:px-6"
    >
      <div
        className="
          relative overflow-hidden rounded-[28px]
          min-h-[560px] sm:min-h-[620px]
          md:min-h-[680px] lg:min-h-[760px]
        "
      >
        {/* ───────────────── Background Image Slider ───────────────── */}
        <div className="absolute inset-0">
          {SLIDES.map((s, i) => (
            <div
              key={s.image}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* ───────────────── Content ───────────────── */}
        <div
          className="
    relative z-10 flex min-h-[inherit] items-center
    justify-center xl:justify-start
    text-center xl:text-left

    px-6 py-24
    sm:px-10
    md:px-14
    lg:px-20
    xl:px-28
  "
        >
          <div className="max-w-[720px] text-white mx-auto xl:mx-30">
            {/* Heading */}
            <h1
              className="
                font-display
                leading-[0.95]
                tracking-[-0.04em]
                text-[clamp(3.2rem,5vw,5.2rem)]
              "
            >
              <span ref={titleLine1Ref} className="block">
                {slide.titleLine1}
              </span>

              <span ref={titleLine2Ref} className="block">
                {slide.titleLine2}
              </span>
            </h1>

            {/* Subline */}
            <p
              ref={sublineRef}
              className="
                mt-6
                font-rethink
                text-[1rem]
                sm:text-[1.15rem]
                md:text-[1.3rem]
                text-white/95
              "
            >
              {slide.subline}
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="
                mt-5
                max-w-[650px]
                font-rethink
                text-[0.95rem]
                leading-[1.8]
                text-white/85
                sm:text-[1rem]
                md:text-[1.05rem]
              "
            >
              {slide.description}
            </p>

            {/* Buttons (same across all slides) */}
            <div
              ref={buttonsRef}
              className="
                mt-10
                flex flex-wrap gap-4
              "
            >
              <button
                onClick={() => smoothScrollTo("institutions")}
                className="
    font-rethink
    bg-[#ae1431]
    hover:bg-black
    text-white
    cursor-pointer
    px-8
    py-4
    rounded-[12px]
    text-lg
    md:text-lg
    transition-all
    duration-300
    shadow-lg
    font-semibold
    hover:shadow-xl
    hover:-translate-y-1
    uppercase
  "
              >
                Explore Our Institutions
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="
    font-rethink
    cursor-pointer
    rounded-xl
    border
    border-white/70
    px-8
    py-4
    text-sm
    font-semibold
    uppercase
    tracking-[0.14em]
    text-white
    transition-all
    duration-300
    hover:border-white
    hover:bg-white
    hover:text-[#a80c2d]
    hover:-translate-y-1
    hover:shadow-xl
  "
              >
                Admissions Open 2026–27
              </button>
            </div>
          </div>
        </div>

        {/* ───────────────── Slide Arrows (bottom right) ───────────────── */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-white/40
              text-white
              backdrop-blur-sm
              transition-all duration-300
              hover:bg-white hover:text-[#ae1431] hover:border-white
              cursor-pointer
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-white/40
              text-white
              backdrop-blur-sm
              transition-all duration-300
              hover:bg-white hover:text-[#ae1431] hover:border-white
              cursor-pointer
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}