// "use client";

// import React, { useState, useMemo } from "react";
// import { 
//   Image as ImageIcon, 
//   Film, 
//   Upload, 
//   Trash2, 
//   Copy, 
//   Search, 
//   Grid, 
//   Server, 
//   CheckCircle, 
//   Sparkles,
//   ExternalLink,
//   Filter
// } from "lucide-react";
// import { PageHeader, StatCard } from "@/components/admin/DashboardComponents";

// const categories = [
//   { label: "All Assets", value: "all" },
//   { label: "Campus Architecture", value: "campus" },
//   { label: "Sports Meet 2026", value: "sports" },
//   { label: "Academic Activities", value: "academic" },
//   { label: "Annual Celebrations", value: "annual" }
// ];

// // Mock Media Database
// const mediaItems = [
//   { id: 1, name: "campus-main-gate.jpg", category: "campus", size: "1.4 MB", type: "image", date: "2026-06-22", url: "/images/institute.webp" },
//   { id: 2, name: "sports-football-final.jpg", category: "sports", size: "2.1 MB", type: "image", date: "2026-06-21", url: "/images/institute.webp" },
//   { id: 3, name: "science-lab-equipment.jpg", category: "academic", size: "850 KB", type: "image", date: "2026-06-20", url: "/images/institute.webp" },
//   { id: 4, name: "annual-day-cultural.jpg", category: "annual", size: "3.4 MB", type: "image", date: "2026-06-18", url: "/images/institute.webp" },
//   { id: 5, name: "computer-lab-workstations.jpg", category: "academic", size: "1.1 MB", type: "image", date: "2026-06-15", url: "/images/institute.webp" },
//   { id: 6, name: "badminton-court-aerial.jpg", category: "sports", size: "1.9 MB", type: "image", date: "2026-06-12", url: "/images/institute.webp" }
// ];

// export default function GalleryPage() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredMedia = useMemo(() => {
//     return mediaItems.filter(item => {
//       const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchQuery, selectedCategory]);

//   const handleCopyLink = (name) => {
//     // Simulating copy link
//     alert(`Asset CDN Link Copied: https://eram.edu.in/cdn/assets/${name}`);
//   };

//   return (
//     <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
//       <PageHeader 
//         title="Media Gallery CMS" 
//         description="Upload image and video assets, manage folders, and optimize public media streams."
//       />

//       {/* Media Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//         <StatCard
//           title="Total Images"
//           value="814 Photos"
//           change="+42 this month"
//           changeType="increase"
//           icon={ImageIcon}
//         />
//         <StatCard
//           title="Video Clips"
//           value="28 Videos"
//           change="YouTube & local streams"
//           changeType="increase"
//           icon={Film}
//         />
//         <StatCard
//           title="Storage Allocated"
//           value="4.2 GB / 10 GB"
//           change="42% capacity used"
//           changeType="increase"
//           icon={Server}
//         />
//         <StatCard
//           title="Cloud CDN Status"
//           value="Fully Synced"
//           change="Edge delivery online"
//           changeType="increase"
//           icon={CheckCircle}
//         />
//       </div>

//       {/* Upload UI & Category Filter Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Upload Area */}
//         <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 flex flex-col justify-between">
//           <div>
//             <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
//               <Upload size={14} className="text-[#c5a880]" />
//               Upload Assets
//             </h3>
            
//             {/* Drag and Drop Zone */}
//             <div className="border border-dashed border-[#c5a880]/20 hover:border-[#c5a880]/50 rounded-2xl p-8 text-center bg-zinc-950/40 hover:bg-zinc-950/80 transition-[background-color,border-color] duration-300 group cursor-pointer flex flex-col items-center justify-center min-h-[180px]">
//               <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-[#c5a880] group-hover:border-[#c5a880]/30 transition-[color,border-color] duration-300 mb-3">
//                 <Upload size={22} />
//               </div>
//               <span className="block text-xs font-bold text-zinc-300">Drag & Drop Files Here</span>
//               <span className="text-[10px] text-zinc-500 mt-1 block">Supports High-Res JPG, PNG, WEBP & MP4</span>
//               <span className="text-[9px] text-[#ae1431] font-semibold mt-2 bg-[#ae1431]/5 px-2 py-0.5 rounded border border-[#ae1431]/10">Max size 15MB</span>
//             </div>
//           </div>

//           <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 leading-normal">
//             Uploaded assets are compressed and distributed automatically to Cloudflare global nodes for faster page speeds.
//           </div>
//         </div>

//         {/* Filters & Grid View */}
//         <div className="lg:col-span-2 bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 space-y-6">
          
