// import { memo, useRef } from "react";
// import OptimizedImage from "../../ui/OptimizedImage";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ITEMS = [
//   {
//     number: "01",
//     title: "Teacher\ndevelopment\nprograms",
//   },
//   {
//     number: "02",
//     title: "CBSE & State\nBoard training\nworkshops",
//   },
//   {
//     number: "03",
//     title: "WHO-certified\nteacher training\ninitiatives",
//   },
//   {
//     number: "04",
//     title: "Observation\nbased evaluation\nsystems",
//   },
//   {
//     number: "05",
//     title: "SQAAF and\nquality assessment\nframeworks",
//   },
//   {
//     number: "06",
//     title: "Institutional\nimprovement\ncommittees",
//   },
//   {
//     number: "07",
//     title: "Curriculum\nalignment\nreviews",
//   },
// ];

// function SystemsThatSustainExcellence() {
//   const containerRef = useRef(null);

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();

//       // ── SHARED: heading reveal (both breakpoints) ──────────────────────
//       mm.add("all", () => {
//         // Eyebrow line draws in
//         gsap.fromTo(
//           ".systems-eyebrow-line",
//           { scaleX: 0, transformOrigin: "left center" },
//           {
//             scaleX: 1,
//             duration: 0.8,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top 78%",
//             },
//           },
//         );

//         // Heading words stagger with clip-path curtain
//         gsap.fromTo(
//           ".systems-heading-word",
//           { y: "105%", opacity: 0 },
//           {
//             y: "0%",
//             opacity: 1,
//             duration: 0.85,
//             stagger: 0.07,
//             ease: "power4.out",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top 78%",
//             },
//           },
//         );

//         // Subtext fade up
//         gsap.fromTo(
//           ".systems-subtext",
//           { y: 28, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.9,
//             ease: "power3.out",
//             delay: 0.3,
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top 78%",
//             },
//           },
//         );
//       });

//       // ── DESKTOP (md+) ──────────────────────────────────────────────────
//       mm.add("(min-width: 768px)", () => {
//         // Grid items — stagger reveal from bottom with slight rotation
//         gsap.fromTo(
//           ".system-item",
//           { y: 50, opacity: 0, rotateX: 8, transformPerspective: 800 },
//           {
//             y: 0,
//             opacity: 1,
//             rotateX: 0,
//             duration: 0.9,
//             stagger: {
//               amount: 0.7,
//               from: "start",
//             },
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".system-grid",
//               start: "top 80%",
//             },
//           },
//         );

//         // Number counter lines — draw down
//         gsap.fromTo(
//           ".system-item-line",
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1,
//             duration: 0.6,
//             stagger: 0.1,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: ".system-grid",
//               start: "top 80%",
//             },
//           },
//         );

//         // Image block — scale reveal
//         gsap.fromTo(
//           ".system-img-wrap",
//           { scale: 0.93, opacity: 0, borderRadius: "40px" },
//           {
//             scale: 1,
//             opacity: 1,
//             borderRadius: "26px",
//             duration: 1.3,
//             ease: "expo.out",
//             scrollTrigger: {
//               trigger: ".system-img-wrap",
//               start: "top 85%",
//             },
//           },
//         );

//         // Image parallax scrub
//         gsap.to(".system-img", {
//           yPercent: 10,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ".system-img-wrap",
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 1,
//             fastScrollEnd: true,
//           },
//         });

//         // Overlay text reveal
//         gsap.fromTo(
//           ".system-desc",
//           { y: 30, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".system-img-wrap",
//               start: "top 58%",
//             },
//           },
//         );

//         // Caption tag on image
//         gsap.fromTo(
//           ".system-img-tag",
//           { x: 20, opacity: 0 },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".system-img-wrap",
//               start: "top 55%",
//             },
//           },
//         );
//       });

//       // ── MOBILE (<768px) — different, richer animations ─────────────────
//       mm.add("(max-width: 767px)", () => {
//         // Items — each slides in from left with a stagger
//         gsap.fromTo(
//           ".system-item",
//           { x: -40, opacity: 0 },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 0.75,
//             stagger: 0.08,
//             ease: "expo.out",
//             scrollTrigger: {
//               trigger: ".system-grid",
//               start: "top 85%",
//             },
//           },
//         );

//         // Vertical lines on items — draw down
//         gsap.fromTo(
//           ".system-item-line",
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1,
//             duration: 0.5,
//             stagger: 0.08,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: ".system-grid",
//               start: "top 85%",
//             },
//           },
//         );

//         // Image — clip-path wipe from bottom
//         gsap.fromTo(
//           ".system-img-wrap",
//           { clipPath: "inset(100% 0% 0% 0% round 26px)", opacity: 1 },
//           {
//             clipPath: "inset(0% 0% 0% 0% round 26px)",
//             duration: 1.1,
//             ease: "expo.out",
//             scrollTrigger: {
//               trigger: ".system-img-wrap",
//               start: "top 88%",
//             },
//           },
//         );

//         // Lighter parallax on mobile
//         gsap.to(".system-img", {
//           yPercent: 6,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ".system-img-wrap",
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 2,
//           },
//         });

//         // Overlay text — blur in
//         gsap.fromTo(
//           ".system-desc",
//           { filter: "blur(6px)", opacity: 0, y: 16 },
//           {
//             filter: "blur(0px)",
//             opacity: 1,
//             y: 0,
//             duration: 0.9,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".system-img-wrap",
//               start: "top 62%",
//             },
//           },
//         );

//         // Tag
//         gsap.fromTo(
//           ".system-img-tag",
//           { y: 12, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.7,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".system-img-wrap",
//               start: "top 60%",
//             },
//           },
//         );
//       });

//       return () => mm.revert();
//     },
//     { scope: containerRef },
//   );

