"use client";

import React, { useState } from "react";

// Importing React Icons (Heroicons v2 & Feather Icons)
import {
    HiBriefcase,
    HiRectangleStack,
    HiClock,
    HiCurrencyDollar,
    HiMapPin,
    HiCalendarDays,
    HiLightBulb,
    HiCheckCircle
} from "react-icons/hi2";
import { FiTrendingUp, FiGift } from "react-icons/fi";

import { Button, Form, toast } from "@heroui/react";
import { createJob } from "@/lib/actions/jobs";
import { redirect, useRouter } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";

const PostJobForm = ({ company }) => {
    // console.log("Company data in PostJobForm:", company);
    // const router = useRouter();
    // Remote state control
    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});

    // Mock auto-filled company data if not passed via props
    // const company = company || {
    //     name: "Avenzo BD",
    //     logo: "https://via.placeholder.com/40",
    //     isApproved: true,
    // };

    const jobTypes = [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        // if(!company.isApproved) {
        //     toast.error("Your company is not approved yet. Please wait for approval before posting jobs.");
        //     return;
        // }
        // Client-side validation
        let newErrors = {};
        if (!data.jobTitle) newErrors.jobTitle = "Job Title is required";
        if (!data.jobCategory) newErrors.jobCategory = "Job Category is required";
        if (!data.jobType) newErrors.jobType = "Job Type is required";
        if (!isRemote && !data.location) newErrors.location = "Location is required";
        if (!data.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!data.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            isRemote,
            companyId: company._id ,
            companyName: company.name,
            companyLogo: company.logo ,
            status: "active",
            createdAt: new Date().toISOString(),
            isPublicVisible: true,
        };

        const res = await createJob(payload);
        if (res.success) {
            toast.success("Job posted successfully!");
            e.currentTarget.reset();
            setIsRemote(false);
            
            redirect("/dashboard/recruiter"); 
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-[#121212] border border-[#262626] rounded-xl text-[#ededed]">
            {/* Header section matching style guide */}
            <div className="mb-8 border-b border-[#262626] pb-5">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Post a New Job</h1>
                <p className="text-sm text-[#a1a1aa] mt-1">Fill in the details to publish a new job opening on HireLoop.</p>
            </div>

            {/* Auto-filled Company Info Alert */}
            <div className="mb-8 flex items-center justify-between p-4 bg-[#18181b] border border-[#262626] rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#27272a] flex items-center justify-center font-bold text-white border border-[#3f3f46]">
                        {company.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs text-[#a1a1aa]">Posting as Company</p>
                        <h4 className="text-sm font-medium text-white">{company.name}</h4>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Approved
                </div>
            </div>

            {/* Form wrapper */}
            <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-8">

                {/* SECTION 1: JOB INFO */}
                <div className="space-y-5">
                    <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
                        <HiBriefcase className="w-5 h-5 text-zinc-400" /> Job Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Job Title */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Job Title <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                name="jobTitle"
                                placeholder="e.g. Senior MERN Stack Developer"
                                className="w-full bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus:border-white rounded-xl p-3 outline-none text-white text-sm transition-all"
                            />
                        </div>

                        {/* Job Category */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Job Category <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiRectangleStack className="text-zinc-500 w-5 h-5 mr-2" />
                                <input
                                    required
                                    type="text"
                                    name="jobCategory"
                                    placeholder="e.g. Software Engineering"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Job Type Select */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Job Type <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiClock className="text-zinc-500 w-5 h-5 mr-2" />
                                <select
                                    required
                                    name="jobType"
                                    defaultValue=""
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm appearance-none cursor-pointer [color-scheme:dark]"
                                >
                                    <option value="" disabled hidden>Select job type</option>
                                    {jobTypes.map((type) => (
                                        <option key={type.value} value={type.value} className="bg-[#1c1c1e] text-white">
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Application Deadline */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Application Deadline <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiCalendarDays className="text-zinc-500 w-5 h-5 mr-2" />
                                <input
                                    required
                                    type="date"
                                    name="deadline"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm cursor-pointer [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Salary Ranges with Currency */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Minimum Salary</label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <FiTrendingUp className="text-zinc-500 w-4 h-4 mr-2" />
                                <input
                                    type="number"
                                    name="minSalary"
                                    placeholder="0.00"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Maximum Salary</label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <FiTrendingUp className="text-zinc-500 w-4 h-4 mr-2" />
                                <input
                                    type="number"
                                    name="maxSalary"
                                    placeholder="0.00"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Currency</label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiCurrencyDollar className="text-zinc-500 w-5 h-5 mr-2" />
                                <input
                                    type="text"
                                    name="currency"
                                    defaultValue="BDT"
                                    placeholder="e.g. USD, BDT"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location / Remote logic toggle */}
                    <div className="p-4 bg-[#161618] border border-[#262626] rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">Remote Position</span>
                                <span className="text-xs text-[#a1a1aa]">This job can be done from anywhere</span>
                            </div>
                            
                            {/* FIX: স্ক্রিনশটে থাকা "Remote" লেখার পাশে একদম রিয়েল ওয়ার্কিং টগল সুইচ বাটন */}
                            <label className="inline-flex items-center justify-center gap-3 cursor-pointer select-none group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="isRemote"
                                        checked={isRemote}
                                        onChange={(e) => setIsRemote(e.target.checked)}
                                        className="sr-only" // মেইন ইনপুট হাইড থাকবে
                                    />
                                    {/* সুইচের ব্যাকগ্রাউন্ড ট্র্যাকবার */}
                                    <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                        isRemote ? "bg-white" : "bg-zinc-700"
                                    }`}></div>
                                    {/* সুইচের মুভিং গোল ডট/বাটন */}
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-sm ${
                                        isRemote ? "translate-x-5 bg-black" : "bg-zinc-300"
                                    }`}></div>
                                </div>
                                <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Remote</span>
                            </label>
                        </div>

                        {!isRemote && (
                            <div className="flex flex-col gap-2">
                                <label className="text-zinc-400 font-medium text-sm">Location <span className="text-red-500">*</span></label>
                                <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                    <HiMapPin className="text-zinc-500 w-5 h-5 mr-2" />
                                    <input
                                        required={!isRemote}
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Dhaka, Bangladesh"
                                        className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* SECTION 2: JOB DESCRIPTION */}
                <div className="space-y-5">
                    <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
                        <HiLightBulb className="w-5 h-5 text-zinc-400" /> Job Details
                    </h3>

                    {/* Responsibilities */}
                    <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 font-medium text-sm">Responsibilities <span className="text-red-500">*</span></label>
                        <div className="relative flex items-start bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl p-3 transition-all">
                            <HiCheckCircle className="text-zinc-500 w-5 h-5 mt-0.5 mr-2" />
                            <textarea
                                required
                                name="responsibilities"
                                rows={4}
                                placeholder="Outline core tasks, daily workflows, and clear duties required..."
                                className="w-full bg-transparent text-white outline-none resize-y placeholder:text-zinc-600 text-sm"
                            />
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 font-medium text-sm">Requirements <span className="text-red-500">*</span></label>
                        <div className="relative flex items-start bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl p-3 transition-all">
                            <HiCheckCircle className="text-zinc-500 w-5 h-5 mt-0.5 mr-2" />
                            <textarea
                                required
                                name="requirements"
                                rows={4}
                                placeholder="List required technical skills, experience levels, tools, and background check standards..."
                                className="w-full bg-transparent text-white outline-none resize-y placeholder:text-zinc-600 text-sm"
                            />
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 font-medium text-sm">Benefits (Optional)</label>
                        <div className="relative flex items-start bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl p-3 transition-all">
                            <FiGift className="text-zinc-500 w-4 h-4 mt-1 mr-2" />
                            <textarea
                                name="benefits"
                                rows={3}
                                placeholder="e.g. Medical insurance, Flexible hours, Remote stipend, 2x Festival bonuses..."
                                className="w-full bg-transparent text-white outline-none resize-y placeholder:text-zinc-600 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
                    <Button
                        type="button"
                        variant="bordered"
                        className="border-[#2d2d30] hover:bg-[#1c1c1e] text-white font-medium px-5 rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-white text-black hover:bg-[#e4e4e7] font-semibold px-5 rounded-lg"
                    >
                        Register Company
                    </Button>
                </div>

            </Form>
        </div>
    );
};

export default PostJobForm;