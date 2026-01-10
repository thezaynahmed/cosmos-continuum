"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, Zap, Scan, Heart, Activity, CheckCircle2, Fingerprint, Wifi, Battery, SignalHigh, Lock, Mic, Disc } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

// ============================================================================
// DATA: Benefit Cards
// ============================================================================
const benefits = [
    {
        icon: Sparkles,
        title: "Reduced Anxiety",
        description: "Immersing children in a fun AR environment reduces pre-procedure anxiety, making treatments less traumatic and more tolerable.",
        color: "text-amber-400"
    },
    {
        icon: Users,
        title: "Sibling Engagement",
        description: "Siblings join the 'group play', reducing boredom and frustration while adding a supportive element to the patient's experience.",
        color: "text-rose-400"
    },
    {
        icon: Zap,
        title: "Faster Recovery",
        description: "Lower anxiety levels contribute to quicker recovery, as stress often impedes the body's natural healing processes.",
        color: "text-emerald-400"
    },
];

export default function StoryWallSection() {
    return (
        <section
            id="storywall"
            className="relative w-full min-h-screen bg-gradient-to-b from-emerald-950 to-black overflow-hidden flex items-center justify-center py-20"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-emerald-900/10 to-black pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* ============================================= */}
                {/* LEFT COLUMN: The Product Value               */}
                {/* ============================================= */}
                <div className="relative text-white z-10 flex flex-col justify-center space-y-8 order-1">
                    <div>
                        {/* Subhead */}
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4"
                        >
                            Transforming the Patient Experience.
                        </motion.h3>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl"
                        >
                            StoryWall ColorDive
                        </motion.h2>

                        {/* Copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-4"
                        >
                            A groundbreaking AR experience specifically engineered for children. By combining physical surroundings with 3D avatars,
                            patients are distracted from fear, leading to smoother procedures.
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
                            text="Explore StoryWall"
                            themeColor="emerald-400"
                            onClick={() => console.log("Explore StoryWall")}
                        />
                    </motion.div>
                </div>

                {/* ============================================= */}
                {/* RIGHT COLUMN: StoryWall AR Simulator         */}
                {/* ============================================= */}
                <div className="relative flex items-center justify-center order-2 perspective-1000">
                    <StoryWallARSimulator />
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SUB-COMPONENT: StoryWall Deep Logic AR Simulator
// ============================================================================
const StoryWallARSimulator = () => {
    // Sequence State: scanning -> reveal -> playing -> outcome -> reset
    const [phase, setPhase] = useState<"scanning" | "reveal" | "playing" | "outcome" | "reset">("scanning");
    const [time, setTime] = useState("14:30");

    // Clock Logic
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        };
        updateTime();
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    // Game Loop Logic
    useEffect(() => {
        let mounted = true;
        const runSequence = async () => {
            while (mounted) {
                // Phase 1: LiDAR Scan (3s)
                setPhase("scanning");
                await new Promise(r => setTimeout(r, 3000));

                // Phase 2: Parallax Reveal (2s)
                setPhase("reveal");
                await new Promise(r => setTimeout(r, 2000));

                // Phase 3: Collection Interaction (4s)
                setPhase("playing");
                await new Promise(r => setTimeout(r, 4000));

                // Phase 4: Clinical Outcome (3s)
                setPhase("outcome");
                await new Promise(r => setTimeout(r, 3000));

                // Reset
                setPhase("reset");
                await new Promise(r => setTimeout(r, 500));
            }
        };
        runSequence();
        return () => { mounted = false; };
    }, []);

    const isScanning = phase === "scanning";
    const isReveal = phase === "reveal";
    const isPlaying = phase === "playing";
    const isOutcome = phase === "outcome";
    const showVibrant = phase !== "scanning" && phase !== "reset";

    return (
        <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[420px] aspect-[3/4] rounded-[3rem] bg-[#1a1a1a] shadow-2xl overflow-hidden"
        >
            {/* 1. SLIM ALUMINUM CHASSIS */}
            <div className="absolute inset-0 rounded-[3rem] border-[2px] border-slate-500 pointer-events-none z-50 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
            <div className="absolute inset-[2px] rounded-[2.9rem] border-[1px] border-black pointer-events-none z-50" />

            {/* 2. THIN BEZEL & CAMERA */}
            <div className="absolute inset-[3px] rounded-[2.8rem] border-[8px] border-black pointer-events-none z-40 flex justify-center">
                <div className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
                    <div className="w-[2px] h-[2px] rounded-full bg-blue-900/40" />
                </div>
            </div>

            {/* 3. STATUS BAR */}
            <div className="absolute top-[11px] left-10 right-10 z-[60] flex justify-between items-center px-4 py-1 text-[10px] font-medium text-white/90">
                <div className="flex items-center gap-1.5">
                    <span>{time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <SignalHigh className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <div className="flex items-center gap-1">
                        <span>100%</span>
                        <Battery className="w-3.5 h-3.5 rotate-90" />
                    </div>
                </div>
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />

            {/* Glass Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-50 rounded-[2.8rem] opacity-20" />


            {/* ======================================================= */}
            {/* LAYER 1: VIBRANT AR WORLD (Bottom Layer)               */}
            {/* ======================================================= */}
            <div className="absolute inset-0 z-0 bg-emerald-950 rounded-[2.8rem] overflow-hidden">

                {/* The "Real" Image (Background) */}
                <Image
                    src="/assets/storywall-turtle.jpg"
                    alt="StoryWall AR"
                    fill
                    className="object-cover scale-105"
                />

                {/* PRO: Floating Foreground Elements (Parallax) */}
                {showVibrant && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        animate={{ x: [-5, 5, -5] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Simulated Leaves/Bubbles via CSS shapes */}
                        <div className="absolute top-[20%] right-[10%] w-12 h-12 bg-emerald-400/10 rounded-full blur-md" />
                        <div className="absolute bottom-[30%] left-[10%] w-20 h-20 bg-cyan-400/10 rounded-full blur-lg" />
                    </motion.div>
                )}

                {/* GAME UI LAYER */}
                <AnimatePresence>
                    {showVibrant && (
                        <motion.div
                            className="absolute inset-0 z-20"
                            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        >
                            {/* Phase 2: Reveal Text */}
                            {isReveal && (
                                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full text-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/30"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        <span className="text-white text-xs font-bold uppercase tracking-wide">Environment Loaded</span>
                                    </motion.div>
                                </div>
                            )}

                            {/* Phase 3: Avatar Engagement (Collection) */}
                            {isPlaying && (
                                <div className="absolute inset-0">

                                    {/* Collection Badge (Notification) */}
                                    <motion.div
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 z-50 border border-white/50"
                                    >
                                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase">Collection Update</div>
                                            <div className="text-xs font-bold text-slate-900">New Friend: Timmy Turtle!</div>
                                        </div>
                                    </motion.div>

                                    {/* The Turtle Hotspot */}
                                    <motion.div
                                        className="absolute top-[50%] left-[30%] w-32 h-32 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                                        animate={{
                                            scale: [1, 1.15, 1],
                                            rotate: [0, -5, 5, 0],
                                        }}
                                        transition={{ duration: 0.6, repeat: 2, repeatDelay: 0.5 }}
                                    >
                                        {/* Audio Visualizer Waves */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 items-end h-4">
                                            {[1, 2, 3].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1 bg-cyan-400 rounded-full"
                                                    animate={{ height: ["20%", "100%", "20%"] }}
                                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>

                                        {/* Particle Emitter */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {[1, 2, 3, 4].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-2 h-2 bg-emerald-300 rounded-full blur-[1px]"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: [1, 0], scale: 1.5, y: -60, x: (Math.random() - 0.5) * 40 }}
                                                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Simulated Finger Tap */}
                                    <motion.div
                                        className="absolute top-[55%] left-[35%] z-30"
                                        initial={{ opacity: 0, scale: 1.5 }}
                                        animate={{ opacity: [0, 1, 0], scale: 1 }}
                                        transition={{ duration: 0.5, repeat: 2, repeatDelay: 1 }}
                                    >
                                        <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-white/20 animate-ping" />
                                        <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                                    </motion.div>
                                </div>
                            )}

                            {/* Phase 4: Clinical Outcome */}
                            <AnimatePresence>
                                {isOutcome && (
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: "0%" }}
                                        exit={{ y: "100%" }}
                                        className="absolute bottom-0 left-0 right-0 h-[45%] bg-slate-900/95 backdrop-blur-xl border-t border-emerald-500/30 rounded-t-[2rem] p-6 z-40"
                                    >
                                        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />

                                        <div className="text-center mb-4 flex flex-col items-center">
                                            <div className="inline-flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-bold text-red-400 uppercase">Session Recording</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white">Patient Ready</h3>
                                        </div>

                                        {/* Anxiety Drop Graph */}
                                        <div className="h-16 w-full flex items-end justify-between gap-1 mb-4 relative">
                                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                                <motion.path
                                                    d="M 0 10 L 50 10 L 100 40 L 150 50 L 200 60 L 300 60"
                                                    fill="none"
                                                    stroke="#10b981"
                                                    strokeWidth="3"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1.5 }}
                                                />
                                            </svg>
                                            <span className="text-[8px] text-red-400 absolute top-0 left-0 font-mono">HIGH ANXIETY</span>
                                            <span className="text-[8px] text-emerald-400 absolute bottom-0 right-0 font-mono">LOW ANXIETY</span>
                                        </div>

                                        <div className="flex justify-between text-xs text-slate-400 font-mono border-t border-white/10 pt-3">
                                            <span>Session: 12m 30s</span>
                                            <span className="text-emerald-400 font-bold">Status: OK</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ======================================================= */}
            {/* LAYER 2: SCANNING PHASE (Bland Reality + LiDAR)        */}
            {/* ======================================================= */}
            <AnimatePresence>
                {(isScanning || phase === "reset") && (
                    <motion.div
                        key="scan-layer"
                        className="absolute inset-0 z-50 bg-slate-300"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src="/assets/storywall-turtle.jpg"
                            alt="Boring Wall"
                            fill
                            className="object-cover grayscale brightness-75 blur-[2px]"
                        />
                        <div className="absolute inset-0 bg-slate-500/30 mix-blend-overlay" />

                        {/* PRO: LiDAR Mesh Overlay */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-repeat animate-pulse mix-blend-overlay" />

                        {/* Cyan Laser Scan Bar */}
                        <motion.div
                            className="absolute left-0 right-0 h-2 bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,1)] z-30"
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />

                        {/* Searching Reticle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="relative w-24 h-24"
                                animate={{ rotate: 90, scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/80" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/80" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/80" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/80" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Scan className="w-8 h-8 text-white/50 animate-pulse" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Lock Target Animation */}
                        <motion.div
                            className="absolute top-[50%] left-[30%] -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 2 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2, duration: 0.5, type: "spring" }}
                        >
                            <div className="w-16 h-16 border-2 border-emerald-400 rounded-full animate-ping absolute" />
                            <div className="w-16 h-16 border-2 border-emerald-400 rounded-full flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm">
                                <Lock className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/70 px-2 py-1 rounded text-[10px] text-emerald-400 font-mono uppercase whitespace-nowrap">
                                Target Locked
                            </div>
                        </motion.div>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                            <span className="text-xs font-mono text-cyan-400 animate-pulse uppercase tracking-widest">Identifying Marker...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};
