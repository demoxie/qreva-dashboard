import React from 'react';
import DataTable from "@/components/tables/DataTable";
import { ACTIVITY_LOGS_DATA, ACTIVITY_LOGS_COLUMNS } from './constants';

const ActivityLogs = () => {
    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1E1E1E]">Activity Logs</h1>
                <p className="text-[#808C91] mt-1">View all the full activity logs on the platform</p>
            </div>

            <DataTable
                data={ACTIVITY_LOGS_DATA}
                columns={ACTIVITY_LOGS_COLUMNS}
                title="Activity Logs"
                showSearch={true}
                showCheckbox={true}
            />
        </div>
    );
};

export default ActivityLogs;
