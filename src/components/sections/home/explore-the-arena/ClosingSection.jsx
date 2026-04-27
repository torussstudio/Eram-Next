
import { Calendar } from "lucide-react";

export default function ClosingSection() {
  return (
    <section className="bg-[#e9e3d8] text-[#1a1a1a] py-[80px] md:py-[110px] px-[16px] sm:px-[20px] md:px-[28px]">

      {/* SAME CONTAINER SYSTEM */}
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
        <div className="max-w-[1100px] mx-auto px-[16px] sm:px-[20px] md:px-[28px]">

          {/* TOP GRID */}
          <div className="grid md:grid-cols-2 gap-[40px] md:gap-[80px] items-start">

            {/* LEFT */}
            <div className="max-w-[620px]">

              <h2 className="
                font-serif
                text-[34px] sm:text-[42px] md:text-[54px]
                leading-[1.15]
                tracking-[-0.02em]
                mb-[20px] md:mb-[26px]
              ">
                Where Sport, Ceremony,<br />
                and Gathering Unfold.
              </h2>

              <p className="
                text-[14px] md:text-[15px]
                leading-[1.9]
                text-[#4a433c]
              ">
                The ERAM Sports Arena extends the campus into a space of scale.
                Its open-air amphitheatre and floodlit multi-court design reflect
                a long-term vision: to create infrastructure that supports performance,
                visibility, and shared experience. As both athletic ground and event
                venue, the Arena strengthens the campus as a space built for participation
                and presence.
              </p>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-start md:items-end gap-[14px] md:mt-[120px]">

              <button className="
                bg-[#111111]
                text-white
                px-[22px] md:px-[26px]
                py-[14px] md:py-[15px]
                text-[12px]
                tracking-[0.18em]
                uppercase
               
                flex items-center gap-3
              ">
                Explore the ERAM Ecosystem →
              </button>

              <button className="
                border border-[#1a1a1a]
                px-[22px] md:px-[26px]
                py-[14px] md:py-[15px]
                text-[12px]
                tracking-[0.18em]
                uppercase
                flex items-center gap-3
              ">
                Host an Event
                <Calendar className="w-4 h-4 opacity-70" />
              </button>

            </div>

          </div>

          {/* DIVIDER */}
          <div className="border-t border-[#cfc6bb] mt-[50px] md:mt-[70px] mb-[30px] md:mb-[40px]" />

          {/* QUOTE */}
          <p className="
            italic
            text-[13px] md:text-[14px]
            text-[#7a7268]
          ">
            "Built not for scale alone — but for sustained opportunity: athletic, cultural, and communal."
          </p>

        </div>
      </div>
    </section>
  );
}