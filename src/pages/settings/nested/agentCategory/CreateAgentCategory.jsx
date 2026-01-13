import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Check, CheckCircle2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';

const CreateAgentCategory = () => {
    const navigate = useNavigate();
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    // Form State
    const [userAccount, setUserAccount] = useState('Personal Account');
    const [commissionType, setCommissionType] = useState('Percentage Commission');
    const [appliesTo, setAppliesTo] = useState({
        allAgents: false,
        aggregators: false,
        aggregatorManager: false
    });

    const handleCreate = () => {
        // Logic would go here
        setSuccessModalOpen(true);
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
                            <span>Agent Category</span>
                            <span className="mx-2">/</span>
                            <span className="text-[#FF5B04]">Create New Category</span>
                        </nav>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Create New Category</h1>
                    <p className="text-[#808C91] mt-1">Kindly Input the info about this new category</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                    onClick={handleCreate}
                >
                    Create Category
                </Button>
            </div>

            <div className="space-y-6">
                {/* User Account */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#1E1E1E] mb-6">User Account</h3>
                        <div className="flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userAccount === 'Personal Account' ? 'border-[#FF5B04]' : 'border-gray-300'}`}>
                                    {userAccount === 'Personal Account' && <div className="w-3 h-3 rounded-full bg-[#FF5B04]" />}
                                </div>
                                <input type="radio" name="account" className="hidden" checked={userAccount === 'Personal Account'} onChange={() => setUserAccount('Personal Account')} />
                                <span className="text-sm font-medium text-[#1E1E1E]">Personal Account</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userAccount === 'Agents/Merchants' ? 'border-[#FF5B04]' : 'border-gray-300'}`}>
                                    {userAccount === 'Agents/Merchants' && <div className="w-3 h-3 rounded-full bg-[#FF5B04]" />}
                                </div>
                                <input type="radio" name="account" className="hidden" checked={userAccount === 'Agents/Merchants'} onChange={() => setUserAccount('Agents/Merchants')} />
                                <span className="text-sm font-medium text-[#1E1E1E]">Agents/Merchants</span>
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Basic Details */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#1E1E1E] mb-6">Basic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                                />
                                <p className="text-xs font-semibold mt-1 ml-1 text-[#1E1E1E]">Gold</p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Description (Optional)"
                                    className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#1E1E1E] mb-6">Requirements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Monthly Transaction Volume (N)"
                                    className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                                />
                                <p className="text-xs font-semibold mt-1 ml-1 text-[#1E1E1E]">10,000,000</p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Daily Transaction Counts"
                                    className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5B04]"
                                />
                                <p className="text-xs font-semibold mt-1 ml-1 text-[#1E1E1E]">20</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Commission Split */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-[#1E1E1E]">Set Commission Split</h3>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${commissionType === 'Flat Commission' ? 'border-[#FF5B04]' : 'border-gray-300'}`}>
                                        {commissionType === 'Flat Commission' && <div className="w-3 h-3 rounded-full bg-[#FF5B04]" />}
                                    </div>
                                    <input type="radio" name="commission" className="hidden" checked={commissionType === 'Flat Commission'} onChange={() => setCommissionType('Flat Commission')} />
                                    <span className="text-xs font-medium text-[#1E1E1E]">Flat Commission</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${commissionType === 'Percentage Commission' ? 'border-[#FF5B04]' : 'border-gray-300'}`}>
                                        {commissionType === 'Percentage Commission' && <div className="w-3 h-3 rounded-full bg-[#FF5B04]" />}
                                    </div>
                                    <input type="radio" name="commission" className="hidden" checked={commissionType === 'Percentage Commission'} onChange={() => setCommissionType('Percentage Commission')} />
                                    <span className="text-xs font-medium text-[#1E1E1E]">Percentage Commission</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#F8FAFC] p-4 rounded-lg">
                                <div className="md:col-span-1">
                                    <Switch checked={true} />
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-xs text-[#808C91] mb-1">User Account</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">Agent</p>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-xs text-[#808C91] mb-1">Commission</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">0.6%</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#F8FAFC] p-4 rounded-lg">
                                <div className="md:col-span-1">
                                    <Switch checked={true} />
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-xs text-[#808C91] mb-1">User Account</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">Aggregators</p>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-xs text-[#808C91] mb-1">Commission</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">10%</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#F8FAFC] p-4 rounded-lg">
                                <div className="md:col-span-1">
                                    <Switch checked={true} />
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-xs text-[#808C91] mb-1">User Account</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">Aggregator Manager</p>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-xs text-[#808C91] mb-1">Commission</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">10%</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#F8FAFC] p-4 rounded-lg">
                                <div className="md:col-span-1">
                                    <Switch checked={true} />
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-xs text-[#808C91] mb-1">User Account</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">Admin</p>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-xs text-[#808C91] mb-1">Commission</p>
                                    <p className="font-medium text-sm text-[#1E1E1E]">10%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Applies To */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#1E1E1E] mb-6">Applies To</h3>
                        <div className="flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-5 h-5 rounded bg-[#22C55E] flex items-center justify-center`}>
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-[#1E1E1E]">All Agents</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-5 h-5 rounded bg-[#22C55E] flex items-center justify-center`}>
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-[#1E1E1E]">Aggregators</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-5 h-5 rounded bg-[#22C55E] flex items-center justify-center`}>
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-[#1E1E1E]">Aggregator Manager</span>
                            </label>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ActionSuccessModal
                isOpen={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                title="New Agent Category Created"
                message="You have successfully created a new agent category for your platform"
                buttonText="Dismiss"
            />

        </div>
    );
};

export default CreateAgentCategory;
