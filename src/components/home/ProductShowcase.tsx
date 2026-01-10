"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import ClipMedia from "@/components/ui/ClipMedia";

gsap.registerPlugin(ScrollTrigger);

interface Product {
    id: string;
    title: string;
    description: string;
    benefits: string[];
    imageRef: string;
    themes?: string[];
    character?: string;
    focus?: string;
}

interface ProductShowcaseProps {
    product: Product;
    index: number;
}

export default function ProductShowcase({ product, index }: ProductShowcaseProps) {
    const container = useRef<HTMLDivElement>(null);
    const textContent = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Text Parallax/Fade
            if (textContent.current) {
                gsap.from(textContent.current, {
                    y: 50,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top center",
                        toggleActions: "play reverse play reverse"
                    }
                })
            }
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            id={product.id}
            className="relative min-h-[120vh] w-full flex items-center justify-center py-24 overflow-hidden"
        >
            {/* Clip-Path Media Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <ClipMedia
                    src={product.imageRef}
                    alt={product.title}
                    priority={index === 0}
                />
                {/* Overlay for text readability (optional, can be part of ClipMedia but separate here for control) */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none mix-blend-multiply" />
            </div>

            {/* Floating Glassmorphic Text Content */}
            <div
                ref={textContent}
                className={`relative z-10 max-w-2xl p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-white
        ${index % 2 === 0 ? 'md:ml-auto md:mr-12' : 'md:mr-auto md:ml-12'} mx-6 mt-32 md:mt-0`}
            >
                <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mix-blend-screen">
                        <TextReveal>{product.title}</TextReveal>
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-slate-100 max-w-lg leading-relaxed content-animation">
                        {product.description}
                    </div>

                    <div className="h-px w-full bg-white/30 my-6" />

                    <ul className="space-y-4">
                        {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-lg md:text-xl font-medium tracking-wide">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-400 text-teal-950 text-xs font-bold mr-4">✓</span>
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <div className="pt-6">
                        {product.themes && (
                            <p className="inline-block px-3 py-1 rounded-full border border-white/30 text-xs font-mono uppercase tracking-widest text-slate-300">
                                Themes: {product.themes.join(" • ")}
                            </p>
                        )}
                        {product.character && (
                            <p className="inline-block px-3 py-1 rounded-full border border-white/30 text-xs font-mono uppercase tracking-widest text-slate-300">
                                Character: {product.character}
                            </p>
                        )}
                        {product.focus && (
                            <p className="inline-block px-3 py-1 rounded-full border border-white/30 text-xs font-mono uppercase tracking-widest text-slate-300">
                                {product.focus}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
