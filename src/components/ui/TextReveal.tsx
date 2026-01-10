"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    trigger?: boolean;
}

export default function TextReveal({ children, className = "", trigger = true }: TextRevealProps) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!trigger) return;

            const words = container.current?.querySelectorAll(".word");
            if (!words) return;

            gsap.fromTo(
                words,
                {
                    yPercent: 100,
                },
                {
                    yPercent: 0,
                    duration: 1,
                    stagger: 0.03,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: container }
    );

    return (
        <div ref={container} className={` ${className}`}>
            <span className="sr-only">{children}</span>
            {children.split(" ").map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom mr-[0.25em] -mb-[0.1em] pb-[0.1em]" // Adjustments for descenders
                >
                    <span className="word inline-block transform will-change-transform">{word}</span>
                </span>
            ))}
        </div>
    );
}
