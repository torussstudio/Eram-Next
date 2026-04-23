// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { section, shell } from "../../../constants/homeStyles";

// gsap.registerPlugin(ScrollTrigger);

// const impactItems = [
//   { code: "/01", title: "Free & subsidised education" },
//   { code: "/02", title: "Healthcare Outreach" },
//   { code: "/03", title: "Community Resilience" },
//   { code: "/04", title: "Student Pathways" },
//   { code: "/05", title: "Youth Development" },
//   { code: "/06", title: "Skills Training" },
// ];

// // Curtain word-split component
// function SplitHeading({ text, className }) {
//   return (
//     <h2 className={className}>
//       {text.split(" ").map((word, i) => (
//         <span
//           key={i}
//           className="inline-block overflow-hidden leading-[1.15] mr-[0.22em]"
//         >
//           <span className="split-word inline-block">{word}</span>
//         </span>
//       ))}
//     </h2>
//   );
// }

// export default function ImpactSection() {
//   const sectionRef = useRef(null);

//   useGSAP(
//     () => {
//       const root = sectionRef.current;

//       /* ─── 1. TOP SECTION TIMELINE ─── */
//       const topTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: root,
//           start: "top 78%",
//           once: true,
//         },
//       });

//       // Word curtain reveal
//       topTl.fromTo(
//         root.querySelectorAll(".split-word"),
//         { y: "105%", rotate: 3 },
//         {
//           y: "0%",
//           rotate: 0,
//           duration: 0.75,
//           stagger: 0.07,
//           ease: "power3.out",
//         }
//       );

//       // Images bloom in
//       topTl.fromTo(
//         ".img-left",
//         { x: -50, opacity: 0, scale: 0.92 },
//         { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
//         "-=0.55"
//       );
//       topTl.fromTo(
//         ".img-right",
//         { x: 50, opacity: 0, scale: 0.92 },
//         { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
//         "-=0.75"
//       );

//       // Paragraphs
//       topTl.fromTo(
//         root.querySelectorAll(".para-anim"),
//         { y: 22, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, stagger: 0.13, ease: "power2.out" },
//         "-=0.5"
//       );

//       // Button
//       topTl.fromTo(
//         root.querySelector(".btn-anim"),
//         { y: 18, opacity: 0, scale: 0.94 },
//         {
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 0.55,
//           ease: "back.out(1.7)",
//         },
//         "-=0.3"
//       );

//       /* ─── 2. CARDS SECTION TIMELINE ─── */
//       const cardsTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: root.querySelector(".cards-section"),
//           start: "top 82%",
//           once: true,
//         },
//       });

//       // "Key Areas" heading — letter-spacing collapses in
//       cardsTl.fromTo(
//         root.querySelector(".key-areas-heading"),
//         { letterSpacing: "0.45em", opacity: 0, y: 18 },
//         {
//           letterSpacing: "0.18em",
//           opacity: 1,
//           y: 0,
//           duration: 0.9,
//           ease: "power2.out",
//         }
//       );

//       // Vertical lines draw down (scaleY: 0 → 1)
//       cardsTl.fromTo(
//         root.querySelectorAll(".card-line"),
//         { scaleY: 0, transformOrigin: "top center" },
//         {
//           scaleY: 1,
//           duration: 0.55,
//           stagger: 0.08,
//           ease: "power2.inOut",
//         },
//         "-=0.4"
//       );

//       // Card codes fade in
//       cardsTl.fromTo(
//         root.querySelectorAll(".card-code"),
//         { opacity: 0, x: -10 },
//         { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" },
//         "-=0.35"
//       );

//       // Card titles slide up
//       cardsTl.fromTo(
//         root.querySelectorAll(".card-title"),
//         { y: 20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" },
//         "-=0.4"
//       );
//     },
//     { scope: sectionRef }
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className={`${section} bg-[#ae1431]`}
//       id="impact"
//     >
//       {/* ── TOP LAYOUT ── */}
//       <div
//         className={`
//           ${shell}
//           grid grid-cols-[1.05fr_0.95fr]
//           max-[1100px]:grid-cols-1
//         `}
//       >
//         {/* Images */}
//         <div
//           className="
//             grid grid-cols-[0.85fr_1.15fr] gap-[26px]
//             items-end pt-[10px] ml-[200px]
//             max-[640px]:grid-cols-1 max-[640px]:justify-items-center
//           "
//         >
//           <div
//             className="
//               img-left
//               h-[200px] w-[300px] rounded-[28px] bg-white
//               max-[640px]:w-full max-[640px]:max-w-[320px]
//             "
//           />
//           <div
//             className="
//               img-right
//               h-[300px] w-[300px] rounded-[28px] bg-[#f5efe8]
//               max-[640px]:w-full max-[640px]:max-w-[320px]
//             "
//           />
//         </div>

