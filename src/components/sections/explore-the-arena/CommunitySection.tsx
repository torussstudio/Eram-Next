// "use client";

// import Link from "next/link";

// export default function CommunitySection() {
//   return (
//     <section className="bg-[#F5EFE8] py-[80px] md:py-[100px] px-[16px] sm:px-[20px] md:px-[28px]">
//       <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
//         <div
//           className="
//       max-w-[1100px] mx-auto
//       px-[16px] sm:px-[20px] md:px-[28px]
//     "
//         >
//           <div className="grid md:grid-cols-2 gap-[60px] md:gap-[80px] items-start">
//             {/* LEFT SIDE */}
//             <div>
//               {/* LABEL */}
//               <div className="flex items-center gap-3 mb-6">
//                 {/* <span className="w-6 h-[1px] bg-[#ae1431]"></span> */}
//                 <p className="font-rethink text-[12px] tracking-[0.25em] text-[#ae1431] uppercase">
//                   A venue for the wider community
//                 </p>
//               </div>

//               {/* HEADING */}
//               <h2 className="font-display text-[34px] sm:text-[42px] md:text-[54px] leading-[1.15] text-[#1a1a1a] mb-6">
//                 Open Beyond <br /> the Campus.
//               </h2>

//               {/* TEXT */}
//               <p className="font-rethink text-[14.5px] text-[#4a433c] leading-[1.8] max-w-[520px] mb-6">
//                 The ERAM Sports Arena extends beyond institutional use. It is
//                 open for external bookings, welcoming a wide range of
//                 large-scale events and community gatherings.
//               </p>

//               <p className="font-rethink text-[14.5px] text-[#4a433c] leading-[1.8] max-w-[520px] mb-8">
//                 By positioning the campus as an accessible venue for sport,
//                 culture, and community, the Arena strengthens ERAM's presence
//                 within the wider region — as an institution that serves beyond
//                 its walls.
//               </p>

//               {/* BUTTON */}
//               <Link
//                 href="/contact"
//                 className="
//     group
//     bg-[#ae1431]
//     rounded-[12px]
//     font-rethink
//     text-white
//     px-[22px]
//     py-[14px]
//     text-[12px]
//     tracking-[0.18em]
//     uppercase
//     inline-flex
//     items-center
//     gap-3
//     hover:bg-black
//     transition-all duration-300
//     cursor-pointer
//   "
//               >
//                 Enquire About Hosting
//               </Link>
//             </div>

//             {/* RIGHT SIDE */}
//             <div>
//               {/* TITLE */}
//               <p className="text-[12px] tracking-[0.25em] text-[#7d746c] uppercase mb-6 text-center md:text-left">
//                 Events We Welcome
//               </p>

//               {/* GRID */}
//               <div className="overflow-hidden rounded-[24px] border border-[#cfc6bb]">
//                 <div className="grid grid-cols-1 sm:grid-cols-2">
//                   {cards.map((card, i) => (
//                     <div
//                       key={i}
//                       className={`
//           font-rethink
//           p-[22px] md:p-[26px]
//           bg-[#f5f2ed]
//           min-h-[140px]
//           flex flex-col justify-center

//           transition-all duration-300 ease-out
//           cursor-pointer

//           hover:bg-[#ae1431]
//           hover:text-white

//           ${i % 2 === 0 ? "sm:border-r" : ""}
//           ${i < 2 ? "sm:border-b" : ""}
//           border-[#cfc6bb]
//         `}
//                     >
//                       <div className="text-[20px] mb-[10px]">{card.icon}</div>

//                       <h3 className="text-[16px] font-display text-[#1a1a1a] mb-[4px]">
//                         {card.title}
//                       </h3>

//                       <p className="text-[14px] font-rethink text-[#7d746c]">
//                         {card.desc}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* DATA */
// const cards = [
//   {
//     icon: "🏆",
//     title: "Inter-School Tournaments",
//     desc: "Multi-sport competitive formats",
//   },
//   {
//     icon: "🏅",
//     title: "District-Level Competitions",
//     desc: "Regional qualifying events",
//   },
//   {
//     icon: "🎭",
//     title: "Cultural Festivals",
//     desc: "Performances & celebrations",
//   },
//   {
//     icon: "👥",
//     title: "Public Gatherings",
//     desc: "Convocations & community events",
//   },
// ];



"use client";

import Link from "next/link";

