import { multiLineData } from "./data";
import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';

export const agentStats = [
  { label: 'Total Agents', value: '8,000', change: '10%', subtext: '2% in last 24 hours' },
  { label: 'Total Agents Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
  { label: 'Total Agents Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
  { label: 'Total Agents Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
];

export const agentColumns = [
  {
    field: 'name',
    headerName: 'Agent Name',
    width: 250,
    flex: 1,
    renderCell: (params) => (
      <div>
        <div className="text-sm font-general text-[#1E1E1E] font-medium">{params.row.name}</div>
        <div className="text-sm font-general text-[#475367]">{params.row.email}</div>
      </div>
    )
  },
  { 
    field: 'totalTransactions', 
    headerName: 'Total Transactions', 
    width: 150,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
        {params.value}
      </span>
    )
  },
  {
    field: 'totalVolume',
    headerName: 'Total Volume (₦)',
    width: 150,
    flex: 1,
    valueFormatter: (params) => params?.toLocaleString(),
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
        {params.value?.toLocaleString()}
      </span>
    )
  },
  {
    field: 'totalRevenue',
    headerName: 'Total Revenue (₦)',
    width: 150,
    flex: 1,
    valueFormatter: (params) => params?.toLocaleString(),
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
        {params.value?.toLocaleString()}
      </span>
    )  
  },
  {
    field: 'totalCommission',
    headerName: 'Total Commission (₦)',
    width: 180,
    flex: 1,
    valueFormatter: (params) => params?.toLocaleString(),
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
        {params.value?.toLocaleString()}
      </span>
    )
  },
  { 
    field: 'joinedDate', 
    headerName: 'Joined Date', 
    width: 180,
    flex: 1, 
    renderCell: (params) => (
      <span className="text-sm text-[#1E1E1E] font-general flex flex-wrap items-center h-full">
        {params.value}
      </span>
    )
  },
];

export const createAgentActions = (navigate, onSuspend) => [
  {
    label: 'View Profile Details',
    icon: CustomEye,
    onClick: (row) => navigate(`/agents/${row.id}`)
  },
  {
    label: 'Suspend Agent',
    icon: CustomUser,
    onClick: (row) => onSuspend(row)
  },
  {
    label: 'View Transaction History',
    icon: CustomHistory,
    onClick: (row) => navigate(`/agents/${row.id}?tab=transactions`)
  }
];

const availableTabs = [
    { key: 'profile', label: 'Profile Details' },
    { key: 'transactions', label: 'Transaction History' }
];


const chartSeries = [
    { data: multiLineData.map(d => d.bvn), color: '#06b6d4', label: 'BVN' },
    { data: multiLineData.map(d => d.nin), color: '#F59E0B', label: 'NIN' }
];


export {availableTabs, chartSeries}