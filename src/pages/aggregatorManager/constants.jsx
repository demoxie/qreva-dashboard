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
    field: 'firstName',
    headerName: 'Agg. Manager Name',
    width: 250,
    flex: 1,
    renderCell: (params) => (
      <div className="flex flex-col justify-center h-full">
        <div className="text-sm font-general font-medium">
          {params.row.firstName} {params.row.lastName}
        </div>
        <div className="text-xs text-gray-500">{params.row.emailAddress}</div>
      </div>
    )
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 160,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
        {params.value}
      </span>
    )
  },
  {
    field: 'type',
    headerName: 'Account Type',
    width: 130,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
        {params.value}
      </span>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    flex: 1,
    renderCell: (params) => {
      const statusColors = {
        Active: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#1B7D3C]',
        Inactive: 'border border-[#D1D5DB] bg-[#F3F4F6] text-[#6B7280]',
        Suspended: 'border border-[#F87171] bg-[#FEE2E2] text-[#B91C1C]',
        Pending: 'border border-[#FFC535] bg-[#FFF8E6] text-[#B58202]',
      };
      return (
        <span className={`px-2 py-1.5 text-center ${statusColors[params.value] || statusColors.Inactive} font-general font-medium text-xs rounded-md flex items-center justify-center h-full`}>
          {params.value || '-'}
        </span>
      );
    }
  },
  {
    field: 'clientId',
    headerName: 'Client ID',
    width: 180,
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general text-gray-500 flex items-center h-full">{params.value}</span>
    )
  },
];

export const createAggregatorManagerActions = (navigate, onSuspend) => [
  {
    label: 'View Profile Details',
    icon: CustomEye,
    onClick: (row) => navigate(`/aggregator-managers/${row._id}`)
  },
  {
    label: 'View Transaction History',
    icon: CustomHistory,
    onClick: (row) => navigate(`/aggregator-managers/${row._id}?tab=transactions`)
  },
  ...(onSuspend ? [{
    label: 'Suspend Aggregator Manager',
    icon: CustomUser,
    onClick: (row) => onSuspend(row)
  }] : []),
];
