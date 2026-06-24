"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  institution?: string;
  fileType: string;
  fileSize: string;
  href: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const DOWNLOADS: DownloadItem[] = [
  // Prospectus
  {
    id: "d01",
    title: "ERAM Education Prospectus 2026–27",
    description: "Complete institutional overview, admission criteria, and programme details across all five ERAM institutions.",
    category: "Prospectus",
    fileType: "PDF",
    fileSize: "4.2 MB",
    href: "/prospectus.pdf",
  },
  {
    id: "d02",
    title: "EASE (CBSE) School Prospectus",
    description: "Admissions guide, curriculum structure, and fee schedule for the CBSE wing.",
    category: "Prospectus",
    institution: "EASE",
    fileType: "PDF",
    fileSize: "2.1 MB",
    href: "/downloads/ease-prospectus.pdf",
  },
  {
    id: "d03",
    title: "MMHSS Higher Secondary Prospectus",
    description: "Stream selection, subject combinations, and admission procedure for Plus One & Plus Two.",
    category: "Prospectus",
    institution: "MMHSS",
    fileType: "PDF",
    fileSize: "1.8 MB",
    href: "/downloads/mmhss-prospectus.pdf",
  },
  {
    id: "d04",
    title: "MMITE Teacher Training Prospectus",
    description: "D.El.Ed programme details, eligibility, and training curriculum for the 2026–27 batch.",
    category: "Prospectus",
    institution: "MMITE",
    fileType: "PDF",
    fileSize: "1.5 MB",
    href: "/downloads/mmite-prospectus.pdf",
  },
  // Forms
  {
    id: "d05",
    title: "General Admission Application Form",
    description: "Unified admission application form applicable to MMHSS, MMPS, and AMLP institutions.",
    category: "Forms",
    fileType: "PDF",
    fileSize: "320 KB",
    href: "/downloads/admission-form.pdf",
  },
  {
    id: "d06",
    title: "EASE Admission Form 2026–27",
    description: "Printable admission form for the CBSE school. Fill and submit at the admissions office.",
    category: "Forms",
    institution: "EASE",
    fileType: "PDF",
    fileSize: "280 KB",
    href: "/downloads/ease-admission-form.pdf",
  },
  {
    id: "d07",
    title: "Transfer Certificate Request Form",
    description: "Form for requesting a Transfer Certificate from the institution's administration office.",
    category: "Forms",
    fileType: "PDF",
    fileSize: "150 KB",
    href: "/downloads/tc-request-form.pdf",
  },
  {
    id: "d08",
    title: "Sports Arena Booking Form",
    description: "Request form for booking the ERAM Sports Arena for events, tournaments, or group training sessions.",
    category: "Forms",
    fileType: "PDF",
    fileSize: "190 KB",
    href: "/downloads/sports-booking-form.pdf",
  },
  // Circulars
  {
    id: "d09",
    title: "Academic Calendar 2026–27",
    description: "Full-year academic calendar including exam schedules, holidays, and institutional events.",
    category: "Circulars",
    fileType: "PDF",
    fileSize: "560 KB",
    href: "/downloads/academic-calendar-2026.pdf",
  },
  {
    id: "d10",
    title: "Fee Structure — All Institutions",
    description: "Consolidated fee structure for 2026–27 across EASE, MMHSS, MMPS, AMLP, and MMITE.",
    category: "Circulars",
    fileType: "PDF",
    fileSize: "420 KB",
    href: "/downloads/fee-structure-2026.pdf",
  },
  {
    id: "d11",
    title: "Uniform & Dress Code Policy",
    description: "Official guidelines for student uniform, grooming standards, and dress code across institutions.",
    category: "Circulars",
    fileType: "PDF",
    fileSize: "250 KB",
    href: "/downloads/uniform-policy.pdf",
  },
  // Policies
  {
    id: "d12",
    title: "Anti-Ragging Policy",
    description: "Institutional anti-ragging framework, reporting procedures, and disciplinary provisions.",
    category: "Policies",
    fileType: "PDF",
    fileSize: "310 KB",
    href: "/downloads/anti-ragging-policy.pdf",
  },
  {
    id: "d13",
    title: "Student Safety Guidelines",
    description: "Campus safety protocols, emergency procedures, and safeguarding responsibilities.",
    category: "Policies",
    fileType: "PDF",
    fileSize: "380 KB",
    href: "/downloads/safety-guidelines.pdf",
  },
  {
    id: "d14",
    title: "Privacy Policy",
    description: "Data handling, student information privacy, and parent consent procedures.",
    category: "Policies",
    fileType: "PDF",
    fileSize: "220 KB",
    href: "/downloads/privacy-policy.pdf",
  },
];

