import ScrollAnimation from "@/components/ScrollAnimation";
import { Code, Globe, Smartphone, ShieldCheck, Database, Cloud, Server, Cpu } from "lucide-react";
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
    return (<section id="services" className="py-24 bg-slate-50 text-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-blue-400">
                    Categories
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                    Our Categories
                </h2>
                <p className="max-w-2xl mx-auto text-slate-500 text-lg font-medium">
                    A marketplace without limits. From creative work to everyday help, find exactly who you need.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (<ScrollAnimation key={index} delay={index * 50} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-7 w-7 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {service.title}
                    </h3>
                    <p className="text-slate-500 text-base leading-relaxed font-medium">
                        {service.description}
                    </p>
                </ScrollAnimation>))}
            </div>
        </div>
    </section>);
}
