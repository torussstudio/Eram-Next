"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
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
  Sparkles,
  Command,
  HelpCircle,
  ShieldCheck
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Home", path: "/admin/home", icon: Home },
  { name: "Parent-Student Portal", path: "/admin/portal", icon: Users },
  { name: "Institutions", path: "/admin/institutions", icon: School },
  { name: "Sports Arena", path: "/admin/sports-arena", icon: Trophy },
  { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
];

// Simulated notifications
const notifications = [
  { id: 1, title: "New Admission Request", body: "Rahul V has submitted an application for MMHSS.", time: "10m ago", read: false },
  { id: 2, title: "Sports Arena Booking", body: "Football coaching booking request received.", time: "1h ago", read: false },
  { id: 3, title: "Portal Update Success", body: "Parent portal system updates completed.", time: "4h ago", read: true },
  { id: 4, title: "New Gallery Uploads", body: "Admin posted 5 new images in the Annual Day folder.", time: "1d ago", read: true }
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

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

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

  const handleLogout = async () => {
    try {
      await fetch("/admin/auth/logout", {
        method: "POST",
      });
      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Helper to get active page details
  const activeItem = navItems.find((item) => pathname.startsWith(item.path)) || { name: "Admin" };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex font-['Rethink_Sans'] selection:bg-[#ae1431]/30 selection:text-[#F5EFE8]">
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
              <span className="font-['Agency'] font-bold text-lg text-[#F5EFE8] tracking-widest">E</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none animate-[fadeIn_0.2s_ease-out]">
                <span className="font-['Agency'] font-bold text-xl tracking-widest text-[#F5EFE8]">ERAM</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">ADMIN SYSTEM</span>
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
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-[color,background-color,border-color] duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-[#ae1431]/20 to-[#ae1431]/5 border border-[#ae1431]/40 text-[#F5EFE8] font-medium"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent"
                }`}
              >
                <Icon
                  size={19}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-[#ae1431]" : "text-zinc-400 group-hover:text-[#c5a880]"
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium tracking-wide leading-none select-none">
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
                  <span className="text-xs font-semibold text-zinc-200 truncate">Senior Administrator</span>
                  <span className="text-[10px] text-zinc-500 truncate">admin@eram.edu.in</span>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-[#ae1431]/10 border border-[#c5a880]/10 hover:border-[#ae1431]/40 text-zinc-400 hover:text-[#F5EFE8] text-xs font-medium transition-[color,background-color,border-color] duration-200 cursor-pointer"
              >
                <LogOut size={14} className="text-zinc-500 hover:text-[#ae1431]" />
                Sign Out
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
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-lg hover:bg-[#ae1431]/10 text-zinc-500 hover:text-[#ae1431] border border-transparent hover:border-[#ae1431]/20 transition-[color,background-color,border-color] duration-200 cursor-pointer"
              >
                <LogOut size={16} />
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
                  <span className="font-['Agency'] font-bold text-lg text-[#F5EFE8] tracking-widest">E</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-['Agency'] font-bold text-xl tracking-widest text-[#F5EFE8]">ERAM</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">ADMIN SYSTEM</span>
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
                        ? "bg-[#ae1431]/20 border border-[#ae1431]/40 text-[#F5EFE8] font-medium"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent"
                    }`}
                  >
                    <Icon size={19} className={isActive ? "text-[#ae1431]" : "text-zinc-400"} />
                    <span className="text-sm font-medium tracking-wide">{item.name}</span>
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
                <p className="text-xs font-semibold text-zinc-200 truncate">Senior Admin</p>
                <p className="text-[10px] text-zinc-500 truncate">admin@eram.edu.in</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-[#F5EFE8] cursor-pointer"
              >
                <LogOut size={15} />
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
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
              <span className="text-zinc-500">System</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-500">Admin</span>
              <span className="text-zinc-700">/</span>
              <span className="text-[#c5a880] font-semibold">{activeItem.name}</span>
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
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-sans text-zinc-400">⌘K</kbd>
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
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-[#c5a880]/10 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ae1431] rounded-full ring-2 ring-[#070709]" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0c0c0f] border border-[#c5a880]/15 rounded-2xl shadow-xl z-30 py-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="px-4 py-2 border-b border-[#c5a880]/10 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-zinc-200">Alerts & Messages</span>
                    <span className="text-[10px] text-[#ae1431] font-semibold bg-[#ae1431]/10 px-2 py-0.5 rounded">2 New</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-zinc-900">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 hover:bg-zinc-900/40 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-semibold ${notif.read ? 'text-zinc-400' : 'text-[#c5a880]'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[9px] text-zinc-500">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-normal">{notif.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-[#c5a880]/10 text-center">
                    <button className="text-[10px] text-zinc-400 hover:text-[#c5a880] transition-colors font-medium">
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
                <span className="text-xs font-medium hidden sm:inline text-zinc-300">Admin</span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0c0c0f] border border-[#c5a880]/15 rounded-2xl shadow-xl z-30 py-2 divide-y divide-zinc-900 animate-[fadeIn_0.2s_ease-out]">
                  <div className="px-4 py-2.5">
                    <p className="text-xs font-bold text-zinc-200">System Root Admin</p>
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
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#ae1431] hover:bg-[#ae1431]/10 text-left font-medium cursor-pointer"
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
                  className="flex-1 bg-transparent border-none text-zinc-100 placeholder:text-zinc-600 outline-none text-sm font-sans"
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
                <div className="px-3 py-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
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

                <div className="mt-2 px-3 py-1.5 border-t border-zinc-900/50 pt-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  Actions
                </div>
                <div className="space-y-0.5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-[#ae1431]/10 text-[#ae1431] text-xs transition-colors text-left"
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
