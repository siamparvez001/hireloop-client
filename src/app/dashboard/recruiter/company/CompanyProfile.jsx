// "use client";

// import React, { useState } from "react";
// import {
//     HiOutlineBuildingOffice, // এখানে নাম সংশোধন করা হয়েছে (HiOutlineOfficeBuilding এর পরিবর্তে)
//     HiGlobeAlt,
//     HiMapPin,
//     HiUserGroup,
//     HiInformationCircle,
//     HiDocumentText,
//     HiCloudArrowUp,
//     HiPencilSquare
// } from "react-icons/hi2";
// import { FiTrendingUp } from "react-icons/fi";
// import { toast } from "@heroui/react";
// import { createCompany } from "@/lib/actions/companies";

// // Mock implementation of Hero UI Button & Form wrappers
// const Button = ({ children, className, ...props }) => (
//     <button className={`py-2 px-4 transition-all duration-200 active:scale-95 ${className}`} {...props}>
//         {children}
//     </button>
// );

// const Form = ({ children, onSubmit, validationErrors, className }) => (
//     <form onSubmit={onSubmit} className={className}>
//         {validationErrors && <div className="text-red-500 text-sm">{JSON.stringify(validationErrors)}</div>}
//         {children}
//     </form>
// );

// export default function CompanyProfile({ recruiter, recruiterCompany }) {
//     // viewMode states: 'view', 'edit', 'register'
//     const [viewMode, setViewMode] = useState("view");
//     const [uploadingLogo, setUploadingLogo] = useState(false);
//     const [errors, setErrors] = useState(null);

//     // প্রথমবার কোম্পানি না থাকলে সরাসরি "Not Registered" স্টেটটি দেখাবে।
//     const [company, setCompany] = useState(recruiterCompany || null);

//     // Helper status badge styling map
//     const statusBadges = {
//         Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
//         Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
//         Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20"
//     };

//     // Client-side Imgbb Image Upload pipeline
//     const handleLogoUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (file.size > 5 * 1024 * 1024) {
//             setErrors(prev => ({ ...prev, logo: "Image size should be less than 5MB." }));
//             return;
//         }

//         setUploadingLogo(true);
//         const formData = new FormData();
//         formData.append("image", file);

//         try {
//             const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
//             const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//                 method: "POST",
//                 body: formData
//             });
//             const data = await response.json();

//             if (data.success) {
//                 setCompany(prev => ({ ...prev, logo: data.data.url }));
//             } else {
//                 alert("Failed to upload image to Imgbb.");
//             }
//         } catch (error) {
//             console.error("Imgbb uploading error:", error);
//         } finally {
//             setUploadingLogo(false);
//         }
//     };

//     // Save/Update Submission Flow
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);

//         // const updatedData = {
//         //     logo: company?.logo || "",
//         //     name: formData.get("name"),
//         //     websiteUrl: formData.get("websiteUrl"),
//         //     industry: formData.get("industry"),
//         //     location: formData.get("location"),
//         //     employeeCount: formData.get("employeeCount"),
//         //     description: formData.get("description"),
//         //     status: company?.status || "Pending"
//         // };

//         const newCompanyData = {
//             logo: company?.logo || "",
//             name: formData.get("name"),
//             websiteUrl: formData.get("websiteUrl"),
//             industry: formData.get("industry"),
//             location: formData.get("location"),
//             employeeCount: formData.get("employeeCount"),
//             description: formData.get("description"),
//             status: company?.status || "Pending",
//             recruiterId: recruiter.id
//         };
//         setCompany(newCompanyData);
//         console.log("Prepared Company Data for Submission:", newCompanyData);
//         const payload = await createCompany(newCompanyData);


//         console.log("Submitting Company Data:", newCompanyData);

//         if (payload.insertedId) {
//             toast.success("Company profile created successfully! Awaiting admin approval.");
//         }


//         setViewMode("view");
//     };

