"use client";

import { Canvas } from "@react-three/fiber";
import FloatingDNA from "@/components/canvas/FloatingDNA";
import { Suspense } from "react";

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
            <FloatingDNA />
        </Suspense>
      </Canvas>
    </div>
  );
}
