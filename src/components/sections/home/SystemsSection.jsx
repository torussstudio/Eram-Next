import { useState } from "react";

export default function SystemsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const tabs = [
    "LEADERSHIP AND\nMANAGEMENT STRUCTURE",
    "INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE",
    "INSTITUTIONAL\nSYSTEMS & LEADERSHIP",
  ];
  const cardsData = [
    [
      { n: "01", t: "Strategic Leadership" },
      { n: "02", t: "Governance Model" },
      { n: "03", t: "Organizational Clarity" },
    ],

    [
      { n: "01", t: "Campus Facilities" },
      { n: "02", t: "Digital Systems" },
      { n: "03", t: "Operational Flow" },
    ],

    [
      { n: "01", t: "Strategic Leadership" },
      { n: "02", t: "Structured Academics" },
      { n: "03", t: "Operational Excellence" },
    ],
  ];

  const cards = cardsData[activeTab];

  return (
    <section id="facilities" className="bg-[#f5efe8] py-[90px] overflow-hidden">
      {/* Tabs */}
      <div className="flex justify-center mb-[70px] px-[20px]">
        <div
          className="
           relative

  flex
  gap-[120px]

  border-b-[4px]
  border-[#e5e5e5]

          max-[900px]:gap-[14px]
          max-[900px]:border-0

          max-[900px]:overflow-x-auto
          max-[900px]:scrollbar-hide
          "
        >
          {tabs.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveTab(i);
                setActiveCard(0);
              }}
              className="
              relative

pb-[18px]

              text-[18px]
              font-medium

              tracking-[0.12em]
              uppercase

              whitespace-nowrap

              transition-all
              duration-300

              max-[900px]:rounded-full
              max-[900px]:border

              max-[900px]:px-[16px]
              max-[900px]:py-[10px]

              max-[900px]:text-[12px]
              "
              style={{
                color: activeTab === i ? "#ae1431" : "#777",

                borderColor: activeTab === i ? "#ae1431" : "#ddd",

                background: "transparent",
              }}
            >
              {item.split("\n").map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}

              {activeTab === i && (
                <span
                  className="
      absolute
      left-0
      right-0

      -bottom-[4px]

      h-[6px]

      rounded-t-full

      bg-[#ae1431]
      "
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className="
        flex
        items-start

        gap-[80px]

        pl-[325px]
        pr-[80px]

        max-[1280px]:pl-[160px]

        max-[900px]:flex-col
        max-[900px]:gap-[35px]

        max-[900px]:px-[20px]
        "
      >
        {/* text */}
        <div className="max-w-[420px]">
          <h2
            className="
            font-display
            mb-[24px]

            text-[42px]
            font-black

            leading-[1.1]

            text-[#111]

            max-[900px]:text-[28px]
            max-[900px]:font-semibold
            "
          >
            Systems That
            <br />
            Sustain Excellence
          </h2>

          <p
            className="
            text-[13.5px]

            leading-[1.8]

            text-black

            max-[900px]:text-[14px]
            "
          >
            An integrated framework of management oversight, 
faculty excellence, and purpose-built infrastructure 
sustaining quality across every institution, ensuring 
continuous assessment, teacher development, 
institutional monitoring,  and transparent processes.
          </p>
        </div>

        {/* cards */}
        <div className="w-[540px] overflow-hidden max-[900px]:w-full">
          <div
            className="
            flex

            snap-x
            snap-mandatory

            gap-[18px]

            overflow-x-auto

            scroll-smooth

            pb-[20px]

            scrollbar-hide

            max-[900px]:gap-[14px]
            "
          >
            {cards.map((card, i) => {
              const isActive = activeCard === i;

              return (
                <div
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className="
                  cursor-pointer

                  flex

                  h-[220px]
                  w-[320px]

                  flex-shrink-0

                  snap-start

                  flex-col
                  justify-between

                  rounded-[22px]

                  p-[34px]

                  transition-all
                  duration-300

                  max-[900px]:h-[190px]
                  max-[900px]:w-[260px]

                  max-[900px]:p-[24px]
                  "
                  style={{
                    background: isActive ? "#ae1431" : "white",

                    border: isActive ? "none" : "1px solid #e2e2e2",
                  }}
                >
                  <span
                    style={{
                      color: isActive ? "#bfbfbf" : "#999",
                    }}
                  >
                    /{card.n}
                  </span>

                  <span
                    className="
                    flex
                    justify-end

                    text-[26px]

                    font-medium

                    leading-[1.2]

                    max-[900px]:text-[20px]
                    "
                    style={{
                      color: isActive ? "white" : "#111",
                    }}
                  >
                    {card.t.split(" ").map((w, idx) => (
                      <span key={idx}>
                        {w}
                        <br />
                      </span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* button */}
      <div className="mt-[70px] flex justify-center px-[20px]">
        <button
          className="
          rounded-[10px]

          border
          border-[#cfcfcf]

          px-[36px]
          py-[14px]

          text-[12px]

          font-[500]

          uppercase

          tracking-[0.16em]

          text-[#111]

          transition-all
          duration-300

          hover:border-black
          hover:bg-black
          hover:text-white

          max-[900px]:w-full

          max-[900px]:py-[16px]
          "
        >
          EXPLORE OUR SYSTEMS & STANDARDS
        </button>
      </div>
    </section>
  );
}
