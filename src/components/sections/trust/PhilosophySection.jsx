export default function PhilosophySection() {
  return (
    <section className="bg-[#ae1431] text-white py-[100px]">
      <div className="max-w-[1100px] mx-auto px-[40px]">
        {/* TOP LABEL */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[40px] h-[1px] bg-white/40" />
          <span className="text-[11px] tracking-[0.28em] uppercase text-white/60">
            OUR PHILOSOPHY
          </span>
        </div>

        {/* HEADING */}
        <h2 className="font-serif text-[clamp(2.8rem,4vw,4.5rem)] leading-[1.1] max-w-[600px]">
          The Philosophy <br /> Of Sustainability
        </h2>

        {/* DESCRIPTION */}
        <div className="mt-10 max-w-[650px] border-l border-white/30 pl-6">
          <p className="text-[15px] leading-[1.8] text-white/85">
            The Trust approaches community development through infrastructure,
            capacity-building, and systems-based execution. Rather than
            short-term distribution models, initiatives are designed to
            strengthen structural foundations — measured not only by immediate
            outcomes, but by the resilience created for future generations.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-4 gap-[1px] bg-white/10">
          {/* CARD */}
          {[
            {
              no: "/01",
              title: "Building Assets That Endure",
              desc: "Every intervention creates infrastructure, systems, or capabilities with lifespans beyond the immediate need — not one-time distributions.",
            },
            {
              no: "/02",
              title: "Strengthening Local Ecosystems",
              desc: "Initiatives are designed to integrate into and reinforce existing community systems rather than creating dependency on external support.",
            },
            {
              no: "/03",
              title: "Enabling Self-Sufficiency",
              desc: "The goal is always to create conditions where communities, families, and individuals can sustain themselves independently.",
            },
            {
              no: "/04",
              title: "Governance-Backed Continuity",
              desc: "Every long-term initiative is anchored in institutional oversight — ensuring accountability, measurability, and continuity across leadership transitions.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#8B1E1E] p-[30px] min-h-[180px] flex flex-col justify-between"
            >
              <span className="text-[12px] text-white/50 tracking-[0.1em]">
                {item.no}
              </span>

              <div>
                <h3 className="mt-3 font-serif text-[18px]">{item.title}</h3>

                <p className="mt-3 text-[13px] text-white/70 leading-[1.7]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