//     // --- STATE 1: NO COMPANY REGISTERED ---
//     if (!company?._id && viewMode !== "register") {
//         return (
//             <div className="max-w-4xl mx-auto my-10 p-8 bg-[#161618] border border-[#262626] rounded-2xl text-center space-y-6">
//                 <div className="w-16 h-16 bg-[#1c1c1e] border border-[#2d2d30] rounded-2xl flex items-center justify-center mx-auto shadow-md">
//                     <HiOutlineBuildingOffice className="w-8 h-8 text-zinc-400" />
//                 </div>
//                 <div className="space-y-2">
//                     <h2 className="text-xl font-semibold text-white tracking-tight">Your Company Is Not Registered Yet</h2>
//                     <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
//                         It looks like you haven't set up your company workspace yet. To start posting corporate jobs, managing your core developer teams, and getting applicant features, please register your company first.
//                     </p>
//                 </div>
//                 <div className="pt-2">
//                     <Button
//                         onClick={() => setViewMode("register")}
//                         className="bg-white text-black hover:bg-[#e4e4e7] font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm"
//                     >
//                         Register Your Company
//                     </Button>
//                     <div className="mt-4">
//                         <span className="text-zinc-500 text-xs">Or, click this </span>
//                         <button
//                             onClick={() => setViewMode("register")}
//                             className="text-zinc-300 hover:text-white underline text-xs font-medium cursor-pointer"
//                         >
//                             direct registration link
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // --- STATE 2: VIEW MODE (DETAILS SHOWING) ---
//     if (viewMode === "view" && company) {
//         return (
//             <div className="max-w-4xl mx-auto my-10 p-6 md:p-8 bg-[#161618] border border-[#262626] rounded-2xl space-y-8">
//                 {/* Profile Header Block */}
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
//                     <div className="flex items-center gap-4">
//                         <div className="w-20 h-20 bg-[#1c1c1e] border border-[#2d2d30] rounded-2xl overflow-hidden flex items-center justify-center p-2">
//                             {company.logo ? (
//                                 <img src={company.logo} alt="Company Logo" className="w-full h-full object-contain rounded-xl" />
//                             ) : (
//                                 <HiOutlineBuildingOffice className="w-10 h-10 text-zinc-500" />
//                             )}
//                         </div>
//                         <div>
//                             <div className="flex items-center gap-3 flex-wrap">
//                                 <h1 className="text-2xl font-bold text-white tracking-tight">{company.name}</h1>
//                                 <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusBadges[company.status]}`}>
//                                     {company.status}
//                                 </span>
//                             </div>
//                             <p className="text-zinc-400 text-sm mt-1 flex items-center gap-1.5">
//                                 <HiGlobeAlt className="w-4 h-4 text-zinc-500" />
//                                 <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline text-zinc-300">
//                                     {company.websiteUrl}
//                                 </a>
//                             </p>
//                         </div>
//                     </div>

//                     <Button
//                         onClick={() => setViewMode("edit")}
//                         className="border border-[#2d2d30] hover:bg-[#1c1c1e] text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 self-start sm:self-auto"
//                     >
//                         <HiPencilSquare className="w-4 h-4 text-zinc-400" /> Edit Profile
//                     </Button>
//                 </div>

//                 {/* Structured Overview Metadata Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                     <div className="p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl flex items-center gap-3">
//                         <div className="p-2 bg-[#262626] rounded-lg text-zinc-400"><FiTrendingUp className="w-5 h-5" /></div>
//                         <div>
//                             <p className="text-xs text-zinc-500 font-medium">Industry</p>
//                             <p className="text-sm font-medium text-white">{company.industry || "N/A"}</p>
//                         </div>
//                     </div>
//                     <div className="p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl flex items-center gap-3">
//                         <div className="p-2 bg-[#262626] rounded-lg text-zinc-400"><HiMapPin className="w-5 h-5" /></div>
//                         <div>
//                             <p className="text-xs text-zinc-500 font-medium">Location</p>
//                             <p className="text-sm font-medium text-white">{company.location || "N/A"}</p>
//                         </div>
//                     </div>
//                     <div className="p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl flex items-center gap-3">
//                         <div className="p-2 bg-[#262626] rounded-lg text-zinc-400"><HiUserGroup className="w-5 h-5" /></div>
//                         <div>
//                             <p className="text-xs text-zinc-500 font-medium">Employees</p>
//                             <p className="text-sm font-medium text-white">{company.employeeCount || "N/A"} members</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Extended Details Content Block */}
//                 <div className="space-y-3">
//                     <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
//                         <HiInformationCircle className="w-5 h-5 text-zinc-400" /> Company Description
//                     </h3>
//                     <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-[#1c1c1e]/50 border border-[#2d2d30]/40 p-4 rounded-xl">
//                         {company.description || "No description provided yet."}
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     // --- STATE 3: FORM WORKFLOW (CREATE / EDIT) ---
//     return (
//         <div className="max-w-4xl mx-auto my-10 p-6 md:p-8 bg-[#161618] border border-[#262626] rounded-2xl">
//             <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-8">

