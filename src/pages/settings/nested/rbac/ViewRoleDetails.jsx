import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import RoleForm from './RoleForm';
import { ROLES_DATA } from './constants';

const ViewRoleDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const role = ROLES_DATA.find(r => String(r.id) === String(id)) || ROLES_DATA[0];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">View Details</h1>
                    <p className="text-[#808C91] mt-1">Kindly view the info about this permission</p>
                </div>
                <Button
                    variant="outline"
                    className="border-[#FF5B04] text-[#FF5B04] hover:bg-[#FFF5F0]"
                    onClick={() => navigate(`/settings/rbac/edit/${role.id}`)}
                >
                    Edit Role
                </Button>
            </div>

            <RoleForm initialData={role} readOnly={true} />
        </div>
    );
};

export default ViewRoleDetails;
