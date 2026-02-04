"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Loader2,
  Github,
  Globe,
} from "lucide-react";

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "DevOps",
  "Content Writing",
  "Digital Marketing",
  "Other",
];

const skillOptions = [
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "Django",
  "PostgreSQL",
  "AWS",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Figma",
  "UI/UX",
  "Mobile Design",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Machine Learning",
  "Docker",
  "Kubernetes",
];

export function CreateProjectPage() {
  const { user, createProject, setCurrentView } = useApp();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    budget: "",
    image: "",
    milestones: [{ title: "", amount: "", deadline: "" }],
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: "", amount: "", deadline: "" }],
    });
  };

  const updateMilestone = (index, field, value) => {
    const updated = formData.milestones.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    setFormData({ ...formData, milestones: updated });
  };

  const removeMilestone = (index) => {
    if (formData.milestones.length > 1) {
      setFormData({
        ...formData,
        milestones: formData.milestones.filter((_, i) => i !== index),
      });
    }
  };

  const toggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      updateField(
        "skills",
        formData.skills.filter((s) => s !== skill)
      );
    } else {
      updateField("skills", [...formData.skills, skill]);
    }
  };

  const totalBudget = formData.milestones.reduce(
    (sum, m) => sum + (Number.parseFloat(m.amount) || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    try {
      await createProject({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: formData.skills,
        budget: totalBudget,
        image: formData.image || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
        milestones: formData.milestones.map((m) => ({
          title: m.title,
          amount: Number.parseFloat(m.amount),
          deadline: m.deadline,
          status: "pending",
        })),
      });
      setCurrentView("my-projects");
    } catch (err) {
      alert(err.message || "Failed to post project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => setCurrentView("client-dashboard")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Post a New Project</h1>
        <p className="text-muted-foreground">Fill in the details to find the right freelancer</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="e.g., E-commerce Website Development"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project requirements, goals, and expectations..."
                rows={5}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Project Image URL (Optional)</Label>
              <Input
                id="image"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.image}
                onChange={(e) => updateField("image", e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">Add a high-quality image link to make your project stand out.</p>
            </div>

            <div className="space-y-2">
              <Label>Required Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${formData.skills.includes(skill)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Milestones</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.milestones.map((milestone, index) => (
              <div
                key={index}
                className="relative space-y-3 rounded-lg border border-border p-4"
              >
                {formData.milestones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  Milestone {index + 1}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-2 sm:col-span-1">
                    <Label>Title</Label>
                    <Input
                      placeholder="e.g., UI Design"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, "title", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      placeholder="500"
                      value={milestone.amount}
                      onChange={(e) => updateMilestone(index, "amount", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={milestone.deadline}
                      onChange={(e) => updateMilestone(index, "deadline", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <span className="font-medium text-foreground">Total Budget</span>
              <span className="text-xl font-bold text-primary">
                ${totalBudget.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => setCurrentView("client-dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Posting..." : "Post Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function BrowseProjectsPage() {
  const { user, projects, setCurrentView, setSelectedProject } = useApp();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const availableProjects = projects.filter((p) => p.status === "open");

  const filteredProjects = availableProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const hasApplied = (project) => {
    const userId = user._id || user.id;
    return project.applications.some((a) => a.freelancerId === userId || a.freelancerId?._id === userId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Browse Projects</h1>
        <p className="text-muted-foreground">Find projects that match your skills</p>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Project List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No projects found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={{
                  ...project,
                  tags: project.skills,
                  budget: `₹${project.budget.toLocaleString()}`,
                  milestones: project.milestones.length,
                  image: project.image
                }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentView("project-detail");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MyProjectsPage() {
  const { user, projects, setCurrentView, setSelectedProject } = useApp();
  const [filter, setFilter] = useState("all");

  const userId = user?._id || user?.id;
  const myProjects = projects.filter((p) => {
    const pClientId = p.clientId?._id || p.clientId;
    return pClientId && String(pClientId) === String(userId);
  });

  const filteredProjects =
    filter === "all" ? myProjects : myProjects.filter((p) => p.status === filter);

  const getStatusBadge = (status) => {
    const styles = {
      open: "bg-accent text-accent-foreground",
      in_progress: "bg-primary text-primary-foreground",
      completed: "bg-success text-success-foreground",
    };
    const labels = {
      open: "Open",
      in_progress: "In Progress",
      completed: "Completed",
    };
    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Manage all your posted projects</p>
        </div>
        <Button onClick={() => setCurrentView("create-project")}>
          <Plus className="mr-2 h-4 w-4" />
          Post Project
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: "all", label: "All" },
          { id: "open", label: "Open" },
          { id: "in_progress", label: "In Progress" },
          { id: "completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={{
                  ...project,
                  tags: project.skills,
                  budget: `₹${project.budget.toLocaleString()}`,
                  milestones: project.milestones.length,
                  image: project.image,
                  status: project.status === "in_progress" ? "In Progress" : project.status.charAt(0)?.toUpperCase() + project.status?.slice(1)
                }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentView("project-detail");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MyWorkPage() {
  const { user, projects, setCurrentView, setSelectedProject } = useApp();
  const [filter, setFilter] = useState("all");

  const myWork = projects.filter(
    (p) =>
      p.assignedTo === user._id ||
      p.applications.some((a) => a.freelancerId === user._id)
  );

  const filteredWork = myWork.filter((p) => {
    if (filter === "all") return true;
    if (filter === "active") return p.assignedTo === user._id && p.status === "in_progress";
    if (filter === "pending")
      return p.applications.find((a) => a.freelancerId === user._id)?.status === "pending";
    if (filter === "completed") return p.assignedTo === user._id && p.status === "completed";
    return true;
  });

  const getStatusForFreelancer = (project) => {
    if (project.assignedTo === user._id) {
      if (project.status === "completed") return { label: "Completed", style: "bg-success text-success-foreground" };
      return { label: "Active", style: "bg-primary text-primary-foreground" };
    }
    const app = project.applications.find((a) => a.freelancerId === user._id);
    if (app?.status === "pending") return { label: "Pending", style: "bg-warning text-warning-foreground" };
    if (app?.status === "rejected") return { label: "Rejected", style: "bg-destructive text-destructive-foreground" };
    return { label: "Applied", style: "bg-muted text-muted-foreground" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Work</h1>
        <p className="text-muted-foreground">Track your applications and active projects</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "pending", label: "Pending" },
          { id: "completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Work List */}
      <div className="space-y-4">
        {filteredWork.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No work found</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => setCurrentView("browse-projects")}
              >
                Browse Projects
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWork.map((project) => {
              const status = getStatusForFreelancer(project);

              return (
                <ProjectCard
                  key={project._id}
                  project={{
                    ...project,
                    tags: project.skills,
                    budget: `₹${project.budget.toLocaleString()}`,
                    milestones: project.milestones.length,
                    image: project.image,
                    status: status.label
                  }}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentView("project-detail");
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const {
    user,
    selectedProject: project,
    setCurrentView,
    applyToProject,
    reviewApplication,
    depositEscrow,
    submitMilestone,
    approveMilestone,
    getUserById,
    setSelectedChat,
  } = useApp();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    demoUrl: "",
    coverLetter: "",
  });
  const [milestoneSubmission, setMilestoneSubmission] = useState({
    githubUrl: "",
    liveUrl: "",
    notes: "",
  });
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [processingMilestone, setProcessingMilestone] = useState(null);

  if (!project) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Project not found</p>
        <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setCurrentView("landing")}>
          Go Back
        </Button>
      </div>
    );
  }

  const userId = user?._id || user?.id;
  const isClient = user?.role === "client" && (
    String(project.clientId?._id || project.clientId) === String(userId)
  );
  const isAssignedFreelancer = project.assignedTo && String(project.assignedTo?._id || project.assignedTo) === String(userId);
  const hasApplied = project.applications.some((a) => String(a.freelancerId?._id || a.freelancerId) === String(userId));
  const myApplication = project.applications.find((a) => String(a.freelancerId?._id || a.freelancerId) === String(userId));
  // const assignedFreelancer = project.assignedTo ? getUserById(project.assignedTo?._id || project.assignedTo) : null;
  const [assignedFreelancer, setAssignedFreelancer] = useState(null);

  useEffect(() => {
    const fetchAssignedUser = async () => {
      if (project.assignedTo) {
        try {
          const id = project.assignedTo?._id || project.assignedTo;
          const user = await getUserById(id);
          setAssignedFreelancer(user);
        } catch (error) {
          console.error("Failed to fetch assigned freelancer", error);
        }
      } else {
        setAssignedFreelancer(null);
      }
    };
    fetchAssignedUser();
  }, [project.assignedTo, getUserById]);


  const handleApply = () => {
    applyToProject(project._id, applicationData);
    setShowApplyModal(false);
    setApplicationData({ demoUrl: "", coverLetter: "" });
  };

  const handleSubmitMilestone = (milestoneId) => {
    submitMilestone(project._id, milestoneId, {
      ...milestoneSubmission,
      submittedAt: new Date(),
    });
    setMilestoneSubmission({ githubUrl: "", liveUrl: "", notes: "" });
    setSelectedMilestone(null);
  };

  const handleApproveMilestone = async (milestoneId) => {
    setProcessingMilestone(milestoneId);
    await approveMilestone(project._id, milestoneId);
    setProcessingMilestone(null);
  };

  const handleStartChat = () => {
    const otherUserId = isClient ? project.assignedTo : project.clientId;
    setSelectedChat({ projectId: project._id, otherUserId });
    setCurrentView("messages");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() =>
          setCurrentView(
            user.role === "client"
              ? isClient
                ? "my-projects"
                : "client-dashboard"
              : hasApplied || isAssignedFreelancer
                ? "my-work"
                : "browse-projects"
          )
        }
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Project Header */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-card-foreground">{project.title}</h1>
                <Badge
                  className={
                    project.status === "open"
                      ? "bg-accent text-accent-foreground"
                      : project.status === "in_progress"
                        ? "bg-primary text-primary-foreground"
                        : "bg-success text-success-foreground"
                  }
                >
                  {project.status === "in_progress" ? "In Progress" : project.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-bold text-primary">
                ${project.budget.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {!isClient && !hasApplied && project.status === "open" && (
              <Button onClick={() => setShowApplyModal(true)}>Apply Now</Button>
            )}
            {hasApplied && !isAssignedFreelancer && (
              <Badge variant="secondary" className="h-9 px-4">
                Application {myApplication?.status}
              </Badge>
            )}
            {(isAssignedFreelancer || (isClient && project.assignedTo)) && (
              <Button variant="outline" onClick={handleStartChat}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Freelancer (for client) */}
      {isClient && project.assignedTo && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Assigned Freelancer</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedFreelancer ? (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">
                    {assignedFreelancer.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">{assignedFreelancer.name}</p>
                  <p className="text-sm text-muted-foreground">{assignedFreelancer.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading freelancer details...</span>
              </div>
            )}
          </CardContent>
        </Card>

      )}

      {/* Escrow (for client) */}
      {isClient && project.status === "in_progress" && project.escrowAmount === 0 && (
        <Card className="border-border border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-6 w-6 text-warning" />
                <div>
                  <p className="font-semibold text-card-foreground">Deposit Required</p>
                  <p className="text-sm text-muted-foreground">
                    Deposit funds to escrow to start the project
                  </p>
                </div>
              </div>
              <Button onClick={() => depositEscrow(project._id, project.budget)}>
                <DollarSign className="mr-2 h-4 w-4" />
                Deposit ${project.budget}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Milestones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.milestones.map((milestone, index) => (
            <div
              key={milestone._id}
              className={`rounded-lg border p-4 ${milestone.status === "approved"
                ? "border-success/50 bg-success/5"
                : milestone.status === "submitted"
                  ? "border-warning/50 bg-warning/5"
                  : "border-border"
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${milestone.status === "approved"
                      ? "bg-success text-success-foreground"
                      : milestone.status === "submitted"
                        ? "bg-warning text-warning-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {milestone.status === "approved" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">{milestone.title}</h4>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {milestone.amount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {milestone.deadline}
                      </span>
                    </div>
                    {milestone.submission && (
                      <div className="mt-3 space-y-2 border-l-2 border-primary/20 pl-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Submission</p>
                        {typeof milestone.submission === 'string' ? (
                          <p className="text-sm text-foreground">{milestone.submission}</p>
                        ) : (
                          <>
                            {milestone.submission.notes && (
                              <p className="text-sm text-foreground">{milestone.submission.notes}</p>
                            )}
                            <div className="flex flex-wrap gap-3">
                              {milestone.submission.githubUrl && (
                                <a
                                  href={milestone.submission.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                >
                                  <Github className="h-3.5 w-3.5" />
                                  GitHub Repo
                                </a>
                              )}
                              {milestone.submission.liveUrl && (
                                <a
                                  href={milestone.submission.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                >
                                  <Globe className="h-3.5 w-3.5" />
                                  Live Demo
                                </a>
                              )}
                            </div>
                            {milestone.submission.submittedAt && (
                              <p className="text-[10px] text-muted-foreground">
                                Submitted on {new Date(milestone.submission.submittedAt).toLocaleDateString()}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Badge
                  variant={milestone.status === "pending" ? "secondary" : "default"}
                  className={
                    milestone.status === "approved"
                      ? "bg-success text-success-foreground"
                      : milestone.status === "submitted"
                        ? "bg-warning text-warning-foreground"
                        : ""
                  }
                >
                  {milestone.status}
                </Badge>
              </div>

              {/* Freelancer Actions */}
              {isAssignedFreelancer &&
                milestone.status === "pending" &&
                project.escrowAmount > 0 && (
                  <div className="mt-4">
                    {selectedMilestone === milestone._id ? (
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <Label htmlFor="githubUrl" className="text-xs">GitHub Repository URL</Label>
                            <Input
                              id="githubUrl"
                              placeholder="https://github.com/..."
                              value={milestoneSubmission.githubUrl}
                              onChange={(e) => setMilestoneSubmission({ ...milestoneSubmission, githubUrl: e.target.value })}
                              className="h-9 text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="liveUrl" className="text-xs">Live Hosted Link</Label>
                            <Input
                              id="liveUrl"
                              placeholder="https://yourapp.com/..."
                              value={milestoneSubmission.liveUrl}
                              onChange={(e) => setMilestoneSubmission({ ...milestoneSubmission, liveUrl: e.target.value })}
                              className="h-9 text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="notes" className="text-xs">Submission Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Describe what you've completed in this milestone..."
                            value={milestoneSubmission.notes}
                            onChange={(e) => setMilestoneSubmission({ ...milestoneSubmission, notes: e.target.value })}
                            rows={3}
                            className="text-sm"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            onClick={() => handleSubmitMilestone(milestone._id)}
                            disabled={!milestoneSubmission.githubUrl && !milestoneSubmission.liveUrl && !milestoneSubmission.notes}
                          >
                            Submit Milestone
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedMilestone(null);
                              setMilestoneSubmission({ githubUrl: "", liveUrl: "", notes: "" });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMilestone(milestone._id)}
                      >
                        Submit Work
                      </Button>
                    )}
                  </div>
                )}

              {/* Client Actions */}
              {isClient && milestone.status === "submitted" && (
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    disabled={processingMilestone === milestone._id}
                    onClick={() => handleApproveMilestone(milestone._id)}
                  >
                    {processingMilestone === milestone._id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Approve & Release ${milestone.amount}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Applications (for client) */}
      {
        isClient && project.status === "open" && project.applications.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">
                Applications ({project.applications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.applications.map((app) => (
                <ApplicationCard
                  key={app.freelancerId}
                  app={app}
                  project={project}
                />
              ))}
            </CardContent>
          </Card>
        )
      }

      {/* Apply Modal */}
      {
        showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
            <Card className="w-full max-w-lg border-border">
              <CardHeader>
                <CardTitle>Apply for {project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo Project URL (Required)</Label>
                  <Input
                    id="demoUrl"
                    placeholder="https://github.com/yourproject or portfolio link"
                    value={applicationData.demoUrl}
                    onChange={(e) =>
                      setApplicationData({ ...applicationData, demoUrl: e.target.value })
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Submit a relevant demo project for the client to review
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Explain why you're the best fit for this project..."
                    rows={4}
                    value={applicationData.coverLetter}
                    onChange={(e) =>
                      setApplicationData({ ...applicationData, coverLetter: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleApply}
                    disabled={!applicationData.demoUrl}
                  >
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }
    </div >
  );
}

function ApplicationCard({ app, project }) {
  const { getUserById, reviewApplication } = useApp();
  const [freelancer, setFreelancer] = useState(null);

  // Ensure we have a string ID
  const freelancerId = typeof app.freelancerId === 'object' ? app.freelancerId._id : app.freelancerId;

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        if (freelancerId) {
          const user = await getUserById(freelancerId);
          setFreelancer(user);
        }
      } catch (err) {
        console.error("Failed to fetch freelancer", err);
      }
    };
    fetchFreelancer();
  }, [freelancerId, getUserById]);

  if (!freelancer) return <div className="p-4"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">
              {freelancer.name?.charAt(0) || '?'}
            </span>
          </div>
          <div>
            <p className="font-semibold text-card-foreground">
              {freelancer.name}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {freelancer.skills?.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
              {app.coverLetter}
            </div>
            {app.demoUrl && (
              <a
                href={app.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
                View Demo Project
              </a>
            )}
          </div>
        </div>
        {app.status === "pending" ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() =>
                reviewApplication(project._id, freelancerId, "approved")
              }
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                reviewApplication(project._id, freelancerId, "rejected")
              }
            >
              <XCircle className="mr-1 h-4 w-4" />
              Reject
            </Button>
          </div>
        ) : (
          <Badge
            className={
              app.status === "approved"
                ? "bg-success text-success-foreground"
                : "bg-destructive text-destructive-foreground"
            }
          >
            {app.status}
          </Badge>
        )}
      </div>
    </div>
  );
}
