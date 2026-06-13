// "use client";

// import { useRef, useState, useEffect } from "react";
// import { gsap, ScrollTrigger } from "../../../lib/gsap";
// import { useGSAP } from "@gsap/react";
// import { section, shell } from "../../../constants/homeStyles";

// /* ── Data ────────────────────────────────────────────────────────── */
// const impactItems = [
//   { code: "/01", title: "Free & subsidised education" },
//   { code: "/02", title: "Healthcare outreach and medical camps" },
//   {
//     code: "/03",
//     title: "Water conservation projects and 180+ community wells",
//   },
//   { code: "/04", title: "Interreligious harmony initiatives" },
//   { code: "/05", title: "Housing support for disaster-affected families" },
//   { code: "/06", title: "WHO-certified teacher training programs" },
// ];

// const CARD_WIDTH = 350;
// const CARD_GAP = 20;
// const SCROLL_BY = 1;

// interface SplitHeadingProps {
//   text: string;
//   className?: string;
// }

// /* ── SplitHeading ────────────────────────────────────────────────── */
// function SplitHeading({ text, className }: SplitHeadingProps) {
//   return (
//     <h2 className={className}>
//       {text.split(" ").map((word, i) => (
//         <span
//           key={i}
//           className="mr-[0.22em] inline-block overflow-hidden leading-[1.15]"
//         >
//           <span className="split-word inline-block">{word}</span>
//         </span>
//       ))}
//     </h2>
//   );
// }

// interface ImpactImageProps {
//   src: string;
//   alt: string;
//   className?: string;
// }

// /* ── ImpactImage ─────────────────────────────────────────────────── */
// function ImpactImage({ src, alt, className = "" }: ImpactImageProps) {
//   return (
//     <div
//       className={`group relative overflow-hidden rounded-[28px] will-change-transform ${className}`}
//     >
//       <img
//         src={src}
//         alt={alt}
//         loading="lazy"
//         className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.03]"
//       />
//       <div className="absolute inset-0 bg-black/10" />
//     </div>
//   );
// }

// interface ImpactCardProps {
//   code: string;
//   title: string;
//   cardClass?: string;
// }

// /* ── ImpactCard ──────────────────────────────────────────────────── */
// function ImpactCard({ code, title, cardClass = "" }: ImpactCardProps) {
//   return (
//     <div className={`relative ${cardClass}`}>
//       <div className="card-line absolute left-0 top-0 h-full w-[2px] bg-[#f5efe8]" />
//       <div className="flex h-[225px] flex-col py-[6px]">
//         <span className="card-code tracking-[0.16em] text-[#f5efe8]">
//           {code}
//         </span>
//         <p className="card-title translate-y-[-20px] leading-[1.08] text-[#f5efe8] min-h-[84px] flex items-end">
//           {title}
//         </p>
//       </div>
//     </div>
//   );
// }

// interface CarouselArrowProps {
//   direction: "left" | "right";
//   onClick: () => void;
//   disabled?: boolean;
// }

// /* ── Carousel Arrow ──────────────────────────────────────────────── */
// function CarouselArrow({
//   direction,
//   onClick,
//   disabled = false,
// }: CarouselArrowProps) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
//       className={`
//     relative -top-7
//     group flex-none flex items-center justify-center
//     w-[42px] h-[42px]
//     rounded-full border-[2px]
//     transition-all duration-300 ease-out
//     ${
//       disabled
//         ? "border-[#666] opacity-40 cursor-not-allowed"
//         : "border-[#f5efe8]/50 cursor-pointer hover:border-transparent hover:scale-110"
//     }
//     max-[640px]:w-[40px]
//     max-[640px]:h-[40px]
//   `}
//     >
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className={`transition-colors duration-300 ${
//   disabled
//     ? "stroke-[#777]"
//     : "stroke-[#f5efe8] group-hover:stroke-white"
// }`}
//       >
//         {direction === "left" ? (
//           <path
//             d="M10 13L5 8L10 3"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         ) : (
//           <path
//             d="M6 3L11 8L6 13"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         )}
//       </svg>
//     </button>
//   );
// }

