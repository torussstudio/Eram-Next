import { ArrowRight } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <div className="font-sans">
      {/* TOP RED BORDER */}
      <div className="h-1 bg-[#8B1A14]" />

      {/* HERO SECTION */}
      <section className="bg-[#F5EFE8] px-10 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* LEFT */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[1.5px] bg-[#8B1A14]" />
              <span className="text-xs tracking-widest uppercase text-[#8B1A14] font-medium">
                Admissions 2026–27
              </span>
            </div>

            <h1 className="font-serif text-[#1a1209] text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] mb-8 whitespace-nowrap">
              Begin the Journey at MMHSS.
            </h1>

            <p className="text-[#3a3228] text-base leading-relaxed max-w-sm">
              Admissions are now open for Higher Secondary streams — Biology
              Science, Computer Science, and Commerce. Join an institution with
              a proven record of academic excellence, structured discipline, and
              consistent results.
            </p>
          </div>

          {/* RIGHT — BUTTONS */}
          <div className="flex flex-col gap-3 lg:min-w-[280px]">
            <button className="bg-[#8B1A14] text-white px-6 py-4 text-xs tracking-widest uppercase flex items-center justify-between gap-4 hover:bg-[#7a1410] transition-colors cursor-pointer">
              Apply Now — 2026–27
              <ArrowRight size={14} />
            </button>
            <button className="border border-[#1a1209] text-[#1a1209] px-6 py-4 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
              Book a Campus Visit
            </button>
          </div>
        </div>
      </section>

      {/* INSTITUTIONS SECTION */}
      <section className="bg-[#F5EFE8] px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-[#6b6256] mb-6">
            Explore All ERAM Institutions
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1 border border-[#c4bdb3]">
            <div className="bg-white border-r border-[#c4bdb3] p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
              <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
                LP School
              </p>
              <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
                AMLP
              </p>
              <p className="text-xs text-[#6b6256] group-hover:text-white/60">
                Aided Mappila LP School
              </p>
            </div>

            <div className="bg-white border-r border-[#c4bdb3] p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
              <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
                High School
              </p>
              <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
                MMPS
              </p>
              <p className="text-xs text-[#6b6256] group-hover:text-white/60">
                Mariyumma Memorial Public School
              </p>
            </div>

            {/* ACTIVE — no hover */}
            <div className="bg-[#8B1A14] border-r border-[#7a1410] p-6">
              <p className="text-[10px] tracking-widest uppercase text-white/60 mb-3">
                Higher Secondary
              </p>
              <p className="font-serif text-white text-xl font-bold mb-1">
                MMHSS
              </p>
              <p className="text-xs text-white/70">
                Mariyumma Memorial Hr. Sec. School
              </p>
            </div>

            <div className="bg-white border-r border-[#c4bdb3] p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
              <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
                CBSE School
              </p>
              <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
                EASE
              </p>
              <p className="text-xs text-[#6b6256] group-hover:text-white/60">
                ERAM Academy for Sports & Excellence
              </p>
            </div>

            <div className="bg-white p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors">
              <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3">
                Teacher Training
              </p>
              <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1">
                MMITE
              </p>
              <p className="text-xs text-[#6b6256] group-hover:text-white/60">
                Mariyumma Memorial Institute of Teacher Ed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
