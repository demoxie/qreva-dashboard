import React, { useState } from 'react';
import { LogOut } from "lucide-react";
import SettingsCard from '@/components/settings/SettingsCard';
import ChangePinModal from '@/components/settings/ChangePinModal';
import OtpModal from '@/components/settings/OtpModal';
import { Button } from '@/components/ui/button';
import { settingsData } from './data';
import { SETTINGS_VISUALS } from './constants';
import { useNavigate } from 'react-router-dom';


const Settings = () => {
    const navigate = useNavigate();
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

    // Map IDs to specific actions
    const handleItemClick = (id) => {
        switch (id) {
            case 'profile':
                navigate('/settings/profile');
                break;
            case 'password':
                console.log("Navigate to Change Password");
                break;
            case 'pin':
                setIsPinModalOpen(true);
                break;
            case 'tier':
                navigate('/settings/tier');
                break;
            case 'agency':
                navigate('/settings/agent-category');
                break;
            case 'rbac':
                navigate('/settings/rbac');
                break;
            case 'commission':
                console.log("Navigate to Commission Management");
                break;
            case 'logs':
                navigate('/settings/activity-logs');
                break;
            default:
                break;
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Settings</h1>
                    <p className="text-[#808C91] mt-1">View and edit all your system settings</p>
                </div>

                <Button
                    variant="outline"
                    className="bg-[#FFF5F2] border-[#FFE6DE] text-[#FF5B04] hover:bg-[#FFE6DE] gap-2 w-full md:w-auto"
                >
                    Log Out
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsData.map((item) => {
                    const visual = SETTINGS_VISUALS[item.id];
                    return (
                        <SettingsCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            icon={visual.icon}
                            iconColor={visual.color}
                            iconBgColor={visual.bgColor}
                            onClick={() => handleItemClick(item.id)}
                        />
                    );
                })}
            </div>

            {/* Modals */}
            <ChangePinModal
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
            />

            <OtpModal
                isOpen={isOtpModalOpen}
                onClose={() => setIsOtpModalOpen(false)}
            />
        </div>
    );
};

export default Settings;
