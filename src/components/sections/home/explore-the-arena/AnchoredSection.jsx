export default function AnchoredSection() {
  return (
    <section className="bg-[#0f0f0f] text-white py-[80px] md:py-[110px] px-[16px] sm:px-[20px] md:px-[28px]">

      {/* OUTER CONTAINER */}
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">

        {/* INNER */}
        <div className="
          max-w-[1100px] mx-auto 
          px-[16px] sm:px-[20px] md:px-[28px]

          grid 
          grid-cols-1 md:grid-cols-2 

          gap-[40px] md:gap-[80px] 
          items-start
        ">

          {/* LEFT */}
          <div className="max-w-full md:max-w-[600px]">

            {/* LABEL */}
            <div className="flex items-center gap-3 mb-[20px] md:mb-[28px]">
              {/* <span className="w-[24px] md:w-[28px] h-[1px] bg-[#ae1431]" /> */}
              <p className="text-[10px] md:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase">
                Integrated with the ERAM Ecosystem
              </p>
            </div>

            {/* TITLE */}
           <h2 className="
  font-serif
  text-[36px] sm:text-[40px] md:text-[45px]
  leading-[1.15] md:leading-[1.1]
  tracking-[-0.02em]
  mb-[18px] md:mb-[26px]
  text-[#eae6df]
">
  Anchored In Structured Athletic Development
</h2>

            {/* DESC */}
            <p className="
              text-[14.5px] md:text-[15.5px]
              leading-[1.8] md:leading-[1.9]
              text-[#b8b2a8]
              mb-[22px] md:mb-[28px]
            ">
              The Arena operates in alignment with the ERAM institutional ecosystem, reinforcing the Trust's long-standing commitment to youth development. It is not a standalone facility — it is the physical expression of a broader educational philosophy.
            </p>

            {/* QUOTE */}
            <p className="
              italic
              text-[16px] md:text-[17px]
              text-[#9f988e]
              mb-[24px] md:mb-[30px]
              border-l border-[#ae1431]
              pl-[14px] md:pl-[16px]
            ">
              “The Arena transforms training into performance, and performance into opportunity.”
            </p>

            {/* LIST */}
            <ul className="space-y-[12px] md:space-y-[14px] text-[14px] md:text-[15px] text-[#c9c3ba]">
              {points.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-[5px] h-[5px] md:w-[6px] md:h-[6px] mt-[6px] md:mt-[7px] bg-[#ae1431] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>

          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-2 border border-[#2a2a2a]">

            {cards.map((card, i) => (
              <div
                key={i}
                className={`
                  p-[22px] sm:p-[26px] md:p-[32px]
                  min-h-[140px] sm:min-h-[160px] md:min-h-[180px]

                  flex flex-col justify-center

                  ${i % 2 === 0 ? "border-r" : ""}
                  ${i < 2 ? "border-b" : ""}
                  border-[#2a2a2a]

                  ${card.variant === "red" ? "bg-[#ae1431]" : "bg-[#1a1a1a]"}
                `}
              >
                <h3 className="
                  font-serif
                  text-[24px] sm:text-[28px] md:text-[34px]
                  mb-[4px] md:mb-[6px]
                  text-[#f1eee8]
                ">
                  {card.title}
                </h3>

                <p className="
                  text-[13px] md:text-[14px]
                  leading-[1.5] md:leading-[1.6]
                  text-[#c5beb5]
                  max-w-[200px] md:max-w-[220px]
                ">
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

const points = [
  "Structured sports training environments for all institutions",
  "Competitive exposure platforms at campus scale",
  "Professional-grade infrastructure accessible to every student",
  "Seamless integration between academics and athletics",
];

const cards = [
  {
    title: "5",
    desc: "Institutions directly served by the Arena",
    variant: "red",
  },
  {
    title: "2026",
    desc: "Development milestone for the ERAM campus",
    variant: "dark",
  },
  {
    title: "1,000",
    desc: "Seat capacity for competitive events",
    variant: "dark",
  },
  {
    title: "EASE",
    desc: "Academy for Sports & Excellence — Est. 2015",
    variant: "red",
  },
];