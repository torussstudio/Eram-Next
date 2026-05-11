import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { section, shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ────────────────────────────────────────────────────────── */
const impactItems = [
  { code: "/01", title: "Free & subsidised education" },
  { code: "/02", title: "Healthcare outreach and medical camps"          },
  { code: "/03", title: "Water conservation projects and 180+ community wells"         },
  { code: "/04", title: "Interreligious harmony initiatives"             },
  { code: "/05", title: "Housing support for disaster-affected families"            },
  { code: "/06", title: "WHO-certified teacher training programs"              },
];

const CARD_WIDTH  = 350;
const CARD_GAP    = 20;
const SCROLL_BY   = 1;

/* ── SplitHeading ────────────────────────────────────────────────── */
function SplitHeading({ text, className }) {
  return (
    <h2 className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden leading-[1.15]">
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

/* ── ImpactImage ─────────────────────────────────────────────────── */
function ImpactImage({ src, alt, className = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[28px] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

/* ── ImpactCard ──────────────────────────────────────────────────── */
function ImpactCard({ code, title, cardClass = "" }) {
  return (
    <div className={`relative flex flex-col justify-end ${cardClass}`}>
      <div className="card-line absolute left-0 top-0 w-[2px] bg-[#f5efe8]" />
      <span className="card-code tracking-[0.16em] text-[#f5efe8]">{code}</span>
      <p className="card-title leading-[1.3] text-[#f5efe8]">{title}</p>
    </div>
  );
}

/* ── Carousel Arrow ──────────────────────────────────────────────── */
function CarouselArrow({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="
        group
        flex-none
        flex items-center justify-center

        w-[42px] h-[42px]
        rounded-full
        border-[2px] border-[#f5efe8]/50

        bg-transparent
        transition-all duration-300 ease-out

        hover:bg-[#f5efe8]
        hover:border-[#f5efe8]
        hover:scale-110
        hover:shadow-[0_0_18px_rgba(245,239,232,0.35)]

        active:scale-95
        cursor-pointer
      "
    >
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300 stroke-[#f5efe8] group-hover:stroke-[#ae1431]"
      >
        {direction === "left" ? (
          <path d="M10 13L5 8L10 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3L11 8L6 13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function ImpactSection() {
  const sectionRef  = useRef(null);
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const isMobile = window.innerWidth <= 640;
    const cardW    = isMobile ? 190 : CARD_WIDTH;
    const gap      = isMobile ? 16  : CARD_GAP;
    const step     = (cardW + gap) * SCROLL_BY;
    el.scrollBy({ left: direction === "right" ? step : -step, behavior: "smooth" });
  };

  useGSAP(() => {
    const root     = sectionRef.current;
    const isMobile = window.innerWidth <= 640;
    const ease3    = "power3.out";
    const ease2    = "power2.out";

    /* 1. Top section timeline */
    const topTl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
    });

    topTl.fromTo(
      root.querySelectorAll(".split-word"),
      { y: "105%", rotate: 3 },
      { y: "0%", rotate: 0, duration: 0.75, stagger: 0.07, ease: ease3 }
    );

    if (!isMobile) {
      topTl
        .fromTo(".img-left",  { x: -44, opacity: 0, scale: 0.93 }, { x: 0, opacity: 1, scale: 1, duration: 0.75, ease: ease2 }, "-=0.55")
        .fromTo(".img-right", { x:  44, opacity: 0, scale: 0.93 }, { x: 0, opacity: 1, scale: 1, duration: 0.75, ease: ease2 }, "-=0.72");
    } else {
      topTl.fromTo(
        root.querySelectorAll(".mob-img"),
        { opacity: 0, scale: 0.88, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
        "-=0.45"
      );
    }

    topTl
      .fromTo(
        root.querySelectorAll(".para-anim"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: ease2 },
        "-=0.5"
      )
      .fromTo(
        root.querySelector(".btn-anim"),
        { y: 16, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );

    /* 2. Cards timeline */
    const cardsTl = gsap.timeline({
      scrollTrigger: { trigger: root.querySelector(".cards-section"), start: "top 82%", once: true },
    });

    cardsTl.fromTo(
      root.querySelector(".key-areas-heading"),
      isMobile
        ? { opacity: 0, y: 18, scale: 0.94 }
        : { letterSpacing: "0.44em", opacity: 0, y: 16 },
      isMobile
        ? { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }
        : { letterSpacing: "0.18em", opacity: 1, y: 0, duration: 0.85, ease: ease2 }
    );

    const cardEase = isMobile ? "back.out(1.8)" : ease2;

    cardsTl
      .fromTo(
        root.querySelectorAll(".card-line"),
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: isMobile ? 0.4 : 0.5, stagger: 0.07, ease: "power2.inOut" },
        "-=0.35"
      )
      .fromTo(
        root.querySelectorAll(".card-code"),
        isMobile ? { opacity: 0, scale: 0.8, y: 10 } : { opacity: 0, x: -10 },
        isMobile
          ? { opacity: 1, scale: 1, y: 0, duration: 0.38, stagger: 0.07, ease: cardEase }
          : { opacity: 1, x: 0,        duration: 0.42, stagger: 0.07, ease: cardEase },
        "-=0.32"
      )
      .fromTo(
        root.querySelectorAll(".card-title"),
        isMobile ? { opacity: 0, scale: 0.85, y: 14 } : { opacity: 0, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.42, stagger: 0.07, ease: cardEase },
        "-=0.38"
      );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef}  className={`${section} bg-[#ae1431]`} id="impact">

      {/* ── Desktop top layout ──────────────────────────────────── */}
      <div className={`${shell} grid grid-cols-[1.05fr_0.95fr] max-[1100px]:grid-cols-1 max-[640px]:hidden`}>
        <div className="ml-[200px] grid grid-cols-[0.85fr_1.15fr] items-end gap-[26px] pt-[10px]">
          <ImpactImage src="/images/impact1.webp" alt="Community support" className="img-left  h-[200px] w-[300px]" />
          <ImpactImage src="/images/impact2.webp" alt="Social outreach"   className="img-right h-[300px] w-[300px]" />
        </div>

        <div className="max-w-[480px] pt-[25px] pl-[50px] max-[1100px]:pl-0 max-[1100px]:pt-9">
          <SplitHeading
            text="In Service Of Society"
            className="mb-[18px] text-[42px] leading-[1.12] text-[#f5efe8]"
          />
          <p className="para-anim font-rethink mb-[14px] text-[14.5px] leading-[1.75] text-[#f5efe8]">
            ERAM Educational &amp; Welfare Trust advances social equity through structured
            CSR initiatives focused on educational access, healthcare outreach, and
            community resilience.
          </p>
          <p className="para-anim font-rethink mb-7 text-[15px] leading-[1.75] text-[#f5efe8]">
            While education remains its core mission, the Trust extends its responsibility
            through targeted social initiatives supporting underprivileged communities.
          </p>
          <button className="btn-anim font-rethink h-[44px] cursor-pointer rounded-[10px] border border-[#f5efe8] bg-[#f5efe8] px-[22px] text-[13px] text-[#ae1431] transition hover:border-[#ae1431] hover:bg-black hover:text-white">
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ── Mobile top layout ───────────────────────────────────── */}
      <div className="hidden max-[640px]:flex flex-col gap-8 px-5 pt-11">
        <div className="flex w-full items-end gap-3">
          <ImpactImage src="/images/impact1.webp" alt="Students" className="mob-img h-[160px] flex-1" />
          <ImpactImage src="/images/impact2.webp" alt="Campus"   className="mob-img h-[200px] flex-1" />
        </div>

        <div className="flex flex-col gap-3.5">
          <SplitHeading
            text="In Service Of Society"
            className="text-[28px] font-semibold leading-[1.15] text-[#f5efe8]"
          />
          <p className="para-anim text-[14px] leading-[1.8] text-[#f5efe8]/90">
            ERAM Educational &amp; Welfare Trust advances social equity through structured
            CSR initiatives focused on educational access, healthcare outreach, and
            community resilience.
          </p>
          <p className="para-anim text-[14px] leading-[1.8] text-[#f5efe8]/90">
            While education remains its core mission, the Trust extends its responsibility
            through targeted social initiatives supporting underprivileged communities.
          </p>
          <button className="btn-anim mt-1 h-[46px] w-full cursor-pointer rounded-[12px] border border-[#f5efe8] bg-[#f5efe8] text-[12px] font-medium tracking-[0.08em] text-[#ae1431] transition active:scale-[0.97]">
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ── Cards ────────────────────────────────────────────────── */}
      <div className="cards-section mt-[90px] max-[640px]:mt-[52px] max-[640px]:pb-[52px]">
        <p className="key-areas-heading mb-[60px] text-center text-[28px] uppercase tracking-[0.18em] text-[#f5efe8] max-[900px]:text-[24px] max-[640px]:mb-8 max-[640px]:px-5 max-[640px]:text-[14px] max-[640px]:tracking-[0.22em]">
          Key Areas Of Impact Include:
        </p>

        {/* Arrow + scroll row */}
        <div className="mx-auto flex items-center gap-[14px] w-[min(1100px,calc(100vw-160px))] max-[640px]:w-full max-[640px]:px-5 max-[640px]:gap-[10px]">

          <CarouselArrow direction="left" onClick={() => scrollCarousel("left")} />

          <div
            ref={carouselRef}
            className="flex-1 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-5 cursor-pointer"
          >
            <div className="flex gap-5 px-8 max-[640px]:gap-4 max-[640px]:px-2">
              {impactItems.map((item) => (
                <ImpactCard
                  key={item.code}
                  {...item}
                  cardClass="
                    flex-none snap-start
                    w-[350px] min-h-[120px] pl-[26px] pr-[26px]
                    [&_.card-line]:h-[225px]
                    [&_.card-code]:text-[25px] [&_.card-code]:mb-[70px]
                    [&_.card-title]:text-[25px] [&_.card-title]:mt-[50px]
                    max-[640px]:w-[190px] max-[640px]:min-h-[170px] max-[640px]:pl-5 max-[640px]:pr-3 max-[640px]:pb-1
                    max-[640px]:[&_.card-line]:h-[170px]
                    max-[640px]:[&_.card-code]:text-[15px] max-[640px]:[&_.card-code]:mb-[40px]
                    max-[640px]:[&_.card-title]:text-[15px] max-[640px]:[&_.card-title]:mt-6
                  "
                />
              ))}
            </div>
          </div>

          <CarouselArrow direction="right" onClick={() => scrollCarousel("right")} />

        </div>
      </div>

    </section>
  );
}