"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import { landingPageData } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
    const container = useRef<HTMLDivElement>(null);
    const videoContainer = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!videoContainer.current) return;

            // Soft Glow Pulse
            gsap.to(videoContainer.current, {
                boxShadow: "0 0 150px rgba(45,212,191,0.5)",
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "sine.inOut"
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="relative min-h-[80vh] bg-slate-950 py-24 px-6 overflow-hidden">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Side */}
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                        <TextReveal>{landingPageData.mission.title}</TextReveal>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                        {landingPageData.mission.description}
                    </p>
                    <div className="h-1 w-32 bg-teal-500 rounded-full" />
                </div>

                {/* Video Side */}
                <div className="flex justify-center lg:justify-end">
                    <div
                        ref={videoContainer}
                        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_0_100px_rgba(45,212,191,0.3)]"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src={landingPageData.mission.videoRef} type="video/mp4" />
                        </video>
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-teal-900/20 mix-blend-overlay" />
                    </div>
                </div>
            </div>
        </section>
    );
}
