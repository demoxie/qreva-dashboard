import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { transactionHistoryData } from '@/constants/mockData';
import { createCustomerStats, createCustomerTransactionActions } from '@/pages/airtimePurchase/constants';

const TransactionDetailsView = () => {
  const { id } = useParams();

  const [timeFilter, setTimeFilter] = useState('Today');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const transaction = transactionHistoryData.find(
    tx => tx.id === Number(id)
  );

  if (!transaction) return <div>Transaction not found</div>;

  const customerTransactions = useMemo(
    () =>
      transactionHistoryData.filter(
        tx => tx.title === transaction.title
      ),
    [transaction.title]
  );

  const stats = createCustomerStats(transaction);

  const actions = createCustomerTransactionActions(
    (tx) => {
      setSelectedTransaction(tx);
      setShowDetailsModal(true);
    },
    (tx) => {
      setSelectedTransaction(tx);
      setShowShareModal(true);
    }
  );

  return (
    <>
      <PageHeader
        title="Transaction History"
        subtitle="Here is the full airtime transaction history for this user"
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />

      <DashboardStats stats={stats} />

      <TransactionHistoryTable
        data={customerTransactions}
        title="Transactions"
        actions={actions}
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

export default TransactionDetailsView;
