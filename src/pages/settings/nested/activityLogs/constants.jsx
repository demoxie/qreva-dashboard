export const ACTIVITY_LOGS_DATA = [
  {
    id: 1,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Updated Permissions for Agents",
    date: "10:00 AM | 25th March, 2025",
  },
  {
    id: 2,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Promoted Peculiar Rose to Agg. Manager",
    date: "10:00 AM | 25th March, 2025",
  },
  {
    id: 3,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Suspended Peculiar Rose",
    date: "10:00 AM | 25th March, 2025",
  },
  {
    id: 4,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Updated Tier 2 Settings",
    date: "10:00 AM | 25th March, 2025",
  },
  {
    id: 5,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Deleted the Bronze Agent Category",
    date: "10:00 AM | 25th March, 2025",
  },
  {
    id: 6,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Created the Bronze Agent Category",
    date: "10:00 AM | 25th March, 2025",
  },
  {
    id: 7,
    user: "Rejoice Regina Rose",
    email: "emailaddress@g...om",
    role: "Internal Staff",
    action: "Approved Peculiar Rose Tier 3 KYC",
    date: "10:00 AM | 25th March, 2025",
  },
];

const splitCamelCase = (str) =>
  str ? str.replace(/([A-Z])/g, ' $1').trim() : '-';

const formatDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return {
    date: d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true }),
  };
};

export const ACTIVITY_LOGS_COLUMNS = [
  {
    field: "actorAdminId",
    headerName: "Actor",
    width: 220,
    flex: 1.5,
    renderCell: (params) => {
      const name = params.row.actorName || params.row.user || null;
      const email = params.row.actorEmail || params.row.email || null;
      const id = params.row.actorAdminId || '-';
      return (
        <div className="flex flex-col justify-center h-full">
          <div className="text-sm font-medium text-[#1E1E1E]">{name || id}</div>
          {email && <div className="text-xs text-[#808C91]">{email}</div>}
          {name && <div className="text-xs text-[#808C91]">{id}</div>}
        </div>
      );
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#505C61] flex items-center h-full whitespace-normal leading-snug">
        {params.row.actorRole || params.row.role || '-'}
      </span>
    ),
  },
  {
    field: "resource",
    headerName: "Resource",
    width: 160,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#505C61] flex items-center h-full">
        {splitCamelCase(params.row.resource)}
      </span>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    flex: 1.2,
    renderCell: (params) => (
      <span className="text-sm text-[#505C61] flex items-center h-full">
        {splitCamelCase(params.row.action)}
      </span>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 280,
    flex: 2,
    renderCell: (params) => {
      const description = params.row.description || params.row.details || null;
      const action = splitCamelCase(params.row.action);
      const resource = splitCamelCase(params.row.resource);
      const updatedFields = params.row.metadata?.updatedFields;
      const generated = updatedFields?.length
        ? `${action} on ${resource} — Fields: ${updatedFields.map(splitCamelCase).join(', ')}`
        : `${action} on ${resource}`;
      return (
        <span className="text-sm text-[#505C61] flex items-center h-full whitespace-normal leading-snug">
          {description || generated}
        </span>
      );
    },
  },
  {
    field: "location",
    headerName: "Location",
    width: 160,
    flex: 1,
    renderCell: (params) => (
      <div className="flex flex-col justify-center h-full">
        <span className="text-sm text-[#505C61]">{params.row.location || params.row.city || '-'}</span>
        {params.row.ipAddress && <span className="text-xs text-[#808C91]">{params.row.ipAddress}</span>}
      </div>
    ),
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    width: 160,
    flex: 1,
    renderCell: (params) => {
      const f = formatDate(params.row.lastLogin || params.row.lastLoginAt);
      if (!f) return <span className="text-sm text-[#808C91] flex items-center h-full">-</span>;
      return (
        <div className="flex flex-col justify-center h-full">
          <span className="text-sm text-[#505C61]">{f.date}</span>
          <span className="text-xs text-[#808C91]">{f.time}</span>
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Timestamp",
    width: 160,
    flex: 1,
    renderCell: (params) => {
      const f = formatDate(params.row.timestamp || params.row.createdAt);
      if (!f) return <span className="text-sm text-[#808C91] flex items-center h-full">-</span>;
      return (
        <div className="flex flex-col justify-center h-full">
          <span className="text-sm text-[#505C61]">{f.date}</span>
          <span className="text-xs text-[#808C91]">{f.time}</span>
        </div>
      );
    },
  },
];