//   return (
//     <section
//       ref={containerRef}
//       className="bg-[#F5EFE8] overflow-hidden
//         py-20 px-5
//         md:py-28 md:px-6"
//     >
//       <div className="w-full md:max-w-[1200px] md:mx-auto">
//         {/* ══════════════════════════════
//             HEADING BLOCK
//         ══════════════════════════════ */}
//         <div className="text-center max-w-[720px] mx-auto">
//           {/* Eyebrow — animated underline */}
//           <div className="flex items-center justify-center gap-3 mb-5">
//             <div
//               className="systems-eyebrow-line h-px bg-black/30 w-10"
//               style={{ transformOrigin: "left center" }}
//             />
//             <span className="text-[11px] uppercase tracking-[0.2em] text-black/50 font-medium">
//               Academic Systems
//             </span>
//             <div
//               className="systems-eyebrow-line h-px bg-black/30 w-10"
//               style={{ transformOrigin: "right center" }}
//             />
//           </div>

//           {/* Heading — words split for per-word animation */}
//           <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-black overflow-hidden">
//             {/* Each word wrapped for GSAP target */}
//             {["Systems", "That", "Sustain", "Excellence"].map((word, i) => (
//               <span
//                 key={i}
//                 className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
//               >
//                 <span className="systems-heading-word inline-block">
//                   {word}
//                 </span>
//               </span>
//             ))}
//           </h2>

//           <p className="systems-subtext mt-4 text-[14px] md:text-[15px] text-black/65 leading-relaxed max-w-[560px] mx-auto">
//             Sustained academic performance requires consistent faculty
//             development and institutional review mechanisms. ERAM integrates
//             comprehensive academic systems, including:
//           </p>
//         </div>

//         {/* ══════════════════════════════
//             FEATURES GRID
//             Mobile : 2 col
//             Desktop: 4 col
//         ══════════════════════════════ */}
//         <div
//           className="
//             system-grid
//             mt-14 md:mt-20
//             grid
//             grid-cols-2 md:grid-cols-4
//             gap-y-10 md:gap-y-14
//             gap-x-6 md:gap-x-10
//           "
//         >
//           {ITEMS.map((item, index) => (
//             <div
//               key={index}
//               className="system-item relative pl-4 md:pl-6 min-h-[130px] md:min-h-[170px]"
//             >
//               {/* Left border line — animated separately */}
//               <div className="system-item-line absolute left-0 top-0 bottom-0 w-px bg-black/25" />

//               {/* Number */}
//               <p className="text-[12px] md:text-[15px] text-black/40 font-mono mb-3 md:mb-5 tracking-wider">
//                 /{item.number}
//               </p>

//               {/* Title */}
//               <p className="text-[14px] md:text-[18px] font-medium leading-[1.4] text-black/85 whitespace-pre-line">
//                 {item.title}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* ══════════════════════════════
//             IMAGE BLOCK
//         ══════════════════════════════ */}
//         <div className="mt-14 md:mt-20">
//           <div
//             className="
//               system-img-wrap
//               relative rounded-[26px] overflow-hidden transform-gpu
//               h-[260px] sm:h-[320px] md:h-[480px]
//             "
//           >
//             {/* Parallax image */}
//             <div className="system-img w-full h-[120%] absolute -top-[10%]">
//               <OptimizedImage
//                 src="/images/campus.webp"
//                 alt="campus"
//                 className="w-full h-full object-cover block"
//                 sizes="100vw"
//                 disableTransition
//               />
//             </div>

//             {/* Dark overlay */}
//             <div className="absolute inset-0 bg-black/40" />

//             {/* Subtle grain texture overlay */}
//             <div
//               className="absolute inset-0 opacity-[0.04] pointer-events-none"
//               style={{
//                 backgroundImage:
//                   "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//                 backgroundSize: "180px 180px",
//               }}
//             />

//             {/* Overlay description */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">
//               <p
//                 className="
//                   system-desc
//                   text-center text-white
//                   text-[15px] sm:text-[17px] md:text-[22px]
//                   leading-relaxed
//                   max-w-[680px]
//                   font-light
//                 "
//               >
//                 These systems ensure that faculty remain professionally
//                 equipped, students receive guided mentorship, and institutional
//                 standards are maintained across all campuses.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default memo(SystemsThatSustainExcellence);




// claude design


// import { memo, useRef } from "react";
// import OptimizedImage from "../../ui/OptimizedImage";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ITEMS = [
//   { number: "01", title: "Teacher\ndevelopment\nprograms" },
//   { number: "02", title: "CBSE & State\nBoard training\nworkshops" },
//   { number: "03", title: "WHO-certified\nteacher training\ninitiatives" },
//   { number: "04", title: "Observation\nbased evaluation\nsystems" },
//   { number: "05", title: "SQAAF and\nquality assessment\nframeworks" },
//   { number: "06", title: "Institutional\nimprovement\ncommittees" },
//   { number: "07", title: "Curriculum\nalignment\nreviews" },
// ];

// const CARD_TAGS = [
//   ["Training", "Mentorship", "Growth"],
//   ["CBSE", "State Board", "Workshops"],
//   ["WHO", "Certification", "Initiatives"],
//   ["Observation", "Evaluation", "Systems"],
//   ["SQAAF", "Quality", "Assessment"],
//   ["Institutional", "Committees", "Review"],
//   ["Curriculum", "Alignment", "Revision"],
// ];

// const BG_WORDS = [
//   "DEVELOP", "TRAINING", "CERTIFY",
//   "EVALUATE", "QUALITY", "IMPROVE", "ALIGN",
// ];

// function SystemsThatSustainExcellence() {
//   const containerRef   = useRef(null);
//   const stackSectionRef = useRef(null);

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();

//       // ── SHARED: heading reveal ──────────────────────────────────────
//       mm.add("all", () => {
//         gsap.fromTo(
//           ".systems-eyebrow-line",
//           { scaleX: 0, transformOrigin: "left center" },
//           {
//             scaleX: 1, duration: 0.8, ease: "power3.out",
//             scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
//           },
//         );
//         gsap.fromTo(
//           ".systems-heading-word",
//           { y: "105%", opacity: 0 },
//           {
//             y: "0%", opacity: 1, duration: 0.85, stagger: 0.07, ease: "power4.out",
//             scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
//           },
//         );
//         gsap.fromTo(
//           ".systems-subtext",
//           { y: 28, opacity: 0 },
//           {
//             y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3,
//             scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
//           },
//         );
//       });

