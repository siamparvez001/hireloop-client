import React from "react";
import StatsCard from "./StatsCard";

const DashboardStats = ({ statsData = [] }) => {
    if (!statsData.length) return null;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
            {statsData.map((item, index) => (
                <StatsCard
                    key={item.id || index}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                />
            ))}
        </div>
    );
};

export default DashboardStats;