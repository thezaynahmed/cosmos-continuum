"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
    const lenis = useLenis();
    const [mounted, setMounted] = useState(false);

    // Ensure we're on the client before using portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock scroll and close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            // Stop Lenis smooth scroll
            if (lenis) lenis.stop();
        } else {
            // Resume Lenis smooth scroll
            if (lenis) lenis.start();
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            // Ensure Lenis is resumed on cleanup
            if (lenis) lenis.start();
        };
    }, [isOpen, onClose, lenis]);

    // Don't render on server
    if (!mounted) return null;

    // Use Portal to render modal at document.body level, bypassing all stacking contexts
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: 99999 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        style={{ zIndex: 10 }}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Video Container */}
                    <motion.div
                        className="relative w-[90vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
                        style={{ zIndex: 10 }}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {videoSrc ? (
                            <video
                                src={videoSrc}
                                controls
                                autoPlay
                                className="w-full h-full object-cover bg-slate-900"
                            />
                        ) : (
                            // Placeholder YouTube embed
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="Video Player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full bg-slate-900"
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
