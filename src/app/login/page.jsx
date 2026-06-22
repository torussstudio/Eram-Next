// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         router.push("/admin/dashboard");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md p-6 border rounded-lg"
//       >
//         <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-3 mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-3 mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit" className="w-full bg-black text-white p-3">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Unable to connect. Check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
      className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-5"
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGxpbmUgeDE9IjYwIiB5MT0iMCIgeDI9IjYwIiB5Mj0iNjAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48bGluZSB4MT0iMCIgeTE9IjYwIiB4Mj0iNjAiIHkyPSI2MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] bg-[size:60px_60px]" />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Brand row */}
        <div className="flex items-center gap-[10px] mb-9">
          <div className="w-9 h-9 rounded-[8px] bg-white flex items-center justify-content-center shrink-0 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#0a0a0a] tracking-wide leading-none">
              E
            </span>
          </div>
          <span className="text-[14px] font-medium text-white/50 tracking-[0.04em]">
            ERAM<span className="text-white/20 mx-1">·</span>Admin Portal
          </span>
        </div>

        {/* Heading block */}
        <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-white/30 mb-2">
          Secure Access
        </p>
        <h1 className="text-[26px] font-semibold text-white tracking-[-0.025em] leading-[1.15] mb-[5px]">
          Sign in to
          <br />
          your account
        </h1>
        <p className="text-[13px] text-white/30 font-normal mb-7 leading-relaxed">
          Authorised personnel only. All sessions are monitored.
        </p>

        {/* Error state */}
        <div
          className={`flex items-center gap-[6px] mb-3 text-[12px] text-red-400/80 min-h-[20px] transition-opacity duration-200 ${error ? "opacity-100" : "opacity-0"}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              d="M8 5v3.5M8 10.5v.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span>{error || "placeholder"}</span>
        </div>

        <form onSubmit={handleLogin} noValidate>
          {/* Email field */}
          <div className="mb-[14px]">
            <label
              htmlFor="email-inp"
              className="block text-[10.5px] font-medium tracking-[0.1em] uppercase text-white/30 mb-[7px]"
            >
              Email Address
            </label>
            <div className="relative">
              <svg
                className="absolute left-[13px] top-1/2 -translate-y-1/2 pointer-events-none text-white/20 transition-colors"
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1.5"
                  y="3.5"
                  width="13"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M1.5 5.5l6.5 4 6.5-4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              <input
                id="email-inp"
                type="email"
                placeholder="admin@eram.edu.in"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-[8px] pl-10 pr-[14px] py-[11px] text-[13.5px] text-white placeholder:text-white/[0.16] font-normal outline-none transition-all duration-200 focus:border-white/[0.28] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-[14px]">
            <label
              htmlFor="pw-inp"
              className="block text-[10.5px] font-medium tracking-[0.1em] uppercase text-white/30 mb-[7px]"
            >
              Password
            </label>
            <div className="relative">
              <svg
                className="absolute left-[13px] top-1/2 -translate-y-1/2 pointer-events-none text-white/20"
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="2.5"
                  y="7"
                  width="11"
                  height="7.5"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 7V5a3 3 0 016 0v2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="pw-inp"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-[8px] pl-10 pr-11 py-[11px] text-[13.5px] text-white placeholder:text-white/[0.16] font-normal outline-none transition-all duration-200 focus:border-white/[0.28] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-[11px] top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors p-1"
              >
                {showPassword ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M2 2l12 12"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between mb-[22px]">
            <label className="flex items-center gap-[7px] cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-[14px] h-[14px] accent-white cursor-pointer"
              />
              <span className="text-[12px] text-white/32">
                Keep me signed in
              </span>
            </label>
            <button
              type="button"
              className="text-[12px] text-white/32 hover:text-white/65 transition-colors bg-transparent border-none cursor-pointer p-0 font-[inherit]"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-[12.5px] px-4 bg-white hover:bg-[#e8e8e8] active:scale-[0.985] disabled:opacity-60 disabled:cursor-not-allowed rounded-[8px] text-[13.5px] font-semibold text-[#0a0a0a] tracking-[0.02em] flex items-center justify-center gap-2 transition-all duration-150 relative"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin w-[16px] h-[16px] text-[#0a0a0a]/40"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="28"
                    strokeDashoffset="10"
                  />
                </svg>
                Signing in…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign In
              </span>
            )}
          </button>
        </form>
    
        {/* Footer */}
        <div className="flex items-center justify-center gap-[6px] mt-5 text-[11.5px] text-white/[0.18]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2.5"
              y="7"
              width="11"
              height="7.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M5 7V5a3 3 0 016 0v2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span>SSL encrypted</span>
          <span className="text-white/10 mx-1">·</span>
          <span className="text-[10px] tracking-[0.08em] uppercase font-medium text-white/[0.12]">
            ERAM Education 2026
          </span>
        </div>
      </div>
    </div>
  );
}
