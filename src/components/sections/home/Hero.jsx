import { useRef } from "react";
import { gsap } from "gsap";
import ActionButton from "../../ui/ActionButton";
import { shell } from "../../../constants/homeStyles";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const sectionCls = [
  shell,
  "isolate relative block",
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
  "max-[767px]:mt-[10px]",
].join(" ");

const headingCls =
  "font-display font-light tracking-[-0.03em] leading-[0.95] " +
  "text-[clamp(1.75rem,7vw,5.8rem)] text-white -mt-16";

const descCls =
  "mt-[34px] max-w-[680px] text-[1.05rem] leading-[1.65] text-white " +
  "max-[640px]:max-w-full font-rethink";

/* ─── Animation config ────────────────────────────────────────────────────── */
const EASE = {
  snappy: "power2.out",
  smooth: "power3.out",
  light: "power1.out",
};

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const line0Ref = useRef(null);
  const line1Ref = useRef(null);
  const sublineRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const navigate = useNavigate();

  const scrollTo = useSmoothScroll();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();
      const lines = () => [line0Ref.current, line1Ref.current];

      /* ── Desktop ≥ 1280px — cinematic clip-reveal + parallax ─────────────── */
      mm.add("(min-width: 1280px)", () => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(
          lines(),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: EASE.smooth,
            clearProps: "all",
          },
        )
          .fromTo(
            sublineRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: EASE.light },
            "-=0.5",
          )
          .fromTo(
            descRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.75, ease: EASE.snappy },
            "-=0.55",
          )
          .fromTo(
            buttonsRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.75, ease: EASE.snappy },
            "-=0.55",
          );

        // Subtle parallax on scroll
        gsap.to(containerRef.current, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tl.kill();
        };
      });

      /* ── Tablet 768–1023px — moderate reveals, no parallax ──────────────── */
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const tl = gsap.timeline({ delay: 0.08 });

        tl.fromTo(
          lines(),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: EASE.smooth,
          },
        )
          .fromTo(
            sublineRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.42, ease: EASE.light },
            "-=0.38",
          )
          .fromTo(
            descRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6, ease: EASE.snappy },
            "-=0.42",
          )
          .fromTo(
            buttonsRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6, ease: EASE.snappy },
            "-=0.42",
          );

        return () => tl.kill();
      });

      /* ── Mobile < 768px — fade-only, no y travel, no parallax ───────────── */
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ delay: 0.05 });

        tl.fromTo(
          lines(),
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.08, ease: EASE.light },
        )
          .fromTo(
            sublineRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.32, ease: EASE.light },
            "-=0.18",
          )
          .fromTo(
            descRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: EASE.light },
            "-=0.20",
          )
          .fromTo(
            buttonsRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.38, ease: EASE.light },
            "-=0.18",
          );

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={sectionCls} id="hero">
      <div ref={containerRef} className={`${cardCls}`}>
        {/* ── Media: LCP image first, video overlays ──────────────────────── */}
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            poster="/images/institute.webp"
          >
            <source src="/videos/mainhero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-[1500px] pb-[100px] max-[640px]:pb-[20px] ml-[65px] max-[920px]:ml-[40px] max-[640px]:ml-0">
          {/* H1 */}
          <h1 className={headingCls}>
            <span className=" pb-1 ">
              <span ref={line0Ref} className="block">
                Building Foundations.
              </span>
            </span>
            <span className=" pb-1 ">
              <span ref={line1Ref} className="block">
                Shaping Futures.
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p
            ref={sublineRef}
            className="font-rethink text-[22px] text-white mt-6"
          >
            Holistic, disciplined, and inclusive education for every child.
          </p>

          {/* Description */}
          <p ref={descRef} className={descCls}>
            A disciplined educational ecosystem nurturing academic excellence,
            character, and opportunity.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="mt-11 flex flex-wrap gap-[14px]">
            <ActionButton
              onClick={() => scrollTo("institutions")}
              className="font-rethink !bg-[#ae1431] hover:!bg-black cursor-pointer"
            >
              Explore Our Institutions
            </ActionButton>
            <ActionButton
              onClick={() => navigate("/contact")}
              className="font-rethink !bg-[#f5efe8] !text-black hover:!bg-black hover:!text-[#f5efe8] cursor-pointer"
            >
              Admissions Open 2026-27
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { useNavigate } from "react-router-dom";

// import ActionButton from "../../ui/ActionButton";
// import { shell } from "../../../constants/homeStyles";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

