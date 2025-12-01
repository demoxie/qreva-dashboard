import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import AddAgentModal from '@/components/modals/AddAgentModal';
import AgentAddedModal from '@/components/modals/AgentAddedModal';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';

const Agents = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState({ open: false, anchor: null, row: null, x: 0, y: 0 });
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

  // Navigation handlers
  const handleViewProfile = (agentId) => {
    navigate(`/agents/${agentId}`);
    closeDropdown();
  };

  const handleSuspendAgent = (agent) => {
    setSelectedAgent(agent);
    setShowSuspendModal(true);
    closeDropdown();
  };

  const handleConfirmSuspend = () => {
    console.log('Suspend agent:', selectedAgent);
    setShowSuspendModal(false);
    setSelectedAgent(null);
  };

  const handleViewTransactionHistory = (agentId) => {
    navigate(`/agents/${agentId}?tab=transactions`);
    closeDropdown();
  };

  const handleAddAgent = (agentData) => {
    console.log('Add agent:', agentData);
    setShowAddAgentModal(false);
    setShowAgentAddedModal(true);
  };

  const closeDropdown = () => {
    setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
  };

  // DataGrid columns
  const columns = [
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

        {/* Agent Stats */}
        <div className="flex flex-wrap w-full gap-4 mb-6">
          {agentStats.map((stat, idx) => (
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

        {/* Agents Table */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-urbanist font-semibold text-[#1E1E1E]">Agents</h2>
              <SearchFilterBar 
                onSearch={setSearchQuery}
                onFilter={() => console.log('Filter clicked')}
              />
            </div>
          </div>
          <CardContent>
            <DataGrid
              rows={filteredAgents}
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
            onClick={() => handleSuspendAgent(dropdown.row)}
            className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
          >
            Suspend Agent
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