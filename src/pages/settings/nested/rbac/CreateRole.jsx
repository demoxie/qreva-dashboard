import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { PERMISSIONS_CATEGORIES } from './constants';

const CreateRole = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-5 w-5 text-[#808C91]" />
                        </Button>
                        <nav className="flex items-center text-sm text-[#808C91]">
                            <span>Settings</span>
                            <span className="mx-2">/</span>
                            <span>RBAC (Role Based Permissions)</span>
                            <span className="mx-2">/</span>
                            <span className="text-[#FF5B04]">Create New Category</span>
                        </nav>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Create New Role</h1>
                    <p className="text-[#808C91] mt-1">Kindly input the info about this new role</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                >
                    Create Role
                </Button>
            </div>

            {/* Basic Details */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <h3 className="font-bold text-[#1E1E1E] mb-6">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs text-[#808C91] mb-2 hidden">Role Name</label>
                            <input
                                type="text"
                                placeholder="Role Name"
                                className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                            />
                            <p className="text-xs font-semibold mt-1 ml-1 text-[#1E1E1E]">Internal Staff</p>
                        </div>
                        <div>
                            <label className="text-xs text-[#808C91] mb-2 hidden">Description</label>
                            <input
                                type="text"
                                placeholder="Description (Optional)"
                                className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-bold text-[#1E1E1E] mb-6">Permissions</h3>
                    <div className="space-y-8">
                        {PERMISSIONS_CATEGORIES.map((category, idx) => (
                            <div key={idx} className="border-b border-[#F0F0F0] last:border-0 pb-6 last:pb-0">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                    <div className="font-medium text-sm text-[#1E1E1E]">
                                        {category.title}
                                    </div>
                                    <div className="col-span-3 flex flex-wrap gap-8">
                                        {category.items.map((item, itemIdx) => (
                                            <div key={itemIdx} className="flex items-center gap-3">
                                                <Switch />
                                                <span className="text-xs text-[#505C61]">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateRole;