//       // ── DESKTOP (md+) ───────────────────────────────────────────────
//       mm.add("(min-width: 768px)", () => {
//         gsap.fromTo(
//           ".system-item",
//           { y: 50, opacity: 0, rotateX: 8, transformPerspective: 800 },
//           {
//             y: 0, opacity: 1, rotateX: 0, duration: 0.9,
//             stagger: { amount: 0.7, from: "start" }, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-item-line",
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-wrap",
//           { scale: 0.93, opacity: 0, borderRadius: "40px" },
//           {
//             scale: 1, opacity: 1, borderRadius: "26px", duration: 1.3, ease: "expo.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 85%" },
//           },
//         );
//         gsap.to(".system-img", {
//           yPercent: 10, ease: "none",
//           scrollTrigger: {
//             trigger: ".system-img-wrap", start: "top bottom", end: "bottom top",
//             scrub: 1, fastScrollEnd: true,
//           },
//         });
//         gsap.fromTo(
//           ".system-desc",
//           { y: 30, opacity: 0 },
//           {
//             y: 0, opacity: 1, duration: 1, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 58%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-tag",
//           { x: 20, opacity: 0 },
//           {
//             x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 55%" },
//           },
//         );
//       });

//       // ── MOBILE (<768px) ─────────────────────────────────────────────
//       mm.add("(max-width: 767px)", () => {
//         gsap.fromTo(
//           ".system-item",
//           { x: -40, opacity: 0 },
//           {
//             x: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "expo.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-item-line",
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-wrap",
//           { clipPath: "inset(100% 0% 0% 0% round 26px)", opacity: 1 },
//           {
//             clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.1, ease: "expo.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 88%" },
//           },
//         );
//         gsap.to(".system-img", {
//           yPercent: 6, ease: "none",
//           scrollTrigger: {
//             trigger: ".system-img-wrap", start: "top bottom", end: "bottom top", scrub: 2,
//           },
//         });
//         gsap.fromTo(
//           ".system-desc",
//           { filter: "blur(6px)", opacity: 0, y: 16 },
//           {
//             filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 62%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-tag",
//           { y: 12, opacity: 0 },
//           {
//             y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 60%" },
//           },
//         );
//       });

//       // ── STACKED CARDS SCROLL ────────────────────────────────────────
//       mm.add("all", () => {
//         const stackSection = stackSectionRef.current;
//         if (!stackSection) return;

//         // DOM order: index 0 = back card ("07"), index 6 = front card ("01")
//         const cards  = gsap.utils.toArray(".stack-card");
//         const total  = cards.length; // 7

//         const Y_STEP     = 7;
//         const ROT_STEP   = 1.5;
//         const SCALE_STEP = 0.018;

//         // Set initial stacked positions (never animating zIndex in the timeline)
//         cards.forEach((card, domIndex) => {
//           const depth = total - 1 - domIndex; // domIndex 6 → depth 0 (front)
//           gsap.set(card, {
//             y:               depth * Y_STEP,
//             rotation:        depth * ROT_STEP,
//             scale:           1 - depth * SCALE_STEP,
//             zIndex:          domIndex + 1,   // static — never animated
//             transformOrigin: "center bottom",
//             opacity:         1,
//           });
//         });

//         // Each step takes an equal slice of the normalised timeline.
//         // Using fromTo() everywhere so GSAP knows exact start AND end values —
//         // this is the key fix that makes reverse-scroll a perfect mirror.
//         const segDur = 1 / total;

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger:       stackSection,
//             start:         "top top",
//             end:           `+=${total * 320}`,  // total pinned scroll distance
//             pin:           true,
//             pinSpacing:    true,               // spacer exactly matches scroll distance
//             scrub:         1.8,                // higher = smoother, also helps reverse
//             anticipatePin: 1,
//           },
//         });

//         for (let step = 0; step < total; step++) {
//           // frontDOM = domIndex of the card that flies out at this step
//           const frontDOM = total - 1 - step; // step 0 → domIndex 6 ("01"), step 6 → domIndex 0 ("07")
//           const segStart = step * segDur;

//           // ── Front card flies UP and out ────────────────────────────
//           // Explicit from-values (depth-0 position) so scrubbing backward
//           // brings the card exactly back to depth-0, not some intermediate state.
//           tl.fromTo(
//             cards[frontDOM],
//             { y: 0, rotation: 0, scale: 1, opacity: 1 },
//             {
//               y: -600, rotation: -12, scale: 0.92, opacity: 0,
//               ease: "power2.inOut", duration: segDur,
//             },
//             segStart,
//           );

//           // ── Remaining cards advance one depth level ─────────────────
//           // Both depthBefore and depthAfter are explicit so reverse scrub
//           // restores the exact previous depth — no snapping or jumping.
//           for (let d = 0; d < frontDOM; d++) {
//             const depthBefore = frontDOM - d;       // depth at start of this step
//             const depthAfter  = frontDOM - 1 - d;  // depth at end of this step

//             tl.fromTo(
//               cards[d],
//               {
//                 y:        depthBefore * Y_STEP,
//                 rotation: depthBefore * ROT_STEP,
//                 scale:    1 - depthBefore * SCALE_STEP,
//                 opacity:  1,
//               },
//               {
//                 y:        depthAfter * Y_STEP,
//                 rotation: depthAfter * ROT_STEP,
//                 scale:    1 - depthAfter * SCALE_STEP,
//                 opacity:  1,
//                 ease:     "power2.inOut",
//                 duration: segDur,
//               },
//               segStart,
//             );
//           }

//           // ── Background word crossfade ──────────────────────────────
//           // fromTo keeps reverse behaviour clean (no undefined start opacity).
//           tl.fromTo(
//             `.stack-bg-word[data-index="${step}"]`,
//             { opacity: 0 },
//             { opacity: 0.065, ease: "none", duration: segDur },
//             segStart,
//           );
//           if (step > 0) {
//             tl.fromTo(
//               `.stack-bg-word[data-index="${step - 1}"]`,
//               { opacity: 0.065 },
//               { opacity: 0, ease: "none", duration: segDur },
//               segStart,
//             );
//           }
//         }

//         // Fade out the last bg word after all cards are gone
//         tl.fromTo(
//           `.stack-bg-word[data-index="${total - 1}"]`,
//           { opacity: 0.065 },
//           { opacity: 0, ease: "none", duration: segDur },
//         );
//       });

