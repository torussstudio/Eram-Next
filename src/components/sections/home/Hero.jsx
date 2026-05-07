// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ActionButton from "../../ui/ActionButton";
// import { shell } from "../../../constants/homeStyles";

// gsap.registerPlugin(ScrollTrigger);


// const sectionCls = [
//   shell,
//   "isolate relative block mt-[-20px]",
//   // extends the crimson bg behind the rounded card without a wrapper div
//   "before:content-[''] before:absolute before:-top-[160px] before:bottom-0",
//   "before:w-[100vw] before:left-1/2 before:-translate-x-1/2",
//   "before:bg-[#ae1431] before:-z-10",
//   "pb-[66px] pt-[43px]",
//   "max-[920px]:pb-[56px] max-[640px]:pt-[24px]",
// ].join(" ");

// const cardCls = [
//   "relative min-h-[650px] rounded-[20px] overflow-hidden",
//   "px-[60px] xl:px-[80px] 2xl:px-[110px]",
//   "pb-[92px] pt-[220px]",
//   "max-[920px]:px-[36px] max-[920px]:pt-[180px]",
//   "max-[640px]:px-6 max-[640px]:pt-[150px]",
//   "max-[420px]:px-4 max-[420px]:pt-[130px]",
// ].join(" ");

// const headingCls = [
//   "font-display leading-[0.95] tracking-[-0.02em] text-white",
//   "text-[clamp(4rem,5vw,5.6rem)]",
//   "max-[640px]:text-[clamp(2.3rem,12vw,3.4rem)]",
// ].join(" ");

// const descCls = [
//   "mt-[34px] max-w-[680px]",
//   "text-[1.05rem] leading-[1.65] text-white",
//   "max-[640px]:max-w-full",
// ].join(" ");

// /* ─────────────────────────────────────────────────────────────────── */

// export default function Hero() {
//   const sectionRef   = useRef(null);
//   const containerRef = useRef(null);
//   const descRef      = useRef(null);
//   const buttonsRef   = useRef(null);

//   useGSAP(
//     () => {
//       // Pre-hide before first paint — no blink
//       gsap.set(".hero-line", { y: "110%" });
//       gsap.set([descRef.current, buttonsRef.current], { opacity: 0, y: 16 });

//       // Entrance timeline
//       gsap
//         .timeline({ delay: 0.1 })
//         .to(".hero-line", {
//           y: "0%",
//           duration: 1.2,
//           stagger: 0.15,
//           ease: "power4.out",
//         })
//         .to(descRef.current,    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
//         .to(buttonsRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

//       // Parallax on scroll
//       gsap.to(containerRef.current, {
//         yPercent: 15,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//         },
//       });
//     },
//     { scope: sectionRef },
//   );

//   return (
//     <section ref={sectionRef} className={sectionCls} id="hero">
//       <div ref={containerRef} className={cardCls}>

//         {/* Background video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           poster="/videos/hero-thumb.jpg"
//         >
//           <source src="/videos/mainhero.mp4" type="video/mp4" />
//         </video>

//         {/* Scrim overlay */}
//         <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

//         {/* Content */}
//         <div className="relative z-10 max-w-[1500px] pb-[100px] ml-[65px] max-[920px]:ml-[40px] max-[640px]:ml-0">
//          <h1 className={`${headingCls} -mt-16`}>
//   {["Building Foundations.", "Shaping Futures."].map((line) => (
//     <div key={line} className="overflow-hidden pb-1">
//       <span className="hero-line block">{line}</span>
//     </div>
//   ))}
// </h1>

//           <br></br>

//             <p className="text-[22px] text-white ">Holistic, disciplined, and inclusive education for every child.</p>

//           <p ref={descRef} className={descCls}>
//             A disciplined educational ecosystem nurturing academic excellence, character, and opportunity.
//           </p>
//           <br></br>
        

//           <div ref={buttonsRef} className="mt-11 flex flex-wrap gap-[14px]">
//             <ActionButton className="!bg-[#ae1431] hover:!bg-black cursor-pointer">
//               Explore Our Institutions
//             </ActionButton>
//             <ActionButton className="!bg-[#f5efe8] !text-black hover:!bg-black hover:!text-[#f5efe8] cursor-pointer">
//               Admissions Open 2026-27
//             </ActionButton>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }





// import { useRef, useEffect } from "react";
// import { gsap, ScrollTrigger } from "../../../lib/gsap";

// import ActionButton from "../../ui/ActionButton";
// import { shell } from "../../../constants/homeStyles";

// const sectionCls = [
//   shell,
//   "isolate relative block mt-[-20px]",
//   "before:content-[''] before:absolute before:-top-[160px] before:bottom-0",
//   "before:w-[100vw] before:left-1/2 before:-translate-x-1/2",
//   "before:bg-[#ae1431] before:-z-10",
//   "pb-[66px] pt-[43px]",
//   "max-[920px]:pb-[56px] max-[640px]:pt-[24px]",
// ].join(" ");

