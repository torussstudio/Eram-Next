// "use client";

// import { useRouter } from "next/navigation";
// import api from "@/lib/api";

// export default function LogoutButton() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout"); // clears backend cookie
//     } catch (err) {
//       console.error("Backend logout failed:", err);
//     }

//     await fetch("/admin/auth/logout", { method: "POST" }); // clears frontend cookie

//     router.replace("/login");
//     router.refresh();
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="mt-8 bg-red-600 text-white px-4 py-2 rounded"
//     >
//       Logout
//     </button>
//   );
// }
