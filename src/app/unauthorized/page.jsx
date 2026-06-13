'use client'
import React from 'react';
import { FiLock, FiArrowLeft, FiHome } from 'react-icons/fi';

export default function UnauthorizedPage() {
    // Simple handler to take the user back to the previous page
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6">

                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-2 border border-red-500/20 animate-pulse">
                    <FiLock size={40} />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        401: Unauthorized
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg">
                        Hold up, boss! You don't have permission to access this page. Please check your credentials or log into the correct account.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 bg-transparent text-gray-200 hover:bg-gray-900 transition-colors duration-200 font-medium text-sm"
                    >
                        <FiArrowLeft size={16} />
                        Go Back
                    </button>

                    <a
                        href="/dashboard/seeker"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors duration-200 font-medium text-sm shadow-sm"
                    >
                        <FiHome size={16} />
                        Back to Dashboard
                    </a>
                </div>

            </div>
        </div>
    );
}