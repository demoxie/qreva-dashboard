import { Eye, Edit, UserPlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const ROLES_DATA = [
  {
    id: 1,
    name: "Personal Account",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 2,
    name: "Agent",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 3,
    name: "Merchants",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 4,
    name: "Aggregators",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 5,
    name: "Aggregators Manager",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 6,
    name: "Internal Staff",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 7,
    name: "Admin",
    users: 4,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
  {
    id: 8,
    roleName: "New Admin",
    name: "New Admin",
    description: "Verifies and approves",
    users: 0,
    permissions: "Dashboard, Airtime, Bills, Request...",
    updated: "10:00 AM | 25th March, 2025",
    active: true,
  },
];

export const RBAC_COLUMNS = [
  {
    field: "roleName",
    headerName: "Role Name",
    width: 180,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-medium text-[#1E1E1E] flex items-center h-full">
        {params.value || params.row.name || "-"}
      </span>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#505C61] flex items-center h-full">
        {params.value || "-"}
      </span>
    ),
  },
  {
    field: "permissions",
    headerName: "Permissions",
    width: 250,
    flex: 2,
    renderCell: (params) => {
      const perms = params.value;
      // Handle both string and object formats
      if (typeof perms === "string")
        return (
          <span className="text-sm text-[#505C61] flex items-center h-full">
            {perms}
          </span>
        );
      if (perms && typeof perms === "object") {
        const enabled = Object.entries(perms)
          .filter(([, v]) => v)
          .map(([k]) => k.split(":")[0]);
        const unique = [...new Set(enabled)];
        const display =
          unique.length > 3
            ? `${unique.slice(0, 3).join(", ")}... +${unique.length - 3}`
            : unique.join(", ");
        return (
          <span className="text-sm text-[#505C61] flex items-center h-full">
            {display || "None"}
          </span>
        );
      }
      return (
        <span className="text-sm text-[#505C61] flex items-center h-full">
          -
        </span>
      );
    },
  },
  {
    field: "updatedAt",
    headerName: "Last Updated",
    width: 200,
    flex: 1,
    renderCell: (params) => {
      const val = params.value || params.row.updated;
      if (!val)
        return (
          <span className="text-sm text-[#505C61] flex items-center h-full">
            -
          </span>
        );
      const d = new Date(val);
      if (isNaN(d))
        return (
          <span className="text-sm text-[#505C61] flex items-center h-full">
            {val}
          </span>
        );
      return (
        <span className="text-sm text-[#505C61] flex items-center h-full">
          {d.toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    field: "active",
    headerName: "Active Status",
    width: 120,
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center h-full">
        <Switch
          checked={params.value}
          className="data-[state=checked]:bg-green-500"
        />
      </div>
    ),
  },
];

export const RBAC_ACTIONS = [
  {
    label: "View Details",
    icon: Eye,
    onClick: (row) => console.log("View:", row),
  },
  {
    label: "Edit Details",
    icon: Edit,
    onClick: (row) => console.log("Edit:", row),
  },
  {
    label: "Assign Role",
    icon: UserPlus,
    onClick: (row) => console.log("Assign Role:", row),
  },
];

export const PERMISSIONS_CATEGORIES = [
  {
    title: "Dashboard & Analytics",
    items: [
      { label: "View Dashboard" },
      { label: "View Reports" },
      { label: "Export Reports" },
    ],
  },
  {
    title: "Airtime Purchase",
    items: [{ label: "Have upon sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Bill Payment",
    items: [{ label: "Have upon sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Requests",
    items: [{ label: "Have upon sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Transfers",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "SoftPOS",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "KYC Verification",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Earnings",
    items: [
      { label: "Have on sidebar" },
      { label: "Withdrawal Button" },
      { label: "View List of Withdrawals" },
    ],
  },
  {
    title: "Users",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Agents",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Aggregators",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Aggregator Manager",
    items: [{ label: "Have on sidebar" }, { label: "View Dashboard" }],
  },
  {
    title: "Account Approval",
    items: [
      { label: "Have on sidebar" },
      { label: "View Approvals" },
      { label: "Approve/Decline Approvals" },
    ],
  },
  {
    title: "Disputed Transactions",
    items: [
      { label: "Have on sidebar" },
      { label: "View Disputes" },
      { label: "Approve/Decline Disputes" },
    ],
  },
  {
    title: "Tier Management",
    items: [
      { label: "Have on settings" },
      { label: "Create/Edit Tiers" },
      { label: "View Tiers" },
    ],
  },
  {
    title: "Commission Management",
    items: [
      { label: "Have on settings" },
      { label: "Create/Edit Commissions" },
      { label: "View Commissions" },
    ],
  },
  {
    title: "Agency Category",
    items: [
      { label: "Have on settings" },
      { label: "Create/Edit Categories" },
      { label: "View Categories" },
    ],
  },
  {
    title: "Roles Permissions",
    items: [
      { label: "Have on settings" },
      { label: "Create/Edit Role Permissions" },
      { label: "View Role Permissions" },
    ],
  },
];