//       return () => mm.revert();
//     },
//     { scope: containerRef },
//   );

//   return (
//     <div ref={containerRef}>
//       {/* ══════════════════════════════════
//           SECTION 1 — Heading + Image
//       ══════════════════════════════════ */}
//       <section
//         className="bg-[#F5EFE8] overflow-hidden py-20 px-5 md:py-28 md:px-6"
//       >
//         <div className="w-full md:max-w-[1200px] md:mx-auto">

//           {/* HEADING BLOCK */}
//           <div className="text-center max-w-[720px] mx-auto">
//             <div className="flex items-center justify-center gap-3 mb-5">
//               <div
//                 className="systems-eyebrow-line h-px bg-black/30 w-10"
//                 style={{ transformOrigin: "left center" }}
//               />
//               <span className="text-[11px] uppercase tracking-[0.2em] text-black/50 font-medium">
//                 Academic Systems
//               </span>
//               <div
//                 className="systems-eyebrow-line h-px bg-black/30 w-10"
//                 style={{ transformOrigin: "right center" }}
//               />
//             </div>

//             <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-black overflow-hidden">
//               {["Systems", "That", "Sustain", "Excellence"].map((word, i) => (
//                 <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
//                   <span className="systems-heading-word inline-block">{word}</span>
//                 </span>
//               ))}
//             </h2>

//             <p className="systems-subtext mt-4 text-[14px] md:text-[15px] text-black/65 leading-relaxed max-w-[560px] mx-auto">
//               Sustained academic performance requires consistent faculty
//               development and institutional review mechanisms. ERAM integrates
//               comprehensive academic systems, including:
//             </p>
//           </div>

//              <section
//         ref={stackSectionRef}
//         className="relative bg-[#F5EFE8]"
//         style={{ minHeight: "100vh" }}
//       >
//         {/* Background giant words */}
//         <div
//           className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
//           aria-hidden="true"
//         >
//           {BG_WORDS.map((word, i) => (
//             <span
//               key={i}
//               className="stack-bg-word absolute font-black text-black leading-none whitespace-nowrap"
//               data-index={i}
//               style={{
//                 fontSize: "clamp(70px, 15vw, 185px)",
//                 letterSpacing: "-0.04em",
//                 opacity: i === 0 ? 0.065 : 0,
//               }}
//             >
//               {word}
//             </span>
//           ))}
//         </div>

//         {/* Card stack */}
//         <div
//           className="relative z-10 flex items-center justify-center"
//           style={{ minHeight: "100vh" }}
//         >
//           <div
//             className="relative"
//             style={{
//               width:  "clamp(290px, 44vw, 400px)",
//               height: "clamp(360px, 50vw, 480px)",
//             }}
//           >
//             {/*
//               DOM order: last ITEM (07) first in DOM = back of stack
//                          first ITEM (01) last in DOM = front of stack
//               GSAP: domIndex 0 = "07" (back), domIndex 6 = "01" (front)
//             */}
//             {[...ITEMS].reverse().map((item, reversedDOMIndex) => {
//               const originalItemIndex = ITEMS.length - 1 - reversedDOMIndex;
//               return (
//                 <div
//                   key={item.number}
//                   className="stack-card absolute inset-0 rounded-[20px] md:rounded-[26px]"
//                   style={{
//                     background: "#DCE0EA",
//                     boxShadow: "0 18px 55px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
//                     willChange: "transform, opacity",
//                   }}
//                 >
//                   <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
//                     {/* TOP */}
//                     <div>
//                       <p
//                         className="font-mono text-black/35 tracking-[0.14em]"
//                         style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
//                       >
//                         {item.number}
//                       </p>
//                       <h3
//                         className="font-black text-black uppercase mt-4 md:mt-5"
//                         style={{
//                           fontSize:      "clamp(22px, 4vw, 40px)",
//                           lineHeight:    1.02,
//                           letterSpacing: "-0.02em",
//                           whiteSpace:    "pre-line",
//                         }}
//                       >
//                         {item.title}
//                       </h3>
//                     </div>

//                     {/* BOTTOM */}
//                     <div className="flex items-end justify-between">
//                       <div className="flex flex-col gap-[2px]">
//                         {CARD_TAGS[originalItemIndex].map((tag) => (
//                           <span
//                             key={tag}
//                             className="font-medium text-black/50 leading-snug"
//                             style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                       <span
//                         className="font-black text-black/[0.09] leading-none"
//                         style={{ fontSize: "clamp(56px, 8.5vw, 84px)" }}
//                       >
//                         {item.number}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//           {/* IMAGE BLOCK */}
//           <div className="mt-14 md:mt-20">
//             <div className="system-img-wrap relative rounded-[26px] overflow-hidden transform-gpu h-[260px] sm:h-[320px] md:h-[480px]">
//               <div className="system-img w-full h-[120%] absolute -top-[10%]">
//                 <OptimizedImage
//                   src="/images/campus.webp"
//                   alt="campus"
//                   className="w-full h-full object-cover block"
//                   sizes="100vw"
//                   disableTransition
//                 />
//               </div>
//               <div className="absolute inset-0 bg-black/40" />
//               <div
//                 className="absolute inset-0 opacity-[0.04] pointer-events-none"
//                 style={{
//                   backgroundImage:
//                     "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//                   backgroundSize: "180px 180px",
//                 }}
//               />
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">
//                 <p className="system-desc text-center text-white text-[15px] sm:text-[17px] md:text-[22px] leading-relaxed max-w-[680px] font-light">
//                   These systems ensure that faculty remain professionally
//                   equipped, students receive guided mentorship, and institutional
//                   standards are maintained across all campuses.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ══════════════════════════════════
//           SECTION 2 — Stacked Cards (pinned)
//           Kept OUTSIDE section 1 so the
//           ScrollTrigger pin spacer doesn't
//           create a gap inside section 1.
//       ══════════════════════════════════ */}
   
//     </div>
//   );
// }

// export default memo(SystemsThatSustainExcellence);




