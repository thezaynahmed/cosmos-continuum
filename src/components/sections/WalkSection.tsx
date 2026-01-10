"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footprints, Brain, TrendingUp, Scan, Zap, Trophy, MapPin, Star, CheckCircle2, Fingerprint, Wifi, Battery, SignalHigh } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

// ============================================================================
// DATA: Benefit Cards
// ============================================================================
const benefits = [
    {
        icon: Footprints,
        title: "Encourages Movement",
        description: "Motivates patients to engage in crucial physical activity.",
        color: "text-amber-400"
    },
    {
        icon: Brain,
        title: "Cognitive Stimulation",
        description: "Interactive mysteries provide dual mental and physical exercise.",
        color: "text-cyan-400"
    },
    {
        icon: TrendingUp,
        title: "Faster Recovery",
        description: "Gamified goals improve compliance and speed up recovery rates.",
        color: "text-emerald-400"
    },
];

export default function WalkSection() {
    return (
        <section id="walk" className="relative w-full min-h-screen bg-gradient-to-b from-teal-950 to-black overflow-hidden flex items-center justify-center py-20">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-teal-900/10 to-black pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* ============================================= */}
                {/* LEFT COLUMN: Deep Logic AR Simulator         */}
                {/* ============================================= */}
                <div className="relative order-1 flex items-center justify-center">
                    <WalkARSimulator />
                </div>

                {/* ============================================= */}
                {/* RIGHT COLUMN: Product Story (PRESERVED)      */}
                {/* ============================================= */}
                <div className="relative text-white z-10 flex flex-col justify-center space-y-8 order-2">
                    <div>
                        {/* Subhead */}
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4"
                        >
                            Engage, Mobilize, and Empower
                        </motion.h3>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
                        >
                            Walk With Me
                        </motion.h2>

                        {/* Body Copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl"
                        >
                            A groundbreaking AR tool designed to enhance postoperative care. Patients embark on 'experience routes'
                            that transform routine corridors into immersive adventures, motivating movement through gamified narratives.
                        </motion.p>
                    </div>

                    {/* Benefit Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-start gap-3 hover:bg-white/10 transition-colors group cursor-default"
                            >
                                <benefit.icon className={`w-6 h-6 ${benefit.color} group-hover:scale-110 transition-transform duration-300`} />
                                <div>
                                    <h3 className="font-semibold text-white/90 text-sm mb-1">{benefit.title}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="pt-8"
                    >
                        <MagneticButton
                            text="Explore Walk With Me"
                            themeColor="cyan-400"
                            onClick={() => console.log("Explore Walk")}
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

// ============================================================================
// SUB-COMPONENT: Deep Logic AR Simulator
// ============================================================================
const WalkARSimulator = () => {
    const [phase, setPhase] = useState<"scanning" | "walking" | "puzzle" | "success" | "complete" | "reset">("scanning");
    const [time, setTime] = useState("10:42");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        };
        const timer = setInterval(updateTime, 60000);
        updateTime();
        return () => clearInterval(timer);
    }, []);

    const targets = [
        { id: 1, top: "20%", left: "30%", delay: 0.5 },
        { id: 2, top: "60%", left: "80%", delay: 1.0 },
        { id: 3, top: "40%", left: "60%", delay: 1.5 },
    ];

    useEffect(() => {
        let mounted = true;
        const runSequence = async () => {
            while (mounted) {
                setPhase("scanning");
                await new Promise(r => setTimeout(r, 3000));
                setPhase("walking");
                await new Promise(r => setTimeout(r, 3000));
                setPhase("puzzle");
                await new Promise(r => setTimeout(r, 2000));
                setPhase("success");
                await new Promise(r => setTimeout(r, 1000));
                setPhase("complete");
                await new Promise(r => setTimeout(r, 4000));
                setPhase("reset");
                await new Promise(r => setTimeout(r, 500));
            }
        };
        runSequence();
        return () => { mounted = false; };
    }, []);

    const isScanning = phase === "scanning";
    const isGameActive = phase === "walking" || phase === "puzzle" || phase === "success" || phase === "complete";
    const isPuzzleActive = phase === "puzzle";
    const isComplete = phase === "complete";

    return (
        <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[420px] aspect-[3/4] rounded-[3rem] bg-[#1a1a1a] shadow-2xl overflow-hidden"
        >
            {/* 1. SLIM ALUMINUM CHASSIS */}
            {/* Metallic Outer Edge */}
            <div className="absolute inset-0 rounded-[3rem] border-[2px] border-slate-500 pointer-events-none z-50 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
            <div className="absolute inset-[2px] rounded-[2.9rem] border-[1px] border-black pointer-events-none z-50" />

            {/* 2. THIN BEZEL & CAMERA */}
            <div className="absolute inset-[3px] rounded-[2.8rem] border-[8px] border-black pointer-events-none z-40 flex justify-center">
                {/* Subtle Front Camera */}
                <div className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
                    <div className="w-[2px] h-[2px] rounded-full bg-blue-900/40" />
                </div>
            </div>

            {/* 3. STATUS BAR & UI */}
            <div className="absolute top-[11px] left-10 right-10 z-[60] flex justify-between items-center px-4 py-1 text-[10px] font-medium text-white/90">
                <div className="flex items-center gap-1.5">
                    <span>{time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <SignalHigh className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <div className="flex items-center gap-1">
                        <span>84%</span>
                        <Battery className="w-3.5 h-3.5 rotate-90" />
                    </div>
                </div>
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />

            {/* Glass Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-50 rounded-[2.8rem] opacity-20" />


            {/* ======================================================= */}
            {/* LAYER 1: VIBRANT AR WORLD                              */}
            {/* ======================================================= */}
            <div className="absolute inset-0 z-0 bg-teal-950 rounded-[2.8rem] overflow-hidden">
                <Image
                    src="/assets/walk-jungle-new.jpg"
                    alt="AR Jungle Game"
                    fill
                    className="object-cover"
                />

                <AnimatePresence>
                    {isGameActive && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                            {/* A. The Path */}
                            <svg className="w-full h-full p-12" viewBox="0 0 300 400">
                                <path d="M 150 50 C 50 150, 50 250, 150 300 C 250 350, 250 400, 150 450" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 12" />
                                <motion.path d="M 150 50 C 50 150, 50 250, 150 300 C 250 350, 250 400, 150 450" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: phase === "walking" ? 0.6 : (phase === "complete" ? 1 : 0.6) }} transition={{ duration: phase === "walking" ? 3 : 2, ease: "easeInOut" }} />
                            </svg>

                            <motion.div className="absolute w-10 h-10 bg-teal-400 rounded-full border-2 border-white shadow-[0_0_20px_rgba(45,212,191,0.8)] z-20 flex items-center justify-center" initial={{ left: "50%", top: "12%" }} animate={phase === "walking" || phase === "puzzle" || phase === "success" ? { left: "50%", top: "60%" } : (phase === "complete" ? { left: "50%", top: "100%" } : {})} transition={{ duration: phase === "walking" ? 3 : (phase === "complete" ? 2 : 0), ease: "easeInOut" }}>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white" />
                            </motion.div>

                            <AnimatePresence>
                                {phase === "walking" && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                                        <Footprints className="w-4 h-4 text-emerald-400 animate-pulse" />
                                        <span className="text-white text-xs font-bold uppercase tracking-wide">Walk Forward</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {(isPuzzleActive || phase === "success") && (
                                    <div className="absolute inset-0 z-30">
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute top-[40%] left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-teal-500/50 p-4 rounded-2xl shadow-2xl text-center w-48">
                                            <div className="flex justify-center -mt-8 mb-2">
                                                <div className="bg-cyan-500 p-2 rounded-full border-4 border-slate-900">
                                                    <Brain className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <h4 className="text-white text-sm font-bold">Mystery Task</h4>
                                            <p className="text-slate-400 text-xs mb-3">Tap 3 hidden butterflies.</p>
                                            <div className="flex justify-center gap-2">
                                                {[1, 2, 3].map(i => (
                                                    <motion.div key={i} className={`w-2 h-2 rounded-full ${phase === "success" ? "bg-emerald-500" : "bg-slate-700"}`} animate={phase === "success" ? { scale: [1, 1.5, 1] } : {}} transition={{ delay: i * 0.1 }} />
                                                ))}
                                            </div>
                                        </motion.div>
                                        {isPuzzleActive && targets.map((t) => (
                                            <motion.div key={t.id} className="absolute w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center" style={{ top: t.top, left: t.left }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1.5, 1], opacity: [0, 1, 0] }} transition={{ delay: t.delay, duration: 0.5 }}>
                                                <div className="w-full h-full bg-cyan-400/30 rounded-full animate-ping" />
                                                <Fingerprint className="w-4 h-4 text-white opacity-80" />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {isComplete && (
                                    <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-900/95 backdrop-blur-xl border-t border-emerald-500/30 rounded-t-[2rem] p-6 z-40">
                                        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />
                                        <div className="text-center mb-6">
                                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
                                                <Trophy className="w-3 h-3 text-emerald-400" />
                                                <span className="text-[10px] font-bold text-emerald-400 uppercase">Milestone Unlocked</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">Route Complete!</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                                <div className="text-slate-400 text-xs uppercase font-mono mb-1">Steps</div>
                                                <div className="text-xl font-bold text-white">1,250</div>
                                            </div>
                                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                                <div className="text-slate-400 text-xs uppercase font-mono mb-1">Cognitive</div>
                                                <div className="text-xl font-bold text-emerald-400">100%</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* LAYER 2: SCANNING PHASE */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div key="scan-layer" className="absolute inset-0 z-50 bg-slate-300" initial={{ clipPath: "inset(0% 0% 0% 0%)" }} animate={{ clipPath: "inset(100% 0% 0% 0%)" }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}>
                        <Image src="/assets/walk-jungle-new.jpg" alt="Boring Wall" fill className="object-cover grayscale brightness-50 blur-[2px]" />
                        <div className="absolute inset-0 bg-slate-500/20 mix-blend-overlay" />
                        <motion.div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_cyan]" initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/70 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                                <span className="text-xs font-mono text-cyan-400 animate-pulse">DETECTING SURFACE...</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};