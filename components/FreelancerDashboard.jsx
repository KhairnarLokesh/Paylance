"use client";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Search, DollarSign, Briefcase, Star, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export default function FreelancerDashboard() {
  const { user, projects, setCurrentView, setSelectedProject } = useApp();
  const userId = user._id || user.id;
  const appliedProjects = projects.filter(p => p.applications.some(a => a.freelancerId === userId || a.freelancerId?._id === userId));
  const activeProjects = projects.filter(p => (p.assignedTo === userId || p.assignedTo?._id === userId) && p.status === "in_progress");
  const completedProjects = projects.filter(p => (p.assignedTo === userId || p.assignedTo?._id === userId) && p.status === "completed");
  const pendingApplications = appliedProjects.filter(p => p.applications.find(a => a.freelancerId === userId || a.freelancerId?._id === userId)?.status === "pending");
  const totalEarnings = projects
    .filter(p => p.assignedTo === userId || p.assignedTo?._id === userId)
    .reduce((sum, p) => sum + p.milestones.filter(m => m.status === "approved").reduce((ms, m) => ms + m.amount, 0), 0);
  const availableProjects = projects.filter(p =>
    p.status === "open" &&
    !p.applications.some(a => a.freelancerId === userId || a.freelancerId?._id === userId) &&
    p.skills.some(skill => user.skills?.includes(skill)));

  const stats = [
    { title: "Active Projects", value: activeProjects.length, icon: Briefcase },
    { title: "Pending Apps", value: pendingApplications.length, icon: Clock, pending: pendingApplications.length > 0 },
    { title: "Completed", value: completedProjects.length, icon: CheckCircle },
    { title: "Total Earnings", value: `₹${totalEarnings.toLocaleString()}`, icon: DollarSign, money: true },
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Welcome */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-[#71717A] mt-0.5">{"Here's an overview of your freelancing activity."}</p>
        </div>
        <Button onClick={() => setCurrentView("browse-projects")} className="h-9 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg">
          <Search className="mr-1.5 h-4 w-4" /> Find Projects
        </Button>
      </div>

      {/* Profile Summary */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-lg font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{user.name}</h2>
              <div className="flex items-center gap-2 text-xs text-[#71717A] mt-0.5">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <span>{user.rating || "New"}</span>
                <span>·</span>
                <span>{user.completedProjects || 0} projects completed</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.skills?.slice(0, 4).map(skill => (
              <span key={skill} className="px-2 py-0.5 bg-[#1A1A1A] text-[#A1A1AA] border border-[#3F3F46] text-[10px] font-medium rounded">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.title} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#71717A]">{stat.title}</p>
                <p className={`mt-1.5 text-2xl font-bold tracking-tight ${stat.money ? "text-[#16A34A]" : "text-white"}`}>{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.money ? "bg-[#0A1F0F]" : stat.pending ? "bg-[#1F1500]" : "bg-[#1A1A1A]"}`}>
                <stat.icon className={`h-5 w-5 ${stat.money ? "text-[#16A34A]" : stat.pending ? "text-[#F59E0B]" : "text-[#71717A]"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Projects */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-white">Your Active Projects</h2>
          <button onClick={() => setCurrentView("my-work")} className="flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-white transition-colors">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-5">
          {activeProjects.length === 0 ? (
            <div className="py-10 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-[#3F3F46]" />
              <p className="mt-2 text-sm text-[#71717A]">No active projects yet</p>
              <button onClick={() => setCurrentView("browse-projects")} className="mt-3 px-4 py-2 text-xs font-medium border border-[#2A2A2A] rounded-lg text-[#71717A] hover:border-[#EA580C] hover:text-white transition-colors">
                Browse Available Projects
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.slice(0, 3).map(project => (
                <ProjectCard key={project._id} project={{ ...project, tags: project.skills, budget: `₹${project.budget.toLocaleString()}`, milestones: project.milestones.length, status: "Active" }}
                  onClick={() => { setSelectedProject(project); setCurrentView("project-detail"); }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Matching Projects — orange left border */}
      {availableProjects.length > 0 && (
        <div className="bg-[#111111] border border-[#2A2A2A] border-l-4 border-l-[#EA580C] rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-md bg-[#1A0D07] flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-[#EA580C]" />
              </div>
              <h2 className="text-sm font-semibold text-white">Projects Matching Your Skills</h2>
            </div>
            <button onClick={() => setCurrentView("browse-projects")} className="flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-white transition-colors">
              See All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableProjects.slice(0, 3).map(project => (
                <ProjectCard key={project._id} project={{ ...project, tags: project.skills, budget: `₹${project.budget.toLocaleString()}`, milestones: project.milestones.length, status: "Open" }}
                  onClick={() => { setSelectedProject(project); setCurrentView("project-detail"); }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wallet Summary */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#71717A]">Available Balance</p>
            <p className="mt-1.5 text-3xl font-bold text-white tracking-tight">
              ₹{user.walletBalance?.toLocaleString() || 0}
            </p>
          </div>
          <button onClick={() => setCurrentView("wallet")} className="px-4 py-2 border border-[#EA580C] text-[#EA580C] text-sm font-semibold rounded-lg hover:bg-[#1A0D07] transition-colors">
            Manage Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
