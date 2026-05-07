// import { useRef } from "react";
// import { gsap } from "../../../lib/gsap";
// import { useGSAP } from "@gsap/react";

// export default function AboutSection() {
//   const sectionRef = useRef(null);

//   useGSAP(
//     () => {
//       // ✅ Kill heavy animations on mobile
//       if (window.innerWidth < 768) return;

//       const mm = gsap.matchMedia();

//       // ✅ Shared trigger (better performance)
//       const sharedTrigger = {
//         trigger: sectionRef.current,
//         start: "top 80%",
//       };

//       /* ─────────────────────────────────────────────
//          DESKTOP ≥ 1100px
//       ───────────────────────────────────────────── */
//       mm.add("(min-width: 1100px)", () => {
//         gsap.fromTo(
//           ".about-text",
//           {
//             opacity: 0,
//             y: 30,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.75,
//             stagger: 0.12,
//             ease: "power2.out",
//             scrollTrigger: sharedTrigger,
//           }
//         );

//         gsap.fromTo(
//           ".about-card",
//           {
//             opacity: 0,
//             y: 40,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.75,
//             stagger: 0.08,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: ".about-grid",
//               start: "top 82%",
//             },
//           }
//         );
//       });

//       /* ─────────────────────────────────────────────
//          TABLET + MOBILE < 1100px
//       ───────────────────────────────────────────── */
//       mm.add("(max-width: 1099px)", () => {
//         // Label
//         gsap.fromTo(
//           ".mob-label",
//           {
//             opacity: 0,
//             y: 18,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: "power2.out",
//             scrollTrigger: sharedTrigger,
//           }
//         );

//         // Heading (lighter animation)
//         gsap.fromTo(
//           ".mob-heading-wrap",
//           {
//             opacity: 0,
//             y: 26,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//             ease: "power3.out",
//             scrollTrigger: sharedTrigger,
//           }
//         );

//         // Paragraph
//         gsap.fromTo(
//           ".mob-para",
//           {
//             opacity: 0,
//             y: 24,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.65,
//             delay: 0.1,
//             ease: "power2.out",
//             scrollTrigger: sharedTrigger,
//           }
//         );

//         // Quote
//         gsap.fromTo(
//           ".mob-quote",
//           {
//             opacity: 0,
//             y: 28,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.65,
//             delay: 0.15,
//             ease: "power2.out",
//             scrollTrigger: sharedTrigger,
//           }
//         );

//         // Cards
//         gsap.fromTo(
//           ".mob-card",
//           {
//             opacity: 0,
//             y: 36,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//             stagger: 0.08,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: ".mob-cards-wrap",
//               start: "top 85%",
//             },
//           }
//         );
//       });

//       return () => mm.revert();
//     },
//     { scope: sectionRef }
//   );

//   return (
//     <section
//       ref={sectionRef}
//       id="about-us"
//       className="bg-[#ae1431] py-[100px]"
//     >
//       {/* =========================================================
//           DESKTOP ≥ 1100px
//       ========================================================= */}
//       <div className="hidden min-[1100px]:block mx-auto w-[min(1100px,calc(100vw-120px))]">
//         <div className="grid grid-cols-[300px_1fr] gap-x-[100px]">
//           <div className="about-text pl-[65px]">
//             <span className="text-[18px] tracking-[0.15em] uppercase text-[#f5efe8] font-medium">
//               ABOUT US
//             </span>
//           </div>

//           <div className="pl-[300px] max-[1280px]:pl-[160px]">
//             <h2 className="about-text font-display text-[48px] leading-[1.15] text-[#f5efe8] max-w-[600px]">
//               An Institutional
//               <br />
//               Movement of Purpose
//             </h2>

//             <p className="about-text mt-[24px] text-[14.5px] leading-[1.75] text-[#f5efe8] max-w-[520px]">
//               ERAM Education was established to build disciplined, value-based
//               institutions that expand access to quality learning and reach
//               communities that need it most. Founded under the CSR vision of the
//               Eram Group of Companies, it upholds structured academic standards
//               while serving communities with integrity.
//             </p>
//           </div>
//         </div>

