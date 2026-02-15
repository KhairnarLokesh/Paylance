"use client";
import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, MessageSquare } from "lucide-react";
export default function MessagesPage() {
    const { user, projects, selectedChat, setSelectedChat, getProjectMessages, sendMessage, getUserById, setCurrentView, setSelectedProject, } = useApp();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState(null);
    const messagesEndRef = useRef(null);
    // Get all projects where user can chat
    const chatProjects = projects.filter((p) => {
        if (user.role === "client") {
            return p.clientId === user._id && p.assignedTo;
        }
        return p.assignedTo === user._id;
    });
    const currentChat = selectedChat
        ? chatProjects.find((p) => p._id === selectedChat.projectId)
        : null;
    // Load messages and other user details
    useEffect(() => {
        if (selectedChat) {
            const loadData = async () => {
                const msgs = await getProjectMessages(selectedChat.projectId);
                setMessages(msgs);
                const u = await getUserById(selectedChat.otherUserId);
                setOtherUser(u);
            };
            loadData();
            // Setup polling for new messages (simple way without websockets)
            const interval = setInterval(async () => {
                const msgs = await getProjectMessages(selectedChat.projectId);
                setMessages(msgs);
            }, 3000);
            return () => clearInterval(interval);
        }
        else {
            setMessages([]);
            setOtherUser(null);
        }
    }, [selectedChat, getProjectMessages, getUserById]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChat)
            return;
        const receiverId = user.role === "client" ? currentChat.assignedTo : currentChat.clientId;
        await sendMessage(currentChat._id, receiverId, newMessage);
        // Optimistic update
        const tempMsg = {
            _id: Date.now().toString(),
            projectId: currentChat._id,
            senderId: user._id,
            receiverId,
            content: newMessage,
            timestamp: new Date().toISOString()
        };
        setMessages([...messages, tempMsg]);
        setNewMessage("");
    };
    const selectChat = (project) => {
        const otherUserId = user.role === "client" ? project.assignedTo : project.clientId;
        setSelectedChat({ projectId: project._id, otherUserId });
    };
    return (<div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Chat List */}
      <Card className={`border-border ${selectedChat ? "hidden lg:flex" : "flex"} w-full flex-col lg:w-80`}>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          {chatProjects.length === 0 ? (<div className="flex h-full flex-col items-center justify-center p-4 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50"/>
              <p className="mt-2 text-muted-foreground">No conversations yet</p>
              <p className="text-sm text-muted-foreground">
                {user.role === "client"
                ? "Assign a freelancer to start chatting"
                : "Get assigned to a project to start chatting"}
              </p>
            </div>) : (<div className="divide-y divide-border">
              {chatProjects.map((project) => {
                const otherId = user.role === "client" ? project.assignedTo : project.clientId;
                const isSelected = selectedChat?.projectId === project._id;
                return (<button key={project._id} onClick={() => selectChat(project)} className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted ${isSelected ? "bg-muted" : ""}`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-semibold text-primary">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-card-foreground">
                        {project.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.role === "client" ? "Freelancer Chat" : "Client Chat"}
                      </p>
                    </div>
                  </button>);
            })}
            </div>)}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className={`flex-1 border-border ${selectedChat ? "flex" : "hidden lg:flex"} flex-col`}>
        {!selectedChat ? (<div className="flex h-full flex-col items-center justify-center text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground/30"/>
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              Select a conversation
            </p>
            <p className="text-sm text-muted-foreground">
              Choose from your active project chats
            </p>
          </div>) : (<>
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <button onClick={() => setSelectedChat(null)} className="text-muted-foreground hover:text-foreground lg:hidden">
                <ArrowLeft className="h-5 w-5"/>
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="font-semibold text-primary">
                  {otherUser?.name?.charAt(0) || "?"}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{otherUser?.name || "Loading..."}</p>
                <button onClick={() => {
                setSelectedProject(currentChat);
                setCurrentView("project-detail");
            }} className="text-sm text-primary hover:underline">
                  {currentChat?.title}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (<div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">No messages yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start the conversation!
                  </p>
                </div>) : (messages.map((msg) => {
                const isOwn = msg.senderId === user._id;
                return (<div key={msg._id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-card-foreground"}`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`mt-1 text-xs ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                        </p>
                      </div>
                    </div>);
            }))}
              <div ref={messagesEndRef}/>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1"/>
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4"/>
                </Button>
              </div>
            </form>
          </>)}
      </Card>
    </div>);
}
