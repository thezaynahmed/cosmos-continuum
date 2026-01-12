"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Heart, ShieldCheck, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
    {
        title: "Innovation",
        description: "Pushing boundaries with AR & VR technology to redefine what's possible in healthcare.",
        icon: Zap,
        color: "text-amber-400",
        gradient: "from-amber-500/20 to-transparent",
        delay: 0.1,
    },
    {
        title: "Compassion",
        description: "Designing with the patient's heart in mind, ensuring technology serves humanity.",
        icon: Heart,
        color: "text-rose-400",
        gradient: "from-rose-500/20 to-transparent",
        delay: 0.2,
    },
    {
        title: "Integrity",
        description: "Transparent, research-backed clinically valid tools you can trust.",
        icon: ShieldCheck,
        color: "text-emerald-400",
        gradient: "from-emerald-500/20 to-transparent",
        delay: 0.3,
    },
    {
        title: "Collaboration",
        description: "Co-creating with doctors, nurses, and patients to build real-world solutions.",
        icon: Users,
        color: "text-cyan-400",
        gradient: "from-cyan-500/20 to-transparent",
        delay: 0.4,
    },
];

export default function ValuesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - left, y: e.clientY - top });
    };

    return (
        <section className="bg-[#020617] py-32 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
                        <span className="text-sm text-slate-300 tracking-wide font-medium">Our DNA</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                    >
                        Core Values
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-light"
                    >
                        The principles that guide us as we build the future of healing.
                    </motion.p>
                </div>

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 group"
                >
                    {values.map((value, i) => (
                        <ValueCard 
                            key={i} 
                            value={value} 
                            mousePosition={mousePosition} 
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ValueCard({
    value,
    mousePosition,
    isInView
}: {
    value: (typeof values)[0];
    mousePosition: { x: number; y: number };
    isInView: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const Icon = value.icon;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: value.delay, ease: "easeOut" }}
            className="relative min-h-[320px] rounded-2xl bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between overflow-hidden group/card transition-all duration-300 hover:-translate-y-1"
        >
            {/* Spotlight Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x - (cardRef.current?.offsetLeft || 0)}px ${mousePosition.y - (cardRef.current?.offsetTop || 0)}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />

            {/* Inner Content Glow */}
            <div className={cn("absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-br pointer-events-none", value.gradient)} />

            {/* Icon */}
            <div className="relative z-10">
                <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-3",
                    "bg-white/5 border border-white/10 backdrop-blur-md shadow-lg",
                    value.color
                )}>
                    <Icon size={28} strokeWidth={1.5} />
                </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold text-slate-100 group-hover/card:text-white transition-colors">
                    {value.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover/card:text-slate-200 transition-colors">
                    {value.description}
                </p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover/card:opacity-50 transition-opacity duration-500" />
        </motion.div>
    );
}