"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function MegaFooter() {
    return (
        <footer className="relative bg-[#020617] text-white py-20 overflow-hidden z-20">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-teal-900/10 to-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                
                {/* TOP ROW: Navigation */}
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <h4 className="text-xl font-bold mb-6 tracking-tight">Cosmos Continuum</h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Redefining pediatric healthcare through immersive augmented reality experiences.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Instagram} href="#" />
                            <SocialIcon icon={Linkedin} href="#" />
                            <SocialIcon icon={Twitter} href="#" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <FooterColumn 
                        title="Company" 
                        links={["About Us", "Careers", "Press", "Contact"]} 
                    />
                    <FooterColumn 
                        title="Solutions" 
                        links={["StoryWall", "Breathe With Me", "Walk With Me", "Clinical Data"]} 
                    />
                    <FooterColumn 
                        title="Legal" 
                        links={["Privacy Policy", "Terms of Service", "Compliance", "Security"]} 
                    />
                </div>

                {/* GIANT WATERMARK */}
                <div className="border-t border-white/5 pt-16 relative">
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-[12vw] font-black leading-none text-center text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-black select-none pointer-events-none opacity-50"
                    >
                        COSMOS
                    </motion.h1>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-slate-500 font-mono uppercase tracking-widest">
                        <p>© 2026 Cosmos Continuum Inc.</p>
                        <p>Designed for the Future of Care.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Sub-components for cleaner code
const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
    <div>
        <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">{title}</h4>
        <ul className="space-y-3">
            {links.map((link) => (
                <li key={link}>
                    <a href="#" className="group flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm">
                        {link}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
    <a 
        href={href} 
        className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-black hover:border-teal-500 transition-all duration-300"
    >
        <Icon className="w-4 h-4" />
    </a>
);