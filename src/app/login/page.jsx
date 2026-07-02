"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;
      if (data.success) {
        const cookieRes = await fetch("/admin/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: data.token,
          }),
        });

        console.log(await cookieRes.json());

        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5EFE8]">
      {/* Left brand panel */}
      <div className="hidden lg:flex relative w-1/2 bg-[#ae1431] overflow-hidden flex-col justify-between p-12">
        {/* Ghost watermark */}
        <span className="absolute -left-10 top-1/2 -translate-y-1/2 select-none pointer-events-none font-[Playfair_Display] text-[260px] font-bold leading-none text-white/[0.06]">
          ERAM
        </span>

        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="education-1.svg"
            alt="ERAM"
            width={120}
            height={120}
            className="opacity-90"
          />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-[Playfair_Display] text-4xl leading-tight text-white mb-4">
            Building Foundations.
            <br />
            Shaping Futures.
          </h1>
          <p className="font-[Rethink_Sans] text-white/70 text-sm leading-relaxed">
            Admin access for managing admissions, academics, and institutional
            operations across the ERAM ecosystem.
          </p>
        </div>

        <p className="relative z-10 font-[Rethink_Sans] text-white/40 text-xs">
          © Eram Education {new Date().getFullYear()}
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm animate-[fadeIn_0.5s_ease-out]">
          {/* Mobile-only logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <Image
              src="education-1.svg"
              alt="ERAM"
              width={80}
              height={80}
              className="bg-[#ae1431] rounded p-1"
            />
            <span className="font-[Rethink_Sans] tracking-[0.2em] text-xs text-[#ae1431] uppercase">
              Eram Education
            </span>
          </div>

          <p className="font-[Rethink_Sans] tracking-[0.25em] text-xs text-[#ae1431] uppercase mb-2">
            Admin Portal
          </p>
          <h2 className="font-[Playfair_Display] text-3xl text-black mb-1">
            Welcome back
          </h2>
          <p className="font-[Rethink_Sans] text-sm text-black/50 mb-8">
            Sign in to continue to the dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-[Rethink_Sans] text-xs font-medium text-black/70 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@eram.edu.in"
                required
                autoComplete="email"
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm font-[Rethink_Sans] text-black placeholder:text-black/30 outline-none transition focus:border-[#ae1431] focus:ring-2 focus:ring-[#ae1431]/15"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-[Rethink_Sans] text-xs font-medium text-black/70 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 pr-12 text-sm font-[Rethink_Sans] text-black placeholder:text-black/30 outline-none transition focus:border-[#ae1431] focus:ring-2 focus:ring-[#ae1431]/15"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-[Rethink_Sans] text-black/40 hover:text-[#ae1431] transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-[Rethink_Sans] text-sm text-[#ae1431] bg-[#ae1431]/5 border border-[#ae1431]/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-black text-white font-[Rethink_Sans] text-sm font-medium rounded-lg py-3 transition hover:bg-[#ae1431] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
