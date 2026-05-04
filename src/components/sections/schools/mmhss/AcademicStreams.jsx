import { shell } from "../../../../constants/homeStyles";
import { FlaskConical, Monitor, BarChart2 } from "lucide-react";

const streams = [
  {
    icon: <FlaskConical size={18} />,
    title: "Biology Science",
    sub: "State Board · Science Stream",
  },
  {
    icon: <Monitor size={18} />,
    title: "Computer Science",
    sub: "State Board · Science Stream",
  },
  {
    icon: <BarChart2 size={18} />,
    title: "Commerce",
    sub: "State Board · Commerce Stream",
  },
];

const supportItems = [
  [
    "Categorized student attention by performance bracket",
    "Morning study sessions before regular classes",
  ],
  [
    "Supervised special study classes after hours",
    "Crash courses for critical syllabus portions",
  ],
  ["Special question practice modules", "Exam-oriented revision cycles"],
  [
    "Structured monitoring & internal assessment",
    "Teacher-guided mentorship per student",
  ],
];

export default function AcademicStreams() {
  return (
    <section className={`${shell} bg-[#1a1a1a]`}>
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase font-medium">
                Academic Structure
              </p>
            </div>

            <h2
              className="font-serif text-white leading-[1.05] tracking-[-0.02em]
              text-[38px] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[62px]"
            >
              Multiple Streams.
              <br />
              One Discipline
              <br />
              Framework.
            </h2>

            <div className="w-10 h-[2px] bg-[#1a1a1a] mt-6 mb-8" />

            <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#a09488] max-w-[560px]">
              MMHSS offers Higher Secondary education under the State syllabus
              across three focused streams. Our strength lies not just in what
              we teach, but in how we execute it — guiding, supervising, and
              supporting every student at every stage.
            </p>

            {/* Streams list */}
            <div className="mt-8 border border-white/10 rounded-sm overflow-hidden">
              {streams.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-5
                    ${i !== streams.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <div className="w-9 h-9 bg-[#ae1431] rounded-sm flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-[16px] sm:text-[17px] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-white/40 mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col">
            <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#6b5f54] uppercase mb-4 hidden lg:block">
              Academic Support Systems
            </p>

            {/* Gap-based separate cards */}
            <div className="flex flex-col gap-1">
              {supportItems.map(([left, right], i) => (
                <div key={i} className="grid grid-cols-2 gap-1">
                  <div className="bg-[#252525] border-l-2 border-[#ae1431] px-5 py-5">
                    <p className="text-[13px] sm:text-[14px] text-[#c4b9ae] leading-[1.65]">
                      {left}
                    </p>
                  </div>
                  <div className="bg-[#252525] border-l-2 border-[#ae1431] px-5 py-5">
                    <p className="text-[13px] sm:text-[14px] text-[#c4b9ae] leading-[1.65]">
                      {right}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
