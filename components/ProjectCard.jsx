"use client";
import React from "react";
import { ArrowRight, Layers, Clock, Wallet, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
const ProjectCard = ({ project, onClick }) => {
    const { title, description, tags, budget, milestones, image, status = "Demo" } = project;
    const getStatusStyles = () => {
        const s = status.toLowerCase();
        if (s === 'open')
            return "bg-green-100 text-green-700 border-green-200";
        if (s === 'in progress' || s === 'active')
            return "bg-blue-100 text-blue-700 border-blue-200";
        if (s === 'closed' || s === 'completed')
            return "bg-slate-100 text-slate-700 border-slate-200";
        if (s === 'pending')
            return "bg-amber-100 text-amber-700 border-amber-200";
        if (s === 'rejected')
            return "bg-red-100 text-red-700 border-red-200";
        if (s === 'applied')
            return "bg-indigo-100 text-indigo-700 border-indigo-200";
        // Demo / Sample
        return "bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]";
    };
    return (<div onClick={onClick} className="group relative bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden flex flex-col h-full mx-auto w-full max-w-[350px] cursor-pointer">
            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-10">
                <div className={`${getStatusStyles()} backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border shadow-sm flex items-center gap-1 leading-none transition-all duration-300`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status === "Demo" ? "bg-[#EAB308]" : "bg-current"}`}/>
                    {status === "Demo" ? "Demo / Sample" : status}
                </div>
            </div>

            {/* Image Section */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
                {image ? (<img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>) : (<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <Sparkles className="h-10 w-10 text-blue-200"/>
                    </div>)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow text-center sm:text-left">
                <div className="mb-4">
                    <h3 className="text-lg font-black text-[#2563EB] leading-tight mb-2 line-clamp-1">
                        {title}
                    </h3>
                    {description && (<p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
                            {description}
                        </p>)}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-5">
                    {tags && tags.slice(0, 3).map((tag, idx) => (<span key={idx} className="px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] text-[9px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
                            {tag}
                        </span>))}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#EA580C] shrink-0">
                            <Wallet className="h-4 w-4"/>
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider mb-0.5">Budget</p>
                            <p className="text-sm font-extrabold text-[#334155] leading-tight">{budget}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-[#F5F3FF] text-[#7C3AED] shrink-0">
                            <Layers className="h-4 w-4"/>
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider mb-0.5">Structure</p>
                            <p className="text-sm font-extrabold text-[#334155] leading-tight flex items-center gap-1">
                                {milestones} Ms
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]"/>
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <Button onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }} className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-[16px] h-11 font-extrabold text-sm shadow-md shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn">
                        View Details
                        <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"/>
                    </Button>
                </div>
            </div>
        </div>);
};
export default ProjectCard;
