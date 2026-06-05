"use client";

import Link from "next/link";

import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-black">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.04]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at top, rgba(255,255,255,0.12) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    {/* LEFT */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                                    <span className="text-xl font-bold text-white">
                                        H
                                    </span>
                                </div>

                                <div className="leading-none">
                                    <h2 className="text-2xl font-bold text-white">
                                        HireLoop
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Hiring Platform
                                    </p>
                                </div>
                            </Link>

                            {/* Description */}
                            <p className="mt-10 max-w-md text-lg leading-9 text-gray-500">
                                The AI-native career platform. Built for
                                people who take their work seriously.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-14 flex items-center gap-4">
                            <Link
                                href="#"
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white transition hover:bg-violet-600"
                            >
                               
                                <FaFacebook size={24}></FaFacebook>
                            </Link>

                            <Link
                                href="#"
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white transition hover:scale-105"
                            >
                                
                                
                                <FaGithub size={24}></FaGithub>
                            </Link>

                            <Link
                                href="#"
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white transition hover:bg-violet-600"
                            >
                         
                                <FaLinkedin size={24}></FaLinkedin>
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="mb-8 text-2xl font-semibold text-violet-500">
                            Product
                        </h3>

                        <ul className="space-y-6">
                            <li>
                                <Link
                                    href="/jobs"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Job discovery
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/ai"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Worker AI
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/companies"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Companies
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/salary"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Salary data
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-8 text-2xl font-semibold text-violet-500">
                            Navigations
                        </h3>

                        <ul className="space-y-6">
                            <li>
                                <Link
                                    href="/help"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Help center
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/career-library"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Career library
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-8 text-2xl font-semibold text-violet-500">
                            Resources
                        </h3>

                        <ul className="space-y-6">
                            <li>
                                <Link
                                    href="/brand"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Brand Guideline
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/newsroom"
                                    className="text-xl text-gray-500 transition hover:text-white"
                                >
                                    Newsroom
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-center lg:flex-row">
                    <p className="text-lg text-gray-500">
                        Copyright 2026 — HireLoop
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-lg text-gray-500">
                        <Link
                            href="/terms"
                            className="transition hover:text-white"
                        >
                            Terms & Policy
                        </Link>

                        <span>-</span>

                        <Link
                            href="/privacy"
                            className="transition hover:text-white"
                        >
                            Privacy Guideline
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;