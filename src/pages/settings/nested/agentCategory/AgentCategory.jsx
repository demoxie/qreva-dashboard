import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import DataTable from "@/components/tables/DataTable";
import { AGENT_CATEGORIES_DATA, AGENT_CATEGORY_COLUMNS, AGENT_CATEGORY_ACTIONS } from './constants';

const AgentCategory = () => {
    const navigate = useNavigate();

    const handleAction = (action, row) => {
        if (action.label === 'View Details') {
            navigate(`/settings/agent-category/view/${row.id}`);
        } else if (action.label === 'Edit Details') {
            navigate(`/settings/agent-category/edit/${row.id}`);
        }
    };

    const actionsWithHandler = AGENT_CATEGORY_ACTIONS.map(action => ({
        ...action,
        onClick: (row) => handleAction(action, row),
    }));

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E]">Agent Category</h1>
                    <p className="text-[#808C91] mt-1">View all the full information about agent categories on the platform</p>
                </div>
                <Button
                    className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
                    onClick={() => navigate('/settings/agent-category/create')}
                >
                    Create Category
                </Button>
            </div>

            <DataTable
                data={AGENT_CATEGORIES_DATA}
                columns={AGENT_CATEGORY_COLUMNS}
                title="Commissions"
                actions={actionsWithHandler}
                showSearch={true}
                showCheckbox={true}
            />
        </div>
    );
};

export default AgentCategory;
