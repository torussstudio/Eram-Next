import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ActionButton from "../ui/ActionButton";
import { navItems } from "../../constants/homeData";
import { shell } from "../../constants/homeStyles";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/";
  

  const bgColor = isHome ? "bg-[#ae1431]" : "bg-[#F5EFE8]";
  const textColor = isHome ? "text-[#F5EFE8]" : "text-black";
  const borderColor = isHome ? "border-[#F5EFE8]/60" : "border-black/30";

  const navLinkClassName = `
  text-[0.88rem]
  font-semibold
  uppercase
  tracking-[0.04em]
  transition-colors
  duration-200
  ${textColor}
  `;

  return (
    <header
      className={`
${shell}

sticky top-0 max-[920px]:top-[6px] z-[60]

mt-0
mb-[-34px]

grid
grid-cols-[190px_1fr_auto]
lg:grid-cols-[210px_1fr_auto]

items-center

min-h-[68px]
lg:min-h-[72px]

gap-6 lg:gap-8

rounded-b-[20px] lg:rounded-b-[24px]   /* 👈 only bottom rounded */
rounded-t-none                         /* 👈 remove top curve */

${bgColor}

pr-[14px]

max-[920px]:grid-cols-[1fr_auto]
max-[920px]:p-[8px]
max-[920px]:min-h-[64px]
max-[920px]:rounded-b-[18px]
max-[920px]:rounded-t-none
`}
    >
      {/* LOGO */}

      <Link to="/" className="inline-flex h-full items-stretch self-stretch">
        <span
          className="

flex

h-[68px]
lg:h-[72px]

w-[180px]
lg:w-[210px]

items-center

rounded-tr-[20px]
lg:rounded-tr-[24px]




bg-[#F5EFE8]

pl-[20px]
lg:pl-[24px]

pr-[18px]
lg:pr-[20px]

pt-[12px]
pb-[11px]

max-[920px]:h-[48px]
max-[920px]:rounded-[14px]
max-[920px]:px-[18px]

"
        >
          <img
            src="/education-1.svg"
            alt="ERAM Education"
            className="w-[135px] pl-[20px] lg:w-[140px] object-contain"
          />
        </span>
      </Link>

      {/* DESKTOP MENU */}

      <nav
        className="

flex

justify-center

gap-[40px]
lg:gap-[80px]
xl:gap-[110px]

max-[920px]:hidden

"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `

${navLinkClassName}

${
  isActive
    ? "text-[#ae1431] underline underline-offset-4 decoration-[1.5px] decoration-[#ae1431]"
    : ""
}

`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* BUTTONS */}

      <div
        className="

flex

gap-[28px]
lg:gap-[50px]

max-[920px]:hidden

"
      >
        <ActionButton
          variant="ghost"
          className={`

${textColor}

${borderColor}

px-[16px]

text-[0.8rem]

tracking-[0.03em]

!rounded-[10px]

`}
        >
          Parent Portal
        </ActionButton>

        <ActionButton
          className="

bg-[#ae1431]

text-white

border-[#ae1431]

px-[16px]

text-[0.8rem]

tracking-[0.03em]

!rounded-[10px]

"
        >
          News & Updates
        </ActionButton>
      </div>

      {/* MOBILE TOGGLE */}

      <button
        onClick={() => setOpen(true)}
        className={`

hidden

max-[920px]:flex

h-[44px]
w-[44px]

items-center
justify-center

rounded-[14px]

${
  isHome
    ? "bg-white/10 border border-white/20"
    : "bg-black/5 border border-black/10"
}

`}
      >
        <div className="space-y-[5px]">
          <span
            className={`block h-[2px] w-[20px] ${isHome ? "bg-white" : "bg-black"}`}
          />

          <span
            className={`block h-[2px] w-[20px] ${isHome ? "bg-white" : "bg-black"}`}
          />

          <span
            className={`block h-[2px] w-[20px] ${isHome ? "bg-white" : "bg-black"}`}
          />
        </div>
      </button>

      {/* OVERLAY */}

      <div
        className={`

fixed inset-0 z-[100]

bg-black/50 backdrop-blur-sm

transition-opacity duration-300

${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}

min-[921px]:hidden

`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE MENU */}

      <div
        className={`

fixed top-0 right-0

z-[110]

h-[100dvh]

w-full

bg-[#F5EFE8]

flex flex-col

shadow-2xl

transition-transform duration-500 ease-out

${open ? "translate-x-0" : "translate-x-full"}

min-[921px]:hidden

`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <span className="font-display font-bold text-xl text-[#ae1431]">
            ERAM.
          </span>

          <button
            onClick={() => setOpen(false)}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-black/5"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-7 px-7 py-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `

text-[1.15rem]

font-medium

uppercase

tracking-[0.05em]

${isActive ? "text-[#ae1431]" : "text-black"}

`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-7 pb-10 mt-auto flex flex-col gap-3 border-t border-black/10 pt-6">
          <ActionButton className="w-full justify-center bg-[#ae1431] text-white">
            Parent Portal
          </ActionButton>

          <ActionButton variant="ghost" className="w-full justify-center">
            News & Updates
          </ActionButton>
        </div>
      </div>
    </header>
  );
}


