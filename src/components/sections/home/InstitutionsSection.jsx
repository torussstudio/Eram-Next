

import MarqueeText from "../../ui/Marquee";

export default function InstitutionsSection() {
  const institutions = [
    { title: "EASE (CBSE)" },
    { title: "MMPS (HS)" },
    { title: "MMHSS (Hr. Sec)" },
    { title: "AMLP (LP)" },
    { title: "MMITE (TTI)" },
  ];

  return (
    <section id="courses" className="bg-[#f5efe8] pt-[40px] pb-[120px]">
      <div className="mx-auto max-w-[1180px] px-[24px] max-[640px]:px-[16px]">
        <MarqueeText />

        {/* heading */}
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className=" font-display text-[44px] font-semibold tracking-[-0.02em] text-[#111] max-[900px]:text-[32px] max-[640px]:text-[26px]">
            The ERAM Learning Continuum
          </h2>

          <p className="mx-auto mt-[18px] max-w-[820px] text-[18px] leading-[1.65] text-black max-[640px]:text-[15px]">
            <span className="text-[#111] font-medium">
              An ecosystem designed to guide students from foundation to formation.
            </span>
            <br />
            From foundational schooling to teacher training, each institution strengthens a different stage of the learner’s journey.
          </p>
        </div>

        {/* cards */}
        <div className="mt-[70px] grid grid-cols-6 gap-[36px] max-[1100px]:grid-cols-4 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1 max-[640px]:mt-[48px] max-[640px]:gap-[20px]">
          {institutions.map((item, i) => (
            <div
              key={i}
              className="
              col-span-2 rounded-[26px] border border-black bg-white p-[18px]
              [&:nth-child(4)]:col-start-2
              [&:nth-child(5)]:col-start-4
              max-[1100px]:col-span-2
              max-[1100px]:[&:nth-child(4)]:col-start-auto
              max-[1100px]:[&:nth-child(5)]:col-start-auto
              max-[640px]:rounded-[20px]
              max-[640px]:p-[14px]
              "
            >
              {/* image */}
              <div className="flex h-[260px] items-center justify-center rounded-[18px] bg-[#f5efe8] max-[640px]:h-[200px] max-[640px]:rounded-[14px]">
                <svg width="36" height="36" opacity="0.35">
                  <rect width="36" height="36" fill="#999"/>
                </svg>
              </div>

              {/* title */}
              <h3 className="mt-[22px] text-[20px] font-[500] tracking-[0.02em] text-[#111] max-[640px]:mt-[16px] max-[640px]:text-[18px]">
                {item.title}
              </h3>

              {/* link */}
              <button
                className="mt-[14px] inline-block border-b-[2px] border-[#6d6d6d] pb-[3px] text-[13px] uppercase tracking-[0.14em] text-[#6d6d6d] transition-all hover:border-black hover:text-black"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}