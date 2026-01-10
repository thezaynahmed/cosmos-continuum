"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ClipMediaProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ClipMedia({ src, alt, className = "", priority = false }: ClipMediaProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current || !clipRef.current || !imageRef.current) return;

        const ctx = gsap.context(() => {
            // Strict Animation Requirement from User:
            // Start: inset(20% 20% 20% 20% round 30px) (A small floating window)
            // End: inset(0% 0% 0% 0% round 0px) (Expands to Full Bleed)

            gsap.set(clipRef.current, {
                clipPath: "inset(20% 20% 20% 20% round 30px)"
            });

            gsap.to(clipRef.current, {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none", // Scrub linear for heavy feel
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1, // Heavy friction
                }
            });

            // Parallax: Scale 1.5 -> 1.0 (Suction Effect)
            gsap.fromTo(imageRef.current,
                { scale: 1.5 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [src]);

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
            <div ref={clipRef} className="absolute inset-0 w-full h-full overflow-hidden bg-slate-200">
                <Image
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority={priority}
                />
            </div>
        </div>
    );
}
