"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { landingPageData } from "@/lib/data";

export default function Marquee() {
    const firstText = useRef<HTMLDivElement>(null);
    const secondText = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    let xPercent = 0;
    let direction = -1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        requestAnimationFrame(animate);

        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: (e) => {
                    direction = e.direction * -1;
                }
            },
            x: "-500px", // Slight reactive movement
        });
    }, []);

    const animate = () => {
        if (xPercent <= -100) {
            xPercent = 0;
        }
        if (xPercent > 0) {
            xPercent = -100;
        }

        // Constant speed base + scroll influence could be added
        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });

        xPercent += 0.1 * direction; // Speed
        requestAnimationFrame(animate);
    }

    const items = [...landingPageData.marquee, ...landingPageData.marquee];

    return (
        <div className="relative flex overflow-hidden py-10 bg-teal-500 text-slate-950">
            <div ref={slider} className="relative whitespace-nowrap flex">
                <div ref={firstText} className="flex gap-16 px-8 items-center">
                    {items.map((text, i) => (
                        <span key={`1-${i}`} className="text-6xl font-bold uppercase tracking-tighter opacity-80">
                            {text} <span className="text-4xl align-middle ml-8">●</span>
                        </span>
                    ))}
                </div>
                <div ref={secondText} className="absolute left-full top-0 flex gap-16 px-8 items-center">
                    {items.map((text, i) => (
                        <span key={`2-${i}`} className="text-6xl font-bold uppercase tracking-tighter opacity-80">
                            {text} <span className="text-4xl align-middle ml-8">●</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
