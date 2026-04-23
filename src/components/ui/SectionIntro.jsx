export default function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
  dark = false,
}) {
  const wrapperClassName = centered
    ? "mx-auto max-w-[46rem] text-center"
    : "max-w-[46rem]";
  const eyebrowClassName = dark
    ? "text-[rgba(255,255,255,0.68)]"
    : "text-[#616161]";
  const bodyClassName = dark
    ? "text-[rgba(255,255,255,0.68)]"
    : "text-[#616161]";

  return (
    <div className={wrapperClassName}>
      <span
        className={`mb-4 inline-block font-display text-[0.78rem] font-extrabold uppercase tracking-[0.18em] ${eyebrowClassName}`}
      >
        {eyebrow}
      </span>
      <h2 className="m-0 font-display text-[clamp(4rem,5vw,5.3rem)] font-bold leading-[0.91] tracking-[-0.015em] text-[#111111] max-[640px]:text-[clamp(3rem,11vw,3.9rem)]">
        {title}
      </h2>
      <p className={`mt-6 text-base leading-[1.75] ${bodyClassName}`}>
        {description}
      </p>
    </div>
  );
}
