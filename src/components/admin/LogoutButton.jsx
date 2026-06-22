
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(
      "http://localhost:5000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-8 bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}