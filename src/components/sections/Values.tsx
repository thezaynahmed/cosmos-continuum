"use client";

import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { landingPageData } from "@/lib/data";

export default function Values() {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Initialize Vanilla Tilt
        cardsRef.current.forEach((card) => {
            if (card) {
                VanillaTilt.init(card, {
                    max: 15,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.2,
                    scale: 1.05
                });
            }
        });
    }, []);

    return (
        <section className="bg-slate-900 py-32 px-6">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-20">Our Core Values</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {landingPageData.values.map((value, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardsRef.current[i] = el; }}
                            className="group relative h-80 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-8 flex flex-col justify-between overflow-hidden cursor-pointer"
                        >
                            {/* Icon Placeholder using emoji/font-awesome logic simulated */}
                            <div className="text-5xl text-teal-400 mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                                {/* Simple mapping for visual demo */}
                                {value.icon === 'rocket' && '🚀'}
                                {value.icon === 'heart' && '❤️'}
                                {value.icon === 'shield' && '🛡️'}
                                {value.icon === 'users' && '🤝'}
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-slate-400 group-hover:text-slate-200 transition-colors">
                                    {value.description}
                                </p>
                            </div>

                            {/* Decorative Gradient Blob */}
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-500/40 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