//         {/* Text */}
//         <div
//           className="
//             max-w-[480px] pt-[25px] pl-[50px]
//             max-[1100px]:pl-0 max-[1100px]:pt-[36px]
//           "
//         >
//           <SplitHeading
//             text="In Service Of Society"
//             className="
//               text-[42px] leading-[1.12] font-[600]
//               text-[#f5efe8] mb-[18px] max-[640px]:text-[34px]
//             "
//           />

//           <p className="para-anim text-[15px] leading-[1.75] text-[#f5efe8] mb-[14px]">
//             ERAM Educational & Welfare Trust advances social equity through
//             structured CSR initiatives focused on educational access, healthcare
//             outreach, and community resilience.
//           </p>

//           <p className="para-anim text-[15px] leading-[1.75] text-[#f5efe8] mb-[28px] max-[640px]:text-[14px]">
//             While education remains its core mission, the Trust extends its
//             responsibility through targeted social initiatives supporting
//             underprivileged communities.
//           </p>

//           <button
//             className="
//               btn-anim
//               h-[44px] px-[22px] text-[13px] rounded-[10px]
//               border border-[#f5efe8] bg-[#f5efe8]
//               text-[#ae1431] transition max-[640px]:w-full
//             "
//           >
//             EXPLORE STUDENT PATHWAYS
//           </button>
//         </div>
//       </div>

//       {/* ── CARDS SECTION ── */}
//       <div className="cards-section mt-[90px] max-[640px]:mt-[64px]">
//         {/* Heading */}
//         <p
//           className="
//             key-areas-heading
//             text-center text-[28px] uppercase text-[#f5efe8]
//             tracking-[0.18em] mb-[60px]
//             max-[900px]:text-[24px]
//             max-[640px]:mb-[38px] max-[640px]:text-[18px]
//           "
//         >
//           Key Areas Of Impact Include:
//         </p>

//         {/* ✅ Native CSS horizontal scroll — no GSAP pin, 100% smooth */}
//         <div
//           className="
//             mx-auto
//             w-[min(1100px,calc(100vw-160px))]
//             overflow-x-auto
//             scroll-smooth
//             snap-x snap-mandatory
//             [scrollbar-width:none]
//             [&::-webkit-scrollbar]:hidden
//             pb-[20px]
//           "
//         >
//           <div className="flex gap-[20px] px-[32px]">
//             {impactItems.map((item) => (
//               <div
//                 key={item.code}
//                 className="
//                   relative w-[350px] flex-none snap-start
//                   pl-[26px] pr-[26px] min-h-[120px]
//                   flex flex-col justify-end
//                   max-[640px]:min-h-[94px]
//                 "
//               >
//                 {/* Line draws down */}
//                 <div
//                   className="
//                     card-line
//                     absolute left-0 top-0
//                     h-[225px] w-[2px] bg-[#f5efe8]
//                     max-[640px]:h-[160px]
//                   "
//                 />

//                 <span
//                   className="
//                     card-code
//                     text-[25px] tracking-[0.16em] text-[#f5efe8]
//                     mb-[70px]
//                     max-[640px]:mb-[44px] max-[640px]:text-[20px]
//                   "
//                 >
//                   {item.code}
//                 </span>

//                 <p
//                   className="
//                     card-title
//                     text-[25px] leading-[1.3] text-[#f5efe8]
//                     mt-[50px]
//                     max-[640px]:mt-[28px] max-[640px]:text-[20px]
//                   "
//                 >
//                   {item.title}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { section, shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

const impactItems = [
  { code: "/01", title: "Free & subsidised education" },
  { code: "/02", title: "Healthcare Outreach" },
  { code: "/03", title: "Community Resilience" },
  { code: "/04", title: "Student Pathways" },
  { code: "/05", title: "Youth Development" },
  { code: "/06", title: "Skills Training" },
];

