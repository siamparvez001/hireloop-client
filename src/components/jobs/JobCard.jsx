
import React from "react";
import { Card, Button, Avatar, Chip, Link } from "@heroui/react";
import {
    FiMapPin,
    FiBriefcase,
    FiDollarSign,
    FiCalendar,
    FiArrowRight
} from "react-icons/fi";
// import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JobCard({ job }) {
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
        companyName = "Company",
        companyLogo = "",
    } = job || {};

    const formatSalary = (min, max, curr) => {
        if (!min || !max) return "Negotiable";
        const minK = parseInt(min) / 1000;
        const maxK = parseInt(max) / 1000;
        return `${minK}k–${maxK}k ${curr} / year`;
    };
    const jobId = job._id?.$oid || job._id;
    return (
        <Card className="w-full max-w-[450px] bg-[#121212] border border-neutral-800 p-6 text-white rounded-[28px] shadow-xl overflow-visible">
            {/* Header Section */}
            <Card.Header className="flex flex-col items-start gap-4 p-0 w-full overflow-visible">
                <div className="flex items-center justify-between w-full">
                    {/* লোগো এবং নাম এর কন্টেইনার ফিক্স করা হয়েছে */}
                    <div className="flex items-center gap-3 min-w-0">
                        {companyLogo ? (
                            <div className="w-10 h-10 flex-shrink-0 bg-white rounded-xl flex items-center justify-center p-1.5 overflow-hidden">
                                <img
                                    src={companyLogo}
                                    alt={companyName}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <Avatar
                                name={companyName}
                                className="w-10 h-10 text-xs rounded-xl flex-shrink-0"
                            />
                        )}
                        <span className="text-sm font-medium text-neutral-400 truncate">{companyName}</span>
                    </div>

                    <Chip
                        size="sm"
                        variant="flat"
                        className="bg-neutral-800 text-neutral-300 capitalize border-none flex-shrink-0"
                    >
                        {jobCategory}
                    </Chip>
                </div>

                <div className="space-y-1 w-full">
                    <Card.Title className="text-2xl font-semibold tracking-tight text-neutral-100">
                        {jobTitle}
                    </Card.Title>
                    <Card.Description className="text-sm text-neutral-400 line-clamp-2">
                        {responsibilities}
                    </Card.Description>
                </div>
            </Card.Header>

            {/* Content Section (Badges) */}
            <Card.Content className="flex flex-wrap gap-2.5 my-6 p-0">
                <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 border border-neutral-800">
                    <FiMapPin className="text-[#a855f7] text-sm" />
                    <span>{isRemote ? "Remote" : "On-site"}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 border border-neutral-800">
                    <FiBriefcase className="text-[#a855f7] text-sm" />
                    <span className="capitalize">{jobType}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 border border-neutral-800">
                    <FiDollarSign className="text-[#a855f7] text-sm" />
                    <span>{formatSalary(minSalary, maxSalary, currency)}</span>
                </div>

                {deadline && (
                    <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 border border-neutral-800">
                        <FiCalendar className="text-[#a855f7] text-sm" />
                        <span>Deadline: {deadline}</span>
                    </div>
                )}
            </Card.Content>

            {/* Footer Section */}
            <Card.Footer className="justify-start p-0">
                <Link
                    
                    href={`/jobs/${jobId}`}
                    className="group flex justify-start items-center gap-2 bg-transparent hover:bg-zinc-800/40 p-0 text-base font-medium text-white transition-all duration-200"
                    variant="light"
                    disableRipple
                >
                    Apply Now
                    <ArrowRight className="group-hover:translate-x-1 text-zinc-400 group-hover:text-white w-4 h-4 transition-transform duration-200" />
                </Link>
            </Card.Footer>
        </Card>
    );
}