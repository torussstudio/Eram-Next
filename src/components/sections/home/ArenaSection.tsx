// "use client";

// import { useRef, useState, useEffect } from "react";

// import { gsap, ScrollTrigger } from "../../../lib/gsap";
// import { useGSAP } from "@gsap/react";
// import { useRouter } from "next/navigation";
// import { Play } from "lucide-react";

// const ARENA_WORDS = ["SPORTS", "ARENA"];

// export default function ArenaSection() {
//   const sectionRef = useRef<HTMLElement>(null);

//   const router = useRouter();

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
//       { rootMargin: "300px" },
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const paraRef = useRef<HTMLParagraphElement>(null);
//   const btnsRef = useRef<HTMLDivElement>(null);
//   const outlineRef = useRef<HTMLDivElement>(null);
//   const lineTopRef = useRef<HTMLDivElement>(null);
//   const lineBottomRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       if (!shouldInit) return;

//       const isMobile = window.innerWidth < 640;

//       const card = cardRef.current;
//       const overlay = overlayRef.current;
//       const words = outlineRef.current?.querySelectorAll(".a-word");

//       /* ── Initial states ── */
//       gsap.set(card, { scale: 1.04, force3D: true });
//       gsap.set(overlay, { opacity: 0.88 });

//       gsap.set(lineTopRef.current, {
//         scaleX: 0,
//         transformOrigin: "left center",
//         force3D: true,
//       });
//       gsap.set(lineBottomRef.current, {
//         scaleX: 0,
//         transformOrigin: "right center",
//         force3D: true,
//       });

//       gsap.set(headingRef.current, {
//         opacity: 0,
//         y: 56,
//         skewY: 1.8,
//         force3D: true,
//       });
//       gsap.set(paraRef.current, { opacity: 0, y: 32, force3D: true });
//       gsap.set(btnsRef.current, { opacity: 0, y: 20, force3D: true });

//       if (words?.length) {
//         gsap.set(words, { y: "100%", skewX: 3, force3D: true });
//       }

//       /* ── Timeline ── */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           // ✅ Mobile-um Desktop-um "top top" thanne use cheyyunnu.
//           // Section full-height (h-screen) aayathu kondu, card
//           // flex-centering vazhi thanne visually center-il "lock"
//           // aayi kaanikkum — pin-spacer mismatch/jump illathe.
//           start: "top top",
//           end: isMobile ? "+=160%" : "+=220%",
//           scrub: 1.5,
//           pin: true,
//           anticipatePin: 1,
//           pinSpacing: true,
//           fastScrollEnd: true,
//           preventOverlaps: true,
//           invalidateOnRefresh: true,
//         },
//         defaults: { ease: "none" },
//       });

//       tl.to(card, { scale: 1, ease: "power2.out", duration: 0.15 }, 0);
//       tl.to(card, { backgroundPositionY: "62%", duration: 1 }, 0);
//       tl.to(overlay, { opacity: 0.42, duration: 0.18 }, 0.1);

//       tl.to(
//         lineTopRef.current,
//         { scaleX: 1, ease: "expo.out", duration: 0.18 },
//         0.18,
//       )
//         .to(
//           lineBottomRef.current,
//           { scaleX: 1, ease: "expo.out", duration: 0.18 },
//           0.24,
//         )
//         .to(
//           [lineTopRef.current, lineBottomRef.current],
//           { opacity: 0, duration: 0.1, ease: "power2.out" },
//           0.56,
//         );

//       tl.to(
//         headingRef.current,
//         { opacity: 1, y: 0, skewY: 0, ease: "expo.out", duration: 0.16 },
//         0.36,
//       );

//       tl.to(
//         paraRef.current,
//         { opacity: 1, y: 0, ease: "power3.out", duration: 0.16 },
//         0.48,
//       );

//       tl.to(
//         btnsRef.current,
//         { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 },
//         0.58,
//       );

//       if (words?.length) {
//         tl.to(
//           words,
//           {
//             y: "0%",
//             skewX: 0,
//             ease: "power4.out",
//             duration: 0.36,
//             stagger: { each: 0.025, from: "start" },
//           },
//           0.64,
//         );
//       }

//       const onScrollEnd = () => {
//         gsap.set([card, overlay], { willChange: "auto" });
//       };
//       ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

//       return () => {
//         ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
//       };
//     },
//     { scope: sectionRef, dependencies: [shouldInit] },
//   );

