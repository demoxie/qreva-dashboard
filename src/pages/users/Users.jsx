import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';

const Users = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // User stats
  const userStats = [
    { label: 'Total Users', value: '45,823', change: '+20%', subtext: '5,000 in last 24 hours' },
    { label: 'Total Personal Accounts', value: '5,823', change: '-10%', subtext: '600 in last 24 hours' },
    { label: 'Total Merchants', value: '10,823', change: '-10%', subtext: '500 in last 24 hours' },
    { label: 'Total Agents', value: '8,000', change: '-10%', subtext: '2% in last 24 hours' },
    { label: 'Total Aggregators', value: '10,823', change: '-10%', subtext: '500 in last 24 hours' },
    { label: 'Total Aggregator Manager', value: '8,000', change: '-10%', subtext: '2% in last 24 hours' }
  ];

  // Mock users data - In production, this would come from an API
  const usersData = [
    { 
      id: 1, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com', 
      accountType: 'Personal Account', 
      status: 'Active', 
      totalTransactions: 100, 
      totalVolume: 40000, 
      joinedDate: '10:00 AM | 25th March, 2025',
      // Additional data that would be fetched when viewing profile
      firstName: 'Rejoice',
      middleName: 'Regina',
      lastName: 'Rose',
      phone: '08012345678',
      tier: 'Tier 1'
    },
    { 
      id: 2, 
      name: 'John Smith', 
      email: 'john.smith@gmail.com', 
      accountType: 'Agent', 
      status: 'Suspended', 
      totalTransactions: 100, 
      totalVolume: 5000000, 
      joinedDate: '10:00 AM | 25th March, 2025',
      firstName: 'John',
      middleName: '',
      lastName: 'Smith',
      phone: '08012345679',
      tier: 'Tier 2'
    },
    { 
      id: 3, 
      name: 'Mary Johnson', 
      email: 'mary.j@gmail.com', 
      accountType: 'Aggregator', 
      status: 'Active', 
      totalTransactions: 100, 
      totalVolume: 200000, 
      joinedDate: '10:00 AM | 25th March, 2025',
      firstName: 'Mary',
      middleName: '',
      lastName: 'Johnson',
      phone: '08012345680',
      tier: 'Tier 3'
    },
    { 
      id: 4, 
      name: 'David Brown', 
      email: 'david.b@gmail.com', 
      accountType: 'Aggregator Manager', 
      status: 'Deactivated', 
      totalTransactions: 100, 
      totalVolume: 40000000, 
      joinedDate: '10:00 AM | 25th March, 2025',
      firstName: 'David',
      middleName: '',
      lastName: 'Brown',
      phone: '08012345681',
      tier: 'Tier 2'
    },
    { 
      id: 5, 
      name: 'Sarah Williams', 
      email: 'sarah.w@gmail.com', 
      accountType: 'Merchant', 
      status: 'Active', 
      totalTransactions: 100, 
      totalVolume: 20000, 
      joinedDate: '10:00 AM | 25th March, 2025',
      firstName: 'Sarah',
      middleName: '',
      lastName: 'Williams',
      phone: '08012345682',
      tier: 'Tier 1'
    }
  ];

  // Filter users based on search query
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.accountType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleConfirmSuspend = () => {
    console.log('Suspend user:', selectedUser);
    // Add API call here to suspend user
    // After successful suspension, update the user status locally or refetch
    setShowSuspendModal(false);
    setSelectedUser(null);
  };

  // DataGrid columns
  const columns = [
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
    { field: 'accountType', headerName: 'Account Type', width: 180, flex: 1,
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
    { field: 'totalTransactions', headerName: 'Total Transactions', width: 150, flex: 1,
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
    { field: 'joinedDate', headerName: 'Joined Date', width: 180, flex: 1,
      renderCell: (params) => (
        <span className="text-sm text-[#1E1E1E] font-general  flex flex-wrap items-center h-full">{params.value}</span>
      )
     },
  ];

    const tableActions = [
      {
        label: 'View Profile Details',
        icon: CustomEye,
        onClick: (row) => navigate(`/users/${row.id}`)
      },
      {
        label: 'Suspend Aggregator',
        icon: CustomUser,
        onClick: (row) => {
          setSelectedAggregator(row);
          setShowSuspendModal(true);
        }
      },
      {
        label: 'View Transaction History',
        icon: CustomHistory,
        onClick: (row) => navigate(`/users/${row.id}?tab=transactions`)
      }
    ];


  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Users"
          subtitle="Here is the full list of users on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats
          stats={userStats} />

        {/* Users Table */}
         <DataTable
          className='font-general'
          data={filteredUsers}
          columns={columns}
          title="Users"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
      </div>


      {/* Suspend User Modal */}
      <ConfirmDialog
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleConfirmSuspend}
        title="Suspend User"
        message={`Are you sure you want to suspend ${selectedUser?.name}?`}
        confirmText="Yes, suspend"
        confirmStyle="danger"
      />
    </div>
  );
};

export default Users;