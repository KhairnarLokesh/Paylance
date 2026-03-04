import ScrollAnimation from "@/components/ScrollAnimation";
import { Code, Globe, Smartphone, ShieldCheck, Database, Cloud, Server, Cpu } from "lucide-react";
import GlareHover from "@/components/GlareHover";

export default function Services() {
    const services = [
        {
            icon: Code,
            title: "Digital Skills",
            description: "From coding and design to data science and digital marketing expertise."
        },
        {
            icon: Cpu,
            title: "AI & Innovation",
            description: "Leverage cutting-edge AI models and machine learning for your next big project."
        },
        {
            icon: Globe,
            title: "Knowledge & Advice",
            description: "Connect with experts for consultation, research, and professional guidance."
        },
        {
            icon: Smartphone,
            title: "Creative & Design",
            description: "Stunning visuals, user experiences, and brand identities tailored for you."
        },
        {
            icon: ShieldCheck,
            title: "Personal Help",
            description: "Everyday tasks and personal assistance from trusted professionals."
        },
        {
            icon: Database,
            title: "Local & Experiences",
            description: "Find skilled help in your local area for physical tasks and specialized services."
        },
        {
            icon: Cloud,
            title: "Marketing & Growth",
            description: "Strategies and execution to help your business scale and reach new audiences."
        },
        {
            icon: Server,
            title: "Lifestyle & Wellness",
            description: "Professional services for your personal well-being and lifestyle needs."
        }
    ];

    return (
        <section id="services" className="py-24 bg-[#0A0A0A] text-[#FAFAFA] overflow-hidden relative border-t border-[#2A2A2A]">
            {/* Subtle Grid Background - Adjusted for ultra-dark theme */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_16px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#EA580C]/20 bg-[#EA580C]/10 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-[#EA580C]">
                        Categories
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        Browse Our <span className="text-[#EA580C]">Marketplace</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-[#71717A] text-lg font-medium">
                        Access a world of expertise. Specialized categories curated for every phase of your project.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                        <ScrollAnimation key={index} delay={index * 50}>
                            <GlareHover
                                width="100%"
                                height="100%"
                                background="#111111"
                                borderColor="#2A2A2A"
                                borderRadius="20px"
                                glareColor="#EA580C"
                                glareOpacity={0.12}
                                className="group transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:border-[#EA580C]/30 hover:-translate-y-2"
                                style={{ display: 'block' }}
                            >
                                <div className="p-8">
                                    <div className="h-12 w-12 rounded-xl bg-[#1A0D07] border border-[#EA580C]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="h-6 w-6 text-[#EA580C]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#71717A] text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </GlareHover>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