const CATEGORIES = ["All", "Prospectus", "Forms", "Circulars", "Policies"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Icons (Phosphor-style inline SVG — no hand-rolled illustration) ──────────

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconFile({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ─── DownloadCard ─────────────────────────────────────────────────────────────

function DownloadCard({ item, index }: { item: DownloadItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: (index % 3) * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: 0 }}
      className="group relative flex flex-col border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-300 cursor-pointer"
    >
      {/* top stripe accent on hover */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#ae1431] transition-all duration-500"
        style={{ width: hovered ? "100%" : "0%" }}
      />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.institution && (
              <span className="font-rethink text-[10px] tracking-[0.18em] uppercase text-[#ae1431] border border-[#ae1431]/30 px-2 py-0.5">
                {item.institution}
              </span>
            )}
            <span className="font-rethink text-[10px] tracking-[0.16em] uppercase text-white/30">
              {item.fileType} · {item.fileSize}
            </span>
          </div>
          <div className="flex items-center gap-1 text-white/20 group-hover:text-[#ae1431] transition-colors duration-300">
            <IconFile className="opacity-60" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-[1.1rem] leading-snug text-white/90 group-hover:text-white transition-colors duration-200">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-rethink text-sm text-white/40 leading-relaxed flex-1">
          {item.description}
        </p>
      </div>

      {/* Download CTA */}
      <a
        href={item.href}
        download
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06] group-hover:border-white/[0.1] transition-colors duration-300"
      >
        <span className="font-rethink text-[11px] tracking-[0.16em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-200">
          Download
        </span>
        <div className="flex items-center gap-2 text-white/30 group-hover:text-[#ae1431] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <IconDownload />
          <IconArrow />
        </div>
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const filtered = DOWNLOADS.filter(
    (d) => activeCategory === "All" || d.category === activeCategory
  );

  // Hero entrance
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 });
    }
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        "-=0.3"
      );
    }
    if (subRef.current) {
      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }
    if (dividerRef.current) {
      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut", transformOrigin: "left center" }, "-=0.4");
    }
    if (filterRef.current) {
      tl.fromTo(filterRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");
    }
  }, []);

  const countPerCategory = (cat: Category) =>
    cat === "All" ? DOWNLOADS.length : DOWNLOADS.filter((d) => d.category === cat).length;

  const headlineWords = ["Resources &", "Downloads"];

  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] text-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
          <span className="font-rethink text-[11px] tracking-[0.22em] uppercase text-white/30">
            Downloads
          </span>
          <span className="h-px w-12 bg-[#ae1431]" />
          <span className="font-rethink text-[11px] tracking-[0.22em] uppercase text-white/30">
            Resources
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-white overflow-hidden"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-4 opacity-0">
              {i === 1 ? (
                <em className="not-italic text-white/40">{word}</em>
              ) : word}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="font-rethink mt-6 text-base text-white/40 max-w-[520px] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Official documents, forms, prospectuses, and policy circulars from ERAM Education and its institutions. All files are provided as PDF downloads.
        </p>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mt-12 h-px bg-white/[0.08] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </section>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <section className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06] px-6 md:px-12 lg:px-20">
        <div
          ref={filterRef}
          className="max-w-[1400px] mx-auto flex items-center gap-0 overflow-x-auto scrollbar-none py-0"
          style={{ opacity: 0 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                font-rethink relative flex items-center gap-2 px-5 py-4 text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 whitespace-nowrap border-b-2
                ${activeCategory === cat
                  ? "text-white border-[#ae1431]"
                  : "text-white/35 border-transparent hover:text-white/60 hover:border-white/20"
                }
              `}
            >
              {cat}
              <span className={`font-rethink text-[9px] transition-colors duration-200 ${activeCategory === cat ? "text-[#ae1431]" : "text-white/20"}`}>
                {countPerCategory(cat)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-[1400px] mx-auto">

        {/* Category heading */}
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <span className="font-rethink text-[11px] tracking-[0.2em] uppercase text-white/25">
              {activeCategory === "All" ? "All Resources" : activeCategory}
            </span>
            <span className="font-rethink ml-3 text-[11px] text-white/20">
              — {filtered.length} {filtered.length === 1 ? "document" : "documents"}
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]"
        >
          {filtered.map((item, i) => (
            <div key={item.id} className="bg-[#0a0a0a]">
              <DownloadCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-rethink text-white/20 text-sm tracking-widest uppercase">
              No documents in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* ── Contact Strip ─────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-rethink text-[11px] tracking-[0.2em] uppercase text-white/25 mb-2">
              Can't find what you need?
            </p>
            <p className="font-rethink text-white/50 text-sm max-w-md leading-relaxed">
              Contact the admissions office directly for institution-specific documents, custom certificates, or records requests.
            </p>
          </div>
          <a
            href="/contact"
            className="group flex items-center gap-3 border border-white/[0.12] hover:border-[#ae1431]/60 px-6 py-3.5 text-[11px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-all duration-300"
          >
            <span className="font-rethink">Contact Us</span>
            <IconArrow className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </section>

    </main>
  );
}