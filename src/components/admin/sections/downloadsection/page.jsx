"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Trash2,
  UploadCloud,
  FileText,
  FileImage,
  FileSpreadsheet,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import api from "@/lib/api";

// ── Custom select — replaces native <select> so we control the
// highlight color instead of the browser's default blue. ──────
function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const activeLabel = options.find((o) => o.id === value)?.label || "";

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10 ${
          open ? "border-[#ae1431]" : "border-[#e3d6c3] hover:border-[#ae1431]/40"
        }`}
      >
        <span className="truncate">{activeLabel}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-[#8a7f6f] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-[#e3d6c3] bg-white shadow-[0_8px_24px_rgba(43,38,32,0.12)]">
          {options.map((opt) => {
            const active = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-3.5 py-2.5 text-left font-rethink text-sm transition-colors cursor-pointer ${
                  active ? "text-white" : "text-[#2b2620] hover:bg-[#F5EFE8]"
                }`}
                style={active ? { backgroundColor: "#ae1431" } : undefined}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const CATEGORIES = [
  { id: "prospectus", label: "Prospectus", accent: "#8b6f3f" },
  { id: "forms", label: "Forms", accent: "#3f6b52" },
  { id: "circulars", label: "Circulars", accent: "#ae1431" },
  { id: "policies", label: "Policies", accent: "#6b4f8b" },
];

const INSTITUTIONS = [
  { id: "general", label: "General" },
  { id: "ease", label: "EASE" },
  { id: "mmhss", label: "MMHSS" },
  { id: "mmite", label: "MMITE" },
  { id: "mmps", label: "MMPS" },
  { id: "amlp", label: "AMLP" },
];

const catMeta = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

const fileIconFor = (name = "") => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["png", "jpg", "jpeg", "webp"].includes(ext)) return FileImage;
  if (["xls", "xlsx"].includes(ext)) return FileSpreadsheet;
  return FileText;
};

