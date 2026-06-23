import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js route handlers under /admin/auth to proceed without checks
  if (pathname.startsWith("/admin/auth")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  let isValid = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "my_super_secret_key_123"
      );
      await jwtVerify(token, secret);
      isValid = true;
    } catch (err) {
      console.error("JWT validation failed in middleware:", err);
      isValid = false;
    }
  }

  // Protect admin paths
  if (pathname.startsWith("/admin")) {
    if (!isValid) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      if (token) {
        response.cookies.delete("token");
      }
      return response;
    }
  }

  // Redirect authenticated admin users away from login page
  if (pathname === "/login" && isValid) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};