// import { memo, useRef } from "react";
// import OptimizedImage from "../../ui/OptimizedImage";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ITEMS = [
//   { number: "01", title: "Teacher\ndevelopment\nprograms" },
//   { number: "02", title: "CBSE & State\nBoard training\nworkshops" },
//   { number: "03", title: "WHO-certified\nteacher training\ninitiatives" },
//   { number: "04", title: "Observation\nbased evaluation\nsystems" },
//   { number: "05", title: "SQAAF and\nquality assessment\nframeworks" },
//   { number: "06", title: "Institutional\nimprovement\ncommittees" },
//   { number: "07", title: "Curriculum\nalignment\nreviews" },
// ];

// const CARD_TAGS = [
//   ["Training", "Mentorship", "Growth"],
//   ["CBSE", "State Board", "Workshops"],
//   ["WHO", "Certification", "Initiatives"],
//   ["Observation", "Evaluation", "Systems"],
//   ["SQAAF", "Quality", "Assessment"],
//   ["Institutional", "Committees", "Review"],
//   ["Curriculum", "Alignment", "Revision"],
// ];

// const BG_WORDS = [
//   "DEVELOP", "TRAINING", "CERTIFY",
//   "EVALUATE", "QUALITY", "IMPROVE", "ALIGN",
// ];

// function SystemsThatSustainExcellence() {
//   const containerRef   = useRef(null);
//   const stackSectionRef = useRef(null);

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();

//       // ── SHARED: heading reveal ──────────────────────────────────────
//       mm.add("all", () => {
//         gsap.fromTo(
//           ".systems-eyebrow-line",
//           { scaleX: 0, transformOrigin: "left center" },
//           {
//             scaleX: 1, duration: 0.8, ease: "power3.out",
//             scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
//           },
//         );
//         gsap.fromTo(
//           ".systems-heading-word",
//           { y: "105%", opacity: 0 },
//           {
//             y: "0%", opacity: 1, duration: 0.85, stagger: 0.07, ease: "power4.out",
//             scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
//           },
//         );
//         gsap.fromTo(
//           ".systems-subtext",
//           { y: 28, opacity: 0 },
//           {
//             y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3,
//             scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
//           },
//         );
//       });

//       // ── DESKTOP (md+) ───────────────────────────────────────────────
//       mm.add("(min-width: 768px)", () => {
//         gsap.fromTo(
//           ".system-item",
//           { y: 50, opacity: 0, rotateX: 8, transformPerspective: 800 },
//           {
//             y: 0, opacity: 1, rotateX: 0, duration: 0.9,
//             stagger: { amount: 0.7, from: "start" }, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-item-line",
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-wrap",
//           { scale: 0.93, opacity: 0, borderRadius: "40px" },
//           {
//             scale: 1, opacity: 1, borderRadius: "26px", duration: 1.3, ease: "expo.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 85%" },
//           },
//         );
//         gsap.to(".system-img", {
//           yPercent: 10, ease: "none",
//           scrollTrigger: {
//             trigger: ".system-img-wrap", start: "top bottom", end: "bottom top",
//             scrub: 1, fastScrollEnd: true,
//           },
//         });
//         gsap.fromTo(
//           ".system-desc",
//           { y: 30, opacity: 0 },
//           {
//             y: 0, opacity: 1, duration: 1, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 58%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-tag",
//           { x: 20, opacity: 0 },
//           {
//             x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 55%" },
//           },
//         );
//       });

//       // ── MOBILE (<768px) ─────────────────────────────────────────────
//       mm.add("(max-width: 767px)", () => {
//         gsap.fromTo(
//           ".system-item",
//           { x: -40, opacity: 0 },
//           {
//             x: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "expo.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-item-line",
//           { scaleY: 0, transformOrigin: "top center" },
//           {
//             scaleY: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
//             scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-wrap",
//           { clipPath: "inset(100% 0% 0% 0% round 26px)", opacity: 1 },
//           {
//             clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.1, ease: "expo.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 88%" },
//           },
//         );
//         gsap.to(".system-img", {
//           yPercent: 6, ease: "none",
//           scrollTrigger: {
//             trigger: ".system-img-wrap", start: "top bottom", end: "bottom top", scrub: 2,
//           },
//         });
//         gsap.fromTo(
//           ".system-desc",
//           { filter: "blur(6px)", opacity: 0, y: 16 },
//           {
//             filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 62%" },
//           },
//         );
//         gsap.fromTo(
//           ".system-img-tag",
//           { y: 12, opacity: 0 },
//           {
//             y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
//             scrollTrigger: { trigger: ".system-img-wrap", start: "top 60%" },
//           },
//         );
//       });

//       // ── STACKED CARDS — shared setup helper ────────────────────────
//       const buildStackTimeline = (scrollEndPx) => {
//         const stackSection = stackSectionRef.current;
//         if (!stackSection) return;

//         const cards  = gsap.utils.toArray(".stack-card");
//         const total  = cards.length; // 7

//         const Y_STEP     = 7;
//         const ROT_STEP   = 1.5;
//         const SCALE_STEP = 0.018;

//         cards.forEach((card, domIndex) => {
//           const depth = total - 1 - domIndex;
//           gsap.set(card, {
//             y:               depth * Y_STEP,
//             rotation:        depth * ROT_STEP,
//             scale:           1 - depth * SCALE_STEP,
//             zIndex:          domIndex + 1,
//             transformOrigin: "center bottom",
//             opacity:         1,
//           });
//         });

//         // segDur fills exactly 1 unit so timeline ends right when last card exits —
//         // no dead-scroll gap between last animation and pin release.
//         const segDur = 1 / total;

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger:       stackSection,
//             start:         "top top",
//             end:           `+=${scrollEndPx}`,
//             pin:           true,
//             pinSpacing:    true,
//             scrub:         1.8,
//             anticipatePin: 1,
//           },
//         });

//         for (let step = 0; step < total; step++) {
//           const frontDOM = total - 1 - step;
//           const segStart = step * segDur;

//           // Front card flies UP and out — explicit from so reverse is perfect
//           tl.fromTo(
//             cards[frontDOM],
//             { y: 0, rotation: 0, scale: 1, opacity: 1 },
//             { y: -600, rotation: -12, scale: 0.92, opacity: 0, ease: "power2.inOut", duration: segDur },
//             segStart,
//           );

