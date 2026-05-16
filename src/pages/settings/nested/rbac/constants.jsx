import { Eye, Mail, Power } from "lucide-react";

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const renderStatusBadge = (value, tones) => {
  const tone = tones[value] || tones.default;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tone.bg} ${tone.text}`}
    >
      {value || "-"}
    </span>
  );
};

const inviteStatusTones = {
  InvitePending: { bg: "bg-[#FFF8E8]", text: "text-[#B54708]" },
  Active: { bg: "bg-[#ECFDF3]", text: "text-[#027A48]" },
  Suspended: { bg: "bg-[#FEF3F2]", text: "text-[#B42318]" },
  default: { bg: "bg-[#F2F4F7]", text: "text-[#344054]" },
};

const accountStatusTones = {
  Active: { bg: "bg-[#ECFDF3]", text: "text-[#027A48]" },
  Inactive: { bg: "bg-[#FEF3F2]", text: "text-[#B42318]" },
  default: { bg: "bg-[#F2F4F7]", text: "text-[#344054]" },
};

export const ADMIN_COLUMNS = [
  {
    field: "fullName",
    headerName: "Admin Name",
    minWidth: 220,
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <div className="flex flex-col justify-center h-full py-1">
        <span className="text-sm font-semibold text-[#1E1E1E]">
          {params.row.fullName || "-"}
        </span>
        <span className="text-xs text-[#667085]">{params.row.emailAddress || "-"}</span>
      </div>
    ),
  },
  {
    field: "role",
    headerName: "Admin Level",
    minWidth: 160,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#344054]">{params.value || "-"}</span>
    ),
  },
  {
    field: "inviteStatus",
    headerName: "Invite Status",
    minWidth: 160,
    flex: 1,
    renderCell: (params) => renderStatusBadge(params.value, inviteStatusTones),
  },
  {
    field: "status",
    headerName: "Account Status",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => renderStatusBadge(params.value, accountStatusTones),
  },
  {
    field: "invitedAt",
    headerName: "Invited At",
    minWidth: 180,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#344054]">{formatDateTime(params.value)}</span>
    ),
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    minWidth: 180,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#344054]">{formatDateTime(params.value)}</span>
    ),
  },
];

export const ADMIN_ROW_ACTIONS = [
  {
    key: "view",
    label: "View Details",
    icon: Eye,
  },
  {
    key: "resendInvite",
    label: "Resend Invite",
    icon: Mail,
  },
  {
    key: "toggleStatus",
    label: "Suspend / Activate",
    icon: Power,
  },
];

export const ADMIN_FILTER_GROUPS = [
  {
    key: "role",
    label: "Admin Level",
    options: ["SuperAdmin", "Operation", "Support"].map((role) => ({
      label: role,
      value: role,
    })),
  },
  {
    key: "status",
    label: "Account Status",
    options: ["Active", "Inactive"].map((status) => ({
      label: status,
      value: status,
    })),
  },
];

export const ADMIN_LEVEL_OPTIONS = [
  { label: "Super Admin", value: "SuperAdmin" },
  { label: "Operation", value: "Operation" },
  { label: "Support", value: "Support" },
];
