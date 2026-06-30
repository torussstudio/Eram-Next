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