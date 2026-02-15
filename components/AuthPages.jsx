"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Briefcase, ArrowLeft, Eye, EyeOff, User, Building2, AlertCircle, Info, Github, } from "lucide-react";
const GoogleIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.8c2.3-2.1 3.6-5.2 3.6-8.7z" fill="#4285F4"/>
    <path d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5H1.3v3.1C3.3 21.4 7.4 24 12 24z" fill="#34A853"/>
    <path d="M5.2 14.3c-.3-.8-.4-1.6-.4-2.3 0-.8.1-1.6.4-2.3V6.6H1.3c-.8 1.7-1.3 3.6-1.3 5.3s.5 3.6 1.3 5.3l3.9-3z" fill="#FBBC05"/>
    <path d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.3 2.6 1.3 6.6l3.9 3.1c1-2.9 3.7-4.9 6.8-4.9z" fill="#EA4335"/>
  </svg>);
const HourglassSpinner = ({ className = "w-6 h-6" }) => (<svg className={`${className} animate-spin`} viewBox="0 0 24 24">
    <path fill="currentColor" d="M6 2v6h.01L12 12l5.99-4H18V2H6zm0 20h12v-6h-.01L12 12l-5.99 4H6v6z"/>
  </svg>);
export function LoginPage() {
    const { login, setCurrentView } = useApp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        const result = await login(email, password);
        if (!result.success) {
            setError(result.error);
        }
        setLoading(false);
    };
    return (<div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden bg-[#1e4db7]">
      {/* Dynamic Geometric Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(30deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(150deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(30deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(150deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(60deg,#2563eb_25%,transparent_25.5%,transparent_75%,#2563eb_75.5%,#2563eb),linear-gradient(60deg,#2563eb_25%,transparent_25.5%,transparent_75%,#2563eb_75.5%,#2563eb)] bg-[length:80px_140px]"/>
      </div>

      <Card className="w-full max-w-[350px] border-none shadow-2xl rounded-[1.5rem] bg-white pt-6 pb-5 px-4 z-10 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <CardHeader className="space-y-4 text-center pb-2 px-2">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-2 mb-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#1e4db7] rounded-lg flex items-center justify-center shadow-lg transform -rotate-6 transition-transform hover:rotate-0 duration-300">
                <Briefcase className="h-4 w-4 text-white"/>
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#1e4db7] italic">PAYLANCE</span>
            </div>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">Log In</CardTitle>
            <CardDescription className="text-slate-500 text-xs font-medium leading-relaxed max-w-[95%] mx-auto">
              Welcome back! Please enter your details.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6">
          {/* Social Logins */}
          <div className="flex justify-center gap-3 mb-4 pt-1">
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-sm hover:bg-white hover:border-slate-200 transition-all active:scale-95">
              <GoogleIcon />
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-sm hover:bg-white hover:border-slate-200 transition-all active:scale-95">
              <Github className="h-5 w-5 text-black"/>
            </button>
          </div>

          <div className="relative flex items-center mb-4">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-3 text-slate-400 font-medium text-[10px] uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (<div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-3.5 w-3.5"/>
                {error}
              </div>)}

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-slate-700">Email <span className="text-red-500">*</span></Label>
                </div>
              </div>
              <div className="relative">
                <Input id="email" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs" maxLength={256}/>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-slate-700">Password <span className="text-red-500">*</span></Label>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 pr-10 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="h-3.5 w-3.5"/> : <Eye className="h-3.5 w-3.5"/>}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-10 bg-[#1e4db7] hover:bg-[#1a43a1] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-1" disabled={loading}>
              {loading ? (<div className="flex items-center gap-2">
                  <HourglassSpinner className="w-5 h-5 text-blue-400"/>
                  <span>Logging in...</span>
                </div>) : "Login"}
            </Button>

            <div className="text-center pt-1">
              <p className="text-slate-500 text-sm font-medium">
                Don't have an account?{" "}
                <button type="button" onClick={() => setCurrentView("register")} className="font-extrabold text-[#1e4db7] hover:text-[#1a43a1] underline decoration-2 underline-offset-4">
                  Signup
                </button>
              </p>
            </div>
          </form>

          <button onClick={() => setCurrentView("landing")} className="mt-6 flex w-full items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
            <ArrowLeft className="h-3.5 w-3.5"/>
            Back to home
          </button>
        </CardContent>
      </Card>
    </div>);
}
export function RegisterPage() {
    const { register, setCurrentView } = useApp();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        skills: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!formData.role) {
            setError("Please select a role");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            ...(formData.role === "freelancer" && {
                skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
            }),
        };
        const result = await register(userData);
        if (!result.success) {
            setError(result.error);
        }
        setLoading(false);
    };
    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (<div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden bg-[#1e4db7] py-12">
      {/* Dynamic Geometric Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(30deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(150deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(30deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(150deg,#1e4db7_12%,transparent_12.5%,transparent_87%,#1e4db7_87.5%,#1e4db7),linear-gradient(60deg,#2563eb_25%,transparent_25.5%,transparent_75%,#2563eb_75.5%,#2563eb),linear-gradient(60deg,#2563eb_25%,transparent_25.5%,transparent_75%,#2563eb_75.5%,#2563eb)] bg-[length:80px_140px]"/>
      </div>

      <Card className="w-full max-w-[350px] border-none shadow-2xl rounded-[1.5rem] bg-white pt-6 pb-5 px-4 z-10 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <CardHeader className="space-y-4 text-center pb-2 px-2">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-2 mb-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#1e4db7] rounded-lg flex items-center justify-center shadow-lg transform -rotate-6 transition-transform hover:rotate-0 duration-300">
                <Briefcase className="h-4 w-4 text-white"/>
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#1e4db7] italic">PAYLANCE</span>
            </div>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">Create account</CardTitle>
            <CardDescription className="text-slate-500 text-xs font-medium leading-relaxed max-w-[95%] mx-auto">
              Join Paylance and start your adventure today.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (<div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-3.5 w-3.5"/>
                {error}
              </div>)}

            {/* Role Selection */}
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">I want to</Label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => updateField("role", "client")} className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 transition-all ${formData.role === "client"
            ? "border-[#1e4db7] bg-blue-50/50 ring-2 ring-blue-50/50"
            : "border-slate-100 bg-slate-50/50 hover:border-blue-200"}`}>
                  <Building2 className={`h-4 w-4 ${formData.role === "client" ? "text-[#1e4db7]" : "text-slate-400"}`}/>
                  <span className={`text-[10px] font-bold ${formData.role === "client" ? "text-[#1e4db7]" : "text-slate-500"}`}>Hire Talent</span>
                </button>
                <button type="button" onClick={() => updateField("role", "freelancer")} className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 transition-all ${formData.role === "freelancer"
            ? "border-[#1e4db7] bg-blue-50/50 ring-2 ring-blue-50/50"
            : "border-slate-100 bg-slate-50/50 hover:border-blue-200"}`}>
                  <User className={`h-4 w-4 ${formData.role === "freelancer" ? "text-[#1e4db7]" : "text-slate-400"}`}/>
                  <span className={`text-[10px] font-bold ${formData.role === "freelancer" ? "text-[#1e4db7]" : "text-slate-500"}`}>Find Work</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-bold text-slate-700">Full Name <span className="text-red-500">*</span></Label>
              <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs"/>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs"/>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs font-bold text-slate-700">Password <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 pr-10 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="h-3.5 w-3.5"/> : <Eye className="h-3.5 w-3.5"/>}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-xs font-bold text-slate-700">Confirm Password <span className="text-red-500">*</span></Label>
              <Input id="confirmPassword" type="password" placeholder="Repeat password" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs"/>
            </div>

            {formData.role === "freelancer" && (<div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="skills" className="text-xs font-bold text-slate-700">Skills (comma separated)</Label>
                <Input id="skills" placeholder="React, Node.js, MongoDB" value={formData.skills} onChange={(e) => updateField("skills", e.target.value)} className="h-9 rounded-xl border-slate-200 bg-slate-50/50 px-3 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1e4db7] focus:ring-4 focus:ring-blue-50 transition-all text-xs"/>
              </div>)}

            <Button type="submit" className="w-full h-10 bg-[#1e4db7] hover:bg-[#1a43a1] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-1" disabled={loading}>
              {loading ? (<div className="flex items-center gap-2">
                  <HourglassSpinner className="w-5 h-5 text-blue-400"/>
                  <span>Creating account...</span>
                </div>) : "Create Account"}
            </Button>

            <div className="text-center pt-1">
              <p className="text-slate-500 text-sm font-medium">
                Already have an account?{" "}
                <button type="button" onClick={() => setCurrentView("login")} className="font-extrabold text-[#1e4db7] hover:text-[#1a43a1] underline decoration-2 underline-offset-4">
                  Sign in
                </button>
              </p>
            </div>
          </form>

          <button onClick={() => setCurrentView("landing")} className="mt-4 flex w-full items-center justify-center gap-2 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
            <ArrowLeft className="h-3 w-3"/>
            Back to home
          </button>
        </CardContent>
      </Card>
    </div>);
}
