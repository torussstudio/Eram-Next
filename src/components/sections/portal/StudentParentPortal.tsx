"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Download,
  FileText,
  BookOpen,
  FileQuestion,
  CreditCard,
  Receipt,
  History,
  GraduationCap,
  Trophy,
  Palette,
  Megaphone,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type InstitutionKey = "AMLP" | "MMPS" | "MMHSS" | "EASE" | "MMITE";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://eram-backend-ejgy.onrender.com";

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
  image?: string;
};

type Notice = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

// ── Downloads (real backend data) ──
type RawDownload = {
  _id: string;
  title: string;
  description: string;
  category: "prospectus" | "forms" | "circulars" | "policies";
  institution: "general" | "ease" | "mmhss" | "mmite" | "mmps" | "amlp";
  fileType: string;
  fileExtension: string;
  fileUrl: string;
};

type Resource = {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileExtension: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  prospectus: "Prospectus",
  forms: "Forms",
  circulars: "Circulars",
  policies: "Policies",
};

function mapDownload(d: RawDownload): Resource {
  return {
    id: d._id,
    title: d.title,
    category: CATEGORY_LABEL[d.category] || d.category,
    fileType: d.fileType || "PDF",
    fileExtension: d.fileExtension || ".pdf",
  };
}

function toDisplayCategory(cat: RawEvent["category"]): string {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

function toDisplayDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toDisplayTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getNoticeIcon(category: string) {
  const c = category.toLowerCase();
  if (c.includes("academic"))
    return <GraduationCap className="text-[#ae1431]" size={20} />;
  if (c.includes("sport"))
    return <Trophy className="text-[#ae1431]" size={20} />;
  if (c.includes("cultural"))
    return <Palette className="text-[#ae1431]" size={20} />;
  return <Megaphone className="text-[#ae1431]" size={20} />;
}

function getResourceIcon(fileType: string) {
  const t = fileType.toUpperCase();
  if (t.includes("DOC"))
    return { icon: <FileQuestion className="text-blue-700" size={20} />, bg: "bg-blue-50" };
  if (t.includes("XLS"))
    return { icon: <BookOpen className="text-green-700" size={20} />, bg: "bg-green-50" };
  if (t.includes("PNG") || t.includes("JPG") || t.includes("JPEG"))
    return { icon: <FileText className="text-purple-700" size={20} />, bg: "bg-purple-50" };
  return { icon: <FileText className="text-red-700" size={20} />, bg: "bg-red-50" };
}

const StudentParentPortal = () => {
  const router = useRouter();
  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionKey>("MMPS");

  const [searchQuery, setSearchQuery] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);

  const [rawEvents, setRawEvents] = useState<RawEvent[]>([]);
  const [noticesLoading, setNoticesLoading] = useState(true);

  const [rawDownloads, setRawDownloads] = useState<RawDownload[]>([]);
  const [downloadsLoading, setDownloadsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setNoticesLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/events`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: RawEvent[] = await res.json();
        setRawEvents(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Failed to fetch events:", err);
        }
      } finally {
        setNoticesLoading(false);
      }
    }

    fetchEvents();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDownloads() {
      try {
        setDownloadsLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/downloads`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch downloads");
        const data: RawDownload[] = await res.json();
        setRawDownloads(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Failed to fetch downloads:", err);
        }
      } finally {
        setDownloadsLoading(false);
      }
    }

    fetchDownloads();
    return () => controller.abort();
  }, []);

  const institutions: {
    id: InstitutionKey;
    name: string;
    full: string;
  }[] = [
    { id: "AMLP", name: "AMLP", full: "AMLP (Lower Primary)" },
    { id: "MMPS", name: "MMPS", full: "MMPS (High School)" },
    { id: "MMHSS", name: "MMHSS", full: "MMHSS (Higher Secondary)" },
    { id: "EASE", name: "EASE", full: "EASE (CBSE)" },
    { id: "MMITE", name: "MMITE", full: "MMITE (Teacher Training)" },
  ];

  const notices: Notice[] = rawEvents
    .filter(
      (e) =>
        e.institution === selectedInstitution.toLowerCase() ||
        e.institution === "general"
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((e) => ({
      id: e._id,
      title: e.title,
      description: e.description,
      date: toDisplayDate(e.date),
      category: toDisplayCategory(e.category),
    }));

  const resources: Resource[] = rawDownloads
    .filter(
      (d) =>
        d.institution === selectedInstitution.toLowerCase() ||
        d.institution === "general"
    )
    .map(mapDownload);

  const filteredResources = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.fileType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Latest 4 EVENTS (not notifications) for the hero carousel
  const heroSlides = rawEvents
    .filter((e) => e.type === "event")
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const heroNotice = heroSlides[heroIndex];

  const handlePrevHero = () => {
    if (heroSlides.length === 0) return;
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextHero = () => {
    if (heroSlides.length === 0) return;
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE8] ">
      {/* ── Hero ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-rethink tracking-widest text-[#ae1431] uppercase mb-3">
              ERAM Group of Institutions
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-gray-900 leading-tight mb-3">
              Student Parent Portal
            </h1>
            <p className="text-sm font-rethink sm:text-base text-gray-600 leading-relaxed mb-6">
              Access institutional updates, the fee portal, study resources,
              and important academic information across the ERAM
              educational ecosystem.
            </p>
            <button className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[#ae1431] text-white hover:bg-black text-sm font-rethink uppercase tracking-wide rounded-xl active:scale-95 transition-all">
              Proceed to Full Portal <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

         {/* Hero banner */}
          <div
            key={heroNotice?._id}
className="relative w-full h-55 sm:h-70 md:h-65 rounded-2xl overflow-hidden shadow-sm bg-gray-900 bg-cover bg-center transition-all duration-500"            style={
              heroNotice?.image
                ? { backgroundImage: `url(${heroNotice.image})` }
                : undefined
            }
          >
            {!heroNotice?.image && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-3 opacity-25" />
                  <p className="text-sm opacity-40">Portal Hero Image</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 max-w-xl">
              <span className="inline-block text-[10px] font-rethink tracking-widest uppercase text-white/70 mb-2">
                {heroNotice ? toDisplayCategory(heroNotice.category) : "Featured"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display text-white leading-snug mb-3">
                {heroNotice?.title || "ERAM Group of Institutions"}
              </h2>
              <div className="flex flex-col gap-1 mb-3 text-white/80 text-xs sm:text-sm font-rethink">
                <span>
                  {heroNotice
                    ? `${toDisplayDate(heroNotice.date)} · ${toDisplayTime(heroNotice.date)}`
                    : ""}
                </span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm font-rethink mb-4 max-w-md line-clamp-2">
                {heroNotice?.description ||
                  "Structured access and centralised communication for students and parents."}
              </p>
            </div>

            {/* Carousel arrows */}
            {heroSlides.length > 1 && (
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevHero}
                  aria-label="Previous notice"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ae1431] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNextHero}
                  aria-label="Next notice"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#ae1431] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Fees Portal ── */}
      <section className="pb-10 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className=" rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-display text-gray-900 mb-1">
              Fees Portal
            </h2>
            <p className="text-red-700 text-base font-rethink mb-6">
              Online Payment &amp; Records
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {[
                {
                  icon: <CreditCard size={20} />,
                  title: "Secure Online Fee Payment",
                  desc: "Safe and encrypted payment gateway",
                },
                {
                  icon: <Receipt size={20} />,
                  title: "Receipt & Invoice Download",
                  desc: "Instant digital receipts for all payments",
                },
                {
                  icon: <History size={20} />,
                  title: "Payment History Access",
                  desc: "Complete transaction records",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/50 rounded-xl p-4"
                >
                  <div className="mt-0.5 text-red-700 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-display text-gray-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-gray-600 font-rethink text-xs mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className=" cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[#ae1431] text-white text-sm font-rethink uppercase tracking-wide rounded-xl hover:bg-black active:scale-95 transition-all ">
              Proceed to Fees Portal <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Institution Selection ── */}
     <section className="pb-4">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <p className="text-gray-500 text-2xl font-rethink text-center mb-6">
      Select Your Institution
    </p>
    {/* Tab strip */}
    <div className="flex w-full border-b-[0.5px] border-gray-200 overflow-x-auto scrollbar-hide">
      {institutions.map((inst) => (
        <button
          key={inst.id}
          onClick={() => setSelectedInstitution(inst.id)}
          className={`relative flex-1 py-2.5 text-[14px] sm:text-[20px] whitespace-nowrap text-center 
        cursor-pointer transition-colors bg-transparent border-none
        after:absolute after:bottom-[-0.9px] after:left-0 after:right-0 
        after:h-[3.5px] after:rounded-t-sm after:transition-colors
        ${
          selectedInstitution === inst.id
            ? "text-[#ae1431] font-medium font-rethink after:bg-[#ae1431]"
            : "text-gray-500 hover:text-gray-800 after:bg-transparent"
        }`}
        >
          {inst.name}
        </button>
      ))}
    </div>
  </div>
</section>

      {/* ── Notices card ── */}
     <section className="pb-6 sm:pb-8">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-display text-gray-900">
            Institutional Notices &amp; Updates
          </h3>
          <span className="text-[#ae1431] font-rethink text-sm">
            {institutions.find((i) => i.id === selectedInstitution)?.full}
          </span>
        </div>
        {/* Desktop-only link in header */}
        <Link
          href="/events"
          className="hidden sm:inline-flex shrink-0 items-center gap-1 text-[#ae1431] text-sm font-rethink hover:text-black transition-colors cursor-pointer"
        >
          View All Notices
          <ChevronRight size={16} />
        </Link>
      </div>

      {noticesLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400 font-rethink text-sm">
            Loading notices…
          </p>
        </div>
      ) : notices.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                {getNoticeIcon(notice.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-900 font-display text-sm leading-snug truncate">
                  {notice.title}
                </h4>
                <p className="font-rethink text-gray-400 text-xs truncate mt-0.5">
                  {notice.description}
                </p>
              </div>
              <span className="text-xs text-gray-400 font-rethink shrink-0">
                {notice.date}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 font-rethink text-sm">
            No notices available
          </p>
        </div>
      )}

      {/* Mobile-only link at bottom */}
      <Link
        href="/events"
        className="sm:hidden mt-4 flex items-center justify-center gap-1 text-[#ae1431] text-sm font-rethink hover:text-black transition-colors cursor-pointer"
      >
        View All Notices
        <ChevronRight size={16} />
      </Link>
    </div>
  </div>
</section>

      {/* ── Download Centre card ── */}
     <section className="pb-10 sm:pb-14">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-display text-gray-900">
            Download Centre
          </h3>
          <span className="text-[#ae1431] font-rethink text-sm">
            Academic Resources
          </span>
        </div>
        {/* Desktop-only link in header */}
        <Link
          href="/downloads"
          className="hidden sm:inline-flex shrink-0 items-center gap-1 text-[#ae1431] text-sm font-rethink hover:text-black transition-colors cursor-pointer"
        >
          View All Resources
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          className="absolute left-3.5 top-3.5 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search study materials, question papers, assignments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border font-rethink border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
        />
      </div>

      {/* Resources list */}
      {downloadsLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400 font-rethink text-sm">
            Loading resources…
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => {
              const { icon, bg } = getResourceIcon(resource.fileType);
              return (
                <div
                  key={resource.id}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}
                  >
                    {icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm text-gray-900 truncate">
                      {resource.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-rethink mt-0.5">
                      {resource.category} &middot; {resource.fileType}
                    </p>
                  </div>

                  <a
                    href={`${BACKEND_URL}/api/downloads/${resource.id}/download`}
                    download={`${resource.title}${resource.fileExtension}`}
                    className="shrink-0 p-2.5 bg-[#ae1431] text-white rounded-lg hover:bg-black active:scale-95 transition-all"
                  >
                    <Download size={18} />
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-center py-14">
              <Search size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-rethink text-sm">
                No resources found
              </p>
              <p className="text-gray-400 font-rethink mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}

      {!downloadsLoading && filteredResources.length > 0 && (
        <p className="text-center text-xs text-gray-400 mt-5">
          Showing {filteredResources.length} resource
          {filteredResources.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Mobile-only link at bottom */}
      <Link
        href="/downloads"
        className="sm:hidden mt-4 flex items-center justify-center gap-1 text-[#ae1431] text-sm font-rethink hover:text-black transition-colors cursor-pointer"
      >
        View All Resources
        <ChevronRight size={16} />
      </Link>
    </div>
  </div>
</section>

      {/* ── CTA ── */}
      <section className="bg-[#F5EFE8] pb-16 sm:pb-20">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
    <h2 className="text-2xl sm:text-4xl font-display text-black mb-3">
      Take the Next Step
    </h2>

    <p className="text-black font-rethink sm:text-lg mb-7 max-w-xl mx-auto">
      Explore our institutions, meet our educators, and experience the
      ERAM campus firsthand as you discover the learning environment
      that's right for you.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button 
        onClick={()=>router.push("/contact")} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ae1431] text-white hover:bg-black text-sm font-rethink uppercase tracking-wide rounded-xl cursor-pointer transition-colors">
        Admissions Open 2026–27
        <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <button className="inline-flex items-center gap-2 px-8 py-3.5 border border-black text-black hover:bg-black hover:text-white text-sm font-rethink uppercase tracking-wide rounded-xl cursor-pointer transition-colors">
        Plan a Campus Visit
      </button>
    </div>
  </div>
</section>
    </div>
  );
};

export default StudentParentPortal;