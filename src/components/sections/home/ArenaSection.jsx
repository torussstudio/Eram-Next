// import { useRef } from "react";
// import ActionButton from "../../ui/ActionButton";
// import { section, sectionBand, shell } from "../../../constants/homeStyles";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useNavigate } from "react-router-dom";

// gsap.registerPlugin(ScrollTrigger);

// export default function ArenaSection() {
//   const sectionRef = useRef(null);
//   const heroRef = useRef(null);
//   const heroVideoRef = useRef(null);
//   const gridRef = useRef(null);
//   const leftColRef = useRef(null);
//   const rightPanelRef = useRef(null);
//   const eramTextRef = useRef(null);
//   const arenaOutlineRef = useRef(null);


//   const navigate = useNavigate()

//   useGSAP(
//     () => {
//       /* ── initial states ── */
//       gsap.set(heroRef.current, {
//         scale: 1.22,
//         transformOrigin: "center center",
//         force3D: true,
//       });

//       gsap.set(gridRef.current, { opacity: 0, force3D: true });
//       gsap.set(leftColRef.current, { x: -36, force3D: true });
//       gsap.set(rightPanelRef.current, { x: 36, force3D: true });
//       gsap.set(eramTextRef.current, { opacity: 0, y: 20, force3D: true });

//       // SPORTS ARENA — cinematic initial state
//       gsap.set(arenaOutlineRef.current, {
//         opacity: 0,
//         y: 110,
//         letterSpacing: "0.32em",
//         skewX: 6,
//         force3D: true,
//       });

//       /* ── pinned scrub timeline ── */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=100%",
//           scrub: 0.5,
//           pin: true,
//           anticipatePin: 1,
//           pinSpacing: true,
//         },
//         defaults: { ease: "none" },
//       });

//       // 0.00 – 0.55 : hero video zooms out
//       tl.to(heroRef.current, { scale: 1, duration: 0.55 }, 0);

//       // 0.30 – 0.65 : hero fades out
//       tl.to(heroRef.current, { opacity: 0, duration: 0.35 }, 0.3);

//       // 0.35 – 0.70 : grid fades + slides in
//       tl.to(gridRef.current, { opacity: 1, duration: 0.35 }, 0.35);
//       tl.to(leftColRef.current, { x: 0, duration: 0.35 }, 0.35);
//       tl.to(rightPanelRef.current, { x: 0, duration: 0.35 }, 0.35);

//       // 0.60 – 0.78 : "THE ERAM" fades in
//       tl.to(eramTextRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.6);

//       // 0.68 – 1.00 : "SPORTS ARENA" — cinematic luxury entrance
//       tl.to(
//         arenaOutlineRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           letterSpacing: "-0.045em",
//           skewX: 0,
//           duration: 0.32,
//           ease: "power3.out",
//         },
//         0.68,
//       );
//     },
//     { scope: sectionRef },
//   );

//   return (
//     <section
//   ref={sectionRef}
//   id="arena"
//   className={`${section} ${sectionBand} bg-[#F5EFE8] -mb-[1px] max-[640px]:!pt-[110px]`}
//   style={{ transform: "translateZ(0)", height: "100vh" }}
// >
//      {/* WHITE CARD */}
// <div
//   className={`
//     ${shell}
//     !max-w-[1580px]
//     !w-[calc(100vw-64px)]
//     max-[640px]:!w-[calc(100vw-24px)]
//     bg-white
//     rounded-[32px]
//     max-[640px]:rounded-[22px]
//     px-[110px]
//     pt-[120px]
//     pb-[80px]
//     max-[900px]:px-[28px]
//     max-[900px]:pt-[80px]
//     max-[900px]:pb-[56px]
//     max-[640px]:px-[18px]
//     max-[640px]:pt-[56px]
//     max-[640px]:pb-[36px]
//     max-[640px]:h-[calc(100vh-152px)]
//     max-[640px]:flex
//     max-[640px]:flex-col
//     relative
//     overflow-hidden
//   `}
// >
//   {/* HERO VIDEO */}
//   {/* <div
//     ref={heroRef}
//     className="absolute inset-0 z-[10] overflow-hidden rounded-[32px] max-[640px]:rounded-[22px]"
//     style={{ willChange: "opacity" }}
//   >
//     <video
//   ref={heroVideoRef}
//   autoPlay
//   muted
//   loop
//   playsInline
//   preload="auto"
//   poster="/videos/arena-thumb.jpg"
//   className="absolute inset-0 w-full h-full object-cover object-center"
// >
//   <source src="/videos/Arena.mp4" type="video/mp4" />
// </video>
//     <div className="absolute inset-0 bg-black/35" />
//   </div> */}