//         <div className="about-grid mt-[80px]">
//           <div className="grid grid-cols-3 gap-[24px]">
//             <div className="about-card flex items-end min-h-[260px] pb-[115px] pl-[40px] max-[1280px]:pl-[60px]">
//               <p className="font-display text-[32px] leading-[1.25] text-[#f5efe8]">
//                 Committed
//                 <br />
//                 to Access.
//                 <br />
//                 Dedicated to
//                 <br />
//                 Excellence
//               </p>
//             </div>

//             <div className="about-card rounded-[20px] bg-[#d8d8d8] min-h-[300px]" />

//             <div className="about-card rounded-[20px] bg-[#d8d8d8] min-h-[300px]" />
//           </div>

//           <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
//             <div className="about-card rounded-[24px] bg-[#d8d8d8] min-h-[320px]" />

//             <div className="about-card rounded-[24px] bg-[#d8d8d8] min-h-[320px]" />
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           MOBILE + TABLET < 1100px
//       ========================================================= */}
//       <div className="min-[1100px]:hidden">
//         <div className="px-[28px] max-[480px]:px-[20px]">

//           {/* Label */}
//           <div className="mob-label mb-[36px]">
//             <span className="text-[11px] tracking-[0.28em] uppercase text-[#f5efe8] font-medium">
//               ABOUT US
//             </span>

//             <div className="mt-[6px] h-[1.5px] w-full bg-[#f5efe8]/40 rounded-full" />
//           </div>

//           {/* Heading */}
//           <div
//             className="
//               mob-heading-wrap
//               font-display
//               text-[42px]
//               leading-[1.18]
//               text-[#f5efe8]
//               mb-[28px]
//               max-[480px]:text-[34px]
//               max-[360px]:text-[28px]
//             "
//           >
//             An Institutional
//             <br />
//             Movement of Purpose
//           </div>

//           {/* Paragraph */}
//           <p className="mob-para text-[14px] leading-[1.85] text-[#f5efe8]/75 max-w-[500px] mb-[44px]">
//             ERAM Education was established to build disciplined, value-based
//             institutions that expand access to quality learning and reach
//             communities that need it most. Founded under the CSR vision of the
//             Eram Group of Companies, it upholds structured academic standards
//             while serving communities with integrity.
//           </p>

//           {/* Quote */}
//           <div className="mob-quote mb-[52px] border-l-[3px] border-[#f5efe8]/50 pl-[22px]">
//             <p
//               className="
//                 font-display
//                 text-[26px]
//                 leading-[1.3]
//                 text-[#f5efe8]
//                 max-[480px]:text-[22px]
//               "
//             >
//               Committed
//               <br />
//               to Access.
//               <br />
//               Dedicated to
//               <br />
//               Excellence
//             </p>
//           </div>
//         </div>

//         {/* Cards */}
//         <div
//           className="
//             mob-cards-wrap
//             px-[28px]
//             max-[480px]:px-[20px]
//             grid
//             grid-cols-2
//             gap-[14px]
//             max-[560px]:grid-cols-1
//           "
//         >
//           <div
//             className="
//               mob-card
//               rounded-[22px]
//               bg-[#d8d8d8]
//               min-h-[200px]
//               max-[560px]:min-h-[180px]
//             "
//           />

//           <div
//             className="
//               mob-card
//               rounded-[22px]
//               bg-[#d8d8d8]
//               min-h-[240px]
//               max-[560px]:min-h-[180px]
//               mt-0
//               min-[561px]:mt-[-40px]
//             "
//           />

//           <div
//             className="
//               mob-card
//               rounded-[22px]
//               bg-[#d8d8d8]
//               min-h-[200px]
//               max-[560px]:min-h-[180px]
//               mt-0
//               min-[561px]:mt-[40px]
//             "
//           />

//           <div
//             className="
//               mob-card
//               rounded-[22px]
//               bg-[#d8d8d8]
//               min-h-[200px]
//               max-[560px]:min-h-[180px]
//             "
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import { useRef } from "react";
import { gsap } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION CONSTANTS — single source of truth
───────────────────────────────────────────────────────────────────────────── */
const EASE = {
  snappy : "power2.out",
  smooth : "power3.out",
  heavy  : "power4.out",
  light  : "power1.out",
};

const DUR = {
  // Mobile — compositor-only, never sluggish
  mFade    : 0.35,
  mHeading : 0.42,
  mCard    : 0.40,
  // Tablet — balanced middle
  tBase    : 0.55,
  tHeading : 0.62,
  // Desktop — rich, cinematic
  dLabel   : 0.60,
  dText    : 0.85,
  dQuote   : 1.00,
  dCard    : 0.90,
};

