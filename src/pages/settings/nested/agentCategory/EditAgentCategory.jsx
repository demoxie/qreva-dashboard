import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import AgentCategoryForm from './AgentCategoryForm';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';
import { AGENT_CATEGORIES_DATA } from './constants';

const EditAgentCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    // Find the category to edit
    const category = AGENT_CATEGORIES_DATA.find(c => String(c.id) === String(id)) || AGENT_CATEGORIES_DATA[0];

    const handleSave = () => {
        setSuccessModalOpen(true);
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Edit Details</h1>
                    <p className="text-[#808C91] mt-1">Kindly edit the info about this category</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
            </div>

            <AgentCategoryForm
                initialData={category}
                onSubmit={handleSave}
                submitLabel="Save Changes"
            />

            <ActionSuccessModal
                isOpen={successModalOpen}
                onClose={() => {
                    setSuccessModalOpen(false);
                    navigate('/settings/agent-category');
                }}
                title="Agent Category Info Edited"
                message="You have successfully edited this agent category information"
                buttonText="Dismiss"
            />
        </div>
    );
};

export default EditAgentCategory;
