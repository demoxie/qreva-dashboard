import React, { useState } from 'react';
import BaseModal from "@/components/modals/BaseModal";
import { Button } from "@/components/ui/button";

const TierViewDetailsModal = ({ isOpen, tier, onClose }) => {
    const [activeTab, setActiveTab] = useState('personal');

    if (!tier) return null;

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="View Details" maxWidth="max-w-lg" hasCloseButton={true}>
            <p className="text-sm text-[#808C91] mb-6 -mt-2">Here is the full detail about this tier</p>

            {/* Tabs */}
            <div className="border-b border-[#E8EBED] mb-6">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'personal'
                            ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                            : 'text-[#808C91] hover:text-[#505C61]'
                            }`}
                    >
                        Personal Account
                    </button>
                    <button
                        onClick={() => setActiveTab('agent')}
                        className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'agent'
                            ? 'text-[#FF5B04] border-b-2 border-[#FF5B04]'
                            : 'text-[#808C91] hover:text-[#505C61]'
                            }`}
                    >
                        Agent Account
                    </button>
                </div>
            </div>

            {/* Tier Details Card */}
            <div className="bg-[#F7FAFA] rounded-xl p-5 mb-6 relative overflow-hidden">
                {/* Background watermark */}
                <div className="absolute right-4 bottom-4 opacity-10">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="40" stroke="#FF5B04" strokeWidth="8" fill="none" />
                    </svg>
                </div>

                <h4 className="font-semibold text-[#1E1E1E] mb-4">{tier.name}</h4>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-[#808C91] mb-1">Daily Transaction Limit</p>
                        <p className="text-lg font-bold text-[#1E1E1E]">₦{tier.dailyLimit}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#808C91] mb-1">Single Transaction Limit</p>
                        <p className="text-lg font-bold text-[#1E1E1E]">₦{tier.singleLimit}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-[#808C91] mb-1">Balance Limit</p>
                    <p className="text-lg font-bold text-[#1E1E1E]">₦{tier.balanceLimit}</p>
                </div>

                <div>
                    <p className="text-xs text-[#808C91] mb-2">Requirements</p>
                    <ul className="space-y-1">
                        {tier.requirements.split(',').map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-[#1E1E1E]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B04] inline-block shrink-0" />
                                {req.trim()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Button
                onClick={onClose}
                className="w-full py-3 h-12 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03] transition-colors"
            >
                Dismiss
            </Button>
        </BaseModal>
    );
};

export default TierViewDetailsModal;
