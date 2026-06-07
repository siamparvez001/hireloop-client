"use client";
import React from 'react';
import { useSession } from '@/lib/auth-client';
import { FiFileText, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";

import DashboardStats from '@/components/dashboard/DashboardStats';
const RecruiterDashboardHomePage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="flex items-center justify-center h-full">Loading...</div>
    }

    
    const recruiterStats = [
        { id: 1, title: "Total Job Posts", value: "48", icon: FiFileText },
        { id: 2, title: "Total Applicants", value: "1,284", icon: FiUsers },
        { id: 3, title: "Active Jobs", value: "18", icon: FiZap },
        { id: 4, title: "Jobs Closed", value: "32", icon: FiCheckCircle },
    ];

    const user = session?.user;
    console.log(session);

    return (
        <div>
            <h2 className='text-4xl font-semibold'>Welcome back, {user?.name}!</h2>
            <DashboardStats statsData={recruiterStats}></DashboardStats>
        </div>

    );
};

export default RecruiterDashboardHomePage;