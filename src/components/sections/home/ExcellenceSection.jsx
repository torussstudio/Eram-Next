// import { useState, useRef, useEffect, useCallback } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);


// const CATEGORIES = ["ACADEMIC", "SPORTS", "CULTURAL", "PROFESSIONAL"];
// export const excellenceDomains = {
//   ACADEMIC: [
//     {
     
//       image: "/images/academic1.jpeg",
//     },
//     {
      
//       image: "/images/academic2.jpeg",
//     },
//     {
    
//       image: "/images/academic3.jpeg",
//     },
//     {
     
//       image: "/images/academic4.jpeg",
//     },
//   ],

//   SPORTS: [
//     {
     
//       image: "/images/sports1.png",
//     },
//     {
     
//       image: "/images/sports2.png",
//     },
//     {
     
//       image: "/images/sports3.png",
//     },
//     {
      
//       image: "/images/sports4.jpeg",
//     },
//   ],

//   CULTURAL: [
//     {
     
//       image: "/images/cultural1.png",
//     },
//     {
      
//       image: "/images/cultural2.png",
//     },
//     {
     
//       image: "/images/cultural3.png",
//     },
//     {
     
//       image: "/images/cultural4.png",
//     },
//   ],

//   PROFESSIONAL: [
//     {
      
//       image: "/images/pro1.png",
//     },
//     {
     
//       image: "/images/pro2.png",
//     },
//     {
    
//       image: "/images/pro3.png",
//     },
//     {
     
//       image: "/images/pro4.png",
//     },
//   ],
// };

// const isDesktop = () => window.innerWidth >= 900;

// export default function ExcellenceSection() {
//   const [active, setActive] = useState(0);
//   const sectionRef = useRef(null);
//   const isAnimating = useRef(false);
//   const isMounted = useRef(false);
//   const currentCategory = CATEGORIES[active];
// const currentCards = excellenceDomains[currentCategory];

//   /* ── mobile card transition ───────────────────────────────────── */
//   const goTo = useCallback(
//     (nextIdx) => {
//       if (
//         nextIdx === active ||
//         nextIdx < 0 ||
//         nextIdx >= CATEGORIES.length ||
//         isAnimating.current
//       )
//         return;

//       if (isDesktop()) {
//         setActive(nextIdx);
//         return;
//       }

//       isAnimating.current = true;
//       const dir = nextIdx > active ? 1 : -1;

//       gsap.to(".mob-exc-card", {
//         x: dir * -40,
//         opacity: 0,
//         duration: 0.22,
//         stagger: 0.03,
//         ease: "power2.in",
//         onComplete: () => {
//           setActive(nextIdx);
//           isAnimating.current = false;
//         },
//       });
//     },
//     [active],
//   );

//   /* ── animate cards in after active changes ────────────────────── */
//   useEffect(() => {
//     // First render: let the ScrollTrigger entrance handle the reveal.
//     // Only run this effect on actual category switches after mount.
//     if (!isMounted.current) {
//       isMounted.current = true;
//       return;
//     }

//     if (isDesktop()) {
//       gsap.fromTo(
//         ".exc-card",
//         { opacity: 0, y: 20, scale: 0.96 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
//       );
//     } else {
//       gsap.fromTo(
//         ".mob-exc-card",
//         { x: 40, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power3.out" },
//       );
//     }
//   }, [active]);

//   /* ── scroll entrance ─────────────────────────────────────────── */
//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();

//       mm.add("(min-width: 900px)", () => {
//         // Pre-hide everything before ScrollTrigger fires — prevents the
//         // "flash visible → snap invisible" blink on scroll-into-view
//         gsap.set(".exc-heading",   { clipPath: "inset(0 100% 0 0)" });
//         gsap.set(".exc-menu-item", { x: -40, opacity: 0 });
//         gsap.set(".exc-card",      { scale: 0.9, opacity: 0, y: 30 });
//         gsap.set(".exc-btn",       { y: 20, opacity: 0 });

