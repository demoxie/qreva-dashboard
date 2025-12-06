import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import AddAgentModal from '@/components/modals/AddAgentModal';
import AgentAddedModal from '@/components/modals/AgentAddedModal';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';

const Agents = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showAgentAddedModal, setShowAgentAddedModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Agent stats
  const agentStats = [
    { label: 'Total Agents', value: '8,000', change: '10%', subtext: '2% in last 24 hours' },
    { label: 'Total Agents Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
    { label: 'Total Agents Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
    { label: 'Total Agents Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
  ];

  // Mock agents data
  const agentsData = [
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

  // Filter agents based on search query
  const filteredAgents = agentsData.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmSuspend = () => {
    console.log('Suspend agent:', selectedAgent);
    setShowSuspendModal(false);
    setSelectedAgent(null);
  };



  const handleAddAgent = (agentData) => {
    console.log('Add agent:', agentData);
    setShowAddAgentModal(false);
    setShowAgentAddedModal(true);
  };

  // DataGrid columns
  const columns = [
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
      width: 150 ,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
          {params.value}
          </span>
      )
    },
    {    
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
        <span className='className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full"'>
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
        <span className="text-sm text-[#1E1E1E] font-general  flex flex-wrap items-center h-full">{params.value}</span>
      )
    },
  ];

     const tableActions = [
      {
        label: 'View Profile Details',
        icon: CustomEye,
        onClick: (row) => navigate(`/agents/${row.id}`)
      },
      {
        label: 'Suspend Agent',
        icon: CustomUser,
        onClick: (row) => {
          setSelectedAgent(row);
          setShowSuspendModal(true);
        }
      },
      {
        label: 'View Transaction History',
        icon: CustomHistory,
        onClick: (row) => navigate(`/agents/${row.id}?tab=transactions`)
      }
    ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Agents"
          subtitle="Here is the full list of agents on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          actionButton={
            <button
              onClick={() => setShowAddAgentModal(true)}
              className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
            >
              Add Agent
            </button>
          }
        />

        <DashboardStats
         stats={agentStats}
         />

    
        <DataTable
          className='font-general'
          data={filteredAgents}
          columns={columns}
          title='Agents'
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
      </div>


      {/* Modals */}
      <AddAgentModal
        isOpen={showAddAgentModal}
        onClose={() => setShowAddAgentModal(false)}
        onSubmit={handleAddAgent}
      />

      <AgentAddedModal
        isOpen={showAgentAddedModal}
        onClose={() => setShowAgentAddedModal(false)}
      />

      <ConfirmDialog
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleConfirmSuspend}
        title="Suspend Agent"
        message={`Are you sure you want to suspend ${selectedAgent?.name}?`}
        confirmText="Yes, suspend"
        confirmStyle="danger"
      />
    </div>
  );
};

export default Agents;