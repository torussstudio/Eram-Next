"use client";

interface FocusItem {
  title: string;
}

const ITEMS: FocusItem[] = [
  { title: "Structured practice teaching exposure" },
  { title: "Internship in NCERT-aligned leading schools" },
  {
    title:
      "A 15-day residential camp focused on empathy, adaptability, and self-sustaining leadership",
  },
  { title: "A secular and inclusive institutional culture" },
];

function AcademicFocusSection() {
  return (
    <section className="relative -mt-10 rounded-[28px] bg-[#F5EFE8] px-8 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Heading */}
        <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] text-neutral-900">
          Discipline, Mentorship & <br /> Professional Formation
        </h2>

        {/* Intro paragraph */}
        <p className="font-rethink mt-5 max-w-2xl text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
          At MMITE, teacher formation is deliberate and supervised. With a
          limited intake of 50 students per batch, mentorship remains focused
          and individualised. Academic progress is continuously monitored, and
          practical training is integrated throughout the course duration.
          Distinctive elements include:
        </p>

        {/* Divider */}
        <div className="mt-10 flex items-end justify-between gap-6 border-b border-neutral-900/10 pb-4">
          <span className="text-[14px] sm:text-[15px] uppercase tracking-[0.25em] text-[#ae1431] font-display">
            Academic Focus
          </span>
        </div>

        {/* Items grid */}
        <div className="relative mt-10">
          <div className="flex flex-wrap">
            {ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="relative w-1/2 shrink-0 pl-6 pr-6 mb-10 first:pl-0 sm:w-1/3 sm:mb-0 lg:w-1/4"
              >
                {idx !== 0 && (
                  <span className="absolute left-0 top-0 h-28 w-px bg-neutral-900/10" />
                )}

                <span className="font-rethink block text-[15px] text-black">
                  /{String(idx + 1).padStart(2, "0")}
                </span>

                <h3 className="font-rethink mt-15 pr-2 text-[15px] sm:text-[18px] leading-snug text-neutral-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicFocusSection;