// "use client";
// import { useEffect, useState } from "react";
// import { Trash2, UploadCloud, FileText } from "lucide-react";
// import api from "@/lib/api";

// const CATEGORIES = [
//   { id: "prospectus", label: "Prospectus" },
//   { id: "forms", label: "Forms" },
//   { id: "circulars", label: "Circulars" },
//   { id: "policies", label: "Policies" },
// ];

// const INSTITUTIONS = [
//   { id: "general", label: "General" },
//   { id: "ease", label: "EASE" },
//   { id: "mmhss", label: "MMHSS" },
//   { id: "mmite", label: "MMITE" },
//   { id: "mmps", label: "MMPS" },
//   { id: "amlp", label: "AMLP" },
// ];

// export default function AdminDownloadsPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   // upload form state
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("prospectus");
//   const [institution, setInstitution] = useState("general");
//   const [file, setFile] = useState(null);

//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const fetchItems = () => {
//     setLoading(true);
//     api
//       .get("/downloads")
//       .then(({ data }) => setItems(data))
//       .catch((err) => console.error("Failed to fetch downloads:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file || !title || !description) return;

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("institution", institution);

//     try {
//       await api.post("/downloads", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setTitle("");
//       setDescription("");
//       setFile(null);
//       document.getElementById("download-file-input").value = "";
//       fetchItems();
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed. Try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

// const confirmDelete = (id) => {
//   setDeleteTarget(id); // opens the modal
// };

// const handleDelete = async () => {
//   if (!deleteTarget) return;
//   try {
//     await api.delete(`/downloads/${deleteTarget}`);
//     setItems((prev) => prev.filter((i) => i._id !== deleteTarget));
//   } catch (err) {
//     console.error(err);
//     alert("Delete failed.");
//   } finally {
//     setDeleteTarget(null); // close modal after action
//   }
// };

//   // group items by category for the sorted list view
//   const grouped = CATEGORIES.map((cat) => ({
//     ...cat,
//     items: items.filter((i) => i.category === cat.id),
//   }));

//   return (
//     <div className="mx-auto max-w-5xl px-6 py-10">
//       <h1 className="text-2xl font-display text-[#ae1431]">
//         Downloads Manager
//       </h1>
//       <p className="mt-1 text-white">
//         Upload documents and manage the resources library.
//       </p>

//       {/* Upload form */}
//       <form
//         onSubmit={handleUpload}
//         className="mt-6 grid gap-4 rounded-lg border border-white bg-black p-5 sm:grid-cols-2"
//       >
//         <div className="sm:col-span-2">
//           <label className="font-rethink uppercase tracking-wide text-white">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
//             placeholder="e.g. Admission Prospectus 2026-27"
//           />
//         </div>

//         <div className="sm:col-span-2">
//           <label className="font-rethink uppercase tracking-wide text-white">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             rows={3}
//             className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white resize-none"
//             placeholder="Short description shown on the downloads page"
//           />
//         </div>

//         <div>
//           <label className="font-rethink uppercase tracking-wide text-white">
//             Category
//           </label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
//           >
//             {CATEGORIES.map((c) => (
//               <option className="bg-black text-white" key={c.id} value={c.id}>
//                 {c.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="font-rethink uppercase tracking-wide text-white">
//             Institution
//           </label>
//           <select
//             value={institution}
//             onChange={(e) => setInstitution(e.target.value)}
//             className="mt-1 w-full rounded-md border border-white px-3 py-2 text-white"
//           >
//             {INSTITUTIONS.map((i) => (
//               <option className="bg-black text-white" key={i.id} value={i.id}>
//                 {i.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="sm:col-span-2">
//           <label className="font-rethink uppercase tracking-wide text-white">
//             Document File
//           </label>
//           <input
//             id="download-file-input"
//             type="file"
//             accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
//             onChange={(e) => setFile(e.target.files?.[0] ?? null)}
//             required
//             className="mt-1 w-full text-white"
//           />
//           {file && (
//             <p className="mt-1 text-white/60">
//               Selected: {(file.size / 1024).toFixed(0)} KB
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={uploading}
//           className="sm:col-span-2 flex items-center justify-center cursor-pointer gap-2 rounded-md bg-[#ae1431] px-4 py-2 font-rethink text-white disabled:opacity-50"
//         >
//           <UploadCloud size={16} />
//           {uploading ? "Uploading…" : "Upload Document"}
//         </button>
//       </form>

//       {/* Grouped table/list, sorted by category */}
//       <div className="mt-10 space-y-8">
//         {loading ? (
//           <p className="text-white">Loading documents…</p>
//         ) : (
//           grouped.map((group) => (
//             <div key={group.id}>
//               <h2 className="mb-3 font-display uppercase tracking-wide text-[#ae1431]">
//                 {group.label}{" "}
//                 <span className="text-white">({group.items.length})</span>
//               </h2>

//               {group.items.length === 0 ? (
//                 <p className="text-white">No documents yet.</p>
//               ) : (
//                 <div className="overflow-hidden rounded-md border border-white/10">
//                   <table className="w-full text-left">
//                     <thead className="bg-white/[0.03] uppercase tracking-wide text-white">
//                       <tr>
//                         <th className="px-4 py-2">File</th>
//                         <th className="px-4 py-2">Title</th>
//                         <th className="px-4 py-2">Institution</th>
//                         <th className="px-4 py-2">Uploaded</th>
//                         <th className="px-4 py-2 text-right">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {group.items.map((item) => (
//                         <tr key={item._id} className="border-t border-white/5">
//                           <td className="px-4 py-2">
//                             <div className="flex h-12 w-12 items-center justify-center rounded bg-white/5 text-[#ae1431]">
//                               <FileText size={20} />
//                             </div>
//                           </td>
//                           <td className="px-4 py-2 text-white">{item.title}</td>
//                           <td className="px-4 py-2 capitalize text-white">
//                             {item.institution}
//                           </td>
//                           <td className="px-4 py-2 text-white">
//                             {new Date(item.createdAt).toLocaleDateString()}
//                           </td>
//                           <td className="px-4 py-2 text-right">
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
//        {deleteTarget && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
//           <div className="w-full max-w-sm rounded-md border border-white/10 bg-black p-6">
//             <h3 className="font-display text-lg text-white">
//               Delete this document?
//             </h3>
//             <p className="mt-2 text-sm text-white/60">
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
//                 className="rounded-md bg-[#ae1431] px-4 py-2 cursor-pointer font-rethink  uppercase tracking-wide text-white hover:bg-[#c21938]"
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


"use client";
import { useEffect, useState } from "react";
import {
  Trash2,
  UploadCloud,
  FileText,
  FileImage,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";

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

  // upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("prospectus");
  const [institution, setInstitution] = useState("general");
  const [file, setFile] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

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
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
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

            {/* File dropzone */}
            <div>
              <label className="font-rethink text-xs uppercase tracking-wide text-[#8a7f6f]">
                Document file
              </label>

              <label
                htmlFor="download-file-input"
                className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#d9c9b0] bg-[#F5EFE8]/60 px-3 py-7 text-[#8a7f6f] transition-colors hover:border-[#ae1431]/40 hover:text-[#ae1431]"
              >
                <UploadCloud size={18} />
                <span className="font-rethink text-sm">
                  {file ? file.name : "Click to select a file"}
                </span>
                {file && (
                  <span className="font-rethink text-xs text-[#b5aa98]">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                )}
                <input
                  id="download-file-input"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  required
                  className="hidden"
                />
              </label>
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
    </div>
  );
}