// const cardCls = [
//   "relative min-h-[650px] rounded-[20px] overflow-hidden",
//   "px-[60px] xl:px-[80px] 2xl:px-[110px]",
//   "pb-[92px] pt-[220px]",
//   "max-[920px]:px-[36px] max-[920px]:pt-[180px]",
//   "max-[640px]:px-6 max-[640px]:pt-[150px]",
//   "max-[420px]:px-4 max-[420px]:pt-[130px]",
// ].join(" ");

// const headingCls = [
//   "font-display leading-[0.95] tracking-[-0.02em] text-white",
//   "text-[clamp(4rem,5vw,5.6rem)]",
//   "max-[640px]:text-[clamp(2.3rem,12vw,3.4rem)]",
// ].join(" ");

// const descCls = [
//   "mt-[34px] max-w-[680px]",
//   "text-[1.05rem] leading-[1.65] text-white",
//   "max-[640px]:max-w-full",
// ].join(" ");

// export default function Hero() {
//   const sectionRef = useRef(null);
//   const containerRef = useRef(null);
//   const descRef = useRef(null);
//   const buttonsRef = useRef(null);

//   useEffect(() => {
//     // ✅ Disable heavy animation on tablet/mobile
//     if (window.innerWidth < 1024) return;

//     const ctx = gsap.context(() => {
//       const lines = gsap.utils.toArray(".hero-line");

//       if (!lines.length) return;

//       // Initial states
//       gsap.set(lines, { y: "110%" });

//       gsap.set([descRef.current, buttonsRef.current], {
//         opacity: 0,
//         y: 16,
//       });

//       // Entrance animation
//       gsap
//         .timeline({ delay: 0.1 })
//         .to(lines, {
//           y: "0%",
//           duration: 1,
//           stagger: 0.12,
//           ease: "power3.out",
//         })
//         .to(
//           descRef.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//           },
//           "-=0.6"
//         )
//         .to(
//           buttonsRef.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//           },
//           "-=0.6"
//         );

//       // ✅ Lighter parallax
//       gsap.to(containerRef.current, {
//         yPercent: 8,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",

//           // ✅ lighter than true
//           scrub: 0.5,
//         },
//       });
//     }, sectionRef);

//     return () => {
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section ref={sectionRef} className={sectionCls} id="hero">
//       <div ref={containerRef} className={cardCls}>

//         {/* ✅ Proper LCP strategy */}
//         <div className="absolute inset-0">

//           {/* LCP IMAGE */}
//           <img
//             src="/videos/hero-thumb.jpg"
//             alt="ERAM Education"
//             className="w-full h-full object-cover"
//             fetchPriority="high"
//           />

//           {/* Video overlays image */}
//           <video
//             className="absolute inset-0 w-full h-full object-cover"
//             autoPlay
//             muted
//             loop
//             playsInline

//             // ✅ huge improvement
//             preload="none"
//           >
//             <source src="/videos/mainhero.mp4" type="video/mp4" />
//           </video>
//         </div>

//         {/* Overlay */}
//         <div
//           className="absolute inset-0 bg-black/40"
//           aria-hidden="true"
//         />

//         {/* Content */}
//         <div className="relative z-10 max-w-[1500px] pb-[100px] ml-[65px] max-[920px]:ml-[40px] max-[640px]:ml-0">

//           <h1
//             className={`${headingCls} -mt-16`}
//             style={{ contentVisibility: "auto" }}
//           >
//             {["Building Foundations.", "Shaping Futures."].map((line) => (
//               <div key={line} className="overflow-hidden pb-1">
//                 <span className="hero-line block">{line}</span>
//               </div>
//             ))}
//           </h1>

//           <br />

//           <p className="text-[22px] text-white">
//             Holistic, disciplined, and inclusive education for every child.
//           </p>

//           <p ref={descRef} className={descCls}>
//             A disciplined educational ecosystem nurturing academic excellence,
//             character, and opportunity.
//           </p>

//           <br />

//           <div
//             ref={buttonsRef}
//             className="mt-11 flex flex-wrap gap-[14px]"
//           >
//             <ActionButton className="!bg-[#ae1431] hover:!bg-black cursor-pointer">
//               Explore Our Institutions
//             </ActionButton>

//             <ActionButton className="!bg-[#f5efe8] !text-black hover:!bg-black hover:!text-[#f5efe8] cursor-pointer">
//               Admissions Open 2026-27
//             </ActionButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useRef } from "react";
import { gsap } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import ActionButton from "../../ui/ActionButton";
import { shell } from "../../../constants/homeStyles";

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const sectionCls = [
  shell,
  "isolate relative block mt-[-20px]",
  "before:content-[''] before:absolute before:-top-[160px] before:bottom-0",
  "before:w-[100vw] before:left-1/2 before:-translate-x-1/2",
  "before:bg-[#ae1431] before:-z-10",
  "pb-[66px] pt-[43px]",
  "max-[920px]:pb-[56px] max-[640px]:pt-[24px]",
].join(" ");

