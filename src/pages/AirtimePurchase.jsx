import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import RegionsTable from '@/components/tables/RegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import {
  dailyTransactionData,
  topTransactionTypes,
  airtimePercentages,
  topCustomers,
  regionsData,
  transactionHistoryData,
  airtimeProviders
} from '@/constants/mockData';

const AirtimePurchase = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Filter data for Airtime specific transactions
  const airtimeTransactionTypes = topTransactionTypes.filter(item => 
    ['Airtel', 'MTN', 'Glo', 'Etisalat', '9Mobile'].includes(item.name)
  );

  const airtimeTransactions = transactionHistoryData.filter(tx => 
    tx.category === 'Airtime' || ['Airtel Nigeria', 'MTN', 'Glo', 'Etisalat'].includes(tx.desc)
  );

  // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/airtime/details/region/${regionId}`);
  };

  // Transaction actions - defined in parent, passed to table
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
    },
    {
      label: 'View Transaction History',
      type: 'history',
      onClick: (transaction) => {
        navigate(`/airtime/details/transaction/${transaction.id}`);
      }
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        {/* Page Header */}
        <PageHeader
          title="Airtime Purchase"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        {/* Stats Cards - Uses default stats */}
        <DashboardStats />

        {/* Charts Section - 40-60 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TopTransactionValueCard 
              data={airtimeProviders}
              title="Top Transaction Value"
            />
          </div>
          <div className="lg:col-span-3">
            <TopCustomersCard 
              data={topCustomers} 
              title="Top Customers"
              showAgentToggle={true}
            />
          </div>
        </div>

        {/* Transaction Volume and Percentage Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 ">
            <TransactionVolumeChart 
              data={dailyTransactionData}
              title="Daily Transaction Volume"
            />
          </div>
          <div className="lg:col-span-1 ">
            <TransactionPercentagePie 
              data={airtimePercentages}
              title="Top % Purchase from Customers"
            />
          </div>
        </div>

        {/* Top Regions Table */}
        <RegionsTable 
          data={regionsData}
          title="Top Regions"
          onViewDetails={handleViewRegionDetails}
        />

        {/* Transaction History Table */}
        <TransactionHistoryTable 
          data={airtimeTransactions}
          title="Transactions"
          actions={transactionActions}
        />
      </div>

      {/* External Modals */}
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

export default AirtimePurchase;