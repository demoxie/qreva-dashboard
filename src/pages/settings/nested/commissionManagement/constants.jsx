import { Eye, Edit, Copy } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const COMMISSION_DATA = [
    { 
        id: 1, 
        transactionType: "SoftPOS", 
        feeType: "Percentage Fee", 
        feeValue: "0.6%", 
        appliesTo: "Agents, Aggregat... etc", 
        updated: "10:00 AM | 25th March, 2025", 
        active: true 
    },
    { 
        id: 2, 
        transactionType: "SoftPOS", 
        feeType: "Percentage Fee", 
        feeValue: "0.6%", 
        appliesTo: "Agents, Aggregat... etc", 
        updated: "10:00 AM | 25th March, 2025", 
        active: true 
    },
    { 
        id: 3, 
        transactionType: "SoftPOS", 
        feeType: "Percentage Fee", 
        feeValue: "0.6%", 
        appliesTo: "Agents, Aggregat... etc", 
        updated: "10:00 AM | 25th March, 2025", 
        active: true 
    },
    { 
        id: 4, 
        transactionType: "SoftPOS", 
        feeType: "Percentage Fee", 
        feeValue: "0.6%", 
        appliesTo: "Agents, Aggregat... etc", 
        updated: "10:00 AM | 25th March, 2025", 
        active: false 
    },
    { 
        id: 5, 
        transactionType: "SoftPOS", 
        feeType: "Percentage Fee", 
        feeValue: "0.6%", 
        appliesTo: "Agents, Aggregat... etc", 
        updated: "10:00 AM | 25th March, 2025", 
        active: true 
    },
];

export const COMMISSION_COLUMNS = [
    {
        field: 'transactionType',
        headerName: 'Transaction Type',
        width: 180,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm font-medium text-[#1E1E1E] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'feeType',
        headerName: 'Fee Type',
        width: 150,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm text-[#505C61] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'feeValue',
        headerName: 'Fee Value',
        width: 100,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm font-bold text-[#1E1E1E] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'appliesTo',
        headerName: 'Applies To',
        width: 180,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm text-[#505C61] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'updated',
        headerName: 'Last Updated',
        width: 180,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm text-[#505C61] flex items-center h-full">{params.value}</span>
        )
    },
    {
        field: 'active',
        headerName: 'Active Status',
        width: 120,
        flex: 1,
        renderCell: (params) => (
            <div className="flex items-center h-full">
                <Switch checked={params.value} className="data-[state=checked]:bg-green-500" />
            </div>
        )
    }
];

export const COMMISSION_ACTIONS = [
    {
        label: 'View Details',
        icon: Eye,
    },
    {
        label: 'Edit Details',
        icon: Edit,
    },
    {
        label: 'Duplicate',
        icon: Copy,
    }
];

export const USER_ACCOUNT_OPTIONS = [
    { id: 'personal', label: 'Personal Account' },
    { id: 'agent', label: 'Agent/Merchants' },
];

export const TRANSACTION_TYPE_OPTIONS = [
    { id: 'softpos', label: 'SoftPOS' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'airtime', label: 'Airtime & Bills' },
    { id: 'kyc', label: 'KYC Verification' },
    { id: 'requests', label: 'Requests' },
];

export const FEE_TYPE_OPTIONS = [
    { id: 'percentage', label: 'Percentage Fee' },
    { id: 'flat', label: 'Flat Fee' },
];

export const ROLES_OPTIONS = [
    { id: 'agent', label: 'Agent' },
    { id: 'aggregators', label: 'Aggregators' },
    { id: 'aggregator_manager', label: 'Aggregator Manager' },
    { id: 'admin', label: 'Admin' },
];

export const APPLIES_TO_OPTIONS = [
    { id: 'all_agents', label: 'All Agents' },
    { id: 'starter', label: 'Starter Category' },
    { id: 'bronze', label: 'Bronze Category' },
    { id: 'silver', label: 'Silver Category' },
    { id: 'gold', label: 'Gold Category' },
    { id: 'aggregators', label: 'Aggregators' },
    { id: 'aggregator_manager', label: 'Aggregator Manager' },
];
