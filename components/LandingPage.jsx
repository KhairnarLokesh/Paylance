"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Trophy,
  Users,
  MessageSquare,
  ShieldCheck,
  Briefcase
} from "lucide-react";

export default function LandingPage() {
  const { setCurrentView } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 50) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 432, behavior: 'smooth' });
        }
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const demoProjects = [
    {
      title: "E-commerce Website Development",
      tags: ["React", "Node.js", "MongoDB"],
      budget: "₹25,000 – ₹40,000",
      milestones: 3,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Mobile App for Food Delivery",
      tags: ["Flutter", "Firebase", "Dart"],
      budget: "₹35,000 – ₹55,000",
      milestones: 4,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "AI Chatbot Integration",
      tags: ["Python", "OpenAI", "Next.js"],
      budget: "₹15,000 – ₹25,000",
      milestones: 2,
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Portfolio website for Designer",
      tags: ["Framer", "React", "Tailwind"],
      budget: "₹10,000 – ₹18,000",
      milestones: 2,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "SaaS Dashboard Redesign",
      tags: ["UI/UX", "Figma", "Next.js"],
      budget: "₹45,000 – ₹70,000",
      milestones: 5,
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Automated Testing Suite",
      tags: ["Jest", "Cypress", "Node.js"],
      budget: "₹20,000 – ₹30,000",
      milestones: 3,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const slides = [
    {
      image: "/second image.webp",
      title: <>Host <span className="text-blue-500">Freelance Projects</span> <br />to identify the best <br />Expert Talent</>
    },
    {
      image: "/first image.webp",
      title: <>Celebrate <span className="text-blue-500">Top Performers</span> <br />and Award-Winning <br />Innovation</>
    },
    {
      image: "/third image.webp",
      title: <>Access <span className="text-blue-500">Global Expertise</span> <br />for your most <br />Ambitious Goals</>
    },
    {
      image: "/fourth image.avif",
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

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <button onClick={() => setCurrentView('browse-projects')} className="hover:text-blue-700 transition-colors">Explore</button>
              <button className="hover:text-blue-700 transition-colors">Why Paylance</button>
              <button className="hover:text-blue-700 transition-colors">Blogs</button>
              <button className="hover:text-blue-700 transition-colors">Sales Query</button>
              <button className="hover:text-blue-700 transition-colors">Our Initiatives</button>
            </nav>

            {/* Login Button */}
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-6 font-medium shadow-sm transition-all hover:shadow-md"
              onClick={() => setCurrentView('login')}
            >
              Login/Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section matching the image */}
      <section className="relative pt-16 pb-24 overflow-hidden">
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
      <section className="py-24 bg-slate-50 border-t border-slate-100">
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
      <section className="py-24 bg-white overflow-hidden">
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
            <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-12 cursor-grab active:cursor-grabbing snap-x snap-mandatory no-scrollbar scroll-smooth">
              {demoProjects.map((project, idx) => (
                <div key={idx} className="min-w-[320px] md:min-w-[400px] snap-center">
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
