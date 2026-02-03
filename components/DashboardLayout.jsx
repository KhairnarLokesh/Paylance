"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Wallet,
  Bell,
  LogOut,
  User,
  Search,
  Plus,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, logout, notifications, currentView, setCurrentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-sidebar transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setCurrentView('landing')}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">Paylance</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-sidebar-foreground lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${currentView === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent">
                <User className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {user?.name}
                </p>
                <p className="text-xs capitalize text-muted-foreground">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            {user?.role === "client" && (
              <Button size="sm" onClick={() => setCurrentView("create-project")}>
                <Plus className="mr-2 h-4 w-4" />
                Post Project
              </Button>
            )}

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2">
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                </div>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.slice(0, 5).map((notif) => (
                      <DropdownMenuItem key={notif._id || notif.id} className="flex flex-col items-start p-3">
                        <span className="text-sm font-medium text-foreground">{notif.title}</span>
                        <span className="text-xs text-muted-foreground">{notif.message}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 transition-colors border border-slate-100">
                  <User className="h-5 w-5 text-slate-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl border-slate-100">
                <div className="px-4 py-4">
                  <p className="text-lg font-bold text-slate-900 leading-tight">{user?.name}</p>
                  <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                </div>
                <div className="h-px bg-slate-100 my-2 mx-2" />

                <DropdownMenuItem
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none"
                >
                  <UserCircle className="h-5 w-5 text-slate-400" />
                  <span className="font-medium">My Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setCurrentView(user?.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none"
                >
                  <LayoutDashboard className="h-5 w-5 text-slate-400" />
                  <span className="font-medium">
                    {user?.role === 'freelancer' ? 'Innovator Dashboard' : 'Client Dashboard'}
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none group"
                >
                  <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                  <span className="font-medium group-hover:text-red-500 transition-colors">Logout</span>
                </DropdownMenuItem>
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
