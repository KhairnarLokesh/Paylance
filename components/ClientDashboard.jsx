"use client";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { FolderOpen, DollarSign, Users, Clock, ArrowRight, Plus, TrendingUp } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export default function ClientDashboard() {
  const { user, projects, setCurrentView, setSelectedProject } = useApp();
  const userId = user?._id || user?.id;
  const myProjects = projects.filter(p => {
    const id = p.clientId?._id || p.clientId;
    return id && String(id) === String(userId);
  });
  const openProjects = myProjects.filter(p => p.status === "open");
  const activeProjects = myProjects.filter(p => p.status === "in_progress");
  const totalSpent = myProjects.reduce((sum, p) =>
    sum + p.milestones.filter(m => m.status === "approved").reduce((ms, m) => ms + m.amount, 0), 0);
  const pendingApplications = myProjects.reduce((sum, p) =>
    sum + p.applications.filter(a => a.status === "pending").length, 0);

  const stats = [
    { title: "Active Projects", value: activeProjects.length, icon: FolderOpen },
    { title: "Open Projects", value: openProjects.length, icon: Clock },
    { title: "Pending Reviews", value: pendingApplications, icon: Users, warning: pendingApplications > 0 },
    { title: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, icon: DollarSign, money: true },
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Welcome */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-[#71717A] mt-0.5">{"Here's what's happening with your projects."}</p>
        </div>
        <Button onClick={() => setCurrentView("create-project")} className="h-9 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg">
          <Plus className="mr-1.5 h-4 w-4" /> Post New Project
        </Button>
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
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.money ? "bg-[#0A1F0F]" : stat.warning ? "bg-[#1F1500]" : "bg-[#1A1A1A]"}`}>
                <stat.icon className={`h-5 w-5 ${stat.money ? "text-[#16A34A]" : stat.warning ? "text-[#F59E0B]" : "text-[#71717A]"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Projects */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-white">Active Projects</h2>
          <button onClick={() => setCurrentView("my-projects")} className="flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-white transition-colors">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-5">
          {activeProjects.length === 0 ? (
            <div className="py-10 text-center">
              <FolderOpen className="mx-auto h-10 w-10 text-[#3F3F46]" />
              <p className="mt-2 text-sm text-[#71717A]">No active projects yet</p>
              <button onClick={() => setCurrentView("create-project")}
                className="mt-3 px-4 py-2 text-xs font-medium border border-[#2A2A2A] rounded-lg text-[#71717A] hover:border-[#EA580C] hover:text-white transition-colors">
                Post Your First Project
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.slice(0, 3).map(project => (
                <ProjectCard key={project._id} project={{ ...project, tags: project.skills, budget: `₹${project.budget.toLocaleString()}`, milestones: project.milestones.length, status: "In Progress" }}
                  onClick={() => { setSelectedProject(project); setCurrentView("project-detail"); }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Applications Banner */}
      {pendingApplications > 0 && (
        <div className="bg-[#111111] border border-[#2A2A2A] border-l-4 border-l-[#F59E0B] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#1F1500] flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{pendingApplications} Pending Application{pendingApplications > 1 ? "s" : ""}</h3>
                <p className="text-xs text-[#71717A]">Review freelancer applications for your projects</p>
              </div>
            </div>
            <button onClick={() => setCurrentView("my-projects")} className="px-3 py-1.5 text-xs font-medium border border-[#2A2A2A] rounded-lg text-[#71717A] hover:border-[#EA580C] hover:text-white transition-colors whitespace-nowrap">
              Review Now
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center shrink-0">
            <TrendingUp className="h-5 w-5 text-[#71717A]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Tips for Success</h3>
            <ul className="mt-2 space-y-1 text-xs text-[#71717A]">
              <li>• Write clear project descriptions with specific requirements</li>
              <li>• Set realistic milestones and deadlines</li>
              <li>• Review demo projects carefully before approving</li>
              <li>• Communicate regularly with your freelancer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
