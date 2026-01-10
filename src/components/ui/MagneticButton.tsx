"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
    text: string;
    themeColor?: string; // e.g. "cyan-500", "emerald-400" (default: "emerald-400")
    onClick?: () => void;
    className?: string; // Optional for additional positioning
}

export default function MagneticButton({
    text,
    themeColor = "emerald-400",
    onClick,
    className = ""
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse Position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for the "Magnetic" pull (smooth and snappy)
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Dynamic Glow Shadow based on theme color (using generic mapping or raw style)
    // Note: Tailwind classes like `shadow-${themeColor}` might no work if dynamic.
    // We'll use inline styles for the color specific glow to be safe.

    // Helper to map color names to approximate hex/rgba for shadow (simple map)
    // Or we simply use the prop if it is a hex, but user said "cyan-500".
    // For simplicity with Tailwind, we can construct the shadow class if we assume standard tailwind palette,
    // but inline style is more robust for "glow".

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic force (reduce the distance value to make it subtle)
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`relative group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide text-white overflow-hidden transition-all duration-300 ${className}`}
            style={{
                x: springX,
                y: springY,
                // Glassmorphism Base
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                // Dynamic Glow on Hover (using CSS var wrapper or direct box-shadow)
                boxShadow: isHovered
                    ? `0 0 30px -5px var(--glow-color)`
                    : "0 0 0 0 transparent"
            } as any}
        >
            {/* Inject Theme Color Variable for the Shadow */}
            <style jsx>{`
                button {
                    --glow-color: ${getThemeColorValue(themeColor)};
                }
            `}</style>

            {/* 1. Gradient Shine Effect (Sweep) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ x: "-100%", opacity: 0 }}
                animate={isHovered ? { x: "100%", opacity: [0, 0.5, 0] } : { x: "-100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                }}
            />

            {/* 2. Text Content */}
            <span className="relative z-10">{text}</span>

            {/* 3. Icon Slide */}
            <motion.div
                className="relative z-10"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <ArrowRight className={`w-4 h-4 text-${themeColor}`} />
            </motion.div>

        </motion.button>
    );
}

// Helper utility to get a valid RGBA/Hex from a tailwind class name string
// This is a naive helper for the specific requested colors.
function getThemeColorValue(twClass: string) {
    // Basic mapping for common requested themes
    const map: Record<string, string> = {
        "cyan-400": "rgba(34, 211, 238, 0.6)",
        "cyan-500": "rgba(6, 182, 212, 0.6)",
        "emerald-400": "rgba(52, 211, 153, 0.6)",
        "emerald-500": "rgba(16, 185, 129, 0.6)",
        "purple-400": "rgba(192, 132, 252, 0.6)",
        "purple-500": "rgba(168, 85, 247, 0.6)",
        "amber-400": "rgba(251, 191, 36, 0.6)",
        "rose-400": "rgba(251, 113, 133, 0.6)",
        "blue-400": "rgba(96, 165, 250, 0.6)",
    };
    // If exact match found, return it
    if (map[twClass]) return map[twClass];
    // Fallback if user passes something else, default to white glow
    return "rgba(255, 255, 255, 0.3)";
}
