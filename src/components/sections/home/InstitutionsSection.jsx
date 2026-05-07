// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import MarqueeText from "../../ui/Marquee";
// import { useNavigate } from "react-router-dom";

// gsap.registerPlugin(ScrollTrigger);

// export default function InstitutionsSection() {
//   const navigate = useNavigate()

//   const sectionRef = useRef(null);

// const institutions = [
//   { title: "EASE (CBSE)", image: "/images/ease.webp",path:"https://ease.edu.in/" },
//   { title: "MMPS (HS)", image: "/images/mmps.webp" },
//   { title: "MMHSS (Hr. Sec)", image: "/images/mmhss.webp", path: "/mmhss" },
//   { title: "AMLP (LP)", image: "/images/amlp.webp" },
//   { title: "MMITE (TTI)", image: "/images/mmite.webp" },
// ];

//   useGSAP(() => {
//     // Fade in headlines
//     gsap.fromTo(
//       ".institutions-text",
//       { opacity: 0, y: 30 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         stagger: 0.15,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//         },
//       },
//     );

//     // Stagger scale for cards
//     gsap.fromTo(
//       ".institutions-card",
//       { opacity: 0, scale: 0.9, y: 40 },
//       {
//         opacity: 1,
//         scale: 1,
//         y: 0,
//         duration: 0.8,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".institutions-grid",
//           start: "top 85%",
//         },
//       },
//     );
//   });

//   return (
    
//     <section
//       ref={sectionRef}
//       id="c"
//       className="bg-[#f5efe8] pt-[40px] pb-[120px]"
//     >
//       <div className="mx-auto max-w-[1180px] px-[24px] max-[640px]:px-[16px]">
//         <MarqueeText />

//         {/* heading */}
//         <div className="max-w-[760px] mx-auto text-center">
//           <h2 className="institutions-text font-display text-[44px] font-semibold tracking-[-0.02em] text-[#111] max-[900px]:text-[32px] max-[640px]:text-[26px]">
//             The ERAM Learning Continuum
//           </h2>

//           <p className="institutions-text font-rethink mx-auto mt-[18px] max-w-[820px] text-[18px] leading-[1.65] text-black max-[640px]:text-[15px]">
//             <span className="  text-[#111] ">
//               An ecosystem designed to guide students from foundation to
//               formation.
//             </span>
//             <br />
//             From foundational schooling to teacher training, each institution
//             strengthens a different stage of the learner’s journey.
//           </p>
//         </div>

//         {/* cards */}
//         <div className="institutions-grid mt-[70px] grid grid-cols-6 gap-[36px] max-[1100px]:grid-cols-4 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1 max-[640px]:mt-[48px] max-[640px]:gap-[20px]">
//           {institutions.map((item, i) => (
//             <div
//               key={i}
//               className="
//               institutions-card
//               col-span-2 rounded-[26px] border border-black bg-white p-[18px]
//               [&:nth-child(4)]:col-start-2
//               [&:nth-child(5)]:col-start-4
//               max-[1100px]:col-span-2
//               max-[1100px]:[&:nth-child(4)]:col-start-auto
//               max-[1100px]:[&:nth-child(5)]:col-start-auto
//               max-[640px]:rounded-[20px]
//               max-[640px]:p-[14px]
//               "
//             >
//               {/* image */}
// <div className="flex h-[260px] items-center justify-center rounded-[18px] bg-[#f5efe8] max-[640px]:h-[200px] max-[640px]:rounded-[14px] overflow-hidden">
//   <img
//     src={item.image}
//     alt={item.title}
//     className="h-full w-full object-cover rounded-[18px] max-[640px]:rounded-[14px]"
//   />
// </div>



//               {/* title */}
//               <h3 className="font-rethink mt-[22px] text-[20px] font-[500] tracking-[0.02em] text-[#111] max-[640px]:mt-[16px] max-[640px]:text-[18px]">
//                 {item.title}
//               </h3>

//               {/* link */}
//               <button
//  onClick={() => {
//   if (!item.path) return;

