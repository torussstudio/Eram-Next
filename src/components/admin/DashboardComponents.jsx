"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Image as ImageIcon,
  CalendarDays,
  FileDown,
  GraduationCap,
  ArrowUpRight,
  Clock,
  Pin,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/api";


const INSTITUTIONS = [
  { id: "ease", label: "EASE", initial: "E", accent: "#8b6f3f" },
  { id: "mmhss", label: "MMHSS", initial: "H", accent: "#3f6b52" },
  { id: "mmps", label: "MMPS", initial: "P", accent: "#6b4f8b" },
  { id: "amlp", label: "AMLP", initial: "A", accent: "#ae1431" },
  { id: "mmite", label: "MMITE", initial: "T", accent: "#a15c2e" },
];

const ACADEMIC_SCHOOLS = ["mmhss", "mmps", "amlp", "mmite"];

const MODULE_META = {
  gallery: { label: "Gallery", icon: ImageIcon, accent: "#6b4f8b" },
  event: { label: "Event", icon: CalendarDays, accent: "#ae1431" },
  notification: { label: "Notice", icon: CalendarDays, accent: "#8b6f3f" },
  download: { label: "Download", icon: FileDown, accent: "#3f5f8b" },
  academics: { label: "Academics", icon: GraduationCap, accent: "#3f6b52" },
};

const GOLD = "#b3862c";

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function dayLabel(date) {
  return date.toLocaleDateString("en-IN", { weekday: "short" }).toUpperCase();
}

/* Small radial-progress medallion, styled like a registrar's seal.
   Ring fill = pct, initial sits in the center, count sits below. */
