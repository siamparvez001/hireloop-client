"use client";

import { Card } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react"

const stats = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="14" height="14" rx="2" />
                <circle cx="13" cy="19" r="2" />
                <path d="M16 3h4a2 2 0 0 1 2 2v4" />
                <path d="M21 3l-5 5" />
            </svg>
        ),
        value: "50K",
        rawValue: 50000,
        suffix: "K",
        label: "Active Jobs",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 15h7M17.5 14v7" />
            </svg>
        ),
        value: "12K",
        rawValue: 12000,
        suffix: "K",
        label: "Companies",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="10" r="4" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M2 20c0-3 2.5-5 7-5" />
            </svg>
        ),
        value: "2M",
        rawValue: 2000000,
        suffix: "M",
        label: "Job Seekers",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        value: "97%",
        rawValue: 97,
        suffix: "%",
        label: "Satisfaction Rate",
    },
];

function useCountUp(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);

    return count;
}

function StatCard({ icon, value, rawValue, suffix, label, index, animate }) {
    const count = useCountUp(rawValue, 1600 + index * 100, animate);

    const displayValue = () => {
        if (suffix === "M") return `${(count / 1_000_000).toFixed(count >= 1_000_000 ? 0 : 1)}M`;
        if (suffix === "K") return `${(count / 1_000).toFixed(count >= 1_000 ? 0 : 1)}K`;
        if (suffix === "%") return `${count}%`;
        return count.toString();
    };

    return (
        <Card
            className="stat-card bg-[#141414] border border-white/[0.06] rounded-2xl"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="p-6 flex flex-col gap-8">
                <div className="text-white/50">{icon}</div>
                <div>
                    <p className="text-white font-semibold text-4xl sm:text-5xl tracking-tight leading-none mb-2">
                        {animate ? displayValue() : value}
                    </p>
                    <p className="text-white/40 text-sm font-normal mt-2">{label}</p>
                </div>
            </div>
        </Card>
    );
}

const StatsSection = () => {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                .stat-card {
                    animation: cardFadeUp 0.5s ease both;
                }
                @keyframes cardFadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .hero-heading {
                    animation: headingFade 0.8s ease both;
                }
                @keyframes headingFade {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full min-h-[680px] md:min-h-[760px] bg-black overflow-hidden flex flex-col items-center justify-end pb-12"
            >
                {/* Globe background */}

                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">

                    <div className="absolute left-1/2 -translate-x-1/2 top-[-80px] w-[900px] h-[600px] sm:w-[1100px] sm:h-[700px] md:w-[1300px] md:h-[850px] lg:w-[1500px] lg:h-[1000px]">
                        <img
                            src="/globe.png"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full object-cover opacity-90"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    </div>
                </div>
                ```


                {/* Ambient purple glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(90,60,220,0.28) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />

                {/* Headline */}
                <div className="relative z-10 text-center mb-10 px-4 hero-heading">
                    <p className="text-white/70 text-lg sm:text-xl md:text-2xl font-light tracking-wide max-w-xl mx-auto leading-snug">
                        Assisting over{" "}
                        <span className="text-white font-semibold">15,000 job seekers</span>
                        <br />
                        find their dream positions.
                    </p>
                    <motion.p animate={{ rotate: 360 }} >
                        Remote Job 
                    </motion.p>
                </div>

                {/* Stat cards */}
                <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} {...stat} index={i} animate={animate} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default StatsSection;