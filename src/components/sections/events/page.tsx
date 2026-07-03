"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://eram-backend-ejgy.onrender.com";

// ─── Types ───────────────────────────────────────────────────────────────────

type EventCategory = "ALL" | "ACADEMIC" | "SPORTS" | "CULTURAL" | "NOTICE";
type EventType = "ALL" | "EVENT" | "NOTIFICATION" | "CIRCULAR";

interface EramEvent {
  id: string;
  category: Exclude<EventCategory, "ALL">;
  type: Exclude<EventType, "ALL">;
  title: string;
  date: string;
  month: string;
  day: string;
  institution?: string;
  description: string;
  tag?: string;
  isNew?: boolean;
  isPinned?: boolean;
}

type RawEvent = {
  _id: string;
  title: string;
  description: string;
  category: "academic" | "sports" | "cultural" | "notice";
  type: "event" | "notification" | "circular";
  institution: "general" | "ease" | "mmhss" | "mmite" | "mmps" | "amlp";
  date: string;
  tag?: string;
  isNew?: boolean;
  isPinned?: boolean;
};

const INSTITUTION_LABEL: Record<string, string> = {
  general: "All Institutions",
  ease: "EASE",
  mmhss: "MMHSS",
  mmite: "MMITE",
  mmps: "MMPS",
  amlp: "AMLP",
};

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function mapEvent(e: RawEvent): EramEvent {
  const d = new Date(e.date);
  return {
    id: e._id,
    category: e.category.toUpperCase() as EramEvent["category"],
    type: e.type.toUpperCase() as EramEvent["type"],
    title: e.title,
    description: e.description,
    date: d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    month: MONTHS[d.getMonth()],
    day: String(d.getDate()).padStart(2, "0"),
    institution: INSTITUTION_LABEL[e.institution] || e.institution,
    tag: e.tag,
    isNew: e.isNew,
    isPinned: e.isPinned,
  };
}

const CATEGORIES: EventCategory[] = [
  "ALL",
  "ACADEMIC",
  "SPORTS",
  "CULTURAL",
  "NOTICE",
];

const CAT_LABEL: Record<EventCategory, string> = {
  ALL: "All",
  ACADEMIC: "Academic",
  SPORTS: "Sports",
  CULTURAL: "Cultural",
  NOTICE: "Notices",
};

// ─── TypePill ────────────────────────────────────────────────────────────────

function TypePill({ type }: { type: EramEvent["type"] }) {
  const colors: Record<EramEvent["type"], string> = {
    EVENT: "border-[#ae1431]/60 text-[#ae1431]",
    NOTIFICATION: "border-white/20 text-white/60",
    CIRCULAR: "border-amber-500/40 text-amber-400/80",
  };
  return (
    <span
      className={`inline-block shrink-0 border px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase ${colors[type]}`}
    >
      {type}
    </span>
  );
}

// ─── EventCard ───────────────────────────────────────────────────────────────

