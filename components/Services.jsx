import ScrollAnimation from "@/components/ScrollAnimation";
import {
    Code,
    Globe,
    Smartphone,
    ShieldCheck,
    Database,
    Cloud,
    Server,
    Cpu
} from "lucide-react";

export default function Services() {
    const services = [
        {
            icon: Code,
            title: "Custom Software Development",
            description: "We build tailored software solutions that align with your business needs and objectives."
        },
        {
            icon: Globe,
            title: "Web Application Development",
            description: "Creating responsive, scalable web applications with cutting-edge technologies."
        },
        {
            icon: Smartphone,
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications for iOS and Android devices."
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity Solutions",
            description: "Protecting your digital assets with comprehensive security protocols and best practices."
        },
        {
            icon: Database,
            title: "Database Architecture",
            description: "Designing and implementing efficient, scalable database solutions for your applications."
        },
        {
            icon: Cloud,
            title: "Cloud Infrastructure",
            description: "Migrating and optimizing your applications for modern cloud environments."
        },
        {
            icon: Server,
            title: "DevOps Automation",
            description: "Streamlining development and operations with continuous integration and deployment pipelines."
        },
        {
            icon: Cpu,
            title: "AI & Machine Learning",
            description: "Implementing intelligent algorithms to extract insights and automate processes."
        }
    ];

    return (
        <section id="services" className="py-24 bg-slate-950 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-slate-400">
                        What We Offer
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Our Services
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-400 text-lg">
                        We provide comprehensive software solutions to help businesses transform and thrive in the digital landscape.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ScrollAnimation
                            key={index}
                            delay={index * 50}
                            className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="h-6 w-6 text-slate-300 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {service.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
