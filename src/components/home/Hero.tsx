"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useTexture, shaderMaterial, Plane } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import { motion } from "framer-motion";
import { Mouse, ArrowDown, PlayCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- SHADER DEFINITION ---
const WaterDistortionMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0, 0),
        uTexture: null,
        uHover: 0,
        uScrollProgress: 0, // 0 to 1
        uResolution: new THREE.Vector2(1, 1),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uScrollProgress;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Base Water Undulation
      float noiseVal = snoise(uv * 3.0 + uTime * 0.2);
      
      // Distortion strength increases with scroll
      float distortionStrength = 0.02 + (uScrollProgress * 0.1);
      
      // Mouse interaction ripples
      float dist = distance(uv, uMouse);
      float mouseRipple = smoothstep(0.4, 0.0, dist) * 0.1;
      
      // Apply distortion
      vec2 distortedUv = uv + vec2(noiseVal * distortionStrength) + mouseRipple;
      
      // Sample texture
      vec4 color = texture2D(uTexture, distortedUv);
      
      // Fade out on scroll (turn into liquid abstraction)
      // Mix with a teal color based on scroll progress
      vec3 liquidColor = vec3(0.0, 0.5, 0.5); // Teal-ish
      color.rgb = mix(color.rgb, liquidColor, uScrollProgress * 0.8);
      
      gl_FragColor = color;
    }
  `
);

extend({ WaterDistortionMaterial });

// Extend Type Data for TS
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            waterDistortionMaterial: any;
        }
    }
}

function Scene({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
    const { viewport } = useThree();
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture("/assets/storywall-turtle.jpg");

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            const mouseX = (state.pointer.x + 1) / 2;
            const mouseY = (state.pointer.y + 1) / 2;
            materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(mouseX, mouseY), 0.1);
        }
    });

    useGSAP(() => {
        if (!materialRef.current) return;
        ScrollTrigger.create({
            trigger: scrollRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uScrollProgress.value = self.progress;
                }
            }
        })
    }, { scope: scrollRef, dependencies: [scrollRef] });

    return (
        <Plane args={[viewport.width, viewport.height]}>
            {/* @ts-ignore */}
            <waterDistortionMaterial ref={materialRef} uTexture={texture} transparent />
        </Plane>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Parallax logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!textRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 40; // Max movement px
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(textRef.current, {
            x: -x, // Inverse direction for separation
            y: -y,
            duration: 1,
            ease: "power2.out"
        });
    }

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-slate-950"
            onMouseMove={handleMouseMove}
        >

            {/* Background R3F Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
                    <Scene scrollRef={containerRef} />
                </Canvas>
            </div>

            {/* Radial Gradient for Center Readability (Cinematic Layout) - Darkened Pattern */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.8) 50%, rgba(2,6,23,0.4) 100%)"
                }}
            />

            {/* Deep Dive Gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-[5]" />

            {/* Custom Styles for Shimmer Effect */}
            <style jsx global>{`
                @keyframes shimmer-stroke {
                    0% { -webkit-text-stroke-color: rgba(255,255,255,0.8); filter: drop-shadow(0 0 5px rgba(45,212,191,0.3)); }
                    50% { -webkit-text-stroke-color: rgba(255,255,255,1); filter: drop-shadow(0 0 25px rgba(45,212,191,0.8)); }
                    100% { -webkit-text-stroke-color: rgba(255,255,255,0.8); filter: drop-shadow(0 0 5px rgba(45,212,191,0.3)); }
                }
                .animate-caustic {
                    animation: shimmer-stroke 3s infinite ease-in-out;
                }
            `}</style>

            {/* Foreground Typography Layer - Center Aligned */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4 text-center h-full">

                {/* Parallax Container */}
                <div ref={textRef} className="flex flex-col items-center justify-center gap-6 text-white max-w-5xl will-change-transform pointer-events-auto">

                    {/* Tagline Badge - Enhanced Visibility */}
                    <div className="inline-block px-6 py-2.5 rounded-full bg-slate-900/80 border border-teal-400 backdrop-blur-xl shadow-[0_0_25px_rgba(45,212,191,0.5)]">
                        <span className="text-sm md:text-base font-extrabold tracking-[0.25em] text-teal-300 uppercase drop-shadow-md">
                            Augmented Reality for Healthcare
                        </span>
                    </div>

                    <h1 className="font-extrabold tracking-tighter leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] w-full">
                        <div className="overflow-hidden p-2">
                            {/* HOLLOW TEXT EFFECT - Max Visibility */}
                            <TextReveal className="block animate-caustic text-6xl md:text-8xl lg:text-9xl text-transparent [-webkit-text-stroke:4px_rgba(255,255,255,1)] pb-2 drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
                                REIMAGINING
                            </TextReveal>
                        </div>
                        <div className="overflow-hidden">
                            <TextReveal className="block text-6xl md:text-8xl lg:text-9xl text-white">
                                PEDIATRIC CARE
                            </TextReveal>
                        </div>
                    </h1>

                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg md:text-xl text-white font-medium tracking-wide leading-relaxed drop-shadow-lg">
                            Transform sterile hospital walls into living, breathing worlds, reducing patient anxiety through immersive AR storytelling.
                        </p>

                        {/* Primary CTA Button */}
                        <div className="flex justify-center mt-10">
                            <button className="px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_35px_rgba(45,212,191,0.6)] cursor-pointer pointer-events-auto group tracking-wide">
                                <PlayCircle className="w-6 h-6 text-teal-600 group-hover:text-teal-500 transition-colors" />
                                <span>See How It Works</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </section>
    );
}