//   {/* SPORTS ARENA */}
//   <div
//     ref={arenaOutlineRef}
//     className="
//       absolute z-[20]
//       left-[30px]
//       bottom-[-55px]
//       font-display
//       text-[clamp(7.2rem,13.2vw,14rem)]
//       font-[700]
//       tracking-[-0.045em]
//       leading-[0.88]
//       text-transparent
//       [-webkit-text-stroke:1.6px_black]
//       pointer-events-none
//       select-none
//       whitespace-nowrap
//       max-[1000px]:left-[10px]
//       max-[1000px]:bottom-[-30px]
//       max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
//       max-[640px]:left-1/2
//       max-[640px]:-translate-x-1/2
//       max-[640px]:bottom-[-14px]
//       max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
//       max-[640px]:[-webkit-text-stroke:1.1px_black]
//     "
//     style={{ willChange: "transform, opacity, letter-spacing" }}
//   >
//     SPORTS ARENA
//   </div>

//   {/* GRID */}
//   <div
//     ref={gridRef}
//     className="
//       relative z-[20]
//       grid
//       gap-[40px]
//       [grid-template-columns:minmax(0,0.85fr)_minmax(0,1.15fr)]
//       max-[1000px]:grid-cols-1
//       max-[640px]:gap-[28px]
//       max-[640px]:flex-1
//       max-[640px]:flex
//       max-[640px]:flex-col
//     "
//     style={{ willChange: "opacity" }}
//   >
//     {/* LEFT */}
//     <div
//       ref={leftColRef}
//       className="max-w-[460px]"
//       style={{ willChange: "transform" }}
//     >
//       <h2
//         className="
//           font-display
//           text-[34px]
//           leading-[1.22]
//           font-[700]
//           tracking-[-0.02em]
//           text-[#111]
//           mb-[20px]
//           max-[640px]:text-[28px]
//         "
//       >
//         A Destination for
//         <br />
//         Sport & Performance
//       </h2>

//       <p
//         className="
//           text-[14.5px]
//           leading-[1.75]
//           text-[#222]
//           mb-[34px]
//           max-[640px]:text-[14px]
//           max-[640px]:mb-[26px]
//           font-rethink
//         "
//       >
//         The ERAM Sports Arena reflects the Trust's long-term commitment to
//         athletics, performance, and community engagement. Designed to host
//         institutional and external events, it marks a new chapter in
//         sports integration.
//       </p>

//       <div className="flex  gap-[14px] flex-wrap max-[640px]:gap-[10px]">
//        <ActionButton className="font-rethink" to="/explore-arena">
//   Explore The Arena
// </ActionButton>
// <br></br>
//         <ActionButton className="font-rethink cursor-pointer" variant="secondary">
//           Discover Our Infrastructure
//         </ActionButton>
//       </div>
//     </div>

//     {/* RIGHT */}
//     <div
//       ref={rightPanelRef}
//       className="
//         relative
//         min-h-[520px]
//         max-[1000px]:min-h-[300px]
//         max-[640px]:flex-1
//         max-[640px]:min-h-0
//         overflow-hidden
//         rounded-[24px]
//       "
//       style={{ willChange: "transform" }}
//     >
//       <div className="absolute inset-0">
//   <img
//     src="/images/thumbnail.png"
//     className="w-full h-full object-cover"
//     alt="Arena"
//   />
// </div>
//       <div className="absolute inset-0 bg-black/25" />

//       {/* THE ERAM */}
//       <div
//         ref={eramTextRef}
//         className="
//         font-rethink
//           absolute
//           right-[20px]
//           bottom-[10px]
//           font-display
//           text-[clamp(3.4rem,4.6vw,5.4rem)]
//           font-[900]
//           tracking-[-0.045em]
//           text-white
//           max-[640px]:left-1/2
//           max-[640px]:-translate-x-1/2
//           max-[640px]:right-auto
//           max-[640px]:bottom-0
//           max-[640px]:text-[clamp(2.1rem,11vw,2.6rem)]
//           max-[640px]:text-center
//           max-[640px]:whitespace-nowrap
//         "
//         style={{ willChange: "transform, opacity" }}
//       >
//         THE ERAM
//       </div>
//     </div>
//   </div>
// </div>     {/* end white card */}
//     </section>
//   );
// }

