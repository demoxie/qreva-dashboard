import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoryMetrics } from '@/store/features/dashboard/useDashboard';
import { formatDashboardStats } from '@/utils/formatDashboardStats';
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
import { createRegionTransactionActions } from './constants';

// TODO: Add 'bills' category to API or use combined categories
// Currently using 'all' category - needs backend support for bills-specific category

const BillsPayment = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('today');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // TODO: API needs 'bills' category or combined electricity+cabletv
  const { data, isLoading, isError, refetch } = useCategoryMetrics('all', {
    range: timeFilter,
    page,
    limit,
  });

  const metrics = useMemo(() => {
    if (!data?.data) return null;
    return {
      summary: data.data.summary || {},
      topTransactionValues: data.data.topTransactionValues || [],
      topCustomers: data.data.topCustomers || [],
      dailyTransactionVolume: data.data.dailyTransactionVolume || [],
      topPurchasePercentages: data.data.topPurchasePercentages || [],
      topRegions: data.data.topRegions || [],
      transactions: data.data.transactions || [],
      pagination: data.data.pagination || {},
    };
  }, [data]);

  const formattedStats = useMemo(() => {
    if (!metrics?.summary) return null;
    return formatDashboardStats(metrics.summary);
  }, [metrics]);

  const handleTimeFilterChange = (newFilter) => {
    const filterMap = {
      'Today': 'today',
      'Last 12 Hours': 'last12hours',
      'Weekly': 'weekly',
      'Monthly': 'monthly',
      'Yearly': 'yearly',
    };
    setTimeFilter(filterMap[newFilter] || 'today');
    setPage(1);
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const handleViewRegionDetails = (regionId) => {
    navigate(`/bills/details/region/${regionId}`);
  };

  const transactionActions = createRegionTransactionActions({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  });

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bills payment metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !metrics) {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load bills payment metrics</p>
            <button onClick={() => refetch()} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Bills Payment"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={handleTimeFilterChange}
        />

        <DashboardStats stats={formattedStats} route="bills-payment" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TopTransactionValueCard 
              data={metrics.topTransactionValues}
              title="Top Transaction Value"
            />
          </div>
          <div className="lg:col-span-3">
            <TopCustomersCard 
              data={metrics.topCustomers} 
              title="Top Customers"
              showAgentToggle={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TransactionVolumeChart 
              data={metrics.dailyTransactionVolume}
              title="Daily Transaction Volume"
            />
          </div>
          <div className="lg:col-span-1">
            <TransactionPercentagePie 
              data={metrics.topPurchasePercentages}
              title="Top % Purchase from Customers"
              wrapped={true}
            />
          </div>
        </div>

        <RegionsTable 
          data={metrics.topRegions}
          title="Top Regions"
          onViewDetails={handleViewRegionDetails}
        />

        <TransactionHistoryTable 
          data={metrics.transactions}
          title="Transactions"
          actions={transactionActions}
          pagination={metrics.pagination}
          onPageChange={handlePageChange}
        />
      </div>

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

export default BillsPayment;