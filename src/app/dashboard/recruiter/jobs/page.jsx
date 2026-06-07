import { getCompanyJObs } from '@/lib/api/jobs';
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";

import { Eye, Edit2, Trash2 } from "lucide-react";
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const RecruiterJobs = async () => {
    const company = await getLoggedInRecruiterCompany();
    const jobs = await getCompanyJObs(company._id) || [];
    console.log(jobs);


    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'danger';
            default:
                return 'warning';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
                <p className="text-sm text-default-500">View, update, and manage your current job postings.</p>
            </div>

            <Table aria-label="Company jobs management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={200}>
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="typeCategory" minWidth={150}>
                                Type / Category
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="location" minWidth={120}>
                                Location
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={150}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No jobs found for this company."}>
                            {jobs.map((job) => (
                                <Table.Row key={job._id?.$oid || job._id}>
                                    {/* Job Title */}
                                    <Table.Cell>
                                        <div className="font-medium text-default-800">
                                            {job.jobTitle}
                                        </div>
                                    </Table.Cell>

                                    {/* Type / Category */}
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm capitalize font-medium">{job.jobType}</span>
                                            <span className="text-xs text-default-400 capitalize">{job.jobCategory}</span>
                                        </div>
                                    </Table.Cell>

                                    {/* Location */}
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">
                                            {job.isRemote ? "Remote" : job.location}
                                        </span>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <Chip
                                            color={getStatusColor(job.status)}
                                            size="sm"
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {job.status || "Unknown"}
                                        </Chip>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="Video Details">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label="View video details"
                                                >
                                                    <Eye className="text-default-400 w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Edit Job">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label="Edit job"
                                                >
                                                    <Edit2 className="text-default-400 w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Delete Job">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    aria-label="Delete job"
                                                >
                                                    <Trash2 className="text-danger w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;