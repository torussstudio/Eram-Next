// import { useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import ActionButton from "../ui/ActionButton";
// import { navItems } from "../../constants/homeData";
// import { shell } from "../../constants/homeStyles";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const location = useLocation();

//   const isHome = location.pathname === "/";

//   const bgColor = "bg-[#F5EFE8]";
//   const textColor = "text-black";
//   const borderColor = "border-black/30";

//   const navLinkClassName = `
//   text-[0.88rem]
//   font-semibold
//   uppercase
//   tracking-[0.04em]
//   transition-colors
//   duration-200
//   ${textColor}
//   `;

//   return (
//     <div className={shell}>
//       <header
//         className={`
// w-full
// max-w-[1920px]
// mx-auto

// sticky top-0 z-[999] 
// mt-0
// mb-[-34px]

// grid
// grid-cols-[190px_1fr_auto]
// lg:grid-cols-[210px_1fr_auto]

// items-center

// min-h-[68px]
// lg:min-h-[72px]

// gap-6 lg:gap-8



// ${bgColor}




// max-[920px]:grid-cols-[1fr_auto]
// max-[920px]:p-[8px]
// max-[920px]:min-h-[64px]
// max-[920px]:rounded-[18px] 
// max-[920px]:w-auto
// `}
//       >
//         {/* LOGO */}

//         <Link to="/" className="inline-flex h-full items-stretch self-stretch">
//           <span
//   className="

// flex

// h-[68px]
// lg:h-[72px]

// w-full

// items-center justify-start

// bg-[#F5EFE8]

// pl-[20px]
// lg:pl-[24px]

// pr-[18px]
// lg:pr-[20px]

// pt-[12px]
// pb-[11px]

// max-[920px]:h-[48px]
// max-[920px]:rounded-[14px]
// max-[920px]:px-[18px]

// "
// >
//             <img
//               src="/education-1.svg"
//               alt="ERAM Education"
//               className="w-[130px]  lg:w-[140px] object-contain"
//             />
//           </span>
//         </Link>

//         {/* DESKTOP MENU */}

//         <nav
//           className="

// flex

// justify-center

// gap-[40px]
// lg:gap-[80px]
// xl:gap-[110px]

// max-[920px]:hidden

// "
//         >
//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) => `

// ${navLinkClassName}

// ${
//   isActive
//     ? "text-[#ae1431] underline underline-offset-4 decoration-[1.5px] decoration-[#ae1431]"
//     : ""
// }

// `}
//             >
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* BUTTONS */}

//         <div
//           className="

// flex

// gap-[28px]
// lg:gap-[50px]

// max-[920px]:hidden

// "
//         >
//           <ActionButton
//             variant="ghost"
//             className={`

// ${textColor}

// ${borderColor}

// px-[16px]

// text-[0.8rem]

// tracking-[0.03em]

// !rounded-[10px]

// `}
//           >
//             Parent Portal
//           </ActionButton>

//           <ActionButton
//             className="

// bg-[#ae1431]

// text-white

// border-[#ae1431]

// px-[16px]

// text-[0.8rem]

// tracking-[0.03em]

// !rounded-[10px]

// "
//           >
//             News & Updates
//           </ActionButton>
//         </div>

//         {/* MOBILE TOGGLE */}

//         <button
//           onClick={() => setOpen(true)}
//           className="

// hidden
// max-[920px]:flex

// h-[44px]
// w-[44px]

// items-center
// justify-center

// bg-white
// border border-black
// rounded-full

// "
//         >
//           <div className="space-y-[5px]">
//             <span className="block h-[2px] w-[20px] bg-black" />

//             <span className="block h-[2px] w-[20px] bg-black" />

//             <span className="block h-[2px] w-[20px] bg-black" />
//           </div>
//         </button>

//         {/* OVERLAY */}

//         <div
//           className={`

// fixed inset-0 z-[100]

// bg-black/50 backdrop-blur-sm

// transition-opacity duration-300

// ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}

// min-[921px]:hidden

// `}
//           onClick={() => setOpen(false)}
//         />

//         {/* MOBILE MENU */}

//         <div
//           className={`

// fixed top-0 right-0

// z-[110]

// h-[100dvh]

// w-full

// bg-[#F5EFE8]

// flex flex-col

// shadow-2xl

// transition-transform duration-500 ease-out

// ${open ? "translate-x-0" : "translate-x-full"}

// min-[921px]:hidden

// `}
//         >
//           <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
//             <span className="font-display font-bold text-xl text-[#ae1431]">
//               ERAM.
//             </span>

//             <button
//               onClick={() => setOpen(false)}
//               className="h-9 w-9 flex items-center justify-center rounded-full bg-black/5"
//             >
//               ✕
//             </button>
//           </div>

//           <nav className="flex flex-col gap-7 px-7 py-10">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) => `

// text-[1.15rem]

// font-medium

// uppercase

// tracking-[0.05em]

// ${isActive ? "text-[#ae1431]" : "text-black"}

// `}
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="px-7 pb-10 mt-auto flex flex-col gap-3 border-t border-black/10 pt-6">
//             <ActionButton className="w-full justify-center bg-[#ae1431] text-white">
//               Parent Portal
//             </ActionButton>

//             <ActionButton variant="ghost" className="w-full justify-center">
//               News & Updates
//             </ActionButton>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ActionButton from "../ui/ActionButton";
import { navItems } from "../../constants/homeData";
import { shell } from "../../constants/homeStyles";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/";

  const bgColor = "bg-[#F5EFE8]";
  const textColor = "text-black";
  const borderColor = "border-black/30";

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
    // FIX: sticky/top-0/z-[999] must be on the outermost wrapper.
    // The shell div contains ONLY the header, so its height === header height.
    // CSS sticky works only while the parent is in the viewport — if the parent
    // is the same height as the sticky child, it scrolls away immediately.
    // Moving sticky here makes the wrapper itself the pinned element.
    <div className=" w-full sticky top-0 z-[999]">
      <header
        className={`


mt-0
mb-[-34px]

grid
grid-cols-[190px_1fr_auto]
lg:grid-cols-[210px_1fr_auto]

items-center

min-h-[68px]
lg:min-h-[72px]

gap-6 lg:gap-8
px-6 lg:px-12 xl:px-8

${bgColor}

max-[920px]:grid-cols-[1fr_auto]
max-[920px]:p-[8px]
max-[920px]:min-h-[64px]

`}
      >
        {/* LOGO */}

        <Link to="/" className="inline-flex h-full items-stretch self-stretch">
          <span
  className="
flex
h-[68px]
lg:h-[72px]
w-full
items-center justify-start
bg-[#F5EFE8]
lg:pl-[0px]   // ← changed from 24px
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
              className="w-[130px] lg:w-[140px] pl-[5px] object-contain"
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
gap-[20px]
lg:gap-[40px]
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
cursor-pointer
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
cursor-pointer
"
          >
            News & Updates
          </ActionButton>
        </div>

        {/* MOBILE TOGGLE */}

        <button
          onClick={() => setOpen(true)}
          className="
hidden
max-[920px]:flex
h-[44px]
w-[44px]
items-center
justify-center
bg-white
border border-black
rounded-full
"
        >
          <div className="space-y-[5px]">
            <span className="block h-[2px] w-[20px] bg-black" />
            <span className="block h-[2px] w-[20px] bg-black" />
            <span className="block h-[2px] w-[20px] bg-black" />
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
    </div>
  );
}