const cardCls = [
  "relative min-h-[650px] rounded-[20px] overflow-hidden",
  "px-[60px] xl:px-[80px] 2xl:px-[110px]",
  "pb-[92px] pt-[220px]",
  "max-[920px]:px-[36px] max-[920px]:pt-[180px]",
  "max-[640px]:px-6 max-[640px]:pt-[150px]",
  "max-[420px]:px-4 max-[420px]:pt-[130px]",
].join(" ");

const headingCls =
  "font-agency font-light tracking-[-0.03em] leading-[0.95] " +
  "text-[clamp(1.75rem,7vw,5.8rem)] text-white -mt-16";

const descCls =
  "mt-[34px] max-w-[680px] text-[1.05rem] leading-[1.65] text-white " +
  "max-[640px]:max-w-full font-rethink";

/* ─── Animation config ────────────────────────────────────────────────────── */
const EASE = {
  snappy: "power2.out",
  smooth: "power3.out",
  light:  "power1.out",
};

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const line0Ref     = useRef(null);
  const line1Ref     = useRef(null);
  const sublineRef   = useRef(null);
  const descRef      = useRef(null);
  const buttonsRef   = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    const lines = () => [line0Ref.current, line1Ref.current];

    /* ── Desktop ≥ 1024px — cinematic clip-reveal + parallax ─────────────── */
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(lines(),
          { y: "110%" },
          { y: "0%", duration: 1.0, stagger: 0.12, ease: EASE.smooth }
        )
        .fromTo(sublineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: EASE.light },
          "-=0.5"
        )
        .fromTo(descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, ease: EASE.snappy },
          "-=0.55"
        )
        .fromTo(buttonsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, ease: EASE.snappy },
          "-=0.55"
        );

      // Subtle parallax on scroll
      gsap.to(containerRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger:             sectionRef.current,
          start:               "top top",
          end:                 "bottom top",
          scrub:               0.5,
          invalidateOnRefresh: true,
        },
      });

      return () => tl.kill();
    });

    /* ── Tablet 768–1023px — moderate reveals, no parallax ──────────────── */
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      const tl = gsap.timeline({ delay: 0.08 });

      tl.fromTo(lines(),
          { y: "110%" },
          { y: "0%", duration: 0.75, stagger: 0.10, ease: EASE.smooth }
        )
        .fromTo(sublineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.42, ease: EASE.light },
          "-=0.38"
        )
        .fromTo(descRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.60, ease: EASE.snappy },
          "-=0.42"
        )
        .fromTo(buttonsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.60, ease: EASE.snappy },
          "-=0.42"
        );

      return () => tl.kill();
    });

    /* ── Mobile < 768px — fade-only, no y travel, no parallax ───────────── */
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ delay: 0.05 });

      tl.fromTo(lines(),
          { opacity: 0 },
          { opacity: 1, duration: 0.40, stagger: 0.08, ease: EASE.light }
        )
        .fromTo(sublineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.32, ease: EASE.light },
          "-=0.18"
        )
        .fromTo(descRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.40, ease: EASE.light },
          "-=0.20"
        )
        .fromTo(buttonsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.38, ease: EASE.light },
          "-=0.18"
        );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={sectionCls} id="hero">
      <div ref={containerRef} className={cardCls}>

        {/* ── Media: LCP image first, video overlays ──────────────────────── */}
        <div className="absolute inset-0">
          <img
            src="/videos/hero-thumb.jpg"
            alt="ERAM Education"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source src="/videos/mainhero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-[1500px] pb-[100px] ml-[65px] max-[920px]:ml-[40px] max-[640px]:ml-0">

          {/* H1 */}
          <h1 className={headingCls}>
            <span className=" pb-1 ">
              <span ref={line0Ref} className="block">Building Foundations.</span>
            </span>
            <span className=" pb-1 ">
              <span ref={line1Ref} className="block">Shaping Futures.</span>
            </span>
          </h1>

          {/* Tagline */}
          <p ref={sublineRef} className="font-rethink text-[22px] text-white mt-6">
            Holistic, disciplined, and inclusive education for every child.
          </p>

          {/* Description */}
          <p ref={descRef} className={descCls}>
            A disciplined educational ecosystem nurturing academic excellence,
            character, and opportunity.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="mt-11 flex flex-wrap gap-[14px]">
            <ActionButton className="font-rethink !bg-[#ae1431] hover:!bg-black">
              Explore Our Institutions
            </ActionButton>
            <ActionButton className="font-rethink !bg-[#f5efe8] !text-black hover:!bg-black hover:!text-[#f5efe8]">
              Admissions Open 2026-27
            </ActionButton>
          </div>

        </div>
      </div>
    </section>
  );
}