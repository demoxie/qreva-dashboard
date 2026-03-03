import React, { useState } from 'react';
import CommissionForm from './CommissionForm';
import { useNavigate, useParams } from 'react-router-dom';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';

const EditCommission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // Mock initial data based on ID
    const mockInitialData = {
        percentageFee: "0.6%",
        flatFee: "₦100",
        splits: {
            agent: "0.6%",
            aggregators: "4%",
            aggregator_manager: "10%",
            admin: "10%"
        }
    };

    const handleSubmit = () => {
        // Logic to update commission would go here
        setIsSuccessModalOpen(true);
    };

    const handleCloseSuccess = () => {
        setIsSuccessModalOpen(false);
        navigate('/settings/commission-management');
    };

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
            <CommissionForm 
                initialData={mockInitialData}
                onSubmit={handleSubmit}
                submitLabel="Save Changes"
                title="Edit Details"
                subtitle="Kindly edit the info about this commission"
            />

            <ActionSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleCloseSuccess}
                title="Commission Info Edited"
                message="You have successfully edited this commission information"
            />
        </div>
    );
};

export default EditCommission;
