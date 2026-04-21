import { useState } from "react";
import { excellenceDomains } from "../../../constants/homeData";

export default function ExcellenceSection() {
  const categories = ["ACADEMIC", "SPORTS", "CULTURAL", "PROFESSIONAL"];

  const [active, setActive] = useState("ACADEMIC");

  return (
    <section className="bg-white py-[120px] max-[900px]:py-[90px] max-[560px]:py-[72px]" id="gallery">
      <div
        className="
          max-w-[1180px]

          mx-auto

          px-[24px]
          max-[560px]:px-[16px]

          grid

          grid-cols-[260px_1fr]

          gap-[60px]

          max-[900px]:grid-cols-1
          max-[900px]:gap-[32px]
        "
      >
        {/* left menu */}
        <div
          className="
            pt-[20px]
 sticky top-[120px] self-start z-30
            flex
            flex-col

            gap-[22px]
            max-[900px]:flex-row
            max-[900px]:gap-[12px]
            max-[900px]:overflow-x-auto
            max-[900px]:pb-[6px]
            max-[900px]:scrollbar-hide
          "
        >
          {categories.map((item) => {
            const isActive = active === item;

            return (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`

                  text-left

                  text-[22px]

                  tracking-[0.16em]

                  font-[400]

                  transition-all

                  duration-200
                  max-[900px]:shrink-0
                  max-[900px]:rounded-full
                  max-[900px]:border
                  max-[900px]:px-[14px]
                  max-[900px]:py-[8px]
                  max-[900px]:text-[13px]
                  max-[900px]:tracking-[0.08em]

                  ${
                    isActive
                      ? "text-[#111] max-[900px]:border-[#111] max-[900px]:bg-[#111] max-[900px]:text-white"
                      : "text-[#a3a3a3] hover:text-[#666] max-[900px]:border-[#d5d5d5] max-[900px]:bg-white max-[900px]:text-[#777]"
                  }

                `}
              >
                {isActive && <span className="max-[900px]:hidden">//</span>}

                {item}
              </button>
            );
          })}
        </div>

        {/* right content */}
        <div className="max-w-[680px] ml-[80px] max-[900px]:ml-0">
          {/* heading */}
          <h2
            className="
            font-display
              text-[48px]

              font-[600]

              tracking-[-0.02em]

              text-[#111]

              mb-[56px]
              max-[900px]:text-[36px]
              max-[560px]:mb-[36px]
              max-[560px]:text-[30px]
            "
          >
            Excellence Across Every Domain
          </h2>

          {/* grid */}
          <div className="grid grid-cols-2 gap-[32px] max-[900px]:gap-[20px] max-[560px]:grid-cols-1">
            {excellenceDomains.map((item, i) => (
              <div
                key={i}
                className="
                  h-[320px]

                  rounded-[28px]

                  border

                  border-[#cfcfcf]

                  bg-[#f5efe8]

                  flex

                  items-center

                  justify-center
                  max-[900px]:h-[260px]
                  max-[560px]:h-[250px]
                "
              >
                {/* placeholder icon */}
                <svg width="42" height="42" opacity="0.45">
                  <rect width="42" height="42" fill="#9a9a9a" />
                </svg>
              </div>
            ))}
          </div>

          {/* button */}
          <div
            className="mt-[56px] flex justify-center max-[560px]:mt-[36px]"
          >
            <button
            className="
                px-[28px]

                py-[12px]

                text-[13px]

                tracking-[0.16em]

                uppercase

                text-[#222]

                border

                border-[#bfbfbf]

                rounded-[10px]
                mr-[450px]
                max-[1200px]:mr-0

                transition-all

                duration-200

                hover:bg-[#111]

                hover:text-white
                max-[560px]:w-full
                max-[560px]:py-[14px]
              "
            >
              Explore Excellence
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