function EventCard({ ev, index }: { ev: EramEvent; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        delay: Math.min(index * 0.06, 0.3),
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [ev.id]);

  return (
    <div
      ref={cardRef}
      className="group relative flex gap-4 sm:gap-5 border-b border-white/[0.07] py-6 sm:py-7 opacity-0 transition-colors hover:bg-white/[0.025]"
    >
      <div className="hidden xs:flex flex-shrink-0 w-11 sm:w-14 flex-col items-center pt-0.5">
        <span className="text-xl sm:text-2xl leading-none text-white">
          {ev.day}
        </span>
        <span className="mt-0.5 text-[8px] tracking-[0.18em] uppercase text-white/30">
          {ev.month}
        </span>
      </div>

      <div className="hidden xs:block w-px bg-white/[0.08] self-stretch flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="flex xs:hidden items-baseline gap-2 mb-2">
          <span className="text-base text-white/60 leading-none">
            {ev.day}
          </span>
          <span className="text-[9px] tracking-[0.16em] uppercase text-white/25">
            {ev.month}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <TypePill type={ev.type} />
          {ev.tag && (
            <span className="text-[9px] tracking-[0.14em] uppercase text-white/25 hidden sm:inline">
              {ev.tag}
            </span>
          )}
          {ev.isNew && (
            <span className="inline-flex items-center gap-1 text-[9px] tracking-[0.14em] uppercase text-[#ae1431]">
              <span className="inline-block w-1 h-1 rounded-full bg-[#ae1431] animate-pulse" />
              NEW
            </span>
          )}
          {ev.isPinned && (
            <span className="text-[9px] tracking-[0.14em] uppercase text-amber-400/70">
              PINNED
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg md:text-xl text-white/90 leading-snug mb-1.5 group-hover:text-white transition-colors">
          {ev.title}
        </h3>

        {ev.institution && (
          <p className="text-[10px] tracking-[0.14em] uppercase text-[#ae1431]/70 mb-2">
            {ev.institution}
          </p>
        )}

        <p className="text-xs sm:text-sm text-white/38 leading-relaxed line-clamp-2">
          {ev.description}
        </p>
      </div>

      <div className="hidden md:flex flex-shrink-0 items-start pt-1">
        <svg
          className="w-4 h-4 text-white/15 transition-all duration-300 group-hover:text-white/50 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [events, setEvents] = useState<EramEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<EventCategory>("ALL");
  const [activeType, setActiveType] = useState<EventType>("ALL");

  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // ── Fetch events from backend ──
  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BACKEND_URL}/api/events`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: RawEvent[] = await res.json();
        setEvents(data.map(mapEvent));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load events. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
    return () => controller.abort();
  }, []);

  // Hero entrance
  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
      .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(filterRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  }, { scope: heroRef });

  // Stats fade-in
  useGSAP(() => {
    if (!statsRef.current) return;
    gsap.fromTo(
      statsRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
      }
    );
  }, { scope: statsRef, dependencies: [loading] });

  const filtered = events.filter((ev) => {
    const catMatch = activeCategory === "ALL" || ev.category === activeCategory;
    const typeMatch = activeType === "ALL" || ev.type === activeType;
    return catMatch && typeMatch;
  });

  const pinned = filtered.filter((e) => e.isPinned);
  const rest = filtered.filter((e) => !e.isPinned);

  const totalEvents = events.filter((e) => e.type === "EVENT").length;
  const totalNotifs = events.filter((e) => e.type === "NOTIFICATION").length;
  const totalCirculars = events.filter((e) => e.type === "CIRCULAR").length;

  return (
    <main className="min-h-screen" style={{ background: "#0a0a0a", color: "#fff" }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/[0.07] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ae1431 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto">
          <span
            ref={labelRef}
            className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#ae1431] mb-5 sm:mb-6 opacity-0"
          >
            ERAM EDUCATION
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <h1
              ref={headingRef}
              className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight opacity-0"
            >
              Events &amp;
              <br />
              <span className="text-white/30">Notifications</span>
            </h1>
            <p
              ref={subRef}
              className="max-w-xs sm:max-w-sm text-xs sm:text-sm text-white/40 leading-relaxed md:text-right opacity-0"
            >
              Stay informed on upcoming events, academic circulars, and
              institutional announcements across all ERAM institutions.
            </p>
          </div>

          <div ref={filterRef} className="mt-8 sm:mt-10 flex flex-col gap-3 opacity-0">
            <div className="overflow-x-auto pb-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-1 border border-white/[0.08] p-1 w-max sm:w-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-3 py-2 sm:py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-[#ae1431] text-white"
                        : "text-white/35 hover:text-white/70"
                    }`}
                  >
                    {CAT_LABEL[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="overflow-x-auto pb-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-1 border border-white/[0.08] p-1 w-max">
                  {(["ALL", "EVENT", "NOTIFICATION", "CIRCULAR"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveType(t)}
                      className={`whitespace-nowrap px-3 py-2 sm:py-1.5 text-[10px] tracking-[0.12em] uppercase transition-all duration-200 ${
                        activeType === t
                          ? "bg-white/10 text-white"
                          : "text-white/30 hover:text-white/55"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-[10px] tracking-[0.14em] uppercase text-white/20 ml-auto shrink-0">
                {filtered.length} RESULTS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div
        ref={statsRef}
        className="border-b border-white/[0.07] px-4 sm:px-6 md:px-12 lg:px-20 opacity-0"
      >
        <div className="max-w-6xl mx-auto py-4 sm:py-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 sm:gap-x-10 gap-y-3">
          {[
            { label: "Upcoming Events", value: totalEvents },
            { label: "Notifications", value: totalNotifs },
            { label: "Circulars", value: totalCirculars },
            { label: "Institutions", value: 5 },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl text-white/80">
                {s.value}
              </span>
              <span className="text-[9px] tracking-[0.14em] uppercase text-white/25 leading-none">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">
          {/* Loading */}
          {loading && (
            <div className="py-16 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                Loading…
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-16 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && (
            <>
              {pinned.length > 0 && (
                <div className="mb-8 sm:mb-10">
                  <p className="text-[9px] tracking-[0.22em] uppercase text-amber-400/60 mb-3 sm:mb-4">
                    ◆ PINNED
                  </p>
                  <div className="border border-amber-500/10 bg-amber-500/[0.025] px-4 sm:px-6">
                    {pinned.map((ev, i) => (
                      <EventCard key={ev.id} ev={ev} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {rest.length > 0 ? (
                <div>
                  {pinned.length > 0 && (
                    <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-3 sm:mb-4">
                      ALL UPDATES
                    </p>
                  )}
                  <div className="border-t border-white/[0.07]">
                    {rest.map((ev, i) => (
                      <EventCard key={ev.id} ev={ev} index={i} />
                    ))}
                  </div>
                </div>
              ) : (
                !pinned.length && (
                  <div className="py-16 sm:py-20 text-center">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">
                      No results found
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Subscribe band ── */}
      <section className="border-t border-white/[0.07] px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#ae1431] mb-3">
              STAY UPDATED
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white leading-snug">
              Never miss an
              <br />
              announcement.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch w-full md:w-auto border border-white/[0.12]">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full sm:min-w-[200px] md:min-w-[220px] bg-transparent px-4 sm:px-5 py-3.5 text-sm text-white placeholder-white/25 outline-none border-b sm:border-b-0 sm:border-r border-white/[0.12]"
            />
            <button className="bg-[#ae1431] px-6 py-3.5 text-[10px] tracking-[0.2em] uppercase text-white hover:bg-[#c4172a] transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <div className="border-t border-white/[0.05] px-4 sm:px-6 md:px-12 lg:px-20 py-5 sm:py-6">
        <div className="max-w-6xl mx-auto flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1.5 xs:gap-0">
          <span className="text-[9px] tracking-[0.16em] uppercase text-white/15">
            ERAM EDUCATION — EVENTS & NOTIFICATIONS
          </span>
          <span className="text-[9px] tracking-[0.14em] uppercase text-white/15">
            PALAKKAD, KERALA
          </span>
        </div>
      </div>
    </main>
  );
}