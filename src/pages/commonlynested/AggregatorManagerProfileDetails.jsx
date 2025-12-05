import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import UserProfileHeader from '@/components/base/UserProfileHeader';
import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import BusinessDetailsCard from '@/components/cards/BusinessDetailsCard';
import TierDetailsCard from '@/components/cards/TierDetailsCard';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';

const AggregatorManagerProfileDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [loading, setLoading] = useState(true);
  const [managerData, setManagerData] = useState(null);
  const [aggregatorDropdown, setAggregatorDropdown] = useState({ open: false, row: null, x: 0, y: 0 });
  const [agentDropdown, setAgentDropdown] = useState({ open: false, row: null, x: 0, y: 0 });
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sync URL with Tab State
  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Fetch Data (Mock)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock Data specifically for an Aggregator Manager
        const mockData = {
          id: id,
          name: 'Rejoice Regina Rose',
          email: 'emailaddress@gmail.com',
          accountType: 'Aggregator Manager',
          tier: 'Tier 3',
          phone: '08012345678',
          address: '9, Figma Street, Ladipo',
          
          // Personal & Business Details
          businessDetails: {
            businessName: 'Rejoice Enterprises',
            businessEmail: 'business@gmail.com',
            businessPhone: '08012345679',
            businessAddress: 'A Fijma Street, Ladepo'
          },
          tier1: { validId: 'BVN', bvnNumber: '2018****190' },
          tier2: { validId: 'NIN', ninNumber: '2018****190', photo: '/path/to/nin.jpg' },
          tier3: { state: 'Lagos', lga: 'Alimosho', address: 'A Fijma Street...', documentType: 'Utility Bill', document: '/path/doc.jpg' },

          // Tab 2: Transaction Stats
          cardQRStats: [
            { label: 'Total SoftPOS Transactions', value: '45,823', change: '10%', subtext: '50,000 in last 24 hours' },
            { label: 'Total Transactions Volume', value: '₦4,005,823', change: '10%', subtext: '₦50,000 in last 24 hours' },
            { label: 'Your Commission', value: '₦1,070,823', change: '10%', subtext: '₦60,000 in last 24 hours' },
            { label: 'Total Manager Commission', value: '₦570,823', change: '10%', subtext: '₦100,000 in last 24 hours' }
          ],
          chartData: [
            { date: 'Today', cardPayments: 850, qrPayments: 700 },
            { date: 'Yesterday', cardPayments: 800, qrPayments: 650 },
            { date: '2 Days Ago', cardPayments: 750, qrPayments: 600 },
            { date: '3 Days Ago', cardPayments: 820, qrPayments: 680 },
          ],

          // Tab 3: Aggregators Data (Specific to Managers)
          aggregatorsStats: [
            { label: 'Total Aggregators', value: '8,000', change: '10%', subtext: '2% in last 24 hours' },
            { label: 'Total Aggregators Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
            { label: 'Total Aggregators Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
            { label: 'Total Aggregators Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
          ],
          aggregatorsList: [
            { id: 101, name: 'Rejoice Regina Rose', email: 'email@gmail.com', totalTransactions: 100, totalVolume: 40000, totalRevenue: 40000, totalCommission: 40000, joinedDate: '10:00 AM | 25th March, 2025' },
            { id: 102, name: 'John Doe', email: 'john@gmail.com', totalTransactions: 150, totalVolume: 5000000, totalRevenue: 5000000, totalCommission: 5000000, joinedDate: '10:00 AM | 25th March, 2025' },
          ],

          // Tab 4: Agents Data
          agentsStats: [
            { label: 'Total Agents', value: '8,000', change: '10%', subtext: '2% in last 24 hours' },
            { label: 'Total Agents Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
            { label: 'Total Agents Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
            { label: 'Total Agents Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
          ],
          agentsList: [
            { id: 201, name: 'Agent Smith', email: 'agent@gmail.com', totalTransactions: 100, totalVolume: 40000, totalRevenue: 40000, totalCommission: 40000, joinedDate: '10:00 AM | 25th March, 2025' },
          ]
        };
        setManagerData(mockData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  // Click Outside Handler for Dropdowns
  useEffect(() => {
    const handleClickOutside = () => {
      setAggregatorDropdown({ open: false, row: null, x: 0, y: 0 });
      setAgentDropdown({ open: false, row: null, x: 0, y: 0 });
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // --- Configuration ---

  const tabs = [
    { key: 'profile', label: 'Profile Details' },
    { key: 'transactions', label: 'Transaction History' },
    { key: 'aggregators', label: 'Aggregators' }, // The Key Difference
    { key: 'agents', label: 'Agents' }
  ];

  const managerActions = [
    { label: 'Suspend Account', onClick: () => { setShowActionsMenu(false); setShowSuspendModal(true); } }
  ];

  // Helper for DataGrid Columns
  const renderName = (params) => (
    <div>
      <div className="text-sm font-medium text-[#1E1E1E]">{params.row.name}</div>
      <div className="text-xs text-gray-500">{params.row.email}</div>
    </div>
  );
  
  const formatCurrency = (params) => params.value?.toLocaleString();

  const getActionColumn = (setDropdown) => ({
    field: 'actions', headerName: '', width: 60, sortable: false,
    renderCell: (params) => (
      <button
        className="text-gray-400 hover:text-gray-900 p-1"
        onClick={(e) => {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          setDropdown({ open: true, row: params.row, x: rect.right - 200, y: rect.bottom + window.scrollY + 5 });
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
      </button>
    )
  });

  const aggregatorColumns = [
    { field: 'name', headerName: 'Aggregator Name', width: 220, renderCell: renderName },
    { field: 'totalTransactions', headerName: 'Total Transactions', width: 140 },
    { field: 'totalVolume', headerName: 'Total Volume (₦)', width: 150, valueFormatter: formatCurrency },
    { field: 'totalRevenue', headerName: 'Total Revenue (₦)', width: 150, valueFormatter: formatCurrency },
    { field: 'totalCommission', headerName: 'Total Commission (₦)', width: 160, valueFormatter: formatCurrency },
    { field: 'joinedDate', headerName: 'Joined Date', width: 180 },
    getActionColumn(setAggregatorDropdown)
  ];

  const agentColumns = [
    { field: 'name', headerName: 'Agent Name', width: 220, renderCell: renderName },
    { field: 'totalTransactions', headerName: 'Total Transactions', width: 140 },
    { field: 'totalVolume', headerName: 'Total Volume (₦)', width: 150, valueFormatter: formatCurrency },
    { field: 'totalRevenue', headerName: 'Total Revenue (₦)', width: 150, valueFormatter: formatCurrency },
    { field: 'totalCommission', headerName: 'Total Commission (₦)', width: 160, valueFormatter: formatCurrency },
    { field: 'joinedDate', headerName: 'Joined Date', width: 180 },
    getActionColumn(setAgentDropdown)
  ];

  if (loading || !managerData) {
    return <div className="flex-1 flex items-center justify-center h-full bg-[#F7FAFA]">Loading...</div>;
  }


  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6 pb-20">
        <PageHeader 
          title="View Profile Details" 
          subtitle="Here is the full profile details of this user" 
          timeFilter={timeFilter} 
          onTimeFilterChange={setTimeFilter} 
        />

        <UserProfileHeader 
          user={managerData} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          availableTabs={tabs}
          showActionsMenu={showActionsMenu}
          onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
          actions={managerActions}
        />

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <PersonalDetailsCard user={managerData} />
            <BusinessDetailsCard business={managerData.businessDetails} />
            <TierDetailsCard tier={1} data={managerData.tier1} />
            <TierDetailsCard tier={2} data={managerData.tier2} />
            <TierDetailsCard tier={3} data={managerData.tier3} />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <DashboardStats stats={managerData.cardQRStats} />
            <TransactionHistoryTable 
              data={[/* Mock Transactions */]} 
              title="Transaction History" 
              actions={[
                { label: 'View Details', onClick: (t) => { setSelectedTransaction(t); setShowDetailsModal(true); } },
                { label: 'Share Receipt', onClick: (t) => { setSelectedTransaction(t); setShowShareModal(true); } }
              ]} 
            />
          </div>
        )}

        {activeTab === 'aggregators' && (
          <div className="space-y-6">
            <DashboardStats stats={managerData.aggregatorsStats} />
            <Card>
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-lg">
                <h2 className="text-lg font-urbanist font-semibold text-[#1E1E1E]">Aggregators</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search here..." 
                      className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-[#FF5B04]"
                    />
                    <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12m-9 6h6"/></svg>
                    Filter
                  </button>
                </div>
              </div>
              <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={managerData.aggregatorsList}
                  columns={aggregatorColumns}
                  checkboxSelection
                  disableRowSelectionOnClick
                  pageSizeOptions={[5, 10, 20]}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  sx={{ border: 0, '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F9FAFB' } }}
                />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <DashboardStats stats={managerData.agentsStats} />
            <Card>
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-lg">
                <h2 className="text-lg font-urbanist font-semibold text-[#1E1E1E]">Agents</h2>
                <div className="flex gap-3">
                  <input type="text" placeholder="Search here..." className="pl-4 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64" />
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600">Filter</button>
                </div>
              </div>
              <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={managerData.agentsList}
                  columns={agentColumns}
                  checkboxSelection
                  disableRowSelectionOnClick
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  sx={{ border: 0, '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F9FAFB' } }}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
      
      {/* Aggregator Actions Dropdown */}
      {aggregatorDropdown.open && (
        <div 
          className="fixed bg-white rounded-lg shadow-xl border border-gray-100 w-56 py-1 z-50"
          style={{ top: aggregatorDropdown.y, left: aggregatorDropdown.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => navigate(`/aggregators/${aggregatorDropdown.row.id}`)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span className="text-gray-400">👁️</span> View Profile Details
          </button>
          <button onClick={() => { /* Suspend Logic */ }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span className="text-gray-400">🚫</span> Suspend Aggregator
          </button>
          <button onClick={() => navigate(`/aggregators/${aggregatorDropdown.row.id}?tab=transactions`)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span className="text-gray-400">📄</span> View Transaction History
          </button>
        </div>
      )}

      {/* Agent Actions Dropdown */}
      {agentDropdown.open && (
        <div 
          className="fixed bg-white rounded-lg shadow-xl border border-gray-100 w-56 py-1 z-50"
          style={{ top: agentDropdown.y, left: agentDropdown.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => navigate(`/agents/${agentDropdown.row.id}`)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span className="text-gray-400">👁️</span> View Profile Details
          </button>
          <button onClick={() => { /* Suspend Logic */ }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span className="text-gray-400">🚫</span> Suspend Agent
          </button>
          <button onClick={() => navigate(`/agents/${agentDropdown.row.id}?tab=transactions`)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <span className="text-gray-400">📄</span> View Transaction History
          </button>
        </div>
      )}

      {/* --- MODALS --- */}
      <ConfirmDialog
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={() => { console.log('Suspended'); setShowSuspendModal(false); }}
        title="Suspend Manager"
        message="Are you sure you want to suspend this Aggregator Manager account?"
        confirmText="Yes, Suspend"
        confirmStyle="danger"
      />
      
      <TransactionDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        transaction={selectedTransaction}
      />

      <ShareReceiptModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default AggregatorManagerProfileDetails;