// /* ─────────────────────────────────────────────
//    Styles
// ───────────────────────────────────────────── */

// const sectionCls = [
//   shell,
//   "isolate relative block",
//   "before:content-[''] before:absolute before:-top-[160px] before:bottom-0",
//   "before:w-[100vw] before:left-1/2 before:-translate-x-1/2",
//   "before:bg-[#ae1431] before:-z-10",
//   "pb-[66px] pt-[43px]",
//   "max-[920px]:pb-[56px]",
//   "max-[640px]:pt-[24px]",
// ].join(" ");

// const cardCls = [
//   "relative overflow-hidden rounded-[20px]",
//   "min-h-[650px]",

//   "px-[60px]",
//   "xl:px-[80px]",
//   "2xl:px-[110px]",

//   "pt-[220px]",
//   "pb-[92px]",

//   "max-[920px]:px-[36px]",
//   "max-[920px]:pt-[180px]",

//   "max-[640px]:px-6",
//   "max-[640px]:pt-[150px]",

//   "max-[420px]:px-4",
//   "max-[420px]:pt-[130px]",

//   "max-[767px]:mt-[10px]",
// ].join(" ");

// const headingCls = [
//   "font-display",
//   "font-light",
//   "tracking-[-0.03em]",
//   "leading-[0.95]",
//   "text-white",

//   "text-[clamp(2.8rem,7vw,5.8rem)]",

//   "max-w-[1200px]",
//   "-mt-16",

//   "will-change-transform",

//   "max-[640px]:-mt-8",
// ].join(" ");

// const descCls = [
//   "mt-[34px]",
//   "max-w-[680px]",

//   "text-[1.05rem]",
//   "leading-[1.65]",

//   "text-white",
//   "font-rethink",

//   "max-[640px]:max-w-full",
// ].join(" ");

// /* ─────────────────────────────────────────────
//    Animation easing
// ───────────────────────────────────────────── */

// const EASE = {
//   smooth: "power3.out",
//   light: "power1.out",
//   snappy: "power2.out",
// };

// /* ─────────────────────────────────────────────
//    Component
// ───────────────────────────────────────────── */

// export default function Hero() {
//   const sectionRef = useRef(null);
//   const containerRef = useRef(null);

//   const headingRef = useRef(null);
//   const sublineRef = useRef(null);
//   const descRef = useRef(null);
//   const buttonsRef = useRef(null);

//   const navigate = useNavigate();

//   useGSAP(
//     () => {
//       if (
//         window.matchMedia("(prefers-reduced-motion: reduce)").matches
//       ) {
//         return;
//       }

//       const mm = gsap.matchMedia();

//       /* ───────── Desktop ≥ 1280px ───────── */

//       mm.add("(min-width: 1280px)", () => {
//         const tl = gsap.timeline({
//           delay: 0.15,
//         });

//         tl.fromTo(
//           headingRef.current,
//           {
//             opacity: 0,
//             y: 40,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.9,
//             ease: EASE.smooth,
//           },
//         )
//           .fromTo(
//             sublineRef.current,
//             {
//               opacity: 0,
//               y: 12,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.6,
//               ease: EASE.light,
//             },
//             "-=0.45",
//           )
//           .fromTo(
//             descRef.current,
//             {
//               opacity: 0,
//               y: 16,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.7,
//               ease: EASE.snappy,
//             },
//             "-=0.45",
//           )
//           .fromTo(
//             buttonsRef.current,
//             {
//               opacity: 0,
//               y: 16,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.7,
//               ease: EASE.snappy,
//             },
//             "-=0.45",
//           );

//         gsap.to(containerRef.current, {
//           yPercent: 4,
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top top",
//             end: "bottom top",
//             scrub: 0.2,
//             invalidateOnRefresh: true,
//           },
//         });

//         return () => {
//           tl.kill();
//         };
//       });

//       /* ───────── Tablet + Mid Desktop ───────── */

//       mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
//         const tl = gsap.timeline({
//           delay: 0.08,
//         });

//         tl.fromTo(
//           headingRef.current,
//           {
//             opacity: 0,
//             y: 24,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//             ease: EASE.smooth,
//           },
//         )
//           .fromTo(
//             sublineRef.current,
//             {
//               opacity: 0,
//             },
//             {
//               opacity: 1,
//               duration: 0.4,
//               ease: EASE.light,
//             },
//             "-=0.35",
//           )
//           .fromTo(
//             descRef.current,
//             {
//               opacity: 0,
//               y: 10,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.5,
//               ease: EASE.snappy,
//             },
//             "-=0.35",
//           )
//           .fromTo(
//             buttonsRef.current,
//             {
//               opacity: 0,
//               y: 10,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.5,
//               ease: EASE.snappy,
//             },
//             "-=0.35",
//           );

