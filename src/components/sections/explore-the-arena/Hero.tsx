"use client";

import { Calendar, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[#F5EFE8] py-9 px-3 md:px-6">
      {/* HERO CARD */}
      <div className="relative rounded-[28px] overflow-hidden text-white shadow-sm max-w-[1600px] mx-auto">
        {/* BACKGROUND */}
        <img
          src="/images/sports-ground.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div
          className="
            relative z-10 flex flex-col justify-between

            pt-[48px]

            sm:pt-[60px]

            md:pt-[80px]

            min-h-[620px]

            sm:min-h-[680px]

            md:min-h-[660px]

            lg:min-h-[760px]
          "
        >
          {/* =========================
              TOP SECTION
          ========================= */}
          <div
            className="
              w-full
              max-w-[1370px]

              ml-auto

              px-[20px]

              sm:px-[28px]

              md:px-14

              lg:px-20

              py-6
              md:py-16

              flex
              flex-col

              lg:flex-row

              gap-[34px]

              md:gap-[52px]

              lg:gap-40
            "
          >
            {/* LEFT */}
            <div className="flex-1 max-w-[620px]">
              {/* label */}
              <div className="flex items-center gap-3 mb-5">
                <p
                  className="
                    font-rethink

                    text-[13px]

                    sm:text-[13px]

                    tracking-[0.28em]

                    text-white

                    uppercase
                  "
                >
                  The Eram Sports Arena
                </p>
              </div>

              {/* heading */}
              <h1
                className="
                  font-display

                  leading-[1]

                  tracking-[-0.02em]

                  text-[40px]

                  sm:text-[56px]

                  md:text-[72px]

                  lg:text-[88px]
                "
              >
                A New Stage <br />
                of <span className="italic text-white/60">Scale.</span>
              </h1>

              {/* description */}
              <p
                className="
                  font-rethink

                  mt-5

                  max-w-[560px]

                  text-[14px]

                  sm:text-[15px]

                  md:text-[16px]

                  leading-[1.8]

                  text-white/70
                "
              >
                A 1,000-seat open-air amphitheatre and multi-court venue
                designed to elevate competitive sport, cultural engagement, and
                large-scale campus events. A flagship infrastructure milestone
                within the ERAM ecosystem.
              </p>

              {/* buttons */}
              <div
                className="
                  flex
                  flex-col

                  sm:flex-row
                  sm:flex-wrap

                  gap-3

                  md:gap-6

                  mt-7
                "
              >
                {/* PRIMARY BUTTON */}
                {/* <button
                  className="
                    group
                    font-rethink

                    bg-[#ae1431]

                    rounded-[10px]

                    px-5
                    md:px-7

                    py-2.5
                    md:py-3

                    text-[11px]
                    md:text-[12px]

                    tracking-[0.12em]

                    uppercase

                    cursor-pointer

                    text-white

                    flex
                    items-center
                    justify-center

                    gap-2

                    transition-all
                    duration-300

                    hover:bg-[#97112a]
                  "
                >
                  EXPLORE THE ARENA
                  <span
                    className="
                      relative
                      z-10

                      inline-block

                      transition-all
                      duration-300

                      group-hover:translate-x-[5px]
                    "
                  >
                    →
                  </span>
                </button> */}

                <button
  className="
    group
    font-rethink

    inline-flex
    items-center
    justify-center
    gap-2

    bg-[#ae1431]
    text-white

    px-6
    sm:px-7
    md:px-8

    py-3
    md:py-4

    rounded-xl

    text-xs
    sm:text-sm

    font-semibold
    uppercase
    tracking-[0.12em]

    cursor-pointer

    shadow-lg

    transition-all
    duration-300

    hover:bg-black
    hover:shadow-xl
    hover:-translate-y-1
  "
>
  <span>Explore the Arena</span>

  <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
</button>

                {/* SECONDARY BUTTON */}
                {/* <button
                  className="
                    font-rethink

                    border
                    border-white/30

                    rounded-[10px]

                    px-5
                    md:px-7

                    py-2.5
                    md:py-3

                    text-[11px]
                    md:text-[12px]

                    tracking-[0.12em]

                    uppercase

                    flex
                    items-center
                    justify-center

                    gap-2

                    cursor-pointer

                    transition-all
                    duration-300

                    hover:bg-white
                    hover:text-black
                  "
                >
                  HOST AN EVENT
                  <Calendar className="w-4 h-4 opacity-70" />
                </button> */}

                <button
  className="
    font-rethink

    inline-flex
    items-center
    justify-center
    gap-2

    border
    border-white/40

    px-6
    sm:px-7
    md:px-8

    py-3
    md:py-4

    rounded-xl

    text-xs
    sm:text-sm

    font-semibold
    uppercase
    tracking-[0.12em]

    text-white

    cursor-pointer

    transition-all
    duration-300

    hover:bg-white
    hover:text-[#ae1431]
    hover:border-white
    hover:-translate-y-1
  "
>
  <span>Host an Event</span>

  <Calendar
    className="
      w-4 h-4
      md:w-5 md:h-5
      opacity-70
      transition-all
      duration-300
      group-hover:opacity-100
    "
  />
</button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              className="
                mt-2

                md:mt-0

                w-full

                sm:w-[300px]

                lg:w-[280px]

                max-[1024px]:
                max-w-[340px]

                bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))]

                backdrop-blur-md

                border
                border-white/10

                rounded-md

                p-5

                lg:self-start
                lg:ml-0

                font-rethink
              "
            >
              {/* top label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-[1px] bg-[#ae1431]" />

                <p
                  className="
                    text-[10px]

                    tracking-[0.28em]

                    text-[#ae1431]

                    uppercase
                  "
                >
                  At a Glance
                </p>
              </div>

              {/* stats */}
              {[
                ["1,000", "Seating Capacity"],
                ["10,000", "sq. ft. Built-Up Area"],
                ["Open-Air", "Amphitheatre Design"],
                ["38", "High-Intensity LED Floodlights"],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className={`py-3 ${
                    i !== 3 ? "border-b border-white/10" : ""
                  }`}
                >
                  <h3 className="text-[20px] font-rethink  md:text-[22px] ">{title}</h3>

                  <p className="text-[12px] font-display text-white/60 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* =========================
              STATS
          ========================= */}
          <div className="border-t border-white/10 mt-[50px] md:mt-[70px]">
            <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
              <div className="max-w-[1100px] mx-auto px-[16px] sm:px-[20px] md:px-[28px] py-[40px] md:py-[55px]">
                {/* LABEL */}
                <div className=" flex items-center gap-3 mb-[40px] md:mb-[50px]">
                  <p
                    className="
                    font-rethink

                      text-[13px]

                      sm:text-[15px]

                      md:text-[18px]

                      tracking-[0.28em]

                      text-[#ae1431]

                      uppercase
                    "
                  >
                    Infrastructure at a glance
                  </p>
                </div>

                {/* GRID */}
                <div
                  className="
                    grid

                    grid-cols-1

                    sm:grid-cols-2

                    md:grid-cols-4

                    border-t
                    border-white/10
                  "
                >
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

                        py-[28px]

                        sm:py-[32px]

                        md:py-[42px]

                        px-[14px]

                        sm:px-[18px]

                        md:px-[28px]

                        ${i !== 3 ? "md:border-r" : ""}

                        border-white/10
                      `}
                    >
                      {/* RED TOP LINE */}
                      <span className="absolute top-0 left-0 w-[28px] h-[2px] bg-[#a32020]" />

                      {/* VALUE */}
                      <div className="flex items-baseline gap-[10px]">
                        <h3
                          className="
                            font-rethink

                            text-[30px]

                            md:text-[38px]

                            text-[#eae6df]

                            

                            tracking-[-0.01em]
                          "
                        >
                          {item.value}
                        </h3>

                        <span
                          className="
                            text-[14px]

                            md:text-[17px]

                            text-white

                            font-display

                            relative

                            top-[-2px]
                          "
                        >
                          {item.unit}
                        </span>
                      </div>

                      {/* DESCRIPTION */}
                      <p
                        className="
                          mt-[12px]

                          text-[13px]

                          md:text-[14px]

                          text-white

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
