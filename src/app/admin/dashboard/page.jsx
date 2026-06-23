"use client";

import React from "react";
import Link from "next/link";
import { 
  School, 
  Users, 
  Trophy, 
  Image as ImageIcon,
  Plus, 
  FileText, 
  Send,
  Calendar,
  Clock,
  Sparkles,
  Server,
  Database,
  Cloud,
  CheckCircle2,
  Settings,
  ShieldAlert
} from "lucide-react";
import { PageHeader, StatCard, ChartCard, ActivityFeed } from "@/components/admin/DashboardComponents";

// Simulated activities
const recentActivities = [
  {
    id: 1,
    title: "Admissions Update",
    description: "Rahul V was added to MMHSS class XI-Science. Fee structure assigned.",
    time: "10 mins ago",
    icon: Users,
  },
  {
    id: 2,
    title: "Institution Registry",
    description: "New academic stream 'Artificial Intelligence' registered under MMITE.",
    time: "1 hour ago",
    icon: School,
  },
  {
    id: 3,
    title: "Sports Program Created",
    description: "Inter-school Athletics Championship event matches draft created.",
    time: "4 hours ago",
    icon: Trophy,
  },
  {
    id: 4,
    title: "Gallery Sync Completed",
    description: "Cloudflare CDN completed indexing of 45 high-resolution sports day media files.",
    time: "1 day ago",
    icon: ImageIcon,
  },
];

// Upcoming events
const upcomingEvents = [
  { id: 1, title: "MMHSS Annual Admission Interview", date: "June 25, 2026", time: "09:00 AM", status: "Primary" },
  { id: 2, title: "Inter-Institution Football Finals", date: "June 28, 2026", time: "04:30 PM", status: "Sports" },
  { id: 3, title: "MMITE Term Examination Registration", date: "July 02, 2026", time: "11:59 PM", status: "Important" },
  { id: 4, title: "Parent-Teacher Advisory Assembly", date: "July 05, 2026", time: "10:00 AM", status: "Advisory" },
];

// Bar chart data (Performance)
const barChartData = [
  { label: "MMHSS", value: 85 },
  { label: "MMPS", value: 68 },
  { label: "AMLP", value: 45 },
  { label: "MMITE", value: 92 },
  { label: "Arena", value: 78 },
];

