"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothWheel: true }}>
            {children as React.ReactNode & Parameters<typeof ReactLenis>[0]["children"]}
        </ReactLenis>
    );
}

export default SmoothScroll;
