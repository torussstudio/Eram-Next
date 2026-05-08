// import { useRef } from "react";
// import ActionButton from "../../ui/ActionButton";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // "SPORTS ARENA" — split into per-letter spans for stagger animation
// const ARENA_WORDS = ["SPORTS", "ARENA"];

// gsap.registerPlugin(ScrollTrigger);

// // ─── Component ────────────────────────────────────────────────────────────
// export default function ArenaSection() {
//   const sectionRef      = useRef(null);
//   const heroRef         = useRef(null);
//   const gridRef         = useRef(null);
//   const leftColRef      = useRef(null);
//   const eramTextRef     = useRef(null);
//   const arenaOutlineRef = useRef(null);

//   useGSAP(() => {
//     // ── Initial states ──────────────────────────────────────────────────
//     gsap.set(heroRef.current, {
//       scale: 1.18,
//       transformOrigin: "center center",
//       force3D: true,
//       willChange: "transform, opacity",
//     });
//     // visibility:hidden instead of opacity:0 prevents GPU texture flicker
//     gsap.set(gridRef.current, {
//       opacity: 0,
//       visibility: "hidden",
//       force3D: true,
//     });
//     gsap.set(leftColRef.current, {
//       x: -28,
//       opacity: 0,
//       force3D: true,
//       willChange: "transform, opacity",
//     });
//     gsap.set(eramTextRef.current, {
//       opacity: 0,
//       y: 16,
//       force3D: true,
//       willChange: "transform, opacity",
//     });
//     // Per-letter initial state for stagger animation
//     const letters = arenaOutlineRef.current.querySelectorAll(".arena-letter");
//     gsap.set(letters, {
//       opacity: 0,
//       y: 100,
//       scaleY: 1.3,
//       skewX: 6,
//       transformOrigin: "bottom center",
//       force3D: true,
//       willChange: "transform, opacity",
//     });

//     // ── Scroll-pinned timeline ──────────────────────────────────────────
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "+=110%",
//         scrub: 0.8,
//         pin: true,
//         anticipatePin: 1,
//         pinSpacing: true,
//         fastScrollEnd: true,
//         preventOverlaps: true,
//       },
//       defaults: { ease: "power2.out" },
//     });

//     // Phase 1 — hero zooms & fades out (0 → 0.48)
//     tl.to(heroRef.current, { scale: 1, duration: 0.48 }, 0)
//       .to(heroRef.current, {
//         opacity: 0,
//         duration: 0.20,
//         ease: "power1.in",
//         onComplete: () => gsap.set(heroRef.current, { visibility: "hidden" }),
//         onReverseComplete: () => gsap.set(heroRef.current, { visibility: "visible" }),
//       }, 0.28);

//     // Phase 2 — unhide grid instantly, then slide content in (0.40 → 0.66)
//     tl.to(gridRef.current, {
//       opacity: 1,
//       visibility: "visible",
//       duration: 0.06,    // near-instant — eliminates cross-fade flicker
//     }, 0.40)
//       .to(leftColRef.current, {
//         x: 0,
//         opacity: 1,
//         duration: 0.26,
//       }, 0.42);

//     // Phase 3 — eram text (0.60 → 0.76)
//     tl.to(eramTextRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 0.20,
//     }, 0.60);

//     // Phase 4 — letters slam up with stagger (0.66 → 1.0)
//     tl.to(letters, {
//       opacity: 1,
//       y: 0,
//       scaleY: 1,
//       skewX: 0,
//       duration: 0.30,
//       ease: "expo.out",
//       stagger: {
//         each: 0.028,
//         from: "start",
//       },
//     }, 0.66);
//   }, { scope: sectionRef });

//   return (
//     <section
//       ref={sectionRef}
//       id="arena"
//       className="
//         relative flex flex-col items-center justify-end
//         bg-[#F5EFE8] overflow-hidden
//         -mb-px pb-7 pt-7
//         max-[640px]:!pt-[110px]
//       "
//       style={{ height: "100vh", transform: "translateZ(0)" }}
//     >
//       {/* ── Card ── */}
//       <div
//         className="
//           relative mx-auto overflow-hidden
//           w-[calc(100vw-64px)] max-w-[1580px] rounded-[32px]
//           px-[110px] pt-[120px] pb-20
//           max-[900px]:px-7 max-[900px]:pt-20 max-[900px]:pb-14
//           max-[640px]:w-[calc(100vw-28px)] max-[640px]:rounded-[22px]
//           max-[640px]:px-[18px] max-[640px]:pt-14 max-[640px]:pb-9
//         "
//         style={{
//           backgroundImage: "url('/images/sportsarena.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "calc(100vh - 56px)",
//         }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/40 rounded-[32px] max-[640px]:rounded-[22px]" />

