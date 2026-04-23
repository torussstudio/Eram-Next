// import { useState } from "react";

// export default function SystemsSection() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [activeCard, setActiveCard] = useState(0);

//   const tabs = [
//     "LEADERSHIP AND\nMANAGEMENT STRUCTURE",
//     "INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE",
//     "INSTITUTIONAL\nSYSTEMS & LEADERSHIP",
//   ];

//   const cardsData = [
//     [
//       { n: "01", t: "Strategic Leadership" },
//       { n: "02", t: "Governance Model" },
//       { n: "03", t: "Organizational Clarity" },
//     ],

//     [
//       { n: "01", t: "Campus Facilities" },
//       { n: "02", t: "Digital Systems" },
//       { n: "03", t: "Operational Flow" },
//     ],

//     [
//       { n: "01", t: "Strategic Leadership" },
//       { n: "02", t: "Structured Academics" },
//       { n: "03", t: "Operational Excellence" },
//     ],
//   ];

//   const cards = cardsData[activeTab];

//   return (
//     <section id="facilities" className="bg-[#f5efe8] py-[90px] overflow-hidden">
//       {/* tabs */}

//       <div className="flex justify-center mb-[70px] px-[20px]">
//         <div
//           className="

// relative

// flex

// gap-[160px]

// border-b-[4px]
// border-[#e5e5e5]

// max-[900px]:gap-[14px]
// max-[900px]:border-0

// max-[900px]:overflow-x-auto
// max-[900px]:scrollbar-hide

// "
//         >
//           {tabs.map((item, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 setActiveTab(i);
//                 setActiveCard(0);
//               }}
//               className="

// relative

// pb-[18px]

// text-[18px]
// font-medium

// tracking-[0.12em]

// uppercase

// whitespace-nowrap

// transition-all
// duration-300

// max-[900px]:rounded-full
// max-[900px]:border

// max-[900px]:px-[16px]
// max-[900px]:py-[10px]

// max-[900px]:text-[12px]

// "
//               style={{
//                 color: activeTab === i ? "#ae1431" : "#777",

//                 borderColor: activeTab === i ? "#ae1431" : "#ddd",
//               }}
//             >
//               {item.split("\n").map((line, index) => (
//                 <span key={index} className="block">
//                   {line}
//                 </span>
//               ))}

//               {activeTab === i && (
//                 <span
//                   className="

// absolute

// left-0
// right-0

// -bottom-[4px]

// h-[6px]

// rounded-t-full

// bg-[#ae1431]

// "
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* content */}

//     <div

// className="

// mx-auto

// w-[min(1200px,calc(100vw-120px))]

// flex
// items-start

// gap-[80px]

// max-[900px]:flex-col
// max-[900px]:gap-[35px]

// "
// >
//         {/* text */}

//        <div className="max-w-[420px] ml-[40px] max-[900px]:ml-0">
//           <h2
//             className="

// font-display

// mb-[24px]

// text-[42px]

// font-black

// leading-[1.1]

// text-[#111]

// max-[900px]:text-[28px]
// max-[900px]:font-semibold

// "
//           >
//             Systems That
//             <br />
//             Sustain Excellence
//           </h2>

//           <p
//             className="

// text-[13.5px]

// leading-[1.8]

// text-black

// max-[900px]:text-[14px]

// "
//           >
//             An integrated framework of management oversight, faculty excellence,
//             and purpose-built infrastructure sustaining quality across every
//             institution, ensuring continuous assessment, teacher development,
//             institutional monitoring, and transparent processes.
//           </p>
//         </div>

//         {/* cards */}

//         <div className="w-[620px] overflow-hidden max-[900px]:w-full">
//           <div
//             className="

// flex

// snap-x
// snap-mandatory

// gap-[18px]

// overflow-x-auto

// scroll-smooth

// pb-[20px]

// scrollbar-hide

// max-[900px]:gap-[14px]

// "
//           >
//             {cards.map((card, i) => {
//               const isActive = activeCard === i;

//               return (
//                 <div
//                   key={i}
//                   onClick={() => setActiveCard(i)}
//                   className="

// cursor-pointer

// flex

// h-[220px]
// w-[320px]

// flex-shrink-0

// snap-start

// flex-col
// justify-between

// rounded-[22px]

// p-[34px]

// transition-all
// duration-300

// max-[900px]:h-[190px]
// max-[900px]:w-[260px]

// max-[900px]:p-[24px]

// "
//                   style={{
//                     background: isActive ? "#ae1431" : "white",

//                     border: isActive ? "none" : "1px solid #e2e2e2",
//                   }}
//                 >
//                   <span
//                     style={{
//                       color: isActive ? "#bfbfbf" : "#999",
//                     }}
//                   >
//                     /{card.n}
//                   </span>