export default function AdminDownloadsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isDragging, setIsDragging] = useState(false);

  // upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("prospectus");
  const [institution, setInstitution] = useState("general");
  const [file, setFile] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const fetchItems = () => {
    setLoading(true);
    api
      .get("/downloads")
      .then(({ data }) => setItems(data))
      .catch((err) => console.error("Failed to fetch downloads:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("institution", institution);

    try {
      await api.post("/downloads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setFile(null);
      document.getElementById("download-file-input").value = "";
      fetchItems();
      showToast("Document uploaded successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Upload failed. Try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/downloads/${deleteTarget}`);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget));
      showToast("Document deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Delete failed. Try again.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category === cat.id),
  }));

  const visibleGroups =
    activeTab === "all" ? grouped : grouped.filter((g) => g.id === activeTab);

  const SelectedFileIcon = file ? fileIconFor(file.name) : null;

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-[#e3d6c3] pb-6">
          <span className="font-rethink text-xs uppercase tracking-[0.2em] text-[#ae1431]">
            Admin · Content
          </span>
          <h1 className="font-display text-3xl text-[#2b2620]">
            Downloads
          </h1>
          <p className="font-rethink text-sm text-[#8a7f6f]">
            Upload documents and manage the resources library.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* ---------------- Upload form ---------------- */}
          <form
            onSubmit={handleUpload}
            className="h-fit space-y-5 rounded-2xl border border-[#e3d6c3] bg-white p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)] lg:sticky lg:top-8"
          >
            <h2 className="font-display text-lg text-[#2b2620]">Upload document</h2>

            <div>
              <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] placeholder:text-[#b5aa98] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                placeholder="Admission Prospectus 2026-27"
              />
            </div>

            <div>
              <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="mt-1.5 w-full resize-none rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] placeholder:text-[#b5aa98] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                placeholder="Short description shown on the downloads page"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                  Category
                </label>
                <div className="mt-1.5">
                  <CustomSelect value={category} onChange={setCategory} options={CATEGORIES} />
                </div>
              </div>

              <div>
                <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                  Institution
                </label>
                <div className="mt-1.5">
                  <CustomSelect value={institution} onChange={setInstitution} options={INSTITUTIONS} />
                </div>
              </div>
            </div>

            {/* ── File dropzone — modernized ─────────────────── */}
            <div>
              <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                Document file
              </label>

              {!file ? (
                <label
                  htmlFor="download-file-input"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-all duration-200 ${
                    isDragging
                      ? "border-[#ae1431] bg-[#ae1431]/[0.06] scale-[1.01]"
                      : "border-[#d9c9b0] bg-gradient-to-b from-[#F5EFE8]/80 to-[#F5EFE8]/30 hover:border-[#ae1431]/50 hover:bg-[#ae1431]/[0.03]"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-200 ${
                      isDragging
                        ? "border-[#ae1431]/30 bg-[#ae1431]/10"
                        : "border-[#e3d6c3] bg-white"
                    }`}
                  >
                    <UploadCloud
                      size={20}
                      className={isDragging ? "text-[#ae1431]" : "text-[#8a7f6f]"}
                    />
                  </div>
                  <div>
                    <span className="font-rethink text-sm font-medium text-[#2b2620]">
                      {isDragging ? "Drop it here" : "Click to upload or drag & drop"}
                    </span>
                    <p className="mt-0.5 font-rethink text-[11px] text-[#b5aa98]">
                      PDF, DOC, XLS, or image — max recommended 10MB
                    </p>
                  </div>
                  <input
                    id="download-file-input"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    required
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="mt-1.5 flex items-center gap-3 rounded-2xl border border-[#e3d6c3] bg-white p-3.5 shadow-[0_1px_2px_rgba(43,38,32,0.04)]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ae1431]/10">
                    <SelectedFileIcon size={19} className="text-[#ae1431]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-rethink text-sm font-medium text-[#2b2620]">
                      {file.name}
                    </p>
                    <p className="font-rethink text-[11px] text-[#b5aa98]">
                      {(file.size / 1024).toFixed(0)} KB — ready to upload
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      const input = document.getElementById("download-file-input");
                      if (input) input.value = "";
                    }}
                    className="shrink-0 cursor-pointer rounded-full p-1.5 text-[#b5aa98] transition-colors hover:bg-[#F5EFE8] hover:text-[#ae1431]"
                    aria-label="Remove file"
                  >
                    <X size={15} />
                  </button>
                  <input
                    id="download-file-input"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#ae1431] px-4 py-3 font-rethink text-sm text-white transition-colors hover:bg-[#c21938] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <UploadCloud size={16} />
              )}
              {uploading ? "Uploading…" : "Upload document"}
            </button>
          </form>

          {/* ---------------- List ---------------- */}
          <div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`cursor-pointer rounded-full border px-4 py-1.5 font-rethink text-sm transition-colors ${
                  activeTab === "all"
                    ? "border-[#ae1431] bg-[#ae1431] text-white"
                    : "border-[#e3d6c3] bg-white text-[#8a7f6f] hover:border-[#ae1431]/40 hover:text-[#2b2620]"
                }`}
              >
                All <span className="opacity-70">({items.length})</span>
              </button>
              {grouped.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveTab(g.id)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 font-rethink text-sm transition-colors ${
                    activeTab === g.id
                      ? "border-transparent text-white"
                      : "border-[#e3d6c3] bg-white text-[#8a7f6f] hover:text-[#2b2620]"
                  }`}
                  style={activeTab === g.id ? { backgroundColor: g.accent } : {}}
                >
                  {g.label} <span className="opacity-70">({g.items.length})</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-6 space-y-8">
              {loading ? (
                <div className="flex items-center gap-2 py-16 justify-center font-rethink text-sm text-[#8a7f6f]">
                  <Loader2 size={16} className="animate-spin" />
                  Loading documents…
                </div>
              ) : (
                visibleGroups.map((group) => {
                  if (activeTab === "all" && group.items.length === 0) return null;
                  return (
                    <div key={group.id}>
                      {activeTab === "all" && (
                        <div className="mb-3 flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: group.accent }}
                          />
                          <h2 className="font-display text-base text-[#2b2620]">
                            {group.label}
                          </h2>
                          <span className="font-rethink text-xs text-[#b5aa98]">
                            {group.items.length}
                          </span>
                        </div>
                      )}

                      {group.items.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#e3d6c3] bg-white/50 px-4 py-8 text-center font-rethink text-sm text-[#b5aa98]">
                          No documents yet.
                        </div>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {group.items.map((item) => {
                            const meta = catMeta(item.category);
                            const Icon = fileIconFor(item.title);
                            return (
                              <div
                                key={item._id}
                                className="group flex items-start gap-3 rounded-2xl border border-[#e3d6c3] bg-white p-4 shadow-[0_1px_2px_rgba(43,38,32,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(43,38,32,0.08)]"
                              >
                                <div
                                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                                  style={{ backgroundColor: `${meta.accent}14` }}
                                >
                                  <Icon size={19} style={{ color: meta.accent }} />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h3 className="line-clamp-1 font-display text-sm text-[#2b2620]">
                                    {item.title}
                                  </h3>
                                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                    <span className="rounded-full border border-[#e3d6c3] px-2 py-0.5 font-rethink text-[10px] uppercase tracking-wide text-[#8a7f6f]">
                                      {item.institution}
                                    </span>
                                    <span className="font-rethink text-[11px] text-[#b5aa98]">
                                      {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => confirmDelete(item._id)}
                                  className="cursor-pointer rounded-full p-1.5 text-[#b5aa98] opacity-0 transition-all hover:text-[#ae1431] group-hover:opacity-100"
                                  aria-label="Delete"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2620]/50 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-2xl border border-[#e3d6c3] bg-white p-6 shadow-xl">
            <h3 className="font-display text-lg text-[#2b2620]">
              Delete this document?
            </h3>
            <p className="mt-1.5 font-rethink text-sm text-[#8a7f6f]">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="cursor-pointer rounded-lg border border-[#e3d6c3] px-4 py-2 font-rethink text-sm uppercase tracking-wide text-[#8a7f6f] transition-colors hover:border-[#8a7f6f]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer rounded-lg bg-[#ae1431] px-4 py-2 font-rethink text-sm uppercase tracking-wide text-white transition-colors hover:bg-[#c21938]"
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