//         {/* Outline text — per-letter stagger */}
//         <div
//           ref={arenaOutlineRef}
//           className="
//             pointer-events-none select-none
//             absolute z-20 bottom-[-70px] left-[30px]
//             font-display font-bold leading-[0.88] text-transparent
//             text-[clamp(7.2rem,13.2vw,14rem)] tracking-[-0.045em]
//             [-webkit-text-stroke:1.6px_white]
//             whitespace-nowrap overflow-hidden
//             max-[1000px]:left-[10px] max-[1000px]:bottom-[-30px]
//             max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
//             max-[640px]:left-1/2 max-[640px]:-translate-x-1/2
//             max-[640px]:bottom-[-14px] max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
//             max-[640px]:[-webkit-text-stroke:1.1px_white]
//           "
//           style={{ willChange: "auto" }}
//         >
//           {ARENA_WORDS.map((word, wi) => (
//             <span key={wi} className="inline-block">
//               {word.split("").map((char, ci) => (
//                 <span key={ci} className="arena-letter">{char}</span>
//               ))}
//               {wi < ARENA_WORDS.length - 1 && (
//                 <span className="inline-block" style={{ width: "0.35em" }} aria-hidden="true" />
//               )}
//             </span>
//           ))}
//         </div>

//         {/* Content grid */}
//         <div ref={gridRef} className="relative z-20" style={{ willChange: "opacity" }}>
//           <div ref={leftColRef} className="max-w-[460px]" style={{ willChange: "transform" }}>

//             {/* Hidden — keep ref alive for GSAP */}
//             <span ref={eramTextRef} className="sr-only" aria-hidden="true" />

//             <h2 className="
//               font-display font-bold tracking-[-0.02em] leading-[1.22]
//               text-[34px] text-white mb-5
//               max-[640px]:text-[28px]
//             ">
//               A Destination for
//               <br />
//               Sport &amp; Performance
//             </h2>

//             <p className="
//               font-rethink text-[14.5px] leading-[1.75] text-white/80
//               mb-[34px] max-[640px]:text-[14px] max-[640px]:mb-[26px]
//             ">
//               The ERAM Sports Arena reflects the Trust's long-term commitment to
//               athletics, performance, and community engagement. Designed to host
//               institutional and external events, it marks a new chapter in
//               sports integration.
//             </p>

//             <div className="flex flex-wrap gap-[14px] max-[640px]:gap-[10px]">
//               <ActionButton className="font-rethink" to="/explore-arena">
//                 Explore The Arena
//               </ActionButton>
//               <ActionButton className="font-rethink" variant="secondary">
//                 Discover Our Infrastructure
//               </ActionButton>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useRef } from "react";
import ActionButton from "../../ui/ActionButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARENA_WORDS = ["SPORTS", "ARENA"];

