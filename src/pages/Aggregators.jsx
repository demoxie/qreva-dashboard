import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import DataTable from '@/components/tables/DataTable';
import AddAggregatorModal from '@/components/modals/AddAggregatorModal';
import AggregatorAddedModal from '@/components/modals/AggregatorAddedModal';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';
import { Eye, Ban, History } from 'lucide-react';

const Aggregators = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [showAddAggregatorModal, setShowAddAggregatorModal] = useState(false);
  const [showAggregatorAddedModal, setShowAggregatorAddedModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedAggregator, setSelectedAggregator] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregator stats
  const aggregatorStats = [
    { label: 'Total Aggregators', value: '8,000', change: '10%', subtext: '2% in last 24 hours' },
    { label: 'Total Aggregators Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
    { label: 'Total Aggregators Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
    { label: 'Total aggregator Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
  ];

  // Mock aggregators data
  const aggregatorsData = [
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
    }
  ];

  // Filter aggregators based on search query
  const filteredAggregators = aggregatorsData.filter(aggregator => 
    aggregator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aggregator.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define columns for aggregators
  const columns = [
    {
      field: 'name',
      headerName: 'Aggregator Name',
      width: 250,
      renderCell: (params) => (
        <div className="flex flex-col justify-center h-full">
          <div className="text-sm font-medium">{params.row.name}</div>
          <div className="text-xs text-gray-500">{params.row.email}</div>
        </div>
      )
    },
    { 
      field: 'totalTransactions', 
      headerName: 'Total Transactions', 
      width: 150,
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
        <span className="text-sm text-gray-500 flex items-center h-full">{params.value}</span>
      )
    }
  ];

  // Define actions for the dropdown
  const tableActions = [
    {
      label: 'View Profile Details',
      icon: Eye,
      onClick: (row) => navigate(`/aggregators/${row.id}`)
    },
    {
      label: 'Suspend Aggregator',
      icon: Ban,
      onClick: (row) => {
        setSelectedAggregator(row);
        setShowSuspendModal(true);
      }
    },
    {
      label: 'View Transaction History',
      icon: History,
      onClick: (row) => navigate(`/aggregators/${row.id}?tab=transactions`)
    }
  ];

  const handleConfirmSuspend = () => {
    console.log('Suspend aggregator:', selectedAggregator);
    setShowSuspendModal(false);
    setSelectedAggregator(null);
  };

  const handleAddAggregator = (aggregatorData) => {
    console.log('Add aggregator:', aggregatorData);
    setShowAddAggregatorModal(false);
    setShowAggregatorAddedModal(true);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Aggregators"
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

        {/* Aggregator Stats */}
        <div className="flex flex-wrap w-full gap-4 mb-6">
          {aggregatorStats.map((stat, idx) => (
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

        {/* Aggregators Table */}
        <DataTable
          data={filteredAggregators}
          columns={columns}
          title="Aggregators"
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
        title="Suspend Aggregator"
        message={`Are you sure you want to suspend ${selectedAggregator?.name}?`}
        confirmText="Yes, suspend"
        confirmStyle="danger"
      />
    </div>
  );
};

export default Aggregators;