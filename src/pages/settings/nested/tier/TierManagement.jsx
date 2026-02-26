import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import DataTable from "@/components/tables/DataTable";
import { TIERS_DATA, TIER_COLUMNS, TIER_ACTIONS } from './constants';
import TierViewDetailsModal from './TierViewDetailsModal';

const TierManagement = () => {
    const navigate = useNavigate();
    const [viewTier, setViewTier] = useState(null);

    const handleAction = (action, row) => {
        if (action.label === 'Edit Details') {
            navigate(`/settings/tier/edit/${row.id}`);
        } else if (action.label === 'View Details') {
            setViewTier(row);
        } else {
            console.log(action.label, row);
        }
    };

    // Map actions to include handler
    const actionsWithHandler = TIER_ACTIONS.map(action => ({
        ...action,
        onClick: (row) => handleAction(action, row)
    }));

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Tier Management</h1>
                    <p className="text-[#808C91] mt-1">View all the full information about KYC tiers on the platform</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                    onClick={() => navigate('/settings/tier/create')}
                >
                    Create Tier
                </Button>
            </div>

            <DataTable
                data={TIERS_DATA}
                columns={TIER_COLUMNS}
                title="KYC Tiers"
                actions={actionsWithHandler}
                showSearch={true}
                showCheckbox={true}
            />

            {/* View Details Modal */}
            <TierViewDetailsModal
                isOpen={!!viewTier}
                tier={viewTier}
                onClose={() => setViewTier(null)}
            />
        </div>
    );
};

export default TierManagement;