export default function ArenaSection() {
  const sectionRef   = useRef(null);
  const cardRef      = useRef(null);
  const overlayRef   = useRef(null);
  const contentRef   = useRef(null);
  const headingRef   = useRef(null);
  const paraRef      = useRef(null);
  const btnsRef      = useRef(null);
  const outlineRef   = useRef(null);
  const lineTopRef   = useRef(null);
  const lineBottomRef = useRef(null);

  useGSAP(() => {
    /* ── Initial states ───────────────────────────────────────────── */
    gsap.set(cardRef.current,    { scale: 1.08, force3D: true });
    gsap.set(overlayRef.current, { opacity: 0.85 });
    gsap.set(lineTopRef.current,    { scaleX: 0, transformOrigin: "left center" });
    gsap.set(lineBottomRef.current, { scaleX: 0, transformOrigin: "right center" });
    gsap.set(headingRef.current, { opacity: 0, y: 60, skewY: 2 });
    gsap.set(paraRef.current,    { opacity: 0, y: 30 });
    gsap.set(btnsRef.current,    { opacity: 0, y: 20 });

    const letters = outlineRef.current?.querySelectorAll(".a-letter");
    if (letters?.length) {
      gsap.set(letters, {
        opacity: 0,
        y: 120,
        scaleY: 1.4,
        skewX: 8,
        transformOrigin: "bottom center",
        force3D: true,
      });
    }

    /* ── Scroll-pinned timeline ───────────────────────────────────── */
    const tl = gsap.timeline({
     scrollTrigger: {
  trigger: sectionRef.current,
  start: "top 34px", // navbar net height (68-34=34)
  end: "+=130%",
  scrub: 1,
  pin: true,
  anticipatePin: 1,
  pinSpacing: true,
  fastScrollEnd: true,
  preventOverlaps: true,
},
    });

    /* Phase 1 — card zooms to natural size (0 → 0.30) */
    tl.to(cardRef.current, {
      scale: 1,
      duration: 0.30,
      ease: "expo.out",
    }, 0);

    /* Phase 2 — overlay lifts, horizontal lines slice in (0.18 → 0.42) */
    tl.to(overlayRef.current, {
      opacity: 0.45,
      duration: 0.24,
      ease: "power2.out",
    }, 0.18)
    .to([lineTopRef.current, lineBottomRef.current], {
      scaleX: 1,
      duration: 0.22,
      ease: "expo.out",
      stagger: 0.06,
    }, 0.22);

    /* Phase 3 — heading slams in (0.36 → 0.56) */
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      skewY: 0,
      duration: 0.22,
      ease: "expo.out",
    }, 0.36);

    /* Phase 4 — para + buttons fade up (0.48 → 0.66) */
    tl.to(paraRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.18,
      ease: "power3.out",
    }, 0.48)
    .to(btnsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.16,
      ease: "power2.out",
    }, 0.56);

    /* Phase 5 — giant outline letters rise with stagger (0.58 → 1.0) */
    if (letters?.length) {
      tl.to(letters, {
        opacity: 1,
        y: 0,
        scaleY: 1,
        skewX: 0,
        duration: 0.32,
        ease: "expo.out",
        stagger: { each: 0.022, from: "start" },
      }, 0.58);
    }

    /* subtle parallax on the bg image throughout */
    tl.to(cardRef.current, {
      backgroundPositionY: "60%",
      duration: 1,
      ease: "none",
    }, 0);

  }, { scope: sectionRef });

  return (
  <section
  ref={sectionRef}
  id="arena"
  className="
    relative flex items-center justify-center
    bg-[#F5EFE8] overflow-hidden
    p-7
    max-[920px]:p-[14px]
  "
  style={{
    height: "100vh",
    transform: "translateZ(0)",
  }}
>

  <div
    ref={cardRef}
    className="
      relative mx-auto overflow-hidden
      w-full max-w-[1580px] rounded-[32px]
      max-[640px]:rounded-[22px]
    "
    style={{
      backgroundImage: "url('/images/sportsarena.png')",
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
      height: "calc(100vh - 56px)",
      willChange: "transform",
    }}
  >
        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black rounded-[32px] max-[640px]:rounded-[22px]"
        />

        {/* Horizontal slice lines */}
        <div
          ref={lineTopRef}
          className="absolute z-10 left-0 right-0 h-[1px] bg-white/20"
          style={{ top: "28%" }}
        />
        <div
          ref={lineBottomRef}
          className="absolute z-10 left-0 right-0 h-[1px] bg-white/20"
          style={{ top: "72%" }}
        />

        {/* Giant outline text */}
        <div
          ref={outlineRef}
          className="
            pointer-events-none select-none
            absolute z-20 bottom-[-70px] left-[30px]
            font-display font-bold leading-[0.88] text-transparent
            text-[clamp(7.2rem,13.2vw,14rem)] tracking-[-0.045em]
            [-webkit-text-stroke:1.6px_white]
            whitespace-nowrap overflow-hidden
            max-[1000px]:left-[10px] max-[1000px]:bottom-[-30px]
            max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
            max-[640px]:left-1/2 max-[640px]:-translate-x-1/2
            max-[640px]:bottom-[-14px] max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
            max-[640px]:[-webkit-text-stroke:1.1px_white]
          "
          style={{ willChange: "auto" }}
        >
          {ARENA_WORDS.map((word, wi) => (
            <span key={wi} className="inline-block">
              {word.split("").map((char, ci) => (
                <span key={ci} className="a-letter inline-block">{char}</span>
              ))}
              {wi < ARENA_WORDS.length - 1 && (
                <span className="inline-block" style={{ width: "0.35em" }} aria-hidden="true" />
              )}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="
            relative z-30
            px-[110px] pt-[120px] pb-20
            max-[900px]:px-7 max-[900px]:pt-20 max-[900px]:pb-14
            max-[640px]:px-[18px] max-[640px]:pt-14 max-[640px]:pb-9
          "
        >
          <div className="max-w-[460px]">

            <h2
              ref={headingRef}
              className="
                font-display font-bold tracking-[-0.02em] leading-[1.22]
                text-[34px] text-white mb-5
                max-[640px]:text-[28px]
              "
            >
              A Destination for
              <br />
              Sport &amp; Performance
            </h2>

            <p
              ref={paraRef}
              className="
                font-rethink text-[14.5px] leading-[1.75] text-white/80
                mb-[34px] max-[640px]:text-[14px] max-[640px]:mb-[26px]
              "
            >
              The ERAM Sports Arena reflects the Trust's long-term commitment to
              athletics, performance, and community engagement. Designed to host
              institutional and external events, it marks a new chapter in
              sports integration.
            </p>

            <div
              ref={btnsRef}
              className="flex flex-wrap gap-[14px] max-[640px]:gap-[10px]"
            >
              <ActionButton className="font-rethink" to="/explore-arena">
                Explore The Arena
              </ActionButton>
              <ActionButton className="font-rethink" variant="secondary">
                Discover Our Infrastructure
              </ActionButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}