"use client";

import { useEffect, useState } from "react";
import {
  getHero,
  updateHero,
  uploadHeroImage,
} from "../../../../services/heroService";

const MAX_IMAGE_SIZE = 500 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const EMPTY_SLIDE = {
  image: "",
  titleLine1: "",
  titleLine2: "",
  subline: "",
  sublineLogo: "",
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
      primaryButton: {
        ...EMPTY_SLIDE.primaryButton,
        ...existing?.primaryButton,
      },
      secondaryButton: {
        ...EMPTY_SLIDE.secondaryButton,
        ...existing?.secondaryButton,
      },
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
      next[activeIndex] = {
        ...next[activeIndex],
        ...updater(next[activeIndex]),
      };
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
      return `Image must be 500KB or smaller (selected file is ${(
        file.size / 1024
      ).toFixed(0)}KB).`;
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

  async function handleSublineLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }

    try {
      const uploadResult = await uploadHeroImage(file);

      const logoUrl =
        uploadResult?.data?.image ||
        uploadResult?.image ||
        uploadResult?.url ||
        uploadResult?.data?.url;

      if (!logoUrl) {
        throw new Error("Logo upload failed.");
      }

      updateActiveSlide(() => ({
        sublineLogo: logoUrl,
      }));

      setSaveSuccess(false);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to upload logo.",
      );
    }
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
            throw new Error(
              `Image upload for slide ${i + 1} did not return a valid URL.`,
            );
          }
          updatedSlides[i] = { ...slide, image: imageUrl };
        }
      }

      // Strip local-only UI fields before sending to backend
      const payloadSlides = updatedSlides.map(
        ({ imageFile, previewUrl, imageError, ...rest }) => rest,
      );

      await updateHero({ slides: payloadSlides });

      // Reflect uploaded image URLs back into state, clear file/error state
      setSlides(
        updatedSlides.map((slide) => ({
          ...slide,
          imageFile: null,
          imageError: "",
          previewUrl: slide.image,
        })),
      );
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
        <p className="font-rethink text-sm text-[#8a7f6f]">Loading hero slides...</p>
      </div>
    );
  }

  const activeSlide = slides[activeIndex];

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <div className="p-6 sm:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-display text-[#2b2620] mb-1">
          Hero Section — Slides
        </h1>
        <p className="text-sm font-rethink text-[#8a7f6f] mb-6">
          Manage the homepage hero carousel — images, copy, and buttons for each slide.
        </p>

        {/* Slide tabs */}
        <div className="flex gap-1.5 mb-6 p-1 bg-white border border-[#e3d6c3] rounded-xl w-fit shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-1.5 rounded-lg font-rethink text-sm cursor-pointer transition-colors ${
                activeIndex === i
                  ? "bg-[#ae1431] text-white"
                  : "text-[#8a7f6f] hover:text-[#2b2620]"
              }`}
            >
              Slide {i + 1}
            </button>
          ))}
        </div>

        {activeSlide && (
          <div className="space-y-6 rounded-xl border border-[#e3d6c3] bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
            {/* Image upload */}
            <div>
              <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-2">
                Slide Image (max 500KB — JPG, PNG, WEBP, AVIF)
              </label>
              <div className="flex items-start gap-4">
                <div className="w-40 h-24 rounded-md overflow-hidden bg-[#F5EFE8] border border-[#e3d6c3] flex items-center justify-center shrink-0">
                  {activeSlide.previewUrl ? (
                    <img
                      src={activeSlide.previewUrl}
                      alt={`Slide ${activeIndex + 1} preview`}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <span className="text-xs font-rethink text-[#b5aa98]">No image</span>
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
                    className="inline-block cursor-pointer px-4 py-2 rounded-md bg-[#ae1431] text-white text-sm font-rethink font-medium hover:bg-[#9a1129] transition-colors"
                  >
                    Choose Image
                  </label>
                  {activeSlide.imageError && (
                    <p className="text-[#ae1431] text-xs font-rethink mt-2">
                      {activeSlide.imageError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Title lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-1.5">
                  Title Line 1
                </label>
                <input
                  type="text"
                  value={activeSlide.titleLine1}
                  onChange={(e) => handleTextChange("titleLine1", e.target.value)}
                  className="w-full border border-[#e3d6c3] rounded-md px-3 py-2 text-sm font-rethink text-[#2b2620] outline-none focus:border-[#ae1431] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-1.5">
                  Title Line 2
                </label>
                <input
                  type="text"
                  value={activeSlide.titleLine2}
                  onChange={(e) => handleTextChange("titleLine2", e.target.value)}
                  className="w-full border border-[#e3d6c3] rounded-md px-3 py-2 text-sm font-rethink text-[#2b2620] outline-none focus:border-[#ae1431] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-2">
                Subline Logo (Optional)
              </label>

              <div className="flex items-center gap-4">
                {activeSlide.sublineLogo && (
                  <div className="flex items-center justify-center rounded-md bg-[#2b2620] px-3 py-2">
                    <img
                      src={activeSlide.sublineLogo}
                      alt="Partner Logo"
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                )}

                <input
                  id={`subline-logo-${activeIndex}`}
                  type="file"
                  accept="image/*"
                  onChange={handleSublineLogoChange}
                  className="hidden"
                />

                <label
                  htmlFor={`subline-logo-${activeIndex}`}
                  className="cursor-pointer rounded-md bg-[#ae1431] px-4 py-2 text-sm font-rethink font-medium text-white hover:bg-[#9a1129] transition-colors"
                >
                  Choose Logo
                </label>
              </div>
            </div>

            {/* Subline */}
            <div>
              <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-1.5">
                Subline
              </label>
              <input
                type="text"
                value={activeSlide.subline}
                onChange={(e) => handleTextChange("subline", e.target.value)}
                className="w-full border border-[#e3d6c3] rounded-md px-3 py-2 text-sm font-rethink text-[#2b2620] outline-none focus:border-[#ae1431] transition-colors"
              />
            </div>

            {/* Description / paragraph */}
            <div>
              <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-1.5">
                Description
              </label>
              <textarea
                rows={4}
                value={activeSlide.description}
                onChange={(e) => handleTextChange("description", e.target.value)}
                className="w-full border border-[#e3d6c3] rounded-md px-3 py-2 text-sm font-rethink text-[#2b2620] outline-none focus:border-[#ae1431] resize-none transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#e3d6c3] rounded-md p-4">
                <p className="font-rethink text-sm font-medium text-[#2b2620] mb-3">Primary Button</p>
                <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-1.5">
                  Text
                </label>
                <input
                  type="text"
                  value={activeSlide.primaryButton.text}
                  onChange={(e) =>
                    handleButtonChange("primaryButton", "text", e.target.value)
                  }
                  className="w-full border border-[#e3d6c3] rounded-md px-3 py-2 text-sm font-rethink text-[#2b2620] outline-none focus:border-[#ae1431] transition-colors"
                />
                {/* Link is intentionally not editable here — kept as-is from backend */}
              </div>

              <div className="border border-[#e3d6c3] rounded-md p-4">
                <p className="font-rethink text-sm font-medium text-[#2b2620] mb-3">Secondary Button</p>
                <label className="block text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f] mb-1.5">
                  Text
                </label>
                <input
                  type="text"
                  value={activeSlide.secondaryButton.text}
                  onChange={(e) =>
                    handleButtonChange("secondaryButton", "text", e.target.value)
                  }
                  className="w-full border border-[#e3d6c3] rounded-md px-3 py-2 text-sm font-rethink text-[#2b2620] outline-none focus:border-[#ae1431] transition-colors"
                />
                {/* Link is intentionally not editable here — kept as-is from backend */}
              </div>
            </div>

            {/* Preview toggle */}
            <div>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(true)}
                className="text-[#ae1431] text-sm font-rethink font-medium cursor-pointer underline underline-offset-2 hover:text-[#9a1129] transition-colors"
              >
                Preview this slide
              </button>
            </div>
          </div>
        )}

        {/* Save bar */}
        <div className="mt-6 flex items-center gap-4 sticky bottom-0 py-4 bg-[#F5EFE8]/95 backdrop-blur-sm border-t border-[#e3d6c3]">
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="px-6 py-2 rounded-md cursor-pointer bg-[#ae1431] text-white text-sm font-rethink font-medium hover:bg-[#9a1129] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isSaving && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isSaving ? "Saving..." : "Save All Slides"}
          </button>

          {saveError && <p className="text-[#ae1431] text-sm font-rethink">{saveError}</p>}
          {saveSuccess && !saveError && (
            <p className="text-[#3f6b52] text-sm font-rethink">Saved successfully.</p>
          )}
        </div>
      </div>

      {/* Preview modal — intentionally dark, simulates the actual live hero banner */}
      {previewModalOpen && activeSlide && (
        <div
          className="fixed inset-0 bg-[#2b2620]/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setPreviewModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-lg overflow-hidden bg-black shadow-[0_8px_24px_rgba(43,38,32,0.2)]"
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
                <p className="font-display text-3xl md:text-5xl">
                  {activeSlide.titleLine1}
                  <br />
                  {activeSlide.titleLine2}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <p className="md:text-base text-[#F5EFE8]">
                    {activeSlide.subline}
                  </p>

                  {activeSlide.sublineLogo && (
                    <img
                      src={activeSlide.sublineLogo}
                      alt="Partner Logo"
                      className="h-5 w-auto object-contain"
                    />
                  )}
                </div>
                <p className="mt-2 max-w-xl md:text-sm text-[#F5EFE8]/80">
                  {activeSlide.description}
                </p>
                <div className="mt-4 flex gap-3">
                  {activeSlide.primaryButton.text && (
                    <span className="px-4 py-2 bg-[#ae1431] rounded-md text-sm md:text-base font-rethink">
                      {activeSlide.primaryButton.text}
                    </span>
                  )}
                  {activeSlide.secondaryButton.text && (
                    <span className="px-4 py-2 border border-white rounded-md text-sm md:text-base font-rethink">
                      {activeSlide.secondaryButton.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPreviewModalOpen(false)}
              className="absolute top-3 right-3 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}