//         const trigger     = { trigger: sectionRef.current, start: "top 78%" };
//         const gridTrigger = { trigger: ".exc-grid",        start: "top 85%" };

//         gsap.to(".exc-heading",   { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut", scrollTrigger: trigger });
//         gsap.to(".exc-menu-item", { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: trigger });
//         gsap.to(".exc-card",      { scale: 1, opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out", scrollTrigger: gridTrigger });
//         gsap.to(".exc-btn",       { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".exc-grid", start: "top 75%" } });
//       });

//       mm.add("(max-width: 899px)", () => {
//         // Same pre-hide pattern for mobile targets
//         gsap.set(".mob-exc-word", { y: "105%", opacity: 0 });
//         gsap.set(".mob-nav-row",  { y: 16,     opacity: 0 });
//         gsap.set(".mob-exc-card", { y: 48,     opacity: 0 });
//         gsap.set(".mob-exc-btn",  { y: 16,     opacity: 0 });

//         const trigger = { trigger: sectionRef.current, start: "top 82%" };

//         gsap.to(".mob-exc-word", { y: "0%", opacity: 1, duration: 0.7, stagger: 0.06, ease: "power4.out", scrollTrigger: trigger });
//         gsap.to(".mob-nav-row",  { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
//         gsap.to(".mob-exc-card", { y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: ".mob-exc-grid", start: "top 88%" } });
//         gsap.to(".mob-exc-btn",  { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".mob-exc-btn", start: "top 95%" } });
//       });

//       return () => mm.revert();
//     },
//     { scope: sectionRef },
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-white py-[120px] max-[900px]:py-[64px]"
//       id="gallery"
//     >
//       {/* ── Desktop ≥ 900px ─────────────────────────────────────── */}
//       <div className="hidden min-[900px]:grid max-w-[1180px] mx-auto px-[24px] grid-cols-[260px_1fr] gap-[60px]">
//         <div className="pt-[20px] sticky top-[120px] self-start z-30 flex flex-col gap-[22px]">
//           {CATEGORIES.map((label, i) => (
//             <button
//               key={label}
//               onClick={() => setActive(i)}
//               className={`exc-menu-item text-left text-[22px] tracking-[0.16em] font-[400] transition-all duration-200 ${
//                 active === i
//                   ? "text-[#111]"
//                   : "text-[#a3a3a3] hover:text-[#666] cursor-pointer"
//               }`}
//             >
//               {active === i && <span>//</span>}
//               {label}
//             </button>
//           ))}
//         </div>

//         <div className="max-w-[680px] ml-[80px]">
//           <h2 className="exc-heading font-display text-[48px] font-[600] tracking-[-0.02em] text-[#111] mb-[56px]">
//             Excellence Across Every Domain
//           </h2>
//           <div className="exc-grid grid grid-cols-2 gap-[32px]">
//             {currentCards.map((item, i) => (
//               <div
//   key={i}
//   className="
//     exc-card
//     group
//     relative
//     h-[320px]
//     overflow-hidden
//     rounded-[28px]
//   "
// >
//   {/* IMAGE */}
//   <img
//     src={item.image}
//     className="
//       absolute
//       inset-0
//       h-full
//       w-full
//       object-cover
//       transition-transform
//       duration-700
//       group-hover:scale-105
//     "
//   />

