// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Eye,
//   Edit2,
//   Clock,
//   CornerDownRight,
//   Heading,
//   Laptop,
//   X,
//   Save,
//   ImagePlus,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";
// import { PageHeader } from "@/components/admin/DashboardComponents";
// import { getHero, updateHero, uploadHeroImage } from "@/services/heroService";

// const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
// const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// const INITIAL_SECTION = {
//   id: "hero",
//   name: "Hero Section",
//   description: "Primary brand statement, background video controls, and main call-to-actions.",
//   status: "Published",
//   lastUpdated: "2 hours ago",
//   updatedBy: "Admin",
//   content: {
//     title: "Building Foundations. Shaping Futures.",
//     subtitle:
//       "Eram Education is committed to cultivating disciplined, values-driven institutions that expand opportunities and make quality learning accessible.",
//     primaryCta: "Explore Institutions",
//     secondaryCta: "Parent Portal",
//     image: "/images/slide11.avif",
//   },
// };

// export default function Hero() {
//   const [section, setSection] = useState(INITIAL_SECTION);
//   const [isEditing, setIsEditing] = useState(false);
//   const [draftContent, setDraftContent] = useState(null);
//   const [isPreviewing, setIsPreviewing] = useState(false);

//   // Image upload state
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [imageError, setImageError] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const loadHero = async () => {
//       try {
//         const res = await getHero();

//         if (res.success) {
//           const hero = res.data.slides[0];

//           setSection((prev) => ({
//             ...prev,
//             content: {
//               title: `${hero.titleLine1} ${hero.titleLine2}`,
//               subtitle: hero.description,
//               primaryCta: hero.primaryButton.text,
//               secondaryCta: hero.secondaryButton.text,
//               image: hero.image,
//             },
//           }));
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadHero();
//   }, []);

//   // Revoke the local preview URL whenever it's replaced or the modal closes
//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   const openEdit = () => {
//     setDraftContent(section.content);
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     setImageError("");
//     setSaveError("");
//     setIsEditing(true);
//   };

//   const closeEdit = () => {
//     setIsEditing(false);
//     setDraftContent(null);
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     setImageError("");
//     setSaveError("");
//   };

//   const updateDraft = (key) => (e) =>
//     setDraftContent((prev) => ({ ...prev, [key]: e.target.value }));

//   const handleImageSelect = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       setImageError("Only JPG, PNG, WEBP, or AVIF images are allowed.");
//       e.target.value = "";
//       return;
//     }

//     if (file.size > MAX_IMAGE_SIZE) {
//       setImageError(
//         `Image is ${(file.size / 1024).toFixed(0)}KB — max allowed is 500KB. Please compress and try again.`
//       );
//       e.target.value = "";
//       return;
//     }

//     setImageError("");
//     setSelectedFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     setSaveError("");

//     try {
//       let finalImage = draftContent.image;

//       // Only hits the upload endpoint if a new file was actually picked
//       if (selectedFile) {
//         const uploadRes = await uploadHeroImage(selectedFile);
//         if (!uploadRes.success) {
//           throw new Error(uploadRes.message || "Image upload failed.");
//         }
//         finalImage = uploadRes.data.image;
//       }

//       const res = await getHero();
//       const slides = [...res.data.slides];
//       const words = draftContent.title.split(" ");

//       slides[0] = {
//         ...slides[0],
//         image: finalImage,
//         titleLine1: words.slice(0, 2).join(" "),
//         titleLine2: words.slice(2).join(" "),
//         description: draftContent.subtitle,
//         primaryButton: {
//           ...slides[0].primaryButton,
//           text: draftContent.primaryCta,
//         },
//         secondaryButton: {
//           ...slides[0].secondaryButton,
//           text: draftContent.secondaryCta,
//         },
//       };

//       const updateRes = await updateHero({ slides });
//       const hero = updateRes.data.slides[0];

//       setSection((prev) => ({
//         ...prev,
//         content: {
//           title: `${hero.titleLine1} ${hero.titleLine2}`,
//           subtitle: hero.description,
//           primaryCta: hero.primaryButton.text,
//           secondaryCta: hero.secondaryButton.text,
//           image: hero.image,
//         },
//         lastUpdated: "Just now",
//         updatedBy: "Senior Admin",
//         status: "Published",
//       }));

//       closeEdit();
//     } catch (err) {
//       console.error(err);
//       setSaveError(err.message || "Failed to save Hero section.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
//       <PageHeader
//         title="Homepage CMS"
//         description="Modify headings, CTAs, and marketing metrics of the public-facing ERAM website."
//       >
//         <div className="text-xs bg-zinc-900 border border-[#c5a880]/15 text-[#c5a880] px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
//           <Clock size={12} />
//           <span>Last live deploy: 4h ago</span>
//         </div>
//       </PageHeader>

//       {/* Hero Card */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-zinc-900/40 border border-[#c5a880]/10 hover:border-[#c5a880]/30 rounded-2xl p-6 flex flex-col justify-between transition-[border-color] duration-200 group">
//           <div>
//             <div className="flex items-start justify-between mb-3">
//               <div>
//                 <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-wider font-['Agency'] group-hover:text-[#F5EFE8] transition-colors duration-250">
//                   {section.name}
//                 </h3>
//                 <p className="text-xs text-zinc-500 mt-1 font-light leading-relaxed">
//                   {section.description}
//                 </p>
//               </div>
//               <span
//                 className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
//                   section.status === "Published"
//                     ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
//                     : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
//                 }`}
//               >
//                 {section.status}
//               </span>
//             </div>

//             <div className="bg-zinc-950/60 rounded-xl p-4 my-4 border border-zinc-800/80 text-xs space-y-2">
//               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-2 flex items-center gap-1">
//                 <CornerDownRight size={10} className="text-[#c5a880]" />
//                 Active Content Details
//               </p>
//               <div className="flex items-center gap-3">
//                 {section.content.image && (
//                   <img
//                     src={
//                       section.content.image.startsWith("http") ||
//                       section.content.image.startsWith("/uploads")
//                         ? section.content.image
//                         : section.content.image
//                     }
//                     alt=""
//                     className="w-14 h-14 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
//                   />
//                 )}
//                 <div className="space-y-2 min-w-0">
//                   <p className="truncate">
//                     <strong className="text-zinc-500">Title:</strong>{" "}
//                     <span className="text-zinc-300">{section.content.title}</span>
//                   </p>
//                   <p className="line-clamp-2">
//                     <strong className="text-zinc-500">Subtitle:</strong>{" "}
//                     <span className="text-zinc-400 font-light">{section.content.subtitle}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 pt-4 border-t border-zinc-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500">
//             <div className="flex items-center gap-1.5 font-light">
//               <Clock size={12} className="text-[#c5a880]" />
//               <span>
//                 Updated {section.lastUpdated} by{" "}
//                 <strong className="font-medium text-zinc-400">{section.updatedBy}</strong>
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setIsPreviewing(true)}
//                 className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors duration-200 cursor-pointer"
//               >
//                 <Eye size={12} />
//                 <span>Preview</span>
//               </button>
//               <button
//                 onClick={openEdit}
//                 className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ae1431]/10 hover:bg-[#ae1431]/20 text-[#ae1431] hover:text-[#F5EFE8] border border-[#ae1431]/30 transition-[color,background-color,border-color] duration-200 cursor-pointer"
//               >
//                 <Edit2 size={12} />
//                 <span>Edit</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Editor Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
//           <div className="w-full max-w-lg bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
//             <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
//               <div className="flex items-center gap-2">
//                 <div className="p-1 bg-[#ae1431]/10 rounded border border-[#ae1431]/25 text-[#ae1431]">
//                   <Heading size={14} />
//                 </div>
//                 <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
//                   Edit Section Content: {section.name}
//                 </h3>
//               </div>
//               <button
//                 onClick={closeEdit}
//                 className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200"
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
//               {/* Image Upload */}
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
//                   Slide 1 Background Image
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex-shrink-0">
//                     {previewUrl || draftContent.image ? (
//                       <img
//                         src={previewUrl || draftContent.image}
//                         alt="Slide preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : null}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/jpeg,image/png,image/webp,image/avif"
//                       onChange={handleImageSelect}
//                       className="hidden"
//                       id="hero-image-input"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/40 text-xs text-zinc-300 cursor-pointer"
//                     >
//                       <ImagePlus size={13} />
//                       Choose Image
//                     </button>
//                     <p className="text-[10px] text-zinc-500 mt-1.5">
//                       JPG, PNG, WEBP, or AVIF — max 500KB.
//                     </p>
//                     {imageError && (
//                       <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
//                         <AlertCircle size={11} />
//                         {imageError}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
//                   Hero Title Headline
//                 </label>
//                 <input
//                   type="text"
//                   value={draftContent.title}
//                   onChange={updateDraft("title")}
//                   className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
//                   Hero Subtitle Paragraph
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={draftContent.subtitle}
//                   onChange={updateDraft("subtitle")}
//                   className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200 resize-none leading-relaxed"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
//                     Primary Button CTA
//                   </label>
//                   <input
//                     type="text"
//                     value={draftContent.primaryCta}
//                     onChange={updateDraft("primaryCta")}
//                     className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
//                     Secondary Button CTA
//                   </label>
//                   <input
//                     type="text"
//                     value={draftContent.secondaryCta}
//                     onChange={updateDraft("secondaryCta")}
//                     className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-[#c5a880] outline-none transition-[border-color] duration-200"
//                   />
//                 </div>
//               </div>

