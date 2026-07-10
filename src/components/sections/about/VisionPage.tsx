"use client"

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import Image from "next/image";

const SLIDE_DURATION_MS = 6000;

interface TimelineItem {
  year: string;
  label: string;
}

const TIMELINE: TimelineItem[] = [
  {
    year: "1920s",
    label: "Foundation and expansion of ERAM Trust",
  },
  {
    year: "1924",
    label: "Expansion of Foundational School – LP & Upper Primary (AMLP)",
  },
  {
    year: "1990s",
    label: "Foundation and expansion of the Eram Group",
  },
  {
    year: "2004",
    label: "Establishment of High School Institution (MMPS)",
  },
  {
    year: "2004",
    label: "Establishment of Teachers Training Institute (MMITE)",
  },
  {
    year: "2005",
    label: "Establishment of Higher Secondary Institution (MMHSS)",
  },
  {
    year: "2015",
    label: "Establishment of the ERAM Educational Trust as part of CSR vision",
  },
  {
    year: "2015",
    label: "Establishment of ERAM Academy for Sports and Excellence (EASE)",
  },
  {
    year: "2023",
    label: "CBSE affiliation & Academic Strengthening of EASE",
  },
  {
    year: "2026",
    label: "Development of ERAM Sports Arena (current milestone)",
  },
];

const TAIL_EDGE_PADDING = 32;

interface BubbleBox {
  left: number; // px, bubble's left edge relative to the track container
  tailLeft: number; // px, tail's center relative to the bubble's own left edge
  ready: boolean;
}

export default function EramJourneyTimeline(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [runId, setRunId] = useState<number>(0); // bumped every time the timer should restart
  const [bubbleBox, setBubbleBox] = useState<BubbleBox>({
    left: 0,
    tailLeft: 0,
    ready: false,
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFirst = activeIndex === 0;

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TIMELINE.length - 1, index));
    setActiveIndex(clamped);
    setRunId((id) => id + 1);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= TIMELINE.length - 1 ? 0 : prev + 1));
    setRunId((id) => id + 1);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
    setRunId((id) => id + 1);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev >= TIMELINE.length - 1 ? 0 : prev + 1));
      setRunId((id) => id + 1);
    }, SLIDE_DURATION_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, runId]);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const item = itemRefs.current[activeIndex];
      const bubble = bubbleRef.current;
      if (!track || !item || !bubble) return;

      const trackRect = track.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const bubbleWidth = bubble.getBoundingClientRect().width;

      const tickCenter = itemRect.left - trackRect.left + itemRect.width / 2;
      const trackWidth = trackRect.width;

      // Try to center the bubble directly under the tick.
      let left = tickCenter - bubbleWidth / 2;

      // Clamp so the bubble always stays fully inside the track.
      left = Math.max(0, Math.min(left, Math.max(0, trackWidth - bubbleWidth)));

      let tailLeft = tickCenter - left;
      const safePadding = Math.min(TAIL_EDGE_PADDING, bubbleWidth / 2 - 4);
      if (safePadding > 0) {
        tailLeft = Math.max(
          safePadding,
          Math.min(tailLeft, bubbleWidth - safePadding)
        );
      } else {
        tailLeft = bubbleWidth / 2;
      }

      setBubbleBox({ left, tailLeft, ready: true });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  const active = TIMELINE[activeIndex];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5efe8] px-4 py-10 sm:px-8 sm:py-14">
      <div className="w-full max-w-6xl">
        {/* ===== Vision / Mission card ===== */}
        <div className="rounded-[28px] bg-white shadow-sm px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Image placeholder */}
            <div
  className="relative w-full md:w-[300px] lg:w-[340px] aspect-[4/5] md:aspect-auto md:h-[360px] rounded-2xl shrink-0 overflow-hidden"
>
  <Image
    src="/images/vision.png"
    alt="Description"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 300px, 340px"
  />
</div>

            <div className="flex-1 flex flex-col justify-center gap-8">
              <div>
                <h2 className="text-3xl sm:text-[34px] font-display tracking-tight text-neutral-950 mb-3">
                  Vision
                </h2>
                <div className="flex gap-3">
                  <span
                    className="w-[3px] shrink-0 rounded-full bg-[#ae1431]"
                    aria-hidden="true"
                  />
                  <p className="text-[13.5px] font-rethink leading-relaxed text-neutral-700 max-w-xl">
                    To build disciplined, inclusive, and future-ready
                    educational institutions that expand opportunity while
                    maintaining academic excellence.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-[34px] font-display tracking-tight text-neutral-950 mb-4">
                  Mission
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    "To deliver structured, value-based education aligned with national academic standards.",
                    "To strengthen institutional systems through continuous evaluation and faculty development.",
                    "To integrate sports, culture, and exposure-based learning into formal academics.",
                    "To serve communities through responsible and sustainable educational initiatives.",
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3">
                      <span
                        className="w-[3px] shrink-0 rounded-full bg-[#ae1431]"
                        aria-hidden="true"
                      />
                      <p className="text-[13.5px] font-rethink leading-relaxed text-neutral-700">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Timeline section ===== */}
        <div className="mt-12 sm:mt-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-[3px] h-6 rounded-full bg-[#ae1431]" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-display tracking-tight text-neutral-950">
              The Journey of ERAM
            </h3>
          </div>

          {/* speech bubble */}
          <div className="relative h-24 sm:h-20">
            <div
              ref={bubbleRef}
              className="absolute bottom-0 transition-[left] duration-300 ease-out"
              style={{
                left: bubbleBox.left,
                visibility: bubbleBox.ready ? "visible" : "hidden",
              }}
            >
              <div className="relative rounded-2xl px-6 py-4 text-white shadow-md max-w-[260px] sm:max-w-[300px] w-max bg-[#ae1431]">
                <p className="text-[15px] sm:text-base font-rethink leading-snug">
                  {active.label}
                </p>
                <div
                  className="absolute -bottom-[10px] w-4 h-4 rotate-45 bg-[#ae1431] transition-[left] duration-300 ease-out"
                  style={{ left: bubbleBox.tailLeft, transform: "translateX(-50%) rotate(90deg)" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* years + progress ticks */}
          <div ref={trackRef} className="flex gap-x-2 sm:gap-x-3 mt-4">
            {TIMELINE.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => goTo(i)}
                  className="flex-1 min-w-0 flex flex-col items-center gap-3 py-2 group focus:outline-none"
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${item.year}: ${item.label}`}
                >
                  <span
                    className={
                      "text-xs sm:text-sm font-rethink tracking-wide transition-colors " +
                      (isActive
                        ? "text-neutral-950"
                        : "text-neutral-400 group-hover:text-neutral-600")
                    }
                  >
                    {item.year}
                  </span>

                  <span className="relative w-full h-[3px] rounded-full overflow-hidden bg-neutral-300">
                    {isActive && (
                      <span
                        key={runId}
                        className="absolute inset-y-0 left-0 rounded-full bg-[#ae1431] animate-[eram-fill_6000ms_linear_forwards]"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirst}
              aria-label="Previous milestone"
              className="w-10 h-10 rounded-full cursor-pointer border flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-neutral-400 text-neutral-700 hover:border-neutral-600 hover:text-neutral-950"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next milestone"
              className="w-10 h-10 rounded-full cursor-pointer border flex items-center justify-center transition-colors border-neutral-400 text-neutral-700 hover:border-neutral-600 hover:text-neutral-950"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes eram-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}