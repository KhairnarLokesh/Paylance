"use client";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, DollarSign, Users, Clock, ArrowRight, Plus, TrendingUp, } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
export default function ClientDashboard() {
    const { user, projects, setCurrentView, setSelectedProject } = useApp();
    const userId = user?._id || user?.id;
    const myProjects = projects.filter((p) => {
        const pClientId = p.clientId?._id || p.clientId;
        return pClientId && String(pClientId) === String(userId);
    });
    const openProjects = myProjects.filter((p) => p.status === "open");
    const activeProjects = myProjects.filter((p) => p.status === "in_progress");
    const completedProjects = myProjects.filter((p) => p.status === "completed");
    const totalSpent = myProjects.reduce((sum, p) => {
        const approvedMilestones = p.milestones.filter((m) => m.status === "approved");
        return sum + approvedMilestones.reduce((ms, m) => ms + m.amount, 0);
    }, 0);
    const pendingApplications = myProjects.reduce((sum, p) => sum + p.applications.filter((a) => a.status === "pending").length, 0);
    const stats = [
        {
            title: "Active Projects",
            value: activeProjects.length,
            icon: FolderOpen,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            title: "Open Projects",
            value: openProjects.length,
            icon: Clock,
            color: "text-accent",
            bg: "bg-accent/10",
        },
        {
            title: "Pending Reviews",
            value: pendingApplications,
            icon: Users,
            color: "text-warning",
            bg: "bg-warning/10",
        },
        {
            title: "Total Spent",
            value: `₹${totalSpent.toLocaleString()}`,
            icon: DollarSign,
            color: "text-success",
            bg: "bg-success/10",
        },
    ];
    return (<div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground">
            {"Here's what's happening with your projects"}
          </p>
        </div>
        <Button onClick={() => setCurrentView("create-project")}>
          <Plus className="mr-2 h-4 w-4"/>
          Post New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (<Card key={stat.title} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`}/>
                </div>
              </div>
            </CardContent>
          </Card>))}
      </div>

      {/* Active Projects */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Active Projects</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setCurrentView("my-projects")}>
            View All
            <ArrowRight className="ml-2 h-4 w-4"/>
          </Button>
        </CardHeader>
        <CardContent>
          {activeProjects.length === 0 ? (<div className="py-8 text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/50"/>
              <p className="mt-2 text-muted-foreground">No active projects yet</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setCurrentView("create-project")}>
                Post Your First Project
              </Button>
            </div>) : (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.slice(0, 3).map((project) => (<ProjectCard key={project._id} project={{
                    ...project,
                    tags: project.skills,
                    budget: `₹${project.budget.toLocaleString()}`,
                    milestones: project.milestones.length,
                    image: project.image,
                    status: project.status === "in_progress" ? "In Progress" : project.status.charAt(0)?.toUpperCase() + project.status?.slice(1)
                }} onClick={() => {
                    setSelectedProject(project);
                    setCurrentView("project-detail");
                }}/>))}
            </div>)}
        </CardContent>
      </Card>

      {/* Pending Applications */}
      {pendingApplications > 0 && (<Card className="border-border border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-warning/10 p-3">
                  <Users className="h-6 w-6 text-warning"/>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {pendingApplications} Pending Application{pendingApplications > 1 ? "s" : ""}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review freelancer applications for your projects
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setCurrentView("my-projects")}>
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>)}

      {/* Quick Tips */}
      <Card className="border-border bg-secondary/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <TrendingUp className="h-6 w-6 text-primary"/>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">Tips for Success</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Write clear project descriptions with specific requirements</li>
                <li>• Set realistic milestones and deadlines</li>
                <li>• Review demo projects carefully before approving</li>
                <li>• Communicate regularly with your freelancer</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);
}
