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
  { id: 'general', label: 'General' },
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'social', label: 'Social' },
  { id: 'academic', label: 'Academic' },
];

// Max dimensions / quality for the compressed image sent to the backend.
// Tweak these if you want smaller/larger uploads.
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const JPEG_QUALITY = 0.8;

async function compressImage(file) {
  // Skip compression for non-image files or already-tiny files (<150KB)
  if (!file.type.startsWith('image/') || file.size < 150 * 1024) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);

    let { width, height } = bitmap;
    const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
    );

    if (!blob) return file; // toBlob failed, fall back

    // Rename with .jpg since we re-encoded as JPEG
    const newName = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], newName, { type: 'image/jpeg' });
  } catch (err) {
    console.error('Image compression failed, using original file:', err);
    return file;
  }
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  // upload form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [type, setType] = useState('general');
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
    setCompressing(true);

    let uploadFile = file;
    try {
      uploadFile = await compressImage(file);
    } finally {
      setCompressing(false);
    }

    const formData = new FormData();
    formData.append('image', uploadFile);
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
      <h1 className="text-2xl font-display text-[#ae1431]">Gallery Manager</h1>
      <p className="mt-1  text-white">Upload photos and manage the master gallery.</p>

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="mt-6 grid gap-4 rounded-lg border border-white bg-black p-5 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className=" font-rethink uppercase tracking-wide text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white px-3 py-2 "
            placeholder="e.g. Annual Sports Meet"
          />
        </div>

        <div>
          <label className=" font-rethink uppercase tracking-wide text-white">School</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 "
          >
            {CATEGORIES.map((c) => (
              <option className='bg-black text-white' key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className=" font-rethink uppercase tracking-wide text-white">Event Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 "
          >
            {TYPES.map((t) => (
              <option className='bg-black text-white' key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">Image</label>
          <input
            id="gallery-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="mt-1 w-full "
          />
          {file && (
            <p className="mt-1 text-xs text-white/60">
              Selected: {(file.size / 1024).toFixed(0)} KB — will be auto-compressed before upload
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="sm:col-span-2 flex items-center justify-center cursor-pointer gap-2 rounded-md bg-[#ae1431] px-4 py-2  font-rethink text-white disabled:opacity-50"
        >
          <UploadCloud size={16} />
          {compressing ? 'Compressing…' : uploading ? 'Uploading…' : 'Upload Image'}
        </button>
      </form>

      {/* Grouped table/list, sorted by category */}
      <div className="mt-10 space-y-8">
        {loading ? (
          <p className="text-white">Loading gallery…</p>
        ) : (
          grouped.map((group) => (
            <div key={group.id}>
              <h2 className="mb-3 font-display uppercase tracking-wide text-[#ae1431]">
                {group.label} <span className="text-white">({group.items.length})</span>
              </h2>

              {group.items.length === 0 ? (
                <p className=" text-white">No images yet.</p>
              ) : (
                <div className="overflow-hidden rounded-md border border-black/10">
                  <table className="w-full text-left ">
                    <thead className="bg-black/[0.03]  uppercase tracking-wide text-white">
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
                          <td className="px-4 py-2 capitalize text-white">{item.type}</td>
                          <td className="px-4 py-2 text-white">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-white cursor-pointer transition-colors hover:text-[#ae1431]"
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