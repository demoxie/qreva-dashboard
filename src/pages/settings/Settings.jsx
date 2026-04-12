import React, { useState } from "react";
import { LogOut } from "lucide-react";
import SettingsCard from "@/components/settings/SettingsCard";
import ChangePinModal from "@/components/settings/ChangePinModal";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";
import ActionSuccessModal from "@/components/modals/ActionSuccessModal";
import LogoutConfirmationModal from "@/components/modals/LogoutConfirmationModal";
import { Button } from "@/components/ui/button";
import { settingsData } from "./data";
import { SETTINGS_VISUALS } from "./constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  useChangePassword,
  useLogout,
} from "@/store/features/auth/useAuth";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // API hooks
  const changePassword = useChangePassword();
  const logoutMutation = useLogout();

  // Change Password Flow States
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isPasswordSuccessOpen, setIsPasswordSuccessOpen] = useState(false);

  // Change PIN Flow States
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isPinSuccessOpen, setIsPinSuccessOpen] = useState(false);

  // Logout Modal State
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Map IDs to specific actions
  const handleItemClick = (id) => {
    switch (id) {
      case "profile":
        navigate("/settings/profile");
        break;
      case "password":
        setIsChangePasswordOpen(true);
        break;
      case "pin":
        setIsPinModalOpen(true);
        break;
      case "tier":
        navigate("/settings/tier");
        break;
      case "agency":
        navigate("/settings/agent-category");
        break;
      case "rbac":
        navigate("/settings/rbac");
        break;
      case "commission":
        navigate("/settings/commission-management");
        break;
      case "logs":
        navigate("/settings/activity-logs");
        break;
      default:
        break;
    }
  };

  const handleChangePasswordSubmit = (passwords) => {
    changePassword.mutate(passwords, {
      onSuccess: () => {
        setIsChangePasswordOpen(false);
        setIsPasswordSuccessOpen(true);
      },
    });
  };

  const handleChangePinSubmit = () => {
    setIsPinModalOpen(false);
    setIsPinSuccessOpen(true);
  };

  const handleLogoutConfirm = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        setIsLogoutModalOpen(false);
        logout();
      },
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">Settings</h1>
          <p className="text-[#808C91] mt-1">
            View and edit all your system settings
          </p>
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