//   {/* OVERLAY */}
//   <div className="absolute inset-0 bg-black/25" />
// </div>
//             ))}
//           </div>
//           <div className="mt-[56px] flex justify-center">
//             <button className="exc-btn font-rethink px-[28px] py-[12px] text-[13px] cursor-pointer tracking-[0.16em] uppercase text-[#222] border border-[#bfbfbf] rounded-[10px] mr-[450px] max-[1200px]:mr-0 transition-all duration-200 hover:bg-[#111] hover:text-white">
//               Explore Excellence
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Mobile < 900px ──────────────────────────────────────── */}
//       <div className="min-[900px]:hidden px-[20px]">
//         {/* Heading */}
//         <div className="mb-[36px]">
//           <p className="text-[10px] tracking-[0.28em] uppercase text-[#b0b0b0] font-semibold mb-[14px]">
//             Our Domains
//           </p>
//           <h2 className="font-display text-[32px] font-[600] tracking-[-0.02em] text-[#111] leading-[1.2]">
//             {"Excellence Across Every Domain".split(" ").map((word, i) => (
//               <span
//                 key={i}
//                 className="inline-block overflow-hidden align-bottom mr-[0.22em]"
//               >
//                 <span className="mob-exc-word inline-block">{word}</span>
//               </span>
//             ))}
//           </h2>
//         </div>

//         {/* Navigation row */}
//         <div className="mob-nav-row mb-[24px]">
//           <div className="flex items-center justify-between mb-[10px]">
//             <NavArrow direction="left" onClick={() => goTo(active - 1)} disabled={active === 0} />

//             <div className="flex flex-col items-center gap-[3px]">
//               <span className="text-[9px] font-semibold tracking-[0.22em] text-[#c0c0c0] uppercase">
//                 0{active + 1} / 0{CATEGORIES.length}
//               </span>
//               <span className="font-display text-[17px] font-semibold tracking-[0.05em] text-[#111] leading-none">
//                 {CATEGORIES[active]}
//               </span>
//             </div>

//             <NavArrow direction="right" onClick={() => goTo(active + 1)} disabled={active === CATEGORIES.length - 1} />
//           </div>

//           {/* Progress track */}
//           <div className="h-[2px] bg-[#f0f0f0] rounded-full overflow-hidden">
//             <div
//               className="h-full bg-[#111] rounded-full transition-all duration-350 ease-out"
//               style={{ width: `${((active + 1) / CATEGORIES.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="mob-exc-grid grid grid-cols-2 gap-[10px] mb-[24px]">
//          {currentCards.map((item, i) => (
//           <div
//   key={i}
//   className="
//     mob-exc-card
//     group
//     relative
//     aspect-square
//     overflow-hidden
//     rounded-[20px]
//   "
// >
//   {/* IMAGE */}
//   <img
//     src={item.image}
//     className="
//       absolute
//       inset-0
//       h-full
//       w-full
//       object-cover
//       transition-transform
//       duration-700
//       group-active:scale-105
//     "
//   />

//   {/* OVERLAY */}
//   <div className="absolute inset-0 bg-black/25" />

//   {/* TEXT */}
// </div>
//           ))}
//         </div>

//         {/* Dot indicators */}
//         <div className="flex justify-center gap-[6px] mb-[28px]">
//           {CATEGORIES.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               className="rounded-full transition-all duration-300"
//               style={{
//                 width: active === i ? "20px" : "6px",
//                 height: "6px",
//                 background: active === i ? "#111" : "#ddd",
//               }}
//             />
//           ))}
//         </div>

//         {/* CTA */}
//         <button className="mob-exc-btn w-full rounded-[12px] cursor-pointer border border-[#d8d8d8] py-[15px] text-[11px] font-[600] tracking-[0.18em] uppercase text-[#222] transition-all duration-200 active:bg-[#111] active:text-white active:border-[#111]">
//           Explore Excellence
//         </button>
//       </div>
//     </section>
//   );
// }

// /* ── Small extracted component to avoid repetition ──────────────── */
// function NavArrow({ direction, onClick, disabled }) {
//   const d = direction === "left" ? "M7.5 2L3.5 6l4 4" : "M4.5 2l4 4-4 4";
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className="w-[36px] h-[36px] rounded-full border border-[#e4e4e4] flex items-center justify-center transition-colors duration-200 disabled:opacity-20"
//     >
//       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//         <path d={d} stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     </button>
//   );
// }


import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = ["ACADEMIC", "SPORTS", "CULTURAL", "PROFESSIONAL"];

