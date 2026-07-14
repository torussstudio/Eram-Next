// 'use client';
// import { useEffect, useState } from 'react';
// import { Trash2, UploadCloud } from 'lucide-react';
// import api from '@/lib/api';

// const CATEGORIES = [
//  { id: 'ease', label: 'EASE' },
//   { id: 'mmhss', label: 'MMHSS' },
//   { id: 'mmps', label: 'MMPS' },
//   { id: 'amlp', label: 'AMLP' },
//   { id: 'mmite', label: 'MMITE' },
//    { id: 'trust', label: 'TRUST' },
// ];

// const TYPES = [
//   { id: 'general', label: 'General' },
//   { id: 'sports', label: 'Sports' },
//   { id: 'cultural', label: 'Cultural' },
//   { id: 'social', label: 'Social' },
//   { id: 'academic', label: 'Academic' },
// ];

// const MAX_WIDTH = 1920;
// const MAX_HEIGHT = 1920;
// const JPEG_QUALITY = 0.8;

// async function compressImage(file) {
//   // Skip compression for non-image files or already-tiny files (<150KB)
//   if (!file.type.startsWith('image/') || file.size < 150 * 1024) {
//     return file;
//   }

//   try {
//     const bitmap = await createImageBitmap(file);

//     let { width, height } = bitmap;
//     const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
//     width = Math.round(width * scale);
//     height = Math.round(height * scale);

//     const canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(bitmap, 0, 0, width, height);

//     const blob = await new Promise((resolve) =>
//       canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
//     );

//     if (!blob) return file; // toBlob failed, fall back

//     // Rename with .jpg since we re-encoded as JPEG
//     const newName = file.name.replace(/\.[^.]+$/, '') + '.jpg';
//     return new File([blob], newName, { type: 'image/jpeg' });
//   } catch (err) {
//     console.error('Image compression failed, using original file:', err);
//     return file;
//   }
// }

// export default function AdminGalleryPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [compressing, setCompressing] = useState(false);

//   // upload form state
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('trust');
//   const [type, setType] = useState('general');
//   const [file, setFile] = useState(null);

//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const fetchItems = () => {
//     setLoading(true);
//     api.get('/gallery')
//       .then(({ data }) => setItems(data))
//       .catch((err) => console.error('Failed to fetch gallery items:', err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file || !title) return;

//     setUploading(true);
//     setCompressing(true);

//     let uploadFile = file;
//     try {
//       uploadFile = await compressImage(file);
//     } finally {
//       setCompressing(false);
//     }

//     const formData = new FormData();
//     formData.append('image', uploadFile);
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('type', type);

//     try {
//       await api.post('/gallery', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setTitle('');
//       setFile(null);
//       document.getElementById('gallery-file-input').value = '';
//       fetchItems();
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed. Try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

// const confirmDelete = (id) => {
//   setDeleteTarget(id);
// };

// const handleDelete = async () => {
//   if (!deleteTarget) return;
//   try {
//     await api.delete(`/gallery/${deleteTarget}`);
//     setItems((prev) => prev.filter((i) => i._id !== deleteTarget));
//   } catch (err) {
//     console.error(err);
//     alert('Delete failed.');
//   } finally {
//     setDeleteTarget(null);
//   }
// };

//   // group items by category for the sorted list view
//   const grouped = CATEGORIES.map((cat) => ({
//     ...cat,
//     items: items.filter((i) => i.category === cat.id),
//   }));

//   return (
//     <div className="mx-auto w-full min-w-0 max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
//       <h1 className="text-xl sm:text-2xl font-display text-[#ae1431]">Gallery Manager</h1>
//       <p className="mt-1 t sm:text-base text-white">Upload photos and manage the master gallery.</p>

//       {/* Upload form */}
//       <form
//         onSubmit={handleUpload}
//         className="mt-6 grid gap-4 rounded-lg border border-white bg-black p-4 sm:p-5 grid-cols-1 sm:grid-cols-2"
//       >
//         <div className="sm:col-span-2">
//           <label className=" font-rethink uppercase tracking-wide text-white">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="mt-1 w-full rounded-md border border-white px-3 py-2  sm:text-base"
//             placeholder="e.g. Annual Sports Meet"
//           />
//         </div>

//         <div>
//           <label className=" font-rethink uppercase tracking-wide text-white">School</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="mt-1 w-full rounded-md border border-white px-3 py-2  sm:text-base"
//           >
//             {CATEGORIES.map((c) => (
//               <option className='bg-black text-white' key={c.id} value={c.id}>{c.label}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className=" font-rethink uppercase tracking-wide text-white">Event Type</label>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="mt-1 w-full rounded-md border border-white px-3 py-2  sm:text-base"
//           >
//             {TYPES.map((t) => (
//               <option className='bg-black text-white' key={t.id} value={t.id}>{t.label}</option>
//             ))}
//           </select>
//         </div>

