import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import DashboardStats from '@/components/base/DashboardStats';

const AgentDashboard = ({ 
  formattedStats, 
  metrics, 
  transactions,
  pagination,
  handlePageChange,
  handleSearch,
  handleFilter,
  isTransactionsLoading
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PaymentComparisonPie
          data={metrics.softPosPaymentBreakdown}
          title="Card Payments vs QR Payments %"
          showPercentage={true}
        />
        <PaymentComparisonPie
          data={metrics.transferStatusBreakdown}
          title="Transfer Status %"
          showPercentage={true}
        />
      </div>

      {/* Transaction History */}
      <TransactionHistoryTable
        data={transactions}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilter={handleFilter}
        isLoading={isTransactionsLoading}
      />
    </>
  );
};

export default AgentDashboard;