"use client";

import { Play } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface FocusItem {
  title: string;
}

interface FocusTab {
  key: string;
  label: string;
  items: FocusItem[];
}

const TABS: FocusTab[] = [
  {
    key: "academic",
    label: "Academic Focus",
    items: [
      { title: "Continuous Academic Progress Tracking" },
      { title: "Structured Daily Attendance Monitoring" },
      { title: "Timely Academic Announcements" },
      { title: "Coordinated Parent Communication" },
      { title: "“Shreshtta” Classroom Development Initiative" },
      { title: "Exam-Focused Revision & Support Modules " },
    ],
  },
  {
    key: "communication",
    label: "Competitive & Leadership Platforms",
    items: [
      { title: "Consistent Training Sessions" },
      { title: "STEM & Sports Clubs" },
      { title: "JCI & Rotary Junior Wing" },
      { title: "State-Level Program Hosting" },
      { title: " “Nalla Naalekkaayi” Initiative" },
      { title: "Sports Literature & Exposure" },
    ],
  },
  {
    key: "civic",
    label: "Civic & Social Engagement",
    items: [
      { title: "Scout & Guide Activities" },
      { title: "Community-Linked Exposure" },
    ],
  },
];

function AcademicFocusSection() {
  const [activeTab, setActiveTab] = useState<string>("academic");
  const active = TABS.find((t) => t.key === activeTab)!;

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
    el.scrollTo({ left: 0 });
    updateScrollState();
  }, [activeTab, updateScrollState]);

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
        <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] text-neutral-900 max-w-2xl">
          Academic Strength, Competitive Exposure, Monitoring & Coordination
        </h2>

        {/* Intro paragraph */}
        <p className="font-rethink mt-5 max-w-2xl text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
        MMPS functions on structured daily supervision and consistent communication systems.
        </p>

        {/* Tabs */}
        <div className="mt-10 flex items-center justify-between gap-6 border-b border-neutral-900/10">
          <div className="flex flex-wrap gap-x-14 gap-y-3">
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={[
                    " cursor-pointer relative pb-4 text-[14px] sm:text-[15px]  uppercase tracking-[0.25em] transition-colors duration-200",

                    isActive
                      ? "text-[#ae1431] font-display"
                      : "text-neutral-500 hover:text-neutral-800 font-rethink",
                  ].join(" ")}
                >
                  {tab.label}
                  <span
                    className={[
                      "absolute bottom-0 left-0 h-[3px] w-full bg-[#ae1431] rounded-tl-md rounded-tr-md transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>

          {/* Carousel arrows */}
          <div className="hidden shrink-0 items-center gap-2 pb-4 sm:flex">
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
            {active.items.map((item, idx) => (
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

                <h3 className="font-rethink mt-15 pr-2 text-[15px] sm:text-[18px]  leading-snug text-neutral-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* edge fade hint */}
          <div
            className={[
              " absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F5EFE8] to-transparent transition-opacity duration-200",
              canScrollRight ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </div>

        {/* CTA button */}
        <div className="mt-8 flex justify-center">
          <button className="font-rethink inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-[#ae1431] px-7 py-3.5 text-[13px]  tracking-[0.14em] text-white uppercase transition-transform duration-200 hover:scale-[1.03]">
            Explore Our Systems & Standards
            <Play className="w-4 h-4 shrink-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AcademicFocusSection;
