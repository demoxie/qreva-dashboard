import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import RoleForm from './RoleForm';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';
import { ROLES_DATA } from './constants';

const EditRole = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);

    const role = ROLES_DATA.find(r => String(r.id) === String(id)) || ROLES_DATA[0];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Edit Details</h1>
                    <p className="text-[#808C91] mt-1">Kindly edit the info about this permission</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                    onClick={() => setShowSuccess(true)}
                >
                    Save Changes
                </Button>
            </div>

            <RoleForm initialData={role} />

            <ActionSuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    navigate('/settings/rbac');
                }}
                title="Role Permission Edited"
                message="You have successfully edited this role permission for your platform"
                buttonText="Dismiss"
            />
        </div>
    );
};

export default EditRole;
