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
  { value: "mmhss", label: "MMHSS Palakkad" },
  { value: "mmps", label: "MMPS Palakkad" },
  { value: "amlp", label: "AMLP School" },
  { value: "mmite", label: "MMITE Palakkad" },
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

      if (formData._id) {
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
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, submit: "Something went wrong. Please try again." }));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/academics/${id}`);
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

 const isImageRequired = false;

  return (
    <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
      <div>
        <h2 className="font-display text-lg text-zinc-100 uppercase tracking-wider">
          Academics — {schoolLabel || school}
        </h2>
        <p className="text-[11px] text-zinc-500 font-rethink mt-0.5">
          Manage institutional benchmarks, student excellence, and civic stats
        </p>
      </div>

      {/* School selector */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl w-fit">
        {SCHOOLS.map((s) => (
          <button
            key={s.value}
            onClick={() => setSchool(s.value)}
            className={`px-3.5 py-1.5 rounded-lg text-[11px] transition-[color,background-color] duration-200 ${
              school === s.value
                ? "bg-zinc-900 text-[#c5a880] border border-zinc-800"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] transition-[color,background-color] duration-200 ${
                activeTab === tab.key
                  ? "bg-zinc-900 text-[#c5a880] border border-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Add button */}
      <div className="flex justify-end">
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#ae1431]/10 hover:bg-[#ae1431]/20 border border-[#ae1431]/30 rounded-xl text-[11px] text-[#ae1431] hover:text-[#F5EFE8] transition-[color,background-color,border-color] duration-200 cursor-pointer"
        >
          <Plus size={13} />
          <span>Add {TABS.find((t) => t.key === activeTab)?.label.slice(0, -1)}</span>
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-zinc-500 text-sm gap-2">
          <Loader2 size={16} className="animate-spin" />
          <span>Loading...</span>
        </div>
      ) : listError ? (
        <p className="text-center text-[#ae1431] text-sm py-16">{listError}</p>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm font-rethink">
            No {TABS.find((t) => t.key === activeTab)?.label.toLowerCase()} added yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-zinc-900/40 border border-[#c5a880]/10 hover:border-[#c5a880]/30 rounded-2xl p-5 flex gap-4 transition-colors duration-200"
            >
              {/* image thumbnail now shown for ANY section, not just excellence */}
              {entry.image && (
                <img
                  src={entry.image}
                  alt={entry.title || entry.label || "entry image"}
                  className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                {entry.tag && (
                  <span className="inline-block text-[9px] text-[#c5a880] bg-[#c5a880]/5 px-2 py-0.5 rounded border border-[#c5a880]/15 uppercase mb-2">
                    {entry.tag}
                  </span>
                )}

                {activeTab === "stat" ? (
                  <>
                    <p className="text-zinc-200 font-display text-lg">
                      {entry.value}
                      <span className="text-zinc-500 text-sm">{entry.unit}</span>
                    </p>
                    <p className="text-[12px] text-zinc-400 font-rethink whitespace-pre-line mt-1">
                      {entry.label}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-zinc-200 font-display truncate">{entry.title}</h3>
                    {entry.sub && <p className="text-[11px] text-zinc-500 font-rethink">{entry.sub}</p>}
                    <p className="text-[12px] text-zinc-400 font-rethink line-clamp-2 mt-1">{entry.desc}</p>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(entry)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-[#c5a880] hover:bg-zinc-900 transition-colors duration-200 cursor-pointer"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  disabled={deletingId === entry._id}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-[#ae1431] hover:bg-zinc-900 transition-colors duration-200 cursor-pointer disabled:opacity-40"
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

      {/* ── Add / Edit Modal ─────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-950 border border-[#c5a880]/15 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900 sticky top-0 bg-zinc-950 z-10">
              <div>
                <h2 className="font-display text-lg text-zinc-100 uppercase tracking-wider">
                  {formData._id ? "Edit" : "Add"} {TABS.find((t) => t.key === activeTab)?.label.slice(0, -1)}
                </h2>
              </div>
              <button
                onClick={closeModal}
                disabled={isSaving}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors duration-200 cursor-pointer disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* ── Image upload — now shown for ALL 3 sections ─── */}
              <div>
                <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                  {activeTab === "excellence" ? "Student Photo" : "Image"}{" "}
                  {!isImageRequired && (
                    <span className="normal-case text-zinc-600">(optional)</span>
                  )}
                </label>
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 shrink-0 rounded-xl border border-dashed border-[#c5a880]/30 hover:border-[#c5a880]/60 bg-zinc-900/50 flex items-center justify-center overflow-hidden cursor-pointer transition-colors duration-200 relative group"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-zinc-600 group-hover:text-[#c5a880]/60" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[11px] text-zinc-300 transition-colors duration-200 cursor-pointer"
                      >
                        <Upload size={13} />
                        <span>Choose Photo</span>
                      </button>
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-3 py-2 rounded-lg text-[11px] text-zinc-500 hover:text-[#ae1431] hover:bg-zinc-900 transition-colors duration-200 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {errors.image && <p className="text-[10px] text-[#ae1431] mt-1.5">{errors.image}</p>}
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
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
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
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border ${
                      errors.tag ? "border-[#ae1431]/60" : "border-zinc-800"
                    } focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm transition-colors duration-200`}
                  />
                  {errors.tag && <p className="text-[10px] text-[#ae1431] mt-1">{errors.tag}</p>}
                </div>
              )}

              {/* ── Stat: tag (optional label prefix) ───────── */}
              {activeTab === "stat" && (
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                    Tag <span className="normal-case text-zinc-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="e.g. Civic Leadership"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm transition-colors duration-200"
                  />
                </div>
              )}

              {/* ── Benchmark: title / Excellence: student name ── */}
              {(activeTab === "benchmark" || activeTab === "excellence") && (
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                    {activeTab === "benchmark" ? "Title" : "Student Name"}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={activeTab === "benchmark" ? "e.g. 98% Pass Rate..." : "e.g. Diya Maryam"}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border ${
                      errors.title ? "border-[#ae1431]/60" : "border-zinc-800"
                    } focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm transition-colors duration-200`}
                  />
                  {errors.title && <p className="text-[10px] text-[#ae1431] mt-1">{errors.title}</p>}
                </div>
              )}

              {/* ── Excellence: grade/sub ───────────────────── */}
              {activeTab === "excellence" && (
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                    Grade / Class
                  </label>
                  <input
                    type="text"
                    name="sub"
                    value={formData.sub}
                    onChange={handleChange}
                    placeholder="e.g. Grade 11"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border ${
                      errors.sub ? "border-[#ae1431]/60" : "border-zinc-800"
                    } focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm transition-colors duration-200`}
                  />
                  {errors.sub && <p className="text-[10px] text-[#ae1431] mt-1">{errors.sub}</p>}
                </div>
              )}

              {/* ── Benchmark / Excellence: description ─────── */}
              {(activeTab === "benchmark" || activeTab === "excellence") && (
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
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
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border ${
                      errors.desc ? "border-[#ae1431]/60" : "border-zinc-800"
                    } focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm resize-none transition-colors duration-200`}
                  />
                  {errors.desc && <p className="text-[10px] text-[#ae1431] mt-1">{errors.desc}</p>}
                </div>
              )}

              {/* ── Stat: value / unit / label ──────────────── */}
              {activeTab === "stat" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                        Value
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border ${
                          errors.value ? "border-[#ae1431]/60" : "border-zinc-800"
                        } focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm transition-colors duration-200`}
                      />
                      {errors.value && <p className="text-[10px] text-[#ae1431] mt-1">{errors.value}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                        Unit
                      </label>
                      <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        placeholder="e.g. +"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                      Label
                    </label>
                    <textarea
                      name="label"
                      value={formData.label}
                      onChange={handleChange}
                      rows={2}
                      placeholder="e.g. Blood Donations Annually under NSS Program"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border ${
                        errors.label ? "border-[#ae1431]/60" : "border-zinc-800"
                      } focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 placeholder:text-zinc-600 text-sm resize-none transition-colors duration-200`}
                    />
                    {errors.label && <p className="text-[10px] text-[#ae1431] mt-1">{errors.label}</p>}
                  </div>
                </>
              )}

              {/* ── Order (all types) ───────────────────────── */}
              <div>
                <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                  Display Order <span className="normal-case text-zinc-600">(lower shows first)</span>
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-zinc-200 text-sm transition-colors duration-200"
                />
              </div>

              {errors.submit && <p className="text-[11px] text-[#ae1431] text-center">{errors.submit}</p>}

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl text-[12px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors duration-200 cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#ae1431] hover:bg-[#8f0f27] rounded-xl text-[12px] text-white transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
    </div>
  );
}