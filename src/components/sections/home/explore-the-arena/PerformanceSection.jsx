// import { Landmark, LayoutGrid, Lightbulb, Shield } from "lucide-react";

// export default function PerformanceSection() {
//   return (
//     <section className="bg-[#f3efe9] py-[80px] px-[20px] md:px-[28px]">

//       {/* OUTER CONTAINER */}
//       <div className="max-w-[1500px] mx-auto px-[12px]">

//         {/* INNER CONTENT */}
//         <div className="max-w-[1100px] mx-auto">

//           {/* HEADER */}
//           <div className="flex justify-between items-start mb-[60px]">
//             <div>
//               <p className="text-[11px] tracking-[0.2em] text-[#9c8f84] uppercase mb-[14px]">
//                 — Key Features
//               </p>
//               <h2 className="text-[42px] leading-[1.2] font-serif text-[#1a1a1a]">
//                 Designed for Performance <br /> & Gathering
//               </h2>
//             </div>

//             <p className="max-w-[520px] text-[13px] text-[#8a8178] leading-[1.6] mt-[30px]">
//               Built as a flagship infrastructure milestone within the ERAM ecosystem,
//               the Arena represents the Trust’s expanding vision — where structured
//               development meets public-scale possibility.
//             </p>
//           </div>

//           {/* GRID */}
//           <div className="grid grid-cols-2 border border-[#d9d2c8]">

//             {cards.map((card, i) => {
//               const Icon = icons[i];

//               return (
//                 <div
//                   key={i}
//                   className={`relative p-[32px] min-h-[240px]
//                     ${i % 2 === 0 ? "border-r" : ""}
//                     ${i < 2 ? "border-b" : ""}
//                     border-[#d9d2c8]
//                   `}
//                 >
//                   {/* ✅ ICON (FIXED) */}
//                   <Icon
//                     className="mb-[22px] text-[#7a1c17]"
//                     size={24}
//                     strokeWidth={1.3}
//                   />

//                   {/* TITLE */}
//                   <h3 className="text-[17px] font-medium mb-[8px] text-[#1a1a1a]">
//                     {card.title}
//                   </h3>

//                   {/* DESCRIPTION */}
//                   <p className="text-[13px] text-[#7d746c] leading-[1.6] mb-[20px] max-w-[90%]">
//                     {card.desc}
//                   </p>

//                   {/* DIVIDER */}
//                   <div className="border-t border-[#d9d2c8] mb-[14px]" />

//                   {/* SPECS */}
//                   <div className="flex justify-between text-[12px] text-[#7d746c]">
//                     <div className="space-y-[5px]">
//                       {card.labels.map((l, idx) => (
//                         <p key={idx}>{l}</p>
//                       ))}
//                     </div>

//                     <div className="space-y-[5px] text-right text-[#1a1a1a]">
//                       {card.values.map((v, idx) => (
//                         <p key={idx}>{v}</p>
//                       ))}
//                     </div>
//                   </div>

//                   {/* NUMBER */}
//                   <span className="absolute top-[18px] right-[18px] text-[44px] text-[#e6e0d7] font-serif">
//                     {card.no}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// /* ✅ ICON MAP (IMPORTANT) */
// const icons = [Landmark, LayoutGrid, Lightbulb, Shield];

// /* ✅ DATA */
// const cards = [
//   {
//     no: "01",
//     title: "Open-Air Amphitheatre",
//     desc: "With a seating capacity of 1,000, the Arena is designed as an open-air amphitheatre that accommodates large audiences while maintaining clear sightlines and gathering scale.",
//     labels: ["Capacity", "Format", "Sightlines"],
//     values: ["1,000 Spectators", "Open-Air Design", "Unobstructed, All Tiers"],
//   },
//   {
//     no: "02",
//     title: "Multi-Court Athletic Layout",
//     desc: "At its core, the Arena integrates a competitive multi-court system that supports structured training, competitive matches, and tournament-level play.",
//     labels: ["Primary Court", "Badminton Court", "Configuration"],
//     values: ["47m × 22m", "14m × 6.6m", "Multi-Sport Ready"],
//   },
//   {
//     no: "03",
//     title: "Event-Ready Illumination",
//     desc: "Equipped with a full floodlighting system, the Arena enables evening matches, large-scale programs, and extended event scheduling.",
//     labels: ["Floodlight Poles", "LED Lights", "Operation"],
//     values: ["8 Poles (16m Height)", "24 High-Intensity Units", "Day to Night Capable"],
//   },
//   {
//     no: "04",
//     title: "Secure & Accessible Infrastructure",
//     desc: "The Arena integrates essential support systems ensuring smooth, safe, and efficient operation for every event.",
//     labels: ["Car Parking", "Security", "Access"],
//     values: ["90+ Vehicles", "CCTV Surveillance", "Controlled Campus Entry"],
//   },
// ];

