// export default function ActionButton({
//   children,
//   variant = "primary",
//   className = "",
// }) {
//   const baseClassName =
//     "inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-[14px] border border-[rgba(17,17,17,0.65)] px-[17px] text-[0.92rem] font-medium uppercase tracking-[-0.01em] text-[#111111] transition duration-200 ease-out hover:-translate-y-[2px] max-[640px]:w-full font-display";

//   const variantClassName =
//     variant === "primary"
//       ? "border-[#111111] bg-[#111111] text-white"
//       : "bg-transparent hover:bg-[rgba(17,17,17,0.05)]";

//   return (
//     <a className={`${baseClassName} ${variantClassName} ${className}`} href="#">
//       {children}
//     </a>
//   );
// }


import { Link } from "react-router-dom";

export default function ActionButton({
  children,
  variant = "primary",
  className = "",
  to,
  onClick,
}) {
  const baseClassName =
    "inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-[14px] border border-[rgba(17,17,17,0.65)] px-[17px] text-[0.92rem] font-medium uppercase tracking-[-0.01em] text-[#111111] transition duration-200 ease-out hover:-translate-y-[2px] max-[640px]:w-full font-display";

  const variantClassName =
    variant === "primary"
      ? "border-[#111111] bg-[#111111] text-white"
      : "bg-transparent hover:bg-[rgba(17,17,17,0.05)]";

  const classes = `${baseClassName} ${variantClassName} ${className}`;

  // 👉 If routing needed
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  // 👉 Otherwise normal button
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}