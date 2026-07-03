"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import {
  LayoutDashboard,
  Home,
  Users,
  School,
  Trophy,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  Bell,
  LogOut,
  Settings,
  User,
  X,
  Command,
  HelpCircle,
  Download,
  BellDotIcon,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Home", path: "/admin/home", icon: Home },
  { name: "Parent-Student Portal", path: "/admin/portal", icon: Users },
  { name: "Institutions", path: "/admin/institutions", icon: School },
  { name: "Sports Arena", path: "/admin/sports-arena", icon: Trophy },
  { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
  { name: "Downloads", path: "/admin/downloads", icon: Download },
  { name: "Events & Notifications", path: "/admin/events", icon: BellDotIcon  },

];

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
    const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);


   const timeAgo = (dateStr) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  // Fetch latest activity from events, downloads, gallery & home for the bell dropdown
  useEffect(() => {
    Promise.allSettled([
      api.get("/events"),
      api.get("/downloads"),
      api.get("/gallery"),
      api.get("/hero"),
    ]).then((results) => {
      const [eventsRes, downloadsRes, galleryRes, heroRes] = results;

      const eventItems =
        eventsRes.status === "fulfilled"
          ? eventsRes.value.data.map((ev) => ({
              id: `event-${ev._id}`,
              title: ev.title,
              body: ev.description,
              date: ev.createdAt,
              read: false,
            }))
          : [];

      const downloadItems =
        downloadsRes.status === "fulfilled"
          ? downloadsRes.value.data.map((d) => ({
              id: `download-${d._id}`,
              title: `New Document: ${d.title}`,
              body: d.description,
              date: d.createdAt,
              read: false,
            }))
          : [];

      const galleryItems =
        galleryRes.status === "fulfilled"
          ? galleryRes.value.data.map((g) => ({
              id: `gallery-${g._id}`,
              title: `New Gallery Upload${g.title ? `: ${g.title}` : ""}`,
              body: g.description || g.caption || "New image added to gallery.",
              date: g.createdAt,
              read: false,
            }))
          : [];

      const heroItems =
        heroRes.status === "fulfilled"
          ? (Array.isArray(heroRes.value.data) ? heroRes.value.data : [heroRes.value.data])
              .filter(Boolean)
              .map((h) => ({
                id: `home-${h._id}`,
                title: `Home Page Updated${h.title ? `: ${h.title}` : ""}`,
                body: h.description || h.subtitle || "Homepage content was updated.",
                date: h.updatedAt || h.createdAt,
                read: false,
              }))
          : [];

      const merged = [...eventItems, ...downloadItems, ...galleryItems, ...heroItems]
        .filter((n) => n.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 8)
        .map((n) => ({ ...n, time: timeAgo(n.date) }));

      setNotifications(merged);
    }).finally(() => setNotifLoading(false));
  }, []);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Toggle dropdown; mark everything read the moment it's opened
  const toggleNotifications = () => {
    setShowNotifications((prev) => {
      const next = !prev;
      if (next) {
        setNotifications((cur) => cur.map((n) => ({ ...n, read: true })));
      }
      return next;
    });
  };


  // Opens the confirmation modal instead of logging out immediately
  const requestLogout = () => {
    setShowSearch(false);
    setShowProfile(false);
    setShowNotifications(false);
    setIsMobileOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setLoggingOut(true);

    try {
      await api.post("/auth/logout"); // clears backend cookie
    } catch (err) {
      console.error("Backend logout failed:", err);
    }

    try {
      await fetch("/admin/auth/logout", { method: "POST" }); // clears frontend cookie
      router.replace("/login");
      router.refresh();
      // loggingOut intentionally left true — page is navigating away
    } catch (err) {
      console.error("Frontend logout failed:", err);
      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  // Helper to get active page details
  const activeItem = navItems.find((item) => pathname.startsWith(item.path)) || { name: "Admin" };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex font-rethink selection:bg-[#ae1431]/30 selection:text-[#F5EFE8]">
      {/* Sidebar - Desktop */}
      <aside
        className={`fixed top-0 left-0 h-screen z-30 bg-[#0c0c0f] border-r border-[#c5a880]/10 transition-[width] duration-300 ease-in-out hidden md:flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-20 flex items-center px-6 border-b border-[#c5a880]/10 justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#ae1431] flex items-center justify-center border border-[#c5a880]/20 shadow-[0_0_15px_rgba(174,20,49,0.3)]">
              <span className="font-display text-lg text-[#F5EFE8] tracking-widest">E</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none animate-[fadeIn_0.2s_ease-out]">
                <span className="font-display text-xl tracking-widest text-[#F5EFE8]">ERAM</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-display">ADMIN SYSTEM</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-[#c5a880]/10 text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
          >
            {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);
            return (
              <Link
                key={item.path} 
                href={item.path}
                className={`flex items-center font-display gap-3 px-3 py-3 rounded-xl transition-[color,background-color,border-color] duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-[#ae1431]/20 to-[#ae1431]/5 border border-[#ae1431]/40 text-[#F5EFE8] "
                    : "text-zinc-400 hover:text-zinc-100 font-rethink hover:bg-zinc-900/60 border border-transparent"
                }`}
              >
                <Icon
                  size={19}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-[#ae1431]" : "text-zinc-400 group-hover:text-[#c5a880]"
                  }`}
                />
                {!isCollapsed && (
                  <span className="tracking-wide leading-none select-none">
                    {item.name}
                  </span>
                )}
                {/* Gold Glow for Active Item */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#c5a880] to-[#ae1431] rounded-l-full shadow-[0_0_8px_#c5a880]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Quick Actions footer */}
        <div className="p-4 border-t border-[#c5a880]/10 bg-[#0a0a0d]">
          {!isCollapsed ? (
            <div className="flex flex-col gap-3 animate-[fadeIn_0.2s_ease-out]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ae1431] to-[#c5a880] p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#0c0c0f] rounded-[10px] flex items-center justify-center">
                    <User size={18} className="text-[#c5a880]" />
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-zinc-200 truncate">Senior Administrator</span>
                  <span className="text-[12px] font-display text-zinc-500 truncate">admin@eram.com</span>
                </div>
              </div>
              
              <button
                onClick={requestLogout}
                disabled={loggingOut}
                className="w-full flex items-center font-display justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-[#ae1431]/10 border border-[#c5a880]/10 hover:border-[#ae1431]/40 text-zinc-400 hover:text-[#F5EFE8] transition-[color,background-color,border-color] duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingOut ? (
                  <span className="h-3.5 w-3.5 border-2 border-zinc-500/30 border-t-zinc-300 rounded-full animate-spin" />
                ) : (
                  <LogOut size={14} className="text-zinc-500 hover:text-[#ae1431]" />
                )}
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ae1431] to-[#c5a880] p-0.5 cursor-pointer">
                <div className="w-full h-full bg-[#0c0c0f] rounded-[10px] flex items-center justify-center">
                  <User size={16} className="text-[#c5a880]" />
                </div>
              </div>
              <button
                onClick={requestLogout}
                disabled={loggingOut}
                title="Sign Out"
                className="p-2 rounded-lg hover:bg-[#ae1431]/10 text-zinc-500 hover:text-[#ae1431] border border-transparent hover:border-[#ae1431]/20 transition-[color,background-color,border-color] duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingOut ? (
                  <span className="h-4 w-4 border-2 border-zinc-500/30 border-t-zinc-300 rounded-full animate-spin block" />
                ) : (
                  <LogOut size={16} />
                )}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex animate-[fadeIn_0.2s_ease-out]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer Panel */}
          <aside className="relative w-72 bg-[#0c0c0f] border-r border-[#c5a880]/15 flex flex-col h-full animate-[slideRight_0.3s_cubic-bezier(0.16,1,0.3,1)] will-change-transform">
            <div className="h-20 flex items-center px-6 border-b border-[#c5a880]/10 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ae1431] flex items-center justify-center border border-[#c5a880]/20">
                  <span className="font-display  text-lg text-[#F5EFE8] tracking-widest">E</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-xl tracking-widest text-[#F5EFE8]">ERAM</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">ADMIN SYSTEM</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#ae1431]/20 border border-[#ae1431]/40 text-[#F5EFE8] "
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent"
                    }`}
                  >
                    <Icon size={19} className={isActive ? "text-[#ae1431]" : "text-zinc-400"} />
                    <span className=" tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#c5a880]/10 bg-[#0a0a0d] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ae1431] to-[#c5a880] p-0.5">
                <div className="w-full h-full bg-[#0c0c0f] rounded-[10px] flex items-center justify-center">
                  <User size={18} className="text-[#c5a880]" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-zinc-200 truncate">Senior Admin</p>
                <p className="text-[12px] font-display text-zinc-500 truncate">admin@eram.com</p>
              </div>
              <button
                onClick={requestLogout}
                disabled={loggingOut}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-[#F5EFE8] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingOut ? (
                  <span className="h-4 w-4 border-2 border-zinc-500/30 border-t-zinc-300 rounded-full animate-spin block" />
                ) : (
                  <LogOut size={15} />
                )}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Layout Container */}
      <div className={`flex-1 flex flex-col transition-[padding] duration-300 ${isCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        
        {/* Navbar */}
        <header className="sticky top-0 z-20 h-20 bg-[#070709]/80 backdrop-blur-md border-b border-[#c5a880]/10 flex items-center px-4 md:px-8 justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-zinc-900/60 border border-[#c5a880]/10 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-zinc-500">System</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-500">Admin</span>
              <span className="text-zinc-700">/</span>
              <span className="text-[#c5a880] font-display">{activeItem.name}</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(true)}
                className="hidden lg:flex items-center gap-3 px-3 py-2 w-64 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-[#c5a880]/10 hover:border-[#c5a880]/20 text-zinc-500 hover:text-zinc-300 text-xs transition-[color,background-color,border-color] duration-200 text-left"
              >
                <Search size={14} className="text-zinc-500" />
                <span className="flex-1">Search portal...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px]  text-zinc-400">⌘K</kbd>
              </button>
              <button
                onClick={() => setShowSearch(true)}
                className="lg:hidden p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-[#c5a880]/10 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Notification Area */}
            <div className="relative" ref={notifRef}>
             <button
                onClick={toggleNotifications}
                className="relative p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-[#c5a880]/10 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#ae1431] text-[9px] font-semibold text-white ring-2 ring-[#070709]">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0c0c0f] border border-[#c5a880]/15 rounded-2xl shadow-xl z-30 py-2 animate-[fadeIn_0.2s_ease-out]">
                 <div className="px-4 py-2 border-b border-[#c5a880]/10 flex items-center justify-between">
                    <span className=" tracking-wider uppercase text-zinc-200">Alerts & Messages</span>
                    <span className="text-[10px] text-[#ae1431] bg-[#ae1431]/10 px-2 py-0.5 rounded">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-zinc-900">
                    {notifLoading ? (
                      <p className="p-4 text-xs text-zinc-500">Loading…</p>
                    ) : notifications.length === 0 ? (
                      <p className="p-4 text-xs text-zinc-500">No notifications yet.</p>
                    ) : (
                      notifications.map((notif) => (
                      <div key={notif.id} className="p-3 hover:bg-zinc-900/40 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className={` ${notif.read ? 'text-zinc-400' : 'text-[#c5a880]'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[9px] text-zinc-500">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-normal">{notif.body}</p>
                      </div>
                      )
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-[#c5a880]/10 text-center">
                    <button className="text-[10px] text-zinc-400 hover:text-[#c5a880] transition-colors">
                      Clear all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-[#c5a880]/10 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ae1431] to-[#c5a880] p-0.5">
                  <div className="w-full h-full bg-[#0c0c0f] rounded-md flex items-center justify-center">
                    <User size={13} className="text-[#c5a880]" />
                  </div>
                </div>
                <span className=" hidden sm:inline text-zinc-300">Admin</span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0c0c0f] border border-[#c5a880]/15 rounded-2xl shadow-xl z-30 py-2 divide-y divide-zinc-900 animate-[fadeIn_0.2s_ease-out]">
                  <div className="px-4 py-2.5">
                    <p className=" text-zinc-200">System Root Admin</p>
                    <p className="text-[10px] text-zinc-500">Superuser Account</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                    >
                      <LayoutDashboard size={13} />
                      Dashboard
                    </Link>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                    >
                      <Settings size={13} />
                      System Settings
                    </a>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={requestLogout}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#ae1431] hover:bg-[#ae1431]/10 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut size={13} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global Search Dialog Modal */}
        {showSearch && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
            <div
              ref={searchRef}
              className="w-full max-w-xl bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl overflow-hidden animate-[scaleUp_0.2s_cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            >
              <div className="p-4 border-b border-[#c5a880]/15 flex items-center gap-3">
                <Search size={18} className="text-[#c5a880]" />
                <input
                  type="text"
                  placeholder="Type a command or search word (e.g. portal, sports)..."
                  className="flex-1 bg-transparent border-none text-zinc-100 placeholder:text-zinc-600 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="p-2 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] text-zinc-600 uppercase tracking-widest">
                  Quick Pages
                </div>
                <div className="space-y-0.5">
                  {navItems
                    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            router.push(item.path);
                            setShowSearch(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-900/60 text-zinc-300 hover:text-[#F5EFE8] text-xs transition-colors text-left"
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={14} className="text-[#c5a880]" />
                            <span>{item.name}</span>
                          </div>
                          <span className="text-[10px] text-zinc-600">Navigate</span>
                        </button>
                      );
                    })}
                </div>

                <div className="mt-2 px-3 py-1.5 border-t border-zinc-900/50 pt-2 text-[10px] text-zinc-600 uppercase tracking-widest">
                  Actions
                </div>
                <div className="space-y-0.5">
                  <button
                    onClick={requestLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-[#ae1431]/10 text-[#ae1431] text-xs transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={14} />
                    <span>Log Out Account</span>
                  </button>
                </div>
              </div>

              <div className="bg-zinc-950 px-4 py-2 border-t border-[#c5a880]/10 flex items-center justify-between text-[10px] text-zinc-600">
                <span className="flex items-center gap-1">
                  <Command size={10} />
                  <span>Enter to select</span>
                </span>
                <span className="flex items-center gap-1">
                  <HelpCircle size={10} />
                  <span>ESC to close</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
            <div className="w-full max-w-sm bg-[#0c0c0f] border border-[#c5a880]/20 rounded-2xl shadow-2xl p-6 animate-[scaleUp_0.2s_cubic-bezier(0.16,1,0.3,1)] will-change-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ae1431]/10 border border-[#ae1431]/30 flex items-center justify-center flex-shrink-0">
                  <LogOut size={18} className="text-[#ae1431]" />
                </div>
                <h3 className="font-display text-lg text-[#F5EFE8]">Sign out?</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                You'll need to sign in again to access the admin dashboard.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  disabled={loggingOut}
                  className="px-4 py-2 text-xs rounded-lg border border-[#c5a880]/15 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  disabled={loggingOut}
                  className="px-4 py-2 text-xs rounded-lg bg-[#ae1431] text-[#F5EFE8] hover:bg-[#ae1431]/90 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loggingOut && (
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {loggingOut ? "Signing out..." : "Yes, sign out"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Panel */}
        <main className="flex-1 p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]">
          {children}
        </main>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translate3d(-100%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale3d(0.97, 0.97, 1); }
          to { opacity: 1; transform: scale3d(1, 1, 1); }
        }
      `}</style>
    </div>
  );
}