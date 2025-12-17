import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';


export const aggregatorColumns = [
  {
    field: 'name',
    headerName: 'Aggregator Name',
    width: 250,
    flex: 1,
    renderCell: (params) => (
      <div className="flex flex-col justify-center h-full">
        <div className="text-sm font-general font-medium">{params.row.name}</div>
        <div className="text-xs text-gray-500">{params.row.email}</div>
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
      <span className="text-sm font-general text-gray-500 flex items-center h-full">{params.value}</span>
    )
  }
];

export const createAggregatorActions = (navigate, onSuspend) => [
  {
    label: 'View Profile Details',
    icon: CustomEye,
    onClick: (row) => navigate(`/aggregators/${row.id}`)
  },
  {
    label: 'Suspend Aggregator',
    icon: CustomUser,
    onClick: (row) => onSuspend(row)
  },
  {
    label: 'View Transaction History',
    icon: CustomHistory,
    onClick: (row) => navigate(`/aggregators/${row.id}?tab=transactions`)
  }
];


export const aggregatorProfileTabs = [
  { key: 'profile', label: 'Profile Details' },
  { key: 'transactions', label: 'Transaction History' },
  { key: 'agents', label: 'Agents' }
];

export const agentColumns = [
  {
    field: 'name',
    headerName: 'Agent Name',
    width: 250,
    renderCell: (params) => (
      <div>
        <div className="text-sm font-medium">{params.row.name}</div>
        <div className="text-xs text-gray-500">{params.row.email}</div>
      </div>
    )
  },
  { field: 'totalTransactions', headerName: 'Total Transactions', width: 150 },
  {
    field: 'totalVolume',
    headerName: 'Total Volume (₦)',
    width: 150,
    valueFormatter: (params) => params.value?.toLocaleString()
  },
  {
    field: 'totalRevenue',
    headerName: 'Total Revenue (₦)',
    width: 150,
    valueFormatter: (params) => params.value?.toLocaleString()
  },
  {
    field: 'totalCommission',
    headerName: 'Total Commission (₦)',
    width: 180,
    valueFormatter: (params) => params.value?.toLocaleString()
  },
  { field: 'joinedDate', headerName: 'Joined Date', width: 180 }
];

export const createChartSeries = (chartData) => [
  { data: chartData?.map(d => d.cardPayments) || [], color: '#06b6d4', label: 'Card Payments' },
  { data: chartData?.map(d => d.qrPayments) || [], color: '#F59E0B', label: 'QR Payments' }
];