import { ArrowRight } from "lucide-react";

export default function CommunicationPortal() {
  return (
    <div className="min-h-screen bg-[#ae1431] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase text-white/70">
              Communication Portal
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
            Centralised Access. Structured Communication.
          </h1>

          <p className="text-white/80 max-w-xl mb-4">
            Academic monitoring and parent communications extend beyond the
            classroom through a unified digital interface — designed as a single
            point of coordination across all ERAM institutions.
          </p>

          <p className="text-white/80 max-w-xl mb-10">
            The portal ensures clarity, accountability, and timely communication
            for every student, teacher, and parent.
          </p>

          {/* GRID */}
          <div className="bg-[#ae1431] p-[1px] mb-10">
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="bg-[#7a1410] p-8">
                <span className="text-xs text-white/50">/01</span>
                <h3 className="mt-3 font-serif font-bold text-white">
                  Academic Monitoring
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Real-time progress tracking across all subjects
                </p>
              </div>

              <div className="bg-[#7a1410] p-8">
                <span className="text-xs text-white/50">/02</span>
                <h3 className="mt-3 font-serif font-bold text-white">
                  Attendance Updates
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Daily attendance communicated directly to parents
                </p>
              </div>

              <div className="bg-[#7a1410] p-8">
                <span className="text-xs text-white/50">/03</span>
                <h3 className="mt-3 font-serif font-bold text-white">
                  Department Notices
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Stream-specific announcements and circulars
                </p>
              </div>

              <div className="bg-[#7a1410] p-8">
                <span className="text-xs text-white/50">/04</span>
                <h3 className="mt-3 font-serif font-bold text-white">
                  Extended Access
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Available across all 5 ERAM institutions
                </p>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button className="bg-white text-[#ae1431] px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
            Access the Parent Portal
            <ArrowRight size={16} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#ae1431] p-6">
          <div className="text-sm text-white/70 bg-[#5a0e0e] px-4 py-3 mb-[2px]">
            MMHSS — Live Communication Feed
          </div>

          <div className="bg-[#ae1431] p-[1px]">
            <div className="flex flex-col gap-[2px]">
              <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0"></span>
                <div>
                  <p className="text-sm">
                    Grade 12 Biology — Crash Course Week 2 begins tomorrow.
                  </p>
                  <span className="text-xs text-white/50">
                    Academic · 2 minutes ago
                  </span>
                </div>
              </div>

              <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
                <span className="w-2 h-2 mt-2 rounded-full bg-yellow-400 shrink-0"></span>
                <div>
                  <p className="text-sm">
                    3 students flagged for attendance review in Commerce stream.
                  </p>
                  <span className="text-xs text-white/50">
                    Attendance · 18 minutes ago
                  </span>
                </div>
              </div>

              <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
                <span className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"></span>
                <div>
                  <p className="text-sm">
                    Internal Assessment scores updated for Grade 11 Comp.
                    Science.
                  </p>
                  <span className="text-xs text-white/50">
                    Assessment · 1 hour ago
                  </span>
                </div>
              </div>

              <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
                <span className="w-2 h-2 mt-2 rounded-full bg-yellow-400 shrink-0"></span>
                <div>
                  <p className="text-sm">
                    Parent-Teacher meeting scheduled for 12 May 2026, 10 AM.
                  </p>
                  <span className="text-xs text-white/50">
                    Notice · 3 hours ago
                  </span>
                </div>
              </div>

              <div className="bg-[#7a1410] py-4 px-3 flex gap-3 border-l-2 border-transparent hover:border-white/40 transition-all duration-200">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0"></span>
                <div>
                  <p className="text-sm">
                    Monsoon disease prevention awareness drive — results shared.
                  </p>
                  <span className="text-xs text-white/50">
                    NSS / Community · Yesterday
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