//           // Remaining cards advance one depth — fully explicit fromTo
//           for (let d = 0; d < frontDOM; d++) {
//             const depthBefore = frontDOM - d;
//             const depthAfter  = frontDOM - 1 - d;
//             tl.fromTo(
//               cards[d],
//               {
//                 y: depthBefore * Y_STEP, rotation: depthBefore * ROT_STEP,
//                 scale: 1 - depthBefore * SCALE_STEP, opacity: 1,
//               },
//               {
//                 y: depthAfter * Y_STEP, rotation: depthAfter * ROT_STEP,
//                 scale: 1 - depthAfter * SCALE_STEP, opacity: 1,
//                 ease: "power2.inOut", duration: segDur,
//               },
//               segStart,
//             );
//           }

//           // Background word crossfade — fromTo for clean reverse
//           tl.fromTo(
//             `.stack-bg-word[data-index="${step}"]`,
//             { opacity: 0 },
//             { opacity: 0.065, ease: "none", duration: segDur },
//             segStart,
//           );
//           if (step > 0) {
//             tl.fromTo(
//               `.stack-bg-word[data-index="${step - 1}"]`,
//               { opacity: 0.065 },
//               { opacity: 0, ease: "none", duration: segDur },
//               segStart,
//             );
//           }
//         }

//         // Last bg word fades out in the same final segment — no extra duration added
//         tl.fromTo(
//           `.stack-bg-word[data-index="${total - 1}"]`,
//           { opacity: 0.065 },
//           { opacity: 0, ease: "none", duration: segDur },
//           (total - 1) * segDur,   // same start as last card's exit — no appended time
//         );
//       };

//       // Desktop — comfortable scroll distance per card
//       mm.add("(min-width: 768px)", () => {
//         buildStackTimeline(7 * 320); // 2240 px total
//       });

//       // Mobile — tighter scroll distance so pin releases promptly after last card
//       mm.add("(max-width: 767px)", () => {
//         buildStackTimeline(7 * 180); // 1260 px total — no dead-scroll gap on mobile
//       });

//       return () => mm.revert();
//     },
//     { scope: containerRef },
//   );

//   return (
//     <div ref={containerRef}>
//       {/* ══════════════════════════════════
//           SECTION 1 — Heading + Image
//       ══════════════════════════════════ */}
//       <section
//         className="bg-[#F5EFE8] overflow-hidden py-20 px-5 md:py-28 md:px-6"
//       >
//         <div className="w-full md:max-w-[1200px] md:mx-auto">

//           {/* HEADING BLOCK */}
//           <div className="text-center max-w-[720px] mx-auto">
//             <div className="flex items-center justify-center gap-3 mb-5">
//               <div
//                 className="systems-eyebrow-line h-px bg-black/30 w-10"
//                 style={{ transformOrigin: "left center" }}
//               />
//               <span className="text-[11px] uppercase tracking-[0.2em] text-black/50 font-medium">
//                 Academic Systems
//               </span>
//               <div
//                 className="systems-eyebrow-line h-px bg-black/30 w-10"
//                 style={{ transformOrigin: "right center" }}
//               />
//             </div>

//             <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-black overflow-hidden">
//               {["Systems", "That", "Sustain", "Excellence"].map((word, i) => (
//                 <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
//                   <span className="systems-heading-word inline-block">{word}</span>
//                 </span>
//               ))}
//             </h2>

//             <p className="systems-subtext mt-4 text-[14px] md:text-[15px] text-black/65 leading-relaxed max-w-[560px] mx-auto">
//               Sustained academic performance requires consistent faculty
//               development and institutional review mechanisms. ERAM integrates
//               comprehensive academic systems, including:
//             </p>
//           </div>

//           {/* IMAGE BLOCK */}
//           <div className="mt-14 md:mt-20">
//             <div className="system-img-wrap relative rounded-[26px] overflow-hidden transform-gpu h-[260px] sm:h-[320px] md:h-[480px]">
//               <div className="system-img w-full h-[120%] absolute -top-[10%]">
//                 <OptimizedImage
//                   src="/images/campus.webp"
//                   alt="campus"
//                   className="w-full h-full object-cover block"
//                   sizes="100vw"
//                   disableTransition
//                 />
//               </div>
//               <div className="absolute inset-0 bg-black/40" />
//               <div
//                 className="absolute inset-0 opacity-[0.04] pointer-events-none"
//                 style={{
//                   backgroundImage:
//                     "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//                   backgroundSize: "180px 180px",
//                 }}
//               />
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">
//                 <p className="system-desc text-center text-white text-[15px] sm:text-[17px] md:text-[22px] leading-relaxed max-w-[680px] font-light">
//                   These systems ensure that faculty remain professionally
//                   equipped, students receive guided mentorship, and institutional
//                   standards are maintained across all campuses.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ══════════════════════════════════
//           SECTION 2 — Stacked Cards (pinned)
//           Kept OUTSIDE section 1 so the
//           ScrollTrigger pin spacer doesn't
//           create a gap inside section 1.
//       ══════════════════════════════════ */}
//       <section
//         ref={stackSectionRef}
//         className="relative bg-[#F5EFE8]"
//         style={{ minHeight: "100vh" }}
//       >
//         {/* Background giant words */}
//         <div
//           className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
//           aria-hidden="true"
//         >
//           {BG_WORDS.map((word, i) => (
//             <span
//               key={i}
//               className="stack-bg-word absolute font-black text-black leading-none whitespace-nowrap"
//               data-index={i}
//               style={{
//                 fontSize: "clamp(70px, 15vw, 185px)",
//                 letterSpacing: "-0.04em",
//                 opacity: i === 0 ? 0.065 : 0,
//               }}
//             >
//               {word}
//             </span>
//           ))}
//         </div>

