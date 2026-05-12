import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../constants/homeData";

const institutions = [
  {
    title: "EASE (CBSE)",
    image: "/images/ease.avif",
    path: "https://ease.edu.in/",
  },
  { title: "MMHSS (Hr. Sec)", image: "/images/mmhss.avif", path: "/mmhss" },
  { title: "MMPS (HS)", image: "/images/mmps.webp", path: "/mmps" },
  
  { title: "AMLP (LP)", image: "/images/amlp.avif", path: "/amlp" },
  { title: "MMITE (TTI)", image: "/images/mmite.webp", path: "/mmite" },
];

/* ── Institutions Dropdown ──────────────────────────────────────── */
function InstitutionsDropdown({ isHome, isActive, onItemClick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const T = "500ms cubic-bezier(0.4,0,0.2,1)";

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          color: isHome ? "#F5EFE8" : "#111111",
          transition: `color ${T}`,
        }}
        className="relative pb-[5px] text-[0.92rem] lg:text-[0.97rem] xl:text-[1rem] font-semibold uppercase tracking-[0.04em] cursor-pointer whitespace-nowrap flex items-center gap-[5px]"
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
          {institutions.map((inst) => (
            <button
              key={inst.title}
              onClick={() => {
                setOpen(false);
                onItemClick(inst.path);
              }}
              className="w-full flex items-center gap-3 px-3 py-[9px] rounded-[12px] hover:bg-[#F5EFE8] transition-colors duration-150 text-left group"
            >
              <div className="w-[46px] h-[34px] rounded-[8px] overflow-hidden shrink-0 bg-black/5">
                <img
                  src={inst.image}
                  alt={inst.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[0.85rem] font-semibold text-[#111] tracking-[0.02em] flex-1">
                {inst.title}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-[#aaa] group-hover:text-[#ae1431] transition-colors duration-150 shrink-0"
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

/* ── Main Navbar ────────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileInstitutionsOpen, setMobileInstitutionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [navHidden, setNavHidden] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const T = "500ms cubic-bezier(0.4,0,0.2,1)";
  const btnBg = isHome ? "#F5EFE8" : "#ae1431";
  const btnText = isHome ? "#111111" : "#ffffff";
  const btnBorder = isHome ? "#F5EFE8" : "#ae1431";

  /* ── Hide navbar when ArenaSection enters viewport ──────────────
     ArenaSection is lazy-loaded so #arena won't exist in the DOM
     when Navbar first mounts. MutationObserver waits for it to
     appear, then hands off to IntersectionObserver.
  ────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isHome) {
      setNavHidden(false);
      return;
    }

    let intersectionObs = null;

    const attachIntersection = (el) => {
      intersectionObs = new IntersectionObserver(
        ([entry]) => setNavHidden(entry.isIntersecting),
        { threshold: 0.05 },
      );
      intersectionObs.observe(el);
    };

    // Already in DOM (e.g. hot reload)
    const existing = document.getElementById("arena");
    if (existing) {
      attachIntersection(existing);
      return () => intersectionObs?.disconnect();
    }

    // Wait for lazy-loaded #arena to appear in the DOM
    const mutationObs = new MutationObserver(() => {
      const el = document.getElementById("arena");
      if (el) {
        mutationObs.disconnect();
        attachIntersection(el);
      }
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObs.disconnect();
      intersectionObs?.disconnect();
    };
  }, [isHome]);

  /* ── Active section tracking ──────────────────────────────────── */
  useEffect(() => {
    if (!isHome) {
      const matched = navItems.find(
        (item) =>
          !item.path.startsWith("#") && location.pathname.startsWith(item.path),
      );
      const instMatch = institutions.find(
        (inst) =>
          !inst.path.startsWith("http") &&
          location.pathname.startsWith(inst.path),
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

    const observers = [];
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
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome, location.pathname]);

  /* ── Nav click helper ─────────────────────────────────────────── */
  const handleNavClick = (path, closeMobile = false) => {
    if (closeMobile) setOpen(false);
    if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }
    if (path.startsWith("#")) {
      const section = document.querySelector(path);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(path);
      } else {
        navigate("/");
        setTimeout(() => {
          const target = document.querySelector(path);
          target?.scrollIntoView({ behavior: "smooth" });
          setActiveSection(path);
        }, 200);
      }
    } else {
      navigate(path);
      setActiveSection(path);
    }
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
            color: isHome ? "#F5EFE8" : "#111111",
            transition: `color ${T}`,
willChange: "color",
WebkitFontSmoothing: "antialiased",
          }}
          className="relative pb-[5px] translate-z-0 backface-hidden text-[0.92rem] lg:text-[0.97rem] xl:text-[1rem] font-medium uppercase tracking-[0.035em] cursor-pointer whitespace-nowrap"
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
          backgroundColor: isHome ? "#ae1431" : "#F5EFE8",
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
          to="/"
          className="shrink-0 flex items-center self-stretch"
          style={{ minWidth: "150px" }}
        >
          <span
            style={{
              backgroundColor: isHome ? "#ae1431" : "#F5EFE8",
              transition: `background-color ${T}`,
            }}
            className="flex items-center h-full py-[12px] pr-4 max-[920px]:h-[48px] max-[920px]:rounded-[14px] max-[920px]:px-3 max-[920px]:py-2"
          >
            <div className="relative w-[128px] lg:w-[138px] h-[32px]">
              <img
                src="/eramwhite.webp"
                alt="ERAM Education"
                className="absolute inset-0 w-full h-full object-contain object-left"
                style={{
                  opacity: isHome ? 1 : 0,
                  transition: `opacity ${T}`,
                  pointerEvents: isHome ? "auto" : "none",
                }}
              />
              <img
                src="/education-1.svg"
                alt="ERAM Education"
                className="absolute inset-0 w-full h-full object-contain object-left"
                style={{
                  opacity: isHome ? 0 : 1,
                  transition: `opacity ${T}`,
                  pointerEvents: isHome ? "none" : "auto",
                }}
              />
            </div>
          </span>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden min-[920px]:flex items-center gap-12 lg:gap-12 xl:gap-16 font-rethink">
          {renderNavItems()}
        </nav>

        {/* ── STUDENT-PARENT PORTAL BUTTON ── */}
        <div className="ml-auto shrink-0 hidden min-[920px]:flex">
          <button
            style={{
              backgroundColor: btnBg,
              color: btnText,
              borderColor: btnBorder,
              transition: `background-color ${T}, color ${T}, border-color ${T}`,
            }}
            className="font-rethink font-semibold px-6 py-[11px] text-[0.95rem] tracking-[0.03em] rounded-[10px] border cursor-pointer whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
          >
            Student-Parent Portal
          </button>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setOpen(true)}
          className="ml-auto min-[920px]:hidden h-[42px] w-[42px] flex items-center justify-center bg-white border border-black rounded-full shrink-0"
        >
          <div className="space-y-[5px]">
            <span className="block h-[2px] w-[19px] bg-black" />
            <span className="block h-[2px] w-[19px] bg-black" />
            <span className="block h-[2px] w-[19px] bg-black" />
          </div>
        </button>

        {/* ── OVERLAY ── */}
        <div
          className={`fixed inset-0 z-[100] bg-black/50  transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} min-[920px]:hidden`}
          onClick={() => setOpen(false)}
        />

        {/* ── MOBILE MENU ── */}
        <div
          className={`will-change-transform fixed top-0 right-0 z-[110] h-[100dvh] w-full bg-[#F5EFE8] flex flex-col shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"} min-[920px]:hidden`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
            <span className="font-display font-bold text-xl text-[#ae1431]">
              ERAM.
            </span>
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
                      className="w-full flex items-center justify-between py-4 border-b border-black/[0.08] text-[1.05rem] font-semibold uppercase tracking-[0.05em] text-[#111]"
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
                            <div className="w-[40px] h-[30px] rounded-[7px] overflow-hidden shrink-0 bg-black/5">
                              <img
                                src={inst.image}
                                alt={inst.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[0.9rem] font-medium text-[#111] flex-1">
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
                  className="py-4 border-b border-black/[0.08] text-[1.05rem] font-semibold uppercase tracking-[0.05em] text-left text-[#111] hover:text-[#ae1431] transition-colors duration-200"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="px-7 pb-10 mt-auto border-t border-black/10 pt-5">
            <button className="w-full bg-[#ae1431] text-white rounded-[10px] py-[14px] font-rethink text-[0.85rem] tracking-[0.04em] font-semibold">
              Student-Parent Portal
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