// /* ── Main ────────────────────────────────────────────────────────── */
// export default function ImpactSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const desktopCarouselRef = useRef<HTMLDivElement>(null);
//   const mobileCarouselRef = useRef<HTMLDivElement>(null);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   const [shouldInit, setShouldInit] = useState(false);

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShouldInit(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "200px" },
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const updateScrollButtons = () => {
//   const desktopEl = desktopCarouselRef.current;
//   const mobileEl = mobileCarouselRef.current;

//   const el =
//     window.innerWidth <= 640 ? mobileEl : desktopEl;

//   if (!el) return;

//   console.log({
//     scrollLeft: el.scrollLeft,
//     scrollWidth: el.scrollWidth,
//     clientWidth: el.clientWidth,
//   });

//   const isAtStart = el.scrollLeft <= 10;
// const isAtEnd =
//   el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

// setCanScrollLeft(!isAtStart);
// setCanScrollRight(!isAtEnd);

//   setCanScrollRight(
//     el.scrollLeft + el.clientWidth < el.scrollWidth - 5
//   );
// };

// useEffect(() => {
//   const desktopEl = desktopCarouselRef.current;
//   const mobileEl = mobileCarouselRef.current;

//   const timers = [
//     setTimeout(updateScrollButtons, 100),
//     setTimeout(updateScrollButtons, 500),
//     setTimeout(updateScrollButtons, 1000),
//   ];



//   window.addEventListener("resize", updateScrollButtons);

//   return () => {
//     timers.forEach(clearTimeout);

//     window.removeEventListener("resize", updateScrollButtons);
//   };
// }, []);

//   const scrollCarousel = (direction: "left" | "right") => {
//   const isMobile = window.innerWidth <= 640;

//   const el = isMobile
//     ? mobileCarouselRef.current
//     : desktopCarouselRef.current;

//   if (!el) return;

//   const cardW = isMobile ? 190 : CARD_WIDTH;
//   const gap = isMobile ? 16 : CARD_GAP;

//   const step = (cardW + gap) * SCROLL_BY;

//   el.scrollBy({
//     left: direction === "right" ? step : -step,
//     behavior: "smooth",
//   });

//   requestAnimationFrame(() => {
//     setTimeout(updateScrollButtons, 100);
// setTimeout(updateScrollButtons, 300);
// setTimeout(updateScrollButtons, 600);
//   });
// };

//   useGSAP(
//     () => {
//       if (!shouldInit) return;
//       const root = sectionRef.current;
//       if (!root) return;
//       const isMobile = window.innerWidth <= 640;
//       const ease3 = "power3.out";
//       const ease2 = "power2.out";

//       const topTl = gsap.timeline({
//         scrollTrigger: { trigger: root, start: "top 78%", once: true },
//       });

//       topTl.fromTo(
//         root.querySelectorAll(".split-word"),
//         { y: "105%" },
//         { y: "0%", duration: 0.68, stagger: 0.07, ease: ease3 },
//       );

//       if (!isMobile) {
//         topTl
//           .fromTo(
//             ".img-left",
//             { x: -44, opacity: 0, scale: 0.93 },
//             { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: ease2 },
//             "-=0.55",
//           )
//           .fromTo(
//             ".img-right",
//             { x: 44, opacity: 0, scale: 0.93 },
//             { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: ease2 },
//             "-=0.72",
//           );
//       } else {
//         topTl.fromTo(
//           root.querySelectorAll(".mob-img"),
//           { opacity: 0, scale: 0.88, y: 18 },
//           {
//             opacity: 1,
//             scale: 1,
//             y: 0,
//             duration: 0.6,
//             stagger: 0.1,
//             ease: "back.out(1.5)",
//           },
//           "-=0.45",
//         );
//       }

//       topTl
//         .fromTo(
//           root.querySelectorAll(".para-anim"),
//           { y: 20, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: ease2 },
//           "-=0.5",
//         )
//         .fromTo(
//           root.querySelector(".btn-anim"),
//           { y: 16, opacity: 0, scale: 0.94 },
//           { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
//           "-=0.3",
//         );

//       const cardsTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: root.querySelector(".cards-section"),
//           start: "top 82%",
//           once: true,
//         },
//       });

//       cardsTl.fromTo(
//         root.querySelector(".key-areas-heading"),
//         isMobile ? { opacity: 0, y: 18, scale: 0.94 } : { opacity: 0, y: 16 },
//         isMobile
//           ? { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }
//           : { opacity: 1, y: 0, duration: 0.7, ease: ease2 },
//       );

//       const cardEase = isMobile ? "back.out(1.8)" : ease2;

//       cardsTl
//         .fromTo(
//           root.querySelectorAll(".card-line"),
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1,
//             duration: isMobile ? 0.4 : 0.5,
//             stagger: 0.07,
//             ease: "power2.inOut",
//           },
//           "-=0.35",
//         )
//         .fromTo(
//           root.querySelectorAll(".card-code"),
//           isMobile ? { opacity: 0, scale: 0.8, y: 10 } : { opacity: 0, x: -10 },
//           isMobile
//             ? {
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//                 duration: 0.38,
//                 stagger: 0.07,
//                 ease: cardEase,
//               }
//             : {
//                 opacity: 1,
//                 x: 0,
//                 duration: 0.42,
//                 stagger: 0.07,
//                 ease: cardEase,
//               },
//           "-=0.32",
//         )
//         .fromTo(
//           root.querySelectorAll(".card-title"),
//           isMobile ? { opacity: 0, scale: 0.85, y: 14 } : { opacity: 0, y: 18 },
//           {
//             opacity: 1,
//             scale: 1,
//             y: 0,
//             duration: 0.42,
//             stagger: 0.07,
//             ease: cardEase,
//           },
//           "-=0.38",
//         );

//       return () => {
//         ScrollTrigger.getAll()
//           .filter((st) => root.contains(st.trigger as Node))
//           .forEach((st) => st.kill());
//       };
//     },
//     { scope: sectionRef, dependencies: [shouldInit] },
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className={`${section} bg-[#ae1431] !pt-[0px] !pb-[52px] max-[640px]:!pt-[20px] max-[640px]:!pb-[36px]`}
//       id="impact"
//     >
//       {/* ── Desktop top layout ──────────────────────────────────── */}
//       <div
//         className={`${shell} grid grid-cols-[1.05fr_0.95fr] max-[1100px]:grid-cols-1 max-[640px]:hidden`}
//       >
//         <div className="ml-[200px] grid grid-cols-[0.85fr_1.15fr] items-end gap-[26px] pt-[0px]">
//           <ImpactImage
//             src="/images/impact1.webp"
//             alt="Community support"
//             className="img-left  h-[200px] w-[300px]"
//           />
//           <ImpactImage
//             src="/images/impact2.webp"
//             alt="Social outreach"
//             className="img-right h-[300px] w-[300px]"
//           />
//         </div>
//         <div className="max-w-[480px] pt-[25px] pl-[50px] max-[1100px]:pl-0 max-[1100px]:pt-9">
//           <SplitHeading
//             text="In Service Of Society"
//             className="mb-[18px] text-[42px] leading-[1.12] text-[#f5efe8]"
//           />
//           <p className="para-anim font-rethink mb-[14px] text-[14.5px] leading-[1.75] text-[#f5efe8]">
//             ERAM Educational &amp; Welfare Trust advances social equity through
//             structured CSR initiatives focused on educational access, healthcare
//             outreach, and community resilience.
//           </p>
//           <p className="para-anim font-rethink mb-7 text-[15px] leading-[1.75] text-[#f5efe8]">
//             While education remains its core mission, the Trust extends its
//             responsibility through targeted social initiatives supporting
//             underprivileged communities.
//           </p>
//           <button className="btn-anim font-rethink h-[44px] cursor-pointer rounded-[10px] border border-[#f5efe8] bg-[#f5efe8] px-[22px] text-[13px] text-[#ae1431] transition hover:border-[#ae1431] hover:bg-black hover:text-white">
//             EXPLORE STUDENT PATHWAYS
//           </button>
//         </div>
//       </div>

//       {/* ── Mobile top layout ───────────────────────────────────── */}
//       <div className="hidden max-[640px]:flex flex-col gap-5 px-5">
//         <div className="flex w-full items-end gap-3">
//           <ImpactImage
//             src="/images/impact1.webp"
//             alt="Students"
//             className="mob-img h-[150px] flex-1 rounded-[18px]"
//           />
//           <ImpactImage
//             src="/images/impact2.webp"
//             alt="Campus"
//             className="mob-img h-[185px] flex-1 rounded-[18px]"
//           />
//         </div>
//         <div className="flex flex-col gap-3">
//           <SplitHeading
//             text="In Service Of Society"
//             className="text-[26px]  leading-[1.15] text-[#f5efe8]"
//           />
//           <p className="para-anim font-rethink text-[13.5px] leading-[1.8] text-[#f5efe8]/90">
//             ERAM Educational &amp; Welfare Trust advances social equity through
//             structured CSR initiatives focused on educational access, healthcare
//             outreach, and community resilience.
//           </p>
//           <p className="para-anim font-rethink text-[13.5px] leading-[1.8] text-[#f5efe8]/90">
//             While education remains its core mission, the Trust extends its
//             responsibility through targeted social initiatives supporting
//             underprivileged communities.
//           </p>
//           <button className="btn-anim mt-1 h-[44px] w-full cursor-pointer rounded-[12px] border border-[#f5efe8] bg-[#f5efe8] font-rethink text-[12px]  tracking-[0.08em] text-[#ae1431] transition active:scale-[0.97]">
//             EXPLORE STUDENT PATHWAYS
//           </button>
//         </div>
//       </div>

//       {/* ── Cards ────────────────────────────────────────────────── */}
//       <div className="cards-section mt-[56px] max-[640px]:mt-[32px]">
//         <p className="key-areas-heading mb-[36px] text-center text-[28px] uppercase tracking-[0.18em] text-[#f5efe8] max-[900px]:text-[24px] max-[640px]:mb-5 max-[640px]:px-5 max-[640px]:text-[13px] max-[640px]:tracking-[0.22em]">
//           Key Areas Of Impact Include:
//         </p>

//         {/* ── Desktop: arrow | scroll | arrow (unchanged) ── */}
//         <div className="mx-auto flex items-center gap-[14px] w-[min(1100px,calc(100vw-160px))] max-[640px]:hidden">
//           <CarouselArrow
//             direction="left"
//             onClick={() => scrollCarousel("left")}
//             disabled={!canScrollLeft}
//           />
//           <div
//   ref={desktopCarouselRef}
//   onScroll={updateScrollButtons}
//             className="flex-1 min-w-0 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-5 cursor-pointer"
//           >
//             <div className="flex gap-5 px-8">
//               {impactItems.map((item) => (
//                 <ImpactCard
//                   key={item.code}
//                   {...item}
//                   cardClass="
//                    impact-scroll-card
//                     flex-none snap-start
//                     w-[350px] min-h-[120px] pl-[26px] pr-[26px]
//                     [&_.card-line]:h-[185px]
//                     [&_.card-code]:text-[25px] [&_.card-code]:mb-[15px]
//                     [&_.card-title]:text-[25px] [&_.card-title]:mt-[50px]
//                   "
//                 />
//               ))}
//             </div>
//           </div>
//           <CarouselArrow
//             direction="right"
//             onClick={() => scrollCarousel("right")}
//             disabled={!canScrollRight}
//           />
//         </div>

//         {/* ── Mobile: cards then arrows below in a row ── */}
//         <div className="hidden max-[640px]:flex flex-col gap-[18px]">
//           {/* Scrollable cards */}
//           <div
//   ref={mobileCarouselRef}
//   onScroll={updateScrollButtons}
//             className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 cursor-pointer"
//           >
//             <div className="flex gap-4 px-4">
//               {impactItems.map((item) => (
//                 <ImpactCard
//                   key={item.code}
//                   {...item}
//                   cardClass="
//                     flex-none snap-start
//                     w-[190px] min-h-[170px] pl-5 pr-3 pb-1
//                     [&_.card-line]:h-[170px]
//                     [&_.card-code]:text-[15px] [&_.card-code]:mb-[40px]
//                     [&_.card-title]:text-[15px] [&_.card-title]:mt-6
//                   "
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Arrows below — centered row */}
//           <div className="flex items-center justify-center gap-[16px]">
//             <CarouselArrow
//               direction="left"
//               onClick={() => scrollCarousel("left")}
//               disabled={!canScrollLeft}
//             />

