"use client";

import React, { useState, useMemo } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";

export default function JobListingContainer({ initialJobs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  // Compute matched filter rows instantly
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "all" || job.jobType === selectedType;
      const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory;
      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [searchQuery, selectedType, selectedCategory, isRemoteOnly, initialJobs]);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {filteredJobs.length} position{filteredJobs.length !== 1 && "s"}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredJobs.map((jobItem) => (
            <JobCard 
              key={jobItem._id?.$oid || jobItem._id} 
              job={jobItem} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">No positions match your search criteria.</p>
        </div>
      )}
    </>
  );
}