// import { useRef } from "react";
// import ActionButton from "../../ui/ActionButton";
// import { section, sectionBand, shell } from "../../../constants/homeStyles";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useNavigate } from "react-router-dom";

// gsap.registerPlugin(ScrollTrigger);

// export default function ArenaSection() {
//   const sectionRef = useRef(null);
//   const heroRef = useRef(null);
//   const gridRef = useRef(null);
//   const leftColRef = useRef(null);
//   const eramTextRef = useRef(null);
//   const arenaOutlineRef = useRef(null);

//   const navigate = useNavigate();

//   useGSAP(
//     () => {
//       gsap.set(heroRef.current, {
//         scale: 1.22,
//         transformOrigin: "center center",
//         force3D: true,
//       });

//       gsap.set(gridRef.current, { opacity: 0, force3D: true });
//       gsap.set(leftColRef.current, { x: -36, force3D: true });
//       gsap.set(eramTextRef.current, { opacity: 0, y: 20, force3D: true });

//       gsap.set(arenaOutlineRef.current, {
//         opacity: 0,
//         y: 300,
//         letterSpacing: "0.32em",
//         skewX: 6,
//         force3D: true,
//       });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=100%",
//           scrub: 0.5,
//           pin: true,
//           anticipatePin: 1,
//           pinSpacing: true,
//         },
//         defaults: { ease: "none" },
//       });

//       tl.to(heroRef.current, { scale: 1, duration: 0.55 }, 0);
//       tl.to(heroRef.current, { opacity: 0, duration: 0.35 }, 0.3);
//       tl.to(gridRef.current, { opacity: 1, duration: 0.35 }, 0.35);
//       tl.to(leftColRef.current, { x: 0, duration: 0.35 }, 0.35);
//       tl.to(eramTextRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.6);
//       tl.to(
//         arenaOutlineRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           letterSpacing: "-0.045em",
//           skewX: 0,
//           duration: 0.32,
//           ease: "power3.out",
//         },
//         0.68,
//       );
//     },
//     { scope: sectionRef },
//   );

//   return (
// <section
//   ref={sectionRef}
//   id="arena"
//   className="bg-[#F5EFE8] -mb-[1px] max-[640px]:!pt-[110px] flex flex-col items-center justify-end pb-[28px] pt-[28px] relative overflow-hidden"
//   style={{ transform: "translateZ(0)", height: "100vh" }}
// >
//       {/* WHITE CARD — now with BG image */}
//    <div
//   className="
//     mx-auto
//     w-[calc(100vw-64px)]
//     max-w-[1580px]
//     max-[640px]:w-[calc(100vw-28px)]
//     rounded-[32px]
//     max-[640px]:rounded-[22px]
//     px-[110px]
//     pt-[120px]
//     pb-[80px]
//     max-[900px]:px-[28px]
//     max-[900px]:pt-[80px]
//     max-[900px]:pb-[56px]
//     max-[640px]:px-[18px]
//     max-[640px]:pt-[56px]
//     max-[640px]:pb-[36px]
//     relative
//     overflow-hidden
//   "
//   style={{
//     backgroundImage: "url('/images/thumbnail.png')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     height: "calc(100vh - 56px)",
//   }}
// >
//         {/* Dark overlay — transparent ആക്കണമെങ്കിൽ opacity കുറക്കാം */}
//         <div className="absolute inset-0 bg-black/40 rounded-[32px] max-[640px]:rounded-[22px]" />

