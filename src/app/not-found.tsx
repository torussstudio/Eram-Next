import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | ERAM Education",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-rethink text-[11px] tracking-[0.28em] text-[#ae1431] uppercase mb-4">
          404 — Not Found
        </p>
        <h1 className="font-display text-[48px] leading-[1.1] text-[#111] mb-4">
          Page not found.
        </h1>
        <p className="font-rethink text-[14px] leading-[1.75] text-[#555] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Navigate back to explore our institutions.
        </p>
        <Link
          href="/"
          className="inline-flex font-rethink bg-[#ae1431] text-white px-8 py-3 rounded-[10px] text-[13px] tracking-[0.04em] hover:bg-black transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
