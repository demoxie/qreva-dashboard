import React, { useState } from 'react';
import CommissionForm from './CommissionForm';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';
import { useNavigate } from 'react-router-dom';

const CreateCommission = () => {
    const navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSubmit = () => {
        // Logic to create commission would go here
        setIsSuccessModalOpen(true);
    };

    const handleCloseSuccess = () => {
        setIsSuccessModalOpen(false);
        navigate('/settings/commission-management');
    };

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
            <CommissionForm 
                onSubmit={handleSubmit}
            />

            <ActionSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleCloseSuccess}
                title="New Commission Created"
                message="You have successfully created a new commission for your platform"
            />
        </div>
    );
};

export default CreateCommission;
