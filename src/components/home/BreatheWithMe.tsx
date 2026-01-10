import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Layers, Heart } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function BreatheWithMe() {
    const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="breathe" className="relative w-full min-h-screen bg-[#020617] overflow-hidden flex items-center justify-center py-20">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 to-[#020617] pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left: Immersive Breathing Animation */}
                <div className="relative h-[500px] flex items-center justify-center order-1 lg:order-1">
                    {/* Breathing Guide Circle */}
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                        {/* Outer Glow */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
                            animate={{
                                scale: phase === "inhale" ? 1.2 : 1,
                                opacity: phase === "inhale" ? 0.6 : 0.3
                            }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                        />
                        {/* Main Circle */}
                        <motion.div
                            className="w-64 h-64 rounded-full border-2 border-cyan-400/30 flex items-center justify-center bg-cyan-900/10 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                            animate={{
                                scale: phase === "inhale" ? 1.15 : 1.0,
                                boxShadow: phase === "inhale"
                                    ? "0 0 50px rgba(34,211,238,0.4)"
                                    : "0 0 30px rgba(34,211,238,0.2)"
                            }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                        >
                            {/* Giraffe Asset */}
                            <img
                                src="/assets/breathe-giraffe-new.jpg"
                                alt="Breathe Giraffe"
                                className="w-full h-full object-cover rounded-full opacity-80 mix-blend-screen mask-image-radial"
                                style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
                            />
                        </motion.div>

                        {/* Breathing Text */}
                        <div className="absolute bottom-12 h-6 flex  items-center justify-center overflow-visible">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={phase}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-cyan-300 font-mono text-lg tracking-[0.2em] uppercase absolute whitespace-nowrap"
                                >
                                    {phase === "inhale" ? "Inhale..." : "Exhale..."}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="relative text-white z-10 flex flex-col justify-center space-y-8 order-2 lg:order-2">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
                        >
                            Breathe With Me
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-300 leading-relaxed"
                        >
                            Designed to calm young patients before procedures. Experience the calm of the savannah. This innovative AR tool helps users reduce anxiety by focusing on deliberate, directed breathing.
                        </motion.p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: Activity, title: "Lowers Stress", desc: "Lowers patient stress in various healthcare environments." },
                            { icon: Layers, title: "Immersive", desc: "Provides a calming and immersive AR experience." },
                            { icon: Heart, title: "Comfort", desc: "Supports patient comfort by reducing anxiety." }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-start gap-3 hover:bg-white/10 transition-colors"
                            >
                                <feature.icon className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <h3 className="font-semibold text-white/90 text-sm mb-1">{feature.title}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="pt-4"
                    >
                        <MagneticButton
                            text="Explore Breathe With Me"
                            themeColor="blue-400"
                            onClick={() => console.log("Explore Breathe")}
                        />
                    </motion.div>

                    {/* Technical Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-sm text-slate-400 opacity-60 mt-4"
                    >
                        Requires no special equipment. Patients simply download the Cosmos Continuum app.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
