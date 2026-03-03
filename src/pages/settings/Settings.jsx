import React, { useState } from 'react';
import { LogOut } from "lucide-react";
import SettingsCard from '@/components/settings/SettingsCard';
import ChangePinModal from '@/components/settings/ChangePinModal';
import OtpModal from '@/components/settings/OtpModal';
import ChangePasswordModal from '@/components/settings/ChangePasswordModal';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';
import LogoutConfirmationModal from '@/components/modals/LogoutConfirmationModal';
import { Button } from '@/components/ui/button';
import { settingsData } from './data';
import { SETTINGS_VISUALS } from './constants';
import { useNavigate } from 'react-router-dom';


const Settings = () => {
    const navigate = useNavigate();
    
    // Change Password Flow States
    const [isPasswordOtpOpen, setIsPasswordOtpOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isPasswordSuccessOpen, setIsPasswordSuccessOpen] = useState(false);

    // Change PIN Flow States
    const [isPinOtpOpen, setIsPinOtpOpen] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [isPinSuccessOpen, setIsPinSuccessOpen] = useState(false);

    // Logout Modal State
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Map IDs to specific actions
    const handleItemClick = (id) => {
        switch (id) {
            case 'profile':
                navigate('/settings/profile');
                break;
            case 'password':
                setIsPasswordOtpOpen(true);
                break;
            case 'pin':
                setIsPinOtpOpen(true);
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
                navigate('/settings/commission-management');
                break;
            case 'logs':
                navigate('/settings/activity-logs');
                break;
            default:
                break;
        }
    };

    // Password Flow Handlers
    const handlePasswordOtpSubmit = (otp) => {
        // Here you would typically verify the OTP with the backend
        setIsPasswordOtpOpen(false);
        setIsChangePasswordOpen(true);
    };

    const handleChangePasswordSubmit = (passwords) => {
        // Here you would typically submit the new password to the backend
        setIsChangePasswordOpen(false);
        setIsPasswordSuccessOpen(true);
    };

    // PIN Flow Handlers
    const handlePinOtpSubmit = (otp) => {
        // Verification with backend here
        setIsPinOtpOpen(false);
        setIsPinModalOpen(true);
    };

    const handleChangePinSubmit = (newPin) => {
        // Submit new PIN to backend here
        setIsPinModalOpen(false);
        setIsPinSuccessOpen(true);
    };

    const handleLogoutConfirm = () => {
        setIsLogoutModalOpen(false);
        console.log("User logged out");
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
                    onClick={() => setIsLogoutModalOpen(true)}
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

            {/* Change Password Flow Modals */}
            <OtpModal
                isOpen={isPasswordOtpOpen}
                onClose={() => setIsPasswordOtpOpen(false)}
                onSubmit={handlePasswordOtpSubmit}
            />

            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
                onSubmit={handleChangePasswordSubmit}
            />

            <ActionSuccessModal
                isOpen={isPasswordSuccessOpen}
                onClose={() => setIsPasswordSuccessOpen(false)}
                title="Password Changed"
                message="You have successfully changed your password and can now use it to login subsequently"
            />

            {/* Change PIN Flow Modals */}
            <OtpModal
                isOpen={isPinOtpOpen}
                onClose={() => setIsPinOtpOpen(false)}
                onSubmit={handlePinOtpSubmit}
            />

            <ChangePinModal
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                onSubmit={handleChangePinSubmit}
            />

            <ActionSuccessModal
                isOpen={isPinSuccessOpen}
                onClose={() => setIsPinSuccessOpen(false)}
                title="PIN Changed"
                message="You have successfully changed your transaction PIN and can now use it continuously"
            />

            <LogoutConfirmationModal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
};

export default Settings;
