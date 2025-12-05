import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import PageHeader from '@/components/common/PageHeader';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';

const AggregatorManagers = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState({ open: false, anchor: null, row: null, x: 0, y: 0 });
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregator Manager stats
  const managerStats = [
    { label: 'Total Aggregators Manager', value: '8,000', change: '10%', subtext: '2X in last 24 hours' },
    { label: 'Total Agg. Manager Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
    { label: 'Total Agg. Manager Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
    { label: 'Total Agg. Manager Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
  ];

  // Mock aggregator managers data
  const managersData = [
    { 
      id: 1, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 40000,
      totalRevenue: 40000,
      totalCommission: 40000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 2, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 5000000,
      totalRevenue: 5000000,
      totalCommission: 5000000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 3, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 200000,
      totalRevenue: 200000,
      totalCommission: 200000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 4, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 40000000,
      totalRevenue: 40000000,
      totalCommission: 40000000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 5, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 20000,
      totalRevenue: 20000,
      totalCommission: 20000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 6, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 20000,
      totalRevenue: 20000,
      totalCommission: 20000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 7, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 20000,
      totalRevenue: 20000,
      totalCommission: 20000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 8, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 20000,
      totalRevenue: 20000,
      totalCommission: 20000,
      joinedDate: '10:00 AM | 25th March, 2025'
    },
    { 
      id: 9, 
      name: 'Rejoice Regina Rose', 
      email: 'emailaddress@gmail.com',
      totalTransactions: 100, 
      totalVolume: 20000,
      totalRevenue: 20000,
      totalCommission: 20000,
      joinedDate: '10:00 AM | 25th March, 2025'
    }
  ];

  // Filter managers based on search query
  const filteredManagers = managersData.filter(manager => 
    manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigation handlers
  const handleViewProfile = (managerId) => {
    navigate(`/aggregator-managers/${managerId}`);
    closeDropdown();
  };

  const handleSuspendManager = (manager) => {
    setSelectedManager(manager);
    setShowSuspendModal(true);
    closeDropdown();
  };

  const handleConfirmSuspend = () => {
    console.log('Suspend aggregator manager:', selectedManager);
    setShowSuspendModal(false);
    setSelectedManager(null);
  };

  const handleViewTransactionHistory = (managerId) => {
    navigate(`/aggregator-managers/${managerId}?tab=transactions`);
    closeDropdown();
  };

  const closeDropdown = () => {
    setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
  };

  // DataGrid columns
  const columns = [
    {
      field: 'name',
      headerName: 'Agg. Manager Name',
      width: 250,
      renderCell: (params) => (
        <div>
          <div className="text-sm font-medium">{params.row.name}</div>
          <div className="text-xs text-gray-500">{params.row.email}</div>
        </div>
      )
    },
    { 
      field: 'totalTransactions', 
      headerName: 'Total Transactions', 
      width: 150 
    },
    {
      field: 'totalVolume',
      headerName: 'Total Volume (₦)',
      width: 150,
      valueFormatter: (params) => params?.toLocaleString()
    },
    {
      field: 'totalRevenue',
      headerName: 'Total Revenue (₦)',
      width: 150,
      valueFormatter: (params) => params?.toLocaleString()
    },
    {
      field: 'totalCommission',
      headerName: 'Total Commission (₦)',
      width: 180,
      valueFormatter: (params) => params?.toLocaleString()
    },
    { 
      field: 'joinedDate', 
      headerName: 'Joined Date', 
      width: 180 
    },
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
          title="Aggregator Manager"
          subtitle="Here is the full list of aggregators on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          actionButton={
            <button
              onClick={() => console.log('Add Aggregator Manager')}
              className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
            >
              Add Aggregator
            </button>
          }
        />

        {/* Manager Stats */}
        <div className="flex flex-wrap w-full gap-4 mb-6">
          {managerStats.map((stat, idx) => (
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

        {/* Managers Table */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-urbanist font-semibold text-[#1E1E1E]">Aggregator Managers</h2>
              <SearchFilterBar 
                onSearch={setSearchQuery}
                onFilter={() => console.log('Filter clicked')}
              />
            </div>
          </div>
          <CardContent>
            <DataGrid
              rows={filteredManagers}
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
            onClick={() => handleSuspendManager(dropdown.row)}
            className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
          >
            Suspend Agg. Manager
          </button>
          <button
            onClick={() => handleViewTransactionHistory(dropdown.row.id)}
            className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
          >
            View Transaction History
          </button>
        </div>
      )}

      {/* Modals */}
      <ConfirmDialog
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleConfirmSuspend}
        title="Suspend Aggregator Manager"
        message={`Are you sure you want to suspend ${selectedManager?.name}?`}
        confirmText="Yes, suspend"
        confirmStyle="danger"
      />
    </div>
  );
};

export default AggregatorManagers;