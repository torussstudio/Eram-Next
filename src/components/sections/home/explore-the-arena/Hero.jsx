import { Calendar } from "lucide-react";
import { shell } from "../../../../constants/homeStyles";

export default function HeroSection() {
  return (
    <section className={`${shell} bg-[#F5EFE8] py-9`}>
      {/* HERO CARD */}
      <div className="relative rounded-[28px] overflow-hidden text-white">
        {/* BACKGROUND */}
        <img
          src="/hero-bg.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div
          className="relative z-10 flex flex-col justify-start pt-[60px] md:pt-[80px]
min-h-[420px] sm:min-h-[500px] md:min-h-[720px] lg:min-h-[820px]"
        >
          {/* TOP SECTION */}
          <div
            className="w-full max-w-[1100px] mx-auto px-4 md:px-6 
py-4 md:py-16 flex flex-col lg:flex-row gap-4"
          >
            {/* LEFT */}
            <div className="flex-1 max-w-[720px]">
              <div className="flex items-center gap-3 mb-5">
                <p className="font-rethink text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase">
                  The Eram Sports Arena
                </p>
              </div>

              <h1
                className="font-display leading-[1] tracking-[-0.02em]
                  text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px]"
              >
                A New Stage <br />
                of <span className="italic text-white/60">Scale.</span>
              </h1>

              <p className="font-rethink mt-5 text-[1.05rem] md:text-[16px] leading-[1.8] text-white/70 max-w-[560px]">
             A 1,000-seat open-air amphitheatre and multi-court venue designed to elevate competitive sport, cultural engagement, and large-scale campus events.
A flagship infrastructure milestone within the ERAM ecosystem.
              </p>

              <div className="flex flex-wrap gap-6 mt-7">
               <button className="
  group
  font-rethink 
  bg-[#ae1431] 
  rounded-[10px] 
  px-5 md:px-7 
  py-2.5 md:py-3 
  text-[11px] md:text-[12px] 
  tracking-[0.12em] 
  uppercase 
  cursor-pointer
  text-white
  flex items-center gap-2
">
  EXPLORE THE ARENA
  <span className="
    relative z-10
    inline-block
    transition-all duration-300
    group-hover:translate-x-[5px]
  ">
    →
  </span>
</button>

                <button className="font-rethink border rounded-[10px] border-white/30 px-5 md:px-7 py-2.5 md:py-3 text-[11px] md:text-[12px] tracking-[0.12em] uppercase flex items-center gap-2 cursor-pointer">
                  HOST AN EVENT
                  <Calendar className="w-4 h-4 opacity-70" />
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              className="
               mt-4 md:mt-0 
                w-full sm:w-[300px] lg:w-[280px]
                bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]
                backdrop-blur-md
                border border-white/10
                rounded-md
                p-5
                lg:self-start
                lg:ml-auto
                font-rethink
              "
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-[1px] bg-[#ae1431]"></span>
                <p className="text-[10px] tracking-[0.28em] text-[#ae1431] uppercase">
                  At a Glance
                </p>
              </div>

              {[
                ["1,000", "Seating Capacity"],
                ["10,000", "sq. ft. Built-Up Area"],
                ["Open-Air", "Amphitheatre Design"],
                ["38", "High-Intensity LED Floodlights"],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className={`py-3 ${i !== 3 ? "border-b border-white/10" : ""}`}
                >
                  <h3 className="text-[20px] md:text-[22px] font-semibold">
                    {title}
                  </h3>
                  <p className="text-[12px] text-white/60 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="border-t border-white/10 mt-[80px] md:mt-[100px]">
            <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
              <div className="max-w-[1100px] mx-auto px-[16px] sm:px-[20px] md:px-[28px] py-[60px] md:py-[80px]">
                {/* LABEL */}
                <div className="font-rethink flex items-center gap-3 mb-[40px] md:mb-[50px]">
                  {/* <span className="w-[26px] h-[1px] bg-[#ae1431]" /> */}
                  <p className="text-[15px] md:text-[18px] tracking-[0.28em] text-[#ae1431] uppercase">
                    Infrastructure at a glance
                  </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-white/10">
                  {[
                    {
                      value: "1,000",
                      unit: "seats",
                      desc: ["Open-air spectator", "capacity"],
                    },
                    {
                      value: "10,000",
                      unit: "sq.ft.",
                      desc: ["Total built-up", "infrastructure area"],
                    },
                    {
                      value: "47 × 22",
                      unit: "m",
                      desc: ["Primary multi-court", "playing surface"],
                    },
                    {
                      value: "8",
                      unit: "poles",
                      desc: ["10m floodlight poles", "with 38 LED lights"],
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`
              relative
              py-[32px] md:py-[42px]
              px-[16px] md:px-[28px]

              ${i !== 3 ? "md:border-r" : ""}
              border-white/10
            `}
                    >
                      {/* RED TOP LINE */}
                      <span className="absolute top-0 left-0 w-[28px] h-[2px] bg-[#a32020]" />

                      {/* VALUE + UNIT */}
                      <div className="flex items-baseline gap-[10px]">
                        <h3
                          className="
                font-serif
                text-[32px] md:text-[38px]
                text-[#eae6df]
                font-medium
                tracking-[-0.01em]
              "
                        >
                          {item.value}
                        </h3>

                        <span
                          className="
                text-[15px] md:text-[17px]
                text-[#8f877d]
                font-normal
                relative
                top-[-2px]
              "
                        >
                          {item.unit}
                        </span>
                      </div>

                      {/* DESCRIPTION (FORCED LINE BREAK LIKE DESIGN) */}
                      <p
                        className="
              mt-[12px]
              text-[14px]
              text-[#9f988e]
              leading-[1.7]
            "
                      >
                        {item.desc.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
