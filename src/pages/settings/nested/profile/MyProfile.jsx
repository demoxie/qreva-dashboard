import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Copy } from "lucide-react";

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1E1E1E]">My Profile</h1>
                <p className="text-[#808C91] mt-1">View all the full information about your profile</p>
            </div>

            {/* User Info Card */}
            <Card className="mb-8 bg-[#F8FAFC]/50 border-[#E8EBED]">
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#D1F1F5] flex items-center justify-center text-[#0FB5C9] text-xl font-bold">
                            RR
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-xl font-bold text-[#1E1E1E]">Rejoice Regina Rose</h2>
                                <span className="bg-[#E0F7FA] text-[#0FB5C9] text-xs px-2 py-0.5 rounded border border-[#0FB5C9]/20">
                                    Tier 3
                                </span>
                            </div>
                            <p className="text-[#808C91]">emailaddress@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="bg-[#F0F0F0] text-[#505C61] text-xs px-3 py-1 rounded-full border border-[#E8EBED]">
                            Personal Account
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#808C91]">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <div className="border-b border-[#E8EBED] mb-8">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'profile'
                                ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                                : 'text-[#808C91] hover:text-[#505C61]'
                            }`}
                    >
                        Profile Details
                    </button>
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'wallet'
                                ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                                : 'text-[#808C91] hover:text-[#505C61]'
                            }`}
                    >
                        Wallet Details
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <Card>
                <CardContent className="p-6 md:p-8">
                    {activeTab === 'profile' ? (
                        <div className="space-y-8">
                            {/* Personal Details */}
                            <section>
                                <h3 className="font-bold text-[#1E1E1E] mb-6">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">First Name</label>
                                        <p className="font-medium text-[#1E1E1E]">Rejoice</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">Middle Name</label>
                                        <p className="font-medium text-[#1E1E1E]">Regina</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">Last Name</label>
                                        <p className="font-medium text-[#1E1E1E]">Rose</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">Email Address</label>
                                        <p className="font-medium text-[#1E1E1E]">example@gmail.com</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">Mobile Number</label>
                                        <p className="font-medium text-[#1E1E1E]">08012345678</p>
                                    </div>
                                </div>
                            </section>

                            {/* Tier 1 */}
                            <section className="pt-6 border-t border-[#E8EBED]">
                                <h3 className="font-bold text-[#1E1E1E] mb-6">Tier 1 Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">Valid ID</label>
                                        <p className="font-medium text-[#1E1E1E]">BVN</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">BVN Number</label>
                                        <p className="font-medium text-[#1E1E1E]">2013****90</p>
                                    </div>
                                </div>
                            </section>

                            {/* Tier 2 */}
                            <section className="pt-6 border-t border-[#E8EBED]">
                                <h3 className="font-bold text-[#1E1E1E] mb-6">Tier 2 Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">Valid ID</label>
                                        <p className="font-medium text-[#1E1E1E]">NIN</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#808C91] block mb-1">NIN Number</label>
                                        <p className="font-medium text-[#1E1E1E]">2013****90</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="text-xs text-[#808C91] block mb-2">Uploaded Photo</label>
                                    <div className="bg-[#F8FAFC] border border-[#E8EBED] rounded-lg p-2 max-w-sm">
                                        <div className="aspect-3/2  bg-[#E2E8F0] rounded flex items-center justify-center text-[#94A3B8] text-sm">
                                            [ID Card Image Placeholder]
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="font-bold text-[#1E1E1E] mb-6">Wallet Details</h3>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* QR Code */}
                                <div className="border border-[#E8EBED] rounded-lg p-4">
                                    <div className="w-48 h-48 bg-[#1E1E1E] rounded flex items-center justify-center text-white">
                                        [QR Code]
                                    </div>
                                </div>

                                <div className="flex-1 w-full max-w-xl space-y-4">
                                    <div className="bg-[#F8FAFC] p-4 rounded-lg flex justify-between items-center border border-[#E8EBED]">
                                        <div>
                                            <label className="text-xs text-[#808C91] block mb-1">Account Name</label>
                                            <p className="font-semibold text-[#1E1E1E]">Rejoice Regina Rose</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#F8FAFC] p-4 rounded-lg flex justify-between items-center border border-[#E8EBED]">
                                        <div>
                                            <label className="text-xs text-[#808C91] block mb-1">Account Number</label>
                                            <p className="font-semibold text-[#1E1E1E]">0123456789</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#FF5B04]">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="bg-[#F8FAFC] p-4 rounded-lg flex justify-between items-center border border-[#E8EBED]">
                                        <div>
                                            <label className="text-xs text-[#808C91] block mb-1">Bank Name</label>
                                            <p className="font-semibold text-[#1E1E1E]">Safe Haven</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MyProfile;
