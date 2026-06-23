"use client";

import React, { useState, useMemo } from "react";
import { 
  Image as ImageIcon, 
  Film, 
  Upload, 
  Trash2, 
  Copy, 
  Search, 
  Grid, 
  Server, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  Filter
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/admin/DashboardComponents";

const categories = [
  { label: "All Assets", value: "all" },
  { label: "Campus Architecture", value: "campus" },
  { label: "Sports Meet 2026", value: "sports" },
  { label: "Academic Activities", value: "academic" },
  { label: "Annual Celebrations", value: "annual" }
];

// Mock Media Database
const mediaItems = [
  { id: 1, name: "campus-main-gate.jpg", category: "campus", size: "1.4 MB", type: "image", date: "2026-06-22", url: "/images/institute.webp" },
  { id: 2, name: "sports-football-final.jpg", category: "sports", size: "2.1 MB", type: "image", date: "2026-06-21", url: "/images/institute.webp" },
  { id: 3, name: "science-lab-equipment.jpg", category: "academic", size: "850 KB", type: "image", date: "2026-06-20", url: "/images/institute.webp" },
  { id: 4, name: "annual-day-cultural.jpg", category: "annual", size: "3.4 MB", type: "image", date: "2026-06-18", url: "/images/institute.webp" },
  { id: 5, name: "computer-lab-workstations.jpg", category: "academic", size: "1.1 MB", type: "image", date: "2026-06-15", url: "/images/institute.webp" },
  { id: 6, name: "badminton-court-aerial.jpg", category: "sports", size: "1.9 MB", type: "image", date: "2026-06-12", url: "/images/institute.webp" }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyLink = (name) => {
    // Simulating copy link
    alert(`Asset CDN Link Copied: https://eram.edu.in/cdn/assets/${name}`);
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <PageHeader 
        title="Media Gallery CMS" 
        description="Upload image and video assets, manage folders, and optimize public media streams."
      />

      {/* Media Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Images"
          value="814 Photos"
          change="+42 this month"
          changeType="increase"
          icon={ImageIcon}
        />
        <StatCard
          title="Video Clips"
          value="28 Videos"
          change="YouTube & local streams"
          changeType="increase"
          icon={Film}
        />
        <StatCard
          title="Storage Allocated"
          value="4.2 GB / 10 GB"
          change="42% capacity used"
          changeType="increase"
          icon={Server}
        />
        <StatCard
          title="Cloud CDN Status"
          value="Fully Synced"
          change="Edge delivery online"
          changeType="increase"
          icon={CheckCircle}
        />
      </div>

      {/* Upload UI & Category Filter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Area */}
        <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Upload size={14} className="text-[#c5a880]" />
              Upload Assets
            </h3>
            
            {/* Drag and Drop Zone */}
            <div className="border border-dashed border-[#c5a880]/20 hover:border-[#c5a880]/50 rounded-2xl p-8 text-center bg-zinc-950/40 hover:bg-zinc-950/80 transition-[background-color,border-color] duration-300 group cursor-pointer flex flex-col items-center justify-center min-h-[180px]">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-[#c5a880] group-hover:border-[#c5a880]/30 transition-[color,border-color] duration-300 mb-3">
                <Upload size={22} />
              </div>
              <span className="block text-xs font-bold text-zinc-300">Drag & Drop Files Here</span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Supports High-Res JPG, PNG, WEBP & MP4</span>
              <span className="text-[9px] text-[#ae1431] font-semibold mt-2 bg-[#ae1431]/5 px-2 py-0.5 rounded border border-[#ae1431]/10">Max size 15MB</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 leading-normal">
            Uploaded assets are compressed and distributed automatically to Cloudflare global nodes for faster page speeds.
          </div>
        </div>

        {/* Filters & Grid View */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 space-y-6">
          
          {/* Header toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Filter by filename..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-[#c5a880]/15 hover:border-[#c5a880]/30 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-xs text-zinc-200 placeholder:text-zinc-600 transition-[border-color,box-shadow] duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] self-end sm:self-auto overflow-x-auto max-w-full scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-[color,background-color] duration-200 whitespace-nowrap ${
                    selectedCategory === cat.value ? "bg-zinc-900 text-[#c5a880]" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredMedia.map((media) => (
              <div 
                key={media.id} 
                className="relative aspect-video bg-zinc-950 border border-zinc-850 hover:border-[#c5a880]/30 rounded-xl overflow-hidden group transition-[border-color] duration-200"
              >
                {/* Visual placeholder or real image */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-950 to-zinc-900 relative">
                  <ImageIcon size={28} className="text-zinc-800 group-hover:text-[#c5a880]/30 group-hover:scale-110 transition-[color,transform] duration-300" />
                  <span className="absolute bottom-2 left-2 right-2 text-[9px] text-zinc-500 font-semibold truncate bg-zinc-950/80 px-1.5 py-0.5 rounded border border-zinc-900">{media.name}</span>
                </div>

                {/* Overlays Controls */}
                <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{media.category}</span>
                    <span className="text-[9px] text-[#c5a880] font-bold">{media.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => handleCopyLink(media.name)}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-[#c5a880] border border-zinc-850 transition-colors duration-200 cursor-pointer"
                      title="Copy CDN Link"
                    >
                      <Copy size={12} />
                    </button>
                    <button 
                      className="p-1.5 bg-zinc-900 hover:bg-[#ae1431]/20 rounded-lg text-zinc-400 hover:text-[#ae1431] border border-zinc-850 hover:border-[#ae1431]/30 transition-colors duration-200 cursor-pointer"
                      title="Delete Media"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="text-[8px] text-zinc-600 text-center font-light">Uploaded: {media.date}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}