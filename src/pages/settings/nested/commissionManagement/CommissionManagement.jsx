import React, { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import DataTable from "@/components/tables/DataTable";
import { COMMISSION_COLUMNS, COMMISSION_ACTIONS } from './constants';
import { useCommissions, useDuplicateCommission, useDeleteCommission } from '@/store/features/settings/useCommissions';
import { handleError } from '@/store/utils/handleError';
import { handleSuccess } from '@/store/utils/handleSuccess';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';

const CommissionManagement = () => {
    const navigate = useNavigate();
    const { data: commissionsResponse, isLoading } = useCommissions();
    const duplicateCommission = useDuplicateCommission();
    const deleteCommission = useDeleteCommission();

    const commissions = commissionsResponse?.data || [];

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCommissions = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return commissions;
        return commissions.filter((row) => {
            const appliesTo = Array.isArray(row.appliesTo)
                ? row.appliesTo.join(', ')
                : row.appliesTo || '';
            const haystack = [
                row.transactionType,
                row.feeType,
                appliesTo,
                row.percentageFee != null ? `${row.percentageFee}%` : '',
                row.flatFee != null ? String(row.flatFee) : '',
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(q);
        });
    }, [commissions, searchQuery]);

    const handleAction = (action, row) => {
        const id = row._id || row.id;
        if (!id) return;

        if (action.label === 'View Details') {
            navigate(`/settings/commission-management/view/${id}`);
        } else if (action.label === 'Edit Details') {
            navigate(`/settings/commission-management/edit/${id}`);
        } else if (action.label === 'Duplicate') {
            duplicateCommission.mutate(id, {
                onSuccess: () => handleSuccess('Commission duplicated successfully'),
                onError: (error) => handleError(error),
            });
        } else if (action.label === 'Delete') {
            setSelectedCommission(row);
            setShowDeleteConfirm(true);
        }
    };

    const handleConfirmDelete = () => {
        const id = selectedCommission?._id || selectedCommission?.id;
        if (!id) return;
        deleteCommission.mutate(id, {
            onSuccess: () => {
                handleSuccess('Commission deleted successfully');
                setShowDeleteConfirm(false);
                setSelectedCommission(null);
            },
            onError: (error) => {
                handleError(error);
                setShowDeleteConfirm(false);
            },
        });
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
                    <p className="text-[#808C91] mt-1">View all the full information about fees and commissions on the platform</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white h-12 px-8 rounded-lg font-semibold"
                    onClick={() => navigate('/settings/commission-management/create')}
                >
                    Create Commission
                </Button>
            </div>

            <DataTable
                data={filteredCommissions}
                columns={COMMISSION_COLUMNS}
                title="Commissions"
                actions={actionsWithHandler}
                showSearch={true}
                onSearch={setSearchQuery}
                showCheckbox={true}
                loading={isLoading}
            />

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => { setShowDeleteConfirm(false); setSelectedCommission(null); }}
                onConfirm={handleConfirmDelete}
                title="Delete Commission"
                message="Are you sure you want to delete this commission? This action cannot be undone."
                confirmText={deleteCommission.isPending ? 'Deleting...' : 'Yes, delete'}
                confirmStyle="danger"
            />
        </div>
    );
};

export default CommissionManagement;
