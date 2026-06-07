import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";

import { FiSearch, FiChevronDown } from "react-icons/fi";

export default function JobFilters({
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    isRemoteOnly,
    setIsRemoteOnly
}) {
    return (
        <div className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-[24px] border border-zinc-800/80 max-w-7xl mx-auto mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                {/* 1. Search Text Field - Span 5 columns */}
                <div className="md:col-span-5">
                    <TextField
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
                        className="w-full"
                    >
                        <span className="text-sm font-medium text-zinc-400 block mb-2">Search Jobs</span>
                        <InputGroup className="bg-zinc-800 border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all">
                            <InputGroup.Prefix className="pl-3 text-zinc-500">
                                <FiSearch className="w-4 h-4" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Title, company, or keywords..."
                                className="bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
                            />
                        </InputGroup>
                    </TextField>
                </div>

                {/* 2. Job Type Select Filter - Span 3 columns */}
                <div className="md:col-span-3">
                    <span className="text-sm font-medium text-zinc-400 block mb-2">Job Type</span>
                    <Select
                        selectedKey={selectedType}
                        onSelectionChange={(key) => setSelectedType(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
                            <Select.Value>{selectedType === "all" ? "All Types" : selectedType.replace("-", " ")}</Select.Value>
                            <Select.Indicator>
                                <FiChevronDown className="w-4 h-4 text-zinc-400" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
                            <ListBox className="p-1">
                                <ListBox.Item id="all" className="flex items-center justify-between text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>All Types</span>
                                </ListBox.Item>
                                <ListBox.Item id="full-time" className="flex items-center justify-between text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Full-time</span>
                                </ListBox.Item>
                                <ListBox.Item id="part-time" className="flex items-center justify-between text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Part-time</span>
                                </ListBox.Item>
                                <ListBox.Item id="contract" className="flex items-center justify-between text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Contract</span>
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 3. Category Select Filter - Span 3 columns */}
                <div className="md:col-span-3">
                    <span className="text-sm font-medium text-zinc-400 block mb-2">Category</span>
                    <Select
                        selectedKey={selectedCategory}
                        onSelectionChange={(key) => setSelectedCategory(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
                            <Select.Value>{selectedCategory === "all" ? "All Categories" : selectedCategory}</Select.Value>
                            <Select.Indicator>
                                <FiChevronDown className="w-4 h-4 text-zinc-400" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
                            <ListBox className="p-1">
                                <ListBox.Item id="all" className="text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>All Categories</span>
                                </ListBox.Item>
                                <ListBox.Item id="engineering" className="text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Engineering</span>
                                </ListBox.Item>
                                <ListBox.Item id="design" className="text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Design</span>
                                </ListBox.Item>
                                <ListBox.Item id="product" className="text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Product</span>
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 4. Remote Checkbox Filter - Span 1 column */}
                <div className="md:col-span-1 flex items-center justify-start md:justify-center h-10 pb-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={isRemoteOnly}
                            onChange={(e) => setIsRemoteOnly(e.target.checked)}
                            className="accent-purple-500 w-4 h-4 rounded bg-zinc-800 border-zinc-700 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-zinc-300 md:hidden lg:inline">Remote</span>
                    </label>
                </div>

            </div>
        </div>
    );
}