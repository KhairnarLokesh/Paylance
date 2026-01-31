"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Building2,
  AlertCircle,
} from "lucide-react";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your Paylance account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="space-y-3 rounded-lg bg-muted p-3 text-sm">
              <p className="font-medium text-muted-foreground">Demo Accounts:</p>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium">Client:</span> client@demo.com / demo123</p>
                <p><span className="font-medium">Freelancer:</span> freelancer@demo.com / demo123</p>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{"Don't have an account? "}</span>
              <button
                type="button"
                onClick={() => setCurrentView("register")}
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>

          <button
            onClick={() => setCurrentView("landing")}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
        </CardContent>
      </Card>
    </div>
  );
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Join Paylance and start your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="space-y-2">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField("role", "client")}
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${formData.role === "client"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  <Building2
                    className={`h-6 w-6 ${formData.role === "client" ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <span
                    className={`text-sm font-medium ${formData.role === "client" ? "text-primary" : "text-foreground"
                      }`}
                  >
                    Hire Talent
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => updateField("role", "freelancer")}
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${formData.role === "freelancer"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  <User
                    className={`h-6 w-6 ${formData.role === "freelancer" ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <span
                    className={`text-sm font-medium ${formData.role === "freelancer" ? "text-primary" : "text-foreground"
                      }`}
                  >
                    Find Work
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                required
              />
            </div>

            {formData.role === "freelancer" && (
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  placeholder="React, Node.js, MongoDB"
                  value={formData.skills}
                  onChange={(e) => updateField("skills", e.target.value)}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <button
                type="button"
                onClick={() => setCurrentView("login")}
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>

          <button
            onClick={() => setCurrentView("landing")}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
