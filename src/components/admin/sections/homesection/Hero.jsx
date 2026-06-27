"use client";

import React, { useState, useEffect } from "react";
import { Eye, Edit2, Clock, CornerDownRight, Heading, Laptop, X, Save } from "lucide-react";
import { PageHeader } from "@/components/admin/DashboardComponents";
import { getHero, updateHero } from "@/services/heroService";

const INITIAL_SECTION = {
  id: "hero",
  name: "Hero Section",
  description: "Primary brand statement, background video controls, and main call-to-actions.",
  status: "Published",
  lastUpdated: "2 hours ago",
  updatedBy: "Admin",
  content: {
    title: "Building Foundations. Shaping Futures.",
    subtitle:
      "Eram Education is committed to cultivating disciplined, values-driven institutions that expand opportunities and make quality learning accessible.",
    primaryCta: "Explore Institutions",
    secondaryCta: "Parent Portal",
  },
};

export default function Hero() {
  const [section, setSection] = useState(INITIAL_SECTION);
  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
  const loadHero = async () => {
    try {
      const res = await getHero();

      if (res.success) {
        const hero = res.data.slides[0];

        setSection((prev) => ({
          ...prev,
          content: {
            title: `${hero.titleLine1} ${hero.titleLine2}`,
            subtitle: hero.description,
            primaryCta: hero.primaryButton.text,
            secondaryCta: hero.secondaryButton.text,
          },
        }));
      }
    } catch (err) {
  console.error(err);
  alert("Failed to save Hero section.");
}
  };

  loadHero();
}, []);

  const openEdit = () => {
    setDraftContent(section.content);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setDraftContent(null);
  };

  const updateDraft = (key) => (e) =>
    setDraftContent((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
  try {
    const res = await getHero();

    const slides = [...res.data.slides];

    const words = draftContent.title.split(" ");

    slides[0] = {
      ...slides[0],
      titleLine1: words.slice(0, 2).join(" "),
      titleLine2: words.slice(2).join(" "),
      description: draftContent.subtitle,
      primaryButton: {
        ...slides[0].primaryButton,
        text: draftContent.primaryCta,
      },
      secondaryButton: {
        ...slides[0].secondaryButton,
        text: draftContent.secondaryCta,
      },
    };

    await updateHero({ slides });

    const latest = await getHero();

const hero = latest.data.slides[0];

setSection((prev) => ({
  ...prev,
  content: {
    title: `${hero.titleLine1} ${hero.titleLine2}`,
    subtitle: hero.description,
    primaryCta: hero.primaryButton.text,
    secondaryCta: hero.secondaryButton.text,
  },
}));

    setSection((prev) => ({
      ...prev,
      content: draftContent,
      lastUpdated: "Just now",
      updatedBy: "Senior Admin",
      status: "Published",
    }));

    closeEdit();
  }
  catch (err) {
  console.error(err);
}
};

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="Homepage CMS"
        description="Modify headings, CTAs, and marketing metrics of the public-facing ERAM website."
      >
        <div className="text-xs bg-zinc-900 border border-[#c5a880]/15 text-[#c5a880] px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
          <Clock size={12} />
          <span>Last live deploy: 4h ago</span>
        </div>
      </PageHeader>

      {/* Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/40 border border-[#c5a880]/10 hover:border-[#c5a880]/30 rounded-2xl p-6 flex flex-col justify-between transition-[border-color] duration-200 group">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-wider font-['Agency'] group-hover:text-[#F5EFE8] transition-colors duration-250">
                  {section.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 font-light leading-relaxed">
                  {section.description}
                </p>
              </div>
              <span
                className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
                  section.status === "Published"
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                }`}
              >
                {section.status}
              </span>
            </div>

            <div className="bg-zinc-950/60 rounded-xl p-4 my-4 border border-zinc-800/80 text-xs space-y-2">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CornerDownRight size={10} className="text-[#c5a880]" />
                Active Content Details
              </p>
              <p className="truncate">
                <strong className="text-zinc-500">Title:</strong>{" "}
                <span className="text-zinc-300">{section.content.title}</span>
              </p>
              <p className="line-clamp-2">
                <strong className="text-zinc-500">Subtitle:</strong>{" "}
                <span className="text-zinc-400 font-light">{section.content.subtitle}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5 font-light">
              <Clock size={12} className="text-[#c5a880]" />
              <span>
                Updated {section.lastUpdated} by{" "}
                <strong className="font-medium text-zinc-400">{section.updatedBy}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPreviewing(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors duration-200 cursor-pointer"
              >
                <Eye size={12} />
                <span>Preview</span>
              </button>
              <button
                onClick={openEdit}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ae1431]/10 hover:bg-[#ae1431]/20 text-[#ae1431] hover:text-[#F5EFE8] border border-[#ae1431]/30 transition-[color,background-color,border-color] duration-200 cursor-pointer"
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-[#ae1431]/10 rounded border border-[#ae1431]/25 text-[#ae1431]">
                  <Heading size={14} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
                  Edit Section Content: {section.name}
                </h3>
              </div>
              <button
                onClick={closeEdit}
                className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Hero Title Headline
                </label>
                <input
                  type="text"
                  value={draftContent.title}
                  onChange={updateDraft("title")}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={draftContent.subtitle}
                  onChange={updateDraft("subtitle")}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200 resize-none leading-relaxed"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Primary Button CTA
                  </label>
                  <input
                    type="text"
                    value={draftContent.primaryCta}
                    onChange={updateDraft("primaryCta")}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Secondary Button CTA
                  </label>
                  <input
                    type="text"
                    value={draftContent.secondaryCta}
                    onChange={updateDraft("secondaryCta")}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#c5a880]/15 flex items-center justify-end gap-3 bg-zinc-950">
              <button
                onClick={closeEdit}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-[#ae1431] hover:bg-[#ae1431]/90 text-[#F5EFE8] text-xs font-medium flex items-center gap-1.5 shadow-[0_4px_10px_rgba(174,20,49,0.3)] cursor-pointer"
              >
                <Save size={13} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-2xl bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <Laptop size={14} className="text-[#c5a880]" />
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
                  Live View Preview: {section.name}
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewing(false)}
                className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 bg-[#F5EFE8] text-black overflow-y-auto max-h-[60vh] border-b border-[#c5a880]/10 flex flex-col justify-center min-h-[300px]">
              <div className="text-center max-w-lg mx-auto py-10 space-y-6">
                <span className="font-[Rethink_Sans] tracking-[0.25em] text-xs text-[#ae1431] uppercase block font-semibold">
                  ERAM EDUCATION
                </span>
                <h1 className="font-['Agency'] text-5xl font-extrabold text-[#ae1431] leading-none uppercase tracking-wide">
                  {section.content.title}
                </h1>
                <p className="font-[Rethink_Sans] text-[#0A0A0A]/70 text-sm leading-relaxed max-w-md mx-auto">
                  {section.content.subtitle}
                </p>
                <div className="flex items-center justify-center gap-4 pt-2 font-[Rethink_Sans]">
                  <button className="px-6 py-2.5 bg-black hover:bg-[#ae1431] text-white text-xs font-semibold rounded-full transition duration-300">
                    {section.content.primaryCta}
                  </button>
                  <button className="px-6 py-2.5 border border-black/20 hover:border-black text-black text-xs font-semibold rounded-full transition duration-300">
                    {section.content.secondaryCta}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#c5a880]/15 flex items-center justify-between bg-zinc-950 text-[10px] text-zinc-600">
              <span>This is a replica of the public site's theme & stylesheet.</span>
              <button
                onClick={() => setIsPreviewing(false)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}