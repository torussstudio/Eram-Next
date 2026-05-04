import { shell } from "../../../../constants/homeStyles";

const bullets = [
  "Real-time attendance updates",
  "Academic progress monitoring",
  "Department-wise announcements",
  "Real-time notice sharing",
];

const messages = [
  {
    emoji: "📋",
    tag: "Academic Update",
    text: "Grade 11 Commerce — Unit Test 3 results uploaded. Average: 78%. 4 students flagged for additional support.",
    meta: "Today · 8:42 AM · Academic Monitoring",
    accent: true,
  },
  {
    emoji: "✅",
    tag: "Attendance",
    text: "Your ward was present today. Morning study session attendance: 100%.",
    meta: "Today · 7:05 AM · Attendance System",
    accent: false,
  },
  {
    emoji: "📣",
    tag: "Notice",
    text: "Crash course for Biology Practical begins Monday. Attendance mandatory for all Grade 12 students.",
    meta: "Yesterday · 5:30 PM · Biology Dept.",
    accent: true,
  },
  {
    emoji: "🏆",
    tag: "Recognition",
    text: "Diya Maryam (Gr. 11) — National Level Wushu Championship. 1st Place. Congratulations!",
    meta: "2 days ago · School Management",
    accent: false,
  },
];

export default function ParentPartnership() {
  return (
    <section className={`${shell} bg-[#F5EFE8]`}>
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* LEFT COLUMN */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase font-medium">
                Parent Partnership
              </p>
            </div>

            <h2
              className="font-serif text-[#1a1209] leading-[1.05] tracking-[-0.02em]
  text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px]"
            >
              Discipline &amp; Communication as Accountability
            </h2>

            <div className="w-10 h-[2px] bg-[#F5EFE8] mt-6 mb-8" />

            <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#3d3128] max-w-[560px]">
              The institution maintains a mandatory WhatsApp-based communication
              system to ensure parents are continuously informed — making parent
              engagement institutional, not incidental.
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[14px] md:text-[15px] text-[#3d3128]"
                >
                  <span className="w-[6px] h-[6px] rounded-full bg-[#ae1431] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-7 font-serif italic text-[14px] sm:text-[15px] text-[#9a8f84]">
              No student goes unnoticed. No parent remains uninformed.
            </p>

            <div className="mt-8">
              <button
                className="bg-[#1a1209] text-white text-[11px] sm:text-[12px] tracking-[0.14em] uppercase
                px-7 py-4 flex items-center gap-3 cursor-pointer hover:bg-[#2e2318] transition-colors"
              >
                Access Parent Portal
                <span className="text-[15px]">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN — WhatsApp mockup */}
          {/* Outer dark wrapper with padding */}
          <div className="w-full rounded-[14px] bg-[#181818] p-4 shadow-2xl">
            {/* Channel header — red rounded bar */}
            <div className="bg-[#ae1431] rounded-[6px] px-5 py-4 mb-3">
              <p className="text-white font-semibold text-[13px] sm:text-[14px] tracking-[0.01em]">
                MMHSS Parent Communication Channel
              </p>
            </div>

            {/* Message cards — separate with gap */}
            <div className="flex flex-col gap-[6px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`bg-[#242424] rounded-[5px] px-4 py-4
                    ${msg.accent ? "border-l-[3px] border-[#ae1431]" : "border-l-[3px] border-transparent"}`}
                >
                  <p className="text-[13px] sm:text-[14px] text-[#c8c0b8] leading-[1.65]">
                    <span className="mr-1">{msg.emoji}</span>
                    <span className="font-semibold text-white">
                      {msg.tag}:
                    </span>{" "}
                    {msg.text}
                  </p>
                  <p className="text-[11px] text-[#5e554e] mt-2 tracking-[0.02em]">
                    {msg.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
