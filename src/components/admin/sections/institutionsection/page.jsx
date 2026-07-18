"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Award,
  BarChart3,
  Star,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  Save,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/api";

const TABS = [
  { key: "benchmark", label: "Benchmarks", icon: Award },
  { key: "excellence", label: "Excellence", icon: Star },
  { key: "stat", label: "Stats", icon: BarChart3 },
];

const emptyForm = {
  _id: null,
  tag: "",
  title: "",
  desc: "",
  sub: "",
  value: "",
  unit: "",
  label: "",
  order: 0,
};

const SCHOOLS = [
  { value: "mmhss", label: "MMHSS Palakkad", dot: "#3f6b52" },
  { value: "mmps", label: "MMPS Palakkad", dot: "#6b4f8b" },
  { value: "amlp", label: "AMLP School", dot: "#a15c2e" },
  { value: "mmite", label: "MMITE Palakkad", dot: "#3f5f8b" },
];

// Self-contained page component — pick a school, then manage its academics
export default function AcademicsManager() {
  const [school, setSchool] = useState(SCHOOLS[0].value);
  const schoolLabel = SCHOOLS.find((s) => s.value === school)?.label;

  const [activeTab, setActiveTab] = useState("benchmark");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");

  // ── Modal / form state ──────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = useRef(null);

  // ── Delete confirmation modal state ─────────────────────────
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // ── Toast state ──────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((message, type = "success") => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const fetchEntries = useCallback(async () => {
    if (!school) {
      setIsLoading(false);
      setListError("No school selected. Pass a `school` prop to load its academics.");
      return;
    }
    setIsLoading(true);
    setListError("");
    try {
      const res = await api.get("/academics", { params: { school, section: activeTab } });
      setEntries(res.data);
    } catch (err) {
      console.error(err);
      setListError("Could not load entries.");
    } finally {
      setIsLoading(false);
    }
  }, [school, activeTab]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  function openAddModal() {
    setFormData(emptyForm);
    setImagePreview("");
    setImageFile(null);
    setErrors({});
    setIsModalOpen(true);
  }

  function openEditModal(entry) {
    setFormData({
      _id: entry._id,
      tag: entry.tag || "",
      title: entry.title || "",
      desc: entry.desc || "",
      sub: entry.sub || "",
      value: entry.value || "",
      unit: entry.unit || "",
      label: entry.label || "",
      order: entry.order || 0,
    });
    setImagePreview(entry.image || "");
    setImageFile(null);
    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    if (isSaving) return;
    setIsModalOpen(false);
    setFormData(emptyForm);
    setImagePreview("");
    setImageFile(null);
    setErrors({});
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select a valid image file" }));
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setErrors((prev) => {
      const next = { ...prev };
      delete next.image;
      return next;
    });
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate() {
    const newErrors = {};

    if (activeTab === "benchmark") {
      if (!formData.tag.trim()) newErrors.tag = "Tag is required";
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.desc.trim()) newErrors.desc = "Description is required";
      // image optional for benchmarks
    }

    if (activeTab === "excellence") {
      if (!formData.tag.trim()) newErrors.tag = "Tag is required";
      if (!formData.title.trim()) newErrors.title = "Student name is required";
      if (!formData.sub.trim()) newErrors.sub = "Grade/class is required";
      if (!formData.desc.trim()) newErrors.desc = "Achievement line is required";
    }

    if (activeTab === "stat") {
      if (!formData.value.trim()) newErrors.value = "Value is required";
      if (!formData.label.trim()) newErrors.label = "Label is required";
      // image optional for stats
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const isEdit = Boolean(formData._id);
    setIsSaving(true);
    try {
      const body = new FormData();
      body.append("school", school);
      body.append("section", activeTab);
      body.append("tag", formData.tag);
      body.append("title", formData.title);
      body.append("desc", formData.desc);
      body.append("sub", formData.sub);
      body.append("value", formData.value);
      body.append("unit", formData.unit);
      body.append("label", formData.label);
      body.append("order", String(formData.order || 0));
      if (imageFile) body.append("image", imageFile);
      // if editing and image was removed (had one before, now cleared), tell backend to clear it
      if (formData._id && !imageFile && !imagePreview) {
        body.append("removeImage", "true");
      }

      if (isEdit) {
        await api.put(`/academics/${formData._id}`, body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/academics", body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchEntries();
      closeModal();
      showToast(isEdit ? "Entry updated successfully" : "Entry added successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  function requestDelete(id) {
    setConfirmDeleteId(id);
  }

  async function confirmDelete() {
    const id = confirmDeleteId;
    if (!id) return;
    setConfirmDeleteId(null);
    setDeletingId(id);
    try {
      await api.delete(`/academics/${id}`);
      setEntries((prev) => prev.filter((e) => e._id !== id));
      showToast("Entry deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  }

  const isImageRequired = false;
  const activeTabMeta = TABS.find((t) => t.key === activeTab);
  const activeSchoolMeta = SCHOOLS.find((s) => s.value === school);

  return (
    <div className="bg-[#F5EFE8] min-h-screen">
      <div className="max-w-5xl mx-auto p-6 sm:p-8 space-y-7 animate-[fadeIn_0.4s_ease-out]">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ae1431]/10 border border-[#ae1431]/15">
            <Sparkles size={18} className="text-[#ae1431]" />
          </div>
          <div>
            <h2 className="font-display text-[24px] leading-tight text-[#2b2620]">
              Academics — Eram
            </h2>
            <p className="text-[13px] text-[#8a7f6f] font-rethink mt-1">
              Manage institutional benchmarks, student excellence, and civic stats for{" "}
              <span className="text-[#2b2620] font-medium">{activeSchoolMeta?.label}</span>.
            </p>
          </div>
        </div>

        {/* School selector */}
        <div>
          <p className="text-[10px] font-rethink font-semibold uppercase tracking-widest text-[#b5aa98] mb-2">
            School
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {SCHOOLS.map((s) => {
              const active = school === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => setSchool(s.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-rethink font-medium cursor-pointer border transition-all duration-200 ${
                    active
                      ? "bg-white border-[#2b2620] text-[#2b2620] shadow-[0_2px_8px_rgba(43,38,32,0.08)]"
                      : "bg-white/60 border-[#e3d6c3] text-[#8a7f6f] hover:border-[#2b2620]/30 hover:text-[#2b2620] hover:bg-white"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: s.dot }}
                  />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs + Add button row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-white border border-[#e3d6c3] rounded-full shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 cursor-pointer rounded-full text-[13px] font-rethink font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#ae1431] text-white shadow-sm"
                      : "text-[#8a7f6f] hover:text-[#2b2620] hover:bg-[#F5EFE8]"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#ae1431] hover:bg-[#9a1129] rounded-full text-[13px] font-rethink font-medium text-white shadow-[0_2px_10px_rgba(174,20,49,0.25)] hover:shadow-[0_4px_16px_rgba(174,20,49,0.32)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <Plus size={15} />
            <span>Add {activeTabMeta?.label.slice(0, -1)}</span>
          </button>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[#8a7f6f] text-sm font-rethink gap-2">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading...</span>
          </div>
        ) : listError ? (
          <div className="text-center py-20 rounded-2xl border border-[#ae1431]/20 bg-[#ae1431]/5">
            <p className="text-[#ae1431] text-sm font-rethink">{listError}</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 text-center py-20 border-2 border-dashed border-[#e3d6c3] rounded-3xl bg-white/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#e3d6c3]">
              {activeTabMeta && <activeTabMeta.icon size={20} className="text-[#b5aa98]" />}
            </div>
            <div>
              <p className="text-[#2b2620] text-sm font-rethink font-medium">
                No {activeTabMeta?.label.toLowerCase()} yet
              </p>
              <p className="text-[#8a7f6f] text-xs font-rethink mt-0.5">
                Add the first entry for {activeSchoolMeta?.label}.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 bg-white border border-[#e3d6c3] hover:border-[#ae1431]/40 rounded-full text-[12px] font-rethink font-medium text-[#2b2620] transition-colors duration-200 cursor-pointer"
            >
              <Plus size={13} />
              <span>Add {activeTabMeta?.label.slice(0, -1)}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="group bg-white border border-[#e3d6c3] hover:border-[#ae1431]/25 rounded-2xl p-5 flex gap-4 shadow-[0_1px_2px_rgba(43,38,32,0.04)] hover:shadow-[0_10px_28px_rgba(43,38,32,0.09)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* image thumbnail now shown for ANY section, not just excellence */}
                {entry.image && (
                  <img
                    src={entry.image}
                    alt={entry.title || entry.label || "entry image"}
                    className="w-16 h-16 rounded-xl object-cover object-center border border-[#e3d6c3] shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  {entry.tag && (
                    <span className="inline-block text-[9px] font-rethink font-semibold text-[#8b6f3f] bg-[#8b6f3f]/10 px-2 py-0.5 rounded-full border border-[#8b6f3f]/20 uppercase tracking-wide mb-2">
                      {entry.tag}
                    </span>
                  )}

                  {activeTab === "stat" ? (
                    <>
                      <p className="text-[#2b2620] font-display text-xl">
                        {entry.value}
                        <span className="text-[#8a7f6f] text-sm ml-0.5">{entry.unit}</span>
                      </p>
                      <p className="text-[12px] text-[#8a7f6f] font-rethink whitespace-pre-line mt-1 leading-relaxed">
                        {entry.label}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-[#2b2620] font-display text-[15px] truncate">{entry.title}</h3>
                      {entry.sub && <p className="text-[11px] text-[#8a7f6f] font-rethink mt-0.5">{entry.sub}</p>}
                      <p className="text-[12px] text-[#8a7f6f] font-rethink line-clamp-2 mt-1.5 leading-relaxed">
                        {entry.desc}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-1 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="p-1.5 rounded-lg text-[#8a7f6f] hover:text-[#8b6f3f] hover:bg-[#F5EFE8] transition-colors duration-200 cursor-pointer"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => requestDelete(entry._id)}
                    disabled={deletingId === entry._id}
                    className="p-1.5 rounded-lg text-[#8a7f6f] hover:text-[#ae1431] hover:bg-[#F5EFE8] transition-colors duration-200 cursor-pointer disabled:opacity-40"
                    title="Delete"
                  >
                    {deletingId === entry._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ─────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2620]/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-[#e3d6c3] rounded-3xl shadow-[0_20px_50px_rgba(43,38,32,0.18)] animate-[fadeIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 sm:px-7 py-5 border-b border-[#e3d6c3] sticky top-0 bg-white/95 backdrop-blur-sm z-10 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ae1431]/10">
                  {activeTabMeta && <activeTabMeta.icon size={16} className="text-[#ae1431]" />}
                </div>
                <div>
                  <h2 className="font-display text-lg text-[#2b2620] leading-tight">
                    {formData._id ? "Edit" : "Add"} {activeTabMeta?.label.slice(0, -1)}
                  </h2>
                  <p className="text-[11px] font-rethink text-[#8a7f6f]">{activeSchoolMeta?.label}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                disabled={isSaving}
                className="p-2 rounded-full text-[#8a7f6f] hover:text-[#2b2620] hover:bg-[#F5EFE8] transition-colors duration-200 cursor-pointer disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
              {/* ── Image upload — now shown for ALL 3 sections ─── */}
              <div>
                <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                  {activeTab === "excellence" ? "Student Photo" : "Image"}{" "}
                  {!isImageRequired && (
                    <span className="normal-case font-normal text-[#b5aa98]">(optional)</span>
                  )}
                </label>
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 shrink-0 rounded-2xl border-2 border-dashed border-[#e3d6c3] hover:border-[#ae1431]/40 bg-[#F5EFE8]/60 flex items-center justify-center overflow-hidden cursor-pointer transition-colors duration-200 relative group"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover object-center" />
                    ) : (
                      <ImageIcon size={20} className="text-[#b5aa98] group-hover:text-[#ae1431]/60" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F5EFE8] hover:bg-[#efe4d6] border border-[#e3d6c3] rounded-full text-[11px] font-rethink font-medium text-[#2b2620] transition-colors duration-200 cursor-pointer"
                      >
                        <Upload size={13} />
                        <span>Choose Photo</span>
                      </button>
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-3 py-2 rounded-full text-[11px] font-rethink text-[#8a7f6f] hover:text-[#ae1431] hover:bg-[#F5EFE8] transition-colors duration-200 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {errors.image && <p className="text-[10px] font-rethink text-[#ae1431] mt-1.5">{errors.image}</p>}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* ── Benchmark / Excellence: tag ─────────────── */}
              {(activeTab === "benchmark" || activeTab === "excellence") && (
                <div>
                  <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder={
                      activeTab === "benchmark" ? "e.g. Academic Record" : "e.g. National Level · Sports"
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border ${
                      errors.tag ? "border-[#ae1431]/60" : "border-[#e3d6c3]"
                    } focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink transition-colors duration-200`}
                  />
                  {errors.tag && <p className="text-[10px] font-rethink text-[#ae1431] mt-1">{errors.tag}</p>}
                </div>
              )}

              {/* ── Stat: tag (optional label prefix) ───────── */}
              {activeTab === "stat" && (
                <div>
                  <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                    Tag <span className="normal-case font-normal text-[#b5aa98]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="e.g. Civic Leadership"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border border-[#e3d6c3] focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink transition-colors duration-200"
                  />
                </div>
              )}

              {/* ── Benchmark: title / Excellence: student name ── */}
              {(activeTab === "benchmark" || activeTab === "excellence") && (
                <div>
                  <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                    {activeTab === "benchmark" ? "Title" : "Student Name"}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={activeTab === "benchmark" ? "e.g. 98% Pass Rate..." : "e.g. Diya Maryam"}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border ${
                      errors.title ? "border-[#ae1431]/60" : "border-[#e3d6c3]"
                    } focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink transition-colors duration-200`}
                  />
                  {errors.title && <p className="text-[10px] font-rethink text-[#ae1431] mt-1">{errors.title}</p>}
                </div>
              )}

              {/* ── Excellence: grade/sub ───────────────────── */}
              {activeTab === "excellence" && (
                <div>
                  <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                    Grade / Class
                  </label>
                  <input
                    type="text"
                    name="sub"
                    value={formData.sub}
                    onChange={handleChange}
                    placeholder="e.g. Grade 11"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border ${
                      errors.sub ? "border-[#ae1431]/60" : "border-[#e3d6c3]"
                    } focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink transition-colors duration-200`}
                  />
                  {errors.sub && <p className="text-[10px] font-rethink text-[#ae1431] mt-1">{errors.sub}</p>}
                </div>
              )}

              {/* ── Benchmark / Excellence: description ─────── */}
              {(activeTab === "benchmark" || activeTab === "excellence") && (
                <div>
                  <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                    {activeTab === "benchmark" ? "Description" : "Achievement"}
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    rows={3}
                    placeholder={
                      activeTab === "benchmark"
                        ? "Brief description..."
                        : "e.g. 🥇 1st Place — National Level Wushu Championship"
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border ${
                      errors.desc ? "border-[#ae1431]/60" : "border-[#e3d6c3]"
                    } focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink resize-none transition-colors duration-200`}
                  />
                  {errors.desc && <p className="text-[10px] font-rethink text-[#ae1431] mt-1">{errors.desc}</p>}
                </div>
              )}

              {/* ── Stat: value / unit / label ──────────────── */}
              {activeTab === "stat" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                        Value
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border ${
                          errors.value ? "border-[#ae1431]/60" : "border-[#e3d6c3]"
                        } focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink transition-colors duration-200`}
                      />
                      {errors.value && <p className="text-[10px] font-rethink text-[#ae1431] mt-1">{errors.value}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                        Unit
                      </label>
                      <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        placeholder="e.g. +"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border border-[#e3d6c3] focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                      Label
                    </label>
                    <textarea
                      name="label"
                      value={formData.label}
                      onChange={handleChange}
                      rows={2}
                      placeholder="e.g. Blood Donations Annually under NSS Program"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border ${
                        errors.label ? "border-[#ae1431]/60" : "border-[#e3d6c3]"
                      } focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] placeholder:text-[#b5aa98] text-sm font-rethink resize-none transition-colors duration-200`}
                    />
                    {errors.label && <p className="text-[10px] font-rethink text-[#ae1431] mt-1">{errors.label}</p>}
                  </div>
                </>
              )}

              {/* ── Order (all types) ───────────────────────── */}
              <div>
                <label className="block text-[10px] font-rethink font-semibold text-[#8a7f6f] uppercase tracking-widest mb-2">
                  Display Order <span className="normal-case font-normal text-[#b5aa98]">(lower shows first)</span>
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE8]/40 border border-[#e3d6c3] focus:bg-white focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-[#2b2620] text-sm font-rethink transition-colors duration-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e3d6c3]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-full text-[12px] font-rethink font-medium text-[#8a7f6f] hover:text-[#2b2620] hover:bg-[#F5EFE8] transition-colors duration-200 cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#ae1431] hover:bg-[#9a1129] rounded-full text-[12px] font-rethink font-medium text-white shadow-[0_2px_10px_rgba(174,20,49,0.25)] hover:shadow-[0_4px_16px_rgba(174,20,49,0.32)] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal (replaces window.confirm) ── */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#2b2620]/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="w-full max-w-sm bg-white border border-[#e3d6c3] rounded-2xl shadow-[0_20px_50px_rgba(43,38,32,0.18)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ae1431]/10 border border-[#ae1431]/15 mb-4">
              <Trash2 size={18} className="text-[#ae1431]" />
            </div>
            <h3 className="font-display text-lg text-[#2b2620] mb-1">Delete this entry?</h3>
            <p className="text-[13px] text-[#8a7f6f] font-rethink mb-5">
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2.5 rounded-full text-[12px] font-rethink font-medium text-[#8a7f6f] hover:text-[#2b2620] hover:bg-[#F5EFE8] transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-[#ae1431] hover:bg-[#9a1129] rounded-full text-[12px] font-rethink font-medium text-white shadow-[0_2px_10px_rgba(174,20,49,0.25)] transition-all duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast container (bottom-right) ──────────────────── */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => dismissToast(t.id)}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-[0_10px_30px_rgba(43,38,32,0.25)] cursor-pointer animate-[fadeIn_0.25s_ease-out] max-w-xs"
            style={{ backgroundColor: "#ae1431", color: "#ffffff" }}
          >
            {t.type === "error" ? (
              <AlertCircle size={16} className="shrink-0" />
            ) : (
              <CheckCircle2 size={16} className="shrink-0" />
            )}
            <span className="text-[13px] font-rethink font-medium leading-snug">{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}