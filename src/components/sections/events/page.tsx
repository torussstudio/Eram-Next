"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

type EventCategory = "ALL" | "ACADEMIC" | "SPORTS" | "CULTURAL" | "NOTICE";

interface EramEvent {
  id: number;
  category: Exclude<EventCategory, "ALL">;
  type: "EVENT" | "NOTIFICATION" | "CIRCULAR";
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

const EVENTS: EramEvent[] = [
  {
    id: 1,
    category: "ACADEMIC",
    type: "NOTIFICATION",
    title: "Admissions Open 2026–27",
    date: "June 1, 2026",
    month: "JUN",
    day: "01",
    institution: "All Institutions",
    description:
      "Applications are now being accepted for the academic year 2026–27 across all ERAM institutions. Kindly submit completed forms before the deadline.",
    tag: "ADMISSIONS",
    isNew: true,
    isPinned: true,
  },
  {
    id: 2,
    category: "ACADEMIC",
    type: "CIRCULAR",
    title: "Class X & XII Board Result Announcement",
    date: "May 28, 2026",
    month: "MAY",
    day: "28",
    institution: "MMHSS",
    description:
      "MMHSS proudly announces outstanding board results for Class X and XII. Detailed result sheets and merit lists will be published on the notice board.",
    tag: "RESULTS",
    isNew: true,
  },
  {
    id: 3,
    category: "SPORTS",
    type: "EVENT",
    title: "Inter-Institutional Sports Meet 2026",
    date: "July 14, 2026",
    month: "JUL",
    day: "14",
    institution: "ERAM Sports Arena",
    description:
      "Annual inter-school sports meet bringing together athletes from all five ERAM institutions. Events span athletics, football, volleyball, and indoor games.",
    tag: "SPORTS",
  },
  {
    id: 4,
    category: "CULTURAL",
    type: "EVENT",
    title: "Annual Day Celebrations",
    date: "August 3, 2026",
    month: "AUG",
    day: "03",
    institution: "EASE (CBSE)",
    description:
      "A grand celebration of student talent in performing arts, music, and drama. Parents and guardians are invited to attend the evening programme.",
    tag: "CULTURAL",
  },
  {
    id: 5,
    category: "NOTICE",
    type: "CIRCULAR",
    title: "Revised Academic Calendar 2026–27",
    date: "June 10, 2026",
    month: "JUN",
    day: "10",
    institution: "All Institutions",
    description:
      "The revised academic calendar for the year 2026–27 has been issued. Changes include updated examination schedules and holiday revisions.",
    tag: "CIRCULAR",
    isNew: true,
  },
  {
    id: 6,
    category: "ACADEMIC",
    type: "EVENT",
    title: "Teacher Development Workshop",
    date: "June 21, 2026",
    month: "JUN",
    day: "21",
    institution: "MMITE",
    description:
      "A structured professional development programme for faculty members, covering CBSE pedagogical updates, classroom management strategies, and evaluation frameworks.",
    tag: "FACULTY",
  },
  {
    id: 7,
    category: "SPORTS",
    type: "NOTIFICATION",
    title: "Football Team Selection Trials",
    date: "June 25, 2026",
    month: "JUN",
    day: "25",
    institution: "ERAM Sports Arena",
    description:
      "Selection trials for the ERAM inter-school football team will be conducted. Students from Classes VI to X are eligible to participate. Report to the sports ground by 7:00 AM.",
    tag: "TRIALS",
  },
  {
    id: 8,
    category: "CULTURAL",
    type: "EVENT",
    title: "Science Exhibition & Innovation Fair",
    date: "July 5, 2026",
    month: "JUL",
    day: "05",
    institution: "MMHSS",
    description:
      "Students present original science projects and innovations. Open to parents, alumni, and the public. A panel of judges will award certificates of excellence.",
    tag: "INNOVATION",
  },
  {
    id: 9,
    category: "NOTICE",
    type: "CIRCULAR",
    title: "Fee Remittance Deadline — Term 1",
    date: "June 30, 2026",
    month: "JUN",
    day: "30",
    institution: "All Institutions",
    description:
      "The last date for Term 1 fee remittance is June 30, 2026. Parents are requested to ensure timely payment to avoid late charges. Online payment portal is available.",
    tag: "FINANCE",
    isPinned: true,
  },
];

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
      className={`inline-block shrink-0 border px-2 py-0.5 text-[9px]  tracking-[0.15em] uppercase ${colors[type]}`}
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
        delay: Math.min(index * 0.06, 0.3), // cap stagger on mobile so it doesn't feel sluggish
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative flex gap-4 sm:gap-5 border-b border-white/[0.07] py-6 sm:py-7 opacity-0 transition-colors hover:bg-white/[0.025]"
    >
      {/* Date block — hidden on very small screens, shown xs+ */}
      <div className="hidden xs:flex flex-shrink-0 w-11 sm:w-14 flex-col items-center pt-0.5">
        <span className=" text-xl sm:text-2xl  leading-none text-white">
          {ev.day}
        </span>
        <span className="mt-0.5 text-[8px]  tracking-[0.18em] uppercase text-white/30">
          {ev.month}
        </span>
      </div>

