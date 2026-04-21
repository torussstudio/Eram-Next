import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ActionButton from "../ui/ActionButton";
import { navItems } from "../../constants/homeData";
import { shell } from "../../constants/homeStyles";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  // check if home page
  const isHome = location.pathname === "/";

  // colors based on page
  const bgColor = isHome ? "bg-[#ae1431]" : "bg-[#F5EFE8]";
  const textColor = isHome ? "text-[#F5EFE8]" : "text-black";
  const borderColor = isHome ? "border-[#F5EFE8]/65" : "border-black/40";

  const navLinkClassName = `text-[0.9rem] font-medium uppercase tracking-[-0.01em] ${textColor}`;

  const mobileNavLinkClassName = `text-sm font-medium uppercase ${textColor}`;

  return (
    <header
      className={`
        ${shell}
        sticky top-0 z-[60]
        mt-6
        mb-[-34px]
        grid
        min-h-[77px]
        grid-cols-[222px_1fr_auto]
        items-center
        gap-7
        rounded-[24px]
        ${bgColor}
        pr-[18px]

        max-[920px]:grid-cols-[1fr_auto]
        max-[920px]:p-[14px]
      `}
    >
      {/* logo */}
      <Link className="inline-flex h-full items-stretch self-stretch" to="/">
        <span
          className="
            relative
            flex
            h-[77px]
            w-[222px]
            items-center
            justify-start
            rounded-t-[24px]
            bg-[#F5EFE8]
            px-[28px]
            pb-3
            pl-[30px]
            pt-[15px]
            max-[920px]:h-[60px]
          "
        >
          <img
            className="block h-auto w-40 object-contain"
            src="/education-1.svg"
            alt="ERAM Education"
          />
        </span>
      </Link>

      {/* toggle */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          hidden
          max-[920px]:flex
          h-[44px]
          w-[44px]
          items-center
          justify-center
          rounded-xl
          border
          ${borderColor}
        `}
      >
        <div className="space-y-1">
          <span
            className={`block h-[2px] w-5 ${isHome ? "bg-[#F5EFE8]" : "bg-black"}`}
          />
          <span
            className={`block h-[2px] w-5 ${isHome ? "bg-[#F5EFE8]" : "bg-black"}`}
          />
          <span
            className={`block h-[2px] w-5 ${isHome ? "bg-[#F5EFE8]" : "bg-black"}`}
          />
        </div>
      </button>

      {/* desktop menu */}
      <nav
        className="
          flex
          flex-wrap
          justify-center
          gap-[93px]
          max-[920px]:hidden
        "
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${navLinkClassName} ${
                isActive
                  ? "!text-[#ae1431] underline underline-offset-4 decoration-[#ae1431]"
                  : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* buttons */}
      <div className="flex gap-[18px] max-[920px]:hidden">
        <ActionButton
          variant="ghost"
          className={`
            ${textColor}
            ${borderColor}
            hover:bg-black/5
          `}
        >
          Parent Portal
        </ActionButton>

        <ActionButton
          variant="ghost"
          className={`
            ${textColor}
            ${borderColor}
            hover:bg-black/5
          `}
        >
          News & Updates
        </ActionButton>
      </div>

      {/* mobile menu */}
      {open && (
        <div
          className={`
              col-span-2
              mt-4
              flex
              flex-col
              gap-5
              rounded-2xl
              ${bgColor}
              p-4
              border-t
              ${isHome ? "border-white/20" : "border-black/10"}
            `}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${mobileNavLinkClassName} ${
                    isActive
                      ? "!text-[#ae1431] underline underline-offset-4 decoration-[#ae1431]"
                      : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <ActionButton
              variant="ghost"
              className={`${textColor} ${borderColor}`}
            >
              Parent Portal
            </ActionButton>

            <ActionButton
              variant="ghost"
              className={`${textColor} ${borderColor}`}
            >
              News & Updates
            </ActionButton>
          </div>
        </div>
      )}
    </header>
  );
}
