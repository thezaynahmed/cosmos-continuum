"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Hero from "./Hero";
import BreatheWithMe from "./BreatheWithMe";

export default function HomeHeroWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // Track scroll over the full height of the wrapper
    });

    // Mask Animation: Expand a hole in the center
    // We start with NO hole (transparent 0%), so full Hero is visible (black area of mask).
    // black means visible, transparent means hidden.
    // radial-gradient(circle at center, transparent X%, black X%)
    // X goes from 0% (no hole) to 150% (full hole).

    // We delay the start slightly to let user settle into scroll, then expand rapidly.
    // Adjusted to [0, 0.45] to finish mask by ~180vh, leaving buffer before overlap.
    const maskSize = useTransform(scrollYProgress, [0, 0.45], ["0%", "150%"]);

    // Create the gradient string
    const maskImage = useMotionTemplate`radial-gradient(circle at center, transparent ${maskSize}, black ${maskSize})`;

    // Also scale the content slightly for the "Dive" effect?
    // The user said: "Scale this mask up". The mask is scaling.
    // "Inside the mask is the Dark Background... darkness expands from center"

    return (
        <div ref={containerRef} className="relative w-full h-[400vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                {/* BOTTOM LAYER: BreatheWithMe (The Destination) */}
                {/* It sits behind the Hero, revealed as the mask opens. */}
                <div className="absolute inset-0 z-0 bg-[#020617]">
                    <BreatheWithMe />
                </div>

                {/* TOP LAYER: Hero (The Point of Origin) */}
                {/* We apply the mask here. As transparent circle grows, Hero disappears. */}
                <motion.div
                    className="absolute inset-0 z-10 bg-slate-950"
                    style={{ maskImage, WebkitMaskImage: maskImage }}
                >
                    <Hero />
                </motion.div>

            </div>
        </div>
    );
}
