"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import BreatheWithMe from "./BreatheWithMe";

/**
 * BreatheWrapper
 * 
 * Wrapper for the BreatheWithMe section that handles the sticky behavior
 * and provides the visual depth effect as the WalkSection approaches.
 */
export default function BreatheWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full h-[150vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#020617]">
                <BreatheWithMe />
            </div>
        </div>
    );
}
