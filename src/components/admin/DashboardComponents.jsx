"use client";

import React, { useState, useMemo, memo } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Calendar,
  AlertCircle
} from "lucide-react";

// PageHeader
export const PageHeader = memo(function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F5EFE8] font-['Agency'] uppercase tracking-widest">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-zinc-400 mt-1 font-light">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  );
});

// StatCard
export const StatCard = memo(function StatCard({ title, value, change, changeType, icon: Icon, timeRange = "vs last month" }) {
  const isPositive = changeType === "increase";
  
  return (
    <div className="relative group overflow-hidden bg-zinc-900/40 border border-[#c5a880]/10 hover:border-[#c5a880]/30 rounded-2xl p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] will-change-transform">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c5a880]/5 to-transparent rounded-full blur-2xl group-hover:from-[#ae1431]/10 transition-[background-color] duration-500 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{title}</span>
        <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-[#c5a880]/15 text-[#c5a880] group-hover:text-[#F5EFE8] group-hover:bg-[#ae1431]/20 group-hover:border-[#ae1431]/30 transition-[colors,background-color] duration-300">
          <Icon size={18} />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-bold text-[#F5EFE8] tracking-tight">{value}</span>
      </div>
      
      <div className="flex items-center gap-1.5 mt-3">
        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
          isPositive 
            ? "bg-[#c5a880]/10 text-[#c5a880]" 
            : "bg-[#ae1431]/10 text-[#ae1431]"
        }`}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
        <span className="text-[11px] text-zinc-500 font-light">{timeRange}</span>
      </div>
    </div>
  );
});

// ChartCard
export const ChartCard = memo(function ChartCard({ title, subtitle, type = "line", data = [] }) {
  // Simple responsive SVG Chart
  return (
    <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px]">
          <button className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 font-medium transition-colors">1W</button>
          <button className="px-2.5 py-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors">1M</button>
          <button className="px-2.5 py-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors">1Y</button>
        </div>
      </div>

      {type === "line" ? (
        <div className="h-64 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ae1431" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ae1431" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ae1431" />
                <stop offset="50%" stopColor="#c5a880" />
                <stop offset="100%" stopColor="#ae1431" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="50" x2="500" y2="50" stroke="#1d1d22" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#1d1d22" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="150" x2="500" y2="150" stroke="#1d1d22" strokeWidth="0.5" strokeDasharray="3" />

            {/* Filled Area */}
            <path
              d="M 0,200 L 0,150 L 80,120 L 160,160 L 240,80 L 320,110 L 400,60 L 500,30 L 500,200 Z"
              fill="url(#chartGradient)"
            />

            {/* Line Path */}
            <path
              d="M 0,150 L 80,120 L 160,160 L 240,80 L 320,110 L 400,60 L 500,30"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dots */}
            <circle cx="80" cy="120" r="4" className="fill-[#c5a880] stroke-[#0c0c0f] stroke-2" />
            <circle cx="240" cy="80" r="4" className="fill-[#ae1431] stroke-[#0c0c0f] stroke-2" />
            <circle cx="400" cy="60" r="4" className="fill-[#c5a880] stroke-[#0c0c0f] stroke-2" />
            <circle cx="500" cy="30" r="4" className="fill-[#ae1431] stroke-[#0c0c0f] stroke-2" />
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[9px] text-zinc-600 font-semibold tracking-wider mt-4">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>
        </div>
      ) : (
        <div className="h-64 flex items-end justify-between gap-3 pt-6">
          {data.map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-full relative bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden h-48 flex items-end">
                <div 
                  style={{ height: `${bar.value}%` }}
                  className="w-full rounded-t-[4px] bg-gradient-to-t from-[#ae1431] to-[#c5a880] group-hover:brightness-125 transition-[filter,brightness] duration-300 shadow-[0_0_12px_rgba(174,20,49,0.2)]" 
                />
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-medium">{bar.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

// DataTable
export const DataTable = memo(function DataTable({ columns, data, searchField, filterOptions = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter & Search Logic memoized
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = row[searchField]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesFilter = activeFilter === "all" || !row.status || row.status.toLowerCase() === activeFilter.toLowerCase();
      
      return matchesSearch && matchesFilter;
    });
  }, [data, searchField, searchTerm, activeFilter]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage) || 1;
  }, [filteredData.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 md:p-6 border-b border-[#c5a880]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder={`Search by ${searchField}...`}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-[#c5a880]/15 hover:border-[#c5a880]/30 focus:border-[#ae1431] focus:ring-1 focus:ring-[#ae1431]/20 outline-none text-xs text-zinc-200 placeholder:text-zinc-600 transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters */}
        {filterOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter size={12} className="text-zinc-500" />
            <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px]">
              <button
                onClick={() => { setActiveFilter("all"); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeFilter === "all" 
                    ? "bg-zinc-900 text-[#c5a880]" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                All
              </button>
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setActiveFilter(opt.value); setCurrentPage(1); }}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all uppercase tracking-wider ${
                    activeFilter === opt.value 
                      ? "bg-zinc-900 text-[#c5a880]" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#c5a880]/10 bg-zinc-950/50">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c5a880]/5">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-zinc-900/20 transition-colors duration-150">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="px-6 py-4 text-xs font-medium text-zinc-300 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button 
                        title="Preview Details"
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-[#c5a880] border border-zinc-800 transition-colors duration-200"
                      >
                        <Eye size={12} />
                      </button>
                      <button 
                        title="Edit Row"
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-[#ae1431]/20 text-zinc-400 hover:text-[#ae1431] border border-zinc-800 hover:border-[#ae1431]/30 transition-colors duration-200"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-12">
                  <EmptyState title="No match found" description="Try modifying your search or filter options" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-[#c5a880]/10 flex items-center justify-between text-xs text-zinc-500 bg-zinc-950/20">
          <span>
            Page <strong className="text-zinc-300">{currentPage}</strong> of <strong className="text-zinc-300">{totalPages}</strong>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// EmptyState
export const EmptyState = memo(function EmptyState({ title = "No data available", description = "There are no records to show at this moment." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="p-4 rounded-full bg-zinc-900 border border-[#c5a880]/15 text-[#c5a880] mb-4 shadow-[0_0_15px_rgba(197,168,128,0.1)]">
        <AlertCircle size={24} />
      </div>
      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-normal font-light">{description}</p>
    </div>
  );
});

// ActivityFeed
export const ActivityFeed = memo(function ActivityFeed({ activities }) {
  return (
    <div className="bg-zinc-900/40 border border-[#c5a880]/10 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="w-1.5 h-3 bg-[#ae1431] rounded-full shadow-[0_0_8px_#ae1431]" />
        Recent Logs & Activities
      </h3>
      <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-4 relative group">
            <div className="relative z-10 flex-shrink-0 w-6.5 h-6.5 rounded-full bg-zinc-950 border border-[#c5a880]/20 flex items-center justify-center text-[10px] text-[#c5a880] group-hover:border-[#ae1431] group-hover:text-[#ae1431] transition-[border-color,color] duration-200">
              {act.icon ? <act.icon size={11} /> : <Calendar size={11} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors truncate">
                  {act.title}
                </p>
                <span className="text-[10px] text-zinc-500 whitespace-nowrap">{act.time}</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

