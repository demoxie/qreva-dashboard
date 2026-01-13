import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import RegionsTable from '@/components/tables/RegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import DashboardStats from '@/components/base/DashboardStats';

const AdminDashboard = ({ 
  formattedStats, 
  metrics, 
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

      {/* Top Transaction Value + Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TopTransactionValueCard data={metrics.topTransactionValues} />
        </div>
        <div className="lg:col-span-3">
          <TopCustomersCard data={metrics.topCustomers} title="Top Customers" />
        </div>
      </div>

      {/* Daily Transaction Volume */}
      <TransactionVolumeChart data={metrics.dailyTransactionVolume} />

      {/* Top Regions Table */}
      <RegionsTable data={metrics.topRegions} />

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

export default AdminDashboard;