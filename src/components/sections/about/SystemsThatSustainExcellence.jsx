// import { memo, useRef } from "react";
// import OptimizedImage from "../../ui/OptimizedImage";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function SystemsThatSustainExcellence() {
//   const containerRef = useRef(null);

//   const items = [
//     {
//       number: "/01",
//       title: (
//         <>
//           Teacher
//           <br />
//           development
//           <br />
//           programs
//         </>
//       ),
//     },
//     {
//       number: "/02",
//       title: (
//         <>
//           CBSE & State
//           <br />
//           Board training
//           <br />
//           workshops
//         </>
//       ),
//     },
//     {
//       number: "/03",
//       title: (
//         <>
//           WHO-certified
//           <br />
//           teacher training
//           <br />
//           initiatives
//         </>
//       ),
//     },
//     {
//       number: "/04",
//       title: (
//         <>
//           Observation
//           <br />
//           based evaluation
//           <br />
//           systems
//         </>
//       ),
//     },
//     {
//       number: "/05",
//       title: (
//         <>
//           SQAAF and
//           <br />
//           quality assessment
//           <br />
//           frameworks
//         </>
//       ),
//     },
//     {
//       number: "/06",
//       title: (
//         <>
//           Institutional
//           <br />
//           improvement
//           <br />
//           committees
//         </>
//       ),
//     },
//     {
//       number: "/07",
//       title: (
//         <>
//           Curriculum
//           <br />
//           alignment
//           <br />
//           reviews
//         </>
//       ),
//     },
//   ];

//   useGSAP(
//     () => {
//       // Heading
//       gsap.to(".systems-text", {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 75%",
//         },
//       });

//       // Features grid
//       gsap.to(".system-item", {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".system-grid",
//           start: "top 80%",
//         },
//       });

//       // Image container reveal
//       gsap.to(".system-img-wrap", {
//         scale: 1,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".system-img-wrap",
//           start: "top 85%",
//         },
//       });

//       // Image parallax scrub - optimized
//       gsap.to(".system-img", {
//         yPercent: 10,
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".system-img-wrap",
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//           fastScrollEnd: true,
//         },
//       });

//       // Image overlay description
//       gsap.to(".system-desc", {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".system-img-wrap",
//           start: "top 60%",
//         },
//       });
//     },
//     { scope: containerRef },
//   );

//   return (
//     <section ref={containerRef} className="bg-[#F5EFE8] py-24 px-6">
//       <div className="max-w-[1200px] mx-auto">
//         {/* heading */}
//         <div className="text-center max-w-[720px] mx-auto">
//           <h2
//             className="
// systems-text
// opacity-0 translate-y-8
// font-display

// text-[34px]
// md:text-[44px]

// font-semibold

// leading-tight

// text-black
// "
//           >
//             Systems That Sustain Excellence
//           </h2>

//           <p
//             className="
// systems-text
// opacity-0 translate-y-8
// mt-4

// text-[15px]

// text-black/70

// leading-relaxed
// "
//           >
//             Sustained academic performance requires consistent faculty
//             development and institutional review mechanisms. ERAM integrates
//             comprehensive academic systems, including:
//           </p>
//         </div>

//         {/* features */}
//         <div
//           className="
// system-grid
// mt-20

// grid
// grid-cols-2
// md:grid-cols-4

// gap-y-14
// gap-x-10
// "
//         >
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="
// system-item
// opacity-0 translate-y-10
// relative

// pl-6

// border-l
// border-black/30

// min-h-[140px]
// md:min-h-[170px]
// "
//             >
//               <p
//                 className="
// text-[18px]

// text-black/70

// mb-6
// "
//               >
//                 {item.number}
//               </p>

//               <p
//                 className="
// mt-17

// text-[20px]

// font-medium

// leading-[1.35]

// text-black
// "
//               >
//                 {item.title}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* image block */}
//         <div className="mt-20">
//           <div
//             className="
// system-img-wrap
// opacity-0 scale-[0.95]
// relative

// rounded-[26px]

// overflow-hidden
// transform-gpu
// h-[320px] md:h-[480px]
// "
//           >
//             <div className="system-img w-full h-[115%] absolute -top-[7.5%]">
//               <OptimizedImage
//                 src="/images/campus.webp"
//                 alt="campus"
//                 className="w-full h-full object-cover block"
//                 sizes="100vw"
//                 disableTransition
//               />
//             </div>

//             <div
//               className="
// absolute
// inset-0

// bg-black/35
// "
//             />

//             <p
//               className="
// system-desc
// opacity-0 translate-y-5
// absolute

// inset-0

// flex
// items-center
// justify-center

// px-6

// text-center

// text-white

// text-[18px]
// md:text-[22px]

// leading-relaxed

// max-w-[760px]

// mx-auto
// "
//             >
//               These systems ensure that faculty remain professionally equipped,
//               students receive guided mentorship, and institutional standards
//               are maintained across all campuses.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
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
  {
    number: "01",
    title: "Teacher\ndevelopment\nprograms",
  },
  {
    number: "02",
    title: "CBSE & State\nBoard training\nworkshops",
  },
  {
    number: "03",
    title: "WHO-certified\nteacher training\ninitiatives",
  },
  {
    number: "04",
    title: "Observation\nbased evaluation\nsystems",
  },
  {
    number: "05",
    title: "SQAAF and\nquality assessment\nframeworks",
  },
  {
    number: "06",
    title: "Institutional\nimprovement\ncommittees",
  },
  {
    number: "07",
    title: "Curriculum\nalignment\nreviews",
  },
];