//   return (
//     <section
//       ref={sectionRef}
//       id="arena"
//       className="
//         relative flex items-center justify-center
//         bg-white 
//         p-7
//         h-screen
//         max-[920px]:px-[14px] max-[920px]:pb-[14px] max-[920px]:pt-[48px]
//       "
//       style={{ transform: "translateZ(0)" }}
//     >
//       {/* ── Card ── */}
//       <div
//         ref={cardRef}
//         className="
//           relative mx-auto overflow-hidden
//           w-full max-w-[1580px] rounded-[32px]
//           h-[calc(100vh-56px)]
//           max-[640px]:rounded-[22px]
//         "
//         style={{
//           backgroundImage: "url('/images/sportsarena.webp')",
//           backgroundSize: "cover",
//           backgroundPosition: "center 40%",
//           willChange: "transform",
//           backfaceVisibility: "hidden",
//           WebkitBackfaceVisibility: "hidden",
//         }}
//       >
//         {/* Overlay */}
//         <div
//           ref={overlayRef}
//           className="absolute inset-0 rounded-[32px] max-[640px]:rounded-[22px]"
//           style={{
//             background: "black",
//             willChange: "opacity",
//             backfaceVisibility: "hidden",
//           }}
//         />

//         {/* Slice lines */}
//         <div
//           ref={lineTopRef}
//           className="absolute z-10 left-0 right-0 h-[1px] bg-white/25"
//           style={{ top: "28%" }}
//         />
//         <div
//           ref={lineBottomRef}
//           className="absolute z-10 left-0 right-0 h-[1px] bg-white/25"
//           style={{ top: "72%" }}
//         />

//         {/* Word-by-word outline reveal */}
//         <div
//           ref={outlineRef}
//           className="
//     pointer-events-none select-none
//     absolute z-20 bottom-[-60px]
//     left-1/2 -translate-x-1/2       
//     font-display leading-[0.88] text-transparent
//     text-[clamp(7.2rem,13.2vw,14rem)] tracking-[-0.045em]
//     [-webkit-text-stroke:1.6px_white]
//     whitespace-nowrap
//     max-[1000px]:bottom-[-30px]
//     max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
//     max-[640px]:bottom-[-18px] max-[640px]:text-[clamp(2rem,13vw,3.2rem)]
//     max-[640px]:[-webkit-text-stroke:0.5px_white]
//   "
//         >
//           {ARENA_WORDS.map((word, wi) => (
//             <span
//               key={wi}
//               className="inline-block "
//               style={{ verticalAlign: "bottom" }}
//             >
//               {word.split("").map((letter, li) => (
//                 <span
//                   key={li}
//                   className="inline-block "
//                   style={{ verticalAlign: "bottom" }}
//                 >
//                   <span className="a-word inline-block">{letter}</span>
//                 </span>
//               ))}
//               {wi < ARENA_WORDS.length - 1 && (
//                 <span
//                   className="inline-block"
//                   style={{ width: "0.35em" }}
//                   aria-hidden="true"
//                 />
//               )}
//             </span>
//           ))}
//         </div>

//         {/* Content */}
//         <div
//           className="
//             relative z-30
//             px-[110px] pt-[120px] pb-20
//             max-[900px]:px-7 max-[900px]:pt-20 max-[900px]:pb-14
//             max-[640px]:h-full max-[640px]:px-[18px] max-[640px]:py-9
//             max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:justify-center
//           "
//         >
//           <div className="max-w-[460px] max-[640px]:text-center max-[640px]:max-w-full">
//             <h2
//               ref={headingRef}
//               className="
//                 font-display  tracking-[-0.02em] leading-[1.22]
//                 text-[34px] text-white mb-5
//                 max-[640px]:text-[28px]
//               "
//             >
//               A Destination for
//               <br />
//               Sport &amp; Performance
//             </h2>

//             <p
//               ref={paraRef}
//               className="
//                 font-rethink text-[14.5px] leading-[1.75] text-white/80
//                 mb-[34px] max-[640px]:text-[14px] max-[640px]:mb-[26px]
//               "
//             >
//               The ERAM Sports Arena reflects the Trust's long-term commitment to
//               athletics, performance, and community engagement. Designed to host
//               institutional and external events, it marks a new chapter in
//               sports integration.
//             </p>