import { Landmark, LayoutGrid, Lightbulb, Shield } from "lucide-react";

export default function PerformanceSection() {
  return (
    <section className="bg-[#f3efe9] py-[60px] sm:py-[70px] md:py-[80px] px-[16px] sm:px-[20px] md:px-[28px]">

      {/* OUTER CONTAINER */}
      <div className="max-w-[1500px] mx-auto px-[10px] sm:px-[12px]">

        {/* INNER CONTENT */}
        <div className="max-w-[1100px] mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0 mb-[40px] md:mb-[60px]">

            <div className="text-center md:text-left">
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#9c8f84] uppercase mb-[12px] md:mb-[14px]">
                — Key Features
              </p>

              <h2 className="text-[28px] sm:text-[34px] md:text-[42px] leading-[1.25] font-serif text-[#1a1a1a]">
                Designed for Performance <br className="hidden sm:block" />
                & Gathering
              </h2>
            </div>

            <p className="max-w-[520px] text-[13px] sm:text-[14px] text-[#8a8178] leading-[1.6] text-center md:text-left">
              Built as a flagship infrastructure milestone within the ERAM ecosystem,
              the Arena represents the Trust’s expanding vision — where structured
              development meets public-scale possibility.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#d9d2c8]">

            {cards.map((card, i) => {
              const Icon = icons[i];

              return (
                <div
                  key={i}
                  className={`
                    relative
                    p-[22px] sm:p-[28px] md:p-[32px]
                    min-h-[auto] md:min-h-[240px]

                    border-[#d9d2c8]

                    ${/* Desktop borders */ ""}
                    sm:${i % 2 === 0 ? "border-r" : ""}
                    sm:${i < 2 ? "border-b" : ""}

                    ${/* Mobile borders (stacked) */ ""}
                    border-b last:border-b-0 sm:border-b
                  `}
                >

                  {/* ICON */}
                  <Icon
                    className="mb-[18px] sm:mb-[22px] text-[#7a1c17]"
                    size={22}
                    strokeWidth={1.3}
                  />

                  {/* TITLE */}
                  <h3 className="text-[16px] sm:text-[17px] font-medium mb-[6px] sm:mb-[8px] text-[#1a1a1a]">
                    {card.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[13px] text-[#7d746c] leading-[1.6] mb-[16px] sm:mb-[20px] max-w-[100%] sm:max-w-[90%]">
                    {card.desc}
                  </p>

                  {/* DIVIDER */}
                  <div className="border-t border-[#d9d2c8] mb-[12px] sm:mb-[14px]" />

                  {/* SPECS */}
                  <div className="flex justify-between text-[12px] text-[#7d746c] gap-4">
                    <div className="space-y-[4px] sm:space-y-[5px]">
                      {card.labels.map((l, idx) => (
                        <p key={idx}>{l}</p>
                      ))}
                    </div>

                    <div className="space-y-[4px] sm:space-y-[5px] text-right text-[#1a1a1a]">
                      {card.values.map((v, idx) => (
                        <p key={idx}>{v}</p>
                      ))}
                    </div>
                  </div>

                  {/* NUMBER */}
                  <span className="absolute top-[14px] right-[14px] sm:top-[18px] sm:right-[18px] text-[34px] sm:text-[40px] md:text-[44px] text-[#e6e0d7] font-serif">
                    {card.no}
                  </span>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ICONS */
const icons = [Landmark, LayoutGrid, Lightbulb, Shield];

/* DATA */
const cards = [
  {
    no: "01",
    title: "Open-Air Amphitheatre",
    desc: "With a seating capacity of 1,000, the Arena is designed as an open-air amphitheatre that accommodates large audiences while maintaining clear sightlines and gathering scale.",
    labels: ["Capacity", "Format", "Sightlines"],
    values: ["1,000 Spectators", "Open-Air Design", "Unobstructed, All Tiers"],
  },
  {
    no: "02",
    title: "Multi-Court Athletic Layout",
    desc: "At its core, the Arena integrates a competitive multi-court system that supports structured training, competitive matches, and tournament-level play.",
    labels: ["Primary Court", "Badminton Court", "Configuration"],
    values: ["47m × 22m", "14m × 6.6m", "Multi-Sport Ready"],
  },
  {
    no: "03",
    title: "Event-Ready Illumination",
    desc: "Equipped with a full floodlighting system, the Arena enables evening matches, large-scale programs, and extended event scheduling.",
    labels: ["Floodlight Poles", "LED Lights", "Operation"],
    values: ["8 Poles (16m Height)", "24 High-Intensity Units", "Day to Night Capable"],
  },
  {
    no: "04",
    title: "Secure & Accessible Infrastructure",
    desc: "The Arena integrates essential support systems ensuring smooth, safe, and efficient operation for every event.",
    labels: ["Car Parking", "Security", "Access"],
    values: ["90+ Vehicles", "CCTV Surveillance", "Controlled Campus Entry"],
  },
];