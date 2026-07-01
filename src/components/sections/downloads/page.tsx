"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://eram-backend-ejgy.onrender.com";

// ─── Types ───────────────────────────────────────────────────────────────────

type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  institution?: string;
  fileType: string;
  href: string;
};

type RawDownload = {
  _id: string;
  title: string;
  description: string;
  category: "prospectus" | "forms" | "circulars" | "policies";
  institution: "general" | "ease" | "mmhss" | "mmite" | "mmps" | "amlp";
  fileType: string;
  fileUrl: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  prospectus: "Prospectus",
  forms: "Forms",
  circulars: "Circulars",
  policies: "Policies",
};

const INSTITUTION_LABEL: Record<string, string> = {
  general: "General",
  ease: "EASE",
  mmhss: "MMHSS",
  mmite: "MMITE",
  mmps: "MMPS",
  amlp: "AMLP",
};

function mapDownload(d: RawDownload): DownloadItem {
  return {
    id: d._id,
    title: d.title,
    description: d.description,
    category: CATEGORY_LABEL[d.category] || d.category,
    institution: d.institution && d.institution !== "general" ? INSTITUTION_LABEL[d.institution] : undefined,
    fileType: d.fileType || "PDF",
    href: d.fileUrl,
  };
}

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

  function getDownloadUrl(url: string) {
  // Cloudinary URLs-il fl_attachment flag add cheyyuka, force download-inu vendi
  if (url.includes("res.cloudinary.com")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
}

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
  }, [item.id]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: 0 }}
      className="group relative flex flex-col border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-300 cursor-pointer"
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#ae1431] transition-all duration-500"
        style={{ width: hovered ? "100%" : "0%" }}
      />

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.institution && (
              <span className="font-rethink text-[10px] tracking-[0.18em] uppercase text-[#ae1431] border border-[#ae1431]/30 px-2 py-0.5">
                {item.institution}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-white/20 group-hover:text-[#ae1431] transition-colors duration-300">
            <IconFile className="opacity-60" />
          </div>
        </div>

        <h3 className="font-display text-[1.1rem] leading-snug text-white/90 group-hover:text-white transition-colors duration-200">
          {item.title}
        </h3>

        <p className="font-rethink text-sm text-white/40 leading-relaxed flex-1">
          {item.description}
        </p>
      </div>

      <a
         href={getDownloadUrl(item.href)}
        download
        target="_blank"
        rel="noopener noreferrer"
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
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CATEGORIES = ["All", "Prospectus", "Forms", "Circulars", "Policies"] as const;
  type Category = (typeof CATEGORIES)[number];

  const INSTITUTIONS = ["All Type", "General", "EASE", "MMHSS", "MMITE", "MMPS", "AMLP"] as const;
  type Institution = (typeof INSTITUTIONS)[number];

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeInstitution, setActiveInstitution] = useState<Institution>("All Type");

  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // ── Fetch downloads from backend ──
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDownloads() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BACKEND_URL}/api/downloads`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch downloads");
        const data: RawDownload[] = await res.json();
        setDownloads(data.map(mapDownload));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load documents. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDownloads();
    return () => controller.abort();
  }, []);

  const matchesInstitution = (d: DownloadItem, inst: Institution) =>
    inst === "All Type" ||
    (inst === "General" ? !d.institution : d.institution === inst);

  const filtered = downloads.filter(
    (d) =>
      (activeCategory === "All" || d.category === activeCategory) &&
      matchesInstitution(d, activeInstitution)
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
    downloads.filter(
      (d) => (cat === "All" || d.category === cat) && matchesInstitution(d, activeInstitution)
    ).length;

  const countPerInstitution = (inst: Institution) =>
    downloads.filter(
      (d) =>
        (activeCategory === "All" || d.category === activeCategory) &&
        matchesInstitution(d, inst)
    ).length;

  const headlineWords = ["Resources &", "Downloads"];

  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] text-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">

        <div ref={eyebrowRef} className="flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
          <span className="font-rethink text-[11px] tracking-[0.22em] uppercase text-white/30">
            Downloads
          </span>
          <span className="h-px w-12 bg-[#ae1431]" />
          <span className="font-rethink text-[11px] tracking-[0.22em] uppercase text-white/30">
            Resources
          </span>
        </div>

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

        <p
          ref={subRef}
          className="font-rethink mt-6 text-base text-white/40 max-w-[520px] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Official documents, forms, prospectuses, and policy circulars from ERAM Education and its institutions. All files are provided as PDF downloads.
        </p>

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
          className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
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

          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none border-t md:border-t-0 md:border-l border-white/[0.06]">
            {INSTITUTIONS.map((inst) => (
              <button
                key={inst}
                onClick={() => setActiveInstitution(inst)}
                className={`
                  font-rethink relative flex items-center gap-2 px-5 py-4 text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 whitespace-nowrap border-b-2
                  ${activeInstitution === inst
                    ? "text-white border-[#ae1431]"
                    : "text-white/35 border-transparent hover:text-white/60 hover:border-white/20"
                  }
                `}
              >
                {inst}
                <span className={`font-rethink text-[9px] transition-colors duration-200 ${activeInstitution === inst ? "text-[#ae1431]" : "text-white/20"}`}>
                  {countPerInstitution(inst)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-[1400px] mx-auto">

        <div className="flex items-baseline justify-between mb-10">
          <div>
            <span className="font-rethink text-[11px] tracking-[0.2em] uppercase text-white/25">
              {activeCategory === "All" ? "All Resources" : activeCategory}
              {activeInstitution !== "All Type" ? ` · ${activeInstitution}` : ""}
            </span>
            {!loading && (
              <span className="font-rethink ml-3 text-[11px] text-white/20">
                — {filtered.length} {filtered.length === 1 ? "document" : "documents"}
              </span>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#0a0a0a] p-6 h-[220px] animate-pulse">
                <div className="h-3 w-16 bg-white/[0.06] mb-6" />
                <div className="h-4 w-3/4 bg-white/[0.06] mb-3" />
                <div className="h-3 w-full bg-white/[0.04] mb-2" />
                <div className="h-3 w-2/3 bg-white/[0.04]" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <p className="font-rethink text-white/30 text-sm tracking-widest uppercase">
              {error}
            </p>
          </div>
        )}

        {/* Cards grid */}
        {!loading && !error && (
          <div
            key={`${activeCategory}-${activeInstitution}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]"
          >
            {filtered.map((item, i) => (
              <div key={item.id} className="bg-[#0a0a0a]">
                <DownloadCard item={item} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
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