//         return () => {
//           tl.kill();
//         };
//       });

//       /* ───────── Mobile ───────── */

//       mm.add("(max-width: 767px)", () => {
//         const tl = gsap.timeline({
//           delay: 0.05,
//         });

//         tl.fromTo(
//           headingRef.current,
//           {
//             opacity: 0,
//           },
//           {
//             opacity: 1,
//             duration: 0.45,
//             ease: EASE.light,
//           },
//         )
//           .fromTo(
//             sublineRef.current,
//             {
//               opacity: 0,
//             },
//             {
//               opacity: 1,
//               duration: 0.35,
//               ease: EASE.light,
//             },
//             "-=0.2",
//           )
//           .fromTo(
//             descRef.current,
//             {
//               opacity: 0,
//             },
//             {
//               opacity: 1,
//               duration: 0.35,
//               ease: EASE.light,
//             },
//             "-=0.15",
//           )
//           .fromTo(
//             buttonsRef.current,
//             {
//               opacity: 0,
//             },
//             {
//               opacity: 1,
//               duration: 0.35,
//               ease: EASE.light,
//             },
//             "-=0.15",
//           );

//         return () => {
//           tl.kill();
//         };
//       });

//       return () => {
//         mm.revert();
//       };
//     },
//     {
//       scope: sectionRef,
//     },
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className={sectionCls}
//       id="hero"
//     >
//       <div
//         ref={containerRef}
//         className={cardCls}
//       >
//         {/* Background Video */}

//         <div className="absolute inset-0">
//           <video
//             className="absolute inset-0 h-full w-full object-cover"
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             disablePictureInPicture
//             disableRemotePlayback
//             poster="/images/institute.webp"
//           >
//             <source
//               src="/videos/mainhero.mp4"
//               type="video/mp4"
//             />
//           </video>
//         </div>

//         {/* Overlay */}

//         <div
//           className="absolute inset-0 bg-black/45"
//           aria-hidden="true"
//         />

//         {/* Content */}

//         <div
//           className="
//             relative z-10

//             ml-[65px]
//             max-w-[1500px]

//             pb-[100px]

//             max-[920px]:ml-[40px]
//             max-[640px]:ml-0

//             max-[640px]:pb-[20px]
//           "
//         >
//           {/* Heading */}

//           <h1
//             ref={headingRef}
//             className={headingCls}
//           >
//             Building Foundations.
//             <br />
//             Shaping Futures.
//           </h1>

//           {/* Tagline */}

//           <p
//             ref={sublineRef}
//             className="
//               mt-6
//               font-rethink
//               text-[22px]
//               text-white

//               max-[640px]:text-[18px]
//             "
//           >
//             Holistic, disciplined, and inclusive
//             education for every child.
//           </p>

//           {/* Description */}

//           <p
//             ref={descRef}
//             className={descCls}
//           >
//             A disciplined educational ecosystem
//             nurturing academic excellence,
//             character, and opportunity.
//           </p>

//           {/* Buttons */}

//           <div
//             ref={buttonsRef}
//             className="
//               mt-11
//               flex flex-wrap
//               gap-[14px]
//             "
//           >
//             <ActionButton
//               onClick={() => {
//                 const section =
//                   document.getElementById(
//                     "institutions",
//                   );

//                 if (section) {
//                   const yOffset = -90;

//                   const y =
//                     section.getBoundingClientRect()
//                       .top +
//                     window.pageYOffset +
//                     yOffset;

//                   window.scrollTo({
//                     top: y,
//                     behavior: "smooth",
//                   });
//                 }
//               }}
//               className="
//                 font-rethink
//                 !bg-[#ae1431]
//                 hover:!bg-black
//                 cursor-pointer
//               "
//             >
//               Explore Our Institutions
//             </ActionButton>

//             <ActionButton
//               onClick={() =>
//                 navigate("/contact")
//               }
//               className="
//                 font-rethink
//                 !bg-[#f5efe8]
//                 !text-black
//                 hover:!bg-black
//                 hover:!text-[#f5efe8]
//                 cursor-pointer
//               "
//             >
//               Admissions Open 2026-27
//             </ActionButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
