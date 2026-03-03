"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, ArrowLeft, Eye, EyeOff, User, Building2, AlertCircle, Loader2, ShieldCheck, Lock, } from "lucide-react";

function AuthShell({ children, heading, subheading }) {
  const { setCurrentView } = useApp();
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] border-r border-[#2A2A2A] flex-col justify-between p-12">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EA580C]">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">PAYLANCE</span>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EA580C]">Trusted by thousands</p>
            <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
              Secure payments.<br /><span className="text-[#71717A]">Delivered work.</span>
            </h2>
            <p className="text-[#71717A] text-sm leading-relaxed max-w-sm">Every rupee held in escrow until milestones are approved — protecting clients and freelancers alike.</p>
          </div>
          <div className="space-y-3">
            {[
              { icon: ShieldCheck, text: "Milestone-based escrow payments" },
              { icon: Lock, text: "End-to-end encrypted conversations" },
              { icon: User, text: "Verified freelancer profiles" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[#1A0D07] flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4 text-[#EA580C]" />
                </div>
                <p className="text-sm text-[#A1A1AA]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-6">
          <p className="text-2xl font-bold text-white">₹2Cr+</p>
          <p className="text-xs text-[#71717A] mt-0.5">secured in escrow to date</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EA580C]">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">PAYLANCE</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">{heading}</h1>
            <p className="text-sm text-[#71717A] mt-1.5">{subheading}</p>
          </div>

          {children}

          <button onClick={() => setCurrentView("landing")} className="mt-8 flex items-center gap-1.5 text-xs font-medium text-[#71717A] hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, required, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-[#A1A1AA]">
        {label} {required && <span className="text-[#EA580C]">*</span>}
      </Label>
      {children}
    </div>
  );
}

/* ─── Login ─── */
export function LoginPage() {
  const { login, setCurrentView } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = await login(email, password);
    if (!result.success) setError(result.error);
    setLoading(false);
  };

  const inputCls = "h-10 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-3 text-sm text-white placeholder:text-[#3F3F46] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] outline-none transition-all";

  return (
    <AuthShell heading="Welcome back" subheading="Enter your credentials to access your account.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
          </div>
        )}
        <Field id="email" label="Email address" required>
          <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} />
        </Field>
        <Field id="password" label="Password" required>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required className={`${inputCls} pr-10`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3F3F46] hover:text-[#71717A] transition-colors">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <button type="submit" disabled={loading} className="w-full h-10 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Signing in...</> : "Sign In"}
        </button>
        <p className="text-center text-sm text-[#71717A]">
          {"Don't have an account? "}
          <button type="button" onClick={() => setCurrentView("register")} className="font-semibold text-[#EA580C] hover:text-[#F97316] transition-colors">Sign up</button>
        </p>
      </form>
    </AuthShell>
  );
}

/* ─── Register ─── */
export function RegisterPage() {
  const { register, setCurrentView } = useApp();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "", skills: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if (!formData.role) return setError("Please select your role.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const userData = { name: formData.name, email: formData.email, password: formData.password, role: formData.role, ...(formData.role === "freelancer" && { skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean) }) };
    const result = await register(userData);
    if (!result.success) setError(result.error);
    setLoading(false);
  };

  const inputCls = "h-10 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-3 text-sm text-white placeholder:text-[#3F3F46] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] outline-none transition-all";

  return (
    <AuthShell heading="Create your account" subheading="Join Paylance and start your journey today.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
          </div>
        )}
        {/* Role selector */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-[#A1A1AA]">I want to</Label>
          <div className="grid grid-cols-2 gap-2">
            {[{ value: "client", label: "Hire Talent", icon: Building2 }, { value: "freelancer", label: "Find Work", icon: User }].map(opt => (
              <button key={opt.value} type="button" onClick={() => update("role", opt.value)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${formData.role === opt.value ? "border-[#EA580C] bg-[#1A0D07] text-[#EA580C]" : "border-[#2A2A2A] bg-[#1A1A1A] text-[#71717A] hover:border-[#3F3F46] hover:text-white"}`}>
                <opt.icon className="h-4 w-4" />{opt.label}
              </button>
            ))}
          </div>
        </div>
        <Field id="name" label="Full Name" required>
          <Input id="name" placeholder="John Doe" value={formData.name} onChange={e => update("name", e.target.value)} required className={inputCls} />
        </Field>
        <Field id="email" label="Email Address" required>
          <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => update("email", e.target.value)} required className={inputCls} />
        </Field>
        <Field id="password" label="Password" required>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={e => update("password", e.target.value)} required className={`${inputCls} pr-10`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3F3F46] hover:text-[#71717A] transition-colors">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <Field id="confirmPassword" label="Confirm Password" required>
          <Input id="confirmPassword" type="password" placeholder="Repeat password" value={formData.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} required className={inputCls} />
        </Field>
        {formData.role === "freelancer" && (
          <Field id="skills" label="Your Skills (comma-separated)">
            <Input id="skills" placeholder="React, Node.js, MongoDB" value={formData.skills} onChange={e => update("skills", e.target.value)} className={inputCls} />
          </Field>
        )}
        <button type="submit" disabled={loading} className="w-full h-10 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Creating account...</> : "Create Account"}
        </button>
        <p className="text-center text-sm text-[#71717A]">
          {"Already have an account? "}
          <button type="button" onClick={() => setCurrentView("login")} className="font-semibold text-[#EA580C] hover:text-[#F97316] transition-colors">Sign in</button>
        </p>
      </form>
    </AuthShell>
  );
}
