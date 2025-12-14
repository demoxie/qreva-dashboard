import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';
import AggregatorAddedModal from '@/components/modals/AggregatorAddedModal';
import AddAggregatorModal from '@/components/modals/AddAggregatorModal';

const AggregatorManagers = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [showAddAggregatorModal, setShowAddAggregatorModal] = useState(false);
  const [showAggregatorAddedModal, setShowAggregatorAddedModal] = useState(false);
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

  const handleConfirmSuspend = () => {
    console.log('Suspend aggregator manager:', selectedManager);
    setShowSuspendModal(false);
    setSelectedManager(null);
  };

  const handleAddAggregator = (aggregatorData) => {
    console.log('Add aggregator:', aggregatorData);
    setShowAddAggregatorModal(false);
    setShowAggregatorAddedModal(true);
  };


  // DataGrid columns
  const columns = [
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
      width: 180 ,
      renderCell: (params) => (
        <span className="text-sm font-general text-gray-500 flex items-center h-full">{params.value}</span>
      )
    },
  ];
  
    const tableActions = [
      {
        label: 'View Profile Details',
        icon: CustomEye,
        onClick: (row) => navigate(`/aggregator-managers/${row.id}`)
      },
      {
        label: 'Suspend Aggregator',
        icon: CustomUser,
        onClick: (row) => {
          setSelectedManager(row);
          setShowSuspendModal(true);
        }
      },
      {
        label: 'View Transaction History',
        icon: CustomHistory,
        onClick: (row) => navigate(`/aggregator-managers/${row.id}?tab=transactions`)
      }
    ];



  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Aggregator Manager"
          subtitle="Here is the full list of aggregators on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          actionButton={
            <button
              onClick={() => setShowAddAggregatorModal(true)}
              className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
            >
              Add Aggregator
            </button>
          }
        />

        <DashboardStats
         stats={managerStats}
        />

        {/* Managers Table */}
         <DataTable
          className='font-general'
          data={filteredManagers}
          columns={columns}
          title="Aggregator Managers"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
      </div>

      {/* Modals */}
        <AddAggregatorModal
         isOpen={showAddAggregatorModal}
         onClose={() => setShowAddAggregatorModal(false)}
         onSubmit={handleAddAggregator}
         />
          
        <AggregatorAddedModal
         isOpen={showAggregatorAddedModal}
         onClose={() => setShowAggregatorAddedModal(false)}
         />

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