function SystemsThatSustainExcellence() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── SHARED: heading reveal (both breakpoints) ──────────────────────
      mm.add("all", () => {
        // Eyebrow line draws in
        gsap.fromTo(
          ".systems-eyebrow-line",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
            },
          }
        );

        // Heading words stagger with clip-path curtain
        gsap.fromTo(
          ".systems-heading-word",
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
            },
          }
        );

        // Subtext fade up
        gsap.fromTo(
          ".systems-subtext",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
            },
          }
        );
      });

      // ── DESKTOP (md+) ──────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        // Grid items — stagger reveal from bottom with slight rotation
        gsap.fromTo(
          ".system-item",
          { y: 50, opacity: 0, rotateX: 8, transformPerspective: 800 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: {
              amount: 0.7,
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".system-grid",
              start: "top 80%",
            },
          }
        );

        // Number counter lines — draw down
        gsap.fromTo(
          ".system-item-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".system-grid",
              start: "top 80%",
            },
          }
        );

        // Image block — scale reveal
        gsap.fromTo(
          ".system-img-wrap",
          { scale: 0.93, opacity: 0, borderRadius: "40px" },
          {
            scale: 1,
            opacity: 1,
            borderRadius: "26px",
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".system-img-wrap",
              start: "top 85%",
            },
          }
        );

        // Image parallax scrub
        gsap.to(".system-img", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".system-img-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            fastScrollEnd: true,
          },
        });

        // Overlay text reveal
        gsap.fromTo(
          ".system-desc",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".system-img-wrap",
              start: "top 58%",
            },
          }
        );

        // Caption tag on image
        gsap.fromTo(
          ".system-img-tag",
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".system-img-wrap",
              start: "top 55%",
            },
          }
        );
      });

      // ── MOBILE (<768px) — different, richer animations ─────────────────
      mm.add("(max-width: 767px)", () => {
        // Items — each slides in from left with a stagger
        gsap.fromTo(
          ".system-item",
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".system-grid",
              start: "top 85%",
            },
          }
        );

        // Vertical lines on items — draw down
        gsap.fromTo(
          ".system-item-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".system-grid",
              start: "top 85%",
            },
          }
        );

        // Image — clip-path wipe from bottom
        gsap.fromTo(
          ".system-img-wrap",
          { clipPath: "inset(100% 0% 0% 0% round 26px)", opacity: 1 },
          {
            clipPath: "inset(0% 0% 0% 0% round 26px)",
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".system-img-wrap",
              start: "top 88%",
            },
          }
        );

        // Lighter parallax on mobile
        gsap.to(".system-img", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".system-img-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        // Overlay text — blur in
        gsap.fromTo(
          ".system-desc",
          { filter: "blur(6px)", opacity: 0, y: 16 },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".system-img-wrap",
              start: "top 62%",
            },
          }
        );

        // Tag
        gsap.fromTo(
          ".system-img-tag",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".system-img-wrap",
              start: "top 60%",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#F5EFE8] overflow-hidden
        py-20 px-5
        md:py-28 md:px-6"
    >
      <div className="w-full md:max-w-[1200px] md:mx-auto">

        {/* ══════════════════════════════
            HEADING BLOCK
        ══════════════════════════════ */}
        <div className="text-center max-w-[720px] mx-auto">

          {/* Eyebrow — animated underline */}
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

          {/* Heading — words split for per-word animation */}
          <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-black overflow-hidden">
            {/* Each word wrapped for GSAP target */}
            {["Systems", "That", "Sustain", "Excellence"].map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
              >
                <span className="systems-heading-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="systems-subtext mt-4 text-[14px] md:text-[15px] text-black/65 leading-relaxed max-w-[560px] mx-auto">
            Sustained academic performance requires consistent faculty
            development and institutional review mechanisms. ERAM integrates
            comprehensive academic systems, including:
          </p>
        </div>

        {/* ══════════════════════════════
            FEATURES GRID
            Mobile : 2 col
            Desktop: 4 col
        ══════════════════════════════ */}
        <div
          className="
            system-grid
            mt-14 md:mt-20
            grid
            grid-cols-2 md:grid-cols-4
            gap-y-10 md:gap-y-14
            gap-x-6 md:gap-x-10
          "
        >
          {ITEMS.map((item, index) => (
            <div
              key={index}
              className="system-item relative pl-4 md:pl-6 min-h-[130px] md:min-h-[170px]"
            >
              {/* Left border line — animated separately */}
              <div
                className="system-item-line absolute left-0 top-0 bottom-0 w-px bg-black/25"
              />

              {/* Number */}
              <p className="text-[12px] md:text-[15px] text-black/40 font-mono mb-3 md:mb-5 tracking-wider">
                /{item.number}
              </p>

              {/* Title */}
              <p className="text-[14px] md:text-[18px] font-medium leading-[1.4] text-black/85 whitespace-pre-line">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════
            IMAGE BLOCK
        ══════════════════════════════ */}
        <div className="mt-14 md:mt-20">
          <div
            className="
              system-img-wrap
              relative rounded-[26px] overflow-hidden transform-gpu
              h-[260px] sm:h-[320px] md:h-[480px]
            "
          >
            {/* Parallax image */}
            <div className="system-img w-full h-[120%] absolute -top-[10%]">
              <OptimizedImage
                src="/images/campus.webp"
                alt="campus"
                className="w-full h-full object-cover block"
                sizes="100vw"
                disableTransition
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Subtle grain texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "180px 180px",
              }}
            />

            {/* Overlay description */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">
              <p
                className="
                  system-desc
                  text-center text-white
                  text-[15px] sm:text-[17px] md:text-[22px]
                  leading-relaxed
                  max-w-[680px]
                  font-light
                "
              >
                These systems ensure that faculty remain professionally
                equipped, students receive guided mentorship, and institutional
                standards are maintained across all campuses.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(SystemsThatSustainExcellence);