"use client";

import { AppProvider, useApp } from "@/context/AppContext";
import LandingPage from "@/components/LandingPage";
import { LoginPage, RegisterPage } from "@/components/AuthPages";
import DashboardLayout from "@/components/DashboardLayout";
import ClientDashboard from "@/components/ClientDashboard";
import FreelancerDashboard from "@/components/FreelancerDashboard";
import {
  CreateProjectPage,
  BrowseProjectsPage,
  MyProjectsPage,
  MyWorkPage,
  ProjectDetailPage,
} from "@/components/ProjectPages";
import MessagesPage from "@/components/MessagesPage";
import WalletPage from "@/components/WalletPage";

function AppContent() {
  const { currentView, user } = useApp();

  // Public pages
  if (currentView === "landing") return <LandingPage />;
  if (currentView === "login") return <LoginPage />;
  if (currentView === "register") return <RegisterPage />;

  // Protected pages require user
  if (!user) return <LandingPage />;

  // Dashboard pages
  const renderDashboardContent = () => {
    switch (currentView) {
      case "client-dashboard":
        return <ClientDashboard />;
      case "freelancer-dashboard":
        return <FreelancerDashboard />;
      case "create-project":
        return <CreateProjectPage />;
      case "browse-projects":
        return <BrowseProjectsPage />;
      case "my-projects":
        return <MyProjectsPage />;
      case "my-work":
        return <MyWorkPage />;
      case "project-detail":
        return <ProjectDetailPage />;
      case "messages":
        return <MessagesPage />;
      case "wallet":
        return <WalletPage />;
      default:
        return user.role === "client" ? <ClientDashboard /> : <FreelancerDashboard />;
    }
  };

  return <DashboardLayout>{renderDashboardContent()}</DashboardLayout>;
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
