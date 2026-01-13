export const ACTIVITY_LOGS_DATA = [
    { id: 1, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Updated Permissions for Agents", date: "10:00 AM | 25th March, 2025" },
    { id: 2, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Promoted Peculiar Rose to Agg. Manager", date: "10:00 AM | 25th March, 2025" },
    { id: 3, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Suspended Peculiar Rose", date: "10:00 AM | 25th March, 2025" },
    { id: 4, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Updated Tier 2 Settings", date: "10:00 AM | 25th March, 2025" },
    { id: 5, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Deleted the Bronze Agent Category", date: "10:00 AM | 25th March, 2025" },
    { id: 6, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Created the Bronze Agent Category", date: "10:00 AM | 25th March, 2025" },
    { id: 7, user: "Rejoice Regina Rose", email: "emailaddress@g...om", role: "Internal Staff", action: "Approved Peculiar Rose Tier 3 KYC", date: "10:00 AM | 25th March, 2025" },
];

export const ACTIVITY_LOGS_COLUMNS = [
    {
        field: 'user',
        headerName: 'User Name',
        width: 250,
        flex: 1.5,
        renderCell: (params) => (
            <div className="flex flex-col justify-center h-full">
                <div className="text-sm font-medium text-[#1E1E1E]">{params.row.user}</div>
                <div className="text-xs text-[#808C91]">{params.row.email}</div>
            </div>
        )
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm text-[#505C61] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'action',
        headerName: 'Action Performed',
        width: 300,
        flex: 2,
        renderCell: (params) => (
            <span className="text-sm text-[#505C61] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'date',
        headerName: 'Action Date',
        width: 200,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm text-[#505C61] flex items-center h-full">{params.value}</span>
        )
    }
];
