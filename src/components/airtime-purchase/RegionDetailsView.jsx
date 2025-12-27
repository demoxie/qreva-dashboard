import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { regionsData, transactionHistoryData } from '@/constants/mockData';
import { getRegionStats, regionTransactionActions } from '@/pages/airtimePurchase/constants';

const RegionDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState('Today');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const region = regionsData.find(r => r.id === Number(id));
  if (!region) return <div>Region not found</div>;

  const transactions = transactionHistoryData.filter(
    tx => tx.location === region.location
  );



  return (
    <>
      <PageHeader
        title={`${region.location} State`}
        subtitle="Here is how this location has been performing so far"
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />

      <DashboardStats stats={getRegionStats(region)} />

      <TransactionHistoryTable
        data={transactions}
        title="Transactions"
        actions={regionTransactionActions}
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
    </>
  );
};

export default RegionDetailsView;
