'use client'
import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError } from '@heroui/react';
import { FaLink, FaPaperPlane, FaUndo, FaFilePdf, FaGlobe } from 'react-icons/fa';
import { submitApplication } from '@/lib/actions/applications';

const JobApply = ({ job, applicant }) => {
    const [formData, setFormData] = useState({
        resumeLink: '',
        portfolioLink: '',
        additionalNotes: '',
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const submissionData = {
            jobId: job?._id,
            jobTitle: job?.jobTitle || 'Position',
            companyName: job?.companyName,
            applicantId: applicant?.id,
            applicationName: applicant?.name,
            applicationEmail: applicant?.email,
            ...formData
        };

        console.log('Submitting Application:', submissionData);
        const res = await submitApplication(submissionData);
        if(res.insertedId){
            alert("Application submited successfuly");
            setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' });
        }
        
    };

    const handleReset = () => {
        setFormData({
            resumeLink: '',
            portfolioLink: '',
            additionalNotes: '',
        });
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                    Apply for {job?.jobTitle || 'this position'}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                    Applying as: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{applicant?.name || 'Applicant'}</span> ({applicant?.email})
                </p>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

            {/* Hero UI Form */}
            <Form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Resume Link Field (Required) */}
                <TextField isRequired name="resumeLink" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <FaFilePdf className="text-danger" /> Resume Link
                    </Label>
                    <div className="relative mt-1">
                        <Input
                            type="url"
                            name="resumeLink" 
                            placeholder="https://drive.google.com/..."
                            value={formData.resumeLink}
                            onChange={handleChange} // 
                            className="w-full px-3 py-2 border rounded-lg bg-transparent border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <Description className="text-xs text-zinc-400 mt-1">
                        Please provide a public Google Drive, Dropbox, or Notion link to your resume.
                    </Description>
                    <FieldError className="text-xs text-danger mt-1">
                        Please enter a valid URL.
                    </FieldError>
                </TextField>

                {/* Portfolio Website Link Field (Optional) */}
                <TextField name="portfolioLink" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <FaGlobe className="text-success" /> Portfolio Website (Optional)
                    </Label>
                    <div className="relative mt-1">
                        <Input
                            type="url"
                            name="portfolioLink" 
                            placeholder="https://yourportfolio.com"
                            value={formData.portfolioLink}
                            onChange={handleChange} // 
                            className="w-full px-3 py-2 border rounded-lg bg-transparent border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <Description className="text-xs text-zinc-400 mt-1">
                        Link to your personal website, GitHub profile, or Behance/Dribbble showcase.
                    </Description>
                    <FieldError className="text-xs text-danger mt-1">
                        Please enter a valid URL.
                    </FieldError>
                </TextField>

                
                <TextField name="additionalNotes" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <FaLink className="text-primary" /> Additional Information (Optional)
                    </Label>
                    <div className="mt-1">
                        <textarea
                            rows={4}
                            name="additionalNotes" 
                            placeholder="Add a cover note or anything else you'd like to share..."
                            value={formData.additionalNotes}
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border rounded-lg bg-transparent border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                        />
                    </div>
                    <Description className="text-xs text-zinc-400 mt-1">
                        Any extra notes, cover letters, or context for the hiring team.
                    </Description>
                    <FieldError />
                </TextField>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-end gap-3 mt-4">
                    <Button
                        type="reset"
                        variant="light"
                        color="default"
                        onClick={handleReset}
                        startContent={<FaUndo size={14} />}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        className="font-semibold"
                        startContent={<FaPaperPlane size={14} />}
                    >
                        Submit Application
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApply;