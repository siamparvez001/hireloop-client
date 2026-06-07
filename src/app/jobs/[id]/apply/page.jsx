
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    
    const user = await getUserSession();

    if(!user){
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }
    if(user.role !== "seeker"){
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h2 className='text-2xl font-semibold text-red-500'>Access Denied</h2>
                <p className='text-gray-600 mt-2'>Only job seekers can apply for jobs. Please sign in with a seeker account.</p>
            </div>
        )
    }
    return (
        <div>
            <h2>Apply for Job</h2>
        </div>
    );
};

export default ApplyPage;