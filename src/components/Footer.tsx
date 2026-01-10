import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
            <div className="container px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                            Cosmos<span className="text-neon-teal">Continuum</span>
                        </Link>
                        <p className="mt-4 text-sm text-white/50">
                            Transforming healthcare experiences through immersive technology.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h4>
                        <ul className="space-y-2">
                            {["StoryWall", "Breathe With Me", "Walk With Me"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-white/60 hover:text-neon-teal transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
                        <ul className="space-y-2">
                            {["About", "Research", "Blog", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-white/60 hover:text-neon-teal transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {["Privacy Policy", "Terms of Service", "HIPAA Compliance"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-white/60 hover:text-neon-teal transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} Cosmos Continuum. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                            <Link
                                key={social}
                                href="#"
                                className="text-xs text-white/40 hover:text-neon-teal transition-colors"
                            >
                                {social}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
