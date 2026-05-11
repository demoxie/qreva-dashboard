import React, { useMemo, useState } from 'react';
import DataTable from "@/components/tables/DataTable";
import { ACTIVITY_LOGS_COLUMNS } from './constants';
import { useActivityLogs } from '@/store/features/settings/useActivityLogs';

const splitCamelCase = (str) =>
    str ? String(str).replace(/([A-Z])/g, ' $1').trim() : '-';

const makeOptions = (items) =>
    [...new Set(items.filter(Boolean))]
        .sort((a, b) => splitCamelCase(a).localeCompare(splitCamelCase(b)))
        .map((value) => ({ label: splitCamelCase(value), value }));

const ActivityLogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const { data: logsResponse, isLoading } = useActivityLogs({ page: 1, limit: 100 });

    const logs = logsResponse?.data || [];
    const filterGroups = useMemo(() => ([
        {
            key: 'role',
            label: 'Role',
            options: makeOptions(logs.map((log) => log.actorRole || log.role)),
        },
        {
            key: 'resource',
            label: 'Resource',
            options: makeOptions(logs.map((log) => log.resource)),
        },
        {
            key: 'action',
            label: 'Action',
            options: makeOptions(logs.map((log) => log.action)),
        },
    ].filter((group) => group.options.length > 0)), [logs]);

    const filteredLogs = useMemo(() => {
        const normalizedSearch = searchQuery.trim().toLowerCase();

        return logs.filter((log) => {
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                if (key === 'role') return (log.actorRole || log.role) === value;
                return log[key] === value;
            });

            if (!matchesFilters) return false;
            if (!normalizedSearch) return true;

            const searchableText = [
                log.actorName,
                log.actorEmail,
                log.actorAdminId,
                log.actorRole,
                log.role,
                log.resource,
                log.action,
                log.description,
                log.details,
                log.location,
                log.city,
                log.ipAddress,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return searchableText.includes(normalizedSearch);
        });
    }, [filters, logs, searchQuery]);

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1E1E1E]">Activity Logs</h1>
                <p className="text-[#808C91] mt-1">View all the full activity logs on the platform</p>
            </div>

            <DataTable
                data={filteredLogs}
                columns={ACTIVITY_LOGS_COLUMNS}
                title="Activity Logs"
                showSearch={true}
                onSearch={setSearchQuery}
                onFilter={setFilters}
                filterGroups={filterGroups}
                showCheckbox={false}
                pageSize={10}
                getRowHeight={() => 'auto'}
                getEstimatedRowHeight={() => 76}
                loading={isLoading}
            />
        </div>
    );
};

export default ActivityLogs;
