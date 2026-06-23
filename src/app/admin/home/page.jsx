"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Eye, 
  Edit2, 
  Clock, 
  CheckCircle, 
  CornerDownRight, 
  Sparkles,
  Save,
  X,
  Laptop,
  Heading,
  Image as ImageIcon,
  Link as LinkIcon
} from "lucide-react";
import { PageHeader } from "@/components/admin/DashboardComponents";

const DEFAULT_SECTIONS = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Primary brand statement, background video controls, and main call-to-actions.",
    status: "Published",
    lastUpdated: "2 hours ago",
    updatedBy: "Admin",
    content: {
      title: "Building Foundations. Shaping Futures.",
      subtitle: "Eram Education is committed to cultivating disciplined, values-driven institutions that expand opportunities and make quality learning accessible.",
      primaryCta: "Explore Institutions",
      secondaryCta: "Parent Portal",
    }
  },
  {
    id: "about",
    name: "About Section",
    description: "Our philosophy, history, and core pillars of educational excellence.",
    status: "Published",
    lastUpdated: "1 day ago",
    updatedBy: "Director",
    content: {
      heading: "Legacy of Disciplined Growth",
      paragraph1: "Founded with a vision to revolutionize learning in regional areas, ERAM establishes state-of-the-art infrastructure coupled with rigorous standards.",
      paragraph2: "We maintain highly rated schools, teacher training centers, and sports academies across Palakkad.",
      foundationYear: "2008"
    }
  },
  {
    id: "highlights",
    name: "Highlights Section",
    description: "Key metrics grid (e.g. 5+ schools, 2500+ students, 98% pass rate).",
    status: "Draft",
    lastUpdated: "3 days ago",
    updatedBy: "Admin",
    content: {
      metric1Val: "05",
      metric1Lbl: "Approved Institutions",
      metric2Val: "2400+",
      metric2Lbl: "Enrolled Students",
      metric3Val: "100%",
      metric3Lbl: "Academic Success",
    }
  },
  {
    id: "cta",
    name: "CTA Section",
    description: "Admission banners and newsletter signup trigger at the bottom of page.",
    status: "Published",
    lastUpdated: "1 week ago",
    updatedBy: "Marketing Head",
    content: {
      bannerText: "Admissions Open for Academic Year 2026-27",
      btnLabel: "Download Prospectus",
      notice: "Limited seats available for higher secondary streams."
    }
  }
];

