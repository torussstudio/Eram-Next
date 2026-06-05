"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-rethink text-[11px] tracking-[0.28em] text-[#ae1431] uppercase mb-4">
          Something went wrong
        </p>
        <h2 className="font-display text-[36px] leading-[1.15] text-[#111] mb-4">
          An error occurred
        </h2>
        <p className="font-rethink text-[14px] leading-[1.75] text-[#555] mb-8">
          We encountered an unexpected issue. Please try again or return to the
          home page.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="font-rethink bg-[#ae1431] text-white px-6 py-3 rounded-[10px] text-[13px] tracking-[0.04em] cursor-pointer hover:bg-black transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="font-rethink border border-[#111]/20 text-[#111] px-6 py-3 rounded-[10px] text-[13px] tracking-[0.04em] hover:bg-[#111] hover:text-white transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
