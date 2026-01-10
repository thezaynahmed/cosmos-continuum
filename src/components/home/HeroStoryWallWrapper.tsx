"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Hero from "./Hero";
import StoryWallSection from "../sections/StoryWallSection";

/**
 * HeroStoryWallWrapper
 * 
 * Handles the "Portal Zoom" transition from the clean Hero section
 * into the colorful StoryWall jungle. The hero's central area expands
 * like a portal, revealing the magical AR world beneath.
 */
export default function HeroStoryWallWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Portal Zoom: A circle in the center expands from 0% to 200%
    // This reveals the StoryWall beneath the Hero
    // [0, 0.6] means the portal is fully open by 60% scroll into the wrapper
    const portalSize = useTransform(scrollYProgress, [0, 0.6], ["0%", "200%"]);

    // Create the portal mask - circle expanding from center
    // transparent in center = shows through to StoryWall
    // black around it = shows Hero
    const portalMask = useMotionTemplate`radial-gradient(circle at center, transparent ${portalSize}, black ${portalSize})`;

    // Scale down and fade the Hero as portal expands
    const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[250vh]">
            {/* Sticky Container for both layers */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                {/* BOTTOM LAYER: StoryWall (The Destination) */}
                {/* Revealed as the portal opens */}
                <div className="absolute inset-0 z-0">
                    {/* We render just a preview/teaser of StoryWall here */}
                    {/* The actual section comes after in the page flow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "url('/assets/cosmos-continuum-jungle-mural.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Ambient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-transparent to-[#0a1628]/60" />

                        {/* Glow effects */}
                        <div className="absolute inset-0">
                            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px]" />
                            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[120px]" />
                        </div>

                        {/* Teaser Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="text-center"
                                style={{
                                    opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 1]),
                                    scale: useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]),
                                }}
                            >
                                <p className="text-amber-400 text-sm font-mono tracking-[0.3em] uppercase mb-4">
                                    Entering The Magic
                                </p>
                                <h2
                                    className="text-5xl md:text-7xl font-black tracking-tight"
                                    style={{
                                        background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #ec4899 70%, #8b5cf6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    StoryWall
                                </h2>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* TOP LAYER: Hero (The Corporate Surface) */}
                {/* The portal mask reveals what's beneath */}
                <motion.div
                    className="absolute inset-0 z-10"
                    style={{
                        maskImage: portalMask,
                        WebkitMaskImage: portalMask,
                        scale: heroScale,
                        opacity: heroOpacity,
                    }}
                >
                    <Hero />
                </motion.div>

            </div>
        </div>
    );
}
