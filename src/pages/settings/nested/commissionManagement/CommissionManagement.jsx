import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import DataTable from "@/components/tables/DataTable";
import { COMMISSION_COLUMNS, COMMISSION_ACTIONS } from './constants';
import { useCommissions, useDuplicateCommission } from '@/store/features/settings/useCommissions';
import { handleError } from '@/store/utils/handleError';
import { handleSuccess } from '@/store/utils/handleSuccess';

const CommissionManagement = () => {
    const navigate = useNavigate();
    const { data: commissionsResponse, isLoading } = useCommissions();
    const duplicateCommission = useDuplicateCommission();

    const commissions = commissionsResponse?.data || [];

    const handleAction = (action, row) => {
        if (action.label === 'View Details') {
            navigate(`/settings/commission-management/view/${row.id}`);
        } else if (action.label === 'Edit Details') {
            navigate(`/settings/commission-management/edit/${row.id}`);
        } else if (action.label === 'Duplicate') {
            duplicateCommission.mutate(row.id, {
                onSuccess: () => handleSuccess('Commission duplicated successfully'),
                onError: (error) => handleError(error),
            });
        }
    };

    const actionsWithHandler = COMMISSION_ACTIONS.map(action => ({
        ...action,
        onClick: (row) => handleAction(action, row),
    }));

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Commission Management</h1>
                    <p className="text-[#808C91] mt-1">View all the full information about fees and commisions on the platform</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white h-12 px-8 rounded-lg font-semibold"
                    onClick={() => navigate('/settings/commission-management/create')}
                >
                    Create Commission
                </Button>
            </div>

            <DataTable
                data={commissions}
                columns={COMMISSION_COLUMNS}
                title="Commissions"
                actions={actionsWithHandler}
                showSearch={true}
                showCheckbox={true}
                loading={isLoading}
            />
        </div>
    );
};

export default CommissionManagement;
