"use client";
import React from "react";
import { ChevronRight, Layers, Wallet, CheckCircle2 } from "lucide-react";
import GlareHover from "@/components/GlareHover";

const ProjectCard = ({ project, onClick }) => {
    const { title, description, tags, budget, milestones, image, status = "Demo" } = project;

    const getStatusStyle = () => {
        const s = status.toLowerCase();
        if (s === 'open') return "bg-[#0A1F0F] text-[#4ADE80] border-[#16A34A]/30";
        if (s === 'in progress' || s === 'active') return "bg-[#0D1A2A] text-[#60A5FA] border-[#3B82F6]/30";
        if (s === 'completed' || s === 'closed') return "bg-[#1A1A1A] text-[#A1A1AA] border-[#2A2A2A]";
        if (s === 'pending') return "bg-[#1F1500] text-[#FCD34D] border-[#F59E0B]/30";
        if (s === 'rejected') return "bg-[#1F0A0A] text-[#F87171] border-[#EF4444]/30";
        if (s === 'applied') return "bg-[#140A20] text-[#C084FC] border-[#9333EA]/30";
        return "bg-[#1A1A1A] text-[#A1A1AA] border-[#2A2A2A]";
    };

    const dotColor = () => {
        const s = status.toLowerCase();
        if (s === 'open') return "bg-[#16A34A]";
        if (s === 'in progress' || s === 'active') return "bg-[#3B82F6]";
        if (s === 'pending') return "bg-[#F59E0B]";
        if (s === 'rejected') return "bg-[#EF4444]";
        return "bg-[#52525B]";
    };

    return (
        <GlareHover
            width="100%"
            height="100%"
            background="#111111"
            borderColor="#2A2A2A"
            borderRadius="12px"
            glareColor="#EA580C"
            glareOpacity={0.12}
            className="group relative cursor-pointer flex flex-col h-full w-full max-w-[350px] transition-all duration-300 hover:border-[#EA580C]/40 hover:shadow-2xl hover:shadow-black/60"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <div onClick={onClick} className="flex flex-col h-full w-full overflow-hidden">
                {/* Status badge */}
                <div className="absolute top-3 right-3 z-10">
                    <div className={`${getStatusStyle()} px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1.5 backdrop-blur-sm`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${dotColor()}`} />
                        {status === "Demo" ? "Demo Sample" : status}
                    </div>
                </div>

                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-[#1A1A1A]">
                    {image
                        ? <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        : <div className="w-full h-full flex items-center justify-center"><Layers className="h-8 w-8 text-[#3F3F46]" /></div>
                    }
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-1">{title}</h3>
                        {description && <p className="text-[#71717A] text-xs line-clamp-2 leading-relaxed">{description}</p>}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags?.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-[#1A1A1A] text-[#A1A1AA] text-[10px] font-medium rounded border border-[#3F3F46]">{tag}</span>
                        ))}
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between mb-4 mt-auto">
                        <div className="flex items-center gap-1.5">
                            <Wallet className="h-3.5 w-3.5 text-[#52525B]" />
                            <span className="text-sm font-semibold text-[#16A34A]">{budget}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5 text-[#52525B]" />
                            <span className="text-xs text-[#71717A] font-medium flex items-center gap-1">
                                {milestones} milestones <CheckCircle2 className="h-3 w-3 text-[#16A34A]" />
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                            className="w-full bg-[#EA580C]/10 border border-[#EA580C]/20 hover:bg-[#EA580C] text-[#EA580C] hover:text-white rounded-lg h-9 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                        >
                            View Details <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </GlareHover>
    );
};

export default ProjectCard;