export default function DashboardPage() {
  // Current date formatting
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0c0c0f] to-[#141419] border border-[#c5a880]/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtle glowing accents */}
        <div className="absolute top-0 right-0 w-80 h-full bg-[#ae1431]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-60 h-20 bg-[#c5a880]/5 rounded-full blur-[50px] pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-xs font-semibold text-[#c5a880] tracking-wide uppercase">
            <Sparkles size={11} />
            <span>Operational Console v2.6</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5EFE8] tracking-tight font-['Agency'] uppercase tracking-widest mt-2">
            Welcome back, System Director
          </h2>
          <p className="text-xs text-zinc-400 font-light flex items-center gap-2">
            <Clock size={12} className="text-[#c5a880]" />
            <span>Today is {today}</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="hidden sm:inline text-emerald-500 font-medium">All core systems functional</span>
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2 relative z-10">
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F5EFE8] bg-[#ae1431] hover:bg-[#ae1431]/80 rounded-xl transition-[transform,background-color] duration-200 shadow-[0_4px_15px_rgba(174,20,49,0.3)] hover:shadow-none cursor-pointer border border-[#ae1431]/20">
            <Plus size={13} />
            <span>New Admission</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#c5a880] bg-zinc-950 border border-[#c5a880]/15 hover:border-[#c5a880]/30 hover:bg-zinc-900 rounded-xl transition-[background-color,border-color] duration-200 cursor-pointer">
            <FileText size={13} />
            <span>Log Report</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-400 bg-zinc-900/60 border border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800 rounded-xl transition-[color,background-color] duration-200 cursor-pointer">
            <Send size={13} />
            <span>Broadcast</span>
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Institutions"
          value="5 Schools"
          change="+1 this year"
          changeType="increase"
          icon={School}
        />
        <StatCard
          title="Parent-Student Portals"
          value="2,450 Users"
          change="+12% vs last term"
          changeType="increase"
          icon={Users}
        />
        <StatCard
          title="Sports Programs"
          value="18 Active"
          change="+3 new events"
          changeType="increase"
          icon={Trophy}
        />
        <StatCard
          title="Gallery Assets"
          value="842 media"
          change="+124 this week"
          changeType="increase"
          icon={ImageIcon}
        />
      </div>

      {/* Analytics Charts & Events Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Growth Analytics Chart */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Portal Activity & Enrollment Trend"
            subtitle="Real-time daily user interaction logs across the ERAM network"
            type="line"
          />
        </div>

        {/* Institution Performance (Bar Chart) */}
        <div>
          <ChartCard
            title="Institutional Weightage"
            subtitle="Resource allocation & active records per institution"
            type="bar"
            data={barChartData}
          />
        </div>
      </div>

      {/* Bottom Dashboard Grid: Logs, Events, Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Logs Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={recentActivities} />
        </div>

        {/* Sidebar Panel: Upcoming Events & System status */}
        <div className="space-y-6">
          
          {/* Upcoming Schedule */}
          <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-[#c5a880]" />
                Upcoming Schedule
              </span>
              <span className="text-[10px] text-zinc-500 font-semibold cursor-pointer hover:text-zinc-300">View All</span>
            </h3>
            
            <div className="space-y-3.5">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl flex items-center justify-between hover:border-[#c5a880]/20 transition-[border-color] duration-200 group">
                  <div className="space-y-1 min-w-0 pr-2">
                    <p className="text-xs font-semibold text-zinc-300 group-hover:text-[#F5EFE8] transition-colors truncate">
                      {evt.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-light">
                      <span>{evt.date}</span>
                      <span>•</span>
                      <span>{evt.time}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    evt.status === "Important" 
                      ? "bg-[#ae1431]/20 text-[#ae1431] border border-[#ae1431]/30" 
                      : evt.status === "Sports" 
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      : "bg-[#c5a880]/10 text-[#c5a880] border border-[#c5a880]/20"
                  }`}>
                    {evt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Settings size={14} className="text-[#c5a880]" />
              Quick Shortcuts
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/admin/home" className="p-3 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/20 rounded-xl text-center transition-[background-color,border-color] duration-200">
                <span className="block text-[11px] font-bold text-zinc-300">Frontpage CMS</span>
                <span className="text-[9px] text-zinc-600 block mt-0.5">Hero & Sections</span>
              </Link>
              <Link href="/admin/portal" className="p-3 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/20 rounded-xl text-center transition-[background-color,border-color] duration-200">
                <span className="block text-[11px] font-bold text-zinc-300">Portal DB</span>
                <span className="text-[9px] text-zinc-600 block mt-0.5">Accounts list</span>
              </Link>
              <Link href="/admin/institutions" className="p-3 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/20 rounded-xl text-center transition-[background-color,border-color] duration-200">
                <span className="block text-[11px] font-bold text-zinc-300">Institutions</span>
                <span className="text-[9px] text-zinc-600 block mt-0.5">Edit 5 schools</span>
              </Link>
              <Link href="/admin/gallery" className="p-3 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/20 rounded-xl text-center transition-[background-color,border-color] duration-200">
                <span className="block text-[11px] font-bold text-zinc-300">Media Center</span>
                <span className="text-[9px] text-zinc-600 block mt-0.5">Upload photos</span>
              </Link>
            </div>
          </div>

          {/* System Status Panel */}
          <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Server size={14} className="text-[#c5a880]" />
                Network Health
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Cloud size={12} className="text-zinc-500" />
                  <span>Main Web Server</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Database size={12} className="text-zinc-500" />
                  <span>MongoDB Replica-Set</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">SECURE</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <CheckCircle2 size={12} className="text-zinc-500" />
                  <span>Cloudflare CDN Cache</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">98% HIT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}