"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StorySectionProps = {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  features?: string[];
  stats?: { value: string; label: string }[];
  align?: "left" | "right";
  onInView?: () => void;
};

export function StorySection({
  id,
  title,
  tagline,
  description,
  features,
  stats,
  align = "left",
}: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`min-h-screen flex items-center p-8 md:p-20 relative z-10 ${
        align === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        ref={contentRef}
        className="max-w-xl bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"
      >
        {tagline && (
          <span className="text-neon-teal text-sm font-bold tracking-widest uppercase mb-2 block">
            {tagline}
          </span>
        )}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          {description}
        </p>

        {features && (
          <ul className="space-y-3 mb-8">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-neon-blue rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-neon-blue">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