//         {/* SPORTS ARENA outline text */}
//         <div
//           ref={arenaOutlineRef}
//           className="
//             absolute z-[20]
//             left-[30px]
//             bottom-[-70px]
//             font-display
//             text-[clamp(7.2rem,13.2vw,14rem)]
//             font-[700]
//             tracking-[-0.045em]
//             leading-[0.88]
//             text-transparent
//             [-webkit-text-stroke:1.6px_white]
//             pointer-events-none
//             select-none
//              whitespace-nowrap
//             max-[1000px]:left-[10px]
//             max-[1000px]:bottom-[-30px]
//             max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
//             max-[640px]:left-1/2
//             max-[640px]:-translate-x-1/2
//             max-[640px]:bottom-[-14px]
//             max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
//             max-[640px]:[-webkit-text-stroke:1.1px_white]
//           "
//           style={{ willChange: "transform, opacity, letter-spacing" }}
//         >
//           SPORTS ARENA
//         </div>

       
//        {/* GRID — single column now */}
// <div
//   ref={gridRef}
//   className="relative z-[20]"
//   style={{ willChange: "opacity" }}
// >
//           {/* LEFT / CONTENT */}
//           <div
//             ref={leftColRef}
//             className="max-w-[460px]"
//             style={{ willChange: "transform" }}
//           >
//             <h2
//               className="
//                 font-display
//                 text-[34px]
//                 leading-[1.22]
//                 font-[700]
//                 tracking-[-0.02em]
//                 text-white
//                 mb-[20px]
//                 max-[640px]:text-[28px]
//               "
//             >
//               A Destination for
//               <br />
//               Sport & Performance
//             </h2>

//             <p
//               className="
//                 text-[14.5px]
//                 leading-[1.75]
//                 text-white/80
//                 mb-[34px]
//                 max-[640px]:text-[14px]
//                 max-[640px]:mb-[26px]
//                 font-rethink
//               "
//             >
//               The ERAM Sports Arena reflects the Trust's long-term commitment to
//               athletics, performance, and community engagement. Designed to host
//               institutional and external events, it marks a new chapter in
//               sports integration.
//             </p>

//             <div className="flex gap-[14px] flex-wrap max-[640px]:gap-[10px]">
//               <ActionButton className="font-rethink" to="/explore-arena">
//                 Explore The Arena
//               </ActionButton>
//               <ActionButton className="font-rethink cursor-pointer" variant="secondary">
//                 Discover Our Infrastructure
//               </ActionButton>
//             </div>
//           </div>
//         </div>

//       </div> {/* end card */}
//     </section>
//   );
// }

// import { useRef } from "react";
// import ActionButton from "../../ui/ActionButton";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

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
//     gsap.set(arenaOutlineRef.current, {
//       opacity: 0,
//       y: 220,
//       letterSpacing: "0.28em",
//       skewX: 4,
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

//     // Phase 4 — outline rises & tightens (0.66 → 1.0)
//     tl.to(arenaOutlineRef.current, {
//       opacity: 1,
//       y: 0,
//       letterSpacing: "-0.045em",
//       skewX: 0,
//       duration: 0.34,
//       ease: "expo.out",
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

//         {/* Outline text */}
//         <div
//           ref={arenaOutlineRef}
//           className="
//             pointer-events-none select-none
//             absolute z-20 bottom-[-70px] left-[30px]
//             font-display font-bold leading-[0.88] text-transparent
//             text-[clamp(7.2rem,13.2vw,14rem)] tracking-[-0.045em]
//             [-webkit-text-stroke:1.6px_white]
//             whitespace-nowrap
//             max-[1000px]:left-[10px] max-[1000px]:bottom-[-30px]
//             max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
//             max-[640px]:left-1/2 max-[640px]:-translate-x-1/2
//             max-[640px]:bottom-[-14px] max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
//             max-[640px]:[-webkit-text-stroke:1.1px_white]
//           "
//           style={{ willChange: "transform, opacity, letter-spacing" }}
//         >
//           SPORTS ARENA
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

// "SPORTS ARENA" — split into per-letter spans for stagger animation
const ARENA_WORDS = ["SPORTS", "ARENA"];

gsap.registerPlugin(ScrollTrigger);

