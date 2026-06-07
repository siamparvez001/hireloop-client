import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import { Card, Button, Avatar, Chip } from "@heroui/react";
import {
    FiMapPin,
    FiBriefcase,
    FiDollarSign,
    FiCalendar,
    FiCheckCircle,
    FiAward,
    FiArrowRight,
    FiLayers
} from "react-icons/fi";

const Page = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    // ডেটা না পাওয়া গেলে ক্র্যাশ এড়ানোর জন্য সেফটি গার্ড
    if (!job) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-zinc-500 text-lg">Job details not found.</p>
            </div>
        );
    }

    const {
        jobTitle = "Position Title",
        jobCategory = "Category",
        jobType = "Full-time",
        deadline,
        minSalary,
        maxSalary,
        currency = "BDT",
        isRemote = false,
        responsibilities = "",
        requirements = "",
        benefits = "",
        companyName = "Company",
        companyLogo = "",
    } = job;

    // স্যালারি ফরম্যাটার
    const formatSalary = (min, max, curr) => {
        if (!min || !max) return "Negotiable";
        const minK = parseInt(min) / 1000;
        const maxK = parseInt(max) / 1000;
        return `${minK}k–${maxK}k ${curr} / year`;
    };

    // কমা দিয়ে আলাদা করা স্ট্রিংগুলোকে অ্যারেতে রূপান্তর করার ফাংশন
    const parseList = (text) => text ? text.split(",").map((item) => item.trim()) : [];

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* 1. HERO HEADER CARD */}
                <Card className="w-full bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-[32px] shadow-2xl overflow-visible">
                    <Card.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-0 w-full overflow-visible">
                        {/* Company & Title Info */}
                        <div className="flex items-start gap-4 min-w-0">
                            {companyLogo ? (
                                <div className="w-16 h-16 flex-shrink-0 bg-white rounded-2xl flex items-center justify-center p-2.5 overflow-hidden shadow-md">
                                    <img
                                        src={companyLogo}
                                        alt={companyName}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <Avatar name={companyName} className="w-16 h-16 text-xl rounded-2xl flex-shrink-0" />
                            )}
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-base font-medium text-zinc-400">{companyName}</span>
                                    <span className="text-zinc-600">•</span>
                                    <Chip size="sm" variant="flat" className="bg-zinc-800 text-zinc-300 capitalize border-none">
                                        {jobCategory}
                                    </Chip>
                                </div>
                                <Card.Title className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                                    {jobTitle}
                                </Card.Title>
                            </div>
                        </div>

                        {/* Apply Button (Header) */}
                        <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold h-12 px-6 rounded-xl transition-all shadow-lg shadow-purple-600/20 flex-shrink-0"
                            endContent={<FiArrowRight className="text-lg" />}
                        >
                            Apply Now
                        </Button>
                    </Card.Header>

                    {/* Quick Meta Badges */}
                    <Card.Content className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-zinc-800/60 p-0">
                        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium text-zinc-300 border border-zinc-800">
                            <FiMapPin className="text-purple-500 text-base" />
                            <span>{isRemote ? "Remote" : "On-site"}</span>
                        </div>

                        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium text-zinc-300 border border-zinc-800">
                            <FiBriefcase className="text-purple-500 text-base" />
                            <span className="capitalize">{jobType}</span>
                        </div>

                        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium text-zinc-300 border border-zinc-800">
                            <FiDollarSign className="text-purple-500 text-base" />
                            <span>{formatSalary(minSalary, maxSalary, currency)}</span>
                        </div>

                        {deadline && (
                            <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium text-zinc-300 border border-zinc-800">
                                <FiCalendar className="text-purple-500 text-base" />
                                <span>Deadline: {deadline}</span>
                            </div>
                        )}
                    </Card.Content>
                </Card>

                {/* 2. DETAILED CONTENT SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column - Main Details (Span 2) */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Responsibilities */}
                        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-4">
                            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                                <FiLayers className="text-purple-500" />
                                Job Responsibilities
                            </h3>
                            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                                {responsibilities}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-4">
                            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                                <FiCheckCircle className="text-purple-500" />
                                Requirements
                            </h3>
                            <ul className="space-y-3">
                                {parseList(requirements).map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm sm:text-base">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Sidebar (Span 1) */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Benefits */}
                        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl p-6 space-y-4 h-full">
                            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                                <FiAward className="text-purple-500" />
                                Job Benefits
                            </h3>
                            <ul className="space-y-3">
                                {parseList(benefits).map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-zinc-400 text-sm">
                                        <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 3. BOTTOM ACTION BAR */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                    <span className="text-xs text-zinc-500">Job ID: {id}</span>
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold h-12 px-8 rounded-xl transition-all shadow-lg shadow-purple-600/20"
                    >
                        Apply Now
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default Page;