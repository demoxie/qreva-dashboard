import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';

export const userStats = [
  { label: 'Total Users', value: '45,823', change: '+20%', subtext: '5,000 in last 24 hours' },
  { label: 'Total Personal Accounts', value: '5,823', change: '-10%', subtext: '600 in last 24 hours' },
  { label: 'Total Merchants', value: '10,823', change: '-10%', subtext: '500 in last 24 hours' },
  { label: 'Total Agents', value: '8,000', change: '-10%', subtext: '2% in last 24 hours' },
  { label: 'Total Aggregators', value: '10,823', change: '-10%', subtext: '500 in last 24 hours' },
  { label: 'Total Aggregator Manager', value: '8,000', change: '-10%', subtext: '2% in last 24 hours' }
];

export const userColumns = [
  {
    field: 'name',
    headerName: 'User Name',
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <div>
        <div className="text-sm font-general text-[#1E1E1E] font-medium">{params.row.name}</div>
        <div className="text-sm font-general text-[#475367]">{params.row.email}</div>
      </div>
    )
  },
  { 
    field: 'accountType', 
    headerName: 'Account Type', 
    width: 180, 
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general font-light tracking-wider text-[#1E1E1E] flex items-center h-full">
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
        Active: 'bg-[#E9F9EF] border border-[#4ED17E] text-[#188C43]',
        Suspended: 'bg-[#FFF8E6] border border-[#FFC535] text-[#B58202]',
        Deactivated: 'bg-[#FCECEC] border border-[#E56566] text-[#9E2D2D]'
      };
      return (
        <span className={`px-3 py-1.5 ${statusColors[params.value]} text-xs rounded-md font-general tracking-wider font-semibold leading-[145%]`}>
          {params.value}
        </span>
      );
    }
  },
  { 
    field: 'totalTransactions', 
    headerName: 'Total Transactions', 
    width: 150, 
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
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

export const createUserActions = (navigate, onSuspend) => [
  {
    label: 'View Profile Details',
    icon: CustomEye,
    onClick: (row) => navigate(`/users/${row.id}`)
  },
  {
    label: 'Suspend User',
    icon: CustomUser,
    onClick: (row) => onSuspend(row)
  },
  {
    label: 'View Transaction History',
    icon: CustomHistory,
    onClick: (row) => navigate(`/users/${row.id}?tab=transactions`)
  }
];


export const userTransactionColumns = [
  {
    field: 'desc',
    headerName: 'Title',
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <div>
        <div className="text-sm font-general text-[#1E1E1E] font-medium">{params.value}</div>
      </div>
    )
  },
  { 
    field: 'category', 
    headerName: 'Category', 
    width: 180, 
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general font-light tracking-wider text-[#1E1E1E] flex items-center h-full">
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
        Successful: 'bg-[#E9F9EF] border border-[#4ED17E] text-[#188C43]',
        Failed: 'bg-[#FCECEC] border border-[#E56566] text-[#9E2D2D]'
      };
      return (
        <span className={`px-3 py-1.5 ${statusColors[params.value]} text-xs rounded-md font-general tracking-wider font-semibold leading-[145%]`}>
          {params.value}
        </span>
      );
    }
  },
  { 
    field: 'type', 
    headerName: 'Type', 
    width: 150, 
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
        {params.value}
      </span>
    )
  },
  {
    field: 'amount',
    headerName: 'Amount (N)',
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
    field: 'date', 
    headerName: 'Transaction Date', 
    width: 180, 
    flex: 1,
    renderCell: (params) => (
      <span className="text-sm text-[#1E1E1E] font-general flex flex-wrap items-center h-full">
        {params.value}
      </span>
    )
  },
];