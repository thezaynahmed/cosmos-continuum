"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/home/Hero";
import StoryWallSection from "@/components/sections/StoryWallSection";
import BreatheWithMe from "@/components/home/BreatheWithMe";
import WalkSection from "@/components/sections/WalkSection";
import Marquee from "@/components/home/Marquee";
import Mission from "@/components/sections/Mission";
import Values from "@/components/sections/Values";
import TakeAction from "@/components/sections/TakeAction";
import MegaFooter from "@/components/sections/MegaFooter";

export default function Home() {
    // ---------------------------------------------------------
    // TRANSITION A: Hero -> StoryWall ("Liquid Splash / ColorDive")
    // ---------------------------------------------------------

    // The driver for the splash animation
    const splashDriverRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: splashProgress } = useScroll({
        target: splashDriverRef,
        offset: ["start start", "end start"]
    });

    const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
    const smoothProgress = useSpring(splashProgress, springConfig);

    // Clip-path radius: 0% -> 150%
    const clipPathRadius = useTransform(smoothProgress, [0, 0.6], [0, 150]);
    const contentScale = useTransform(smoothProgress, [0, 0.6], [1.5, 1]);

    const clipPath = useTransform(clipPathRadius, (radius) =>
        `circle(${radius}% at 50% 50%)`
    );

    const heroOpacity = useTransform(splashProgress, [0.4, 0.6], [1, 0]);
    // Fade out StoryWall as we scroll further down to prevent z-index leaks at the bottom
    const storyWallOpacity = useTransform(splashProgress, [0.9, 0.99], [1, 0]);

    // Custom Cursor
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
            if (cursorOuterRef.current) gsap.to(cursorOuterRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <SmoothScroll>
            {/* Global Custom Cursor */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-teal-400 rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block" />
            <div ref={cursorOuterRef} className="fixed top-0 left-0 w-8 h-8 border border-teal-400/50 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block" />

            <main className="relative bg-black w-full min-h-screen font-sans selection:bg-teal-500/30 selection:text-teal-200">

                {/* ============================================= */}
                {/* FIXED LAYER 1: Hero (Bottom)                 */}
                {/* ============================================= */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen z-0"
                    style={{ opacity: heroOpacity }}
                >
                    <Hero />
                </motion.div>

                {/* ============================================= */}
                {/* FIXED LAYER 2: StoryWall (Revealed via Clip)  */}
                {/* ============================================= */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen z-10 will-change-[clip-path]"
                    style={{
                        clipPath: clipPath,
                        WebkitClipPath: clipPath,
                        opacity: storyWallOpacity,
                    }}
                >
                    <motion.div className="w-full h-full" style={{ scale: contentScale }}>
                        <StoryWallSection />
                    </motion.div>
                </motion.div>

                {/* ============================================= */}
                {/* SCROLLABLE CONTENT WRAPPER                   */}
                {/* ============================================= */}
                {/* This wrapper contains all the scrollable height */}
                <div className="relative z-20">

                    {/* 1. Spacer for Splash Animation (300vh) */}
                    <div ref={splashDriverRef} className="w-full h-[300vh] pointer-events-none" />

                    {/* 2. Breathe With Me (Sticky Section) */}
                    <div className="relative bg-[#020617]">
                        <BreatheWithMe />
                    </div>

                    {/* 3. Walk With Me */}
                    <div className="relative bg-teal-950 z-10 box-shadow-2xl">
                        <WalkSection />
                    </div>

                    {/* 4. White Content Area */}
                    <div className="relative bg-white z-20">
                        <Marquee />
                        <Mission />
                        <Values />
                        <TakeAction />
                    </div>

                    {/* 5. Footer (Solidly at the bottom) */}
                    <div className="relative z-30 bg-[#020617]">
                        <MegaFooter />
                    </div>
                </div>

            </main>
        </SmoothScroll>
    );
}