//                 {/* SECTION 1: BUSINESS OVERVIEW */}
//                 <div className="space-y-5">
//                     <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
//                         <HiOutlineBuildingOffice className="w-5 h-5 text-zinc-400" />
//                         {viewMode === "register" ? "Register Your Company" : "Update Company Details"}
//                     </h3>

//                     {/* Logo Upload Component Interface Wrapper */}
//                     <div className="flex items-center gap-5 p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl">
//                         <div className="w-20 h-20 bg-[#161618] border border-[#262626] rounded-xl overflow-hidden flex items-center justify-center relative group p-2">
//                             {company?.logo ? (
//                                 <img src={company.logo} alt="Preview Logo" className="w-full h-full object-contain rounded-lg" />
//                             ) : (
//                                 <HiOutlineBuildingOffice className="w-8 h-8 text-zinc-600" />
//                             )}
//                         </div>
//                         <div className="flex flex-col gap-2">
//                             <label className="text-zinc-400 font-medium text-sm">Company Logo</label>
//                             <label className="relative flex items-center gap-2 bg-[#262626] border border-[#3a3a3e] hover:border-zinc-400 text-white rounded-lg px-4 py-2 text-xs font-medium cursor-pointer transition-all">
//                                 <HiCloudArrowUp className="w-4 h-4 text-zinc-300" />
//                                 {uploadingLogo ? "Uploading to Imgbb..." : "Upload New Image"}
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleLogoUpload}
//                                     className="sr-only"
//                                     disabled={uploadingLogo}
//                                 />
//                             </label>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         {/* Company Name */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-zinc-400 font-medium text-sm">Company Name <span className="text-red-500">*</span></label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="name"
//                                 defaultValue={company?.name || ""}
//                                 placeholder="e.g. Acme Corp"
//                                 className="w-full bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus:border-white rounded-xl p-3 outline-none text-white text-sm transition-all"
//                             />
//                         </div>

//                         {/* Website URL */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-zinc-400 font-medium text-sm">Website URL <span className="text-red-500">*</span></label>
//                             <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
//                                 <HiGlobeAlt className="text-zinc-500 w-5 h-5 mr-2" />
//                                 <input
//                                     required
//                                     type="url"
//                                     name="websiteUrl"
//                                     defaultValue={company?.websiteUrl || ""}
//                                     placeholder="https://example.com"
//                                     className="w-full bg-transparent py-3 outline-none text-white text-sm"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                         {/* Industry */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-zinc-400 font-medium text-sm">Industry <span className="text-red-500">*</span></label>
//                             <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
//                                 <FiTrendingUp className="text-zinc-500 w-4 h-4 mr-2" />
//                                 <input
//                                     required
//                                     type="text"
//                                     name="industry"
//                                     defaultValue={company?.industry || ""}
//                                     placeholder="e.g. Technology"
//                                     className="w-full bg-transparent py-3 outline-none text-white text-sm"
//                                 />
//                             </div>
//                         </div>

//                         {/* Location */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-zinc-400 font-medium text-sm">Location <span className="text-red-500">*</span></label>
//                             <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
//                                 <HiMapPin className="text-zinc-500 w-5 h-5 mr-2" />
//                                 <input
//                                     required
//                                     type="text"
//                                     name="location"
//                                     defaultValue={company?.location || ""}
//                                     placeholder="e.g. Dhaka, Bangladesh"
//                                     className="w-full bg-transparent py-3 outline-none text-white text-sm"
//                                 />
//                             </div>
//                         </div>

