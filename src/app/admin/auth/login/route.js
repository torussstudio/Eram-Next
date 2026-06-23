import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("AUTH ROUTE HIT");

  const { token } = await req.json();

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    success: true,
  });
}