"use client";
import React, { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, MapPin, Mail, Phone, Github, Linkedin, Eye, Home, ChevronRight, Camera, Globe, Check, X, Plus, UserCircle, Briefcase } from "lucide-react";
export default function ProfilePage() {
    const { user, updateUser, setCurrentView, projects } = useApp();
    const myProjects = user?.role === 'client'
        ? projects.filter(p => {
            const pClientId = p.clientId?._id || p.clientId;
            return pClientId && String(pClientId) === String(user._id || user.id);
        })
        : [];
    const fileInputRef = useRef(null);
    const bannerInputRef = useRef(null);
    // Editing states
    const [isEditingName, setIsEditingName] = useState(false);
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    // Form values
    const [tempName, setTempName] = useState(user?.name || "");
    const [tempSkill, setTempSkill] = useState("");
    const [tempRole, setTempRole] = useState(user?.role_title || (user?.role === 'freelancer' ? 'Professional Freelancer' : 'Project Client'));
    const [tempLocation, setTempLocation] = useState(user?.location || "Nashik, Maharashtra, India");
    const [tempUsername, setTempUsername] = useState(user?.username || "@lkhairnar580_5037");
    const [tempEducation, setTempEducation] = useState(user?.education || "Bachelor Of Engineering (b.e) at Pune Vidhyarthi Griha's College of Engineering and ShriKrushna S Dhamankar Institute of Management Nashik");
    const [tempPhone, setTempPhone] = useState(user?.phone || "917666860132");
    const [tempSecondaryPhone, setTempSecondaryPhone] = useState(user?.secondaryPhone || "7666860132");
    // Update temp values when user data changes (e.g., after fetch)
    React.useEffect(() => {
        if (user) {
            setTempName(user.name || "");
            setTempRole(user.role_title || (user.role === 'freelancer' ? 'Professional Freelancer' : 'Project Client'));
            setTempLocation(user.location || "Nashik, Maharashtra, India");
            setTempUsername(user.username || "@lkhairnar580_5037");
            setTempEducation(user.education || "Bachelor Of Engineering (b.e) at Pune Vidhyarthi Griha's College of Engineering and ShriKrushna S Dhamankar Institute of Management Nashik");
            setTempPhone(user.phone || "917666860132");
            setTempSecondaryPhone(user.secondaryPhone || "7666860132");
        }
    }, [user]);
    const handleSaveName = () => {
        updateUser({ name: tempName });
        setIsEditingName(false);
    };
    const handleSaveLocation = () => {
        updateUser({ location: tempLocation });
        setIsEditingLocation(false);
    };
    const handleSaveUsername = () => {
        updateUser({ username: tempUsername });
        setIsEditingUsername(false);
    };
    const handleSaveEducation = () => {
        updateUser({ education: tempEducation });
        setIsEditingEducation(false);
    };
    const handleSavePhone = () => {
        updateUser({ phone: tempPhone, secondaryPhone: tempSecondaryPhone });
        setIsEditingPhone(false);
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ profile_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ banner_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleAddSkill = () => {
        if (tempSkill.trim()) {
            const currentSkills = user?.skills || [];
            if (!currentSkills.includes(tempSkill.trim())) {
                updateUser({ skills: [...currentSkills, tempSkill.trim()] });
            }
            setTempSkill("");
            setIsAddingSkill(false);
        }
    };
    const handleRemoveSkill = (skillToRemove) => {
        const currentSkills = user?.skills || [];
        updateUser({ skills: currentSkills.filter(s => s !== skillToRemove) });
    };
    const handleSaveRole = () => {
        updateUser({ role_title: tempRole });
        setIsEditingRole(false);
    };
    return (<div className="max-w-6xl mx-auto pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 px-4">
            <Home className="h-4 w-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => setCurrentView('landing')} />
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-slate-800">User Profile</span>
            {user?.role === 'client' && (<button onClick={() => setCurrentView('create-project')} className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-semibold hover:bg-blue-100 transition-all border border-blue-200">
                <Plus className="h-4 w-4" />
                Post a Project
            </button>)}
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 mx-4">
            {/* Banner Section */}
            <div className="relative h-64 bg-slate-100 bg-cover bg-center transition-all duration-500" style={{
                backgroundImage: user?.banner_image ? `url(${user.banner_image})` : 'linear-gradient(to right, #f9a8d4, #d8b4fe, #a5b4fc)'
            }}>
                <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={handleBannerUpload} />
                <button onClick={() => bannerInputRef.current?.click()} className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-white transition-all hover:scale-110 active:scale-95">
                    <Pencil className="h-4 w-4 text-slate-600" />
                </button>

                {/* Profile Picture Overlap */}
                <div className="absolute -bottom-16 left-10">
                    <div className="relative group/avatar">
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                        <div className="h-40 w-40 rounded-full border-4 border-white overflow-hidden bg-slate-100 shadow-lg transition-transform group-hover/avatar:scale-[1.02]">
                            <img src={user?.profile_image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300"} alt="Profile" className="h-full w-full object-cover" />
                        </div>
                        <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 p-3 bg-slate-900 rounded-full text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-110 active:scale-95 z-10">
                            <Camera className="h-5 w-5" />
                        </button>
                        <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Profile Actions / Info Padding */}
            <div className="pt-20 px-10 pb-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
                    <div className="space-y-4 max-w-2xl flex-1">
                        <div>
                            <div className="flex items-center gap-3 group">
                                {isEditingName ? (<div className="flex items-center gap-2">
                                    <Input value={tempName} onChange={(e) => setTempName(e.target.value)} className="text-3xl font-bold h-14 w-80 rounded-xl" autoFocus />
                                    <Button size="icon" variant="ghost" className="text-green-600 hover:bg-green-50" onClick={handleSaveName}>
                                        <Check className="h-6 w-6" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => { setTempName(user?.name || ""); setIsEditingName(false); }}>
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>) : (<>
                                    <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                                        {user?.name || "Lokesh Khairnar"}
                                    </h1>
                                    <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100" onClick={() => setIsEditingName(true)}>
                                        <Pencil className="h-5 w-5 text-slate-400" />
                                    </button>
                                </>)}
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-slate-500 font-medium group">
                                <MapPin className="h-4 w-4" />
                                {isEditingLocation ? (<div className="flex items-center gap-2">
                                    <Input value={tempLocation} onChange={(e) => setTempLocation(e.target.value)} className="h-8 w-60" autoFocus />
                                    <Check className="h-4 w-4 text-green-600 cursor-pointer" onClick={handleSaveLocation} />
                                    <X className="h-4 w-4 text-red-600 cursor-pointer" onClick={() => setIsEditingLocation(false)} />
                                </div>) : (<>
                                    <span>{user?.location || "Nashik, Maharashtra, India"}</span>
                                    <Pencil className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setIsEditingLocation(true)} />
                                </>)}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600 font-medium group">
                            {isEditingUsername ? (<div className="flex items-center gap-2">
                                <Input value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} className="h-8 w-40" autoFocus />
                                <Check className="h-4 w-4 text-green-600 cursor-pointer" onClick={handleSaveUsername} />
                                <X className="h-4 w-4 text-red-600 cursor-pointer" onClick={() => setIsEditingUsername(false)} />
                            </div>) : (<>
                                <span>{user?.username || "@lkhairnar580_5037"}</span>
                                <Pencil className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setIsEditingUsername(true)} />
                            </>)}
                        </div>

                        <div className="text-slate-600 leading-relaxed font-medium mt-4 group">
                            {isEditingEducation ? (<div className="flex flex-col gap-2">
                                <textarea value={tempEducation} onChange={(e) => setTempEducation(e.target.value)} className="w-full p-2 border rounded-xl text-sm" rows={3} autoFocus />
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={handleSaveEducation}>Save</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingEducation(false)}>Cancel</Button>
                                </div>
                            </div>) : (<div className="relative">
                                <p>
                                    {user?.education || "Bachelor Of Engineering (b.e) at Pune Vidhyarthi Griha's College of Engineering and ShriKrushna S Dhamankar Institute of Management Nashik"}
                                </p>
                                <Pencil className="h-3 w-3 text-slate-400 absolute -top-1 -right-6 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setIsEditingEducation(true)} />
                            </div>)}
                        </div>

                        <div className="space-y-3 pt-6">
                            <div className="flex items-center gap-3 text-blue-600 font-semibold">
                                <Mail className="h-4 w-4" />
                                <span className="hover:underline cursor-pointer">{user?.email || "lkhairnar580@gmail.com"}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-slate-700 font-semibold group">
                                {isEditingPhone ? (<div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <Input value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} className="h-8 w-40" placeholder="Primary Phone" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-slate-400" />
                                        <Input value={tempSecondaryPhone} onChange={(e) => setTempSecondaryPhone(e.target.value)} className="h-8 w-40" placeholder="Secondary Phone" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={handleSavePhone}>Save</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setIsEditingPhone(false)}>Cancel</Button>
                                    </div>
                                </div>) : (<>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <span>{user?.phone || "917666860132"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-4 w-4 text-slate-400" />
                                        <span>{user?.secondaryPhone || "7666860132"}</span>
                                    </div>
                                    <Pencil className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setIsEditingPhone(true)} />
                                </>)}
                            </div>
                        </div>
                    </div>

                    <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 py-7 h-auto font-semibold flex items-center gap-3 shadow-xl transition-all active:scale-95 whitespace-nowrap">
                        <Eye className="h-5 w-5" />
                        Public View
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 border-t border-slate-50 pt-16">
                    {/* Skills Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center group">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-widest uppercase">Skills</h3>
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider" onClick={() => setIsAddingSkill(true)}>
                                <Plus className="h-4 w-4" />
                                Add Skill
                            </button>
                        </div>

                        {isAddingSkill && (<div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                            <Input value={tempSkill} onChange={(e) => setTempSkill(e.target.value)} placeholder="Enter skill name..." className="h-10 rounded-xl" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} />
                            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 h-10 w-10 shrink-0 rounded-xl" onClick={handleAddSkill}>
                                <Check className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-10 w-10 shrink-0 rounded-xl text-slate-400" onClick={() => { setTempSkill(""); setIsAddingSkill(false); }}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>)}

                        <div className="flex flex-wrap gap-3">
                            {user?.skills && user.skills.length > 0 ? (user.skills.map((skill, idx) => (<div key={idx} className="group flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-100 hover:bg-white hover:border-blue-200 transition-all cursor-default">
                                {skill}
                                <button className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all" onClick={() => handleRemoveSkill(skill)}>
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>))) : (<p className="text-slate-400 font-medium italic">Nothing to see here... yet!</p>)}
                        </div>
                    </div>

                    {/* Role Section (Replaces Interests) */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center group">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-widest uppercase">Current Role</h3>
                            {!isEditingRole && (<button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 opacity-0 group-hover:opacity-100" onClick={() => setIsEditingRole(true)}>
                                <Pencil className="h-4 w-4" />
                            </button>)}
                        </div>

                        {isEditingRole ? (<div className="flex items-center gap-2">
                            <Input value={tempRole} onChange={(e) => setTempRole(e.target.value)} className="h-10 rounded-xl" autoFocus />
                            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 h-10 w-10 shrink-0 rounded-xl" onClick={handleSaveRole}>
                                <Check className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-10 w-10 shrink-0 rounded-xl text-slate-400" onClick={() => { setTempRole(user?.role_title || ""); setIsEditingRole(false); }}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>) : (<div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400 font-semibold uppercase tracking-tight mb-0.5">Title</p>
                                <p className="text-lg font-semibold text-slate-700">{tempRole}</p>
                            </div>
                        </div>)}
                    </div>

                    {/* Client Projects Section */}
                    {user?.role === 'client' && (<div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-widest uppercase">My Postings</h3>
                            <button className="text-xs font-semibold text-blue-600 hover:underline" onClick={() => setCurrentView('my-projects')}>
                                Manage All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {myProjects.length > 0 ? (myProjects.slice(0, 3).map((proj) => (<div key={proj._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group/proj hover:bg-white hover:border-blue-100 transition-all">
                                <div>
                                    <p className="font-semibold text-slate-700 group-hover/proj:text-blue-600 transition-colors">{proj.title}</p>
                                    <p className="text-xs text-slate-400 font-medium">Budget: ${proj.budget.toLocaleString()}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-300 group-hover/proj:translate-x-1 transition-transform" />
                            </div>))) : (<div className="text-center py-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                <p className="text-xs text-slate-400 font-medium italic mb-3">No projects posted yet</p>
                                <button onClick={() => setCurrentView('create-project')} className="text-xs font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                                    Post Your First Project
                                </button>
                            </div>)}
                        </div>
                    </div>)}

                    {/* Social Handles Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-widest uppercase">Social Handles</h3>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="group flex items-center gap-2 cursor-pointer">
                                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-100 group-hover:scale-110 transition-all">
                                    <Github className="h-8 w-8 text-slate-800" />
                                </div>
                                <span className="font-semibold text-slate-700 hidden group-hover:block transition-all">GitHub</span>
                            </div>
                            <div className="group flex items-center gap-2 cursor-pointer">
                                <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                                    <Linkedin className="h-8 w-8 text-[#0077b5]" />
                                </div>
                                <span className="font-semibold text-slate-700 hidden group-hover:block transition-all">LinkedIn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
