import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';

const Users = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState({ open: false, anchor: null, row: null, x: 0, y: 0 });
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

  // Navigation handlers
  const handleViewProfile = (userId) => {
    navigate(`/users/${userId}`);
    closeDropdown();
  };

  const handleSuspendUser = (user) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
    closeDropdown();
  };

  const handleConfirmSuspend = () => {
    console.log('Suspend user:', selectedUser);
    // Add API call here to suspend user
    // After successful suspension, update the user status locally or refetch
    setShowSuspendModal(false);
    setSelectedUser(null);
  };

  const handleViewTransactionHistory = (userId) => {
    navigate(`/users/${userId}?tab=transactions`);
    closeDropdown();
  };

  const closeDropdown = () => {
    setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
  };

  // DataGrid columns
  const columns = [
    {
      field: 'name',
      headerName: 'User Name',
      width: 200,
      renderCell: (params) => (
        <div>
          <div className="text-sm font-medium">{params.row.name}</div>
          <div className="text-xs text-gray-500">{params.row.email}</div>
        </div>
      )
    },
    { field: 'accountType', headerName: 'Account Type', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const statusColors = {
          Active: 'bg-green-100 text-green-700',
          Suspended: 'bg-yellow-100 text-yellow-700',
          Deactivated: 'bg-red-100 text-red-700'
        };
        return (
          <span className={`px-2 py-1 ${statusColors[params.value]} text-xs rounded`}>
            {params.value}
          </span>
        );
      }
    },
    { field: 'totalTransactions', headerName: 'Total Transactions', width: 150 },
    {
      field: 'totalVolume',
      headerName: 'Total Volume (₦)',
      width: 150,
      valueFormatter: (params) => params?.toLocaleString()
    },
    { field: 'joinedDate', headerName: 'Joined Date', width: 180 },
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <button
          className="text-[#7C8D96] hover:text-[#1E1E1E]"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            setDropdown({
              open: true,
              anchor: e.currentTarget,
              row: params.row,
              x: rect.right - 192,
              y: rect.bottom + 4
            });
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      )
    }
  ];

  // Click outside handler for dropdown
  const handleClickOutside = () => {
    if (dropdown.open) {
      closeDropdown();
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]" onClick={handleClickOutside}>
      <div className="p-6">
        <PageHeader
          title="Users"
          subtitle="Here is the full list of users on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        {/* User Stats */}
        <div className="flex flex-wrap w-full gap-4 mb-6">
          {userStats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex justify-between min-w-[262px] items-start mb-2">
                  <span className="text-sm font-urbanist font-medium text-[#808C91]">{stat.label}</span>
                  <span className={`text-xs flex items-center p-1 rounded-2xl ${
                    stat.change.startsWith('+') ? 'bg-[#E9F9EF] text-green-500' : 'bg-[#FFECE5] text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-[32px] font-semibold font-general text-[#084059] mb-1">{stat.value}</div>
                <div className="text-xs font-urbanist font-medium leading-[145%] text-[#808c91]">{stat.subtext}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-urbanist font-semibold text-[#1E1E1E]">All Users</h2>
              <SearchFilterBar 
                onSearch={setSearchQuery}
                onFilter={() => console.log('Filter clicked')}
              />
            </div>
          </div>
          <CardContent>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              sx={{
                border: 0,
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0',
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dropdown menu */}
      {dropdown.open && (
        <div
          style={{
            position: 'fixed',
            top: dropdown.y,
            left: dropdown.x,
            zIndex: 9999,
          }}
          className="bg-white rounded-lg shadow-lg border border-[#E8EBED] py-2 w-48"
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => handleViewProfile(dropdown.row.id)}
            className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
          >
            View Profile Details
          </button>
          <button
            onClick={() => handleSuspendUser(dropdown.row)}
            className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
          >
            Suspend User
          </button>
          <button
            onClick={() => handleViewTransactionHistory(dropdown.row.id)}
            className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
          >
            View Transaction History
          </button>
        </div>
      )}

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