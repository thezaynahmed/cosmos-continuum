"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { landingPageData } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function TakeAction() {
    const container = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!scrollContainer.current || !container.current) return;

            const scrollWidth = scrollContainer.current.scrollWidth;
            const viewportWidth = window.innerWidth;

            gsap.to(scrollContainer.current, {
                x: -(scrollWidth - viewportWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    scrub: 1,
                    end: "+=3000", // Long scroll distance
                }
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="relative h-screen bg-teal-950 text-white overflow-hidden flex items-center">
            <div
                ref={scrollContainer}
                className="flex gap-24 px-24 items-center h-full w-max"
            >
                <div className="shrink-0">
                    <h2 className="text-8xl font-black tracking-tighter opacity-20">START<br />YOUR<br />JOURNEY</h2>
                </div>

                {landingPageData.takeAction.map((action, i) => (
                    <div key={i} className="group relative w-[400px] h-[500px] bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/10 transition-colors duration-500">
                        <span className="text-9xl font-bold text-teal-800/30 absolute top-4 right-8">{action.step}</span>

                        <div className="relative z-10 pt-20">
                            <h3 className="text-4xl font-bold mb-6">{action.title}</h3>
                            <p className="text-xl text-slate-300">{action.description}</p>
                        </div>

                        <button className="relative z-10 w-fit px-8 py-4 rounded-full border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-teal-950 transition-all font-bold uppercase tracking-widest">
                            Action
                        </button>
                    </div>
                ))}

                <div className="shrink-0 w-[400px] flex flex-col items-center justify-center gap-6">
                    <span className="text-teal-400 font-bold text-xl tracking-widest uppercase">Download App</span>
                    <div className="w-64 h-64 bg-white rounded-xl p-3 shadow-[0_0_50px_rgba(45,212,191,0.5)]">
                        <Image
                            src="/app-qr-code.png"
                            alt="Download Cosmos Continuum App - Scan QR Code"
                            width={256}
                            height={256}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-white/60 font-mono text-sm tracking-wider">SCAN ME</span>
                </div>
            </div>
        </section>
    );
}
