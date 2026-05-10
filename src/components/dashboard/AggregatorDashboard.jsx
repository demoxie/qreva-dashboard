import { useMemo } from 'react';
import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import DashboardStats from '@/components/base/DashboardStats';

const EXCLUDED_CATEGORIES = ['airtime', 'data', 'bills', 'bill', 'bill payment', 'data purchase', 'airtime purchase'];

const AggregatorDashboard = ({
  formattedStats,
  metrics,
  transactions,
  pagination,
  timeFilter,
  transactionActions,
  handlePageChange,
  handleSearch,
  handleFilter,
  showDetailsModal,
  setShowDetailsModal,
  showShareModal,
  setShowShareModal,
  selectedTransaction,
  isTransactionsLoading
}) => {
  // Filter out airtime, data, bills from pie chart data (Observation #09)
  const filteredPurchasePercentages = useMemo(() => {
    return (metrics.topPurchasePercentages || []).filter(
      item => !EXCLUDED_CATEGORIES.includes((item.label || item.provider || '').toLowerCase())
    );
  }, [metrics.topPurchasePercentages]);

  return (
    <>
      <DashboardStats stats={formattedStats} route="dashboard" />

      {/* Top Transaction Value + Top % Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TopTransactionValueCard data={metrics.topTransactionValues} />
        </div>
        <div className="lg:col-span-3">
          <TransactionPercentagePie data={filteredPurchasePercentages} title="Top % Purchase from Customers" />
        </div>
      </div>

      {/* Daily Transaction Value */}
      <TransactionVolumeChart data={metrics.dailyTransactionVolume} timeFilter={timeFilter} />

      {/* Top Customers + Card vs QR Payments - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopCustomersCard
          data={metrics.topCustomers}
          agentsData={metrics.topAgents}
          title="Top Customers"
          showAgentToggle={true}
        />
        <PaymentComparisonPie
          data={metrics.softPosPaymentBreakdown}
          title="Card Payments vs QR Payments %"
          showPercentage={true}
        />
      </div>

      {/* Top Performing Regions (Observation #06) */}
      <RegionsTable data={metrics.topRegions} title="Top Performing Regions" />

      {/* Transaction History */}
      <TransactionHistoryTable
        data={transactions}
        actions={transactionActions}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilter={handleFilter}
        isLoading={isTransactionsLoading}
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