// ─── Component ────────────────────────────────────────────────────────────
export default function ArenaSection() {
  const sectionRef      = useRef(null);
  const heroRef         = useRef(null);
  const gridRef         = useRef(null);
  const leftColRef      = useRef(null);
  const eramTextRef     = useRef(null);
  const arenaOutlineRef = useRef(null);

  useGSAP(() => {
    // ── Initial states ──────────────────────────────────────────────────
    gsap.set(heroRef.current, {
      scale: 1.18,
      transformOrigin: "center center",
      force3D: true,
      willChange: "transform, opacity",
    });
    // visibility:hidden instead of opacity:0 prevents GPU texture flicker
    gsap.set(gridRef.current, {
      opacity: 0,
      visibility: "hidden",
      force3D: true,
    });
    gsap.set(leftColRef.current, {
      x: -28,
      opacity: 0,
      force3D: true,
      willChange: "transform, opacity",
    });
    gsap.set(eramTextRef.current, {
      opacity: 0,
      y: 16,
      force3D: true,
      willChange: "transform, opacity",
    });
    // Per-letter initial state for stagger animation
    const letters = arenaOutlineRef.current.querySelectorAll(".arena-letter");
    gsap.set(letters, {
      opacity: 0,
      y: 100,
      scaleY: 1.3,
      skewX: 6,
      transformOrigin: "bottom center",
      force3D: true,
      willChange: "transform, opacity",
    });

    // ── Scroll-pinned timeline ──────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=110%",
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        fastScrollEnd: true,
        preventOverlaps: true,
      },
      defaults: { ease: "power2.out" },
    });

    // Phase 1 — hero zooms & fades out (0 → 0.48)
    tl.to(heroRef.current, { scale: 1, duration: 0.48 }, 0)
      .to(heroRef.current, {
        opacity: 0,
        duration: 0.20,
        ease: "power1.in",
        onComplete: () => gsap.set(heroRef.current, { visibility: "hidden" }),
        onReverseComplete: () => gsap.set(heroRef.current, { visibility: "visible" }),
      }, 0.28);

    // Phase 2 — unhide grid instantly, then slide content in (0.40 → 0.66)
    tl.to(gridRef.current, {
      opacity: 1,
      visibility: "visible",
      duration: 0.06,    // near-instant — eliminates cross-fade flicker
    }, 0.40)
      .to(leftColRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.26,
      }, 0.42);

    // Phase 3 — eram text (0.60 → 0.76)
    tl.to(eramTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.20,
    }, 0.60);

    // Phase 4 — letters slam up with stagger (0.66 → 1.0)
    tl.to(letters, {
      opacity: 1,
      y: 0,
      scaleY: 1,
      skewX: 0,
      duration: 0.30,
      ease: "expo.out",
      stagger: {
        each: 0.028,
        from: "start",
      },
    }, 0.66);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="arena"
      className="
        relative flex flex-col items-center justify-end
        bg-[#F5EFE8] overflow-hidden
        -mb-px pb-7 pt-7
        max-[640px]:!pt-[110px]
      "
      style={{ height: "100vh", transform: "translateZ(0)" }}
    >
      {/* ── Card ── */}
      <div
        className="
          relative mx-auto overflow-hidden
          w-[calc(100vw-64px)] max-w-[1580px] rounded-[32px]
          px-[110px] pt-[120px] pb-20
          max-[900px]:px-7 max-[900px]:pt-20 max-[900px]:pb-14
          max-[640px]:w-[calc(100vw-28px)] max-[640px]:rounded-[22px]
          max-[640px]:px-[18px] max-[640px]:pt-14 max-[640px]:pb-9
        "
        style={{
          backgroundImage: "url('/images/sportsarena.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "calc(100vh - 56px)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-[32px] max-[640px]:rounded-[22px]" />

        {/* Outline text — per-letter stagger */}
        <div
          ref={arenaOutlineRef}
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
                <span key={ci} className="arena-letter">{char}</span>
              ))}
              {wi < ARENA_WORDS.length - 1 && (
                <span className="inline-block" style={{ width: "0.35em" }} aria-hidden="true" />
              )}
            </span>
          ))}
        </div>

        {/* Content grid */}
        <div ref={gridRef} className="relative z-20" style={{ willChange: "opacity" }}>
          <div ref={leftColRef} className="max-w-[460px]" style={{ willChange: "transform" }}>

            {/* Hidden — keep ref alive for GSAP */}
            <span ref={eramTextRef} className="sr-only" aria-hidden="true" />

            <h2 className="
              font-display font-bold tracking-[-0.02em] leading-[1.22]
              text-[34px] text-white mb-5
              max-[640px]:text-[28px]
            ">
              A Destination for
              <br />
              Sport &amp; Performance
            </h2>

            <p className="
              font-rethink text-[14.5px] leading-[1.75] text-white/80
              mb-[34px] max-[640px]:text-[14px] max-[640px]:mb-[26px]
            ">
              The ERAM Sports Arena reflects the Trust's long-term commitment to
              athletics, performance, and community engagement. Designed to host
              institutional and external events, it marks a new chapter in
              sports integration.
            </p>

            <div className="flex flex-wrap gap-[14px] max-[640px]:gap-[10px]">
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