export default function AboutSection() {
  /* ── Element refs — zero string-selector fragility ─────────────────────── */
  const sectionRef   = useRef(null);

  // Desktop
  const dLabelRef    = useRef(null);
  const dHeadingRef  = useRef(null);
  const dParaRef     = useRef(null);
  const dGridRef     = useRef(null);
  const dQuoteRef    = useRef(null);
  const dCardsRef    = useRef([]); // array ref for multiple elements

  // Mobile / Tablet (shared layout)
  const mLabelRef    = useRef(null);
  const mHeadingRef  = useRef(null);
  const mParaRef     = useRef(null);
  const mQuoteRef    = useRef(null);
  const mCardsWrap   = useRef(null);
  const mCardsRef    = useRef([]); // array ref for multiple elements

  useGSAP(
    () => {
      const section = sectionRef.current;

      /* ── prefers-reduced-motion — bail early, show everything ────────────── */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* ── matchMedia context ──────────────────────────────────────────────── */
      const mm = gsap.matchMedia();

      /* ═══════════════════════════════════════════════════════════════════════
         DESKTOP ≥ 1100px
         Philosophy: RICH · CINEMATIC · LAYERED
         Pattern: 2 timelines → 2 ScrollTriggers (not 4 separate observers)
           tl1: label + heading + para  →  trigger: section top
           tl2: quote + cards           →  trigger: grid top
      ═══════════════════════════════════════════════════════════════════════ */
      mm.add("(min-width: 1100px)", () => {
        // Set initial state inside mm context so revert() cleans it up
        gsap.set(
          [dLabelRef.current, dHeadingRef.current, dParaRef.current,
           dQuoteRef.current, ...dCardsRef.current],
          { opacity: 0 }
        );

        /* — Timeline 1: text block — 1 ScrollTrigger ─ */
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger        : section,
            start          : "top 78%",
            invalidateOnRefresh: true,
          },
        });

        tl1
          // Label slides in from left — directional leader
          .fromTo(dLabelRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: DUR.dLabel, ease: EASE.snappy }
          )
          // Heading rises — weighted, power3
          .fromTo(dHeadingRef.current,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: DUR.dText, ease: EASE.smooth },
            "-=0.35"   // overlaps label by 350ms — layered feel
          )
          // Para follows heading — tight stagger
          .fromTo(dParaRef.current,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: DUR.dText, ease: EASE.smooth },
            "-=0.68"   // runs mostly in parallel with heading
          );

        /* — Timeline 2: grid — 1 ScrollTrigger ─ */
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger        : dGridRef.current,
            start          : "top 82%",
            invalidateOnRefresh: true,
          },
        });

        tl2
          // Quote: heaviest, slowest, anchors the grid
          .fromTo(dQuoteRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: DUR.dQuote, ease: EASE.heavy }
          )
          // Cards: scale + y — cinematic depth pop, staggered
          .fromTo(dCardsRef.current,
            { opacity: 0, y: 44, scale: 0.97 },
            {
              opacity  : 1,
              y        : 0,
              scale    : 1,
              duration : DUR.dCard,
              stagger  : 0.10,
              ease     : EASE.snappy,
            },
            "-=0.75"   // cards begin while quote is still rising
          );

        return () => { tl1.kill(); tl2.kill(); };
      });

      /* ═══════════════════════════════════════════════════════════════════════
         TABLET  768px – 1099px
         Pattern: 2 timelines → 2 ScrollTriggers (was 5 separate observers)
           tl1: label + heading + para + quote  →  section trigger
           tl2: cards                           →  cards-wrap trigger
      ═══════════════════════════════════════════════════════════════════════ */
      mm.add("(min-width: 768px) and (max-width: 1099px)", () => {
        gsap.set(
          [mLabelRef.current, mHeadingRef.current, mParaRef.current,
           mQuoteRef.current, ...mCardsRef.current],
          { opacity: 0 }
        );

        /* — Timeline 1: text block — */
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger        : section,
            start          : "top 82%",
            invalidateOnRefresh: true,
          },
        });

        tl1
          .fromTo(mLabelRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: DUR.tBase, ease: EASE.snappy }
          )
          .fromTo(mHeadingRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: DUR.tHeading, ease: EASE.snappy },
            "-=0.30"
          )
          .fromTo(mParaRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: DUR.tBase, ease: EASE.snappy },
            "-=0.42"
          )
          .fromTo(mQuoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: DUR.tBase, ease: EASE.snappy },
            "-=0.38"
          );

        /* — Timeline 2: cards — */
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger        : mCardsWrap.current,
            start          : "top 86%",
            invalidateOnRefresh: true,
          },
        });

        tl2.fromTo(mCardsRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: DUR.tHeading, stagger: 0.08, ease: EASE.snappy }
        );

        return () => { tl1.kill(); tl2.kill(); };
      });

      /* ═══════════════════════════════════════════════════════════════════════
         MOBILE < 768px
         Philosophy: SUBTLE · FAST · SMOOTH · LIGHTWEIGHT
         Pattern: 2 timelines → 2 ScrollTriggers
         Hard rules:
           1. opacity-only by default   →  compositor thread, zero layout cost
           2. y only on heading         →  12px max, earns its place
           3. duration ≤ 0.45s          →  never sluggish
           4. stagger 0.06s             →  snappy, not dragged out
           5. timeline positions used   →  not `.delay()` on individual tweens
      ═══════════════════════════════════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        gsap.set(
          [mLabelRef.current, mHeadingRef.current, mParaRef.current,
           mQuoteRef.current, ...mCardsRef.current],
          { opacity: 0 }
        );

        /* — Timeline 1: text block — 1 ScrollTrigger — */
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger        : section,
            start          : "top 88%",
            invalidateOnRefresh: true,
          },
        });

        tl1
          // Pure fade — cheapest possible
          .fromTo(mLabelRef.current,
            { opacity: 0 },
            { opacity: 1, duration: DUR.mFade, ease: EASE.light }
          )
          // Heading: only element that earns y on mobile (12px)
          .fromTo(mHeadingRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: DUR.mHeading, ease: EASE.snappy },
            "-=0.18"
          )
          // Para: pure fade
          .fromTo(mParaRef.current,
            { opacity: 0 },
            { opacity: 1, duration: DUR.mFade, ease: EASE.light },
            "-=0.20"
          )
          // Quote: pure fade
          .fromTo(mQuoteRef.current,
            { opacity: 0 },
            { opacity: 1, duration: DUR.mFade, ease: EASE.light },
            "-=0.18"
          );

        /* — Timeline 2: cards — 1 ScrollTrigger — */
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger        : mCardsWrap.current,
            start          : "top 90%",
            invalidateOnRefresh: true,
          },
        });

        // Cards: pure opacity stagger — zero layout cost
        tl2.fromTo(mCardsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: DUR.mCard, stagger: 0.06, ease: EASE.light }
        );

        return () => { tl1.kill(); tl2.kill(); };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="bg-[#ae1431] py-[100px]"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP ≥ 1100px
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden min-[1100px]:block mx-auto w-[min(1100px,calc(100vw-120px))]">

        <div className="grid grid-cols-[300px_1fr] gap-x-[100px]">
          <div ref={dLabelRef} className="pl-[65px]">
            <span className="text-[18px] tracking-[0.15em] uppercase text-[#f5efe8] font-medium">
              ABOUT US
            </span>
          </div>

          <div className="pl-[300px] max-[1280px]:pl-[160px]">
            <h2
              ref={dHeadingRef}
              className="font-display text-[48px] leading-[1.15] text-[#f5efe8] max-w-[600px]"
            >
              An Institutional
              <br />
              Movement of Purpose
            </h2>

            <p
              ref={dParaRef}
              className="font-rethink mt-[24px] text-[14.5px] leading-[1.75] text-[#f5efe8] max-w-[520px]"
            >
              ERAM Education was established to build disciplined, value-based
              institutions that expand access to quality learning and reach
              communities that need it most. Founded under the CSR vision of the
              Eram Group of Companies, it upholds structured academic standards
              while serving communities with integrity.
            </p>
          </div>
        </div>

      <div ref={dGridRef} className="mt-[80px]">

  {/* ROW 1 */}
  <div className="grid grid-cols-3 gap-[24px]">

    {/* TEXT BLOCK */}
    <div
      ref={dQuoteRef}
      className="flex items-end h-[300px] pb-[115px] pl-[40px] max-[1280px]:pl-[60px]"
    >
      <p className="font-display text-[32px] leading-[1.25] text-[#f5efe8]">
        Committed
        <br />
        to Access.
        <br />
        Dedicated to
        <br />
        Excellence
      </p>
    </div>

    {/* IMAGE 1 */}
    <div
      ref={(el) => { dCardsRef.current[0] = el; }}
      className="group rounded-[20px] h-[300px] overflow-hidden"
    >
      <img
        src="/images/about1.webp"
        alt="Campus"
        className="
          w-full
          h-full
          object-cover
           transition-transform
          duration-700
          group-hover:scale-105
        "
      />
    </div>

    {/* IMAGE 2 */}
    <div
      ref={(el) => { dCardsRef.current[1] = el; }}
      className="group rounded-[20px] h-[300px] overflow-hidden"
    >
      <img
        src="/images/about2.webp"
        alt="Students"
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />
    </div>
  </div>

  {/* ROW 2 */}
  <div className="grid grid-cols-3 gap-[24px] mt-[24px]">

    {/* IMAGE 3 */}
    <div
      ref={(el) => { dCardsRef.current[2] = el; }}
      className="group rounded-[24px] h-[320px] overflow-hidden"
    >
      <img
        src="/images/about3.webp"
        alt="Education"
        className="
          w-full
          h-full
          object-cover
           transition-transform
          duration-700
          group-hover:scale-105
        "
      />
    </div>

    {/* IMAGE 4 */}
    <div
      ref={(el) => { dCardsRef.current[3] = el; }}
      className="group rounded-[24px] h-[320px] overflow-hidden"
    >
      <img
        src="/images/about4.webp"
        alt="Institution"
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />
    </div>

  </div>