//   if (item.path.startsWith("http")) {
//     window.open(item.path, "_blank"); // external
//   } else {
//     navigate(item.path); // internal
//   }
// }}
//   className="font-rethink mt-[14px] inline-block border-b-[2px] border-[#6d6d6d] pb-[3px] text-[13px] uppercase tracking-[0.14em] text-[#6d6d6d] transition-all hover:border-black hover:text-black cursor-pointer"
// >
//   View More
// </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeText from "../../ui/Marquee";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const institutions = [
  { title: "EASE (CBSE)",    image: "/images/ease.webp",  path: "https://ease.edu.in/" },
  { title: "MMPS (HS)",      image: "/images/mmps.webp"                                },
  { title: "MMHSS (Hr. Sec)",image: "/images/mmhss.webp", path: "/mmhss"              },
  { title: "AMLP (LP)",      image: "/images/amlp.webp"                                },
  { title: "MMITE (TTI)",    image: "/images/mmite.webp"                               },
];

export default function InstitutionsSection() {
  const sectionRef = useRef(null);
  const navigate   = useNavigate();

  const handleClick = (path) => {
    if (!path) return;
    path.startsWith("http") ? window.open(path, "_blank") : navigate(path);
  };

  useGSAP(() => {
    const defaults = { ease: "power3.out" };

    // Heading block fades up
    gsap.fromTo(
      ".inst-heading",
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        stagger: 0.12,
        ...defaults,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );

    // Cards stagger in with a subtle lift
    gsap.fromTo(
      ".inst-card",
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75,
        stagger: { amount: 0.45 },
        ...defaults,
        scrollTrigger: { trigger: ".inst-grid", start: "top 85%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="institutions"
      className="bg-[#f5efe8] pt-10 pb-28"
    >
      <div className="mx-auto max-w-[1180px] px-6 sm:px-4">
        <MarqueeText />

        {/* ── Heading ── */}
        <div className="mx-auto mt-10 max-w-[720px] text-center">
          <h2 className="inst-heading font-display text-[44px]  tracking-[-0.02em] text-[#111] md:text-[32px] sm:text-[26px]">
            The ERAM Learning Continuum
          </h2>

          <p className="inst-heading font-rethink mx-auto mt-4 text-[18px] leading-[1.7] text-[#444] sm:text-[15px]">
            An ecosystem designed to guide students from foundation to formation.{" "}
            <span className="text-[#111]">
              From foundational schooling to teacher training, each institution
              strengthens a different stage of the learner's journey.
            </span>
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="inst-grid mt-[70px] grid grid-cols-6 gap-9 sm:mt-12 sm:gap-5 max-[1100px]:grid-cols-4 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
          {institutions.map((item, i) => (
            <div
              key={i}
              className="
                inst-card group col-span-2
                rounded-[26px] border border-black/10 bg-white p-[18px]
                shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                transition-shadow duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.10)]
                [&:nth-child(4)]:col-start-2
                [&:nth-child(5)]:col-start-4
                max-[1100px]:[&:nth-child(4)]:col-start-auto
                max-[1100px]:[&:nth-child(5)]:col-start-auto
                sm:rounded-[20px] sm:p-[14px]
              "
            >
              {/* Image */}
              <div className="h-[260px] overflow-hidden rounded-[18px] bg-[#f5efe8] sm:h-[200px] sm:rounded-[14px]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.04]"
                />
              </div>

              {/* Title */}
              <h3 className="font-rethink mt-5 text-[20px] font-medium tracking-wide text-[#111] sm:mt-4 sm:text-[18px]">
                {item.title}
              </h3>

              {/* CTA */}
              <button
                onClick={() => handleClick(item.path)}
                disabled={!item.path}
                className="
                  font-rethink mt-3 inline-flex items-center gap-1
                  border-b-2 border-[#6d6d6d] pb-[3px]
                  text-[12px] uppercase tracking-[0.14em] text-[#6d6d6d]
                  transition-colors duration-200
                  hover:border-black hover:text-black
                  disabled:cursor-default disabled:opacity-40
                "
              >
                View More
                <span className="translate-y-px transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}