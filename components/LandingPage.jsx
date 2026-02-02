"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  CheckCircle,
  Trophy,
  MessageSquare,
  ShieldCheck,
  Briefcase,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  UserCircle,
  Plus,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const { setCurrentView, user, logout, notifications } = useApp();
  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);



  const demoProjects = [
    {
      title: "E-commerce Website Development",
      description: "Build a full-featured online store with product management, secure checkout, and user accounts.",
      tags: ["React", "Node.js", "MongoDB"],
      budget: "₹25,000 – ₹40,000",
      milestones: 3,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
      status: "Demo"
    },
    {
      title: "Mobile App for Food Delivery",
      description: "Develop a cross-platform mobile application for real-time food ordering and delivery tracking.",
      tags: ["Flutter", "Firebase", "Dart"],
      budget: "₹35,000 – ₹55,000",
      milestones: 4,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
      status: "Demo"
    },
    {
      title: "AI Chatbot Integration",
      description: "Implement an intelligent customer support chatbot using OpenAI's GPT models for automated replies.",
      tags: ["Python", "OpenAI", "Next.js"],
      budget: "₹15,000 – ₹25,000",
      milestones: 2,
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
      status: "Demo"
    },
    {
      title: "Portfolio website for Designer",
      description: "Create a stunning, high-performance portfolio website with smooth animations and case study layouts.",
      tags: ["Framer", "React", "Tailwind"],
      budget: "₹10,000 – ₹18,000",
      milestones: 2,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      status: "Demo"
    },
    {
      title: "SaaS Dashboard Redesign",
      description: "Modernize a complex B2B SaaS dashboard with improved data visualization and user experience.",
      tags: ["UI/UX", "Figma", "Next.js"],
      budget: "₹45,000 – ₹70,000",
      milestones: 5,
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
      status: "Demo"
    },
    {
      title: "Automated Testing Suite",
      description: "Design and implement a comprehensive end-to-end testing suite for a large-scale web application.",
      tags: ["Jest", "Cypress", "Node.js"],
      budget: "₹20,000 – ₹30,000",
      milestones: 3,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
      status: "Demo"
    }
  ];

  const slides = [
    {
      image: "/second-image.webp",
      title: <>Host <span className="text-blue-500">Freelance Projects</span> <br />to identify the best <br />Expert Talent</>
    },
    {
      image: "/first-image.webp",
      title: <>Celebrate <span className="text-blue-500">Top Performers</span> <br />and Award-Winning <br />Innovation</>
    },
    {
      image: "/third-image.webp",
      title: <>Access <span className="text-blue-500">Global Expertise</span> <br />for your most <br />Ambitious Goals</>
    },
    {
      image: "/fourth-image.avif",
      title: <>Build with <span className="text-blue-500">Cutting-Edge AI</span> <br />and Next-Gen <br />Technologies</>
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Increased to 5 seconds for readability

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar matching the image */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('landing')}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                PAYLANCE
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-6 text-sm font-medium text-slate-600 mr-2">
                <button
                  onClick={() => document.getElementById('demo-projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-700 transition-colors"
                >
                  Explore
                </button>
                <button
                  onClick={() => document.getElementById('why-paylance')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-700 transition-colors"
                >
                  Why Paylance
                </button>
              </div>

              {user && (
                <button
                  onClick={() => setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </button>
              )}

              {user?.role === 'client' && (
                <button
                  onClick={() => setCurrentView('create-project')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold hover:bg-blue-100 transition-all border border-blue-200"
                >
                  <Plus className="h-4 w-4" />
                  Post Project
                </button>
              )}

              {user ? (
                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-slate-100 transition-colors">
                        <Bell className="h-5 w-5 text-slate-600" />
                        {unreadCount > 0 && (
                          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl shadow-xl border-slate-100">
                      <div className="p-3">
                        <p className="text-sm font-semibold text-slate-900 px-2 mb-2">Notifications</p>
                        <div className="h-px bg-slate-100 mb-2" />
                        {notifications?.length === 0 ? (
                          <p className="text-center text-xs text-slate-500 py-4">No new notifications</p>
                        ) : (
                          notifications?.slice(0, 5).map((notif) => (
                            <div key={notif._id || notif.id} className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                              <p className="text-xs font-bold text-slate-800">{notif.title}</p>
                              <p className="text-[11px] text-slate-500 line-clamp-2">{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 transition-colors border border-slate-100 overflow-hidden">
                        {user.profile_image ? (
                          <img src={user.profile_image} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-slate-600" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl border-slate-100">
                      <div className="px-4 py-4 flex items-center gap-3">
                        {user.profile_image ? (
                          <img src={user.profile_image} alt={user.name} className="h-12 w-12 rounded-full object-cover border-2 border-slate-50 shadow-sm" />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-slate-400" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <p className="text-lg font-bold text-slate-900 leading-tight truncate">{user.name}</p>
                          <p className="text-sm text-slate-500 truncate">{user.email}</p>
                        </div>
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
                        onClick={() => setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none"
                      >
                        <LayoutDashboard className="h-5 w-5 text-slate-400" />
                        <span className="font-medium">
                          {user.role === 'freelancer' ? 'Innovator Dashboard' : 'Client Dashboard'}
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
              ) : (
                <Button
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-6 font-medium shadow-sm transition-all hover:shadow-md"
                  onClick={() => setCurrentView('login')}
                >
                  Login/Sign Up
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu content */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white absolute top-20 left-0 w-full shadow-xl z-[60] py-6 px-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                document.getElementById('demo-projects')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-base font-semibold text-slate-600 hover:text-blue-700 py-2"
            >
              Explore
            </button>
            <button
              onClick={() => {
                document.getElementById('why-paylance')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-base font-semibold text-slate-600 hover:text-blue-700 py-2"
            >
              Why Paylance
            </button>


            {user ? (
              <div className="space-y-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left text-base font-bold text-blue-600 py-2"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </button>
                {user.role === 'client' && (
                  <button
                    onClick={() => {
                      setCurrentView('create-project');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left text-base font-bold text-blue-700 py-2"
                  >
                    <Plus className="h-5 w-5" />
                    Post Project
                  </button>
                )}
                <button
                  onClick={() => {
                    setCurrentView('profile');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left text-base font-bold text-slate-700 py-2"
                >
                  <UserCircle className="h-5 w-5" />
                  My Profile
                </button>
                <div className="h-px bg-slate-100 my-2" />
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left text-base font-bold text-red-500 py-2"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Button
                className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                onClick={() => {
                  setCurrentView('login');
                  setIsMenuOpen(false);
                }}
              >
                Login/Sign Up
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Hero Section matching the image */}
      <section id="hero" className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10 z-10">
              <div className="relative h-[320px] md:h-[420px]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                  >
                    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-slate-900">
                      {slide.title}
                    </h1>
                  </div>
                ))}
              </div>



              <div>
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 h-12 text-base font-medium group"
                  onClick={() => setCurrentView('register')}
                >
                  <div className="bg-white/20 rounded-full p-1 mr-2 group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                  Know more
                </Button>
              </div>
            </div>

            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-12 w-full">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${index === currentSlide
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-paylance" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Paylance?</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Everything you need to succeed in the freelance economy.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Secure Payments", desc: "Escrow protection for every milestone." },
              { icon: MessageSquare, title: "Real-time Chat", desc: "Collaborate instantly with your team." },
              { icon: Trophy, title: "Vetted Talent", desc: "Work with top-tier professionals." },
              { icon: CheckCircle, title: "Milestone Tracking", desc: "Clear deliverables and deadlines." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="demo-projects" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore Our <span className="text-blue-700">Demo Projects</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              Get inspired by these sample project structures. Swipe or scroll to explore our diverse range of demo projects.
            </p>
          </div>

          <div className="relative group/slider">
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing snap-x snap-mandatory no-scrollbar scroll-smooth">
              {demoProjects.map((project, idx) => (
                <div key={idx} className="min-w-[280px] md:min-w-[350px] snap-center">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {/* Gradient Mask for focus */}
            <div className="absolute right-0 top-0 bottom-12 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />

            {/* Scroll Indicator helper */}
            <div className="flex justify-center gap-1.5 mt-4">
              <div className="h-1.5 w-12 rounded-full bg-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 w-1/3 animate-ping-slow" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Scroll to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