//               {saveError && (
//                 <p className="text-xs text-red-400 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
//                   <AlertCircle size={13} />
//                   {saveError}
//                 </p>
//               )}
//             </div>

//             <div className="px-6 py-4 border-t border-[#c5a880]/15 flex items-center justify-end gap-3 bg-zinc-950">
//               <button
//                 onClick={closeEdit}
//                 disabled={isSaving}
//                 className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-xs font-medium cursor-pointer disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={isSaving}
//                 className="px-4 py-2 rounded-lg bg-[#ae1431] hover:bg-[#ae1431]/90 text-[#F5EFE8] text-xs font-medium flex items-center gap-1.5 shadow-[0_4px_10px_rgba(174,20,49,0.3)] cursor-pointer disabled:opacity-60"
//               >
//                 {isSaving ? (
//                   <>
//                     <Loader2 size={13} className="animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={13} />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Preview Modal */}
//       {isPreviewing && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
//           <div className="w-full max-w-2xl bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
//             <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
//               <div className="flex items-center gap-2">
//                 <Laptop size={14} className="text-[#c5a880]" />
//                 <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
//                   Live View Preview: {section.name}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setIsPreviewing(false)}
//                 className="p-1 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200"
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             <div
//               className="relative p-6 text-black overflow-y-auto max-h-[60vh] border-b border-[#c5a880]/10 flex flex-col justify-center min-h-[300px]"
//               style={{
//                 backgroundImage: section.content.image
//                   ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${section.content.image})`
//                   : undefined,
//                 backgroundColor: "#F5EFE8",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <div className="text-center max-w-lg mx-auto py-10 space-y-6">
//                 <span className="font-[Rethink_Sans] tracking-[0.25em] text-xs text-white uppercase block font-semibold">
//                   ERAM EDUCATION
//                 </span>
//                 <h1 className="font-['Agency'] text-5xl font-extrabold text-white leading-none uppercase tracking-wide">
//                   {section.content.title}
//                 </h1>
//                 <p className="font-[Rethink_Sans] text-white/85 text-sm leading-relaxed max-w-md mx-auto">
//                   {section.content.subtitle}
//                 </p>
//                 <div className="flex items-center justify-center gap-4 pt-2 font-[Rethink_Sans]">
//                   <button className="px-6 py-2.5 bg-[#ae1431] hover:bg-black text-white text-xs font-semibold rounded-full transition duration-300">
//                     {section.content.primaryCta}
//                   </button>
//                   <button className="px-6 py-2.5 border border-white/70 hover:border-white text-white text-xs font-semibold rounded-full transition duration-300">
//                     {section.content.secondaryCta}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 py-3 border-t border-[#c5a880]/15 flex items-center justify-between bg-zinc-950 text-[10px] text-zinc-600">
//               <span>This is a replica of the public site's theme & stylesheet.</span>
//               <button
//                 onClick={() => setIsPreviewing(false)}
//                 className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-semibold"
//               >
//                 Close Preview
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { getHero, updateHero, uploadHeroImage } from "../../../../services/heroService";