</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE + TABLET  < 1100px
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="min-[1100px]:hidden">
        <div className="px-[28px] max-[480px]:px-[20px]">

          <div ref={mLabelRef} className="mb-[36px]">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#f5efe8] font-medium">
              ABOUT US
            </span>
            <div className="mt-[6px] h-[1.5px] w-full bg-[#f5efe8]/40 rounded-full" />
          </div>

          <h2
            ref={mHeadingRef}
            className="
              font-display text-[42px] leading-[1.18] text-[#f5efe8] mb-[28px]
              max-[480px]:text-[34px] max-[360px]:text-[28px]
            "
          >
            An Institutional
            <br />
            Movement of Purpose
          </h2>

          <p
            ref={mParaRef}
            className="text-[14px] leading-[1.85] text-[#f5efe8]/75 max-w-[500px] mb-[44px]"
          >
            ERAM Education was established to build disciplined, value-based
            institutions that expand access to quality learning and reach
            communities that need it most. Founded under the CSR vision of the
            Eram Group of Companies, it upholds structured academic standards
            while serving communities with integrity.
          </p>

          <div
            ref={mQuoteRef}
            className="mb-[52px] border-l-[3px] border-[#f5efe8]/50 pl-[22px]"
          >
            <p className="font-display text-[26px] leading-[1.3] text-[#f5efe8] max-[480px]:text-[22px]">
              Committed
              <br />
              to Access.
              <br />
              Dedicated to
              <br />
              Excellence
            </p>
          </div>
        </div>

        <div
          ref={mCardsWrap}
          className="
            px-[28px] max-[480px]:px-[20px]
            grid grid-cols-2 gap-[14px]
            max-[560px]:grid-cols-1
          "
        >
          <div
            ref={(el) => { mCardsRef.current[0] = el; }}
            className="rounded-[22px] bg-[#d8d8d8] min-h-[200px] max-[560px]:min-h-[180px]"
          />
          <div
            ref={(el) => { mCardsRef.current[1] = el; }}
            className="rounded-[22px] bg-[#d8d8d8] min-h-[240px] max-[560px]:min-h-[180px] mt-0 min-[561px]:mt-[-40px]"
          />
          <div
            ref={(el) => { mCardsRef.current[2] = el; }}
            className="rounded-[22px] bg-[#d8d8d8] min-h-[200px] max-[560px]:min-h-[180px] mt-0 min-[561px]:mt-[40px]"
          />
          <div
            ref={(el) => { mCardsRef.current[3] = el; }}
            className="rounded-[22px] bg-[#d8d8d8] min-h-[200px] max-[560px]:min-h-[180px]"
          />
        </div>
      </div>
    </section>
  );
}