function SealMedallion({ p }) {
  const size = 84;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (p.pct / 100) * c;

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDE3D3" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={p.accent}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            className="transition-[stroke-dasharray] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-[7px] rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: `${p.accent}35` }}>
          <span className="font-display text-lg" style={{ color: p.accent }}>
            {p.initial}
          </span>
        </div>
      </div>
      <div className="text-center leading-tight">
        <p className="font-rethink text-[11px] font-medium tracking-wide text-[#2b2620]">{p.label}</p>
        <p className="font-display text-sm tabular-nums" style={{ color: p.accent }}>
          {p.count}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [academics, setAcademics] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      setLoading(true);
      setLoadError("");
      try {
        const academicsRequests = ACADEMIC_SCHOOLS.map((school) =>
          api.get("/academics", { params: { school } }).catch(() => ({ data: [] }))
        );

        const [galleryRes, eventsRes, downloadsRes, ...academicsRes] = await Promise.all([
          api.get("/gallery").catch(() => ({ data: [] })),
          api.get("/events").catch(() => ({ data: [] })),
          api.get("/downloads").catch(() => ({ data: [] })),
          ...academicsRequests,
        ]);

        if (!isMounted) return;

        setGallery(galleryRes.data || []);
        setEvents(eventsRes.data || []);
        setDownloads(downloadsRes.data || []);
        setAcademics(academicsRes.flatMap((r) => r.data || []));
      } catch (err) {
        if (isMounted) setLoadError("Couldn't load dashboard data. Please refresh.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAll();
    return () => {
      isMounted = false;
    };
  }, []);

  /* ── Derived stats ─────────────────────────────────────── */
  const stats = useMemo(
    () => [
      { key: "gallery", label: "Gallery Images", value: gallery.length, icon: ImageIcon, accent: "#6b4f8b" },
      { key: "events", label: "Events & Notices", value: events.length, icon: CalendarDays, accent: "#ae1431" },
      { key: "downloads", label: "Downloads", value: downloads.length, icon: FileDown, accent: "#3f5f8b" },
      { key: "academics", label: "Academic Entries", value: academics.length, icon: GraduationCap, accent: "#3f6b52" },
    ],
    [gallery, events, downloads, academics]
  );

  /* ── Institution Pulse — activity per school, gallery-driven ── */
  const pulse = useMemo(() => {
    const counts = INSTITUTIONS.map((inst) => ({
      ...inst,
      count: gallery.filter((g) => g.category === inst.id).length +
        events.filter((e) => e.institution === inst.id).length,
    }));
    const max = Math.max(1, ...counts.map((c) => c.count));
    return counts.map((c) => ({ ...c, pct: Math.round((c.count / max) * 100) }));
  }, [gallery, events]);

  /* ── 7-day activity trend, combined across content types ── */
  const trend = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const allDated = [
      ...gallery.map((g) => g.createdAt),
      ...events.map((e) => e.createdAt || e.date),
      ...downloads.map((d) => d.createdAt),
    ];

    return days.map((day) => {
      const next = new Date(day);
      next.setDate(next.getDate() + 1);
      const count = allDated.filter((dt) => {
        if (!dt) return false;
        const t = new Date(dt).getTime();
        return t >= day.getTime() && t < next.getTime();
      }).length;
      return { label: dayLabel(day), count };
    });
  }, [gallery, events, downloads]);

  const maxTrend = Math.max(1, ...trend.map((t) => t.count));

  /* SVG path points for the ledger-style trend line */
  const trendPoints = useMemo(() => {
    const w = 600;
    const h = 120;
    const step = w / (trend.length - 1 || 1);
    return trend.map((t, i) => {
      const x = i * step;
      const y = h - (t.count / maxTrend) * (h - 16) - 4;
      return { x, y, ...t };
    });
  }, [trend, maxTrend]);

  const linePath = trendPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = trendPoints.length
    ? `${linePath} L ${trendPoints[trendPoints.length - 1].x.toFixed(1)} 120 L 0 120 Z`
    : "";

  /* ── Unified recent activity feed ─────────────────────── */
  const activity = useMemo(() => {
    const items = [
      ...gallery.map((g) => ({
        type: "gallery",
        title: g.title,
        sub: INSTITUTIONS.find((i) => i.id === g.category)?.label || g.category,
        date: g.createdAt,
        pinned: false,
      })),
      ...events.map((e) => ({
        type: e.type === "event" ? "event" : "notification",
        title: e.title,
        sub: e.institution,
        date: e.createdAt || e.date,
        pinned: e.isPinned,
      })),
      ...downloads.map((d) => ({
        type: "download",
        title: d.title,
        sub: d.category,
        date: d.createdAt,
        pinned: false,
      })),
      ...academics.map((a) => ({
        type: "academics",
        title: a.title || a.label || "Academic entry",
        sub: a.section,
        date: a.createdAt,
        pinned: false,
      })),
    ].filter((i) => i.date);

    return items
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [gallery, events, downloads, academics]);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
        <div className="flex items-center gap-2 font-rethink text-sm text-[#8a7f6f]">
          <Loader2 size={16} className="animate-spin" />
          Loading dashboard…
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
        <div className="flex items-center gap-2 font-rethink text-sm text-[#ae1431]">
          <AlertCircle size={16} />
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
        {/* ── Header — a letterhead, not a title bar ────────── */}
        <div className="pb-7" style={{ borderBottom: `2px solid ${GOLD}` }}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
                <span className="font-rethink text-[11px] uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  ERAM Trust · Registrar's Overview
                </span>
              </div>
              <h1 className="mt-2 font-display text-4xl sm:text-[2.75rem] leading-none text-[#2b2620]">
                Dashboard
              </h1>
              <p className="mt-2 font-rethink text-sm text-[#8a7f6f] max-w-md">
                A live record of content across every ERAM institution.
              </p>
            </div>
            <div className="text-right">
              <p className="font-rethink text-[10px] uppercase tracking-[0.2em] text-[#b5aa98]">Today</p>
              <p className="font-display text-sm text-[#2b2620] mt-0.5">{today}</p>
            </div>
          </div>
        </div>

        {/* ── Stat cards ──────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.key}
              className="group relative overflow-hidden rounded-2xl border border-[#e3d6c3] bg-white p-5 shadow-[0_1px_2px_rgba(43,38,32,0.04)] transition-all hover:shadow-[0_10px_28px_rgba(43,38,32,0.08)] hover:-translate-y-0.5"
            >
              <div
                className="absolute -right-4 -top-4 h-20 w-20 rounded-full blur-2xl opacity-[0.14] transition-opacity group-hover:opacity-[0.22]"
                style={{ backgroundColor: s.accent }}
              />
              <div className="flex items-start justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${s.accent}14`, color: s.accent }}
                >
                  <s.icon size={16} />
                </div>
                <span className="font-rethink text-[9px] uppercase tracking-widest text-[#d8cdb8]">Total</span>
              </div>
              <p className="mt-4 font-display text-3xl tabular-nums text-[#2b2620]">{s.value}</p>
              <p className="mt-1 font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Institution Pulse (signature element) ──────────
            Five registrar's seals — one per institution. Ring
            fill and count together read as a stamp of activity,
            not just a bar chart. */}
        <div className="mt-6 rounded-2xl border border-[#e3d6c3] bg-white p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={15} style={{ color: GOLD }} />
            <h2 className="font-display text-base text-[#2b2620]">Institution Pulse</h2>
            <span className="font-rethink text-xs text-[#b5aa98]">— content activity by school</span>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-y-6">
            {pulse.map((p) => (
              <SealMedallion key={p.id} p={p} />
            ))}
          </div>
        </div>

        {/* ── Trend chart + Activity feed ─────────────────── */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Weekly trend — a ledger line, not a bar chart */}
          <div className="rounded-2xl border border-[#e3d6c3] bg-white p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-base text-[#2b2620]">Content Activity</h2>
                <p className="font-rethink text-xs text-[#8a7f6f] mt-0.5">Uploads &amp; posts, last 7 days</p>
              </div>
              <span className="rounded-full border border-[#e3d6c3] px-2.5 py-1 font-rethink text-[10px] uppercase tracking-wide text-[#8a7f6f]">
                All institutions
              </span>
            </div>

            <svg viewBox="0 0 600 120" className="w-full h-32" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ae1431" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#ae1431" stopOpacity="0" />
                </linearGradient>
              </defs>
              {areaPath && <path d={areaPath} fill="url(#trendFill)" />}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#ae1431"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {trendPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.count > 0 ? 3.5 : 2} fill="#ae1431" />
              ))}
            </svg>
            <div className="flex justify-between mt-1">
              {trend.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="font-display text-xs tabular-nums text-[#2b2620]">{t.count}</span>
                  <span className="font-rethink text-[10px] uppercase tracking-widest text-[#b5aa98]">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-2xl border border-[#e3d6c3] bg-white p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
            <h2 className="font-display text-base text-[#2b2620] mb-5">Recent Activity</h2>

            {activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                <Clock size={18} className="text-[#b5aa98]" />
                <p className="font-rethink text-sm text-[#8a7f6f]">Nothing published yet.</p>
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-[15px] before:top-1 before:bottom-1 before:w-px before:bg-[#e3d6c3]">
                {activity.map((a, i) => {
                  const meta = MODULE_META[a.type] || MODULE_META.gallery;
                  const Icon = meta.icon;
                  return (
                    <div key={i} className="flex gap-3.5 relative">
                      <div
                        className="relative z-10 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-white border"
                        style={{ borderColor: `${meta.accent}40`, color: meta.accent }}
                      >
                        <Icon size={12} />
                      </div>
                      <div className="min-w-0 flex-1 pb-0.5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-rethink text-sm text-[#2b2620] truncate flex items-center gap-1.5">
                            {a.title}
                            {a.pinned && <Pin size={10} className="text-amber-500 shrink-0" />}
                          </p>
                          <span className="font-rethink text-[10px] text-[#b5aa98] whitespace-nowrap">
                            {timeAgo(a.date)}
                          </span>
                        </div>
                        <p className="font-rethink text-[11px] text-[#8a7f6f] mt-0.5 capitalize">
                          {meta.label} {a.sub ? `· ${a.sub}` : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Quick links to each module ──────────────────── */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/admin/gallery", label: "Manage Gallery", icon: ImageIcon, accent: "#6b4f8b" },
            { href: "/admin/events", label: "Manage Events", icon: CalendarDays, accent: "#ae1431" },
            { href: "/admin/downloads", label: "Manage Downloads", icon: FileDown, accent: "#3f5f8b" },
            { href: "/admin/institutions", label: "Manage Academics", icon: GraduationCap, accent: "#3f6b52" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#e3d6c3] bg-white p-4 shadow-[0_1px_2px_rgba(43,38,32,0.04)] transition-all hover:shadow-[0_10px_28px_rgba(43,38,32,0.08)] hover:-translate-y-0.5"
            >
              <span
                className="absolute left-0 top-0 h-full w-0.5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300"
                style={{ backgroundColor: link.accent }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${link.accent}14`, color: link.accent }}
                >
                  <link.icon size={16} />
                </div>
                <span className="font-rethink text-sm font-medium text-[#2b2620]">{link.label}</span>
              </div>
              <ArrowUpRight
                size={15}
                className="text-[#b5aa98] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ae1431]"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}