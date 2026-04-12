import React from 'react';
import DataTable from "@/components/tables/DataTable";
import { ACTIVITY_LOGS_COLUMNS } from './constants';
import { useActivityLogs } from '@/store/features/settings/useActivityLogs';

const ActivityLogs = () => {
    const { data: logsResponse, isLoading } = useActivityLogs();

    const logs = logsResponse?.data || [];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1E1E1E]">Activity Logs</h1>
                <p className="text-[#808C91] mt-1">View all the full activity logs on the platform</p>
            </div>

            <DataTable
                data={logs}
                columns={ACTIVITY_LOGS_COLUMNS}
                title="Activity Logs"
                showSearch={true}
                showCheckbox={true}
                loading={isLoading}
            />
        </div>
    );
};

export default ActivityLogs;
