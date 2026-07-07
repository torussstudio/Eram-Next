"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X } from "lucide-react";
import api from "@/lib/api";

const ICONS = ["🏆", "🏅", "🎯", "⚡"];

type SportsEvent = {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  institution: string;
  date: string;
  tag?: string;
  isPinned?: boolean;
  image?: string;
  publicId?: string;
};

export default function CommunitySection() {
  const [sportsEvents, setSportsEvents] = useState<SportsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state — full-size preview when an event thumbnail is clicked
  const [previewItem, setPreviewItem] = useState<SportsEvent | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const openPreview = (item: SportsEvent) => setPreviewItem(item);
  const closePreview = () => {
    // animate out, then clear state
    if (overlayRef.current && panelRef.current) {
      gsap.to(panelRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setPreviewItem(null),
      });
    } else {
      setPreviewItem(null);
    }
  };

  useEffect(() => {
    if (!previewItem || !overlayRef.current || !panelRef.current) return;
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 0, scale: 0.92 });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(panelRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [previewItem]);

  useEffect(() => {
    if (!previewItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewItem]);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/events")
      .then(({ data }) => {
        if (cancelled) return;
        const filtered: SportsEvent[] = (data as SportsEvent[])
          .filter((item) => item.category === "sports")
          .sort((a, b) => {
            // Pinned items first, then most recent
            if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .slice(0, 4);
        setSportsEvents(filtered);
      })
      .catch((err) => console.error("Failed to fetch sports events:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
              {!loading && sportsEvents.length > 0 && (
                <span className="hidden sm:inline font-rethink text-[12px] text-[#a89e93]">
                  {String(sportsEvents.length).padStart(2, "0")} Events
                </span>
              )}
            </div>

            {loading ? (
              <div className="border-t border-[#cfc6bb]">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-[#cfc6bb] py-[20px] md:py-[26px]"
                  >
                    <div className="h-4 w-2/3 max-w-sm animate-pulse rounded bg-black/5" />
                  </div>
                ))}
              </div>
            ) : sportsEvents.length === 0 ? (
              <div className="border-t border-b border-[#cfc6bb] py-[32px] text-center">
                <p className="font-rethink text-[14px] text-[#7d746c]">
                  No sports events listed yet — check back soon.
                </p>
              </div>
            ) : (
              <div className="border-t border-[#cfc6bb]">
                {sportsEvents.map((item: SportsEvent, i: number) => (
                  <div
                    key={item._id}
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

                      {/* thumbnail / icon */}
                      {item.type === "event" && item.image ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview(item);
                          }}
                          aria-label={`Preview image for ${item.title}`}
                          className="relative w-[40px] h-[40px] md:w-[46px] md:h-[46px] shrink-0 overflow-hidden rounded-[8px] ring-1 ring-black/10 group-hover:ring-white/30 transition-all duration-300 cursor-zoom-in"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </button>
                      ) : (
                        <span className="text-[20px] md:text-[22px] shrink-0 transition-transform duration-300 group-hover:scale-110">
                          {ICONS[i % ICONS.length]}
                        </span>
                      )}

                      {/* title + desc */}
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                        <h3 className="font-display text-[16px] md:text-[18px] text-[#1a1a1a] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                          {item.title}
                        </h3>
                        <p className="font-rethink text-[13px] md:text-[14px] text-[#7d746c] group-hover:text-white/80 transition-colors duration-300 truncate">
                          {item.description}
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
            )}
          </div>
        </div>
      </div>

      {/* Image preview lightbox */}
      {previewItem && (
        <div
          ref={overlayRef}
          onClick={closePreview}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
        >
          <div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-[14px] overflow-hidden bg-[#F5EFE8]"
          >
            <button
              type="button"
              onClick={closePreview}
              aria-label="Close preview"
              className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <img
              src={previewItem.image}
              alt={previewItem.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <h3 className="font-display text-[18px] sm:text-[20px] text-[#1a1a1a]">
                {previewItem.title}
              </h3>
              <p className="font-rethink text-[13.5px] text-[#4a433c] mt-1 leading-[1.7]">
                {previewItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}