//         {/* Card stack */}
//         <div
//           className="relative z-10 flex items-center justify-center"
//           style={{ minHeight: "100vh" }}
//         >
//           <div
//             className="relative"
//             style={{
//               width:  "clamp(290px, 44vw, 400px)",
//               height: "clamp(360px, 50vw, 480px)",
//             }}
//           >
//             {/*
//               DOM order: last ITEM (07) first in DOM = back of stack
//                          first ITEM (01) last in DOM = front of stack
//               GSAP: domIndex 0 = "07" (back), domIndex 6 = "01" (front)
//             */}
//             {[...ITEMS].reverse().map((item, reversedDOMIndex) => {
//               const originalItemIndex = ITEMS.length - 1 - reversedDOMIndex;
//               return (
//                 <div
//                   key={item.number}
//                   className="stack-card absolute inset-0 rounded-[20px] md:rounded-[26px]"
//                   style={{
//                     background: "#DCE0EA",
//                     boxShadow: "0 18px 55px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
//                     willChange: "transform, opacity",
//                   }}
//                 >
//                   <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
//                     {/* TOP */}
//                     <div>
//                       <p
//                         className="font-mono text-black/35 tracking-[0.14em]"
//                         style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
//                       >
//                         {item.number}
//                       </p>
//                       <h3
//                         className="font-black text-black uppercase mt-4 md:mt-5"
//                         style={{
//                           fontSize:      "clamp(22px, 4vw, 40px)",
//                           lineHeight:    1.02,
//                           letterSpacing: "-0.02em",
//                           whiteSpace:    "pre-line",
//                         }}
//                       >
//                         {item.title}
//                       </h3>
//                     </div>

//                     {/* BOTTOM */}
//                     <div className="flex items-end justify-between">
//                       <div className="flex flex-col gap-[2px]">
//                         {CARD_TAGS[originalItemIndex].map((tag) => (
//                           <span
//                             key={tag}
//                             className="font-medium text-black/50 leading-snug"
//                             style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                       <span
//                         className="font-black text-black/[0.09] leading-none"
//                         style={{ fontSize: "clamp(56px, 8.5vw, 84px)" }}
//                       >
//                         {item.number}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default memo(SystemsThatSustainExcellence);




import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { number: "01", title: "Teacher\ndevelopment\nprograms" },
  { number: "02", title: "CBSE & State\nBoard training\nworkshops" },
  { number: "03", title: "WHO-certified\nteacher training\ninitiatives" },
  { number: "04", title: "Observation\nbased evaluation\nsystems" },
  { number: "05", title: "SQAAF and\nquality assessment\nframeworks" },
  { number: "06", title: "Institutional\nimprovement\ncommittees" },
  { number: "07", title: "Curriculum\nalignment\nreviews" },
];

const CARD_TAGS = [
  ["Training", "Mentorship", "Growth"],
  ["CBSE", "State Board", "Workshops"],
  ["WHO", "Certification", "Initiatives"],
  ["Observation", "Evaluation", "Systems"],
  ["SQAAF", "Quality", "Assessment"],
  ["Institutional", "Committees", "Review"],
  ["Curriculum", "Alignment", "Revision"],
];

const BG_WORDS = [
  "DEVELOP", "TRAINING", "CERTIFY",
  "EVALUATE", "QUALITY", "IMPROVE", "ALIGN",
];

