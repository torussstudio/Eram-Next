"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Search,
  Download,
  FileText,
  BookOpen,
  FileQuestion,
  CreditCard,
  Receipt,
  History,
} from "lucide-react";

type InstitutionKey = "AMLP" | "MMPS" | "MMHSS" | "EASE" | "MMITE";

type NoticeCategory =
  | "Academic"
  | "Examination"
  | "Events"
  | "Administrative"
  | "Academics"
  | "Training"
  | "Professional";

type ResourceType =
  | "Question Paper"
  | "Study Material"
  | "Worksheet"
  | "Course Material";

type Resource = {
  id: number;
  title: string;
  type: ResourceType;
  size: string;
};

type Notice = {
  id: number;
  title: string;
  date: string;
  category: NoticeCategory;
};

const StudentParentPortal = () => {
  const [selectedInstitution, setSelectedInstitution] =
    useState<keyof typeof resources>("MMPS");

  const [searchQuery, setSearchQuery] = useState("");

  const institutions: {
    id: InstitutionKey;
    name: string;
    full: string;
  }[] = [
    { id: "AMLP", name: "AMLP", full: "AMLP (Lower Primary)" },
    { id: "MMPS", name: "MMPS", full: "MMPS (High School)" },
    { id: "MMHSS", name: "MMHSS", full: "MMHSS (Higher Secondary)" },
    { id: "EASE", name: "EASE", full: "EASE (CBSE)" },
    { id: "MMITE", name: "MMITE", full: "MMITE (Teacher Training)" },
  ];

  const notices: Record<InstitutionKey, Notice[]> = {
    AMLP: [
      {
        id: 1,
        title: "Summer Vacation Schedule 2026-27",
        date: "May 15, 2026",
        category: "Academic",
      },
      {
        id: 2,
        title: "Annual Sports Day Registration Open",
        date: "May 12, 2026",
        category: "Events",
      },
      {
        id: 3,
        title: "New Library Resources Available",
        date: "May 10, 2026",
        category: "Academic",
      },
    ],
    MMPS: [
      {
        id: 1,
        title: "Final Exam Schedule Released",
        date: "May 18, 2026",
        category: "Examination",
      },
      {
        id: 2,
        title: "Science Fair - Project Submission Deadline",
        date: "May 20, 2026",
        category: "Events",
      },
      {
        id: 3,
        title: "Parent-Teacher Meeting Schedule",
        date: "May 16, 2026",
        category: "Administrative",
      },
    ],
    MMHSS: [
      {
        id: 1,
        title: "Board Exam Results Declaration",
        date: "May 25, 2026",
        category: "Examination",
      },
      {
        id: 2,
        title: "College Counseling Sessions Begin",
        date: "May 19, 2026",
        category: "Academics",
      },
      {
        id: 3,
        title: "Inter-School Cultural Competition",
        date: "May 22, 2026",
        category: "Events",
      },
    ],
    EASE: [
      {
        id: 1,
        title: "CBSE Unit Test Schedule",
        date: "May 17, 2026",
        category: "Examination",
      },
      {
        id: 2,
        title: "Field Trip - Science Museum Visit",
        date: "May 21, 2026",
        category: "Events",
      },
      {
        id: 3,
        title: "Mid-term Assessment Results",
        date: "May 14, 2026",
        category: "Academic",
      },
    ],
    MMITE: [
      {
        id: 1,
        title: "Teacher Training Module 3 Begins",
        date: "May 20, 2026",
        category: "Training",
      },
      {
        id: 2,
        title: "WHO Certification Workshop",
        date: "May 23, 2026",
        category: "Professional",
      },
      {
        id: 3,
        title: "Practicum Placement Schedules",
        date: "May 16, 2026",
        category: "Academic",
      },
    ],
  };

  const resources: Record<InstitutionKey, Resource[]> = {
    AMLP: [
      {
        id: 1,
        title: "Mathematics Study Materials - Grade 3",
        type: "Study Material",
        size: "2.4 MB",
      },
      {
        id: 2,
        title: "English Language Arts Guide",
        type: "Study Material",
        size: "1.8 MB",
      },
      {
        id: 3,
        title: "Science Activity Worksheets",
        type: "Worksheet",
        size: "3.1 MB",
      },
    ],
    MMPS: [
      {
        id: 1,
        title: "Previous Year Math Question Papers 2024",
        type: "Question Paper",
        size: "4.2 MB",
      },
      {
        id: 2,
        title: "Physics Lab Manual",
        type: "Study Material",
        size: "2.7 MB",
      },
      {
        id: 3,
        title: "History Notes and Summaries",
        type: "Study Material",
        size: "1.9 MB",
      },
      {
        id: 4,
        title: "Chemistry Practice Problems",
        type: "Worksheet",
        size: "2.1 MB",
      },
    ],
    MMHSS: [
      {
        id: 1,
        title: "JEE Main Previous Year Papers",
        type: "Question Paper",
        size: "5.8 MB",
      },
      {
        id: 2,
        title: "Biology Revision Notes",
        type: "Study Material",
        size: "3.4 MB",
      },
      {
        id: 3,
        title: "Economics Case Studies",
        type: "Study Material",
        size: "2.2 MB",
      },
      {
        id: 4,
        title: "English Literature Summary",
        type: "Study Material",
        size: "1.6 MB",
      },
    ],
    EASE: [
      {
        id: 1,
        title: "CBSE Sample Papers 2026",
        type: "Question Paper",
        size: "6.1 MB",
      },
      {
        id: 2,
        title: "Mathematics Formula Sheet",
        type: "Study Material",
        size: "1.2 MB",
      },
      {
        id: 3,
        title: "Social Science Project Guidelines",
        type: "Worksheet",
        size: "2.8 MB",
      },
    ],
    MMITE: [
      {
        id: 1,
        title: "Curriculum Design Framework",
        type: "Course Material",
        size: "3.9 MB",
      },
      {
        id: 2,
        title: "Assessment Methods Guide",
        type: "Study Material",
        size: "2.3 MB",
      },
      {
        id: 3,
        title: "WHO Teacher Training Modules",
        type: "Course Material",
        size: "7.2 MB",
      },
    ],
  };

  const filteredResources = resources[selectedInstitution].filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const categoryColors = {
    Academic: "bg-blue-50 text-blue-700 border border-blue-100",
    Examination: "bg-red-50 text-red-700 border border-red-100",
    Events: "bg-green-50 text-green-700 border border-green-100",
    Administrative: "bg-amber-50 text-amber-700 border border-amber-100",
    Academics: "bg-blue-50 text-blue-700 border border-blue-100",
    Training: "bg-purple-50 text-purple-700 border border-purple-100",
    Professional: "bg-indigo-50 text-indigo-700 border border-indigo-100",
  };

  const resourceIcons = {
    "Question Paper": (
      <FileQuestion className="text-red-700 shrink-0" size={22} />
    ),
    "Study Material": <BookOpen className="text-blue-700 shrink-0" size={22} />,
    Worksheet: <FileText className="text-green-700 shrink-0" size={22} />,
    "Course Material": (
      <FileText className="text-purple-700 shrink-0" size={22} />
    ),
  };

  return (
    <div className="min-h-screen bg-[#F5EFE8] ">
      {/* ── Hero ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-rethink tracking-widest text-[#ae1431] uppercase mb-3">
                ERAM Group of Institutions
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-gray-900 leading-tight mb-3">
                Student &amp; Parent Portal
              </h1>
              <p className="text-base sm:text-lg font-medium text-gray-700 mb-3">
                Structured Access. Centralised Communication.
              </p>
              <p className="text-sm font-rethink sm:text-base text-gray-600 leading-relaxed mb-6">
                Centralised access for fees, academic updates, institutional
                resources, and administrative information for students and
                parents across the ERAM ecosystem.
              </p>
              <button className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[#ae1431] text-white hover:bg-black text-sm font-rethink uppercase tracking-wide rounded-xl  active:scale-95 transition-all">
                Proceed to Full Portal <ChevronRight size={18} />
              </button>
            </div>

            {/* Hero visual placeholder */}
            <div className="hidden md:flex bg-white/60 border border-gray-200 h-64 lg:h-80 rounded-2xl items-center justify-center shadow-sm">
              <div className="text-center text-gray-400">
                <FileText size={56} className="mx-auto mb-3 opacity-25" />
                <p className="text-sm opacity-40">Portal Hero Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fees Portal ── */}
      <section className="pb-10 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-display text-gray-900 mb-1">
              Fees Portal
            </h2>
            <p className="text-red-700 text-base font-rethink mb-6">
              Online Payment &amp; Records
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {[
                {
                  icon: <CreditCard size={20} />,
                  title: "Secure Online Fee Payment",
                  desc: "Safe and encrypted payment gateway",
                },
                {
                  icon: <Receipt size={20} />,
                  title: "Receipt & Invoice Download",
                  desc: "Instant digital receipts for all payments",
                },
                {
                  icon: <History size={20} />,
                  title: "Payment History Access",
                  desc: "Complete transaction records",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/50 rounded-xl p-4"
                >
                  <div className="mt-0.5 text-red-700 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-display text-gray-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-gray-600 font-rethink text-xs mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className=" cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[#ae1431] text-white text-sm font-rethink uppercase tracking-wide rounded-xl hover:bg-black active:scale-95 transition-all ">
              Proceed to Fees Portal <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Institution Selection + Notices ── */}
      <section className="pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-gray-500 text-2xl font-rethink text-center mb-6">
            Select Your Institution
          </p>
          {/* Tab strip */}
          <div className="flex w-full border-b-[0.5px] border-gray-200 overflow-x-auto scrollbar-hide mb-[30px]">
            {institutions.map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstitution(inst.id)}
                className={`relative flex-1 py-2.5 text-[20px] whitespace-nowrap text-center 
        cursor-pointer transition-colors bg-transparent border-none
        after:absolute after:bottom-[-0.9px] after:left-0 after:right-0 
        after:h-[3.5px] after:rounded-t-sm after:transition-colors
        ${
          selectedInstitution === inst.id
            ? "text-[#ae1431] font-medium after:bg-[#ae1431]"
            : "text-gray-500 hover:text-gray-800 after:bg-transparent"
        }`}
              >
                {inst.name}
              </button>
            ))}
          </div>
          <br />
          {/* Notices */}
          <h3 className="text-xl sm:text-2xl font-display text-gray-900 mb-1">
            Institutional Notices &amp; Updates
          </h3>
          <p className="text-gray-500 font-rethink mb-5">
            Key announcements from{" "}
            <span className="font-rethink text-gray-700">
              {institutions.find((i) => i.id === selectedInstitution)?.full}
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices[selectedInstitution].map((notice) => (
              <div
                key={notice.id}
                className="bg-white border font-rethink border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    categoryColors[notice.category] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {notice.category}
                </span>
                <h4 className="text-gray-900 font-display text-sm leading-snug mt-3 mb-2">
                  {notice.title}
                </h4>
                <p className="font-rethink text-gray-400">{notice.date}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 border-2 bg-[#ae1431] text-white border-[#ae1431] text-[#ae1431] hover:border-black text-sm font-rethink rounded-xl hover:bg-black transition-colors cursor-pointer">
            View All Notices <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Download Centre ── */}
      <section className="pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-display text-gray-900 mb-1">
            Download Centre
          </h2>
          <p className="text-gray-500 text-sm mb-6">Academic Resources</p>

          {/* Search */}
          <div className="relative mb-2">
            <Search
              className="absolute left-3.5 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search study materials, question papers, assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border font-rethink border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Searching resources for{" "}
            <span className="font-rethink text-gray-600">
              {institutions.find((i) => i.id === selectedInstitution)?.full}
            </span>
          </p>

          {/* Resources list */}
          <div className="space-y-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-sm transition-shadow group cursor-pointer"
                >
                  <div className="shrink-0">{resourceIcons[resource.type]}</div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm text-gray-900 group-hover:text-red-700 transition-colors truncate">
                      {resource.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-md font-rethink">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {resource.size}
                      </span>
                    </div>
                  </div>

                  <button className="shrink-0 p-2.5 bg-[#ae1431] text-white rounded-lg hover:bg-black active:scale-95 transition-all">
                    <Download size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-14 bg-white border border-gray-200 rounded-xl">
                <Search size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600 font-rethink text-sm">
                  No resources found
                </p>
                <p className="text-gray-400 font-rethink mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </div>

          {filteredResources.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-5">
              Showing {filteredResources.length} resource
              {filteredResources.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5EFE8] pb-16 sm:pb-20">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
    <h2 className="text-2xl sm:text-4xl font-display text-black mb-3">
      Take the Next Step
    </h2>

    <p className="text-black font-rethink sm:text-lg mb-7 max-w-xl mx-auto">
      Explore our institutions, meet our educators, and experience the
      ERAM campus firsthand as you discover the learning environment
      that's right for you.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ae1431] text-white hover:bg-black text-sm font-rethink uppercase tracking-wide rounded-xl cursor-pointer transition-colors">
        Admissions Open 2026–27
        <ChevronRight size={20} />
      </button>

      <button className="inline-flex items-center gap-2 px-8 py-3.5 border border-black text-black hover:bg-black hover:text-white text-sm font-rethink uppercase tracking-wide rounded-xl cursor-pointer transition-colors">
        Plan a Campus Visit
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
</section>
    </div>
  );
};

export default StudentParentPortal;