//                         {/* Employee Scale Options */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-zinc-400 font-medium text-sm">Employee Count <span className="text-red-500">*</span></label>
//                             <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
//                                 <HiUserGroup className="text-zinc-500 w-5 h-5 mr-2" />
//                                 <select
//                                     required
//                                     name="employeeCount"
//                                     defaultValue={company?.employeeCount || ""}
//                                     className="w-full bg-transparent py-3 outline-none text-white text-sm appearance-none cursor-pointer [color-scheme:dark]"
//                                 >
//                                     <option value="" disabled hidden>Select headcount range</option>
//                                     <option value="1-10" className="bg-[#1c1c1e] text-white">1-10 employees</option>
//                                     <option value="11-50" className="bg-[#1c1c1e] text-white">11-50 employees</option>
//                                     <option value="51-200" className="bg-[#1c1c1e] text-white">51-200 employees</option>
//                                     <option value="201-500" className="bg-[#1c1c1e] text-white">201-500 employees</option>
//                                     <option value="500+" className="bg-[#1c1c1e] text-white">500+ employees</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* SECTION 2: EXTENDED DETAILS */}
//                 <div className="space-y-5">
//                     <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
//                         <HiDocumentText className="w-5 h-5 text-zinc-400" /> Business Narrative
//                     </h3>

//                     {/* Description Area */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-zinc-400 font-medium text-sm">Company Description <span className="text-red-500">*</span></label>
//                         <div className="relative flex items-start bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl p-3 transition-all">
//                             <HiInformationCircle className="text-zinc-500 w-5 h-5 mt-0.5 mr-2" />
//                             <textarea
//                                 required
//                                 name="description"
//                                 rows={4}
//                                 defaultValue={company?.description || ""}
//                                 placeholder="Describe your workspace mission, cultural values, and core products..."
//                                 className="w-full bg-transparent text-white outline-none resize-y placeholder:text-zinc-600 text-sm"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Action Controls Section */}
//                 <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
//                     <Button
//                         type="button"
//                         onClick={() => setViewMode("view")}
//                         className="border border-[#2d2d30] hover:bg-[#1c1c1e] text-white font-medium px-5 rounded-lg text-sm"
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         disabled={uploadingLogo}
//                         className="bg-white text-black hover:bg-[#e4e4e7] disabled:opacity-50 font-semibold px-5 rounded-lg text-sm"
//                     >
//                         Save Profile
//                     </Button>
//                 </div>

//             </Form>
//         </div>
//     );
// }








"use client";

import React, { useState } from "react";
import {
    HiOutlineBuildingOffice,
    HiGlobeAlt,
    HiMapPin,
    HiUserGroup,
    HiInformationCircle,
    HiDocumentText,
    HiCloudArrowUp,
    HiPencilSquare
} from "react-icons/hi2";
import { FiTrendingUp } from "react-icons/fi";
import { toast } from "@heroui/react";
import { createCompany } from "@/lib/actions/companies";

const Button = ({ children, className, ...props }) => (
    <button className={`py-2 px-4 transition-all duration-200 active:scale-95 ${className}`} {...props}>
        {children}
    </button>
);