//         <div className="sm:col-span-2">
//           <label className=" font-rethink uppercase tracking-wide text-white">Image</label>
//           <input
//             id="gallery-file-input"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files?.[0] ?? null)}
//             required
//             className="mt-1 w-full "
//           />
//           {file && (
//             <p className="mt-1  text-white/60 break-words">
//               Selected: {(file.size / 1024).toFixed(0)} KB — will be auto-compressed before upload
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={uploading}
//           className="sm:col-span-2 flex items-center justify-center cursor-pointer gap-2 rounded-md bg-[#ae1431] px-4 py-2  sm:text-base font-rethink text-white disabled:opacity-50"
//         >
//           <UploadCloud size={16} />
//           {compressing ? 'Compressing…' : uploading ? 'Uploading…' : 'Upload Image'}
//         </button>
//       </form>

//       {/* Grouped table/list, sorted by category */}
//       <div className="mt-10 space-y-8">
//         {loading ? (
//           <p className="text-white">Loading gallery…</p>
//         ) : (
//           grouped.map((group) => (
//             <div key={group.id}>
//               <h2 className="mb-3 font-display sm:text-base uppercase tracking-wide text-[#ae1431]">
//                 {group.label} <span className="text-white">({group.items.length})</span>
//               </h2>

//               {group.items.length === 0 ? (
//                 <p className=" sm:text-base text-white">No images yet.</p>
//               ) : (
//                 <div className="overflow-x-auto rounded-md border border-black/10">
//                   <table className="w-full min-w-[560px] text-left  sm:text-sm">
//                     <thead className="bg-black/[0.03] uppercase tracking-wide text-white">
//                       <tr>
//                         <th className="px-3 sm:px-4 py-2">Preview</th>
//                         <th className="px-3 sm:px-4 py-2">Title</th>
//                         <th className="px-3 sm:px-4 py-2">Type</th>
//                         <th className="px-3 sm:px-4 py-2">Uploaded</th>
//                         <th className="px-3 sm:px-4 py-2 text-right">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {group.items.map((item) => (
//                         <tr key={item._id} className="border-t border-black/5">
//                           <td className="px-3 sm:px-4 py-2">
//                             <img src={item.image} alt={item.title} className="h-10 w-14 sm:h-12 sm:w-16 rounded object-cover" />
//                           </td>
//                           <td className="px-3 sm:px-4 py-2">{item.title}</td>
//                           <td className="px-3 sm:px-4 py-2 capitalize text-white">{item.type}</td>
//                           <td className="px-3 sm:px-4 py-2 text-white whitespace-nowrap">
//                             {new Date(item.createdAt).toLocaleDateString()}
//                           </td>
//                           <td className="px-3 sm:px-4 py-2 text-right">
//                             <button
//                               onClick={() => confirmDelete(item._id)}
//                               className="text-white cursor-pointer transition-colors hover:text-[#ae1431]"
//                               aria-label="Delete"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//       {deleteTarget && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
//           <div className="w-full max-w-sm rounded-md border border-white/10 bg-black p-6">
//             <h3 className="font-display text-lg text-white">
//               Delete this image?
//             </h3>
//             <p className="mt-2 text-white/60">
//               This action cannot be undone.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteTarget(null)}
//                 className="rounded-md border border-white/20 px-4 py-2 cursor-pointer font-rethink uppercase tracking-wide text-white hover:border-white/40"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="rounded-md bg-[#ae1431] px-4 py-2 cursor-pointer font-rethink uppercase tracking-wide text-white hover:bg-[#c21938]"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { Trash2, UploadCloud, ImageOff } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = [
  { id: 'ease', label: 'EASE' },
  { id: 'mmhss', label: 'MMHSS' },
  { id: 'mmps', label: 'MMPS' },
  { id: 'amlp', label: 'AMLP' },
  { id: 'mmite', label: 'MMITE' },
  { id: 'trust', label: 'TRUST' },
];

const CATEGORY_COLORS = {
  ease: '#8b6f3f',
  mmhss: '#3f6b52',
  mmps: '#6b4f8b',
  amlp: '#ae1431',
  mmite: '#a15c2e',
  trust: '#3f5f8b',
};

