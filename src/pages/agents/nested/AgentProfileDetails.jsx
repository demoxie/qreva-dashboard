import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import ConfirmDialog from '@/components/modals/ConfirmDialogComponent';
import UserProfileHeader from '@/components/base/UserProfileHeader';
import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import TierDetailsCard from '@/components/cards/TierDetailsCard';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import {
 cardVsQRPayments,
} from '@/constants/mockData';
import MultiLineChart from '@/components/charts/MultiLineChart';

  const multiLineData = [
    { day: 'Today', bvn: 14500, nin: 14200 },
    { day: 'Yesterday', bvn: 14200, nin: 14800 },
    { day: '2 Days Ago', bvn: 14800, nin: 14600 },
    { day: '3 Days Ago', bvn: 14600, nin: 15200 },
    { day: '4 Days Ago', bvn: 15200, nin: 15800 },
    { day: '5 Days Ago', bvn: 15800, nin: 16200 },
    { day: '6 Days Ago', bvn: 16200, nin: 15600 },
    { day: '7 Days Ago', bvn: 15600, nin: 16800 },
    { day: 'Week Ago', bvn: 16800, nin: 16200 },
    { day: '2 Weeks Ago', bvn: 16200, nin: 13800 },
    { day: '3 Weeks Ago', bvn: 13800, nin: 17200 },
    { day: '4 Weeks Ago', bvn: 17200, nin: 18000 }
  ];

  const chartSeries = [
    { data: multiLineData.map(d => d.bvn), color: '#06b6d4', label: 'BVN' },
    { data: multiLineData.map(d => d.nin), color: '#F59E0B', label: 'NIN' }
  ];

const AgentProfileDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [timeFilter, setTimeFilter] = useState('Today');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'transactions');
  
  // Dropdown state for actions menu
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // User data state
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch agent data based on ID
  useEffect(() => {
    const fetchAgentData = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        const mockAgent = {
          id: id,
          name: 'Rejoice Regina Rose',
          email: 'emailaddress@gmail.com',
          tier: 'Tier 3',
          accountType: 'Agent Account',
          firstName: 'Rejoice',
          middleName: 'Regina',
          lastName: 'Rose',
          phone: '08012345678',
          address: '9, Figma Street, Ladipo',
          status: 'Pending', // or 'Active', 'Suspended'
          // KYC Data
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
          // Transaction stats
          stats: [
            { label: 'Total SoftPOS Transactions', value: '45,823', change: '10%', subtext: '50,000 in last 24 hours' },
            { label: 'Total Transactions Volume', value: '₦4,005,823', change: '10%', subtext: '₦50,000 in last 24 hours' },
            { label: 'Your Commission', value: '₦1,070,823', change: '10%', subtext: '₦60,000 in last 24 hours' },
            { label: 'Total Agent Commission', value: '₦570,823', change: '10%', subtext: '₦100,000 in last 24 hours' }
          ],
          // Additional stats for card/QR breakdown
          cardQRStats: [
            { label: 'Total Card Payments', value: '45,823', change: '10%', subtext: '1,000 in last 24 hours' },
            { label: 'Total Card Payments Volume', value: '₦452,823', change: '10%', subtext: '₦10,000 in last 24 hours' },
            { label: 'Total QR Payment', value: '5,823', change: '10%', subtext: '200 in last 24 hours' },
            { label: 'Total QR Payment Volume', value: '₦50,823', change: '10%', subtext: '₦20,000 in last 24 hours' }
          ],
          // Chart data
          chartData: [
            { date: 'Today', cardPayments: 600, qrPayments: 400 },
            { date: 'Yesterday', cardPayments: 500, qrPayments: 350 },
            { date: '2 Days Ago', cardPayments: 450, qrPayments: 300 },
            { date: '3 Days Ago', cardPayments: 550, qrPayments: 380 },
            { date: '4 Days Ago', cardPayments: 520, qrPayments: 420 },
            { date: '5 Days Ago', cardPayments: 480, qrPayments: 360 },
            { date: '6 Days Ago', cardPayments: 580, qrPayments: 440 },
            { date: '7 Days Ago', cardPayments: 490, qrPayments: 370 },
            { date: 'Week Ago', cardPayments: 510, qrPayments: 390 },
            { date: '2 Weeks Ago', cardPayments: 530, qrPayments: 410 },
            { date: '3 Weeks Ago', cardPayments: 560, qrPayments: 430 },
            { date: '4 Weeks Ago', cardPayments: 540, qrPayments: 400 }
          ]
        };
        
        setAgentData(mockAgent);
      } catch (error) {
        console.error('Error fetching agent data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgentData();
    }
  }, [id]);

  // Transaction data
  const agentTransactions = agentData ? [
    { id: 1, title: agentData.name, acc: agentData.phone, status: 'Successful', type: 'Credit', category: 'Airtime', desc: 'Airtel Nigeria', amount: 4000, date: '10:00 AM | 25th March, 2025', location: 'Lagos' },
    { id: 2, title: agentData.name, acc: agentData.phone, status: 'Successful', type: 'Debit', category: 'Transfer', desc: 'Bank Transfer', amount: 5000, date: '10:00 AM | 25th March, 2025', location: 'Lagos' },
    { id: 3, title: agentData.name, acc: agentData.phone, status: 'Successful', type: 'Credit', category: 'Data', desc: 'MTN Data', amount: 200, date: '10:00 AM | 25th March, 2025', location: 'Lagos' }
  ] : [];

  // Transaction actions
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

  // Agent actions
  const agentActions = [
    {
      label: 'Suspend Agent',
      onClick: () => {
        setShowActionsMenu(false);
        setShowSuspendModal(true);
      }
    }
  ];

  const handleSuspendAgent = () => {
    console.log('Suspend agent:', id);
    setShowSuspendModal(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!agentData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Agent not found</div>
      </div>
    );
  }

  const availableTabs = [
    { key: 'profile', label: 'Profile Details' },
    { key: 'transactions', label: 'Transaction History' }
  ];

  // Profile Details View
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
            user={agentData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            availableTabs={availableTabs}
            showActionsMenu={showActionsMenu}
            onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
            actions={agentActions}
          />

          <PersonalDetailsCard user={agentData} />
          <TierDetailsCard tier={1} data={agentData.tier1} />
          <TierDetailsCard tier={2} data={agentData.tier2} />
          <TierDetailsCard tier={3} data={agentData.tier3} />
        </div>

        <ConfirmDialog
          isOpen={showSuspendModal}
          onClose={() => setShowSuspendModal(false)}
          onConfirm={handleSuspendAgent}
          title="Suspend Agent"
          message="Are you sure you want to suspend this agent?"
          confirmText="Yes, suspend"
          confirmStyle="danger"
        />
      </div>
    );
  }

  // Transaction History View
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
          user={agentData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          availableTabs={availableTabs}
          showActionsMenu={showActionsMenu}
          onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
          actions={agentActions}
        />

        <DashboardStats stats={agentData.stats} />
        <DashboardStats stats={agentData.cardQRStats} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie
              data={cardVsQRPayments}
              title="Card Payments vs QR Payments %"
              showPercentage={true}
            />
            <PaymentComparisonPie
              data={cardVsQRPayments}
              title="Card Payments vs QR Payments Commission"
              showPercentage={false}
              amountData={['₦4,000,000', '₦170,823']}
            />
          </div>

         <MultiLineChart 
          data={multiLineData}
          series={chartSeries}
          title="Daily Transaction Volume"
        />

        <TransactionHistoryTable 
          data={agentTransactions}
          title="Transactions"
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

export default AgentProfileDetails;