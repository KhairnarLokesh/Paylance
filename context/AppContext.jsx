"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentView, setCurrentView] = useState("landing");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to update project in both list and selected view
  const updateLocalProject = (updatedProject) => {
    setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p));
    setSelectedProject(prev => (prev && prev._id === updatedProject._id ? updatedProject : prev));
  };

  // Fetch all user data
  const fetchUserData = useCallback(async (userId) => {
    try {
      const [projRes, notifRes, transRes, userRes] = await Promise.all([
        fetch('/api/projects'),
        fetch(`/api/notifications?userId=${userId}`),
        fetch(`/api/wallet?userId=${userId}`),
        fetch(`/api/users/${userId}`)
      ]);

      const [projectsData, notificationsData, transactionsData, userData] = await Promise.all([
        projRes.json(),
        notifRes.json(),
        transRes.json(),
        userRes.json()
      ]);

      setProjects(projectsData);
      setNotifications(notificationsData);
      setTransactions(transactionsData);

      if (userData && !userData.error) {
        // Correcting ID consistency
        const sanitizedUser = { ...userData, id: userData._id || userData.id, _id: userData._id || userData.id };
        setUser(sanitizedUser);
        localStorage.setItem("paylance_user", JSON.stringify(sanitizedUser));
      }

      // Update selected project if it exists in the new data
      setSelectedProject(prev => {
        if (!prev) return prev;
        const found = projectsData.find(p => p._id === prev._id);
        return found || prev;
      });

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  // Check for saved session
  useEffect(() => {
    const savedUser = localStorage.getItem("paylance_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Compatibility fix: ensure _id exists if only id exists
      if (parsed.id && !parsed._id) parsed._id = parsed.id;
      if (parsed._id && !parsed.id) parsed.id = parsed._id;

      setUser(parsed);
      setCurrentView("landing");
      fetchUserData(parsed._id || parsed.id);
    }
    setLoading(false);
  }, [fetchUserData]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("paylance_user", JSON.stringify(data.user));
        setCurrentView("landing");
        await fetchUserData(data.user._id || data.user.id);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("paylance_user", JSON.stringify(data.user));
        setCurrentView("landing");
        await fetchUserData(data.user._id || data.user.id);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("paylance_user");
    setCurrentView("landing");
    setSelectedProject(null);
    setSelectedChat(null);
    setProjects([]);
    setNotifications([]);
    setTransactions([]);
  };

  const createProject = async (projectData) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...projectData, clientId: user?._id || user?.id })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      setProjects(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  const applyToProject = async (projectId, applicationData) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...applicationData,
          freelancerId: user.id,
          freelancerName: user.name
        })
      });
      const updatedProject = await res.json();
      updateLocalProject(updatedProject);
    } catch (error) {
      console.error("Error applying to project:", error);
    }
  };

  const reviewApplication = async (projectId, freelancerId, decision) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/applications/${freelancerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision })
      });

      const updatedProject = await res.json();

      if (!res.ok) {
        throw new Error(updatedProject.error || 'Failed to review application');
      }

      updateLocalProject(updatedProject);

      if (user) {
        await fetchUserData(user._id || user.id); // Refresh notifications
      }
    } catch (error) {
      console.error("Error reviewing application:", error);
    }
  };

  const depositEscrow = async (projectId, amount) => {
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          type: 'escrow_deposit',
          amount,
          projectId,
          description: `Escrow deposit for project`
        })
      });
      const data = await res.json();
      if (data.success) {
        // Update local status
        setUser({ ...user, walletBalance: data.walletBalance });
        const projRes = await fetch(`/api/projects/${projectId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ escrowAmount: amount })
        });
        const updatedProject = await projRes.json();
        updateLocalProject(updatedProject);
        setTransactions([data.transaction, ...transactions]);
      }
    } catch (error) {
      console.error("Error depositing escrow:", error);
    }
  };

  const submitMilestone = async (projectId, milestoneId, submission) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit', submission })
      });
      const updatedProject = await res.json();
      updateLocalProject(updatedProject);
    } catch (error) {
      console.error("Error submitting milestone:", error);
    }
  };

  const approveMilestone = async (projectId, milestoneId) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' })
      });
      const updatedProject = await res.json();

      if (!res.ok) {
        throw new Error(updatedProject.error || 'Failed to approve milestone');
      }

      updateLocalProject(updatedProject);
      await fetchUserData(user.id); // Refresh wallet and notifications
    } catch (error) {
      console.error("Error approving milestone:", error);
    }
  };

  const sendMessage = async (projectId, receiverId, content) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, senderId: user.id, receiverId, content })
      });
      const newMessage = await res.json();
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const markNotificationRead = async (notifId) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifId })
      });
      setNotifications(notifications.map(n => n._id === notifId ? { ...n, read: true } : n));
    } catch (error) {
      console.error("Error marking notification read:", error);
    }
  };

  const addFunds = async (amount) => {
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          type: 'deposit',
          amount,
          description: "Added funds to wallet"
        })
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, walletBalance: data.walletBalance });
        setTransactions([data.transaction, ...transactions]);
      }
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  const withdrawFunds = async (amount) => {
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          type: 'withdrawal',
          amount,
          description: "Withdrawn to bank account"
        })
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, walletBalance: data.walletBalance });
        setTransactions([data.transaction, ...transactions]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      return false;
    }
  };

  const getProjectMessages = async (projectId) => {
    const res = await fetch(`/api/messages?projectId=${projectId}`);
    return await res.json();
  };

  const getUserById = async (id) => {
    // This could be optimized by caching
    const res = await fetch(`/api/users/${id}`);
    return await res.json();
  };

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem("paylance_user", JSON.stringify(updatedUser));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        projects,
        messages,
        notifications,
        transactions,
        currentView,
        selectedProject,
        selectedChat,
        loading,
        setCurrentView,
        setSelectedProject,
        setSelectedChat,
        login,
        register,
        logout,
        createProject,
        applyToProject,
        reviewApplication,
        depositEscrow,
        submitMilestone,
        approveMilestone,
        sendMessage,
        markNotificationRead,
        addFunds,
        withdrawFunds,
        getProjectMessages,
        getUserById,
        updateUser,
        refreshData: () => fetchUserData(user?.id || user?._id),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