const TYPES = [
  { id: 'general', label: 'General' },
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'social', label: 'Social' },
  { id: 'academic', label: 'Academic' },
];

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
  const [category, setCategory] = useState('trust');
  const [type, setType] = useState('general');
  const [file, setFile] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  // browse filter state
  const [activeTab, setActiveTab] = useState('all');

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

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/gallery/${deleteTarget}`);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget));
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
    } finally {
      setDeleteTarget(null);
    }
  };

  // counts per category, for tab badges
  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = items.filter((i) => i.category === cat.id).length;
    return acc;
  }, {});

  const visibleItems =
    activeTab === 'all' ? items : items.filter((i) => i.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-display text-[#2b2620]">Gallery Manager</h1>
        <p className="mt-1 text-sm sm:text-base font-rethink text-[#8a7f6f]">
          Upload photos and manage the master gallery.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          {/* Upload form — sticky left card */}
          <form
            onSubmit={handleUpload}
            className="lg:sticky lg:top-8 rounded-xl border border-[#e3d6c3] bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(43,38,32,0.04)]"
          >
            <h2 className="font-display text-lg text-[#2b2620]">Upload Image</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f]">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Annual Sports Meet"
                  className="mt-1.5 w-full rounded-md border border-[#e3d6c3] bg-white px-3 py-2 text-sm font-rethink text-[#2b2620] placeholder:text-[#b5aa98] outline-none focus:border-[#ae1431] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f]">
                  School
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {CATEGORIES.map((c) => {
                    const active = category === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={`rounded-md border px-2 py-1.5 text-xs font-rethink font-medium transition-colors ${
                          active
                            ? 'border-transparent text-white'
                            : 'border-[#e3d6c3] text-[#8a7f6f] hover:border-[#ae1431]/40 hover:text-[#2b2620]'
                        }`}
                        style={active ? { backgroundColor: CATEGORY_COLORS[c.id] } : undefined}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f]">
                  Event Type
                </label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {TYPES.map((t) => {
                    const active = type === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-rethink font-medium transition-colors ${
                          active
                            ? 'border-[#ae1431] bg-[#ae1431] text-white'
                            : 'border-[#e3d6c3] text-[#8a7f6f] hover:border-[#ae1431]/40 hover:text-[#2b2620]'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-rethink font-medium uppercase tracking-wide text-[#8a7f6f]">
                  Image
                </label>
                <label
                  htmlFor="gallery-file-input"
                  className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-[#e3d6c3] bg-[#F5EFE8]/60 px-4 py-6 text-center transition-colors hover:border-[#ae1431]/40"
                >
                  <UploadCloud size={20} className="text-[#8a7f6f]" />
                  <span className="font-rethink text-sm text-[#2b2620] break-all">
                    {file ? file.name : 'Click to select an image'}
                  </span>
                  {file && (
                    <span className="font-rethink text-xs text-[#8a7f6f]">
                      {(file.size / 1024).toFixed(0)} KB — will be auto-compressed
                    </span>
                  )}
                </label>
                <input
                  id="gallery-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  required
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ae1431] px-4 py-2.5 text-sm font-rethink font-medium text-white transition-colors hover:bg-[#9a1129] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <UploadCloud size={16} />
                {compressing ? 'Compressing…' : uploading ? 'Uploading…' : 'Upload Image'}
              </button>
            </div>
          </form>

          {/* Browse — tabs + card grid */}
          <div>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none]">
              <button
                onClick={() => setActiveTab('all')}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-rethink font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'border-[#2b2620] bg-[#2b2620] text-white'
                    : 'border-[#e3d6c3] bg-white text-[#8a7f6f] hover:border-[#2b2620]/30 hover:text-[#2b2620]'
                }`}
              >
                All <span className="opacity-70">({items.length})</span>
              </button>
              {CATEGORIES.map((c) => {
                const active = activeTab === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveTab(c.id)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-rethink font-medium transition-colors ${
                      active
                        ? 'border-transparent text-white'
                        : 'border-[#e3d6c3] bg-white text-[#8a7f6f] hover:text-[#2b2620]'
                    }`}
                    style={
                      active
                        ? { backgroundColor: CATEGORY_COLORS[c.id] }
                        : { borderColor: '#e3d6c3' }
                    }
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: active ? '#fff' : CATEGORY_COLORS[c.id] }}
                    />
                    {c.label} <span className="opacity-70">({counts[c.id]})</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              {loading ? (
                <p className="font-rethink text-sm text-[#8a7f6f]">Loading gallery…</p>
              ) : visibleItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#e3d6c3] bg-white/50 py-16 text-center">
                  <ImageOff size={22} className="text-[#b5aa98]" />
                  <p className="font-rethink text-sm text-[#8a7f6f]">No images in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {visibleItems.map((item) => (
                    <div
                      key={item._id}
                      className="group overflow-hidden rounded-xl border border-[#e3d6c3] bg-white shadow-[0_1px_2px_rgba(43,38,32,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(43,38,32,0.08)]"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-[#F5EFE8]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                        <button
                          onClick={() => confirmDelete(item._id)}
                          aria-label="Delete"
                          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[#8a7f6f] opacity-0 shadow-sm transition-all hover:bg-white hover:text-[#ae1431] group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                        <span
                          className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-rethink font-semibold uppercase tracking-wide text-white"
                          style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="p-3.5">
                        <p className="font-rethink text-sm font-medium text-[#2b2620] truncate">
                          {item.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="rounded-full border border-[#e3d6c3] px-2 py-0.5 text-[10px] font-rethink capitalize text-[#8a7f6f]">
                            {item.type}
                          </span>
                          <span className="text-[11px] font-rethink text-[#8a7f6f]">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2620]/50 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-xl border border-[#e3d6c3] bg-white p-6 shadow-[0_8px_24px_rgba(43,38,32,0.12)]">
            <h3 className="font-display text-lg text-[#2b2620]">Delete this image?</h3>
            <p className="mt-2 font-rethink text-sm text-[#8a7f6f]">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-md border border-[#e3d6c3] px-4 py-2 text-xs font-rethink font-medium uppercase tracking-wide text-[#2b2620] transition-colors hover:border-[#8a7f6f]"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-[#ae1431] px-4 py-2 text-xs font-rethink font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#9a1129]"
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