//             <CarouselArrow
//               direction="right"
//               onClick={() => scrollCarousel("right")}
//               disabled={!canScrollRight}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import { section, shell } from "../../../constants/homeStyles";

/* ── Data ────────────────────────────────────────────────────────── */
const impactItems = [
  { code: "/01", title: "Free & subsidised education" },
  { code: "/02", title: "Healthcare outreach and medical camps" },
  {
    code: "/03",
    title: "Water conservation projects and 180+ community wells",
  },
  { code: "/04", title: "Interreligious harmony initiatives" },
  { code: "/05", title: "Housing support for disaster-affected families" },
  { code: "/06", title: "WHO-certified teacher training programs" },
];

const CARD_WIDTH = 350;
const CARD_GAP = 20;
const SCROLL_BY = 1;

interface SplitHeadingProps {
  text: string;
  className?: string;
}

/* ── SplitHeading ────────────────────────────────────────────────── */
function SplitHeading({ text, className }: SplitHeadingProps) {
  return (
    <h2 className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="mr-[0.22em] inline-block overflow-hidden leading-[1.15]"
        >
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

interface ImpactImageProps {
  src: string;
  alt: string;
  className?: string;
}

/* ── ImpactImage ─────────────────────────────────────────────────── */
function ImpactImage({ src, alt, className = "" }: ImpactImageProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] will-change-transform ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

interface ImpactCardProps {
  code: string;
  title: string;
  cardClass?: string;
}

/* ── ImpactCard ──────────────────────────────────────────────────── */
function ImpactCard({ code, title, cardClass = "" }: ImpactCardProps) {
  return (
    <div className={`relative ${cardClass}`}>
      <div className="card-line absolute left-0 top-0 h-full w-[2px] bg-[#f5efe8]" />
      <div className="flex h-[225px] flex-col py-[6px]">
        <span className="card-code tracking-[0.16em] text-[#f5efe8]">
          {code}
        </span>
        <p className="card-title translate-y-[-20px] leading-[1.08] text-[#f5efe8] min-h-[84px] flex items-end">
          {title}
        </p>
      </div>
    </div>
  );
}

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

/* ── Carousel Arrow ──────────────────────────────────────────────── */
function CarouselArrow({
  direction,
  onClick,
  disabled = false,
}: CarouselArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className={`
        relative -top-7
        group flex-none flex items-center justify-center
        w-[42px] h-[42px] max-[640px]:w-[40px] max-[640px]:h-[40px]
        rounded-full border-[2px]
        transition-all duration-300 ease-out
        ${
          disabled
            ? "border-[#666] opacity-40 cursor-not-allowed"
            : "border-[#f5efe8]/50 cursor-pointer hover:border-transparent hover:scale-110"
        }
      `}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-300 ${
          disabled ? "stroke-[#777]" : "stroke-[#f5efe8] group-hover:stroke-white"
        }`}
      >
        {direction === "left" ? (
          <path
            d="M10 13L5 8L10 3"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3L11 8L6 13"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopCarouselRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [shouldInit, setShouldInit] = useState(false);

  /* ── Lazy init trigger ──────────────────────────────────────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldInit(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Active carousel ref ────────────────────────────────────────── */
  const getActiveCarousel = () => {
    const isMobile = window.innerWidth < 640;
    return isMobile ? mobileCarouselRef.current : desktopCarouselRef.current;
  };

  /* ── Read scroll state ──────────────────────────────────────────── */
  const readScrollState = (el: HTMLDivElement) => {
    const isAtStart = el.scrollLeft <= 10;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  };

  /* ── Initial button state ───────────────────────────────────────── */
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        const el = getActiveCarousel();
        if (el) readScrollState(el);
      }, 100),
      setTimeout(() => {
        const el = getActiveCarousel();
        if (el) readScrollState(el);
      }, 600),
    ];

    const onResize = () => {
      const el = getActiveCarousel();
      if (el) readScrollState(el);
    };
    window.addEventListener("resize", onResize);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ── Scroll carousel ────────────────────────────────────────────── */
  const scrollCarousel = (direction: "left" | "right") => {
    const isMobile = window.innerWidth < 640;
    const el = isMobile ? mobileCarouselRef.current : desktopCarouselRef.current;
    if (!el) return;

    const cardW = isMobile ? 190 : CARD_WIDTH;
    const gap = isMobile ? 16 : CARD_GAP;
    const step = (cardW + gap) * SCROLL_BY;

    el.scrollBy({ left: direction === "right" ? step : -step, behavior: "smooth" });

    // Delay poll start by 80ms so the browser has actually begun moving.
    // Then poll every 50ms; wait for 3 consecutive identical scrollLeft reads
    // (150ms of zero movement = fully settled), then read final state.
    // 1200ms hard cap prevents leaks.
    let poll: ReturnType<typeof setInterval>;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      clearInterval(poll);
      clearTimeout(cap);
      readScrollState(el);
    };

    const cap = setTimeout(finish, 1200);

    setTimeout(() => {
      if (done) return;
      let lastLeft = el.scrollLeft;
      let stableCount = 0;

      poll = setInterval(() => {
        if (el.scrollLeft === lastLeft) {
          stableCount++;
          if (stableCount >= 3) finish();
        } else {
          stableCount = 0;
          lastLeft = el.scrollLeft;
        }
      }, 50);
    }, 80);
  };

  /* ── GSAP animations ────────────────────────────────────────────── */
  useGSAP(
    () => {
      if (!shouldInit) return;
      const root = sectionRef.current;
      if (!root) return;
      const isMobile = window.innerWidth <= 640;
      const ease3 = "power3.out";
      const ease2 = "power2.out";

      const topTl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      topTl.fromTo(
        root.querySelectorAll(".split-word"),
        { y: "105%" },
        { y: "0%", duration: 0.68, stagger: 0.07, ease: ease3 },
      );

      if (!isMobile) {
        topTl
          .fromTo(
            ".img-left",
            { x: -44, opacity: 0, scale: 0.93 },
            { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: ease2 },
            "-=0.55",
          )
          .fromTo(
            ".img-right",
            { x: 44, opacity: 0, scale: 0.93 },
            { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: ease2 },
            "-=0.72",
          );
      } else {
        topTl.fromTo(
          root.querySelectorAll(".mob-img"),
          { opacity: 0, scale: 0.88, y: 18 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.45",
        );
      }

      topTl
        .fromTo(
          root.querySelectorAll(".para-anim"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: ease2 },
          "-=0.5",
        )
        .fromTo(
          root.querySelector(".btn-anim"),
          { y: 16, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3",
        );

      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector(".cards-section"),
          start: "top 82%",
          once: true,
        },
      });

      cardsTl.fromTo(
        root.querySelector(".key-areas-heading"),
        isMobile ? { opacity: 0, y: 18, scale: 0.94 } : { opacity: 0, y: 16 },
        isMobile
          ? { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }
          : { opacity: 1, y: 0, duration: 0.7, ease: ease2 },
      );

      const cardEase = isMobile ? "back.out(1.8)" : ease2;

      cardsTl
        .fromTo(
          root.querySelectorAll(".card-line"),
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: isMobile ? 0.4 : 0.5,
            stagger: 0.07,
            ease: "power2.inOut",
          },
          "-=0.35",
        )
        .fromTo(
          root.querySelectorAll(".card-code"),
          isMobile ? { opacity: 0, scale: 0.8, y: 10 } : { opacity: 0, x: -10 },
          isMobile
            ? { opacity: 1, scale: 1, y: 0, duration: 0.38, stagger: 0.07, ease: cardEase }
            : { opacity: 1, x: 0, duration: 0.42, stagger: 0.07, ease: cardEase },
          "-=0.32",
        )
        .fromTo(
          root.querySelectorAll(".card-title"),
          isMobile ? { opacity: 0, scale: 0.85, y: 14 } : { opacity: 0, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.42, stagger: 0.07, ease: cardEase },
          "-=0.38",
        );

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => root.contains(st.trigger as Node))
          .forEach((st) => st.kill());
      };
    },
    { scope: sectionRef, dependencies: [shouldInit] },
  );

  /* ── JSX ────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className={`${section} bg-[#ae1431] !pt-[0px] !pb-[52px] max-[640px]:!pt-[20px] max-[640px]:!pb-[36px]`}
      id="impact"
    >
      {/* ── Desktop top layout ──────────────────────────────────── */}
      <div
        className={`${shell} grid grid-cols-[1.05fr_0.95fr] max-[1100px]:grid-cols-1 max-[640px]:hidden`}
      >
        <div className="ml-[200px] grid grid-cols-[0.85fr_1.15fr] items-end gap-[26px]">
          <ImpactImage
            src="/images/impact1.webp"
            alt="Community support"
            className="img-left h-[200px] w-[300px]"
          />
          <ImpactImage
            src="/images/impact2.webp"
            alt="Social outreach"
            className="img-right h-[300px] w-[300px]"
          />
        </div>
        <div className="max-w-[480px] pt-[25px] pl-[50px] max-[1100px]:pl-0 max-[1100px]:pt-9">
          <SplitHeading
            text="In Service Of Society"
            className="mb-[18px] text-[42px] leading-[1.12] text-[#f5efe8]"
          />
          <p className="para-anim font-rethink mb-[14px] text-[14.5px] leading-[1.75] text-[#f5efe8]">
            ERAM Educational &amp; Welfare Trust advances social equity through
            structured CSR initiatives focused on educational access, healthcare
            outreach, and community resilience.
          </p>
          <p className="para-anim font-rethink mb-7 text-[15px] leading-[1.75] text-[#f5efe8]">
            While education remains its core mission, the Trust extends its
            responsibility through targeted social initiatives supporting
            underprivileged communities.
          </p>
          <button className="btn-anim font-rethink h-[44px] cursor-pointer rounded-[10px] border border-[#f5efe8] bg-[#f5efe8] px-[22px] text-[13px] text-[#ae1431] transition hover:border-[#ae1431] hover:bg-black hover:text-white">
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ── Mobile top layout ───────────────────────────────────── */}
      <div className="hidden max-[640px]:flex flex-col gap-5 px-5">
        <div className="flex w-full items-end gap-3">
          <ImpactImage
            src="/images/impact1.webp"
            alt="Students"
            className="mob-img h-[150px] flex-1 rounded-[18px]"
          />
          <ImpactImage
            src="/images/impact2.webp"
            alt="Campus"
            className="mob-img h-[185px] flex-1 rounded-[18px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <SplitHeading
            text="In Service Of Society"
            className="text-[26px] leading-[1.15] text-[#f5efe8]"
          />
          <p className="para-anim font-rethink text-[13.5px] leading-[1.8] text-[#f5efe8]/90">
            ERAM Educational &amp; Welfare Trust advances social equity through
            structured CSR initiatives focused on educational access, healthcare
            outreach, and community resilience.
          </p>
          <p className="para-anim font-rethink text-[13.5px] leading-[1.8] text-[#f5efe8]/90">
            While education remains its core mission, the Trust extends its
            responsibility through targeted social initiatives supporting
            underprivileged communities.
          </p>
          <button className="btn-anim mt-1 h-[44px] w-full cursor-pointer rounded-[12px] border border-[#f5efe8] bg-[#f5efe8] font-rethink text-[12px] tracking-[0.08em] text-[#ae1431] transition active:scale-[0.97]">
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ── Cards ────────────────────────────────────────────────── */}
      <div className="cards-section mt-[56px] max-[640px]:mt-[32px]">
        <p className="key-areas-heading mb-[36px] text-center text-[28px] uppercase tracking-[0.18em] text-[#f5efe8] max-[900px]:text-[24px] max-[640px]:mb-5 max-[640px]:px-5 max-[640px]:text-[13px] max-[640px]:tracking-[0.22em]">
          Key Areas Of Impact Include:
        </p>

        {/* ── Desktop: arrow | scroll | arrow ── */}
        <div className="mx-auto flex items-center gap-[14px] w-[min(1100px,calc(100vw-160px))] max-[640px]:hidden">
          <CarouselArrow
            direction="left"
            onClick={() => scrollCarousel("left")}
            disabled={!canScrollLeft}
          />
          <div
            ref={desktopCarouselRef}
            className="flex-1 min-w-0 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-5 cursor-pointer"
          >
            <div className="flex gap-5 px-8">
              {impactItems.map((item) => (
                <ImpactCard
                  key={item.code}
                  {...item}
                  cardClass="
                    impact-scroll-card flex-none snap-start
                    w-[350px] min-h-[120px] pl-[26px] pr-[26px]
                    [&_.card-line]:h-[185px]
                    [&_.card-code]:text-[25px] [&_.card-code]:mb-[15px]
                    [&_.card-title]:text-[25px] [&_.card-title]:mt-[50px]
                  "
                />
              ))}
            </div>
          </div>
          <CarouselArrow
            direction="right"
            onClick={() => scrollCarousel("right")}
            disabled={!canScrollRight}
          />
        </div>

        {/* ── Mobile: cards then arrows below ── */}
        <div className="hidden max-[640px]:flex flex-col gap-[18px]">
          <div
            ref={mobileCarouselRef}
            className="w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 cursor-pointer"
          >
            <div className="flex gap-4 px-4">
              {impactItems.map((item) => (
                <ImpactCard
                  key={item.code}
                  {...item}
                  cardClass="
                    flex-none snap-start
                    w-[190px] min-h-[170px] pl-5 pr-3 pb-1
                    [&_.card-line]:h-[170px]
                    [&_.card-code]:text-[15px] [&_.card-code]:mb-[40px]
                    [&_.card-title]:text-[15px] [&_.card-title]:mt-6
                  "
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-[16px]">
            <CarouselArrow
              direction="left"
              onClick={() => scrollCarousel("left")}
              disabled={!canScrollLeft}
            />
            <CarouselArrow
              direction="right"
              onClick={() => scrollCarousel("right")}
              disabled={!canScrollRight}
            />
          </div>
        </div>
      </div>
    </section>
  );
}