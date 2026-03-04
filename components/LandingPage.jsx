"use client";
import { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Services from "@/components/Services";
import ScrollAnimation from "@/components/ScrollAnimation";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight, ShieldCheck, Bell, User, LogOut, LayoutDashboard,
  UserCircle, Plus, Menu, X, Users, Lock, Briefcase, Zap, Star, Globe, Shield,
} from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";
import GlareHover from "@/components/GlareHover";

export default function LandingPage() {
  const { setCurrentView, user, logout, notifications } = useApp();
  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  const demoProjects = [
    { title: "E-commerce Website Development", description: "Build a full-featured online store with product management, secure checkout, and user accounts.", tags: ["React", "Node.js", "MongoDB"], budget: "₹25,000 – ₹40,000", milestones: 3, image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800", status: "Demo" },
    { title: "Mobile App for Food Delivery", description: "Develop a cross-platform mobile app for real-time food ordering and delivery tracking.", tags: ["Flutter", "Firebase", "Dart"], budget: "₹35,000 – ₹55,000", milestones: 4, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", status: "Demo" },
    { title: "AI Chatbot Integration", description: "Implement an intelligent customer support bot using OpenAI's GPT for automated replies.", tags: ["Python", "OpenAI", "Next.js"], budget: "₹15,000 – ₹25,000", milestones: 2, image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800", status: "Demo" },
    { title: "Portfolio Website for Designer", description: "Create a stunning, high-performance portfolio with smooth animations and case studies.", tags: ["Framer", "React", "Tailwind"], budget: "₹10,000 – ₹18,000", milestones: 2, image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800", status: "Demo" },
    { title: "SaaS Dashboard Redesign", description: "Modernize a B2B SaaS dashboard with improved data visualization and UX.", tags: ["UI/UX", "Figma", "Next.js"], budget: "₹45,000 – ₹70,000", milestones: 5, image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800", status: "Demo" },
    { title: "Automated Testing Suite", description: "Design and implement comprehensive end-to-end tests for a large-scale web app.", tags: ["Jest", "Cypress", "Node.js"], budget: "₹20,000 – ₹30,000", milestones: 3, image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800", status: "Demo" },
  ];

  const stats = [
    { value: "5,200+", label: "Freelancers" },
    { value: "₹2Cr+", label: "Secured in Escrow" },
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const trustFeatures = [
    { icon: ShieldCheck, title: "1. Offer or Search", desc: "List your skills or find perfect talent for your project needs in seconds." },
    { icon: Users, title: "2. Connect & Agree", desc: "Chat securely, set clear expectations, and finalize the scope together." },
    { icon: Lock, title: "3. Funds in Escrow", desc: "Payment is secured before work begins. No ambiguity, zero risk for both sides." },
    { icon: User, title: "24/7 Support", desc: "Our team is available round the clock to resolve any disputes or questions." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EA580C]">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">PAYLANCE</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm font-medium text-[#71717A]">
                <button onClick={() => document.getElementById('demo-projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Explore</button>
                <button onClick={() => document.getElementById('why-paylance')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Why Paylance</button>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Services</button>
              </div>

              {user ? (
                <div className="flex items-center gap-2">
                  {user.role === 'client' && (
                    <button onClick={() => setCurrentView('create-project')} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#71717A] border border-[#2A2A2A] rounded-lg hover:border-[#EA580C] hover:text-white transition-all">
                      <Plus className="h-3.5 w-3.5" /> Post Project
                    </button>
                  )}
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A] transition-colors">
                        <Bell className="h-4 w-4 text-[#71717A]" />
                        {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EA580C] text-[9px] font-bold text-white">{unreadCount}</span>}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 rounded-xl bg-[#111111] border-[#2A2A2A] shadow-2xl p-1">
                      <div className="px-3 py-2 border-b border-[#2A2A2A]"><p className="text-xs font-semibold text-white uppercase tracking-wider">Notifications</p></div>
                      {!notifications?.length ? <p className="text-center text-xs text-[#71717A] py-6">No new notifications</p> :
                        notifications.slice(0, 5).map(n => (
                          <div key={n._id || n.id} className="px-3 py-2.5 hover:bg-[#1A1A1A] rounded-lg cursor-pointer transition-colors">
                            <p className="text-xs font-semibold text-white">{n.title}</p>
                            <p className="text-[11px] text-[#71717A] line-clamp-2">{n.message}</p>
                          </div>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white text-xs font-bold hover:border-[#EA580C] transition-colors overflow-hidden">
                        {user.profile_image ? <img src={user.profile_image} alt={user.name} className="h-full w-full object-cover" /> : user.name?.charAt(0).toUpperCase()}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 rounded-xl bg-[#111111] border-[#2A2A2A] shadow-2xl p-1">
                      <div className="px-3 py-3 border-b border-[#2A2A2A] mb-1">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-[#71717A] truncate">{user.email}</p>
                      </div>
                      <DropdownMenuItem onClick={() => setCurrentView('profile')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer transition-colors"><UserCircle className="h-4 w-4" />My Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer transition-colors"><LayoutDashboard className="h-4 w-4" />Dashboard</DropdownMenuItem>
                      <div className="my-1 h-px bg-[#2A2A2A]" />
                      <DropdownMenuItem onClick={logout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"><LogOut className="h-4 w-4" />Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <button onClick={() => setCurrentView('login')} className="px-4 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors">
                  Login / Sign Up
                </button>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-[#1A1A1A] text-[#71717A] transition-colors">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#2A2A2A] bg-[#0A0A0A] px-6 py-5 space-y-4">
            {['Explore', 'Why Paylance', 'Services'].map((label, i) => {
              const ids = ['demo-projects', 'why-paylance', 'services'];
              return <button key={label} onClick={() => { document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="block w-full text-left text-sm font-medium text-[#71717A] hover:text-white py-1 transition-colors">{label}</button>;
            })}
            {user ? (
              <div className="space-y-3 pt-2 border-t border-[#2A2A2A]">
                <button onClick={() => { setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard'); setIsMenuOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-white"><LayoutDashboard className="h-4 w-4" />Dashboard</button>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-red-400"><LogOut className="h-4 w-4" />Logout</button>
              </div>
            ) : (
              <button onClick={() => { setCurrentView('login'); setIsMenuOpen(false); }} className="w-full py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors">
                Login / Sign Up
              </button>
            )}
          </div>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section id="hero" className="bg-[#0A0A0A] pt-24 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2A2A2A] bg-[#111111] text-xs font-medium text-[#71717A] mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C]" />
              Secure Freelancing Platform
            </div>
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.05] text-white mb-6">
              Find Great Work.<br />
              Get <span className="text-[#EA580C]">Paid</span> Safely.
            </h1>
            <p className="text-lg text-[#71717A] max-w-xl leading-relaxed mb-10">
              Milestone-driven escrow keeps your money safe until work is delivered. Zero risk for clients. Zero delays for freelancers.
            </p>
            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setCurrentView('register')} className="px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
                Start Hiring <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => document.getElementById('demo-projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 text-sm font-semibold text-white border border-[#2A2A2A] bg-transparent rounded-lg hover:border-[#EA580C] hover:bg-[#111111] transition-all">
                Browse Projects
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-20 flex flex-wrap w-fit border border-[#2A2A2A] bg-[#111111] rounded-xl overflow-hidden divide-x divide-[#2A2A2A]">
              {stats.map((stat, i) => (
                <div key={i} className="px-8 py-5">
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs text-[#71717A] font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New CardSwap Component */}
          <div className="hidden lg:block relative mr-12">
            <CardSwap width={420} height={280} cardDistance={50} verticalDistance={55} delay={4000} skewAmount={4}>
              <Card>
                <div className="icon-box">
                  <Zap />
                </div>
                <h3>Instant Payouts</h3>
                <p>Funds are released to your wallet as soon as milestones are approved by the client.</p>
              </Card>
              <Card>
                <div className="icon-box">
                  <Shield />
                </div>
                <h3>Escrow Protection</h3>
                <p>Industry-standard security protocol ensuring funds are locked and safe for both parties.</p>
              </Card>
              <Card>
                <div className="icon-box">
                  <Star />
                </div>
                <h3>Verified Experts</h3>
                <p>Work with the most reliable and skilled talent vetted through our rigorous system.</p>
              </Card>
              <Card>
                <div className="icon-box">
                  <Globe />
                </div>
                <h3>World-Class Support</h3>
                <p>Dedicated dispute resolution and 24/7 global support to keep your project on track.</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <Services />

      {/* ─── Why Paylance ─── */}
      <section id="why-paylance" className="py-24 bg-[#111111] border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EA580C] mb-3">Why Paylance</p>
            <h2 className="text-4xl font-bold text-white tracking-tight">Your trust is our priority</h2>
            <p className="text-[#71717A] mt-3 text-base max-w-xl leading-relaxed">Simple, safe, and transparent. Every project protected end-to-end.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustFeatures.map((item, i) => (
              <ScrollAnimation key={i} delay={i * 80}>
                <GlareHover
                  width="100%"
                  height="100%"
                  background="#1A1A1A"
                  borderColor="#2A2A2A"
                  borderRadius="12px"
                  glareColor="#EA580C"
                  glareOpacity={0.10}
                  className="group transition-all duration-300 hover:border-[#EA580C]/30"
                  style={{ display: 'block' }}
                >
                  <div className="p-6">
                    <div className="h-10 w-10 bg-[#1A0D07] rounded-lg flex items-center justify-center mb-4 border border-[#EA580C]/10">
                      <item.icon className="h-5 w-5 text-[#EA580C]" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-[#71717A] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </GlareHover>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Demo Projects ─── */}
      <section id="demo-projects" className="py-24 bg-[#0A0A0A] border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EA580C] mb-3">Projects</p>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Explore <span className="text-[#EA580C]">Demo</span> Projects
            </h2>
            <p className="text-[#71717A] mt-3 text-base max-w-xl">Get inspired by sample project structures across diverse domains.</p>
          </div>
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
            {demoProjects.map((project, idx) => (
              <ScrollAnimation key={idx} delay={idx * 60} className="min-w-[300px] md:min-w-[340px] snap-center">
                <ProjectCard project={project} />
              </ScrollAnimation>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-px w-8 bg-[#EA580C]" />
            <p className="text-[10px] text-[#71717A] font-semibold uppercase tracking-widest">Drag to explore</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
