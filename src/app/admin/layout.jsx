import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}) {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          ERAM Admin
        </h2>

        <nav className="space-y-4">
          <a href="/admin/dashboard">
            Dashboard
          </a>

          <br />

          <a href="/admin/admissions">
            Admissions
          </a>

          <br />

          <a href="/admin/contacts">
            Contacts
          </a>

          <br />

          <a href="/admin/gallery">
            Gallery
          </a>
        </nav>
        <LogoutButton />
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}