"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/constants/homeData";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { startPageTransition } from "@/lib/pageTransition";

interface InstitutionItem {
  title: string;
  image: string;
  path: string;
}

const institutions: InstitutionItem[] = [
  {
    title: "EASE (CBSE)",
    image: "/images/ease.avif",
    path: "https://ease.edu.in/",
  },
  { title: "MMHSS (Hr. Sec)", image: "/images/mmhss.avif", path: "/mmhss" },
  { title: "MMPS (HS)", image: "/images/mmps.webp", path: "/mmps" },
  { title: "AMLP (LP)", image: "/images/amlp.avif", path: "/amlp" },
  { title: "MMITE (D. El. Edc)", image: "/images/mmite.webp", path: "/mmite" },
];

/* ── Institutions Dropdown ──────────────────────────────────────── */
interface DropdownProps {
  isHome: boolean;
  isActive: boolean;
  onItemClick: (path: string) => void;
}

function InstitutionsDropdown({
  isHome,
  isActive,
  onItemClick,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const T = "250ms cubic-bezier(0.4,0,0.2,1)";
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
     <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          color: "#111111",
          transition: `color ${T}`,
        }}
        className={`relative pb-[5px] text-[0.92rem] lg:text-[0.97rem] xl:text-[1rem] uppercase tracking-[0.04em] cursor-pointer whitespace-nowrap flex items-center gap-[5px] transition-all duration-300 ${
          isActive ? "font-bold" : "font-normal"
        }`}
      >
        INSTITUTIONS
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transition: "transform 250ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M2 4.5L6 8l4-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            backgroundColor: isHome ? "#F5EFE8" : "#ae1431",
            transform: isActive ? "scaleX(1)" : "scaleX(0)",
            opacity: isActive ? 1 : 0,
            transformOrigin: "left center",
            transition: `transform 260ms cubic-bezier(0.4,0,0.2,1), opacity 260ms cubic-bezier(0.4,0,0.2,1), background-color ${T}`,
          }}
          className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full will-change-transform"
        />
      </button>

      <div
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open
            ? "translateY(0px) scale(1)"
            : "translateY(-8px) scale(0.97)",
          transition:
            "opacity 220ms cubic-bezier(0.4,0,0.2,1), transform 220ms cubic-bezier(0.4,0,0.2,1)",
          transformOrigin: "top center",
        }}
        className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-black/[0.06] overflow-hidden z-[200]"
      >
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rotate-45 border-l border-t border-black/[0.06]" />
        <div className="p-2">
          {institutions.map((inst) => {
            const isCurrentInstitution =
              !inst.path.startsWith("http") && pathname === inst.path;

            return (
              <button
                key={inst.title}
                onClick={() => {
                  setOpen(false);
                  onItemClick(inst.path);
                }}
                className={`
  w-full flex items-center gap-3 px-3 py-[9px]
  rounded-[12px]
  text-left group
  transition-all duration-200
  ${isCurrentInstitution ? "bg-[#F5EFE8]" : "hover:bg-[#F5EFE8]"}
`}
              >
                <div className="relative w-[46px] h-[34px] rounded-[8px] overflow-hidden shrink-0 bg-black/5">
                  <Image
                    src={inst.image}
                    alt={inst.title}
                    fill
                    sizes="46px"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span
                  className={`
    text-[0.85rem]
    ${isCurrentInstitution ? "font-display" : ""}
    tracking-[0.02em]
    flex-1
    transition-colors duration-200
    cursor-pointer
    ${isCurrentInstitution ? "text-[#ae1431]" : "text-[#111]"}
  `}
                >
                  {inst.title}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={`
  shrink-0
  transition-colors duration-150
  ${
    isCurrentInstitution
      ? "text-[#ae1431]"
      : "text-[#aaa] group-hover:text-[#ae1431]"
  }
`}
                >
                  <path
                    d="M3 7h8M7.5 4l3.5 3-3.5 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Main Navbar ────────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileInstitutionsOpen, setMobileInstitutionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();
  const smoothScrollTo = useSmoothScroll();

  const T = "250ms cubic-bezier(0.4,0,0.2,1)";
  const btnBg = "#ae1431";
  const btnText = "#ffffff";
  const btnBorder = "#ae1431";

  /* ── Proactive prefetch ──────────────────────────────────────────
     Prefetch all internal routes as soon as Navbar mounts, instead of
     waiting for the click. This warms up the route (data + dev-mode
     compile) before the user even clicks, so the transition overlay
     doesn't sit there waiting 3-4s for the page to be ready. */
  useEffect(() => {
    navItems.forEach((item) => {
      if (!item.path.startsWith("#") && !item.path.startsWith("http")) {
        router.prefetch(item.path);
      }
    });
    institutions.forEach((inst) => {
      if (!inst.path.startsWith("http")) {
        router.prefetch(inst.path);
      }
    });
    router.prefetch("/student-parent-portal");
  }, [router]);

  useEffect(() => {
    if (!isHome) {
      setNavHidden(false);
      return;
    }

    let intersectionObs: IntersectionObserver | null = null;
    let isCleanedUp = false;

    const attachIntersection = (el: HTMLElement) => {
      if (isCleanedUp) return;
      intersectionObs = new IntersectionObserver(
        ([entry]) => setNavHidden(entry.isIntersecting),
        { threshold: 0.05 },
      );
      intersectionObs.observe(el);
    };

    let checkTimer: NodeJS.Timeout;
    const checkArena = () => {
      if (isCleanedUp) return;
      const el = document.getElementById("arena");
      if (el) {
        attachIntersection(el);
      } else {
        // Try again after a short delay
        checkTimer = setTimeout(checkArena, 250);
      }
    };

    // Wait until initial mount/hydration completes before searching/observing
    const startTimer = setTimeout(checkArena, 100);

    return () => {
      isCleanedUp = true;
      clearTimeout(startTimer);
      clearTimeout(checkTimer);
      if (intersectionObs) {
        intersectionObs.disconnect();
      }
    };
  }, [isHome]);

  /* ── Active section tracking ──────────────────────────────────── */
  useEffect(() => {
    let isCleanedUp = false;
    let observers: IntersectionObserver[] = [];
    let startTimer: NodeJS.Timeout | undefined;

    const initActiveSectionTracking = () => {
      if (isCleanedUp) return;

      if (!isHome) {
        const matched = navItems.find(
          (item) =>
            !item.path.startsWith("#") && pathname.startsWith(item.path),
        );
        const instMatch = institutions.find(
          (inst) =>
            !inst.path.startsWith("http") && pathname.startsWith(inst.path),
        );
        setActiveSection(
          matched ? matched.path : instMatch ? "institutions" : null,
        );
        return;
      }

      setActiveSection(null);

      const sectionIds = navItems
        .filter((item) => item.path.startsWith("#"))
        .map((item) => item.path.slice(1));

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(`#${id}`);
          },
          { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
        );
        observer.observe(el);
        observers.push(observer);
      });
    };

    // Defer observation startup by 300ms to keep hydration light
    requestAnimationFrame(initActiveSectionTracking);

    return () => {
      isCleanedUp = true;
      if (startTimer) clearTimeout(startTimer);
      observers.forEach((o) => o.disconnect());
    };
  }, [isHome, pathname]);

  /* ── Lerped Mobile scroll Progress Ring ────────────────────────── */
  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number | null = null;
    let isCleanedUp = false;
    let startTimer: NodeJS.Timeout | undefined;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (isCleanedUp) return;
      current = lerp(current, target, 0.09);
      setScrollProgress(current);
      if (Math.abs(target - current) > 0.0002) {
        rafId = requestAnimationFrame(tick);
      } else {
        setScrollProgress(target);
        rafId = null;
      }
    };

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      target = docHeight > 0 ? window.scrollY / docHeight : 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const startListener = () => {
      if (isCleanedUp) return;
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    // Defer scroll registration
    startTimer = setTimeout(startListener, 350);

    return () => {
      isCleanedUp = true;
      if (startTimer) clearTimeout(startTimer);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Nav click helper ─────────────────────────────────────────── */
  const handleNavClick = (path: string, closeMobile = false) => {
    if (closeMobile) setOpen(false);

    if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    if (path.startsWith("#")) {
      const targetId = path.replace("#", "");

      if (isHome) {
        smoothScrollTo(targetId);
        setActiveSection(path);
      } else {
        router.push("/");

        requestAnimationFrame(() => {
          setTimeout(() => {
            smoothScrollTo(targetId);
            setActiveSection(path);
          }, 100);
        });
      }

      return;
    }

    startPageTransition(path);
  };

  /* ── Render desktop nav items ─────────────────────────────────── */
  const renderNavItems = () =>
    navItems.map((item) => {
      if (item.label?.toUpperCase() === "INSTITUTIONS") {
        return (
          <InstitutionsDropdown
            key="institutions"
            isHome={isHome}
            isActive={activeSection === "institutions"}
            onItemClick={(path) => handleNavClick(path)}
          />
        );
      }
      const isActive = activeSection === item.path;
      return (
        <button
          key={item.path}
          onClick={() => handleNavClick(item.path)}
          style={{
            transition: `color ${T}`,
            willChange: "color",
            WebkitFontSmoothing: "antialiased",
          }}
          className={`relative pb-[5px] translate-z-0 text-[#111111]
hover:text-[#ae1431] backface-hidden text-[0.92rem] lg:text-[0.97rem] xl:text-[1rem] uppercase tracking-[0.035em] cursor-pointer whitespace-nowrap transition-all duration-300 ${
            isActive ? "font-bold" : "font-normal"
          }`}
        >
          {item.label}
          <span
            style={{
              backgroundColor: isHome ? "#F5EFE8" : "#ae1431",
              width: isActive ? "100%" : "0%",
              opacity: isActive ? 1 : 0,
              transition: `width 300ms cubic-bezier(0.4,0,0.2,1), opacity 300ms cubic-bezier(0.4,0,0.2,1), background-color ${T}`,
            }}
            className="absolute bottom-0 left-0 h-[2.5px] rounded-full"
          />
        </button>
      );
    });

  return (
    <div
      className="w-full sticky top-0 z-[999]"
      style={{
        transform: navHidden ? "translateY(-110%)" : "translateY(0)",
        transition: "transform 400ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <header
        style={{
          backgroundColor: "#F5EFE8",
          transition: `background-color ${T}`,
        }}
        className="
          relative mt-0 mb-[-28px]
          flex items-center
          min-h-[68px] lg:min-h-[72px]
          px-6 lg:px-10 xl:px-14
          max-[920px]:px-3 max-[920px]:min-h-[64px]
          sticky
        "
      >
        {/* ── LOGO ── */}
        <Link
          href="/"
          className="shrink-0 flex items-center self-stretch"
          style={{ minWidth: "150px" }}
        >
          <span
            style={{
              backgroundColor: "#F5EFE8",
              transition: `background-color ${T}`,
            }}
            className="flex items-center h-full py-[12px] pr-4 max-[920px]:h-[48px] max-[920px]:rounded-[14px] max-[920px]:px-3 max-[920px]:py-2"
          >
            <div className="relative w-[128px] lg:w-[138px] h-[32px]">
              <Image
                src="/education-1.svg"
                alt="ERAM Education"
                fill
                sizes="(max-width: 1024px) 128px, 138px"
                style={{
                  objectFit: "contain",
                  objectPosition: "left",
                }}
              />
            </div>
          </span>
        </Link>

  {/* ── DESKTOP NAV ── */}
<nav className="hidden min-[920px]:flex flex-1 items-center justify-center gap-4 min-[1024px]:gap-8 min-[1200px]:gap-12 min-[1400px]:gap-16 font-rethink px-2 min-[1200px]:px-4">
  {renderNavItems()}
</nav>

{/* ── STUDENT-PARENT PORTAL BUTTON ── */}
<div className="shrink-0 hidden min-[920px]:flex font-rethink">
  <button
    onClick={() => handleNavClick("/student-parent-portal")}
    style={{
      backgroundColor: btnBg,
      color: btnText,
      borderColor: btnBorder,
      transition: `background-color ${T}, color ${T}, border-color ${T}`,
    }}
    className="font-rethink px-3 min-[1200px]:px-6 py-[11px] text-[0.8rem] min-[1200px]:text-[0.95rem] tracking-[0.03em] rounded-[10px] border cursor-pointer whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
  >
    Student-Parent Portal
  </button>
</div>

        {/* ── MOBILE HAMBURGER ── */}
        <div className="ml-auto min-[920px]:hidden relative h-[42px] w-[42px] shrink-0">
          {/* Scroll progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 42 42"
          >
            {/* Track */}
            <circle
              cx="21"
              cy="21"
              r="19"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="2.5"
            />
            {/* Progress */}
            <circle
              cx="21"
              cy="21"
              r="19"
              fill="none"
              stroke="#ae1431"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 19}`}
              strokeDashoffset={`${2 * Math.PI * 19 * (1 - scrollProgress)}`}
            />
          </svg>
          {/* Button itself */}
          <button
            onClick={() => setOpen(true)}
            className="h-full w-full flex items-center justify-center bg-white border border-black/15 rounded-full"
          >
            <div className="space-y-[5px]">
              <span className="block h-[2px] w-[19px] bg-black" />
              <span className="block h-[2px] w-[19px] bg-black" />
              <span className="block h-[2px] w-[19px] bg-black" />
            </div>
          </button>
        </div>

        {/* ── OVERLAY ── */}
        <div
          className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } min-[920px]:hidden`}
          onClick={() => setOpen(false)}
        />

        {/* ── MOBILE MENU ── */}
        <div
          className={`will-change-transform fixed top-0 right-0 z-[110] h-[100dvh] w-full bg-[#F5EFE8] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          } min-[920px]:hidden`}
        >
         <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
  <Link
    href="/"
    onClick={() => setOpen(false)}
    className="flex items-center"
  >
    <div className="relative w-[110px] h-[28px]">
      <Image
        src="/education-1.svg"
        alt="ERAM Education"
        fill
        sizes="110px"
        style={{
          objectFit: "contain",
          objectPosition: "left",
        }}
      />
    </div>
  </Link>
  <button
    onClick={() => setOpen(false)}
    className="h-9 w-9 flex items-center justify-center rounded-full bg-black/5 text-[#111]"
  >
    ✕
  </button>
</div>

          <nav className="flex flex-col px-7 py-8 overflow-y-auto">
            {navItems.map((item) => {
              if (item.label?.toUpperCase() === "INSTITUTIONS") {
                return (
                  <div key="mob-institutions">
                    <button
                      onClick={() => setMobileInstitutionsOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-4 border-b border-black/[0.08] text-[1.05rem]  uppercase tracking-[0.05em] text-[#111]"
                    >
                      INSTITUTIONS
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{
                          transition: "transform 250ms ease",
                          transform: mobileInstitutionsOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <path
                          d="M2 4.5L6 8l4-3.5"
                          stroke="#111"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div
                      style={{
                        maxHeight: mobileInstitutionsOpen ? "400px" : "0px",
                        transition:
                          "max-height 350ms cubic-bezier(0.4,0,0.2,1)",
                        overflow: "hidden",
                      }}
                    >
                      <div className="py-2 flex flex-col gap-1">
                        {institutions.map((inst) => (
                          <button
                            key={inst.title}
                            onClick={() => {
                              setOpen(false);
                              setMobileInstitutionsOpen(false);
                              handleNavClick(inst.path);
                            }}
                            className="flex items-center gap-3 px-2 py-[8px] rounded-[10px] hover:bg-black/5 transition-colors duration-150 text-left group"
                          >
                            <div className="relative w-[40px] h-[30px] rounded-[7px] overflow-hidden shrink-0 bg-black/5">
                              <Image
                                src={inst.image}
                                alt={inst.title}
                                fill
                                sizes="40px"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <span className="text-[0.9rem]  text-[#111] flex-1 font-rethink">
                              {inst.title}
                            </span>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 14 14"
                              fill="none"
                              className="text-[#bbb] shrink-0"
                            >
                              <path
                                d="M3 7h8M7.5 4l3.5 3-3.5 3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path, true)}
                  className="py-4 border-b border-black/[0.08] text-[1.05rem]  uppercase tracking-[0.05em] text-left text-[#111] hover:text-[#ae1431] transition-colors duration-200"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="px-7 pb-10 mt-auto border-t border-black/10 pt-5">
            <button
              onClick={() => handleNavClick("/student-parent-portal", true)}
              className="w-full bg-[#ae1431] text-white rounded-[10px] py-[14px] font-rethink text-[0.85rem] tracking-[0.04em]"
            >
              Student-Parent Portal
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}



