import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen gap-6">
            <DashboardSidebar></DashboardSidebar>
            <div className="flex-1  bg-default p-6">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;