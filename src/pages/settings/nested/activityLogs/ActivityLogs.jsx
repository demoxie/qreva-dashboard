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

const SEVERITY_LEVELS = ['Critical', 'High', 'Medium', 'Low', 'Info'];

const startOfDay = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return null;
    d.setHours(0, 0, 0, 0);
    return d;
};

const endOfDay = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return null;
    d.setHours(23, 59, 59, 999);
    return d;
};

const ActivityLogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const { data: logsResponse, isLoading } = useActivityLogs();

    const logs = logsResponse?.data || [];

    const filterGroups = useMemo(() => {
        const userOptions = (() => {
            const map = new Map();
            logs.forEach((log) => {
                const value = log.actorAdminId || log.actorId || log.actorEmail;
                if (!value) return;
                const label = log.actorName || log.user || log.actorEmail || value;
                if (!map.has(value)) map.set(value, label);
            });
            return [...map.entries()]
                .sort((a, b) => String(a[1]).localeCompare(String(b[1])))
                .map(([value, label]) => ({ label, value }));
        })();

        const severityFromData = makeOptions(logs.map((log) => log.severity));
        const severityOptions = severityFromData.length
            ? severityFromData
            : SEVERITY_LEVELS.map((value) => ({ label: value, value }));

        return [
            { key: 'user', label: 'User', options: userOptions },
            { key: 'severity', label: 'Severity', options: severityOptions },
            { key: 'dateRange', label: 'Date Range', type: 'dateRange' },
        ].filter((group) => group.type === 'dateRange' || group.options.length > 0);
    }, [logs]);

    const filteredLogs = useMemo(() => {
        const normalizedSearch = searchQuery.trim().toLowerCase();
        const range = filters.dateRange || {};
        const fromDate = range.from ? startOfDay(range.from) : null;
        const toDate = range.to ? endOfDay(range.to) : null;

        return logs.filter((log) => {
            if (filters.user) {
                const userId = log.actorAdminId || log.actorId || log.actorEmail;
                if (userId !== filters.user) return false;
            }
            if (filters.severity) {
                if (log.severity !== filters.severity) return false;
            }

            if (fromDate || toDate) {
                const ts = log.timestamp || log.createdAt;
                if (!ts) return false;
                const logDate = new Date(ts);
                if (isNaN(logDate)) return false;
                if (fromDate && logDate < fromDate) return false;
                if (toDate && logDate > toDate) return false;
            }

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
                log.severity,
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