const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const EMPTY_SLIDE = {
  image: "",
  titleLine1: "",
  titleLine2: "",
  subline: "",
  description: "",
  primaryButton: { text: "", link: "" },
  secondaryButton: { text: "", link: "" },
};

function normalizeSlides(slides) {
  // Always work with exactly 4 slides, even if backend has fewer
  const result = [];
  for (let i = 0; i < 4; i++) {
    const existing = slides?.[i];
    result.push({
      ...EMPTY_SLIDE,
      ...existing,
      primaryButton: { ...EMPTY_SLIDE.primaryButton, ...existing?.primaryButton },
      secondaryButton: { ...EMPTY_SLIDE.secondaryButton, ...existing?.secondaryButton },
      // local-only UI fields
      imageFile: null,
      previewUrl: existing?.image || "",
      imageError: "",
    });
  }
  return result;
}

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadHero() {
      try {
        setIsLoading(true);
        const response = await getHero();
        // API responds as { success, data: { ...heroDoc, slides: [...] } }
        const heroDoc = response?.data ?? response;
        if (isMounted) {
          setSlides(normalizeSlides(heroDoc?.slides));
        }
      } catch (err) {
        if (isMounted) {
          setSaveError("Failed to load hero data. Please refresh the page.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadHero();
    return () => {
      isMounted = false;
    };
  }, []);

  function updateActiveSlide(updater) {
    setSlides((prev) => {
      const next = [...prev];
      next[activeIndex] = { ...next[activeIndex], ...updater(next[activeIndex]) };
      return next;
    });
  }

  function handleTextChange(field, value) {
    updateActiveSlide(() => ({ [field]: value }));
    setSaveSuccess(false);
  }

  function handleButtonChange(buttonKey, field, value) {
    updateActiveSlide((slide) => ({
      [buttonKey]: { ...slide[buttonKey], [field]: value },
    }));
    setSaveSuccess(false);
  }

  function validateImage(file) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPG, PNG, WEBP, or AVIF images are allowed.";
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return `Image must be 500KB or smaller (selected file is ${(file.size / 1024).toFixed(0)}KB).`;
    }
    return "";
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      updateActiveSlide(() => ({ imageError: error }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    updateActiveSlide(() => ({
      imageFile: file,
      previewUrl,
      imageError: "",
    }));
    setSaveSuccess(false);
  }

  async function handleSaveAll() {
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      // Upload any newly selected images first, slide by slide
      const updatedSlides = [...slides];

      for (let i = 0; i < updatedSlides.length; i++) {
        const slide = updatedSlides[i];
        if (slide.imageFile) {
          const uploadResult = await uploadHeroImage(slide.imageFile);
          // API responds as { success, message, data: { image: url } }
          const imageUrl =
            uploadResult?.data?.image ||
            uploadResult?.image ||
            uploadResult?.url ||
            uploadResult?.data?.url;
          if (!imageUrl || typeof imageUrl !== "string") {
            throw new Error(`Image upload for slide ${i + 1} did not return a valid URL.`);
          }
          updatedSlides[i] = { ...slide, image: imageUrl };
        }
      }

      // Strip local-only UI fields before sending to backend
      const payloadSlides = updatedSlides.map(
        ({ imageFile, previewUrl, imageError, ...rest }) => rest
      );

      await updateHero({ slides: payloadSlides });

      // Reflect uploaded image URLs back into state, clear file/error state
      setSlides(
        updatedSlides.map((slide) => ({
          ...slide,
          imageFile: null,
          imageError: "",
          previewUrl: slide.image,
        }))
      );
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[#7a7a7a]">
        Loading hero slides...
      </div>
    );
  }

  const activeSlide = slides[activeIndex];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#ae1431] mb-4">
        Hero Section — Slides
      </h1>

      {/* Slide tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeIndex === i
                ? "border-[#ae1431] text-[#ae1431]"
                : "border-transparent text-gray-500 hover:text-[#ae1431]"
            }`}
          >
            Slide {i + 1}
          </button>
        ))}
      </div>

      {activeSlide && (
        <div className="space-y-6">
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Slide Image (max 500KB — JPG, PNG, WEBP, AVIF)
            </label>
            <div className="flex items-start gap-4">
              <div className="w-40 h-24 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                {activeSlide.previewUrl ? (
                  <img
                    src={activeSlide.previewUrl}
                    alt={`Slide ${activeIndex + 1} preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </div>
              <div>
                <input
                  id={`hero-image-input-${activeIndex}`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor={`hero-image-input-${activeIndex}`}
                  className="inline-block cursor-pointer px-4 py-2 rounded-md bg-[#ae1431] text-white text-sm font-medium hover:bg-[#8f1027] transition-colors"
                >
                  Choose Image
                </label>
                {activeSlide.imageError && (
                  <p className="text-red-600 text-xs mt-2">{activeSlide.imageError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Title lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title Line 1</label>
              <input
                type="text"
                value={activeSlide.titleLine1}
                onChange={(e) => handleTextChange("titleLine1", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title Line 2</label>
              <input
                type="text"
                value={activeSlide.titleLine2}
                onChange={(e) => handleTextChange("titleLine2", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Subline */}
          <div>
            <label className="block text-sm font-medium mb-1">Subline</label>
            <input
              type="text"
              value={activeSlide.subline}
              onChange={(e) => handleTextChange("subline", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Description / paragraph */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={4}
              value={activeSlide.description}
              onChange={(e) => handleTextChange("description", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-md p-4">
              <p className="text-sm font-semibold mb-3">Primary Button</p>
              <label className="block text-xs text-gray-500 mb-1">Text</label>
              <input
                type="text"
                value={activeSlide.primaryButton.text}
                onChange={(e) => handleButtonChange("primaryButton", "text", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {/* Link is intentionally not editable here — kept as-is from backend */}
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <p className="text-sm font-semibold mb-3">Secondary Button</p>
              <label className="block text-xs text-gray-500 mb-1">Text</label>
              <input
                type="text"
                value={activeSlide.secondaryButton.text}
                onChange={(e) => handleButtonChange("secondaryButton", "text", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {/* Link is intentionally not editable here — kept as-is from backend */}
            </div>
          </div>

          {/* Preview toggle */}
          <div>
            <button
              type="button"
              onClick={() => setPreviewModalOpen(true)}
              className="text-sm text-[#ae1431] underline"
            >
              Preview this slide
            </button>
          </div>
        </div>
      )}

      {/* Save bar */}
      <div className="mt-8 flex items-center gap-4 sticky bottom-0 bg-white py-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-2 rounded-md bg-[#ae1431] text-white text-sm font-medium hover:bg-[#8f1027] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isSaving ? "Saving..." : "Save All Slides"}
        </button>

        {saveError && <p className="text-red-600 text-sm">{saveError}</p>}
        {saveSuccess && !saveError && (
          <p className="text-green-600 text-sm">Saved successfully.</p>
        )}
      </div>

      {/* Preview modal */}
      {previewModalOpen && activeSlide && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setPreviewModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 rounded-lg overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full aspect-[16/9] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: activeSlide.previewUrl
                  ? `url(${activeSlide.previewUrl})`
                  : "none",
              }}
            >
              <div className="bg-black/40 w-full h-full flex flex-col items-center justify-center text-center px-6 text-white">
                <p className="font-[Playfair_Display] text-3xl md:text-5xl">
                  {activeSlide.titleLine1}
                  <br />
                  {activeSlide.titleLine2}
                </p>
                <p className="mt-2 text-sm md:text-base text-[#F5EFE8]">
                  {activeSlide.subline}
                </p>
                <p className="mt-2 max-w-xl text-xs md:text-sm text-[#F5EFE8]/80">
                  {activeSlide.description}
                </p>
                <div className="mt-4 flex gap-3">
                  {activeSlide.primaryButton.text && (
                    <span className="px-4 py-2 bg-[#ae1431] rounded-md text-xs md:text-sm">
                      {activeSlide.primaryButton.text}
                    </span>
                  )}
                  {activeSlide.secondaryButton.text && (
                    <span className="px-4 py-2 border border-white rounded-md text-xs md:text-sm">
                      {activeSlide.secondaryButton.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPreviewModalOpen(false)}
              className="absolute top-3 right-3 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}