//                   <span
//                     className="

// flex
// justify-end

// text-[26px]

// font-medium

// leading-[1.2]

// max-[900px]:text-[20px]

// "
//                     style={{
//                       color: isActive ? "white" : "#111",
//                     }}
//                   >
//                     {card.t.split(" ").map((w, idx) => (
//                       <span key={idx}>
//                         {w}
//                         <br />
//                       </span>
//                     ))}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* button */}

//       <div className="mt-[70px] flex justify-center px-[20px]">
//         <button
//           className="

// rounded-[8px]

// border
// border-[#cfcfcf]

// px-[36px]
// py-[14px]

// text-[12px]

// font-[500]

// uppercase

// tracking-[0.16em]

// text-[#111]

// transition-all
// duration-300

// hover:border-black
// hover:bg-black
// hover:text-white

// max-[900px]:w-full
// max-[900px]:py-[16px]

// "
//         >
//           EXPLORE OUR SYSTEMS & STANDARDS
//         </button>
//       </div>
//     </section>
//   );
// }

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SystemsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef(null);
  const mobCardsRef = useRef(null);
  const mobTextRef = useRef(null);

  const tabs = [
    "LEADERSHIP AND\nMANAGEMENT STRUCTURE",
    "INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE",
    "INSTITUTIONAL\nSYSTEMS & LEADERSHIP",
  ];

  const tabShort = ["Leadership", "Infrastructure", "Institutional"];

  const cardsData = [
    [
      { n: "01", t: "Strategic Leadership" },
      { n: "02", t: "Governance Model" },
      { n: "03", t: "Organizational Clarity" },
    ],
    [
      { n: "01", t: "Campus Facilities" },
      { n: "02", t: "Digital Systems" },
      { n: "03", t: "Operational Flow" },
    ],
    [
      { n: "01", t: "Strategic Leadership" },
      { n: "02", t: "Structured Academics" },
      { n: "03", t: "Operational Excellence" },
    ],
  ];

  const cards = cardsData[activeTab];

  /* ── Mobile: entrance animation on scroll ─────────────────────── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 899px)", () => {
        /* Section header text fade-up */
        gsap.fromTo(
          ".mob-sys-heading",
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
          },
        );
        gsap.fromTo(
          ".mob-sys-para",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.18,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
          },
        );

        /* Tab bar slide down */
        gsap.fromTo(
          ".mob-tab-bar",
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          },
        );

        /* Cards stagger on scroll */
        gsap.fromTo(
          ".mob-sys-card",
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".mob-sys-cards", start: "top 88%" },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  /* ── Mobile: re-animate cards on tab switch ───────────────────── */
  useEffect(() => {
    if (window.innerWidth >= 900) return;
    const cards = document.querySelectorAll(".mob-sys-card");
    gsap.fromTo(
      cards,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
    );
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="bg-[#f5efe8] py-[90px] overflow-hidden"
    >
      {/* ════════════════════════════════════════════════════════════
          DESKTOP ≥ 900px — original layout, ZERO changes
      ════════════════════════════════════════════════════════════ */}
      <div className="hidden min-[900px]:block">
        {/* tabs */}
        <div className="flex justify-center mb-[70px] px-[20px]">
          <div className="relative flex gap-[160px] border-b-[4px] border-[#e5e5e5]">
            {tabs.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setActiveCard(0);
                }}
                className="relative pb-[18px] text-[18px] font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300"
                style={{ color: activeTab === i ? "#ae1431" : "#777" }}
              >
                {item.split("\n").map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
                {activeTab === i && (
                  <span className="absolute left-0 right-0 -bottom-[4px] h-[6px] rounded-t-full bg-[#ae1431]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* content */}
        <div className="mx-auto w-[min(1200px,calc(100vw-120px))] flex items-start gap-[80px]">
          {/* text */}
          <div className="max-w-[420px] ml-[40px]">
            <h2 className="font-display mb-[24px] text-[42px] font-black leading-[1.1] text-[#111]">
              Systems That
              <br />
              Sustain Excellence
            </h2>
            <p className="text-[13.5px] leading-[1.8] text-black">
              An integrated framework of management oversight, faculty
              excellence, and purpose-built infrastructure sustaining quality
              across every institution, ensuring continuous assessment, teacher
              development, institutional monitoring, and transparent processes.
            </p>
          </div>

          {/* cards */}
          <div className="w-[620px] overflow-hidden">
            <div className="flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth pb-[20px] scrollbar-hide">
              {cards.map((card, i) => {
                const isActive = activeCard === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className="cursor-pointer flex h-[220px] w-[320px] flex-shrink-0 snap-start flex-col justify-between rounded-[22px] p-[34px] transition-all duration-300"
                    style={{
                      background: isActive ? "#ae1431" : "white",
                      border: isActive ? "none" : "1px solid #e2e2e2",
                    }}
                  >
                    <span style={{ color: isActive ? "#bfbfbf" : "#999" }}>
                      /{card.n}
                    </span>
                    <span
                      className="flex justify-end text-[26px] font-medium leading-[1.2]"
                      style={{ color: isActive ? "white" : "#111" }}
                    >
                      {card.t.split(" ").map((w, idx) => (
                        <span key={idx}>
                          {w}
                          <br />
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* button */}
        <div className="mt-[70px] flex justify-center px-[20px]">
          <button className="rounded-[8px] border border-[#cfcfcf] px-[36px] py-[14px] text-[12px] font-[500] uppercase tracking-[0.16em] text-[#111] transition-all duration-300 hover:border-black hover:bg-black hover:text-white">
            EXPLORE OUR SYSTEMS & STANDARDS
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE < 900px — redesigned layout + advanced animations
      ════════════════════════════════════════════════════════════ */}
      <div className="min-[900px]:hidden px-[22px]">
        {/* ── Section header ─────────────────────────────────────── */}
        <div className="mb-[32px]">
          <h2 className="mob-sys-heading font-display text-[32px] font-black leading-[1.12] text-[#111] mb-[14px]">
            Systems That
            <br />
            Sustain Excellence
          </h2>
          <p className="mob-sys-para text-[13.5px] leading-[1.8] text-[#444] max-w-[420px]">
            An integrated framework of management oversight, faculty excellence,
            and purpose-built infrastructure sustaining quality across every
            institution, ensuring continuous assessment, teacher development,
            institutional monitoring, and transparent processes.
          </p>
        </div>

        {/* ── Numbered tab selector ──────────────────────────────── */}
        <div className="mob-tab-bar flex gap-[8px] mb-[28px]">
          {tabShort.map((label, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveTab(i);
                setActiveCard(0);
              }}
              className="flex-1 flex flex-col items-start gap-[6px] rounded-[14px] px-[14px] py-[12px] transition-all duration-300 border"
              style={{
                background: activeTab === i ? "#ae1431" : "transparent",
                borderColor: activeTab === i ? "#ae1431" : "#ddd",
              }}
            >
              <span
                className="text-[10px] font-semibold tracking-[0.18em]"
                style={{
                  color: activeTab === i ? "rgba(255,255,255,0.55)" : "#aaa",
                }}
              >
                0{i + 1}
              </span>
              <span
                className="text-[11px] font-medium leading-[1.3] tracking-[0.04em] text-left"
                style={{ color: activeTab === i ? "white" : "#555" }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Cards — full-width stacked list ────────────────────── */}
        <div className="mob-sys-cards flex flex-col gap-[10px] mb-[32px]">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
              <div
                key={`${activeTab}-${i}`}
                onClick={() => setActiveCard(i)}
                className="mob-sys-card flex items-center justify-between rounded-[18px] px-[22px] py-[20px] cursor-pointer transition-all duration-300 border"
                style={{
                  background: isActive ? "#ae1431" : "white",
                  borderColor: isActive ? "#ae1431" : "#e8e8e8",
                  boxShadow: isActive
                    ? "0 8px 32px rgba(174,20,49,0.22)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* left — number + title */}
                <div className="flex items-center gap-[18px]">
                  <span
                    className="text-[11px] font-semibold tracking-[0.16em] tabular-nums w-[26px]"
                    style={{
                      color: isActive ? "rgba(255,255,255,0.45)" : "#bbb",
                    }}
                  >
                    /{card.n}
                  </span>
                  <span
                    className="text-[17px] font-semibold leading-[1.25]"
                    style={{ color: isActive ? "white" : "#111" }}
                  >
                    {card.t}
                  </span>
                </div>

                {/* right — active indicator arrow */}
                <div
                  className="flex-shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.18)" : "#f2f2f2",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path
                      d="M2 6h8M6 2l4 4-4 4"
                      stroke={isActive ? "white" : "#888"}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Button ─────────────────────────────────────────────── */}
        <button className="w-full rounded-[14px] border border-[#cfcfcf] py-[16px] text-[11px] font-[600] uppercase tracking-[0.18em] text-[#111] transition-all duration-300 active:bg-black active:text-white active:border-black">
          EXPLORE OUR SYSTEMS & STANDARDS
        </button>
      </div>
    </section>
  );
}
