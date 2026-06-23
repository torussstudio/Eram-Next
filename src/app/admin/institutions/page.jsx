"use client";

import React, { useState, useMemo } from "react";
import { 
  School, 
  Search, 
  Grid, 
  List, 
  MapPin, 
  User, 
  GraduationCap, 
  Award, 
  ArrowUpRight,
  Sparkles,
  FileText,
  Filter
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/admin/DashboardComponents";

const institutions = [
  {
    id: "INST-MMHSS",
    name: "MMHSS Palakkad",
    fullName: "M.M. Higher Secondary School",
    type: "school",
    location: "Palakkad, Kerala",
    principal: "Dr. K. Raghavan",
    students: 1200,
    teachers: 54,
    established: 1995,
    rating: "A++ Grade",
    image: "/images/institute.webp",
    desc: "One of the premier higher secondary schools in Palakkad offering state-syllabus streams in Science, Commerce, and Humanities with highly equipped laboratories and smart classrooms."
  },
  {
    id: "INST-MMPS",
    name: "MMPS Palakkad",
    fullName: "M.M. Public School (CBSE)",
    type: "school",
    location: "Palakkad, Kerala",
    principal: "Prof. Geetha Nair",
    students: 850,
    teachers: 42,
    established: 2005,
    rating: "CBSE Affiliated",
    image: "/images/institute.webp",
    desc: "Co-educational CBSE English medium boarding-cum-day school fostering holistic training, design thinking, and early programming initiatives."
  },
  {
    id: "INST-AMLP",
    name: "AMLP School",
    fullName: "Amlp Lower Primary School",
    type: "school",
    location: "Mundur, Palakkad",
    principal: "Mrs. Mini Mathew",
    students: 220,
    teachers: 12,
    established: 1982,
    rating: "State Board Approved",
    image: "/images/institute.webp",
    desc: "Providing strong primary foundations for young learners since 1982. Focused heavily on character molding, primary languages, and basic arithmetic."
  },
  {
    id: "INST-MMITE",
    name: "MMITE Palakkad",
    fullName: "M.M. Industrial Training & Engineering Institute",
    type: "college",
    location: "Palakkad, Kerala",
    principal: "Er. Manoj Joseph",
    students: 180,
    teachers: 18,
    established: 2012,
    rating: "NCVT Approved",
    image: "/images/institute.webp",
    desc: "Technical excellence institute providing job-oriented professional diploma courses, automotive labs, and industrial apprenticeships."
  },
  {
    id: "INST-ARENA",
    name: "ERAM Sports Arena",
    fullName: "ERAM Athletics & Football Academy",
    type: "college",
    location: "Palakkad Campus",
    principal: "Coach V. Sasi",
    students: 260,
    teachers: 10,
    established: 2021,
    rating: "FIFA Quality Fields",
    image: "/images/institute.webp",
    desc: "Elite professional sports training academy featuring FIFA-approved synthetic turf, indoor badminton courts, and professional training sessions."
  }
];

export default function InstitutionsPage() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all' | 'school' | 'college'

  // Filtering Logic memoized
  const filteredInstitutions = useMemo(() => {
    return institutions.filter((inst) => {
      const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            inst.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || inst.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <PageHeader 
        title="Institutions Registry" 
        description="Configure academic parameters, view student rosters, and manage institutional records."
      >
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl text-xs">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-[color,background-color,border-color] duration-200 ${
              viewMode === "grid" 
                ? "bg-zinc-900 text-[#c5a880] border border-zinc-800" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Grid View"
          >
            <Grid size={15} />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-[color,background-color,border-color] duration-200 ${
              viewMode === "list" 
                ? "bg-zinc-900 text-[#c5a880] border border-zinc-800" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="List View"
          >
            <List size={15} />
          </button>
        </div>
      </PageHeader>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Active Centers"
          value="05 Centers"
          change="100% operational"
          changeType="increase"
          icon={School}
        />
        <StatCard
          title="Total Staff"
          value="136 Teachers"
          change="1:18 teacher ratio"
          changeType="increase"
          icon={User}
        />
        <StatCard
          title="Total Enrollment"
          value="2,710 Students"
          change="+184 vs last term"
          changeType="increase"
          icon={GraduationCap}
        />
        <StatCard
          title="System Awards"
          value="A++ Rating"
          change="NCVT & State Compliant"
          changeType="increase"
          icon={Award}
        />
      </div>

      {/* Search & Filters */}
      <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or code..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-[#c5a880]/15 hover:border-[#c5a880]/30 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-xs text-zinc-200 placeholder:text-zinc-600 transition-[border-color,box-shadow] duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Filter size={12} className="text-zinc-500" />
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px]">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-lg font-semibold transition-[color,background-color] duration-200 ${
                filterType === "all" ? "bg-zinc-900 text-[#c5a880]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              All Centers
            </button>
            <button
              onClick={() => setFilterType("school")}
              className={`px-3 py-1 rounded-lg font-semibold transition-[color,background-color] duration-200 uppercase ${
                filterType === "school" ? "bg-zinc-900 text-[#c5a880]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Schools
            </button>
            <button
              onClick={() => setFilterType("college")}
              className={`px-3 py-1 rounded-lg font-semibold transition-[color,background-color] duration-200 uppercase ${
                filterType === "college" ? "bg-zinc-900 text-[#c5a880]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Technical & Sports
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List View Mode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutions.map((inst) => (
            <div 
              key={inst.id} 
              className="bg-zinc-900/40 border border-[#c5a880]/10 hover:border-[#c5a880]/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl group will-change-transform"
            >
              <div>
                {/* Visual Header / Mock Image Grid */}
                <div className="h-32 bg-zinc-950 flex items-center justify-center relative overflow-hidden border-b border-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ae1431]/20 to-transparent z-10" />
                  <School size={48} className="text-[#c5a880]/15 group-hover:scale-110 transition-transform duration-300 z-0" />
                  <div className="absolute top-4 left-4 bg-zinc-900/90 border border-[#c5a880]/15 px-2 py-0.5 rounded text-[9px] font-bold text-[#c5a880] tracking-wider uppercase z-20">
                    Est. {inst.established}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#ae1431]/10 border border-[#ae1431]/30 px-2 py-0.5 rounded text-[9px] font-bold text-[#F5EFE8] uppercase z-20">
                    {inst.rating}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-zinc-200 uppercase tracking-wider font-['Agency'] group-hover:text-[#F5EFE8] transition-colors duration-250">
                      {inst.name}
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-light truncate">{inst.fullName}</p>
                  </div>

                  <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                    {inst.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900 text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <MapPin size={12} className="text-zinc-600" />
                      <span className="truncate">{inst.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500 justify-end">
                      <User size={12} className="text-[#c5a880]" />
                      <span className="truncate font-medium text-zinc-400">{inst.principal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-zinc-950/40 border-t border-zinc-900/50 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#c5a880]">
                  {inst.students} Students
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer">
                    <FileText size={12} />
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[#ae1431]/10 hover:bg-[#ae1431]/20 border border-[#ae1431]/30 rounded-lg text-[10px] font-bold text-[#ae1431] hover:text-[#F5EFE8] transition-[color,background-color,border-color] duration-200 cursor-pointer">
                    <span>Manage</span>
                    <ArrowUpRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View Mode */
        <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#c5a880]/10 bg-zinc-950/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Institution</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Principal</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Enrollment</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Affiliation</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c5a880]/5">
                {filteredInstitutions.map((inst) => (
                  <tr key={inst.id} className="hover:bg-zinc-900/20 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#c5a880]">
                          <School size={16} />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-zinc-200">{inst.name}</span>
                          <span className="text-[10px] text-zinc-500 font-light">Est. {inst.established}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-300 font-medium">{inst.principal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-400 font-light">{inst.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-300 font-semibold">{inst.students} Students</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-[#c5a880] bg-[#c5a880]/5 px-2.5 py-0.5 rounded border border-[#c5a880]/15">
                        {inst.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button className="px-3 py-1.5 bg-[#ae1431]/10 hover:bg-[#ae1431]/20 border border-[#ae1431]/30 rounded-lg text-[10px] font-bold text-[#ae1431] hover:text-[#F5EFE8] transition-[color,background-color,border-color] duration-200 cursor-pointer">
                        Manage Center
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
