'use client';
import { useEffect, useState } from 'react';
import { Trash2, UploadCloud, FileText } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = [
  { id: 'prospectus', label: 'Prospectus' },
  { id: 'forms', label: 'Forms' },
  { id: 'circulars', label: 'Circulars' },
  { id: 'policies', label: 'Policies' },
];

const INSTITUTIONS = [
  { id: 'general', label: 'General' },
  { id: 'ease', label: 'EASE' },
  { id: 'mmhss', label: 'MMHSS' },
  { id: 'mmite', label: 'MMITE' },
  { id: 'mmps', label: 'MMPS' },
  { id: 'amlp', label: 'AMLP' },
];

export default function AdminDownloadsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // upload form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('prospectus');
  const [institution, setInstitution] = useState('general');
  const [file, setFile] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    api.get('/downloads')
      .then(({ data }) => setItems(data))
      .catch((err) => console.error('Failed to fetch downloads:', err))
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
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('institution', institution);

    try {
      await api.post('/downloads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTitle('');
      setDescription('');
      setFile(null);
      document.getElementById('download-file-input').value = '';
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this document?')) return;
    try {
      await api.delete(`/downloads/${id}`);
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
      <h1 className="text-2xl font-display text-[#ae1431]">Downloads Manager</h1>
      <p className="mt-1 text-white">Upload documents and manage the resources library.</p>

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="mt-6 grid gap-4 rounded-lg border border-white bg-black p-5 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
            placeholder="e.g. Admission Prospectus 2026-27"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white resize-none"
            placeholder="Short description shown on the downloads page"
          />
        </div>

        <div>
          <label className="font-rethink uppercase tracking-wide text-white">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
          >
            {CATEGORIES.map((c) => (
              <option className="bg-black text-white" key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-rethink uppercase tracking-wide text-white">Institution</label>
          <select
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
          >
            {INSTITUTIONS.map((i) => (
              <option className="bg-black text-white" key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="font-rethink uppercase tracking-wide text-white">PDF File</label>
          <input
            id="download-file-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="mt-1 w-full text-white"
          />
          {file && (
            <p className="mt-1 text-xs text-white/60">
              Selected: {(file.size / 1024).toFixed(0)} KB
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="sm:col-span-2 flex items-center justify-center cursor-pointer gap-2 rounded-md bg-[#ae1431] px-4 py-2 font-rethink text-white disabled:opacity-50"
        >
          <UploadCloud size={16} />
          {uploading ? 'Uploading…' : 'Upload Document'}
        </button>
      </form>

      {/* Grouped table/list, sorted by category */}
      <div className="mt-10 space-y-8">
        {loading ? (
          <p className="text-white">Loading documents…</p>
        ) : (
          grouped.map((group) => (
            <div key={group.id}>
              <h2 className="mb-3 font-display uppercase tracking-wide text-[#ae1431]">
                {group.label} <span className="text-white">({group.items.length})</span>
              </h2>

              {group.items.length === 0 ? (
                <p className="text-white">No documents yet.</p>
              ) : (
                <div className="overflow-hidden rounded-md border border-white/10">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.03] uppercase tracking-wide text-white">
                      <tr>
                        <th className="px-4 py-2">File</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Institution</th>
                        <th className="px-4 py-2">Uploaded</th>
                        <th className="px-4 py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr key={item._id} className="border-t border-white/5">
                          <td className="px-4 py-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded bg-white/5 text-[#ae1431]">
                              <FileText size={20} />
                            </div>
                          </td>
                          <td className="px-4 py-2 text-white">{item.title}</td>
                          <td className="px-4 py-2 capitalize text-white">{item.institution}</td>
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