export default function LegacySection() {
  return (
    <section className="bg-[#F5EFE8] py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[40px]">
        <div className="grid md:grid-cols-2 gap-[60px] items-start">
          {/* LEFT CONTENT */}
          <div>
            {/* LABEL */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[40px] h-[1px] bg-[#8B1E1E]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#8B1E1E]">
                BEGIN HERE
              </span>
            </div>

            {/* HEADING */}
            <h2 className="font-serif text-[clamp(2.8rem,4vw,4.2rem)] leading-[1.1] text-[#111] max-w-[700px]">
              A Legacy of Responsibility. <br />A Future of Impact.
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-8 text-[15px] leading-[1.9] text-black/60 max-w-[600px]">
              ERAM Educational & Welfare Trust continues to expand its impact
              through system-driven interventions — strengthening institutions,
              restoring access, and reinforcing community resilience across
              sectors. Its initiatives are structured projects aligned with
              institutional oversight and long-term responsibility.
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col gap-[18px] md:items-end mt-[20px] md:mt-[40px]">
            {/* PRIMARY BUTTON */}
            <button className="bg-[#111] text-white px-[28px] py-[14px] text-[12px] tracking-[0.18em] uppercase flex items-center gap-3">
              Partner in Responsible Impact
              <span>→</span>
            </button>

            {/* SECONDARY BUTTON */}
            <button className="border border-black/40 text-[#111] px-[28px] py-[14px] text-[12px] tracking-[0.18em] uppercase flex items-center gap-3">
              Discover Our Academic Framework
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