      {/* Vertical divider — hidden on xs */}
      <div className="hidden xs:block w-px bg-white/[0.08] self-stretch flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row: on mobile show date inline */}
        <div className="flex xs:hidden items-baseline gap-2 mb-2">
          <span className=" text-base  text-white/60 leading-none">
            {ev.day}
          </span>
          <span className="text-[9px]  tracking-[0.16em] uppercase text-white/25">
            {ev.month}
          </span>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <TypePill type={ev.type} />
          {ev.tag && (
            <span className="text-[9px]  tracking-[0.14em] uppercase text-white/25 hidden sm:inline">
              {ev.tag}
            </span>
          )}
          {ev.isNew && (
            <span className="inline-flex items-center gap-1 text-[9px]  tracking-[0.14em] uppercase text-[#ae1431]">
              <span className="inline-block w-1 h-1 rounded-full bg-[#ae1431] animate-pulse" />
              NEW
            </span>
          )}
          {ev.isPinned && (
            <span className="text-[9px]  tracking-[0.14em] uppercase text-amber-400/70">
              PINNED
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className=" text-base sm:text-lg md:text-xl  text-white/90 leading-snug mb-1.5 group-hover:text-white transition-colors">
          {ev.title}
        </h3>

        {/* Institution */}
        {ev.institution && (
          <p className="text-[10px]  tracking-[0.14em] uppercase text-[#ae1431]/70 mb-2">
            {ev.institution}
          </p>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/38 leading-relaxed line-clamp-2">
          {ev.description}
        </p>
      </div>

      {/* Arrow — only on md+ */}
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
  const [activeCategory, setActiveCategory] = useState<EventCategory>("ALL");
  const [activeType, setActiveType] = useState<"ALL" | EramEvent["type"]>("ALL");

  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
  }, { scope: statsRef });

  const filtered = EVENTS.filter((ev) => {
    const catMatch = activeCategory === "ALL" || ev.category === activeCategory;
    const typeMatch = activeType === "ALL" || ev.type === activeType;
    return catMatch && typeMatch;
  });

  const pinned = filtered.filter((e) => e.isPinned);
  const rest = filtered.filter((e) => !e.isPinned);

  const totalEvents = EVENTS.filter((e) => e.type === "EVENT").length;
  const totalNotifs = EVENTS.filter((e) => e.type === "NOTIFICATION").length;
  const totalCirculars = EVENTS.filter((e) => e.type === "CIRCULAR").length;

  return (
    <main className="min-h-screen" style={{ background: "#0a0a0a", color: "#fff" }}>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/[0.07] overflow-hidden"
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ae1431 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <span
            ref={labelRef}
            className="inline-block text-[10px]  tracking-[0.25em] uppercase text-[#ae1431] mb-5 sm:mb-6 opacity-0"
          >
            ERAM EDUCATION
          </span>

          {/* Heading + sub */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <h1
              ref={headingRef}
              className=" text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl  text-white leading-[1.05] tracking-tight opacity-0"
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

          {/* ── Filter row ── */}
          <div ref={filterRef} className="mt-8 sm:mt-10 flex flex-col gap-3 opacity-0">

            {/* Row 1: Category tabs — horizontally scrollable on mobile */}
            <div className="overflow-x-auto pb-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-1 border border-white/[0.08] p-1 w-max sm:w-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-3 py-2 sm:py-1.5 text-[10px]  tracking-[0.15em] uppercase transition-all duration-200 ${
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

            {/* Row 2: Type tabs + result count */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Type tabs — scrollable on mobile */}
              <div className="overflow-x-auto pb-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-1 border border-white/[0.08] p-1 w-max">
                  {(["ALL", "EVENT", "NOTIFICATION", "CIRCULAR"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveType(t)}
                      className={`whitespace-nowrap px-3 py-2 sm:py-1.5 text-[10px]  tracking-[0.12em] uppercase transition-all duration-200 ${
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
              <span className=" text-xl sm:text-2xl  text-white/80">
                {s.value}
              </span>
              <span className="text-[9px]  tracking-[0.14em] uppercase text-white/25 leading-none">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">

          {/* Pinned */}
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

          {/* Main list */}
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
        </div>
      </section>

      {/* ── Subscribe band ── */}
      <section className="border-t border-white/[0.07] px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#ae1431] mb-3">
              STAY UPDATED
            </p>
            <h2 className=" text-2xl sm:text-3xl md:text-4xl text-white leading-snug">
              Never miss an
              <br />
              announcement.
            </h2>
          </div>

          {/* Input + button — stack on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch w-full md:w-auto border border-white/[0.12]">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full sm:min-w-[200px] md:min-w-[220px] bg-transparent px-4 sm:px-5 py-3.5 text-sm text-white placeholder-white/25 outline-none border-b sm:border-b-0 sm:border-r border-white/[0.12]"
            />
            <button className="bg-[#ae1431] px-6 py-3.5 text-[10px]  tracking-[0.2em] uppercase text-white hover:bg-[#c4172a] transition-colors whitespace-nowrap">
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