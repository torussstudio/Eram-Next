"use client";

import Link from "next/link";

export default function CommunitySection() {
  return (
    <section className="bg-[#F5EFE8] py-[80px] md:py-[100px] px-[16px] sm:px-[20px] md:px-[28px]">
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
        <div
          className="
      max-w-[1100px] mx-auto
      px-[16px] sm:px-[20px] md:px-[28px]
    "
        >
          <div className="grid md:grid-cols-2 gap-[60px] md:gap-[80px] items-start">
            {/* LEFT SIDE */}
            <div>
              {/* LABEL */}
              <div className="flex items-center gap-3 mb-6">
                {/* <span className="w-6 h-[1px] bg-[#ae1431]"></span> */}
                <p className="font-rethink text-[12px] tracking-[0.25em] text-[#ae1431] uppercase">
                  A venue for the wider community
                </p>
              </div>

              {/* HEADING */}
              <h2 className="font-display text-[34px] sm:text-[42px] md:text-[54px] leading-[1.15] text-[#1a1a1a] mb-6">
                Open Beyond <br /> the Campus.
              </h2>

              {/* TEXT */}
              <p className="font-rethink text-[14.5px] text-[#4a433c] leading-[1.8] max-w-[520px] mb-6">
                The ERAM Sports Arena extends beyond institutional use. It is
                open for external bookings, welcoming a wide range of
                large-scale events and community gatherings.
              </p>

              <p className="font-rethink text-[14.5px] text-[#4a433c] leading-[1.8] max-w-[520px] mb-8">
                By positioning the campus as an accessible venue for sport,
                culture, and community, the Arena strengthens ERAM's presence
                within the wider region — as an institution that serves beyond
                its walls.
              </p>

              {/* BUTTON */}
              <Link
                href="/contact"
                className="
    group
    bg-[#111]
    rounded-[12px]
    font-rethink
    text-white
    px-[22px]
    py-[14px]
    text-[12px]
    tracking-[0.18em]
    uppercase
    inline-flex
    items-center
    gap-3
    hover:bg-[#ae1431]
    hover:text-black
    transition-all duration-300
    cursor-pointer
  "
              >
                Enquire About Hosting
                <span
                  className="
      relative z-10
      inline-block
      transition-all duration-300
      group-hover:translate-x-[5px]
    "
                >
                  →
                </span>
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {/* TITLE */}
              <p className="text-[12px] tracking-[0.25em] text-[#7d746c] uppercase mb-6 text-center md:text-left">
                Events We Welcome
              </p>

              {/* GRID */}
              <div className="overflow-hidden rounded-[24px] border border-[#cfc6bb]">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {cards.map((card, i) => (
                    <div
                      key={i}
                      className={`
          font-rethink
          p-[22px] md:p-[26px]
          bg-[#f5f2ed]
          min-h-[140px]
          flex flex-col justify-center

          transition-all duration-300 ease-out
          cursor-pointer

          hover:bg-[#ae1431]
          hover:text-white

          ${i % 2 === 0 ? "sm:border-r" : ""}
          ${i < 2 ? "sm:border-b" : ""}
          border-[#cfc6bb]
        `}
                    >
                      <div className="text-[20px] mb-[10px]">{card.icon}</div>

                      <h3 className="text-[16px] font-display text-[#1a1a1a] mb-[4px]">
                        {card.title}
                      </h3>

                      <p className="text-[14px] font-rethink text-[#7d746c]">
                        {card.desc}
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

/* DATA */
const cards = [
  {
    icon: "🏆",
    title: "Inter-School Tournaments",
    desc: "Multi-sport competitive formats",
  },
  {
    icon: "🏅",
    title: "District-Level Competitions",
    desc: "Regional qualifying events",
  },
  {
    icon: "🎭",
    title: "Cultural Festivals",
    desc: "Performances & celebrations",
  },
  {
    icon: "👥",
    title: "Public Gatherings",
    desc: "Convocations & community events",
  },
];
