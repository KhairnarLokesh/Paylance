"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  DollarSign,
  Briefcase,
  Star,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export default function FreelancerDashboard() {
  const { user, projects, setCurrentView, setSelectedProject } = useApp();

  const userId = user._id || user.id;
  // Get projects where freelancer is involved
  const appliedProjects = projects.filter((p) =>
    p.applications.some((a) => a.freelancerId === userId || a.freelancerId?._id === userId)
  );
  const activeProjects = projects.filter((p) => (p.assignedTo === userId || p.assignedTo?._id === userId) && p.status === "in_progress");
  const completedProjects = projects.filter((p) => (p.assignedTo === userId || p.assignedTo?._id === userId) && p.status === "completed");

  const pendingApplications = appliedProjects.filter((p) =>
    p.applications.find((a) => a.freelancerId === userId || a.freelancerId?._id === userId)?.status === "pending"
  );

  // Calculate earnings
  const totalEarnings = projects
    .filter((p) => p.assignedTo === userId || p.assignedTo?._id === userId)
    .reduce((sum, p) => {
      const approved = p.milestones.filter((m) => m.status === "approved");
      return sum + approved.reduce((ms, m) => ms + m.amount, 0);
    }, 0);

  // Find new matching projects
  const availableProjects = projects.filter(
    (p) =>
      p.status === "open" &&
      !p.applications.some((a) => a.freelancerId === userId || a.freelancerId?._id === userId) &&
      p.skills.some((skill) => user.skills?.includes(skill))
  );

  const stats = [
    {
      title: "Active Projects",
      value: activeProjects.length,
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Pending Apps",
      value: pendingApplications.length,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      title: "Completed",
      value: completedProjects.length,
      icon: CheckCircle,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground">
            {"Here's an overview of your freelancing activity"}
          </p>
        </div>
        <Button onClick={() => setCurrentView("browse-projects")}>
          <Search className="mr-2 h-4 w-4" />
          Find Projects
        </Button>
      </div>

      {/* Profile Summary */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">{user.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span>{user.rating || "New"}</span>
                  <span>•</span>
                  <span>{user.completedProjects || 0} projects completed</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skills?.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Projects */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Your Active Projects</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setCurrentView("my-work")}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {activeProjects.length === 0 ? (
            <div className="py-8 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No active projects yet</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => setCurrentView("browse-projects")}
              >
                Browse Available Projects
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project._id}
                  project={{
                    ...project,
                    tags: project.skills,
                    budget: `₹${project.budget.toLocaleString()}`,
                    milestones: project.milestones.length,
                    image: project.image,
                    status: "Active"
                  }}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentView("project-detail");
                  }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Projects */}
      {availableProjects.length > 0 && (
        <Card className="border-border border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">New Projects Matching Your Skills</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("browse-projects")}>
              See All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableProjects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project._id}
                  project={{
                    ...project,
                    tags: project.skills,
                    budget: `₹${project.budget.toLocaleString()}`,
                    milestones: project.milestones.length,
                    image: project.image,
                    status: "Open"
                  }}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentView("project-detail");
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallet Summary */}
      <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="mt-1 text-3xl font-bold text-card-foreground">
                ₹{user.walletBalance?.toLocaleString() || 0}
              </p>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("wallet")}>
              Manage Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
