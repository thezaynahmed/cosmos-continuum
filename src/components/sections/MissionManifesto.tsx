"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import VideoModal from "@/components/ui/VideoModal";

// ------------------------------------------------------------------
// Reusable Cinematic Player Component
// ------------------------------------------------------------------
interface CinematicPlayerProps {
    imageSrc: string;
    imageAlt: string;
    videoSrc?: string;
    glowColor?: string;
}

function CinematicPlayer({ imageSrc, imageAlt, videoSrc, glowColor = "99, 102, 241" }: CinematicPlayerProps) {
    const playerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

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
        <>
            <motion.div
                ref={playerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsVideoOpen(true)}
                style={{ x: springX, y: springY }}
                className="relative group cursor-pointer w-full max-w-[600px]"
            >
                <motion.div
                    className="relative aspect-video rounded-3xl overflow-hidden"
                    style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: `0 0 60px rgba(${glowColor}, 0.15), 0 25px 50px -12px rgba(0,0,0,0.5)`
                    }}
                    whileHover={{
                        boxShadow: `0 0 80px rgba(${glowColor}, 0.25), 0 25px 50px -12px rgba(0,0,0,0.7)`
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
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
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

            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc={videoSrc}
            />
        </>
    );
}

// ------------------------------------------------------------------
// Main MissionManifesto Component
// ------------------------------------------------------------------
export default function MissionManifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const block1Ref = useRef<HTMLDivElement>(null);
    const block2Ref = useRef<HTMLDivElement>(null);

    // Scroll animations for Block 1
    const { scrollYProgress: block1Progress } = useScroll({
        target: block1Ref,
        offset: ["start 90%", "start 40%"]
    });
    const block1Opacity = useTransform(block1Progress, [0, 1], [0.2, 1]);
    const block1Y = useTransform(block1Progress, [0, 1], [40, 0]);

    // Scroll animations for Block 2
    const { scrollYProgress: block2Progress } = useScroll({
        target: block2Ref,
        offset: ["start 90%", "start 40%"]
    });
    const block2Opacity = useTransform(block2Progress, [0, 1], [0.2, 1]);
    const block2Y = useTransform(block2Progress, [0, 1], [40, 0]);

    return (
        <section
            ref={containerRef}
            className="relative bg-[#020617] py-24 overflow-hidden"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* ============================================= */}
                {/* Block 1: Our Mission (Text Left, Visual Right) */}
                {/* ============================================= */}
                <div ref={block1Ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24 lg:mb-32">
                    {/* Text */}
                    <div className="flex-1 space-y-6">
                        <motion.div style={{ opacity: block1Opacity, y: block1Y }}>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                                Our Mission
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mt-3">
                                Healing Through Immersive AR.
                            </h3>
                        </motion.div>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
                            To revolutionize healthcare experiences by integrating cutting-edge augmented reality technology into therapeutic environments. We believe healing is not just about curing the body, but about nurturing the spirit.
                        </p>
                    </div>

                    {/* Cinematic Player */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <CinematicPlayer
                            imageSrc="/assets/thumbnails/our-mission-thumbnail.png"
                            imageAlt="Our Mission - Healing through immersive AR"
                            videoSrc="/assets/videos/our-mission-video.mp4"
                            glowColor="99, 102, 241"
                        />
                    </div>
                </div>

                {/* ============================================= */}
                {/* Cinematic Divider                             */}
                {/* ============================================= */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent my-16 lg:my-24" />

                {/* ============================================= */}
                {/* Block 2: What We Stand For (Visual Left, Text Right) */}
                {/* ============================================= */}
                <div ref={block2Ref} className="relative flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

                    {/* Distinct Glow Spot for Stand For Section */}
                    <div className="absolute right-0 lg:right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute left-0 lg:left-[5%] top-[30%] w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Text */}
                    <div className="flex-1 space-y-6">
                        <motion.div style={{ opacity: block2Opacity, y: block2Y }}>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                                What We<br />Stand For
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-3">
                                Clarity, Calm & Connection.
                            </h3>
                        </motion.div>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
                            We harness the power of augmented reality to reshape the healthcare experience, bringing engagement to every step of the patient journey. Our AR-driven products transform clinical settings into spaces of progress and possibility.
                        </p>
                    </div>

                    {/* Cinematic Player */}
                    <div className="flex-1 flex justify-center lg:justify-start">
                        <CinematicPlayer
                            imageSrc="/assets/thumbnails/stand-for-thumbnail.png"
                            imageAlt="What We Stand For - Clarity, Calm & Connection"
                            videoSrc="/assets/videos/stand-for-video.mp4"
                            glowColor="139, 92, 246"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
