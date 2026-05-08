import { useNavigate } from 'react-router-dom';
import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import RegionsTable from '@/components/tables/RegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import DashboardStats from '@/components/base/DashboardStats';

const AdminDashboard = ({
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
  const navigate = useNavigate();

  const handleViewRegionDetails = (regionId) => {
    navigate(`/dashboard/details/region/${regionId}`);
  };

  return (
    <>
      <DashboardStats stats={formattedStats} route="dashboard" />

      {/* Top Transaction Value + Top Performing Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TopTransactionValueCard data={metrics.topTransactionValues} />
        </div>
        <div className="lg:col-span-3">
          <TopCustomersCard data={metrics.topCustomers} agentsData={metrics.topAgents} />
        </div>
      </div>

      {/* Top % Purchase from Customers */}
      <div className="mb-6">
        <TransactionPercentagePie data={metrics.topPurchasePercentages} title="Top % Purchase from Customers" />
      </div>

      {/* Daily Transaction Value */}
      <TransactionVolumeChart data={metrics.dailyTransactionVolume} timeFilter={timeFilter} />

      {/* Top Regions Table */}
      <RegionsTable data={metrics.topRegions} onViewDetails={handleViewRegionDetails} />

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

export default AdminDashboard;