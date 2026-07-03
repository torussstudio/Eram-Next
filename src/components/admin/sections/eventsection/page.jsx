"use client";
import { useEffect, useState } from "react";
import { Trash2, CalendarPlus, Pin, ImagePlus, X } from "lucide-react";
import api from "@/lib/api";

const CATEGORIES = [
  { id: "academic", label: "Academic" },
  { id: "sports", label: "Sports" },
  { id: "cultural", label: "Cultural" },
  { id: "notice", label: "Notice" },
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

export default function AdminEventsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic");
  const [type, setType] = useState("notification");
  const [institution, setInstitution] = useState("general");
  const [date, setDate] = useState("");
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
        ...(type === "event" ? { image: imageUrl, publicId } : {}),
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

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-display text-[#ae1431]">
        Events & Notifications Manager
      </h1>
      <p className="mt-1 text-white">
        Create and manage events, notifications, and circulars.
      </p>

      {/* Create form */}
      <form
        onSubmit={handleCreate}
        className="mt-6 grid gap-4 rounded-lg border border-white bg-black p-5 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
            placeholder="e.g. Inter-Institutional Sports Meet 2026"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white resize-none"
            placeholder="Short description shown on the events page"
          />
        </div>

        <div>
          <label className="font-rethink uppercase tracking-wide text-white">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
          >
            {CATEGORIES.map((c) => (
              <option className="bg-black text-white" key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-rethink uppercase tracking-wide text-white">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
          >
            {TYPES.map((t) => (
              <option className="bg-black text-white" key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-rethink uppercase tracking-wide text-white">
            Institution
          </label>
          <select
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
          >
            {INSTITUTIONS.map((i) => (
              <option className="bg-black text-white" key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-rethink uppercase tracking-wide text-white">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
          />
        </div>

        {/* Image upload — only for "event" type */}
        {type === "event" && (
          <div className="sm:col-span-2">
            <label className="font-rethink uppercase tracking-wide text-white">
              Event Image{" "}
              <span className="text-white/40 normal-case">(max 2MB)</span>
            </label>

            {!imagePreview ? (
              <label
                htmlFor="eventImage"
                className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-white/40 px-3 py-6 text-white/60 hover:border-white/70 hover:text-white"
              >
                <ImagePlus size={18} />
                <span className="font-rethink">
                  Click to upload image
                </span>
                <input
                  id="eventImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative mt-1 w-full max-w-xs">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-md border border-white/20 object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-[#ae1431] p-1 text-white"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">
            Tag{" "}
            <span className="text-white/40 normal-case">
              (optional, e.g. ADMISSIONS, RESULTS)
            </span>
          </label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
            placeholder="e.g. FINANCE"
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            id="isPinned"
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="h-4 w-4"
          />
          <label
            htmlFor="isPinned"
            className="font-rethink uppercase tracking-wide text-white"
          >
            Pin this item
          </label>
        </div>

        <button
          type="submit"
          disabled={saving || uploadingImage}
          className="sm:col-span-2 flex items-center justify-center cursor-pointer gap-2 rounded-md bg-[#ae1431] px-4 py-2 font-rethink text-white disabled:opacity-50"
        >
          <CalendarPlus size={16} />
          {uploadingImage
            ? "Uploading image…"
            : saving
            ? "Saving…"
            : "Create Event"}
        </button>
      </form>

      {/* Grouped list */}
      <div className="mt-10 space-y-8">
        {loading ? (
          <p className="text-white">Loading events…</p>
        ) : (
          grouped.map((group) => (
            <div key={group.id}>
              <h2 className="mb-3 font-display uppercase tracking-wide text-[#ae1431]">
                {group.label}{" "}
                <span className="text-white">({group.items.length})</span>
              </h2>

              {group.items.length === 0 ? (
                <p className="text-white">No items yet.</p>
              ) : (
                <div className="overflow-hidden rounded-md border border-white/10">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.03] uppercase tracking-wide text-white">
                      <tr>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Institution</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr key={item._id} className="border-t border-white/5">
                          <td className="px-4 py-2">
                            {item.type === "event" && item.image ? (
                              <img
                                src={item.image}
                                alt=""
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <span className="text-white/20">—</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-white">{item.title}</td>
                          <td className="px-4 py-2 capitalize text-white">
                            {item.type}
                          </td>
                          <td className="px-4 py-2 capitalize text-white">
                            {item.institution}
                          </td>
                          <td className="px-4 py-2 text-white">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => togglePin(item)}
                                className={`cursor-pointer transition-colors ${
                                  item.isPinned
                                    ? "text-amber-400"
                                    : "text-white hover:text-amber-400"
                                }`}
                                aria-label="Pin"
                                title={item.isPinned ? "Unpin" : "Pin"}
                              >
                                <Pin size={16} />
                              </button>
                              <button
                                onClick={() => confirmDelete(item._id)}
                                className="text-white cursor-pointer transition-colors hover:text-[#ae1431]"
                                aria-label="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
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

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-md border border-white/10 bg-black p-6">
            <h3 className="font-display text-lg text-white">
              Delete this event?
            </h3>
            <p className="mt-2  text-white/60">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-md border border-white/20 px-4 py-2 cursor-pointer font-rethink  uppercase tracking-wide text-white hover:border-white/40"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-[#ae1431] px-4 py-2 cursor-pointer font-rethink  uppercase tracking-wide text-white hover:bg-[#c21938]"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
