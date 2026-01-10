"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export const InteractiveCard = ({
    children,
    className,
    glowColor = "#2DD4BF",
    ...props
}: InteractiveCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div
            className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-2xl glass-panel min-h-[300px] flex flex-col",
                "hover:animate-tilt",
                className
            )}
            onMouseMove={handleMouseMove}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${glowColor}33,
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full flex flex-col flex-grow z-20">{children}</div>
        </div>
    );
};
