import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("ALL COOKIES:", request.cookies.getAll());
  const token = request.cookies.get("token")?.value;

  console.log("PATH:", request.nextUrl.pathname);
  console.log("TOKEN:", token);

  const { pathname } = request.nextUrl;

  if (pathname === "/admin/auth") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};