const Form = ({ children, onSubmit, validationErrors, className }) => (
    <form onSubmit={onSubmit} className={className}>
        {validationErrors && <div className="text-red-500 text-sm">{JSON.stringify(validationErrors)}</div>}
        {children}
    </form>
);

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    const [viewMode, setViewMode] = useState("view");
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [errors, setErrors] = useState(null);

    // ✅ FIX: Keep company as is, don't check _id
    const [company, setCompany] = useState(recruiterCompany || null);

    const statusBadges = {
        Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "Image size should be less than 5MB." }));
            return;
        }

        setUploadingLogo(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setCompany(prev => ({ ...prev, logo: data.data.url }));
            } else {
                alert("Failed to upload image to Imgbb.");
            }
        } catch (error) {
            console.error("Imgbb uploading error:", error);
        } finally {
            setUploadingLogo(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newCompanyData = {
            logo: company?.logo || "",
            name: formData.get("name"),
            websiteUrl: formData.get("websiteUrl"),
            industry: formData.get("industry"),
            location: formData.get("location"),
            employeeCount: formData.get("employeeCount"),
            description: formData.get("description"),
            status: company?.status || "Pending",
            recruiterId: recruiter.id
        };

        // ✅ Update local state with the new company data
        setCompany(newCompanyData);
        console.log("Prepared Company Data for Submission:", newCompanyData);

        const payload = await createCompany(newCompanyData);
        console.log("Submitting Company Data:", newCompanyData);

        if (payload.insertedId) {
            toast.success("Company profile created successfully! Awaiting admin approval.");
            // ✅ Update company with the returned ID from server
            setCompany(prev => ({ ...prev, _id: payload.insertedId }));
        }

        setViewMode("view");
    };

    // ✅ FIX: Check if company is null/undefined, not _id
    if (!company && viewMode !== "register") {
        return (
            <div className="max-w-4xl mx-auto my-10 p-8 bg-[#161618] border border-[#262626] rounded-2xl text-center space-y-6">
                <div className="w-16 h-16 bg-[#1c1c1e] border border-[#2d2d30] rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <HiOutlineBuildingOffice className="w-8 h-8 text-zinc-400" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white tracking-tight">Your Company Is Not Registered Yet</h2>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                        It looks like you haven't set up your company workspace yet. To start posting corporate jobs, managing your core developer teams, and getting applicant features, please register your company first.
                    </p>
                </div>
                <div className="pt-2">
                    <Button
                        onClick={() => setViewMode("register")}
                        className="bg-white text-black hover:bg-[#e4e4e7] font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm"
                    >
                        Register Your Company
                    </Button>
                </div>
            </div>
        );
    }

    // --- STATE 2: VIEW MODE ---
    if (viewMode === "view" && company) {
        return (
            <div className="max-w-4xl mx-auto my-10 p-6 md:p-8 bg-[#161618] border border-[#262626] rounded-2xl space-y-8">
                {/* Profile Header Block */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-[#1c1c1e] border border-[#2d2d30] rounded-2xl overflow-hidden flex items-center justify-center p-2">
                            {company.logo ? (
                                <img src={company.logo} alt="Company Logo" className="w-full h-full object-contain rounded-xl" />
                            ) : (
                                <HiOutlineBuildingOffice className="w-10 h-10 text-zinc-500" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-white tracking-tight">{company.name}</h1>
                                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusBadges[company.status]}`}>
                                    {company.status}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm mt-1 flex items-center gap-1.5">
                                <HiGlobeAlt className="w-4 h-4 text-zinc-500" />
                                <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline text-zinc-300">
                                    {company.websiteUrl}
                                </a>
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={() => setViewMode("edit")}
                        className="border border-[#2d2d30] hover:bg-[#1c1c1e] text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 self-start sm:self-auto"
                    >
                        <HiPencilSquare className="w-4 h-4 text-zinc-400" /> Edit Profile
                    </Button>
                </div>

                {/* Structured Overview Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-[#262626] rounded-lg text-zinc-400"><FiTrendingUp className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-zinc-500 font-medium">Industry</p>
                            <p className="text-sm font-medium text-white">{company.industry || "N/A"}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-[#262626] rounded-lg text-zinc-400"><HiMapPin className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-zinc-500 font-medium">Location</p>
                            <p className="text-sm font-medium text-white">{company.location || "N/A"}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-[#262626] rounded-lg text-zinc-400"><HiUserGroup className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-zinc-500 font-medium">Employees</p>
                            <p className="text-sm font-medium text-white">{company.employeeCount || "N/A"} members</p>
                        </div>
                    </div>
                </div>

                {/* Extended Details Content Block */}
                <div className="space-y-3">
                    <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
                        <HiInformationCircle className="w-5 h-5 text-zinc-400" /> Company Description
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-[#1c1c1e]/50 border border-[#2d2d30]/40 p-4 rounded-xl">
                        {company.description || "No description provided yet."}
                    </p>
                </div>
            </div>
        );
    }

    // --- STATE 3: FORM WORKFLOW ---
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 md:p-8 bg-[#161618] border border-[#262626] rounded-2xl">
            <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-8">
                {/* SECTION 1: BUSINESS OVERVIEW */}
                <div className="space-y-5">
                    <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
                        <HiOutlineBuildingOffice className="w-5 h-5 text-zinc-400" />
                        {viewMode === "register" ? "Register Your Company" : "Update Company Details"}
                    </h3>

                    {/* Logo Upload */}
                    <div className="flex items-center gap-5 p-4 bg-[#1c1c1e] border border-[#2d2d30] rounded-xl">
                        <div className="w-20 h-20 bg-[#161618] border border-[#262626] rounded-xl overflow-hidden flex items-center justify-center relative group p-2">
                            {company?.logo ? (
                                <img src={company.logo} alt="Preview Logo" className="w-full h-full object-contain rounded-lg" />
                            ) : (
                                <HiOutlineBuildingOffice className="w-8 h-8 text-zinc-600" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Company Logo</label>
                            <label className="relative flex items-center gap-2 bg-[#262626] border border-[#3a3a3e] hover:border-zinc-400 text-white rounded-lg px-4 py-2 text-xs font-medium cursor-pointer transition-all">
                                <HiCloudArrowUp className="w-4 h-4 text-zinc-300" />
                                {uploadingLogo ? "Uploading to Imgbb..." : "Upload New Image"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="sr-only"
                                    disabled={uploadingLogo}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Company Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Company Name <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                name="name"
                                defaultValue={company?.name || ""}
                                placeholder="e.g. Acme Corp"
                                className="w-full bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus:border-white rounded-xl p-3 outline-none text-white text-sm transition-all"
                            />
                        </div>

                        {/* Website URL */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Website URL <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiGlobeAlt className="text-zinc-500 w-5 h-5 mr-2" />
                                <input
                                    required
                                    type="url"
                                    name="websiteUrl"
                                    defaultValue={company?.websiteUrl || ""}
                                    placeholder="https://example.com"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Industry */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Industry <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <FiTrendingUp className="text-zinc-500 w-4 h-4 mr-2" />
                                <input
                                    required
                                    type="text"
                                    name="industry"
                                    defaultValue={company?.industry || ""}
                                    placeholder="e.g. Technology"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Location <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiMapPin className="text-zinc-500 w-5 h-5 mr-2" />
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    defaultValue={company?.location || ""}
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                />
                            </div>
                        </div>

                        {/* Employee Scale Options */}
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-400 font-medium text-sm">Employee Count <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl px-3 transition-all">
                                <HiUserGroup className="text-zinc-500 w-5 h-5 mr-2" />
                                <select
                                    required
                                    name="employeeCount"
                                    defaultValue={company?.employeeCount || ""}
                                    className="w-full bg-transparent py-3 outline-none text-white text-sm appearance-none cursor-pointer [color-scheme:dark]"
                                >
                                    <option value="" disabled hidden>Select headcount range</option>
                                    <option value="1-10" className="bg-[#1c1c1e] text-white">1-10 employees</option>
                                    <option value="11-50" className="bg-[#1c1c1e] text-white">11-50 employees</option>
                                    <option value="51-200" className="bg-[#1c1c1e] text-white">51-200 employees</option>
                                    <option value="201-500" className="bg-[#1c1c1e] text-white">201-500 employees</option>
                                    <option value="500+" className="bg-[#1c1c1e] text-white">500+ employees</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: EXTENDED DETAILS */}
                <div className="space-y-5">
                    <h3 className="text-base font-medium text-[#f4f4f5] flex items-center gap-2 border-b border-[#262626] pb-2">
                        <HiDocumentText className="w-5 h-5 text-zinc-400" /> Business Narrative
                    </h3>

                    {/* Description Area */}
                    <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 font-medium text-sm">Company Description <span className="text-red-500">*</span></label>
                        <div className="relative flex items-start bg-[#1c1c1e] border border-[#2d2d30] hover:border-[#3f3f43] focus-within:border-white rounded-xl p-3 transition-all">
                            <HiInformationCircle className="text-zinc-500 w-5 h-5 mt-0.5 mr-2" />
                            <textarea
                                required
                                name="description"
                                rows={4}
                                defaultValue={company?.description || ""}
                                placeholder="Describe your workspace mission, cultural values, and core products..."
                                className="w-full bg-transparent text-white outline-none resize-y placeholder:text-zinc-600 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Controls Section */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
                    <Button
                        type="button"
                        onClick={() => setViewMode("view")}
                        className="border border-[#2d2d30] hover:bg-[#1c1c1e] text-white font-medium px-5 rounded-lg text-sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={uploadingLogo}
                        className="bg-white text-black hover:bg-[#e4e4e7] disabled:opacity-50 font-semibold px-5 rounded-lg text-sm"
                    >
                        Save Profile
                    </Button>
                </div>

            </Form>
        </div>
    );
}