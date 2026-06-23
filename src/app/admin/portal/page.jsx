"use client";

import React, { useState } from "react";
import { 
  Users, 
  Key, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  School,
  Lock,
  UserCheck,
  Calendar
} from "lucide-react";
import { PageHeader, StatCard, DataTable } from "@/components/admin/DashboardComponents";

// Mock accounts database
const accountsData = [
  { id: "ACC-9081", student: "Aswin Kumar", parent: "Rajesh Kumar", institution: "MMHSS Palakkad", date: "2026-06-22", type: "Both", status: "Active" },
  { id: "ACC-8742", student: "Fathima N", parent: "Noushad A", institution: "MMPS Palakkad", date: "2026-06-21", type: "Parent Only", status: "Active" },
  { id: "ACC-8610", student: "Devika Sajith", parent: "Sajith Prasad", institution: "AMLP School", date: "2026-06-20", type: "Student Only", status: "Pending" },
  { id: "ACC-8422", student: "Mohammed Shahin", parent: "Abdul Basheer", institution: "MMITE Palakkad", date: "2026-06-18", type: "Both", status: "Active" },
  { id: "ACC-7911", student: "Sneha Haridas", parent: "Haridas K", institution: "MMHSS Palakkad", date: "2026-06-15", type: "Parent Only", status: "Suspended" },
  { id: "ACC-7833", student: "Adithyan P", parent: "Pradeep Kumar", institution: "MMPS Palakkad", date: "2026-06-12", type: "Both", status: "Active" },
  { id: "ACC-7210", student: "Jasmin S", parent: "Siddique M", institution: "MMITE Palakkad", date: "2026-06-10", type: "Student Only", status: "Active" },
];

// Table columns definition (moved outside to maintain stable reference and maximize DataTable memoization)
const columns = [
  {
    header: "Account Details",
    accessor: "id",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400">
          <Lock size={12} className="text-[#c5a880]" />
        </div>
        <div>
          <span className="block text-xs font-semibold text-zinc-200">{row.id}</span>
          <span className="text-[10px] text-zinc-500 font-light">Registered on {row.date}</span>
        </div>
      </div>
    )
  },
  {
    header: "Student & Guardian",
    accessor: "student",
    render: (row) => (
      <div>
        <span className="block text-xs font-bold text-zinc-200">{row.student}</span>
        <span className="text-[10px] text-zinc-400 font-light">Parent: {row.parent}</span>
      </div>
    )
  },
  {
    header: "Institution",
    accessor: "institution",
    render: (row) => (
      <div className="flex items-center gap-1.5 text-zinc-400">
        <School size={12} className="text-zinc-500" />
        <span>{row.institution}</span>
      </div>
    )
  },
  {
    header: "Portal Access",
    accessor: "type",
    render: (row) => (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400">
        <UserCheck size={11} className="text-[#c5a880]" />
        {row.type}
      </span>
    )
  },
  {
    header: "Status",
    accessor: "status",
    render: (row) => {
      const isAct = row.status === "Active";
      const isPend = row.status === "Pending";
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
          isAct 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/25" 
            : isPend 
            ? "bg-amber-500/10 text-amber-500 border border-amber-500/25" 
            : "bg-red-500/10 text-red-500 border border-red-500/25"
        }`}>
          {row.status}
        </span>
      );
    }
  }
];

const filterOptions = [
  { label: "Active Accounts", value: "active" },
  { label: "Pending Setup", value: "pending" },
  { label: "Suspended", value: "suspended" }
];

// Simulated recent registrations
const recentRegistrations = [
  { name: "Rahul S (Grade X)", institution: "MMPS", time: "10m ago" },
  { name: "Ananya Nair (Grade XII)", institution: "MMHSS", time: "1h ago" },
  { name: "Suresh P (TTI Batch)", institution: "MMITE", time: "4h ago" },
  { name: "Nidha Fathima (Grade I)", institution: "AMLP", time: "2d ago" },
];

export default function PortalPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <PageHeader 
        title="Parent-Student Portal" 
        description="Monitor portal access, modify permissions, sync grades data, and approve security credentials."
      >
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F5EFE8] bg-[#ae1431] hover:bg-[#ae1431]/80 rounded-xl transition-[color,background-color] duration-200 shadow-[0_4px_15px_rgba(174,20,49,0.3)] hover:shadow-none cursor-pointer border border-[#ae1431]/20"
        >
          <Plus size={13} />
          <span>Provision Account</span>
        </button>
      </PageHeader>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Accounts"
          value="2,450"
          change="+34 new this week"
          changeType="increase"
          icon={Users}
        />
        <StatCard
          title="Security Keys Issued"
          value="1,920"
          change="82% active rate"
          changeType="increase"
          icon={Key}
        />
        <StatCard
          title="System Sync Health"
          value="99.8%"
          change="Last sync: 2m ago"
          changeType="increase"
          icon={CheckCircle}
        />
        <StatCard
          title="Advisory Alerts"
          value="0"
          change="All portals secured"
          changeType="increase"
          icon={AlertTriangle}
        />
      </div>

      {/* Portal Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Accounts Table */}
        <div className="lg:col-span-3">
          <DataTable
            columns={columns}
            data={accountsData}
            searchField="student"
            filterOptions={filterOptions}
          />
        </div>

        {/* Recent registration feed */}
        <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Calendar size={14} className="text-[#c5a880]" />
              Recent Registrations
            </h3>

            <div className="space-y-4">
              {recentRegistrations.map((reg, idx) => (
                <div key={idx} className="flex items-start justify-between p-2.5 bg-zinc-950/40 border border-zinc-900 rounded-xl hover:border-[#c5a880]/15 transition-[border-color] duration-200">
                  <div>
                    <span className="block text-xs font-semibold text-zinc-300">{reg.name}</span>
                    <span className="text-[9px] text-[#c5a880] uppercase tracking-wider font-semibold">{reg.institution} Registry</span>
                  </div>
                  <span className="text-[9px] text-zinc-600 font-medium whitespace-nowrap mt-0.5">{reg.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
            <span>Automated portal registrations are open.</span>
            <button className="text-xs text-[#c5a880] hover:text-[#ae1431] font-semibold transition-colors duration-200">Settings</button>
          </div>
        </div>
      </div>

      {/* Mock Account Provisioning Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#c5a880]/15 flex items-center justify-between bg-zinc-950">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">Provision Portal Credentials</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-zinc-200 text-lg">
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Student Admission ID</label>
                <input type="text" placeholder="e.g. ADM-2026-98" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Student Full Name</label>
                <input type="text" placeholder="e.g. Arjun Dev" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Primary Guardian Email</label>
                <input type="email" placeholder="guardian@example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Assigned Institution</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none">
                  <option>MMHSS Palakkad</option>
                  <option>MMPS Palakkad</option>
                  <option>AMLP School</option>
                  <option>MMITE Palakkad</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#c5a880]/15 flex justify-end gap-2 bg-zinc-950">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-zinc-900 text-zinc-400 rounded-xl text-xs font-semibold cursor-pointer">
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-[#ae1431] text-[#F5EFE8] rounded-xl text-xs font-semibold cursor-pointer">
                Save & Invite
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