export default function CommunitySection() {
  return (
    <section className="bg-[#F5EFE8] py-[80px] md:py-[100px] px-[16px] sm:px-[20px] md:px-[28px]">
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
        <div
          className="
      max-w-[1100px] mx-auto
      px-[16px] sm:px-[20px] md:px-[28px]
    "
        >
          {/* TOP ROW — asymmetric split, left-heavy */}
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-[40px] lg:gap-[64px] items-end mb-[56px] md:mb-[72px]">
            {/* LEFT: label + heading */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-[#ae1431]"></span>
                <p className="font-rethink text-[12px] tracking-[0.25em] text-[#ae1431] uppercase">
                  A venue for the wider community
                </p>
              </div>

              <h2 className="font-display text-[34px] sm:text-[42px] md:text-[56px] leading-[1.1] text-[#1a1a1a]">
                Open Beyond <br /> the Campus.
              </h2>
            </div>

            {/* RIGHT: paragraphs, bottom-aligned to heading baseline */}
            <div className="lg:pb-[6px]">
              <p className="font-rethink text-[14.5px] text-[#4a433c] leading-[1.8] mb-5">
                The ERAM Sports Arena extends beyond institutional use. It is
                open for external bookings, welcoming a wide range of
                large-scale events and community gatherings.
              </p>

              <p className="font-rethink text-[14.5px] text-[#4a433c] leading-[1.8] mb-7">
                By positioning the campus as an accessible venue for sport,
                culture, and community, the Arena strengthens ERAM's presence
                within the wider region — as an institution that serves
                beyond its walls.
              </p>

              <Link
                href="/contact"
                className="
    group
    bg-[#ae1431]
    rounded-[12px]
    font-rethink
    text-white
    px-[22px]
    py-[14px]
    text-[12px]
    tracking-[0.18em]
    uppercase
    inline-flex
    items-center
    gap-3
    hover:bg-black
    transition-all duration-300
    cursor-pointer
  "
              >
                Enquire About Hosting
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* BOTTOM ROW — divider list instead of boxed card grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] tracking-[0.25em] text-[#7d746c] uppercase">
                Events We Welcome
              </p>
              <span className="hidden sm:inline font-rethink text-[12px] text-[#a89e93]">
                {String(cards.length).padStart(2, "0")} Categories
              </span>
            </div>

            <div className="border-t border-[#cfc6bb]">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="
                    group relative overflow-hidden
                    border-b border-[#cfc6bb]
                    px-[6px] md:px-[8px]
                  "
                >
                  {/* sliding fill */}
                  <span
                    className="
                      absolute inset-0
                      
                      bg-[#ae1431]
                      origin-left scale-x-0
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    "
                  />

                  {/* top accent line — draws in just after the fill lands */}
                  <span
                    className="
                      absolute top-0 left-[4px] right-[4px] h-[2px]
                      origin-left scale-x-0
                      transition-transform duration-500 delay-150 ease-out
                      group-hover:scale-x-100
                    "
                  />

                  {/* bottom accent line — mirrors the top, slightly later */}
                  <span
                    className="
                      absolute bottom-0 left-[4px] right-[4px] h-[2px]
                      origin-right scale-x-0
                      transition-transform duration-500 delay-200 ease-out
                      group-hover:scale-x-100
                    "
                  />

                  <div
                    className="
                      relative
                      flex items-center gap-[18px] md:gap-[28px]
                      py-[20px] md:py-[26px]
                    "
                  >
                    {/* index */}
                    <span className="font-display text-[14px] md:text-[16px] text-[#ae1431] group-hover:text-white/70 transition-colors duration-300 w-[28px] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* icon */}
                    <span className="text-[20px] md:text-[22px] shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {card.icon}
                    </span>

                    {/* title + desc */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                      <h3 className="font-display text-[16px] md:text-[18px] text-[#1a1a1a] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                        {card.title}
                      </h3>
                      <p className="font-rethink text-[13px] md:text-[14px] text-[#7d746c] group-hover:text-white/80 transition-colors duration-300 truncate">
                        {card.desc}
                      </p>
                    </div>

                    {/* arrow */}
                    <span
                      className="
                        font-rethink text-[#ae1431] group-hover:text-white
                        transition-all duration-300
                        opacity-0 -translate-x-2
                        group-hover:opacity-100 group-hover:translate-x-0
                        shrink-0
                      "
                    >
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* DATA */
const cards = [
  {
    icon: "🏆",
    title: "Inter-School Tournaments",
    desc: "Multi-sport competitive formats",
  },
  {
    icon: "🏅",
    title: "District-Level Competitions",
    desc: "Regional qualifying events",
  },
  {
    icon: "🎭",
    title: "Cultural Festivals",
    desc: "Performances & celebrations",
  },
  {
    icon: "👥",
    title: "Public Gatherings",
    desc: "Convocations & community events",
  },
];