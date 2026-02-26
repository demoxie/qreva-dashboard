import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { REQUIRED_DOCUMENTS } from './constants';
import ActionSuccessModal from "@/components/modals/ActionSuccessModal";

const LimitInput = ({ labelStart, labelEnd, title }) => (
    <div className="p-4 border border-[#E8EBED] rounded-lg">
        <div className="flex items-center gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-[10px] text-[#808C91] font-bold">N</span>
                    <span className="text-2xl text-[#E2E8F0] font-bold">0</span>
                </div>
                <label className="text-xs text-[#808C91]">{labelStart}</label>
            </div>

            <div className="text-[#808C91]">→</div>

            <div className="flex-1 border-l border-[#E8EBED] pl-4">
                <div className="flex items-center gap-1 mb-2 relative">
                    <span className="text-[10px] text-[#1E1E1E] font-bold">N</span>
                    <input
                        type="text"
                        placeholder="100"
                        className="w-full text-2xl font-bold text-[#1E1E1E] placeholder:text-[#E2E8F0] focus:outline-none"
                    />
                    <div className="absolute right-0 top-1 w-px h-6 bg-[#0FB5C9] animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-xs text-[#808C91]">{labelEnd}</label>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-[#FF5B04] focus:ring-[#FF5B04]" />
                        <span className="text-xs text-[#808C91]">Unlimited</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CreateTier = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCreate = () => {
        setShowSuccess(true);
    };

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
                            <span>Tier Management</span>
                            <span className="mx-2">/</span>
                            <span className="text-[#FF5B04]">Create New Tier</span>
                        </nav>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Create New Tier</h1>
                    <p className="text-[#808C91] mt-1">Kindly input the info about this new tier</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                    onClick={handleCreate}
                >
                    Create Tier
                </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E8EBED] mb-8">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'personal'
                            ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                            : 'text-[#808C91] hover:text-[#505C61]'
                            }`}
                    >
                        Personal Account
                    </button>
                    <button
                        onClick={() => setActiveTab('agent')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'agent'
                            ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                            : 'text-[#808C91] hover:text-[#505C61]'
                            }`}
                    >
                        Agent Account
                    </button>
                </div>
            </div>

            {/* General Information */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <h3 className="font-bold text-[#1E1E1E] mb-6">General Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Tier Name"
                                className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                            />
                            <p className="text-xs font-semibold mt-1 ml-1 text-[#1E1E1E]">Tier 3</p>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Tier Description (Optional)"
                                className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <h3 className="font-bold text-[#1E1E1E] mb-6">Required Documents</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {REQUIRED_DOCUMENTS.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2">
                                <input type="checkbox" id={doc.id} className="rounded border-gray-300 text-[#FF5B04] focus:ring-[#FF5B04]" />
                                <label htmlFor={doc.id} className="text-xs text-[#1E1E1E] cursor-pointer">{doc.label}</label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Transaction Limit */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-bold text-[#1E1E1E] mb-6">Transaction Limit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LimitInput
                            title="Daily Limit"
                            labelStart="Daily Limit Start"
                            labelEnd="Daily Limit End"
                        />
                        <LimitInput
                            title="Single Transaction"
                            labelStart="Single Transaction Start"
                            labelEnd="Single Transaction End"
                        />
                        <LimitInput
                            title="Wallet Balance"
                            labelStart="Wallet Balance Start"
                            labelEnd="Wallet Balance End"
                        />
                    </div>
                </CardContent>
            </Card>

            <ActionSuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    navigate('/settings/tier');
                }}
                title="Tier Created Successfully"
                message="You have successfully created a new tier level"
                buttonText="Back to Tier Management"
            />
        </div>
    );
};

export default CreateTier;
