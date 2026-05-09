import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../../ui/ActionButton";
import { section } from "../../../constants/homeStyles";


gsap.registerPlugin(ScrollTrigger);

const BEYOND_CARDS = [
  { code: "/01", title: "JCI & ROTARY",               image: "/images/beyond1.webp" },
  { code: "/02", title: "STEM CLUBS",                  image: "/images/beyond2.webp" },
  { code: "/03", title: "RESIDENTIAL CAMPS",           image: "/images/beyond3.webp" },
  { code: "/04", title: "TRAINING SESSIONS",           image: "/images/beyond4.webp" },
  { code: "/05", title: "STATE-LEVEL PROGRAMS",        image: "/images/beyond5.webp" },
  { code: "/06", title: "SOCIETY-CONNECT INITIATIVES", image: "/images/beyond6.webp" },
];

const CARD_WIDTH       = 350; // px  (desktop)
const CARD_WIDTH_MOBILE = 260; // px  (≤640 px)
const GAP              = 22;
const GAP_MOBILE       = 12;

// How many cards to scroll per arrow click
const SCROLL_BY = 1;

export default function BeyondSection() {
  const sectionRef   = useRef(null);
  const scrollRef    = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  /* ── Scroll helpers ─────────────────────────────────────── */
  const isMobile = () => window.innerWidth <= 640;

  const scrollCarousel = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = isMobile() ? CARD_WIDTH_MOBILE : CARD_WIDTH;
    const gap   = isMobile() ? GAP_MOBILE : GAP;
    const step  = (cardW + gap) * SCROLL_BY;
    el.scrollBy({ left: direction === "right" ? step : -step, behavior: "smooth" });
  };

  /* ── GSAP entrance animations ───────────────────────────── */
  useGSAP(
    () => {
      const defaults = { ease: "power2.out" };

      gsap.fromTo(
        ".beyond-heading",
        { opacity: 0, y: 30 },
        {
          ...defaults,
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".beyond-card",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".beyond-cards-container", start: "top 85%" },
        },
      );
    },
    { scope: sectionRef },
  );

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="beyond"
      className={`${section} pt-[90px] pb-[120px] bg-[#ae1431]`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[32px] lg:px-[40px] text-center">

        {/* Heading */}
        <h2 className="beyond-heading font-display mb-[14px] text-[36px] font-[700] leading-[1.2] tracking-[-0.02em] text-[#f5efe8] max-[640px]:text-[28px]">
          BEYOND THE CLASSROOM
        </h2>

        {/* Description */}
        <p className="beyond-heading font-rethink mx-auto mb-[26px] max-w-[560px] text-[14.5px] leading-[1.7] text-[#f5efe8] max-[640px]:text-[13px]">
          Clubs, leadership forums, residential programs, state-level
          participation, curated experiences, learning that extends beyond
          textbooks.
        </p>

        {/* CTA */}
        <div className="beyond-heading mb-[48px] max-[640px]:mb-[34px]">
          <ActionButton
            variant="secondary"
            className="font-rethink text-[#f5efe8] max-[640px]:!w-auto cursor-pointer hover:bg-black hover:text-white"
          >
            Explore Student Pathways
          </ActionButton>
        </div>

        {/* Cards + Arrow Buttons */}
        <div
  className="
    beyond-cards-container
    mx-auto
    mt-[48px]

    w-full

    max-[640px]:
    mt-[34px]
  "
>
          {/* Row: arrow-left | scrollable strip | arrow-right */}
          <div
  className="
    flex
    items-center

    gap-[14px]

    max-[768px]:
    gap-[10px]

    max-[640px]:
    gap-[6px]
  "
>

            {/* ← Left Arrow */}
            <ArrowButton direction="left" onClick={() => scrollCarousel("left")} />

            {/* Scrollable cards */}
          <div
  ref={scrollRef}
  style={{
    WebkitOverflowScrolling: "touch",
  }}
              className="
  flex
  flex-1

  snap-x
  snap-mandatory

  gap-[22px]

  overflow-x-auto

  pb-[16px]

  scrollbar-hide

  scroll-smooth

  px-[2px]

  max-[900px]:
  gap-[16px]

  max-[640px]:
  gap-[12px]
"
            >
              {BEYOND_CARDS.map((card, index) => (
                <BeyondCard
                  key={card.title}
                  card={card}
                  isActive={activeCard === index}
                  onClick={() => setActiveCard(index)}
                />
              ))}
            </div>

            {/* → Right Arrow */}
            <ArrowButton direction="right" onClick={() => scrollCarousel("right")} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Arrow Button ───────────────────────────────────────────── */
function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="
        group
        flex-none
        flex
        items-center
        justify-center
        cursor-pointer

        w-[44px] h-[44px]
        rounded-full
        border-[2px] border-[#f5efe8]/50

        bg-transparent
        transition-all
        duration-300
        ease-out

        hover:bg-[#f5efe8]
        hover:border-[#f5efe8]
        hover:scale-110
        hover:shadow-[0_0_18px_rgba(245,239,232,0.35)]

        active:scale-95

        max-[640px]:w-[36px]
        max-[640px]:h-[36px]
      "
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          transition-colors duration-300
          stroke-[#f5efe8]
          group-hover:stroke-[#ae1431]
          max-[640px]:w-[14px] max-[640px]:h-[14px]
        "
      >
        {direction === "left" ? (
          <path d="M11 14L6 9L11 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M7 4L12 9L7 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/* ── Card ───────────────────────────────────────────────────── */
function BeyondCard({ card, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
     className="
  beyond-card

  group
  relative
  cursor-pointer

  flex-none
  snap-start

  overflow-hidden

  rounded-[22px]

  w-[clamp(240px,30vw,350px)]
  h-[clamp(180px,22vw,225px)]

  transition-transform
  duration-500

  hover:-translate-y-[4px]

  max-[640px]:
  rounded-[18px]
"
    >
      {/* Image */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
      />

    {/* Overlay */}
<div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/10 z-[1]" />

<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/45 group-hover:via-black/5 z-[2]" />

{/* Content */}
<div className="relative z-[3] flex h-full flex-col justify-between px-[clamp(18px,3vw,30px)] py-[clamp(18px,3vw,28px)] max-[640px]:px-[20px] max-[640px]:py-[18px]">
        {/* Code */}
       <div className="absolute inset-0 bg-black/35 transition-all duration-500 group-hover:bg-black/15" />

<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/40 group-hover:via-black/5" />
        <div className="text-[clamp(1rem,2vw,1.55rem)] font-[700] tracking-[0.16em] flex justify-start text-white/85 max-[640px]:text-[19px]">
          {card.code}
        </div>

        {/* Title */}
        <div className="font-rethink max-w-[220px]  text-[clamp(1rem,2vw,1.45rem)] font-[500] leading-[1.15] text-white/85 max-[640px]:text-[18px]">
          {card.title}
        </div>
      </div>
    </div>
  );
}