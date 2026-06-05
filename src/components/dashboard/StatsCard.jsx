import React from "react";
import { Card } from "@heroui/react";

export default function StatsCard({ title, value, icon: Icon }) {
    return (
        <Card className="bg-[#18181b] border border-neutral-800 text-white w-full">
            <Card.Content className="p-6 flex flex-col gap-4 justify-between min-h-[160px]">
                {/* Icon Container */}
                {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400">
                        <Icon size={20} />
                    </div>
                )}

                {/* Text and Stats Details */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-neutral-400">{title}</p>
                    <h3 className="text-3xl font-bold tracking-tight text-neutral-100">
                        {value}
                    </h3>
                </div>
            </Card.Content>
        </Card>
    );
}