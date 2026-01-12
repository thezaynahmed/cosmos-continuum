"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import VideoModal from "@/components/ui/VideoModal";

export default function StandForSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // ------------------------------------------------------------------
    // Video Modal State
    // ------------------------------------------------------------------
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // ------------------------------------------------------------------
    // Scroll Progress for Text Reveal
    // ------------------------------------------------------------------
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 90%", "start 40%"]
    });

    const headlineOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
    const headlineY = useTransform(scrollYProgress, [0, 1], [40, 0]);

    // ------------------------------------------------------------------
    // Magnetic Player Hover
    // ------------------------------------------------------------------
    const playerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!playerRef.current) return;
        const rect = playerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) * 0.05);
        y.set((e.clientY - centerY) * 0.05);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center bg-[#020617] overflow-hidden py-24"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Right side indigo orb */}
                <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
                {/* Left accent */}
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Cinematic Player */}
                    <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                        <motion.div
                            ref={playerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setIsVideoOpen(true)}
                            style={{ x: springX, y: springY }}
                            className="relative group cursor-pointer w-full max-w-[600px]"
                        >
                            {/* Cinematic Player Container */}
                            <motion.div
                                className="relative aspect-video rounded-3xl overflow-hidden"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    boxShadow: "0 0 60px rgba(139, 92, 246, 0.15), 0 25px 50px -12px rgba(0,0,0,0.5)"
                                }}
                                whileHover={{
                                    boxShadow: "0 0 80px rgba(139, 92, 246, 0.25), 0 25px 50px -12px rgba(0,0,0,0.7)"
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* "WATCH STORY" Badge */}
                                <div className="absolute top-4 left-4 z-30">
                                    <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                        <span className="text-white text-xs font-semibold tracking-wider">WATCH STORY</span>
                                    </div>
                                </div>

                                {/* Image with Scale Effect */}
                                <motion.div
                                    className="w-full h-full"
                                    animate={{ scale: isHovered ? 1.05 : 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <Image
                                        src="/assets/thumbnails/stand-for-thumbnail.png"
                                        alt="What We Stand For - Clarity, Calm & Connection"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 600px"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-purple-900/10" />
                                </motion.div>

                                {/* Spotlight Sheen Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: isHovered ? "100%" : "-100%" }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />

                                {/* Central Play Button */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center">
                                    <motion.div
                                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center"
                                        animate={{
                                            scale: isHovered ? 1.1 : [1, 1.05, 1],
                                            opacity: isHovered ? 1 : 0.85
                                        }}
                                        transition={{
                                            scale: { duration: isHovered ? 0.3 : 2.5, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" },
                                            opacity: { duration: 0.3 }
                                        }}
                                    >
                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div ref={textRef} className="space-y-8 order-1 lg:order-2">
                        <motion.div style={{ opacity: headlineOpacity, y: headlineY }}>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                                What We<br />Stand For
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-3">
                                Clarity, Calm & Connection.
                            </h3>
                        </motion.div>

                        <div className="max-w-lg">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                We harness the power of augmented reality to reshape the healthcare experience, bringing engagement to every step of the patient journey. Our AR-driven products transform clinical settings into spaces of progress and possibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
            />
        </section>
    );
}