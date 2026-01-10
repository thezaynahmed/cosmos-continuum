"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

function MagneticButton({ children, className, href }: { children: React.ReactNode, className?: string, href: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Link
                href={href}
                className={className}
            >
                {children}
            </Link>
        </motion.div>
    );
}

export function Navbar() {
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className={cn(
                "flex items-center gap-8 px-8 py-3",
                "bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
            )}>
                <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                    Cosmos<span className="text-teal-400">Continuum</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {["Products", "Research", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
                    >
                        Login
                    </Link>

                    <MagneticButton
                        href="/demo"
                        className="hidden sm:inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 px-6 text-sm font-bold text-white shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-transform hover:scale-105"
                    >
                        Book Demo
                    </MagneticButton>
                </div>
            </div>
        </header>
    );
}
