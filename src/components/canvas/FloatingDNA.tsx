"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingDNA() {
    const groupRef = useRef<THREE.Group>(null);
    const [material, setMaterial] = React.useState<THREE.MeshPhysicalMaterial | null>(null);
    
    const count = 20; // Number of "steps" in the helix
    const radius = 1.5;
    const heightStep = 0.4;
    const rotationStep = Math.PI / 6;

    // Generate data for the two strands and the rungs
    const dnaData = useMemo(() => {
        const strands = [];
        const rungs = [];

        for (let i = 0; i < count; i++) {
            const y = (i - count / 2) * heightStep;
            const angle = i * rotationStep;

            // Strand 1 position
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;

            // Strand 2 position (180 degrees offset)
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            strands.push({ pos: [x1, y, z1], key: `s1-${i}` });
            strands.push({ pos: [x2, y, z2], key: `s2-${i}` });

            // Rung between strand 1 and strand 2
            rungs.push({ pos: [(x1 + x2) / 2, y, (z1 + z2) / 2], rotation: [0, 0, angle], key: `r-${i}` });
        }
        return { strands, rungs };
    }, [count, heightStep, rotationStep, radius]);

    useGSAP(() => {
        if (!groupRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Scroll to StoryWall
        tl.to(groupRef.current.rotation, {
            y: Math.PI * 2,
            x: 0.5,
            duration: 1
        }, 0);

    }, []);

    // Color animation using ScrollTrigger with specific section targets
    useGSAP(() => {
        if (!material) return;

        // StoryWall Section - Deep Blue
        ScrollTrigger.create({
            trigger: "#storywall",
            start: "top center",
            end: "bottom center",
            onEnter: () => gsap.to(material.color, { r: 0.1, g: 0.2, b: 0.8, duration: 1 }),
            onEnterBack: () => gsap.to(material.color, { r: 0.1, g: 0.2, b: 0.8, duration: 1 }),
        });

        // Breathe With Me - Teal
        ScrollTrigger.create({
            trigger: "#breathe-with-me",
            start: "top center",
            end: "bottom center",
            onEnter: () => gsap.to(material.color, { r: 0.17, g: 0.83, b: 0.75, duration: 1 }), // #2DD4BF
            onEnterBack: () => gsap.to(material.color, { r: 0.17, g: 0.83, b: 0.75, duration: 1 }),
        });

        // Research - Purple
        ScrollTrigger.create({
            trigger: "#research",
            start: "top center",
            end: "bottom center",
            onEnter: () => gsap.to(material.color, { r: 0.5, g: 0, b: 0.5, duration: 1 }),
            onEnterBack: () => gsap.to(material.color, { r: 0.5, g: 0, b: 0.5, duration: 1 }),
        });

    }, { dependencies: [material] });

    useFrame((state) => {
        if (groupRef.current) {
            // Constant slow rotation on Z to keep it alive
             groupRef.current.rotation.z += 0.002;

            // Breathing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            groupRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Lights for the rim effect */}
            <pointLight position={[5, 5, 5]} intensity={2} color="#2DD4BF" />
            <pointLight position={[-5, -5, -5]} intensity={2} color="#7c3aed" />

            {/* Shared Material */}
            <meshPhysicalMaterial
                ref={setMaterial}
                color="#2DD4BF"
                emissive="#000000"
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={0.8}
                transmission={0.5}
                thickness={2}
            />

            {/* DNA Strands (represented by spheres) */}
            {dnaData.strands.map((strand) => (
                <mesh key={strand.key} position={strand.pos as [number, number, number]} material={material || undefined}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                </mesh>
            ))}

            {/* DNA Rungs (represented by cylinders) */}
            {dnaData.rungs.map((rung) => (
                <mesh
                    key={rung.key}
                    position={rung.pos as [number, number, number]}
                    rotation={[Math.PI / 2, 0, rung.rotation[2]]}
                >
                    <cylinderGeometry args={[0.04, 0.04, radius * 2, 8]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0}
                        metalness={1}
                        transmission={1}
                        thickness={1}
                    />
                </mesh>
            ))}
        </group>
    );
}