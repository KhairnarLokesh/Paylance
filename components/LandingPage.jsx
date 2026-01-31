"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  MessageSquare,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const { setCurrentView } = useApp();

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Escrow Payments",
      description:
        "Funds are held securely until milestones are approved, protecting both clients and freelancers.",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Chat",
      description:
        "Communicate instantly with your team through our integrated messaging system.",
    },
    {
      icon: CheckCircle,
      title: "Milestone Tracking",
      description:
        "Break projects into manageable milestones with clear deadlines and deliverables.",
    },
    {
      icon: Users,
      title: "Demo Project Review",
      description:
        "Freelancers submit demo work for evaluation before project assignment.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Freelancers" },
    { value: "$5M+", label: "Payments Processed" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "2K+", label: "Completed Projects" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Paylance</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("login")}
              className="text-foreground"
            >
              Sign In
            </Button>
            <Button onClick={() => setCurrentView("register")}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
            <Star className="h-4 w-4 text-primary" />
            Trusted by 10,000+ professionals
          </div>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The Secure Way to Hire and Get Paid for Freelance Work
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Milestone-driven payments, real-time collaboration, and complete transparency.
            Join thousands of clients and freelancers building great things together.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setCurrentView("register")}
              className="h-12 px-8 text-base"
            >
              Start Hiring Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView("register")}
              className="h-12 px-8 text-base"
            >
              Find Freelance Work
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-secondary/50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A complete platform designed for seamless collaboration between clients and
              freelancers.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Simple, transparent, and secure process for everyone.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Post or Apply",
                description:
                  "Clients post projects with milestones. Freelancers apply with their demo work.",
              },
              {
                step: "02",
                title: "Review & Approve",
                description:
                  "Clients review applications and demo projects, then approve the best fit.",
              },
              {
                step: "03",
                title: "Work & Get Paid",
                description:
                  "Collaborate on milestones with secure escrow payments released upon approval.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-4 text-5xl font-bold text-primary/20">{item.step}</div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Transform Your Freelancing Experience?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              transparent collaboration.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setCurrentView("register")}
                className="h-12 px-8"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Paylance</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Paylance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
