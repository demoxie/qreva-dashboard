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
  topCustomers,
  regionsData,
  transactionHistoryData,
  airtimePercentages
} from '@/constants/mockData';
import { createCustomerTransactionActions, dataProviders } from './constants';

const DataPurchase = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  
  const dataTransactions = transactionHistoryData.filter(tx => 
    tx.category === 'Data' || ['Data Bundle', 'Weekly Plan', 'Monthly Plan', 'GB'].includes(tx.desc),
  );

  // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/data/details/region/${regionId}`);
  };

  // Transaction actions
  const transactionActions = createCustomerTransactionActions({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  });

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Data Purchase"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TopTransactionValueCard 
              data={dataProviders}
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

        {/* Volume and Percentage Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TransactionVolumeChart 
              data={dailyTransactionData}
              title="Daily Transaction Volume"
            />
          </div>
          <div className="lg:col-span-1">
            <TransactionPercentagePie 
              data={airtimePercentages}
              title="Top % Purchase from Customers"
              wrapped={true}
            />
          </div>
        </div>

        <RegionsTable 
          data={regionsData} 
          title="Top Regions"
          onViewDetails={handleViewRegionDetails}
        />

        <TransactionHistoryTable 
          data={dataTransactions}
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

export default DataPurchase;