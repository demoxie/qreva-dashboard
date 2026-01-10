import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import DashboardStats from '@/components/base/DashboardStats';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import { multiLineData, bvnVsNinData, chartSeries, kycRegionsData, kycTransactions } from './Data';
import { createRegioncolumns, createTransactionActions, stats } from './constants';

const KYCVerification = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


    // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/kyc/details/region/${regionId}`);
  };

  const regionColumns = createRegioncolumns(handleViewRegionDetails);




  // Transaction actions
  const transactionActions = createTransactionActions({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  })

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="KYC Verification"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats 
         stats={stats}
        />

        {/* BVN vs NIN and Top Agents */}
        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
            <PaymentComparisonPie 
            data={bvnVsNinData}
            title="BVN VS NIN %"
          />
          </div>
          <div className='col-span-3'>
            <TopCustomersCard 
            data={topCustomers}
            title="Top Agents"
          />
          </div>
          
        </div>

        <MultiLineChart 
          data={multiLineData}
          series={chartSeries}
          title="Daily Transaction Volume"
        />

        <RegionsTable 
          data={kycRegionsData}
          onViewDetails={handleViewRegionDetails}
          columns={regionColumns}
        />

        <TransactionHistoryTable 
          data={kycTransactions}
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

export default KYCVerification;