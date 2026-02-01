"use client";

import React from "react";
import {
    ArrowRight,
    Layers,
    Clock,
    Wallet,
    ChevronRight,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ project }) => {
    const {
        title,
        category,
        tags,
        budget,
        milestones,
        image
    } = project;

    return (
        <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className="bg-yellow-100/90 backdrop-blur-md text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 shadow-sm flex items-center gap-1.5 leading-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    Demo / Sample
                </div>
            </div>

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-slate-100 transition-all duration-500 group-hover:scale-105">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <Sparkles className="h-12 w-12 text-blue-200" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-700 transition-colors">
                        {title}
                    </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                            <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-none mb-1">Budget</p>
                            <p className="text-sm font-bold text-slate-700 leading-none">{budget}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                            <Layers className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-none mb-1">Structure</p>
                            <p className="text-sm font-bold text-slate-700 leading-none flex items-center gap-1">
                                {milestones} Milestones
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <Button
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-2xl h-12 font-bold text-sm shadow-md hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
                    >
                        View Details
                        <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