export default function HomeCMSPage() {
  const [editingSection, setEditingSection] = useState(null);
  const [previewingSection, setPreviewingSection] = useState(null);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);

  const handleSave = (sectionId, updatedContent) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          content: updatedContent,
          lastUpdated: "Just now",
          updatedBy: "Senior Admin",
          status: "Published"
        };
      }
      return sec;
    }));
    setEditingSection(null);
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

      {/* Grid of CMS Section Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="bg-zinc-900/40 border border-[#c5a880]/10 hover:border-[#c5a880]/30 rounded-2xl p-6 flex flex-col justify-between transition-[border-color] duration-200 group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-wider font-['Agency'] group-hover:text-[#F5EFE8] transition-colors duration-250">
                    {section.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-light leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
                  section.status === "Published"
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                }`}>
                  {section.status}
                </span>
              </div>

              {/* Data Preview Box */}
              <div className="bg-zinc-950/60 rounded-xl p-4 my-4 border border-zinc-800/80 text-xs space-y-2">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CornerDownRight size={10} className="text-[#c5a880]" />
                  Active Content Details
                </p>
                {section.id === "hero" && (
                  <>
                    <p className="truncate"><strong className="text-zinc-500">Title:</strong> <span className="text-zinc-300">{section.content.title}</span></p>
                    <p className="line-clamp-2"><strong className="text-zinc-500">Subtitle:</strong> <span className="text-zinc-400 font-light">{section.content.subtitle}</span></p>
                  </>
                )}
                {section.id === "about" && (
                  <>
                    <p className="truncate"><strong className="text-zinc-500">Heading:</strong> <span className="text-zinc-300">{section.content.heading}</span></p>
                    <p className="line-clamp-2"><strong className="text-zinc-500">Body:</strong> <span className="text-zinc-400 font-light">{section.content.paragraph1}</span></p>
                  </>
                )}
                {section.id === "highlights" && (
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-1.5 bg-zinc-900/60 rounded-lg">
                      <span className="block font-bold text-[#c5a880] text-sm">{section.content.metric1Val}</span>
                      <span className="text-[8px] text-zinc-500 truncate block uppercase tracking-wide">{section.content.metric1Lbl}</span>
                    </div>
                    <div className="p-1.5 bg-zinc-900/60 rounded-lg">
                      <span className="block font-bold text-[#c5a880] text-sm">{section.content.metric2Val}</span>
                      <span className="text-[8px] text-zinc-500 truncate block uppercase tracking-wide">{section.content.metric2Lbl}</span>
                    </div>
                    <div className="p-1.5 bg-zinc-900/60 rounded-lg">
                      <span className="block font-bold text-[#c5a880] text-sm">{section.content.metric3Val}</span>
                      <span className="text-[8px] text-zinc-500 truncate block uppercase tracking-wide">{section.content.metric3Lbl}</span>
                    </div>
                  </div>
                )}
                {section.id === "cta" && (
                  <>
                    <p className="truncate"><strong className="text-zinc-500">Banner:</strong> <span className="text-zinc-300">{section.content.bannerText}</span></p>
                    <p className="truncate"><strong className="text-zinc-500">Button:</strong> <span className="text-zinc-400 font-light">{section.content.btnLabel}</span></p>
                  </>
                )}
              </div>
            </div>

            {/* Card Actions Footer */}
            <div className="mt-4 pt-4 border-t border-zinc-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 font-light">
                <Clock size={12} className="text-[#c5a880]" />
                <span>Updated {section.lastUpdated} by <strong className="font-medium text-zinc-400">{section.updatedBy}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewingSection(section)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors duration-200 cursor-pointer"
                >
                  <Eye size={12} />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setEditingSection(section)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ae1431]/10 hover:bg-[#ae1431]/20 text-[#ae1431] hover:text-[#F5EFE8] border border-[#ae1431]/30 transition-[color,background-color,border-color] duration-200 cursor-pointer"
                >
                  <Edit2 size={12} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal Simulation */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-[#ae1431]/10 rounded border border-[#ae1431]/25 text-[#ae1431]">
                  <Heading size={14} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
                  Edit Section Content: {editingSection.name}
                </h3>
              </div>
              <button 
                onClick={() => setEditingSection(null)}
                className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Fields Body */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
              {editingSection.id === "hero" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Hero Title Headline</label>
                    <input 
                      type="text" 
                      defaultValue={editingSection.content.title}
                      id="hero-title"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Hero Subtitle Paragraph</label>
                    <textarea 
                      rows={3}
                      defaultValue={editingSection.content.subtitle}
                      id="hero-subtitle"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200 resize-none leading-relaxed"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Primary Button CTA</label>
                      <input 
                        type="text" 
                        defaultValue={editingSection.content.primaryCta}
                        id="hero-primaryCta"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Secondary Button CTA</label>
                      <input 
                        type="text" 
                        defaultValue={editingSection.content.secondaryCta}
                        id="hero-secondaryCta"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                      />
                    </div>
                  </div>
                </>
              )}

              {editingSection.id === "about" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Section Title</label>
                    <input 
                      type="text" 
                      defaultValue={editingSection.content.heading}
                      id="about-heading"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Pillar Paragraph 1</label>
                    <textarea 
                      rows={3}
                      defaultValue={editingSection.content.paragraph1}
                      id="about-paragraph1"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Foundation Year Metric</label>
                    <input 
                      type="text" 
                      defaultValue={editingSection.content.foundationYear}
                      id="about-foundationYear"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                    />
                  </div>
                </>
              )}

              {editingSection.id === "highlights" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Metric 1 Value</label>
                      <input type="text" id="high-m1v" defaultValue={editingSection.content.metric1Val} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Metric 1 Label</label>
                      <input type="text" id="high-m1l" defaultValue={editingSection.content.metric1Lbl} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Metric 2 Value</label>
                      <input type="text" id="high-m2v" defaultValue={editingSection.content.metric2Val} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Metric 2 Label</label>
                      <input type="text" id="high-m2l" defaultValue={editingSection.content.metric2Lbl} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Metric 3 Value</label>
                      <input type="text" id="high-m3v" defaultValue={editingSection.content.metric3Val} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Metric 3 Label</label>
                      <input type="text" id="high-m3l" defaultValue={editingSection.content.metric3Lbl} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200" />
                    </div>
                  </div>
                </div>
              )}

              {editingSection.id === "cta" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Admissions Headline Banner</label>
                    <input 
                      type="text" 
                      defaultValue={editingSection.content.bannerText}
                      id="cta-bannerText"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Action Button Label</label>
                    <input 
                      type="text" 
                      defaultValue={editingSection.content.btnLabel}
                      id="cta-btnLabel"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Warning Alert Notes</label>
                    <input 
                      type="text" 
                      defaultValue={editingSection.content.notice}
                      id="cta-notice"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-[#c5a880]/15 flex items-center justify-end gap-3 bg-zinc-950">
              <button 
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  let updated = {};
                  if (editingSection.id === "hero") {
                    updated = {
                      title: document.getElementById("hero-title").value,
                      subtitle: document.getElementById("hero-subtitle").value,
                      primaryCta: document.getElementById("hero-primaryCta").value,
                      secondaryCta: document.getElementById("hero-secondaryCta").value,
                    };
                  } else if (editingSection.id === "about") {
                    updated = {
                      heading: document.getElementById("about-heading").value,
                      paragraph1: document.getElementById("about-paragraph1").value,
                      foundationYear: document.getElementById("about-foundationYear").value,
                    };
                  } else if (editingSection.id === "highlights") {
                    updated = {
                      metric1Val: document.getElementById("high-m1v").value,
                      metric1Lbl: document.getElementById("high-m1l").value,
                      metric2Val: document.getElementById("high-m2v").value,
                      metric2Lbl: document.getElementById("high-m2l").value,
                      metric3Val: document.getElementById("high-m3v").value,
                      metric3Lbl: document.getElementById("high-m3l").value,
                    };
                  } else if (editingSection.id === "cta") {
                    updated = {
                      bannerText: document.getElementById("cta-bannerText").value,
                      btnLabel: document.getElementById("cta-btnLabel").value,
                      notice: document.getElementById("cta-notice").value,
                    };
                  }
                  handleSave(editingSection.id, updated);
                }}
                className="px-4 py-2 rounded-lg bg-[#ae1431] hover:bg-[#ae1431]/90 text-[#F5EFE8] text-xs font-medium flex items-center gap-1.5 shadow-[0_4px_10px_rgba(174,20,49,0.3)] cursor-pointer"
              >
                <Save size={13} />
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Preview Dialog Modal */}
      {previewingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-2xl bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <Laptop size={14} className="text-[#c5a880]" />
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
                  Live View Preview: {previewingSection.name}
                </h3>
              </div>
              <button 
                onClick={() => setPreviewingSection(null)}
                className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Simulated Public Webpage UI Frame */}
            <div className="p-6 bg-[#F5EFE8] text-black overflow-y-auto max-h-[60vh] border-b border-[#c5a880]/10 flex flex-col justify-center min-h-[300px]">
              
              {previewingSection.id === "hero" && (
                <div className="text-center max-w-lg mx-auto py-10 space-y-6">
                  <span className="font-[Rethink_Sans] tracking-[0.25em] text-xs text-[#ae1431] uppercase block font-semibold">
                    ERAM EDUCATION
                  </span>
                  <h1 className="font-['Agency'] text-5xl font-extrabold text-[#ae1431] leading-none uppercase tracking-wide">
                    {previewingSection.content.title}
                  </h1>
                  <p className="font-[Rethink_Sans] text-[#0A0A0A]/70 text-sm leading-relaxed max-w-md mx-auto">
                    {previewingSection.content.subtitle}
                  </p>
                  <div className="flex items-center justify-center gap-4 pt-2 font-[Rethink_Sans]">
                    <button className="px-6 py-2.5 bg-black hover:bg-[#ae1431] text-white text-xs font-semibold rounded-full transition duration-300">
                      {previewingSection.content.primaryCta}
                    </button>
                    <button className="px-6 py-2.5 border border-black/20 hover:border-black text-black text-xs font-semibold rounded-full transition duration-300">
                      {previewingSection.content.secondaryCta}
                    </button>
                  </div>
                </div>
              )}

              {previewingSection.id === "about" && (
                <div className="max-w-xl mx-auto py-8 font-[Rethink_Sans] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-4">
                    <span className="text-xs text-[#ae1431] tracking-widest font-bold block uppercase">ABOUT THE SYSTEM</span>
                    <h2 className="text-2xl font-bold font-[Playfair_Display] text-[#ae1431]">{previewingSection.content.heading}</h2>
                    <p className="text-xs text-[#0a0a0a]/70 leading-relaxed">{previewingSection.content.paragraph1}</p>
                  </div>
                  <div className="p-4 bg-[#ae1431]/5 border border-[#ae1431]/10 rounded-2xl text-center">
                    <span className="text-4xl font-extrabold text-[#ae1431] block font-['Agency']">{previewingSection.content.foundationYear}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block mt-1">ESTABLISHED</span>
                  </div>
                </div>
              )}

              {previewingSection.id === "highlights" && (
                <div className="max-w-lg mx-auto py-10 font-[Rethink_Sans] w-full">
                  <h3 className="text-center font-bold text-[#ae1431] text-sm uppercase tracking-widest mb-8">System Milestones</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white/60 border border-black/5 rounded-2xl shadow-sm">
                      <span className="block font-['Agency'] text-3xl font-extrabold text-[#ae1431]">{previewingSection.content.metric1Val}</span>
                      <span className="text-[10px] text-zinc-600 uppercase font-semibold mt-1 block">{previewingSection.content.metric1Lbl}</span>
                    </div>
                    <div className="p-4 bg-white/60 border border-black/5 rounded-2xl shadow-sm">
                      <span className="block font-['Agency'] text-3xl font-extrabold text-[#ae1431]">{previewingSection.content.metric2Val}</span>
                      <span className="text-[10px] text-zinc-600 uppercase font-semibold mt-1 block">{previewingSection.content.metric2Lbl}</span>
                    </div>
                    <div className="p-4 bg-white/60 border border-black/5 rounded-2xl shadow-sm">
                      <span className="block font-['Agency'] text-3xl font-extrabold text-[#ae1431]">{previewingSection.content.metric3Val}</span>
                      <span className="text-[10px] text-zinc-600 uppercase font-semibold mt-1 block">{previewingSection.content.metric3Lbl}</span>
                    </div>
                  </div>
                </div>
              )}

              {previewingSection.id === "cta" && (
                <div className="max-w-xl mx-auto py-10 text-center space-y-6 font-[Rethink_Sans] w-full">
                  <div className="bg-[#ae1431] text-white p-8 rounded-3xl space-y-4 shadow-lg">
                    <h3 className="text-xl font-bold font-[Playfair_Display] leading-snug">{previewingSection.content.bannerText}</h3>
                    <p className="text-xs text-white/70 font-light max-w-sm mx-auto">{previewingSection.content.notice}</p>
                    <button className="px-6 py-2.5 bg-[#c5a880] text-black text-xs font-bold rounded-full hover:bg-white transition-colors duration-300">
                      {previewingSection.content.btnLabel}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-[#c5a880]/15 flex items-center justify-between bg-zinc-950 text-[10px] text-zinc-600">
              <span>This is a replica of the public site's theme & stylesheet.</span>
              <button 
                onClick={() => setPreviewingSection(null)}
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