function SystemsThatSustainExcellence() {
  const containerRef    = useRef(null);
  const stackSectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── SHARED: heading reveal ──────────────────────────────────────
      mm.add("all", () => {
        gsap.fromTo(
          ".systems-eyebrow-line",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".systems-heading-word",
          { y: "105%", opacity: 0 },
          {
            y: "0%", opacity: 1, duration: 0.85, stagger: 0.07, ease: "power4.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".systems-subtext",
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3,
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
      });

      // ── DESKTOP (md+) ───────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".system-item",
          { y: 50, opacity: 0, rotateX: 8, transformPerspective: 800 },
          {
            y: 0, opacity: 1, rotateX: 0, duration: 0.9,
            stagger: { amount: 0.7, from: "start" }, ease: "power3.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".system-item-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".system-img-wrap",
          { scale: 0.93, opacity: 0, borderRadius: "40px" },
          {
            scale: 1, opacity: 1, borderRadius: "26px", duration: 1.3, ease: "expo.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 85%" },
          },
        );
        gsap.to(".system-img", {
          yPercent: 10, ease: "none",
          scrollTrigger: {
            trigger: ".system-img-wrap", start: "top bottom", end: "bottom top",
            scrub: 1, fastScrollEnd: true,
          },
        });
        gsap.fromTo(
          ".system-desc",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 58%" },
          },
        );
        gsap.fromTo(
          ".system-img-tag",
          { x: 20, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 55%" },
          },
        );
      });

      // ── MOBILE (<768px) ─────────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".system-item",
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "expo.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".system-item-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".system-img-wrap",
          { clipPath: "inset(100% 0% 0% 0% round 26px)", opacity: 1 },
          {
            clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 88%" },
          },
        );
        gsap.to(".system-img", {
          yPercent: 6, ease: "none",
          scrollTrigger: {
            trigger: ".system-img-wrap", start: "top bottom", end: "bottom top", scrub: 2,
          },
        });
        gsap.fromTo(
          ".system-desc",
          { filter: "blur(6px)", opacity: 0, y: 16 },
          {
            filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 62%" },
          },
        );
        gsap.fromTo(
          ".system-img-tag",
          { y: 12, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 60%" },
          },
        );
      });

      // ── STACKED CARDS — shared builder ─────────────────────────────
      const buildStackTimeline = (scrollEndPx) => {
        const stackSection = stackSectionRef.current;
        if (!stackSection) return;

        const cards = gsap.utils.toArray(".stack-card");
        const total = cards.length; // 7

        const Y_STEP     = 7;
        const ROT_STEP   = 1.5;
        const SCALE_STEP = 0.018;

        cards.forEach((card, domIndex) => {
          const depth = total - 1 - domIndex;
          gsap.set(card, {
            y: depth * Y_STEP,
            rotation: depth * ROT_STEP,
            scale: 1 - depth * SCALE_STEP,
            zIndex: domIndex + 1,         // static — never animated
            transformOrigin: "center bottom",
            opacity: 1,
          });
        });

        const segDur = 1 / total;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:       stackSection,
            start:         "top top",
            end:           `+=${scrollEndPx}`,
            pin:           true,
            pinSpacing:    true,
            scrub:         1.8,
            anticipatePin: 1,
          },
        });

        for (let step = 0; step < total; step++) {
          const frontDOM = total - 1 - step;
          const segStart = step * segDur;

          // Front card flies up — explicit fromTo for perfect reverse
          tl.fromTo(
            cards[frontDOM],
            { y: 0, rotation: 0, scale: 1, opacity: 1 },
            { y: -600, rotation: -12, scale: 0.92, opacity: 0, ease: "power2.inOut", duration: segDur },
            segStart,
          );

          // Remaining cards shift one depth forward
          for (let d = 0; d < frontDOM; d++) {
            const depthBefore = frontDOM - d;
            const depthAfter  = frontDOM - 1 - d;
            tl.fromTo(
              cards[d],
              {
                y: depthBefore * Y_STEP, rotation: depthBefore * ROT_STEP,
                scale: 1 - depthBefore * SCALE_STEP, opacity: 1,
              },
              {
                y: depthAfter * Y_STEP, rotation: depthAfter * ROT_STEP,
                scale: 1 - depthAfter * SCALE_STEP, opacity: 1,
                ease: "power2.inOut", duration: segDur,
              },
              segStart,
            );
          }

          // Background word crossfade
          tl.fromTo(
            `.stack-bg-word[data-index="${step}"]`,
            { opacity: 0 },
            { opacity: 0.065, ease: "none", duration: segDur },
            segStart,
          );
          if (step > 0) {
            tl.fromTo(
              `.stack-bg-word[data-index="${step - 1}"]`,
              { opacity: 0.065 },
              { opacity: 0, ease: "none", duration: segDur },
              segStart,
            );
          }
        }

        // Last bg word fades out within the final segment — no extra time added
        tl.fromTo(
          `.stack-bg-word[data-index="${total - 1}"]`,
          { opacity: 0.065 },
          { opacity: 0, ease: "none", duration: segDur },
          (total - 1) * segDur,
        );
      };

      // Desktop
      mm.add("(min-width: 768px)", () => { buildStackTimeline(7 * 320); });
      // Mobile — shorter distance, no dead-scroll gap
      mm.add("(max-width: 767px)", () => { buildStackTimeline(7 * 180); });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>

      {/* ══════════════════════════════════════════
          SECTION 1 — Heading
      ══════════════════════════════════════════ */}
      <section className="bg-[#F5EFE8] overflow-hidden pt-20 pb-14 px-5 md:pt-28 md:pb-20 md:px-6">
        <div className="w-full md:max-w-[1200px] md:mx-auto">
          <div className="text-center max-w-[720px] mx-auto">

            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="systems-eyebrow-line h-px bg-black/30 w-10"
                style={{ transformOrigin: "left center" }}
              />
              <span className="text-[11px] uppercase tracking-[0.2em] text-black/50 font-medium">
                Academic Systems
              </span>
              <div
                className="systems-eyebrow-line h-px bg-black/30 w-10"
                style={{ transformOrigin: "right center" }}
              />
            </div>

            <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-black overflow-hidden">
              {["Systems", "That", "Sustain", "Excellence"].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <span className="systems-heading-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="systems-subtext mt-4 text-[14px] md:text-[15px] text-black/65 leading-relaxed max-w-[560px] mx-auto">
              Sustained academic performance requires consistent faculty
              development and institutional review mechanisms. ERAM integrates
              comprehensive academic systems, including:
            </p>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — Stacked Cards (pinned)
          Between heading and image so layout order
          is: Heading → Cards → Image.
          Kept outside section 1 so GSAP's pin
          spacer never creates a gap inside it.
      ══════════════════════════════════════════ */}
      <section
        ref={stackSectionRef}
        className="relative bg-[#F5EFE8]"
        style={{ minHeight: "100vh" }}
      >
        {/* Background giant words */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {BG_WORDS.map((word, i) => (
            <span
              key={i}
              className="stack-bg-word absolute font-black text-black leading-none whitespace-nowrap"
              data-index={i}
              style={{
                fontSize: "clamp(70px, 15vw, 185px)",
                letterSpacing: "-0.04em",
                opacity: i === 0 ? 0.065 : 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Card stack */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="relative"
            style={{
              width:  "clamp(290px, 44vw, 400px)",
              height: "clamp(360px, 50vw, 480px)",
            }}
          >
            {/* DOM order: "07" first = back, "01" last = front */}
            {[...ITEMS].reverse().map((item, reversedDOMIndex) => {
              const originalItemIndex = ITEMS.length - 1 - reversedDOMIndex;
              return (
                <div
                  key={item.number}
                  className="stack-card absolute inset-0 rounded-[20px] md:rounded-[26px]"
                  style={{
                    background: "#DCE0EA",
                    boxShadow: "0 18px 55px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
                    <div>
                      <p
                        className="font-mono text-black/35 tracking-[0.14em]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
                      >
                        {item.number}
                      </p>
                      <h3
                        className="font-black text-black uppercase mt-4 md:mt-5"
                        style={{
                          fontSize:      "clamp(22px, 4vw, 40px)",
                          lineHeight:    1.02,
                          letterSpacing: "-0.02em",
                          whiteSpace:    "pre-line",
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex flex-col gap-[2px]">
                        {CARD_TAGS[originalItemIndex].map((tag) => (
                          <span
                            key={tag}
                            className="font-medium text-black/50 leading-snug"
                            style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span
                        className="font-black text-black/[0.09] leading-none"
                        style={{ fontSize: "clamp(56px, 8.5vw, 84px)" }}
                      >
                        {item.number}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — Image block
          Comes after cards, same bg as section 1
      ══════════════════════════════════════════ */}
      <section className="bg-[#F5EFE8] overflow-hidden py-14 px-5 md:py-20 md:px-6">
        <div className="w-full md:max-w-[1200px] md:mx-auto">
          <div className="system-img-wrap relative rounded-[26px] overflow-hidden transform-gpu h-[260px] sm:h-[320px] md:h-[480px]">
            <div className="system-img w-full h-[120%] absolute -top-[10%]">
              <OptimizedImage
                src="/images/campus.webp"
                alt="campus"
                className="w-full h-full object-cover block"
                sizes="100vw"
                disableTransition
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "180px 180px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">
              <p className="system-desc text-center text-white text-[15px] sm:text-[17px] md:text-[22px] leading-relaxed max-w-[680px] font-light">
                These systems ensure that faculty remain professionally
                equipped, students receive guided mentorship, and institutional
                standards are maintained across all campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default memo(SystemsThatSustainExcellence);