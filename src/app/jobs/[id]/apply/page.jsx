
// import { getJobById } from '@/lib/api/jobs';
// import { getUserSession } from '@/lib/core/session';
// import { redirect } from 'next/navigation';
// import React from 'react';
// import JobApply from './JobApply';
// import { getApplicationsByApplicant } from '@/lib/api/applications';
// import Link from 'next/link';
// // import { Link } from '@heroui/react';

// const ApplyPage = async ({ params }) => {
//     const { id } = await params;

//     const user = await getUserSession();
//     console.log(user)

//     if (!user) {
//         redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
//     }
//     if (user.role !== "seeker") {
//         return (
//             <div className='flex flex-col items-center justify-center min-h-screen'>
//                 <h2 className='text-2xl font-semibold text-red-500'>Access Denied</h2>
//                 <p className='text-gray-600 mt-2'>Only job seekers can apply for jobs. Please sign in with a seeker account.</p>
//             </div>
//         )
//     }

//     const applications = await getApplicationsByApplicant(user.id);
//     const plan = {
//         name: 'Free',
//         maxApplicationsPerMonth: 3
//     }

//     const job = await getJobById(id);
//     return (
//         <div className='max-w-3xl mx-auto p-4'>
//             <h2>You have applied so far {applications.length} out of {plan.maxApplicationsPerMonth} this month</h2>
//             <p>Purchase plan to apply for more positions. <Link href='/plans'>Plans</Link> </p>
//             {
//                 applications.length < plan.maxApplicationsPerMonth && (
//                     <JobApply applicant={user} job={job}> </JobApply>
//                 )}
//         </div>
//     );
// };

// export default ApplyPage;



import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaLock, FaExclamationTriangle, FaCrown, FaInfoCircle } from 'react-icons/fa';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    // ১. অ্যাক্সেস ডিনাইড বা এরর স্টেট স্টাইলিং
    if (user.role !== "seeker") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-full text-red-500 mb-4 animate-bounce">
                    <FaLock size={32} />
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Access Denied
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-md">
                    Only job seekers can apply for positions. Please switch or sign in with a candidate account.
                </p>
                <Link href="/jobs">
                    <Button color="primary" className="mt-6 font-medium">
                        Back to Jobs
                    </Button>
                </Link>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user.id);
    const plan = {
        name: 'Free',
        maxApplicationsPerMonth: 3
    };

    const job = await getJobById(id);

    // অ্যাপ্লিকেশন লিমিটের হিসাব ও পারসেন্টেজ ক্যালকুলেশন
    const currentCount = applications?.length || 0;
    const maxCount = plan.maxApplicationsPerMonth;
    const isLimitReached = currentCount >= maxCount;
    const usagePercentage = Math.min((currentCount / maxCount) * 100, 100);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6">

            {/* ২. অ্যাপ্লিকেশন ট্র্যাকিং ও লিমিট কার্ড */}
            <div className="mb-8 p-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FaInfoCircle className="text-blue-500" /> Usage Dashboard
                        </h3>
                        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mt-1">
                            Applied <span className="text-blue-600 dark:text-blue-400 font-extrabold">{currentCount}</span> out of <span className="font-semibold">{maxCount}</span> this month
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Current Tier: <span className="font-medium text-zinc-600 dark:text-zinc-300">{plan.name} Plan</span>
                        </p>
                    </div>

                    {/* আপগ্রেড CTA বাটন */}
                    <Link href="/plans">
                        <Button
                            color="warning"
                            variant="flat"
                            className="font-semibold self-start sm:self-center"
                            startContent={<FaCrown />}
                        >
                            Upgrade Plan
                        </Button>
                    </Link>
                </div>

                {/* ডাইনামিক প্রোগ্রেস বার */}
                <div className="mt-5">
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 rounded-full ${isLimitReached ? 'bg-red-500' : usagePercentage > 75 ? 'bg-amber-500' : 'bg-blue-600'
                                }`}
                            style={{ width: `${usagePercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* ৩. কন্ডিশনাল রেন্ডারিং এরিয়া */}
            {isLimitReached ? (
                // লিমিট শেষ হয়ে গেলে ওয়ার্নিং স্টেট
                <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-4">
                    <div className="text-red-500 mt-0.5 shrink-0">
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-red-800 dark:text-red-400">Monthly Limit Reached!</h4>
                        <p className="text-sm text-red-700 dark:text-red-500/90 mt-1">
                            You have reached the maximum number of applications allowed on your current plan. Please upgrade your premium plan to apply for more positions instantly.
                        </p>
                        <Link href="/plans">
                            <Button
                                color="danger"
                                size="sm"
                                className="mt-3 font-semibold"
                            >
                                View Premium Plans
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                // লিমিট খালি থাকলে ফর্ম লোড হবে
                <div className="bg-white dark:bg-transparent rounded-xl">
                    <JobApply applicant={user} job={job} />
                </div>
            )}
        </div>
    );
};

export default ApplyPage;