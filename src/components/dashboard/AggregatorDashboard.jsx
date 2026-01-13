import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import DashboardStats from '@/components/base/DashboardStats';

const AggregatorDashboard = ({ 
  formattedStats, 
  metrics, 
  cardVsQRPayments,
  transactionActions,
  handlePageChange,
  showDetailsModal,
  setShowDetailsModal,
  showShareModal,
  setShowShareModal,
  selectedTransaction
}) => {
  return (
    <>
      <DashboardStats stats={formattedStats} route="dashboard" />

      {/* Top Transaction Value + Top % Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TopTransactionValueCard data={metrics.topTransactionValues} />
        </div>
        <div className="lg:col-span-3">
          <TransactionPercentagePie data={metrics.topPurchasePercentages} />
        </div>
      </div>

      {/* Daily Transaction Volume */}
      <TransactionVolumeChart data={metrics.dailyTransactionVolume} />

      {/* Top Agents + Card vs QR Payments - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopCustomersCard 
          data={metrics.topCustomers} 
          title="Top Agents"
          showTabs={true}
        />
        <PaymentComparisonPie
          data={cardVsQRPayments}
          title="Card Payments vs QR Payments %"
          showPercentage={true}
        />
      </div>

      {/* Transaction History */}
      <TransactionHistoryTable
        data={metrics.transactions}
        actions={transactionActions}
        pagination={metrics.pagination}
        onPageChange={handlePageChange}
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

export default AggregatorDashboard;