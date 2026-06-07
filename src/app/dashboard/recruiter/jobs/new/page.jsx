import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async () => {
    const company = await getLoggedInRecruiterCompany();
    return (
        <div>
            <PostJobForm company={company}></PostJobForm>
        </div>
    );
};

export default PostJobPage;