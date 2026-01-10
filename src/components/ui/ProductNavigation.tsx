"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
    { id: "hero", label: "StoryWall" },
    { id: "breathe", label: "Breathe" },
    { id: "walk", label: "Walk" }
];

export default function ProductNavigation() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            // Find the current section
            for (const section of SECTIONS) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end">
            {SECTIONS.map((section) => (
                <div
                    key={section.id}
                    className="group flex items-center gap-4 cursor-pointer"
                    onClick={() => scrollToSection(section.id)}
                >
                    {/* Label (Reveals on Hover or Active) */}
                    <span
                        className={`text-sm font-medium tracking-wider transition-all duration-300 ${activeSection === section.id
                                ? "text-white opacity-100 translate-x-0"
                                : "text-slate-400 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                            }`}
                    >
                        {section.label}
                    </span>

                    {/* Dot Indicator */}
                    <div className="relative flex items-center justify-center w-3 h-3">
                        {activeSection === section.id && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 bg-teal-400 rounded-full blur-sm"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id
                                    ? "bg-teal-400 scale-125"
                                    : "bg-slate-600 group-hover:bg-slate-400"
                                }`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
