"use client";
import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Services from "@/components/Services";
import ScrollAnimation from "@/components/ScrollAnimation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { ArrowRight, CheckCircle, Trophy, MessageSquare, ShieldCheck, Briefcase, Bell, User, LogOut, LayoutDashboard, UserCircle, Plus, Menu, X } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
      title: <>Get paid for what <br /><span className="text-cyan-400">you're good at.</span></>,
      subtitle: "Whatever the skill, someone here has it and someone else needs it. From everyday abilities to rare expertise."
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000",
      title: <>Find the perfect <br /><span className="text-cyan-400">professional for you.</span></>,
      subtitle: "Get help with anything. From cleaning to coding, we've got you covered."
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
      title: <>Access <span className="text-cyan-400">Global Expertise</span> <br />for your Ambitious Goals</>,
      subtitle: "Connecting you with top performers and award-winning innovation worldwide."
    },
    {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000",
      title: <>Build with <span className="text-cyan-400">Cutting-Edge AI</span> <br />and Technologies</>,
      subtitle: "Leverage the power of AI to transform your projects into success stories."
    }
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Increased to 5 seconds for readability
    return () => clearInterval(timer);
  }, [slides.length]);
  return (<div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
    {/* Navbar matching the image */}
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-slate-900">
              PAYLANCE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-600 mr-2">
              <button onClick={() => document.getElementById('demo-projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-600 transition-colors">
                Explore
              </button>
              <button onClick={() => document.getElementById('why-paylance')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-600 transition-colors">
                Why Paylance
              </button>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-600 transition-colors">
                Services
              </button>
            </div>

            {user && (<button onClick={() => setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>)}

            {user?.role === 'client' && (<button onClick={() => setCurrentView('create-project')} className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-semibold hover:bg-blue-100 transition-all border border-blue-200">
              <Plus className="h-4 w-4" />
              Post Project
            </button>)}

            {user ? (<div className="flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-slate-100 transition-colors">
                    <Bell className="h-5 w-5 text-slate-600" />
                    {unreadCount > 0 && (<span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-medium text-white border-2 border-white">
                      {unreadCount}
                    </span>)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl shadow-xl border-slate-100">
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-900 px-2 mb-2">Notifications</p>
                    <div className="h-px bg-slate-100 mb-2" />
                    {notifications?.length === 0 ? (<p className="text-center text-xs text-slate-500 py-4">No new notifications</p>) : (notifications?.slice(0, 5).map((notif) => (<div key={notif._id || notif.id} className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                      <p className="text-xs font-semibold text-slate-800">{notif.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{notif.message}</p>
                    </div>)))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 overflow-hidden">
                    {user.profile_image ? (<img src={user.profile_image} alt={user.name} className="h-full w-full object-cover" />) : (<User className="h-5 w-5 text-slate-600" />)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl border-slate-100">
                  <div className="px-4 py-4 flex items-center gap-3">
                    {user.profile_image ? (<img src={user.profile_image} alt={user.name} className="h-12 w-12 rounded-full object-cover border-2 border-slate-50 shadow-sm" />) : (<div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-slate-400" />
                    </div>)}
                    <div className="flex flex-col min-w-0">
                      <p className="text-lg font-semibold text-slate-900 leading-tight truncate">{user.name}</p>
                      <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 my-2 mx-2" />

                  <DropdownMenuItem onClick={() => setCurrentView('profile')} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none">
                    <UserCircle className="h-5 w-5 text-slate-400" />
                    <span className="font-medium">My Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none">
                    <LayoutDashboard className="h-5 w-5 text-slate-400" />
                    <span className="font-medium">
                      {user.role === 'freelancer' ? 'Innovator Dashboard' : 'Client Dashboard'}
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={logout} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-600 focus:text-slate-900 transition-colors outline-none group">
                    <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                    <span className="font-medium group-hover:text-red-500 transition-colors">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>) : (<Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-6 font-medium shadow-sm transition-all hover:shadow-md" onClick={() => setCurrentView('login')}>
              Login/Sign Up
            </Button>)}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMenuOpen && (<div className="md:hidden border-t border-slate-200 bg-white absolute top-20 left-0 w-full shadow-2xl z-[60] py-6 px-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
        <button onClick={() => {
          document.getElementById('demo-projects')?.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }} className="block w-full text-left text-base font-semibold text-slate-600 hover:text-blue-600 py-2">
          Explore
        </button>
        <button onClick={() => {
          document.getElementById('why-paylance')?.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }} className="block w-full text-left text-base font-semibold text-slate-600 hover:text-blue-600 py-2">
          Why Paylance
        </button>
        <button onClick={() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }} className="block w-full text-left text-base font-semibold text-slate-600 hover:text-blue-600 py-2">
          Services
        </button>


        {user ? (<div className="space-y-4 pt-2">
          <button onClick={() => {
            setCurrentView(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard');
            setIsMenuOpen(false);
          }} className="flex items-center gap-3 w-full text-left text-base font-semibold text-blue-600 py-2">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          {user.role === 'client' && (<button onClick={() => {
            setCurrentView('create-project');
            setIsMenuOpen(false);
          }} className="flex items-center gap-3 w-full text-left text-base font-semibold text-blue-700 py-2">
            <Plus className="h-5 w-5" />
            Post Project
          </button>)}
          <button onClick={() => {
            setCurrentView('profile');
            setIsMenuOpen(false);
          }} className="flex items-center gap-3 w-full text-left text-base font-semibold text-slate-600 py-2">
            <UserCircle className="h-5 w-5" />
            My Profile
          </button>
          <div className="h-px bg-slate-100 my-2" />
          <button onClick={() => {
            logout();
            setIsMenuOpen(false);
          }} className="flex items-center gap-3 w-full text-left text-base font-semibold text-red-500 py-2">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>) : (<Button className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 transition-all active:scale-95" onClick={() => {
          setCurrentView('login');
          setIsMenuOpen(false);
        }}>
          Login/Sign Up
        </Button>)}
      </div>)}
    </header>

    {/* Hero Section overhaul to centered Hallway style */}
    <section id="hero" className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900 border-b border-white/10">
      {/* Background Slides with Overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={slide.image} alt="" className="w-full h-full object-cover grayscale-[20%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="space-y-12">
          {/* Transitioning Text Area with Fixed Position */}
          <div className="relative min-h-[320px] md:min-h-[380px] flex flex-col justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 absolute inset-0 pointer-events-none"}`}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.2] text-white">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto mt-6 leading-relaxed font-medium">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20" />

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-12 bg-cyan-400" : "w-4 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>

    {/* Services Section */}
    <Services />

    {/* Trust Section */}
    <section id="why-paylance" className="py-24 bg-white text-slate-900 border-t border-slate-100 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Your trust is our priority</h2>
          <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Reduce friction & fear. Simple, safe, and transparent.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "1. Offer or search", desc: "List what you're good at or find the perfect help for your project needs.", color: "bg-blue-50 text-blue-600" },
            { icon: CheckCircle, title: "2. Connect & agree", desc: "Chat securely, set clear expectations, and agree on the details together.", color: "bg-purple-50 text-purple-600" },
            { icon: Briefcase, title: "3. Get it done & earn", desc: "Pay securely, get the work done, earn money, and leave reviews.", color: "bg-lime-50 text-lime-600" },
            { icon: User, title: "24/7 Support", desc: "Dedicated support team available around the clock to help you with any issues.", color: "bg-orange-50 text-orange-600" }
          ].map((item, i) => (<ScrollAnimation key={i} delay={i * 100} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100/30 border border-slate-100 hover:border-blue-200 transition-all hover:-translate-y-2 group text-center flex flex-col items-center">
            <div className={`h-16 w-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
          </ScrollAnimation>))}
        </div>
      </div>
    </section>

    {/* Featured Projects Section */}
    <section id="demo-projects" className="py-24 bg-white text-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col mb-12">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Explore Our <span className="text-blue-600">Demo Projects</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl font-medium">
            Get inspired by these sample project structures. Swipe or scroll to explore our diverse range of demo projects.
          </p>
        </div>

        <div className="relative group/slider">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing snap-x snap-mandatory no-scrollbar scroll-smooth">
            {demoProjects.map((project, idx) => (<ScrollAnimation key={idx} delay={idx * 100} className="min-w-[280px] md:min-w-[350px] snap-center">
              <ProjectCard project={project} />
            </ScrollAnimation>))}
          </div>

          {/* Gradient Mask for focus */}
          <div className="absolute right-0 top-0 bottom-12 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10 hidden md:block" />

          {/* Scroll Indicator helper */}
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="h-1.5 w-12 rounded-full bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500 w-1/3 animate-ping-slow" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <Footer />
  </div>);
}