function SplitHeading({ text, className }) {
  return (
    <h2 className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden leading-[1.15] mr-[0.22em]"
        >
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

export default function ImpactSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const isMobile = window.innerWidth <= 640;

      /* ─── 1. TOP SECTION TIMELINE ─── */
      const topTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });

      // Word curtain reveal — same on both
      topTl.fromTo(
        root.querySelectorAll(".split-word"),
        { y: "105%", rotate: 3 },
        {
          y: "0%",
          rotate: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
        }
      );

      if (!isMobile) {
        // Desktop image animations (unchanged)
        topTl.fromTo(
          ".img-left",
          { x: -50, opacity: 0, scale: 0.92 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.55"
        );
        topTl.fromTo(
          ".img-right",
          { x: 50, opacity: 0, scale: 0.92 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.75"
        );
      } else {
        // Mobile: images scale + fade in with stagger
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
          "-=0.45"
        );
      }

      // Paragraphs
      topTl.fromTo(
        root.querySelectorAll(".para-anim"),
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.13, ease: "power2.out" },
        "-=0.5"
      );

      // Button
      topTl.fromTo(
        root.querySelector(".btn-anim"),
        { y: 18, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" },
        "-=0.3"
      );

      /* ─── 2. CARDS SECTION TIMELINE ─── */
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector(".cards-section"),
          start: "top 82%",
          once: true,
        },
      });

      if (!isMobile) {
        // Desktop cards (unchanged)
        cardsTl.fromTo(
          root.querySelector(".key-areas-heading"),
          { letterSpacing: "0.45em", opacity: 0, y: 18 },
          { letterSpacing: "0.18em", opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
        );
        cardsTl.fromTo(
          root.querySelectorAll(".card-line"),
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 0.55, stagger: 0.08, ease: "power2.inOut" },
          "-=0.4"
        );
        cardsTl.fromTo(
          root.querySelectorAll(".card-code"),
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" },
          "-=0.35"
        );
        cardsTl.fromTo(
          root.querySelectorAll(".card-title"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" },
          "-=0.4"
        );
      } else {
        // Mobile cards: heading + stagger scale pop
        cardsTl.fromTo(
          root.querySelector(".key-areas-heading"),
          { opacity: 0, y: 20, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }
        );
        cardsTl.fromTo(
          root.querySelectorAll(".card-line"),
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 0.4, stagger: 0.07, ease: "power2.inOut" },
          "-=0.25"
        );
        cardsTl.fromTo(
          root.querySelectorAll(".card-code"),
          { opacity: 0, scale: 0.8, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.38, stagger: 0.07, ease: "back.out(1.8)" },
          "-=0.3"
        );
        cardsTl.fromTo(
          root.querySelectorAll(".card-title"),
          { opacity: 0, scale: 0.85, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "back.out(1.7)" },
          "-=0.35"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`${section} bg-[#ae1431]`}
      id="impact"
    >

      {/* ════════════════════════════════════
          DESKTOP TOP LAYOUT  — unchanged
      ════════════════════════════════════ */}
      <div
        className={`
          ${shell}
          grid grid-cols-[1.05fr_0.95fr]
          max-[1100px]:grid-cols-1
          max-[640px]:hidden
        `}
      >
        <div
          className="
            grid grid-cols-[0.85fr_1.15fr] gap-[26px]
            items-end pt-[10px] ml-[200px]
          "
        >
          <div className="img-left h-[200px] w-[300px] rounded-[28px] bg-white" />
          <div className="img-right h-[300px] w-[300px] rounded-[28px] bg-[#f5efe8]" />
        </div>

        <div className="max-w-[480px] pt-[25px] pl-[50px] max-[1100px]:pl-0 max-[1100px]:pt-[36px]">
          <SplitHeading
            text="In Service Of Society"
            className="text-[42px] leading-[1.12] font-[600] text-[#f5efe8] mb-[18px]"
          />
          <p className="para-anim text-[15px] leading-[1.75] text-[#f5efe8] mb-[14px]">
            ERAM Educational &amp; Welfare Trust advances social equity through
            structured CSR initiatives focused on educational access, healthcare
            outreach, and community resilience.
          </p>
          <p className="para-anim text-[15px] leading-[1.75] text-[#f5efe8] mb-[28px]">
            While education remains its core mission, the Trust extends its
            responsibility through targeted social initiatives supporting
            underprivileged communities.
          </p>
          <button
            className="
              btn-anim h-[44px] px-[22px] text-[13px] rounded-[10px]
              border border-[#f5efe8] bg-[#f5efe8]
              text-[#ae1431] transition
            "
          >
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
          MOBILE TOP LAYOUT
          — images side by side (offset for depth)
          — text block below
          — nothing hidden, everything visible
      ════════════════════════════════════ */}
      <div className="hidden max-[640px]:flex flex-col gap-[32px] px-[20px] pt-[44px]">

        {/* Two images side by side with vertical offset for depth */}
        <div className="flex items-end gap-[12px] w-full">
          <div
            className="
              mob-img flex-1 rounded-[20px] bg-white
              h-[160px]
            "
          />
          <div
            className="
              mob-img flex-1 rounded-[20px] bg-[#f5efe8]
              h-[200px]
            "
          />
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-[14px]">
          <SplitHeading
            text="In Service Of Society"
            className="text-[28px] leading-[1.15] font-[600] text-[#f5efe8]"
          />
          <p className="para-anim text-[14px] leading-[1.8] text-[#f5efe8] opacity-90">
            ERAM Educational &amp; Welfare Trust advances social equity through
            structured CSR initiatives focused on educational access, healthcare
            outreach, and community resilience.
          </p>
          <p className="para-anim text-[14px] leading-[1.8] text-[#f5efe8] opacity-90">
            While education remains its core mission, the Trust extends its
            responsibility through targeted social initiatives supporting
            underprivileged communities.
          </p>
          <button
            className="
              btn-anim mt-[4px]
              h-[46px] w-full rounded-[12px]
              border border-[#f5efe8] bg-[#f5efe8]
              text-[#ae1431] text-[12px] tracking-[0.08em] font-[500]
              transition active:scale-[0.97]
            "
          >
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
          DESKTOP CARDS — unchanged
      ════════════════════════════════════ */}
      <div className="cards-section mt-[90px] max-[640px]:hidden">
        <p
          className="
            key-areas-heading
            text-center text-[28px] uppercase text-[#f5efe8]
            tracking-[0.18em] mb-[60px]
            max-[900px]:text-[24px]
          "
        >
          Key Areas Of Impact Include:
        </p>

        <div
          className="
            mx-auto
            w-[min(1100px,calc(100vw-160px))]
            overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            pb-[20px]
          "
        >
          <div className="flex gap-[20px] px-[32px]">
            {impactItems.map((item) => (
              <div
                key={item.code}
                className="
                  relative w-[350px] flex-none snap-start
                  pl-[26px] pr-[26px] min-h-[120px]
                  flex flex-col justify-end
                "
              >
                <div className="card-line absolute left-0 top-0 h-[225px] w-[2px] bg-[#f5efe8]" />
                <span className="card-code text-[25px] tracking-[0.16em] text-[#f5efe8] mb-[70px]">
                  {item.code}
                </span>
                <p className="card-title text-[25px] leading-[1.3] text-[#f5efe8] mt-[50px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          MOBILE CARDS
          — same horizontal scroll as desktop
          — cards scaled to mobile width (200px)
          — stagger scale-pop animation
          — scroll hint dots below
      ════════════════════════════════════ */}
      <div className="hidden max-[640px]:block cards-section mt-[52px] pb-[52px]">
        <p
          className="
            key-areas-heading
            text-center text-[14px] uppercase text-[#f5efe8]
            tracking-[0.22em] mb-[32px] px-[20px]
          "
        >
          Key Areas Of Impact Include:
        </p>

        <div
          className="
            overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            pb-[16px]
          "
        >
          <div className="flex gap-[16px] px-[20px] pr-[20px]">
            {impactItems.map((item) => (
              <div
                key={item.code}
                className="
                  relative flex-none snap-start
                  w-[190px]
                  pl-[20px] pr-[12px]
                  min-h-[170px]
                  flex flex-col justify-end
                  pb-[4px]
                "
              >
                {/* Vertical line */}
                <div
                  className="
                    card-line
                    absolute left-0 top-0
                    h-[170px] w-[2px] bg-[#f5efe8]
                  "
                />

                {/* Code */}
                <span
                  className="
                    card-code
                    text-[15px] tracking-[0.16em] text-[#f5efe8]
                    mb-[40px]
                  "
                >
                  {item.code}
                </span>

                {/* Title */}
                <p
                  className="
                    card-title
                    text-[15px] leading-[1.35] text-[#f5efe8]
                    mt-[24px]
                  "
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>

    </section>
  );
}