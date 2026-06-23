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

          <a href="/admin/home">
            Home
          </a>

          <br />

          <a href="/admin/portal">
            parent-student portal
          </a>

          <br />

            <a href="/admin/institutions">
            Institutions
          </a>

          <br/>

            <a href="/admin/sports-arena">
            Sports Arena
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