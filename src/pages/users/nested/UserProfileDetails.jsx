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
import BusinessDetailsCard from '@/components/cards/BusinessDetailsCard';

const UserProfileDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [timeFilter, setTimeFilter] = useState('Today');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  
  // Dropdown state for actions menu
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [promotionType, setPromotionType] = useState('');

  // User data state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data based on ID
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch(`/api/users/${id}`);
        // const data = await response.json();
        
        // Mock data - replace with actual API response
        // This simulates different users based on ID
        const mockUsers = {
          '1': {
            id: '1',
            name: 'Rejoice Regina Rose',
            email: 'emailaddress@gmail.com',
            tier: 'Tier 1',
            accountType: 'Personal Account',
            firstName: 'Rejoice',
            middleName: 'Regina',
            lastName: 'Rose',
            phone: '08012345678'
          },
          '2': {
            id: '2',
            name: 'John Smith',
            email: 'john.smith@gmail.com',
            tier: 'Tier 2',
            accountType: 'Agent',
            firstName: 'John',
            middleName: '',
            lastName: 'Smith',
            phone: '08012345679'
          },
          '3': {
            id: '3',
            name: 'Mary Johnson',
            email: 'mary.j@gmail.com',
            tier: 'Tier 3',
            accountType: 'Aggregator',
            firstName: 'Mary',
            middleName: '',
            lastName: 'Johnson',
            phone: '08012345680'
          },
          '4': {
            id: '4',
            name: 'David Brown',
            email: 'david.b@gmail.com',
            tier: 'Tier 2',
            accountType: 'Aggregator Manager',
            firstName: 'David',
            middleName: '',
            lastName: 'Brown',
            phone: '08012345681'
          },
          '5': {
            id: '5',
            name: 'Sarah Williams',
            email: 'sarah.w@gmail.com',
            tier: 'Tier 1',
            accountType: 'Merchant',
            firstName: 'Sarah',
            middleName: '',
            lastName: 'Williams',
            phone: '08012345682'
          }
        };
        
        const baseUser = mockUsers[id] || mockUsers['1'];
        
        const mockUser = {
          ...baseUser,
          // Personal Account KYC Data
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
          // Business Account Data (if accountType is Agent/Aggregator/Merchant)
          businessDetails: {
            businessName: 'Rejoice Enterprises',
            businessEmail: 'business@gmail.com',
            businessPhone: '08012345679',
            businessAddress: 'A Fijma Street, Ladepo'
          },
          // Transaction stats
          stats: [
            { label: 'Total Transactions', value: '45,823', change: '+20%', subtext: '50,000 in last 24 hours' },
            { label: 'Total Transaction Volume', value: '₦4,005,823', change: '-10%', subtext: '₦50,000 in last 24 hours' },
            { label: 'Total Revenue', value: '₦1,070,823', change: '-10%', subtext: '₦80,000 in last 24 hours' },
            { label: 'Success Rate', value: '90%', change: '+2%', subtext: '2% in last 24 hours' }
          ],
          // Terminals (for Merchants/Agents)
          terminals: [
            { id: 'A', name: 'Terminal A', transactions: 45823, volume: 4005823, revenue: 1070823, commission: 100000 },
            { id: 'B', name: 'Terminal B', transactions: 25000, volume: 2000000, revenue: 500000, commission: 50000 }
          ],
          // Agents (for Aggregators)
          agents: [
            { 
              id: '1', 
              name: 'Rejoice Regina Rose', 
              email: 'emailaddress@gmail.com',
              totalTransactions: 100,
              totalVolume: 40000,
              totalRevenue: 40000,
              totalCommission: 40000,
              joinedDate: '10:00 AM | 25th March, 2025'
            }
          ]
        };
        
        setUserData(mockUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  // Transaction data
  const userTransactions = userData ? [
    { id: 1, title: userData.name, acc: userData.phone, status: 'First Time', type: 'Credit', category: 'Airtime', desc: 'Airtel Nigeria', revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025', location: 'Lagos' },
    { id: 2, title: userData.name, acc: userData.phone, status: 'Repeat Buyer', type: 'Debit', category: 'Transfer', desc: 'Bank Transfer', revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025', location: 'Lagos' },
    { id: 3, title: userData.name, acc: userData.phone, status: 'First Time', type: 'Credit', category: 'Data', desc: 'MTN Data', revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025', location: 'Lagos' }
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

  // User actions based on account type
  const getUserActions = () => {
    const actions = [
      {
        label: 'Suspend User',
        onClick: () => {
          setShowActionsMenu(false);
          setShowSuspendModal(true);
        }
      }
    ];

    // Add promotion options based on current account type
    if (userData?.accountType === 'Personal Account') {
      actions.push(
        {
          label: 'Promote To Agent',
          onClick: () => {
            setPromotionType('Agent');
            setShowActionsMenu(false);
            setShowPromoteModal(true);
          }
        },
        {
          label: 'Promote To Aggregator',
          onClick: () => {
            setPromotionType('Aggregator');
            setShowActionsMenu(false);
            setShowPromoteModal(true);
          }
        },
        {
          label: 'Promote To Agg. Manager',
          onClick: () => {
            setPromotionType('Agg. Manager');
            setShowActionsMenu(false);
            setShowPromoteModal(true);
          }
        }
      );
    }

    return actions;
  };

  const handleSuspendUser = () => {
    console.log('Suspend user:', id);
    setShowSuspendModal(false);
    // Add API call here
  };

  const handlePromoteUser = () => {
    console.log('Promote user to:', promotionType);
    setShowPromoteModal(false);
    // Add API call here
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  // Determine available tabs based on account type
  const getAvailableTabs = () => {
    const tabs = [
      { key: 'profile', label: 'Profile Details' },
      { key: 'transactions', label: 'Transaction History' }
    ];

    if (userData.accountType === 'Aggregator') {
      tabs.push({ key: 'agents', label: 'Agents' });
    }

    if (userData.accountType === 'Merchant' || userData.accountType === 'Agent') {
      tabs.push(
        { key: 'terminalA', label: 'Terminal A' },
        { key: 'terminalB', label: 'Terminal B' }
      );
    }

    return tabs;
  };

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
            user={userData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            availableTabs={getAvailableTabs()}
            showActionsMenu={showActionsMenu}
            onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
            actions={getUserActions()}
          />

          {/* Personal or Business Details based on account type */}
          {userData.accountType === 'Personal Account' ? (
            <>
              <PersonalDetailsCard user={userData} />
              <TierDetailsCard tier={1} data={userData.tier1} />
              <TierDetailsCard tier={2} data={userData.tier2} />
              <TierDetailsCard tier={3} data={userData.tier3} />
            </>
          ) : (
            <>
              <PersonalDetailsCard user={userData} />
              <BusinessDetailsCard business={userData.businessDetails} />
              <TierDetailsCard tier={1} data={userData.tier1} />
              <TierDetailsCard tier={2} data={userData.tier2} />
              <TierDetailsCard tier={3} data={userData.tier3} />
            </>
          )}
        </div>

        {/* Modals */}
        <ConfirmDialog
          isOpen={showSuspendModal}
          onClose={() => setShowSuspendModal(false)}
          onConfirm={handleSuspendUser}
          title="Suspend User"
          message="Are you sure you want to suspend this user?"
          confirmText="Yes, suspend"
          confirmStyle="danger"
        />

        <ConfirmDialog
          isOpen={showPromoteModal}
          onClose={() => setShowPromoteModal(false)}
          onConfirm={handlePromoteUser}
          title={`Promote to ${promotionType}`}
          message={`Are you sure you want to promote this user to ${promotionType}?`}
          confirmText="Yes, promote"
          confirmStyle="primary"
        />
      </div>
    );
  }

  // Transaction History View or Terminal/Agents View
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
          user={userData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          availableTabs={getAvailableTabs()}
          showActionsMenu={showActionsMenu}
          onToggleActionsMenu={() => setShowActionsMenu(!showActionsMenu)}
          actions={getUserActions()}
        />

        <DashboardStats stats={userData.stats} />

        <TransactionHistoryTable 
          data={userTransactions}
          title={activeTab === 'agents' ? 'Agents' : 'Transactions'}
          actions={transactionActions}
        />
      </div>

      {/* Modals */}
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

export default UserProfileDetails;