//             <div ref={btnsRef} className="flex flex-wrap justify-start max-[640px]:justify-center">
//               <button
//                 className="
//                   font-rethink
//                   cursor-pointer
//                   text-white
//                   border border-white
//                   px-6 py-3
//                   rounded-[12px]
//                   transition-all duration-300
//                   hover:bg-white hover:text-[#ae1431]
//                   flex items-center justify-center gap-2
//                 "
//                 onClick={() => router.push("/explore-arena")}
//               >
//                 EXPLORE THE ARENA
//                 <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
//               </button>
//             </div>
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
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

const ARENA_WORDS = ["SPORTS", "ARENA"];

export default function ArenaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const router = useRouter();

  const [shouldInit, setShouldInit] = useState(false);

  // ✅ FIX: `transform: translateZ(0)` mobile-il matram remove
  // cheyyunnu — ith GSAP pin-um mobile-inte dynamic address-bar
  // height change-um koode chernnu, fast reverse-scroll (bottom
  // -> top) cheyyumbo pinned card center-il lock aavathe hidden
  // position-il "stuck" aayi kaanicha bug-inte main karanam ithanu.
  // Desktop-il ee issue illathath kondu desktop-inu transform
  // athe pole nirthiyittundu (ee state client-il mount aayi kazhinju
  // set aavunnath kondu SSR-il desktop-inte transform correct-aayi
  // render aavum, mobile-il matram hydrate-shേsham maattum).
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  useEffect(() => {
    setIsMobileViewport(window.innerWidth < 640);
  }, []);

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
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ✅ Mobile-il matram — bottom -> top fast scroll cheyyumbo
  // address bar show/hide aavunnathu kondu 100vh mid-scroll-il
  // change aavum, athu ScrollTrigger-inte pin calculation confuse
  // cheyyum. normalizeScroll(true) touch-scroll-ne JS-controlled
  // aakki ee jump/glitch kurakkum. Desktop-il ee call nadakkilla.
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    ScrollTrigger.normalizeScroll(true);

    return () => {
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!shouldInit) return;

      const isMobile = window.innerWidth < 640;

      const card = cardRef.current;
      const overlay = overlayRef.current;
      const words = outlineRef.current?.querySelectorAll(".a-word");

      /* ── Initial states ── */
      gsap.set(card, { scale: 1.04, force3D: true });
      gsap.set(overlay, { opacity: 0.88 });

      gsap.set(lineTopRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        force3D: true,
      });
      gsap.set(lineBottomRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        force3D: true,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 56,
        skewY: 1.8,
        force3D: true,
      });
      gsap.set(paraRef.current, { opacity: 0, y: 32, force3D: true });
      gsap.set(btnsRef.current, { opacity: 0, y: 20, force3D: true });

      if (words?.length) {
        gsap.set(words, { y: "100%", skewX: 3, force3D: true });
      }

      /* ── Timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // ✅ Mobile-um Desktop-um "top top" thanne use cheyyunnu.
          // Section full-height (h-screen) aayathu kondu, card
          // flex-centering vazhi thanne visually center-il "lock"
          // aayi kaanikkum — pin-spacer mismatch/jump illathe.
          start: "top top",
          end: isMobile ? "+=160%" : "+=220%",
          scrub: 1.5,
          pin: true,
          // ✅ anticipatePin ella case-ilum (mobile + desktop) 1 aayi
          // vekkunnu - ith illathe, bottom-il ninnu top-ilek fast-aayi
          // scroll cheyyumbo pin correct-aayi engage aavathe center-il
          // lock aavathe povum. fastScrollEnd matram mobile-il off.
          anticipatePin: 1,
          pinSpacing: true,
          // ✅ FIX: Mobile-il fast fling (bottom -> top) cheyyumbo
          // fastScrollEnd false aayirunnathu kondu pin sync issue
          // undayirunnu — card center-il lock aavathe bottom-side
          // hidden position-il "stuck" aayi kaanunna bug. true
          // aakiyathode fast momentum-scroll-inum (any direction)
          // ScrollTrigger accurate-aayi start/end state snap cheyyum.
          // Desktop-inte value already true aayirunnu, so desktop
          // behavior-il maattamilla.
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(card, { scale: 1, ease: "power2.out", duration: 0.15 }, 0);
      tl.to(card, { backgroundPositionY: "62%", duration: 1 }, 0);
      tl.to(overlay, { opacity: 0.42, duration: 0.18 }, 0.1);

      tl.to(
        lineTopRef.current,
        { scaleX: 1, ease: "expo.out", duration: 0.18 },
        0.18,
      )
        .to(
          lineBottomRef.current,
          { scaleX: 1, ease: "expo.out", duration: 0.18 },
          0.24,
        )
        .to(
          [lineTopRef.current, lineBottomRef.current],
          { opacity: 0, duration: 0.1, ease: "power2.out" },
          0.56,
        );

      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, skewY: 0, ease: "expo.out", duration: 0.16 },
        0.36,
      );

      tl.to(
        paraRef.current,
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.16 },
        0.48,
      );

      tl.to(
        btnsRef.current,
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 },
        0.58,
      );

      if (words?.length) {
        tl.to(
          words,
          {
            y: "0%",
            skewX: 0,
            ease: "power4.out",
            duration: 0.36,
            stagger: { each: 0.025, from: "start" },
          },
          0.64,
        );
      }

      const onScrollEnd = () => {
        gsap.set([card, overlay], { willChange: "auto" });
      };
      ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      };
    },
    { scope: sectionRef, dependencies: [shouldInit] },
  );

  return (
    <section
      ref={sectionRef}
      id="arena"
      className="
        relative flex items-center justify-center
        bg-white 
        p-7
        h-screen
        max-[920px]:px-[14px] max-[920px]:pb-[14px] max-[920px]:pt-[48px]
      "
      style={isMobileViewport ? undefined : { transform: "translateZ(0)" }}
    >
      {/* ── Card ── */}
      <div
        ref={cardRef}
        className="
          relative mx-auto overflow-hidden
          w-full max-w-[1580px] rounded-[32px]
          h-[calc(100vh-56px)]
          max-[640px]:rounded-[22px]
        "
        style={{
          backgroundImage: "url('/images/sportsarena.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 rounded-[32px] max-[640px]:rounded-[22px]"
          style={{
            background: "black",
            willChange: "opacity",
            backfaceVisibility: "hidden",
          }}
        />

        {/* Slice lines */}
        <div
          ref={lineTopRef}
          className="absolute z-10 left-0 right-0 h-[1px] bg-white/25"
          style={{ top: "28%" }}
        />
        <div
          ref={lineBottomRef}
          className="absolute z-10 left-0 right-0 h-[1px] bg-white/25"
          style={{ top: "72%" }}
        />

        {/* Word-by-word outline reveal */}
        <div
          ref={outlineRef}
          className="
    pointer-events-none select-none
    absolute z-20 bottom-[-60px]
    left-1/2 -translate-x-1/2       
    font-display leading-[0.88] text-transparent
    text-[clamp(7.2rem,13.2vw,14rem)] tracking-[-0.045em]
    [-webkit-text-stroke:1.6px_white]
    whitespace-nowrap
    max-[1000px]:bottom-[-30px]
    max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
    max-[640px]:bottom-[-18px] max-[640px]:text-[clamp(2rem,13vw,3.2rem)]
    max-[640px]:[-webkit-text-stroke:0.5px_white]
  "
        >
          {ARENA_WORDS.map((word, wi) => (
            <span
              key={wi}
              className="inline-block "
              style={{ verticalAlign: "bottom" }}
            >
              {word.split("").map((letter, li) => (
                <span
                  key={li}
                  className="inline-block "
                  style={{ verticalAlign: "bottom" }}
                >
                  <span className="a-word inline-block">{letter}</span>
                </span>
              ))}
              {wi < ARENA_WORDS.length - 1 && (
                <span
                  className="inline-block"
                  style={{ width: "0.35em" }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="
            relative z-30
            px-[110px] pt-[120px] pb-20
            max-[900px]:px-7 max-[900px]:pt-20 max-[900px]:pb-14
            max-[640px]:h-full max-[640px]:px-[18px] max-[640px]:py-9
            max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:justify-center
          "
        >
          <div className="max-w-[460px] max-[640px]:text-center max-[640px]:max-w-full">
            <h2
              ref={headingRef}
              className="
                font-display  tracking-[-0.02em] leading-[1.22]
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

            <div ref={btnsRef} className="flex flex-wrap justify-start max-[640px]:justify-center">
              <button
                className="
                  font-rethink
                  cursor-pointer
                  text-white
                  border border-white
                  px-6 py-3
                  rounded-[12px]
                  transition-all duration-300
                  hover:bg-white hover:text-[#ae1431]
                  flex items-center justify-center gap-2
                "
                onClick={() => router.push("/explore-arena")}
              >
                EXPLORE THE ARENA
                <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}