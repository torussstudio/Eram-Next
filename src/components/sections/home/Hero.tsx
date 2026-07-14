"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { getHero } from "@/services/heroService";
import { Play } from "lucide-react";

const resolveImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    image: "/images/slide11.avif",
    titleLine1: "Building Foundations.",
    titleLine2: "Shaping Futures.",
    subline: "Holistic, disciplined, and inclusive education for every child.",
    description:
      "A disciplined educational ecosystem nurturing academic excellence, character, and opportunity.",
sublineLogo: "",
    primaryButton: {
      text: "Explore Our Institutions",
      link: "#institutions",
    },
    secondaryButton: {
      text: "Admissions Open 2026–27",
      link: "/contact",
    },
  },
  {
    image: "/images/slide2.avif",
    titleLine1: "Multi-Institution.",
    titleLine2: "Educational Ecosystem.",
    description:
      "ERAM operates an integrated educational ecosystem that supports learners across multiple stages of education.",
sublineLogo: "",
    primaryButton: {
      text: "Explore Our Institutions",
      link: "#institutions",
    },

    secondaryButton: {
      text: "Admissions Open 2026–27",
      link: "/contact",
    },
  },
  {
    image: "/images/slide3.avif",
    titleLine1: "India's First School with 100% CPR",
    titleLine2: "Trained Teachers & NSS Volunteers",
    description:
      "Under the SATYAM (WHO–AIIMS–CCET) School First Aid & CPR Project.",
sublineLogo: "",
    primaryButton: {
      text: "Explore Our Institutions",
      link: "#institutions",
    },

    secondaryButton: {
      text: "Admissions Open 2026–27",
      link: "/contact",
    },
  },
  {
    image: "/images/slide4.avif",
    titleLine1: "100% Financial",
    titleLine2: "Literacy Initiative",
    sublineLogo: "",
    description:
      "My First Account in My Life – a 100% Financial Literacy Project",

    primaryButton: {
      text: "Explore Our Institutions",
      link: "#institutions",
    },

    secondaryButton: {
      text: "Admissions Open 2026–27",
      link: "/contact",
    },
  },
];

const SLIDE_DURATION = 5000;
const TRANSITION_DURATION = 0.8;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
const sublineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const router = useRouter();
  const smoothScrollTo = useSmoothScroll();

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstRender = useRef(true);

  const [slides, setSlides] = useState<typeof SLIDES>(SLIDES);

  const slide = slides[activeIndex];
  if (!slide) return null;

  /* ───────────────── Auto-slide ───────────────── */
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
  }, [slides.length]);

 useEffect(() => {
  const fetchHero = async () => {
    try {
      const res = await getHero();

      if (res.success && res.data.slides?.length) {
        setSlides((prev) =>
          prev.map((localSlide, i) => {
            const backendSlide = res.data.slides[i];
            if (!backendSlide) return localSlide;
            return {
  ...localSlide,
  ...backendSlide,
  image: backendSlide.image || localSlide.image,
  subline: backendSlide.subline || localSlide.subline,
  sublineLogo:
    backendSlide.sublineLogo || localSlide.sublineLogo,
};
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchHero();
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

  const goNext = () => goToSlide((activeIndex + 1) % slides.length);
  const goPrev = () =>
    goToSlide((activeIndex - 1 + slides.length) % slides.length);

  useEffect(() => {
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

    h-[60vh]
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
        {/* ───────────────── Background Image Slider ───────────────── */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <img
                src={resolveImageUrl(s.image)}
                alt="picture"
                className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* ───────────────── Content ───────────────── */}
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
        <div className="max-w-[720px] xl:max-w-[900px] text-white mx-auto xl:mx-30">
  {/* Heading */}
  <h1
    className="
      font-display
      leading-[0.95]
      tracking-[-0.04em]
      text-[clamp(2.2rem,5vw,3.35rem)]
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
<div
  ref={sublineRef}
  className="
    mt-6
    flex
    items-center
    gap-3
    flex-wrap
    justify-center
    xl:justify-start
    text-white/95
  "
>
  <span
    className="
      font-rethink
      text-[1rem]
      sm:text-[1.15rem]
      md:text-[1.3rem]
    "
  >
    {slide.subline}
  </span>

  {slide.sublineLogo && (
    <img
      src={resolveImageUrl(slide.sublineLogo)}
      alt="Partner Logo"
      className="h-8 w-auto object-contain"
    />
  )}
</div>

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
    flex flex-col
    items-center
    gap-3

    sm:flex-row
    sm:flex-wrap
    sm:justify-center

    xl:justify-start
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
    w-[170px]
    sm:w-auto
    px-5 py-3
    sm:px-6 sm:py-3.5
    md:px-8 md:py-4
    rounded-[12px]
    text-sm
    md:text-sm
    transition-all
    duration-300
    shadow-lg
    font-semibold
    hover:shadow-xl
    hover:-translate-y-1
    uppercase
    flex
    items-center
    justify-center
    gap-2
  "
>
  {slide.primaryButton?.text || "Explore Our Institutions"}
   <Play className="w-5 h-5 transition-colors" />
</button>
              <button
                onClick={() =>
                  slide.secondaryButton?.link
                    ? router.push(slide.secondaryButton.link)
                    : router.push("/contact")
                }
             className="
    font-rethink
    border
    border-white
    hover:bg-white
    text-white
    hover:text-[#ae1431]
    cursor-pointer
    w-[170px]
    sm:w-auto
    px-5 py-3
    sm:px-6 sm:py-3.5
    md:px-8 md:py-4
    rounded-[12px]
    text-sm
    md:text-sm
    transition-all
    duration-300
    shadow-lg
    font-semibold
    hover:shadow-xl
    hover:-translate-y-1
    uppercase
  "
              >
                {slide.secondaryButton?.text || "Admissions Open 2026–27"}
              </button>
            </div>
          </div>
        </div>

        {/* ───────────────── Slide Arrows (bottom right) ───────────────── */}
        <div className="absolute bottom-4 right-4
sm:bottom-5 sm:right-5
md:bottom-6 md:right-6 z-20 flex items-center gap-3">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="
              flex h-9 w-9
sm:h-10 sm:w-10
md:h-11 md:w-11 items-center justify-center
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
              flex  flex h-9 w-9
sm:h-10 sm:w-10
md:h-11 md:w-11 items-center justify-center
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
