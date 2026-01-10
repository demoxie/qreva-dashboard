import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import { multiLineData, chartSeries, createTransactionActions, createRegioncolumns } from './constants';
import { SoftPOSRegionsData, SoftPOSTransactions } from './Data';

const SoftPOS = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactionActions = createTransactionActions({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  })

  // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/softpos/details/region/${regionId}`);
  };

  const regionColumns = createRegioncolumns(handleViewRegionDetails);
 
  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Soft POS"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats />

        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
            <PaymentComparisonPie
            data={[
              { id: 0, value: 30, label: 'Card Payments', color: '#E85304' },
              { id: 1, value: 70, label: 'QR Payments', color: '#26C8B9' }
            ]}
            title="Card Payments vs QR Payments %"
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
          data={SoftPOSRegionsData}
          //onViewDetails={handleViewRegionDetails}
          columns={regionColumns}
        />

        <TransactionHistoryTable 
          data={SoftPOSTransactions}
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

export default SoftPOS;