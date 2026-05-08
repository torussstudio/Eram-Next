export default function ScaleSection() {
  return (
    <section className="bg-[#0d0d0d] text-white py-[90px] md:py-[110px] px-[16px] sm:px-[20px] md:px-[28px]">

      {/* SAME CONTAINER SYSTEM */}
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
        <div className="max-w-[1100px] mx-auto px-[16px] sm:px-[20px] md:px-[28px]">

          {/* TOP GRID */}
          <div className="grid md:grid-cols-2 gap-[30px] sm:gap-[40px] md:gap-[80px] items-start mb-[50px] md:mb-[70px]">

            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3 mb-[20px]">
                {/* <span className="w-[24px] h-[1px] bg-[#ae1431]" /> */}
                <p className="font-rethink text-[10px] md:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase">
                  The scale at a glance
                </p>
              </div>

             <h2 className="font-display text-[34px] sm:text-[42px] md:text-[36px] leading-[1.1] tracking-[-0.02em] text-[#eae6df]">
  A Landmark Addition <br></br>to the ERAM Campus.
</h2>
            </div>

            {/* RIGHT */}
            <p className="font-rethink text-[14.5px] mt-[25px] md:text-[15.5px] leading-[1.8] md:leading-[1.9] text-[#b8b2a8] max-w-[520px]">
              Every dimension of the ERAM Sports Arena is intentional — built for competitive performance,
              extended events, and long-term community use. These are not provisional specifications.
              They are a permanent statement of scale.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-[#1f1f1f] mb-[40px] md:mb-[50px]" />

          {/* GRID */}
          <div className="font-rethink grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-[#2a2a2a] divide-y sm:divide-y-0">

            {cards.map((card, i) => (
              <div
                key={i}
                className={`
                  p-[18px] sm:p-[22px] md:p-[30px]
                  min-h-[160px] md:min-h-[180px]

                  flex flex-col justify-center
                  break-words

                  border-[#2a2a2a]

                  ${i % 3 !== 2 ? "md:border-r" : ""}
                  ${i < 3 ? "md:border-b" : ""}

                  bg-[#141414] hover:bg-[#8c1d18] transition-colors duration-300
                `}
              >

                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8f877d] uppercase mb-[10px]">
                  {card.label}
                </p>

                <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[30px] text-[#f1eee8] mb-[6px]">
                  {card.value}
                </h3>

                <p className="text-[13px] md:text-[14px] text-[#c5beb5] leading-[1.5] max-w-[240px]">
                  {card.desc}
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}

/* DATA */
const cards = [
  {
    label: "Spectator Capacity",
    value: "1,000",
    desc: "Open-air amphitheatre seating for large-scale events",
    variant: "red",
  },
  {
    label: "Built-up Area",
    value: "10,000 sq.ft.",
    desc: "Total infrastructure footprint across the Arena complex",
    variant: "dark",
  },
  {
    label: "Primary Multi-Court",
    value: "47 × 22 m",
    desc: "Competition-grade multi-sport court at the arena's core",
    variant: "dark",
  },
  {
    label: "Badminton Court",
    value: "13.40 × 6.10 m",
    desc: "Regulation-dimension dedicated badminton court",
    variant: "dark",
  },
  {
    label: "Floodlighting",
    value: "8 Poles · 38 LEDs",
    desc: "10-metre poles with high-intensity LED coverage for night events",
    variant: "red",
  },
  {
    label: "Parking & Security",
    value: "50+ Bays",
    desc: "Dedicated parking with CCTV surveillance and controlled access",
    variant: "dark",
  },
];