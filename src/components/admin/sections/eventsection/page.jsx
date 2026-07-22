"use client";
import { useEffect, useState } from "react";
import {
  Trash2,
  CalendarPlus,
  Pin,
  ImagePlus,
  X,
  Clock,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";

const CATEGORIES = [
  { id: "academic", label: "Academic", accent: "#8b6f3f" },
  { id: "sports", label: "Sports", accent: "#3f6b52" },
  { id: "cultural", label: "Cultural", accent: "#6b4f8b" },
  { id: "notice", label: "Notice", accent: "#ae1431" },
];

const TYPES = [
  { id: "notification", label: "Notification" },
  { id: "event", label: "Event" },
];

const INSTITUTIONS = [
  { id: "general", label: "All Institutions" },
  { id: "ease", label: "EASE" },
  { id: "mmhss", label: "MMHSS" },
  { id: "mmite", label: "MMITE" },
  { id: "mmps", label: "MMPS" },
  { id: "amlp", label: "AMLP" },
];

const catMeta = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

export default function AdminEventsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic");
  const [type, setType] = useState("notification");
  const [institution, setInstitution] = useState("general");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tag, setTag] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    api
      .get("/events")
      .then(({ data }) => setItems(data))
      .catch((err) => console.error("Failed to fetch events:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("academic");
    setType("notification");
    setInstitution("general");
    setDate("");
    setTime("");
    setTag("");
    setIsPinned(false);
    setImageFile(null);
    setImagePreview("");
  };

  const handleTypeChange = (val) => {
    setType(val);
    if (val === "notification") {
      setImageFile(null);
      setImagePreview("");
      setTime("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await api.post("/events/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { image: data.image, publicId: data.publicId };
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) return;

    setSaving(true);
    try {
      let imageUrl, publicId;

      if (type === "event" && imageFile) {
        setUploadingImage(true);
        const uploaded = await uploadImage();
        imageUrl = uploaded.image;
        publicId = uploaded.publicId;
        setUploadingImage(false);
      }

      await api.post("/events", {
        title,
        description,
        category,
        type,
        institution,
        date,
        tag,
        isPinned,
        ...(type === "event" ? { image: imageUrl, publicId, time } : {}),
      });
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Could not create event. Try again.");
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  const togglePin = async (item) => {
    try {
      await api.put(`/events/${item._id}`, { isPinned: !item.isPinned });
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Could not update pin status.");
    }
  };

  const confirmDelete = (id) => setDeleteTarget(id);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/events/${deleteTarget}`);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category === cat.id),
  }));

  const visibleGroups =
    activeTab === "all" ? grouped : grouped.filter((g) => g.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-[#e3d6c3] pb-6">
          <span className="font-rethink text-xs uppercase tracking-[0.2em] text-[#ae1431]">
            Admin · Content
          </span>
          <h1 className="font-display text-3xl text-[#2b2620]">
            Events &amp; Notifications
          </h1>
          <p className="font-rethink text-sm text-[#8a7f6f]">
            Publish updates, circulars and event announcements across institutions.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* ---------------- Create form ---------------- */}
          <form
            onSubmit={handleCreate}
            className="h-fit space-y-5 rounded-2xl border border-[#e3d6c3] bg-white p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)] lg:sticky lg:top-8"
          >
            <h2 className="font-display text-lg text-[#2b2620]">New entry</h2>

            {/* Type segmented toggle */}
            <div>
              <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                Type
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-xl bg-[#F5EFE8] p-1">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTypeChange(t.id)}
                    className={`cursor-pointer rounded-lg py-2 font-rethink text-sm transition-all ${
                      type === t.id
                        ? "bg-[#ae1431] text-white shadow-sm"
                        : "text-[#8a7f6f] hover:text-[#2b2620]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

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
                placeholder="Inter-Institutional Sports Meet 2026"
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
                placeholder="Short description shown on the events page"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                  Institution
                </label>
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                >
                  {INSTITUTIONS.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`grid gap-3 ${type === "event" ? "grid-cols-2" : "grid-cols-1"}`}>
              <div>
                <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                />
              </div>

              {type === "event" && (
                <div>
                  <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                    Time <span className="text-[#b5aa98] normal-case">(optional)</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                  />
                </div>
              )}
            </div>

            {/* Image upload */}
            {type === "event" && (
              <div>
                <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                  Event image <span className="text-[#b5aa98] normal-case">(max 2MB)</span>
                </label>

                {!imagePreview ? (
                  <label
                    htmlFor="eventImage"
                    className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#d9c9b0] bg-[#F5EFE8]/60 px-3 py-7 text-[#8a7f6f] transition-colors hover:border-[#ae1431]/40 hover:text-[#ae1431]"
                  >
                    <ImagePlus size={18} />
                    <span className="font-rethink text-sm">Click to upload image</span>
                    <input
                      id="eventImage"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative mt-1.5 w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-36 w-full rounded-lg border border-[#e3d6c3] object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-[#ae1431] p-1 text-white shadow-sm transition-transform hover:scale-105"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                Tag <span className="text-[#b5aa98] normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#e3d6c3] bg-white px-3 py-2.5 font-rethink text-sm text-[#2b2620] placeholder:text-[#b5aa98] focus:border-[#ae1431] focus:outline-none focus:ring-2 focus:ring-[#ae1431]/10"
                placeholder="ADMISSIONS, RESULTS…"
              />
            </div>

            <label
              htmlFor="isPinned"
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#e3d6c3] bg-[#F5EFE8]/50 px-3 py-2.5"
            >
              <input
                id="isPinned"
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="h-4 w-4 accent-[#ae1431]"
              />
              <span className="font-rethink text-sm text-[#2b2620]">
                Pin this to the top
              </span>
            </label>

            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#ae1431] px-4 py-3 font-rethink text-sm text-white transition-colors hover:bg-[#c21938] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploadingImage || saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CalendarPlus size={16} />
              )}
              {uploadingImage
                ? "Uploading image…"
                : saving
                ? "Saving…"
                : "Create entry"}
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
                  Loading entries…
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
                          Nothing here yet.
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {group.items.map((item) => {
                            const meta = catMeta(item.category);
                            return (
                              <div
                                key={item._id}
                                className="group relative overflow-hidden rounded-2xl border border-[#e3d6c3] bg-white shadow-[0_1px_2px_rgba(43,38,32,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(43,38,32,0.08)]"
                              >
                                {/* Actions */}
                                <div className="absolute right-2.5 top-2.5 z-10 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                                  <button
                                    onClick={() => togglePin(item)}
                                    className={`cursor-pointer rounded-full p-1.5 backdrop-blur-sm transition-colors ${
                                      item.isPinned
                                        ? "bg-amber-400 text-white"
                                        : "bg-white/90 text-[#8a7f6f] hover:text-amber-500"
                                    }`}
                                    aria-label="Pin"
                                    title={item.isPinned ? "Unpin" : "Pin"}
                                  >
                                    <Pin size={13} />
                                  </button>
                                  <button
                                    onClick={() => confirmDelete(item._id)}
                                    className="cursor-pointer rounded-full bg-white/90 p-1.5 text-[#8a7f6f] backdrop-blur-sm transition-colors hover:text-[#ae1431]"
                                    aria-label="Delete"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>

                                {item.isPinned && (
                                  <span className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 font-rethink text-[10px] uppercase tracking-wide text-white">
                                    <Pin size={9} /> Pinned
                                  </span>
                                )}

                                {item.type === "event" && item.image ? (
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="h-32 w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-32 w-full items-center justify-center bg-[#F5EFE8]">
                                    <span
                                      className="font-display text-xs uppercase tracking-wide"
                                      style={{ color: meta.accent }}
                                    >
                                      {item.type}
                                    </span>
                                  </div>
                                )}

                                <div className="p-4">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className="rounded-full px-2 py-0.5 font-rethink text-[10px] uppercase tracking-wide text-white"
                                      style={{ backgroundColor: meta.accent }}
                                    >
                                      {meta.label}
                                    </span>
                                    <span className="rounded-full border border-[#e3d6c3] px-2 py-0.5 font-rethink text-[10px] uppercase tracking-wide text-[#8a7f6f]">
                                      {item.institution}
                                    </span>
                                  </div>

                                  <h3 className="mt-2 line-clamp-1 font-display text-sm text-[#2b2620]">
                                    {item.title}
                                  </h3>

                                  <div className="mt-1.5 flex items-center gap-3 font-rethink text-xs text-[#8a7f6f]">
                                    <span className="flex items-center gap-1">
                                      <CalendarPlus size={11} />
                                      {new Date(item.date).toLocaleDateString()}
                                    </span>
                                    {item.type === "event" && item.time && (
                                      <span className="flex items-center gap-1">
                                        <Clock size={11} />
                                        {item.time}
                                      </span>
                                    )}
                                  </div>
                                </div>
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
              Delete this entry?
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
    </div>
  );
}
