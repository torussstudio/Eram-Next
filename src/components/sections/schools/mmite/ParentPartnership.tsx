// "use client";

// interface FocusItem {
//   title: string;
// }

// const ITEMS: FocusItem[] = [
//   { title: "Structured practice teaching exposure" },
//   { title: "Internship in NCERT-aligned leading schools" },
//   {
//     title:
//       "A 15-day residential camp focused on empathy, adaptability, and self-sustaining leadership",
//   },
//   { title: "A secular and inclusive institutional culture" },
// ];

// function AcademicFocusSection() {
//   return (
//     <section className="relative -mt-10 rounded-[28px] bg-[#F5EFE8] px-8 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
//       <div className="mx-auto w-full max-w-[1200px]">
//         {/* Heading */}
//         <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] text-neutral-900">
//           Discipline, Mentorship & <br /> Professional Formation
//         </h2>

//         {/* Intro paragraph */}
//         <p className="font-rethink mt-5 max-w-2xl text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
//           At MMITE, teacher formation is deliberate and supervised. With a
//           limited intake of 50 students per batch, mentorship remains focused
//           and individualised. Academic progress is continuously monitored, and
//           practical training is integrated throughout the course duration.
//           Distinctive elements include:
//         </p>

//         {/* Divider */}
//         <div className="mt-10 flex items-end justify-between gap-6 border-b border-neutral-900/10 pb-4">
//           <span className="text-[14px] sm:text-[15px] uppercase tracking-[0.25em] text-[#ae1431] font-display">
//             Academic Focus
//           </span>
//         </div>

//         {/* Items grid */}
//         <div className="relative mt-10">
//           <div className="flex flex-wrap">
//             {ITEMS.map((item, idx) => (
//               <div
//                 key={item.title}
//                 className="relative w-1/2 shrink-0 pl-6 pr-6 mb-10 first:pl-0 sm:w-1/3 sm:mb-0 lg:w-1/4"
//               >
//                 {idx !== 0 && (
//                   <span className="absolute left-0 top-0 h-28 w-px bg-neutral-900/10" />
//                 )}

//                 <span className="font-rethink block text-[15px] text-black">
//                   /{String(idx + 1).padStart(2, "0")}
//                 </span>

//                 <h3 className="font-rethink mt-15 pr-2 text-[15px] sm:text-[18px] leading-snug text-neutral-900">
//                   {item.title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AcademicFocusSection;

"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface FocusItem {
  title: string;
}

const ITEMS: FocusItem[] = [
  { title: "Structured practice teaching exposure" },
  { title: "Internship in NCERT-aligned leading schools" },
  {
    title:
      "A 15-day residential camp focused on empathy, adaptability, and self-sustaining leadership",
  },
  { title: "A secular and inclusive institutional culture" },
];

function AcademicFocusSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const cardWidth = card
      ? card.getBoundingClientRect().width
      : el.clientWidth / 4;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="relative -mt-10 rounded-[28px] bg-[#F5EFE8] px-8 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Heading */}
        <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] text-neutral-900">
          <span className="sm:hidden">
            Discipline, Mentorship &<br /> Professional Formation
          </span>
          <span className="hidden sm:inline">
            Discipline, Mentorship & <br /> Professional Formation
          </span>
        </h2>

        {/* Intro paragraph */}
        <p className="font-rethink mt-5 max-w-2xl text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
          At MMITE, teacher formation is deliberate and supervised. With a
          limited intake of 50 students per batch, mentorship remains focused
          and individualised. Academic progress is continuously monitored, and
          practical training is integrated throughout the course duration.
          Distinctive elements include:
        </p>

        {/* Label row + desktop arrows */}
        <div className="mt-10 flex items-end justify-between gap-6 border-b border-neutral-900/10 pb-4">
          <span className="text-[14px] sm:text-[15px] uppercase tracking-[0.25em] text-[#ae1431] font-display">
            Academic Focus
          </span>

          {/* Desktop carousel arrows */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
              className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-full border border-neutral-900/15 text-neutral-700 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:border-[#ae1431] hover:enabled:text-[#ae1431]"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path
                  d="M6 1L1 6L6 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
              className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-full border border-neutral-900/15 text-neutral-700 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:border-[#ae1431] hover:enabled:text-[#ae1431]"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path
                  d="M1 1L6 6L1 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Items carousel */}
        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ITEMS.map((item, idx) => (
              <div
                key={item.title}
                data-card
                className="relative w-1/2 shrink-0 snap-start pl-6 pr-6 first:pl-0 sm:w-1/3 lg:w-1/4"
              >
                {idx !== 0 && (
                  <span className="absolute left-0 top-0 h-28 w-px bg-neutral-900/10" />
                )}

                <span className="font-rethink block text-[15px] text-black">
                  /{String(idx + 1).padStart(2, "0")}
                </span>

                <h3 className="font-rethink mt-15 pr-2 text-[15px] sm:text-[18px] leading-snug text-neutral-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* edge fade hint */}
          <div
            className={[
              "absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F5EFE8] to-transparent transition-opacity duration-200",
              canScrollRight ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </div>

        {/* Mobile carousel arrows — centered */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous"
            disabled={!canScrollLeft}
            onClick={() => scrollByCard(-1)}
            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-full border border-neutral-900/15 text-neutral-700 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30 active:border-[#ae1431] active:text-[#ae1431]"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path
                d="M6 1L1 6L6 11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={!canScrollRight}
            onClick={() => scrollByCard(1)}
            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-full border border-neutral-900/15 text-neutral-700 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30 active:border-[#ae1431] active:text-[#ae1431]"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path
                d="M1 1L6 6L1 11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default AcademicFocusSection;