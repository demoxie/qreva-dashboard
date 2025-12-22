import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';

export const aggregatorManagerStats = [
  { label: 'Total Aggregators Manager', value: '8,000', change: '10%', subtext: '2X in last 24 hours' },
  { label: 'Total Agg. Manager Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
  { label: 'Total Agg. Manager Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
  { label: 'Total Agg. Manager Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
];

export const aggregatorManagerColumns = [
  {
    field: 'name',
    headerName: 'Agg. Manager Name',
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
    valueFormatter: (params) => params?.toLocaleString(),
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
    valueFormatter: (params) => params?.toLocaleString(),
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
    renderCell: (params) => (
      <span className="text-sm font-general text-gray-500 flex items-center h-full">{params.value}</span>
    )
  },
];

export const createAggregatorManagerActions = (navigate, onSuspend) => [
  {
    label: 'View Profile Details',
    icon: CustomEye,
    onClick: (row) => navigate(`/aggregator-managers/${row.id}`)
  },
  {
    label: 'Suspend Aggregator Manager',
    icon: CustomUser,
    onClick: (row) => onSuspend(row)
  },
  {
    label: 'View Transaction History',
    icon: CustomHistory,
    onClick: (row) => navigate(`/aggregator-managers/${row.id}?tab=transactions`)
  }
];