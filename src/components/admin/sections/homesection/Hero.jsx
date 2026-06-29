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
      <div className="mt-8 flex items-center gap-4 sticky bottom-0 py-4 border-t border-gray-200">
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