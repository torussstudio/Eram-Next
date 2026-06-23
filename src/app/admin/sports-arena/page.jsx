"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Target, 
  Calendar, 
  Users, 
  Plus,
  Play,
  TrendingUp,
  MapPin,
  Clock,
  Activity,
  Award
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/admin/DashboardComponents";

// Mock Programs data
const programs = [
  { id: "PROG-FB", name: "Football Academy", category: "Outdoor", coach: "Coach V. Sasi", capacity: "120/150", schedule: "Mon, Wed, Fri (4:30 PM)", status: "Active" },
  { id: "PROG-ATH", name: "Elite Track & Field", category: "Athletics", coach: "Dr. Sandeep K.", capacity: "45/60", schedule: "Daily (6:00 AM)", status: "Active" },
  { id: "PROG-BD", name: "Indoor Badminton Club", category: "Indoor", coach: "Mrs. Anjali Roy", capacity: "40/40", schedule: "Tue, Thu, Sat (5:00 PM)", status: "Full" },
  { id: "PROG-TT", name: "Table Tennis Training", category: "Indoor", coach: "Mr. Deepak Raj", capacity: "25/30", schedule: "Mon, Fri (4:00 PM)", status: "Active" },
  { id: "PROG-VB", name: "Volleyball Club", category: "Outdoor", coach: "Coach S. Pillai", capacity: "30/45", schedule: "Wed, Sat (4:30 PM)", status: "Active" },
];

// Mock Matches data
const matches = [
  { id: "M-101", title: "ERAM Football Cup Semis", opponent: "Palakkad St. Joseph's", date: "June 26", time: "05:00 PM", venue: "Synthetic Turf Arena" },
  { id: "M-102", title: "Inter-School Athletics Meet", opponent: "District Invitational", date: "June 29", time: "08:30 AM", venue: "Track & Field Oval" },
  { id: "M-103", title: "Badminton Singles Open", opponent: "Internal Tournament", date: "July 03", time: "02:00 PM", venue: "Indoor Court A" },
];

export default function SportsArenaPage() {
  const [showAddProgram, setShowAddProgram] = useState(false);

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <PageHeader 
        title="Sports Arena Console" 
        description="Oversee athletic activities, organize matches, assign coaching staff, and track trainee metrics."
      >
        <button
          onClick={() => setShowAddProgram(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F5EFE8] bg-[#ae1431] hover:bg-[#ae1431]/80 rounded-xl transition-[color,background-color] duration-200 shadow-[0_4px_15px_rgba(174,20,49,0.3)] hover:shadow-none cursor-pointer border border-[#ae1431]/20"
        >
          <Plus size={13} />
          <span>Launch Program</span>
        </button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Active Programs"
          value="06 Disciplines"
          change="+1 New this term"
          changeType="increase"
          icon={Trophy}
        />
        <StatCard
          title="Arena Trainees"
          value="260 Students"
          change="94% attendance avg"
          changeType="increase"
          icon={Users}
        />
        <StatCard
          title="Scheduled Games"
          value="12 Fixtures"
          change="3 home tournaments"
          changeType="increase"
          icon={Calendar}
        />
        <StatCard
          title="Performance Index"
          value="9.2/10 Score"
          change="+4.5% vs last term"
          changeType="increase"
          icon={Target}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Sports Programs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target size={14} className="text-[#c5a880]" />
                Athletic Training Programs
              </span>
              <span className="text-[10px] text-zinc-500 font-semibold">5 Programs Active</span>
            </h3>

            <div className="space-y-3">
              {programs.map((prog) => (
                <div key={prog.id} className="p-4 bg-zinc-950/60 border border-zinc-850 hover:border-[#c5a880]/20 rounded-2xl transition-[border-color] duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-200 group-hover:text-[#F5EFE8] transition-colors duration-200">{prog.name}</span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 uppercase tracking-wider">{prog.category}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-zinc-500 font-light">
                      <span className="flex items-center gap-1">
                        <Users size={10} className="text-[#c5a880]" />
                        <span>Coach: {prog.coach}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>{prog.schedule}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-left sm:text-right">
                      <span className="block text-[10px] text-zinc-500 font-medium">Enrolled Capacity</span>
                      <span className="text-xs font-bold text-zinc-300">{prog.capacity}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      prog.status === "Full"
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    }`}>
                      {prog.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matches & Performance Stats */}
        <div className="space-y-6">
          
          {/* Upcoming Matches */}
          <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-[#c5a880]" />
                Upcoming Matches
              </span>
              <span className="text-[9px] text-[#ae1431] font-bold uppercase tracking-wider bg-[#ae1431]/10 px-2 py-0.5 rounded">Live Fixtures</span>
            </h3>

            <div className="space-y-3">
              {matches.map((match) => (
                <div key={match.id} className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl hover:border-[#c5a880]/20 transition-[border-color] duration-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-300">{match.title}</span>
                    <span className="text-[9px] text-zinc-600 font-semibold">{match.id}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 leading-snug font-light">
                    vs <strong className="font-semibold text-zinc-400">{match.opponent}</strong>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[9px] text-zinc-500 border-t border-zinc-900">
                    <span className="flex items-center gap-1">
                      <MapPin size={9} className="text-[#c5a880]" />
                      {match.venue}
                    </span>
                    <span className="font-semibold text-zinc-400">{match.date} • {match.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics Widget */}
          <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Activity size={14} className="text-[#c5a880]" />
              Arena Vital Stats
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400 font-medium">
                  <span>Weekly Training Hours</span>
                  <span className="text-zinc-200 font-bold">24h / Goal 30h</span>
                </div>
                <div className="w-full bg-zinc-950 border border-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#ae1431] h-full rounded-full" style={{ width: "80%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400 font-medium">
                  <span>Trainee Fitness Benchmark</span>
                  <span className="text-zinc-200 font-bold">92% Met</span>
                </div>
                <div className="w-full bg-zinc-950 border border-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#c5a880] h-full rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-zinc-950/60 border border-zinc-900 rounded-xl mt-4">
                <Award size={16} className="text-[#c5a880]" />
                <div>
                  <span className="block text-[10px] font-bold text-zinc-300">Annual District Trophy</span>
                  <span className="text-[9px] text-zinc-500 font-light">ERAM Football Academy entered finals</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mock Add Program Dialog */}
      {showAddProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">Add Sports Discipline</h3>
              <button onClick={() => setShowAddProgram(false)} className="text-zinc-500 hover:text-zinc-200 text-lg">
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Discipline Title</label>
                <input type="text" placeholder="e.g. Lawn Tennis" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Assigned Coach</label>
                <input type="text" placeholder="e.g. Coach Raghav" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Capacity Limit</label>
                  <input type="number" placeholder="50" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Type</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none">
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Athletics</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#c5a880]/15 flex justify-end gap-2 bg-zinc-950">
              <button onClick={() => setShowAddProgram(false)} className="px-4 py-2 bg-zinc-900 text-zinc-400 rounded-xl text-xs font-semibold cursor-pointer">
                Cancel
              </button>
              <button onClick={() => setShowAddProgram(false)} className="px-4 py-2 bg-[#ae1431] text-[#F5EFE8] rounded-xl text-xs font-semibold cursor-pointer">
                Launch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