//           {/* Header toolbar */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//             <div className="relative w-full sm:max-w-xs">
//               <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
//               <input
//                 type="text"
//                 placeholder="Filter by filename..."
//                 className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-[#c5a880]/15 hover:border-[#c5a880]/30 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-xs text-zinc-200 placeholder:text-zinc-600 transition-[border-color,box-shadow] duration-200"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] self-end sm:self-auto overflow-x-auto max-w-full scrollbar-hide">
//               {categories.map((cat) => (
//                 <button
//                   key={cat.value}
//                   onClick={() => setSelectedCategory(cat.value)}
//                   className={`px-3 py-1.5 rounded-lg font-semibold transition-[color,background-color] duration-200 whitespace-nowrap ${
//                     selectedCategory === cat.value ? "bg-zinc-900 text-[#c5a880]" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   {cat.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Media Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {filteredMedia.map((media) => (
//               <div 
//                 key={media.id} 
//                 className="relative aspect-video bg-zinc-950 border border-zinc-850 hover:border-[#c5a880]/30 rounded-xl overflow-hidden group transition-[border-color] duration-200"
//               >
//                 {/* Visual placeholder or real image */}
//                 <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-950 to-zinc-900 relative">
//                   <ImageIcon size={28} className="text-zinc-800 group-hover:text-[#c5a880]/30 group-hover:scale-110 transition-[color,transform] duration-300" />
//                   <span className="absolute bottom-2 left-2 right-2 text-[9px] text-zinc-500 font-semibold truncate bg-zinc-950/80 px-1.5 py-0.5 rounded border border-zinc-900">{media.name}</span>
//                 </div>

//                 {/* Overlays Controls */}
//                 <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 z-10">
//                   <div className="flex items-center justify-between">
//                     <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{media.category}</span>
//                     <span className="text-[9px] text-[#c5a880] font-bold">{media.size}</span>
//                   </div>
                  
//                   <div className="flex items-center justify-center gap-1.5">
//                     <button 
//                       onClick={() => handleCopyLink(media.name)}
//                       className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-[#c5a880] border border-zinc-850 transition-colors duration-200 cursor-pointer"
//                       title="Copy CDN Link"
//                     >
//                       <Copy size={12} />
//                     </button>
//                     <button 
//                       className="p-1.5 bg-zinc-900 hover:bg-[#ae1431]/20 rounded-lg text-zinc-400 hover:text-[#ae1431] border border-zinc-850 hover:border-[#ae1431]/30 transition-colors duration-200 cursor-pointer"
//                       title="Delete Media"
//                     >
//                       <Trash2 size={12} />
//                     </button>
//                   </div>

//                   <div className="text-[8px] text-zinc-600 text-center font-light">Uploaded: {media.date}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { Trash2, UploadCloud } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'mmhss', label: 'MMHSS' },
  { id: 'mmps', label: 'MMPS' },
  { id: 'amlp', label: 'AMLP' },
  { id: 'mmite', label: 'MMITE' },
];

const TYPES = [
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'social', label: 'Social' },
  { id: 'academic', label: 'Academic' },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // upload form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [type, setType] = useState('sports');
  const [file, setFile] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    api.get('/gallery')
      .then(({ data }) => setItems(data))
      .catch((err) => console.error('Failed to fetch gallery items:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('type', type);

    try {
      await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTitle('');
      setFile(null);
      document.getElementById('gallery-file-input').value = '';
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
    }
  };

  // group items by category for the sorted list view
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category === cat.id),
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-[#ae1431]">Gallery Manager</h1>
      <p className="mt-1 text-sm text-neutral-600">Upload photos and manage the master gallery.</p>

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="mt-6 grid gap-4 rounded-lg border border-black/10 bg-white p-5 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2 text-sm"
            placeholder="e.g. Annual Sports Meet"
          />
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">School</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">Event Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2 text-sm"
          >
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">Image</label>
          <input
            id="gallery-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="mt-1 w-full text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="sm:col-span-2 flex items-center justify-center gap-2 rounded-md bg-[#ae1431] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          <UploadCloud size={16} />
          {uploading ? 'Uploading…' : 'Upload Image'}
        </button>
      </form>

      {/* Grouped table/list, sorted by category */}
      <div className="mt-10 space-y-8">
        {loading ? (
          <p className="text-sm text-neutral-500">Loading gallery…</p>
        ) : (
          grouped.map((group) => (
            <div key={group.id}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#ae1431]">
                {group.label} <span className="text-neutral-400">({group.items.length})</span>
              </h2>

              {group.items.length === 0 ? (
                <p className="text-sm text-neutral-400">No images yet.</p>
              ) : (
                <div className="overflow-hidden rounded-md border border-black/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/[0.03] text-xs uppercase tracking-wide text-neutral-500">
                      <tr>
                        <th className="px-4 py-2">Preview</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Uploaded</th>
                        <th className="px-4 py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr key={item._id} className="border-t border-black/5">
                          <td className="px-4 py-2">
                            <img src={item.image} alt={item.title} className="h-12 w-16 rounded object-cover" />
                          </td>
                          <td className="px-4 py-2">{item.title}</td>
                          <td className="px-4 py-2 capitalize text-neutral-600">{item.type}</td>
                          <td className="px-4 py-2 text-neutral-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-neutral-400 transition-colors hover:text-[#ae1431]"
                              aria-label="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}