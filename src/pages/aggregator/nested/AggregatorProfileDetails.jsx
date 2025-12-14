import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';
import UserProfileHeader from '@/components/base/UserProfileHeader';
import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import BusinessDetailsCard from '@/components/cards/BusinessDetailsCard';
import TierDetailsCard from '@/components/cards/TierDetailsCard';
import MultiLineChart from '@/components/charts/MultiLineChart'; 
import { cardVsQRPayments } from '@/constants/mockData';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';

const AggregatorProfileDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [timeFilter, setTimeFilter] = useState('Today');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  
  // Dropdown state
  const [agentDropdown, setAgentDropdown] = useState({ open: false, anchor: null, row: null, x: 0, y: 0 });
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Aggregator data state
  const [aggregatorData, setAggregatorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Tab state with URL
  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Fetch aggregator data
  useEffect(() => {
    const fetchAggregatorData = async () => {
      setLoading(true);
      try {
        // Mock API call
        const mockAggregator = {
          id: id,
          name: 'Rejoice Regina Rose',
          email: 'emailaddress@gmail.com',
          tier: 'Tier 3',
          accountType: 'Aggregator',
          firstName: 'Rejoice',
          middleName: 'Regina',
          lastName: 'Rose',
          phone: '08012345678',
          address: '9, Figma Street, Ladipo',
          businessDetails: {
            businessName: 'Rejoice Enterprises',
            businessEmail: 'business@gmail.com',
            businessPhone: '08012345679',
            businessAddress: 'A Fijma Street, Ladepo'
          },
          tier1: {
            validId: 'BVN',
            bvnNumber: '2018****190'
          },
          tier2: {
            validId: 'BVN',
            bvnNumber: '2018****190',
            validId2: 'NIN',
            ninNumber: '2018****190',
            photo: '/path/to/nin-card.jpg'
          },
          tier3: {
            state: 'Lagos',
            lga: 'Alimosho',
            address: 'A Fijma Street, Ladepo',
            documentType: 'Electricity Bill',
            document: '/path/to/electricity-bill.jpg'
          },
          stats: [
            { label: 'Total Transactions', value: '45,823', change: '10%', subtext: '50,000 in last 24 hours' },
            { label: 'Total Transactions Volume', value: '₦4,005,823', change: '10%', subtext: '₦50,000 in last 24 hours' },
            { label: 'Total Revenue', value: '₦1,070,823', change: '10%', subtext: '₦60,000 in last 24 hours' },
            { label: 'Success Rate', value: '90%', change: '10%', subtext: '2% in last 24 hours' }
          ],
          agentStats: [
            { label: 'Total Agents', value: '8,000', change: '10%', subtext: '2% in last 24 hours' },
            { label: 'Total Agents Transactions', value: '50,823', change: '10%', subtext: '5,000 in last 24 hours' },
            { label: 'Total Agents Trans. Volume', value: '₦450,823', change: '10%', subtext: '₦600 in last 24 hours' },
            { label: 'Total Agents Commission', value: '₦115,823', change: '10%', subtext: '₦6,000 in last 24 hours' }
          ],
          agents: [
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
            }
          ],
          cardQRStats: [
            { label: 'Total SoftPOS Transactions', value: '45,823', change: '10%', subtext: '50,000 in last 24 hours' },
            { label: 'Total Transactions Volume', value: '₦4,005,823', change: '10%', subtext: '₦50,000 in last 24 hours' },
            { label: 'Your Commission', value: '₦1,070,823', change: '10%', subtext: '₦60,000 in last 24 hours' },
            { label: 'Total Aggregator Commission', value: '₦570,823', change: '10%', subtext: '₦100,000 in last 24 hours' }
          ],
          cardQRBreakdown: [
            { label: 'Total Card Payments', value: '45,823', change: '10%', subtext: '1,000 in last 24 hours' },
            { label: 'Total Card Payments Volume', value: '₦452,823', change: '10%', subtext: '₦10,000 in last 24 hours' },
            { label: 'Total QR Payment', value: '5,823', change: '10%', subtext: '200 in last 24 hours' },
            { label: 'Total QR Payment Volume', value: '₦50,823', change: '10%', subtext: '₦20,000 in last 24 hours' }
          ],
          chartData: [
            { date: 'Today', cardPayments: 850, qrPayments: 700 },
            { date: 'Yesterday', cardPayments: 800, qrPayments: 650 },
            { date: '2 Days Ago', cardPayments: 750, qrPayments: 600 },
            { date: '3 Days Ago', cardPayments: 820, qrPayments: 680 },
            { date: '4 Days Ago', cardPayments: 780, qrPayments: 620 },
            { date: '5 Days Ago', cardPayments: 730, qrPayments: 590 },
            { date: '6 Days Ago', cardPayments: 880, qrPayments: 720 },
            { date: '7 Days Ago', cardPayments: 790, qrPayments: 640 },
            { date: 'Week Ago', cardPayments: 810, qrPayments: 670 },
            { date: '2 Weeks Ago', cardPayments: 830, qrPayments: 690 },
            { date: '3 Weeks Ago', cardPayments: 860, qrPayments: 710 },
            { date: '4 Weeks Ago', cardPayments: 840, qrPayments: 700 }
          ]
        };
        
        setAggregatorData(mockAggregator);
      } catch (error) {
        console.error('Error fetching aggregator data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAggregatorData();
    }
  }, [id]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = () => setAgentDropdown({ open: false, row: null, x: 0, y: 0 });
    if (agentDropdown.open) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [agentDropdown.open]);

  // Transaction Actions
  const transactionActions = [
    {
      label: 'View Transaction Details',
      type: 'view',
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
      }
    },
    {
      label: 'Share Receipt',
      type: 'share',
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowShareModal(true);
      }
    }
  ];

  // Aggregator actions
  const aggregatorActions = [
    {
      label: 'Suspend Aggregator',
      onClick: () => {
        setShowActionsMenu(false);
        setShowSuspendModal(true);
      }
    }
  ];

  const handleSuspendAggregator = () => {
    console.log('Suspend aggregator:', id);
    setShowSuspendModal(false);
  };

  const agentColumns = [
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
    { field: 'totalTransactions', headerName: 'Total Transactions', width: 150 },
    {
      field: 'totalVolume',
      headerName: 'Total Volume (₦)',
      width: 150,
      valueFormatter: (params) => params.value?.toLocaleString()
    },
    {
      field: 'totalRevenue',
      headerName: 'Total Revenue (₦)',
      width: 150,
      valueFormatter: (params) => params.value?.toLocaleString()
    },
    {
      field: 'totalCommission',
      headerName: 'Total Commission (₦)',
      width: 180,
      valueFormatter: (params) => params.value?.toLocaleString()
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
          onClick={(e) => {
            e.stopPropagation(); // Stop row click
            const rect = e.currentTarget.getBoundingClientRect();
            setAgentDropdown({
              open: true,
              row: params.row,
              x: rect.right - 192, // Adjust based on your layout
              y: rect.bottom + window.scrollY + 4 // Add scrollY for correct positioning
            });
          }}
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

  const availableTabs = [
    { key: 'profile', label: 'Profile Details' },
    { key: 'transactions', label: 'Transaction History' },
    { key: 'agents', label: 'Agents' }
  ];

  // --- EARLY RETURNS ---

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!aggregatorData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Aggregator not found</div>
      </div>
    );
  }

  const chartSeries = [
    { data: aggregatorData?.chartData?.map(d => d.cardPayments) || [], color: '#06b6d4', label: 'Card Payments' },
    { data: aggregatorData?.chartData?.map(d => d.qrPayments) || [], color: '#F59E0B', label: 'QR Payments' }
  ];

  // Mock Transactions
  const aggregatorTransactions = [
    { id: 1, title: 'Transfer from VI...', category: 'Transfer', status: 'Successful', type: 'Credit', amount: 40000, date: '10:00 AM | 25th March, 2025' },
    { id: 2, title: 'Transfer to Victo...', category: 'Transfer', status: 'Successful', type: 'Debit', amount: 5000000, date: '10:00 AM | 25th March, 2025' },
    { id: 3, title: 'GoTv Subscription', category: 'Bill Payment', status: 'Successful', type: 'Debit', amount: 200000, date: '10:00 AM | 25th March, 2025' },
    { id: 4, title: 'Airtime Purchase', category: 'Airtime', status: 'Successful', type: 'Debit', amount: 40000000, date: '10:00 AM | 25th March, 2025' },
    { id: 5, title: 'Data Purchase', category: 'Data', status: 'Successful', type: 'Debit', amount: 20000, date: '10:00 AM | 25th March, 2025' }
  ];

  // --- VIEWS ---

  // 1. Profile Details View
  if (activeTab === 'profile') {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="View Profile Details"
            subtitle="Here is the full profile details of this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <UserProfileHeader
            user={aggregatorData}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            availableTabs={availableTabs}
            showActionsMenu={showActionsMenu}
            onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
            actions={aggregatorActions}
          />

          <PersonalDetailsCard user={aggregatorData} />
          {aggregatorData.businessDetails && <BusinessDetailsCard business={aggregatorData.businessDetails} />}
          <TierDetailsCard tier={1} data={aggregatorData.tier1} />
          <TierDetailsCard tier={2} data={aggregatorData.tier2} />
          <TierDetailsCard tier={3} data={aggregatorData.tier3} />
        </div>

        <ConfirmDialog
          isOpen={showSuspendModal}
          onClose={() => setShowSuspendModal(false)}
          onConfirm={handleSuspendAggregator}
          title="Suspend Aggregator"
          message="Are you sure you want to suspend this aggregator?"
          confirmText="Yes, suspend"
          confirmStyle="danger"
        />
      </div>
    );
  }

  // 2. Agents Tab View
  if (activeTab === 'agents') {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="View Profile Details"
            subtitle="Here is the full profile details of this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <UserProfileHeader
            user={aggregatorData}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            availableTabs={availableTabs}
            showActionsMenu={showActionsMenu}
            onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
            actions={aggregatorActions}
          />

          <DashboardStats stats={aggregatorData.agentStats} />

          <Card>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-urbanist font-semibold text-[#1E1E1E]">Agents</h2>
            </div>
            <CardContent>
              <DataGrid
                rows={aggregatorData.agents}
                columns={agentColumns}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' },
                  '& .MuiDataGrid-columnHeaders': { backgroundColor: '#fafafa', borderBottom: '1px solid #e0e0e0' },
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Agent Dropdown */}
        {agentDropdown.open && (
          <div
            style={{
              position: 'absolute',
              top: agentDropdown.y,
              left: agentDropdown.x,
              zIndex: 9999,
            }}
            className="bg-white rounded-lg shadow-lg border border-[#E8EBED] py-2 w-48"
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                navigate(`/agents/${agentDropdown.row.id}`);
                setAgentDropdown({ open: false, row: null, x: 0, y: 0 });
              }}
              className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7]"
            >
              View Profile Details
            </button>
            <button
              onClick={() => {
                console.log('Suspend agent:', agentDropdown.row.id);
                setAgentDropdown({ open: false, row: null, x: 0, y: 0 });
              }}
              className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7]"
            >
              Suspend Agent
            </button>
            <button
              onClick={() => {
                navigate(`/agents/${agentDropdown.row.id}?tab=transactions`);
                setAgentDropdown({ open: false, row: null, x: 0, y: 0 });
              }}
              className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7]"
            >
              View Transaction History
            </button>
          </div>
        )}
      </div>
    );
  }

  // 3. Transaction History View (Default fallback)
  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="View Profile Details"
          subtitle="Here is the full profile details of this user"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <UserProfileHeader
          user={aggregatorData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          availableTabs={availableTabs}
          showActionsMenu={showActionsMenu}
          onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
          actions={aggregatorActions}
        />

        <DashboardStats stats={aggregatorData.cardQRStats} />
        <DashboardStats stats={aggregatorData.cardQRBreakdown} />

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Card vs QR Payments Pie Chart */}
          <PaymentComparisonPie
                data={cardVsQRPayments}
                title="Card Payments vs QR Payments %"
                showPercentage={true}
              />

          {/* Card vs QR Payments Commission Pie Chart */}
           <PaymentComparisonPie
                data={cardVsQRPayments}
                title="Card Payments vs QR Payments Commission"
                showPercentage={false}
                amountData={['₦4,000,000', '₦170,823']}
              />
        </div>

        {/* Line Chart - Data passed safely */}
        <MultiLineChart 
          data={aggregatorData.chartData}
          series={chartSeries}
          title="Daily Transaction Volume"
        />

        <TransactionHistoryTable 
          data={aggregatorTransactions}
          title="Transaction History"
          actions={transactionActions}
        />
      </div>

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

export default AggregatorProfileDetails;