"use client";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase, LayoutDashboard, FolderOpen, MessageSquare, Wallet, Bell, LogOut, Search, Plus, Menu, X, UserCircle,
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, logout, notifications, currentView, setCurrentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const clientNav = [
    { id: "client-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "my-projects", label: "My Projects", icon: FolderOpen },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];
  const freelancerNav = [
    { id: "freelancer-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "browse-projects", label: "Find Projects", icon: Search },
    { id: "my-work", label: "My Work", icon: FolderOpen },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];
  const navItems = user?.role === "client" ? clientNav : freelancerNav;

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ─── Sidebar ─── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 transform border-r border-[#2A2A2A] bg-[#0A0A0A] transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 items-center justify-between border-b border-[#2A2A2A] px-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#EA580C]">
                <Briefcase className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">PAYLANCE</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-[#52525B] hover:text-white lg:hidden transition-colors"><X className="h-4 w-4" /></button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto no-scrollbar">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative ${isActive
                    ? "bg-[#1A0D07] text-white"
                    : "text-[#71717A] hover:bg-[#1A1A1A] hover:text-white"
                    }`}
                >
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-[#EA580C] rounded-r" />}
                  <item.icon className={`h-4 w-4 ${isActive ? "text-[#EA580C]" : ""}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="border-t border-[#2A2A2A] p-3">
            <div className="flex items-center gap-2.5 px-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-xs font-bold shrink-0">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] capitalize text-[#71717A]">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#2A2A2A] bg-[#0A0A0A] px-4 lg:px-5">
          <button onClick={() => setSidebarOpen(true)} className="text-[#52525B] hover:text-white lg:hidden transition-colors"><Menu className="h-5 w-5" /></button>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            {user?.role === "client" && (
              <Button size="sm" onClick={() => setCurrentView("create-project")}
                className="h-8 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold rounded-lg">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Post Project
              </Button>
            )}
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A] transition-colors">
                  <Bell className="h-4 w-4 text-[#71717A]" />
                  {unreadCount > 0 && <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EA580C] text-[9px] font-bold text-white">{unreadCount}</span>}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-76 rounded-xl bg-[#111111] border-[#2A2A2A] shadow-2xl p-1">
                <div className="px-3 py-2 border-b border-[#2A2A2A]"><p className="text-xs font-semibold text-white uppercase tracking-wider">Notifications</p></div>
                {notifications.length === 0
                  ? <p className="text-center text-xs text-[#71717A] py-6">No notifications</p>
                  : <div className="max-h-64 overflow-y-auto">
                    {notifications.slice(0, 5).map(n => (
                      <div key={n._id || n.id} className="px-3 py-2.5 hover:bg-[#1A1A1A] rounded-lg cursor-pointer transition-colors">
                        <p className="text-xs font-semibold text-white">{n.title}</p>
                        <p className="text-[11px] text-[#71717A] line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white text-xs font-bold hover:border-[#EA580C] transition-colors">
                  {user?.name?.charAt(0).toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 rounded-xl bg-[#111111] border-[#2A2A2A] shadow-2xl p-1">
                <div className="px-3 py-3 border-b border-[#2A2A2A] mb-1">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-[#71717A] truncate">{user?.email}</p>
                </div>
                <DropdownMenuItem onClick={() => setCurrentView('profile')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer transition-colors"><UserCircle className="h-4 w-4" />My Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentView(user?.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer transition-colors"><LayoutDashboard className="h-4 w-4" />Dashboard</DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 bg-[#2A2A2A]" />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"><LogOut className="h-4 w-4" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