export const excellenceDomains = {
  ACADEMIC:     Array.from({ length: 4 }, (_, i) => ({ image: `/images/academic${i + 1}.jpeg` })),
  SPORTS:       Array.from({ length: 4 }, (_, i) => ({ image: `/images/sports${i + 1}.${i < 3 ? "png" : "jpeg"}` })),
  CULTURAL:     Array.from({ length: 4 }, (_, i) => ({ image: `/images/cultural${i + 1}.png` })),
  PROFESSIONAL: Array.from({ length: 4 }, (_, i) => ({ image: `/images/pro${i + 1}.png` })),
};

const isDesktop = () => window.innerWidth >= 900;

/* ── NavArrow ────────────────────────────────────────────────────── */
function NavArrow({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4e4e4] transition-colors duration-200 disabled:opacity-20"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d={direction === "left" ? "M7.5 2L3.5 6l4 4" : "M4.5 2l4 4-4 4"}
          stroke="#111"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ── ImageCard ───────────────────────────────────────────────────── */
function ImageCard({ src, className = "", cardClass = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[28px] ${cardClass}`}>
      <img
        src={src}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105 ${className}`}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function ExcellenceSection() {
  const [active, setActive]   = useState(0);
  const sectionRef            = useRef(null);
  const isAnimating           = useRef(false);
  const isMounted             = useRef(false);

  const currentCards = excellenceDomains[CATEGORIES[active]];

  /* ── Category switch ───────────────────────────────────────────── */
  const goTo = useCallback((nextIdx) => {
    if (nextIdx === active || nextIdx < 0 || nextIdx >= CATEGORIES.length || isAnimating.current) return;

    if (isDesktop()) {
      setActive(nextIdx);
      return;
    }

    isAnimating.current = true;
    const dir = nextIdx > active ? 1 : -1;

    gsap.to(".mob-exc-card", {
      x: dir * -36,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setActive(nextIdx);
        isAnimating.current = false;
      },
    });
  }, [active]);

  /* ── Animate cards in after tab switch ────────────────────────── */
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }

    if (isDesktop()) {
      gsap.fromTo(
        ".exc-card",
        { opacity: 0, y: 18, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: { amount: 0.3 }, ease: "power3.out" }
      );
    } else {
      gsap.fromTo(
        ".mob-exc-card",
        { x: 36, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.42, stagger: { amount: 0.25 }, ease: "power3.out" }
      );
    }
  }, [active]);

  /* ── Scroll entrance ─────────────────────────────────────────── */
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      gsap.set(".exc-heading",   { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".exc-menu-item", { x: -32, opacity: 0 });
      gsap.set(".exc-card",      { opacity: 0, y: 28, scale: 0.95 });
      gsap.set(".exc-btn",       { opacity: 0, y: 16 });

      const t1 = { trigger: sectionRef.current, start: "top 78%" };
      const t2 = { trigger: ".exc-grid",        start: "top 85%" };

      gsap.to(".exc-heading",   { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power3.inOut", scrollTrigger: t1 });
      gsap.to(".exc-menu-item", { x: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: "power3.out", scrollTrigger: t1 });
      gsap.to(".exc-card",      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: { amount: 0.35 }, ease: "power3.out", scrollTrigger: t2 });
      gsap.to(".exc-btn",       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t2 });
    });

    mm.add("(max-width: 899px)", () => {
      gsap.set(".mob-exc-word", { y: "105%", opacity: 0 });
      gsap.set(".mob-nav-row",  { y: 14, opacity: 0 });
      gsap.set(".mob-exc-card", { y: 40, opacity: 0 });
      gsap.set(".mob-exc-btn",  { y: 14, opacity: 0 });

      const t1 = { trigger: sectionRef.current, start: "top 82%" };
      const t2 = { trigger: ".mob-exc-grid",   start: "top 88%" };

      gsap.to(".mob-exc-word", { y: "0%", opacity: 1, duration: 0.65, stagger: 0.055, ease: "power4.out", scrollTrigger: t1 });
      gsap.to(".mob-nav-row",  { y: 0, opacity: 1, duration: 0.55, delay: 0.25, ease: "power3.out", scrollTrigger: t1 });
      gsap.to(".mob-exc-card", { y: 0, opacity: 1, duration: 0.6, stagger: { amount: 0.3 }, ease: "power3.out", scrollTrigger: t2 });
      gsap.to(".mob-exc-btn",  { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".mob-exc-btn", start: "top 95%" } });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-white py-[120px] max-[900px]:py-16"
    >
      {/* ── Desktop ≥ 900px ─────────────────────────────────────── */}
      <div className="mx-auto hidden max-w-[1180px] grid-cols-[240px_1fr] gap-16 px-6 min-[900px]:grid">
        {/* Sidebar nav */}
        <aside className="sticky top-[120px] z-30 flex flex-col gap-5 self-start pt-5">
          {CATEGORIES.map((label, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              className={`exc-menu-item text-left text-[22px] tracking-[0.16em] transition-colors duration-200 ${
                active === i ? "text-[#111]" : "text-[#b0b0b0] hover:text-[#555] cursor-pointer"
              }`}
            >
              {active === i && <span className="mr-1">//</span>}
              {label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="ml-20">
          <h2 className="exc-heading font-display mb-14 text-[48px] tracking-[-0.02em] text-[#111]">
            Excellence Across Every Domain
          </h2>

          <div className="exc-grid grid grid-cols-2 gap-8">
            {currentCards.map((item, i) => (
              <ImageCard key={i} src={item.image} cardClass="h-[320px]" />
            ))}
          </div>

          <div className="mt-14">
            <button className="exc-btn font-rethink cursor-pointer rounded-[10px] border border-[#c0c0c0] px-7 py-3 text-[13px] uppercase tracking-[0.16em] text-[#222] transition-all duration-200 hover:bg-[#111] hover:text-white hover:border-[#111]">
              Explore Excellence
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile < 900px ──────────────────────────────────────── */}
      <div className="px-5 min-[900px]:hidden">
        {/* Heading */}
        <div className="mb-9">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b0b0b0]">
            Our Domains
          </p>
          <h2 className="font-display text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111]">
            {"Excellence Across Every Domain".split(" ").map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <span className="mob-exc-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Navigation row */}
        <div className="mob-nav-row mb-6">
          <div className="mb-2.5 flex items-center justify-between">
            <NavArrow direction="left"  onClick={() => goTo(active - 1)} disabled={active === 0} />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c0c0c0]">
                0{active + 1} / 0{CATEGORIES.length}
              </span>
              <span className="font-display text-[17px] font-semibold leading-none tracking-[0.05em] text-[#111]">
                {CATEGORIES[active]}
              </span>
            </div>
            <NavArrow direction="right" onClick={() => goTo(active + 1)} disabled={active === CATEGORIES.length - 1} />
          </div>

          {/* Progress bar */}
          <div className="h-[2px] overflow-hidden rounded-full bg-[#f0f0f0]">
            <div
              className="h-full rounded-full bg-[#111] transition-all duration-300 ease-out"
              style={{ width: `${((active + 1) / CATEGORIES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="mob-exc-grid mb-6 grid grid-cols-2 gap-2.5">
          {currentCards.map((item, i) => (
            <ImageCard key={i} src={item.image} cardClass="mob-exc-card aspect-square rounded-[20px]" />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mb-7 flex justify-center gap-1.5">
          {CATEGORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:      active === i ? "20px" : "6px",
                height:     "6px",
                background: active === i ? "#111" : "#ddd",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button className="mob-exc-btn font-rethink w-full cursor-pointer rounded-[12px] border border-[#d8d8d8] py-[15px] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#222] transition-all duration-200 active:border-[#111] active:bg-[#111] active:text-white">
          Explore Excellence
        </button>
      </div>
    </section>
  );
}