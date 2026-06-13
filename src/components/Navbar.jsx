"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BriefcaseBusiness,
    Building2,
    LayoutDashboard,
    Menu,
    X,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();
    // console.log("Session data:", session, "Is pending:", isPending);
    const user = session?.user;
    const handleSignOut = async () => {
        await signOut();
    }

    const navLinks = [
        {
            name: "Browse Jobs",
            href: "/jobs",
            icon: <BriefcaseBusiness size={18} />,
        },
        {
            name: "Companies",
            href: "/companies",
            icon: <Building2 size={18} />,
        },
        {
            name: "Pricing",
            href: "/plans",
            icon: <LayoutDashboard size={18} />,
        },
    ];

    const dashboardLinks = {
        seeker: '/dashboard/seeker',
        recruiter: '/dashboard/recruiter',
        admin: '/dashboard/admin'
    }

    if (user?.email) {
        navLinks.push(
            {
                name: 'Dashboard',
                href: dashboardLinks[user?.role || 'seeker'],
                icon: <LayoutDashboard size={18} />
            }
        )
    }



    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09090F]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
                        <span className="text-xl font-bold text-white">
                            H
                        </span>
                    </div>

                    <div className="hidden sm:block">
                        <h1 className="text-lg font-bold text-white">
                            HireLoop
                        </h1>

                        <p className="text-xs text-gray-400">
                            Hiring Platform
                        </p>
                    </div>
                </Link>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-8 md:flex">
                        {/* Nav Links */}
                        <ul className="flex items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-gray-300 transition duration-200 hover:text-violet-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="h-8 w-px bg-white/10" />

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            {
                                user ?
                                    <>
                                        Hi, {user.name}
                                        <Button variant="ghost" onClick={handleSignOut}>
                                            Sign Out
                                        </Button>
                                    </>
                                    :
                                    <Link
                                        href="/auth/signin"
                                        className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
                                    >
                                        Sign In
                                    </Link>}

                            <Link
                                href="/auth/signup"
                                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:scale-[1.03]"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen
                    ? "max-h-[500px] border-t border-white/10"
                    : "max-h-0"
                    }`}
            >
                <div className="space-y-3 bg-[#09090F] px-4 py-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-gray-200 transition hover:bg-white/10"
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}

                    <div className="my-2 border-t border-white/10" />

                    <Link
                        href="/auth/signin"
                        className="block rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-4 text-center text-sm font-semibold text-violet-400"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/auth/signup"
                        className="block rounded-2xl bg-white px-4 py-4 text-center text-sm font-semibold text-black"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;