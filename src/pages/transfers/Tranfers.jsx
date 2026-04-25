import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransferMetrics } from '@/store/features/dashboard/useDashboard';
import { useTransactions } from '@/store/features/transactions/useTransactions';
import { formatDashboardStats } from '@/utils/formatDashboardStats';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import RegionsTable from '@/components/tables/RegionsTable';
import DataTable from '@/components/tables/DataTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { transactionColumns, createTransactionActions } from './constants';

const Transfers = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('today');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data, isLoading, isError, refetch } = useTransferMetrics({
    range: timeFilter,
  });

  // Fetch transactions using the new API
  const { 
    data: transactionData, 
    isLoading: isTransactionsLoading 
  } = useTransactions({
    typeCategory: 'Transfer',
    page,
    limit,
    search,
    ...filters
  });

  const metrics = useMemo(() => {
    if (!data?.data) return null;
    return {
      summary: data.data.summary || {},
      changePercentages: data.data.changePercentages || {},
      topCustomers: data.data.topCustomers || [],
      topRegions: data.data.topRegions || [],
      statusData: (data.data.transferStatusBreakdown || []).map(item => ({
        id: item.status,
        value: item.percentage,
        label: item.status,
        color: item.status === 'Completed' ? '#26C8B9' : item.status === 'Pending' ? '#FFA500' : '#E85304'
      })),
      dailyTransactionCounts: (data.data.dailyTransactionCounts || []).map(d => ({
        label: d.label,
        value: d.count
      })),
      dailyTransactionVolume: (data.data.dailyTransactionVolume || []).map(d => ({
        label: d.label,
        value: d.amount
      })),
    };
  }, [data]);

  const transactions = useMemo(() => transactionData?.data || [], [transactionData]);
  const pagination = useMemo(() => transactionData?.pagination || {}, [transactionData]);

  const formattedStats = useMemo(() => {
    if (!metrics?.summary) return null;
    return formatDashboardStats(metrics.summary, metrics.changePercentages, timeFilter);
  }, [metrics, timeFilter]);

  const handleTimeFilterChange = (newFilter) => {
    const filterMap = {
      'Today': 'today',
      'Hourly': 'hourly',
      'Weekly': 'weekly',
      'Monthly': 'monthly',
      'Yearly': 'yearly',
    };
    setTimeFilter(filterMap[newFilter] || 'today');
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const handleViewRegionDetails = (regionId) => {
    navigate(`/transfers/details/region/${regionId}`);
  };

  const transactionActions = createTransactionActions({
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
            <p className="text-gray-600">Loading transfer metrics...</p>
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
            <p className="text-red-600 mb-4">Failed to load transfer metrics</p>
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
          title="Transfers"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={handleTimeFilterChange}
        />

        <DashboardStats stats={formattedStats} route="transfers" />

        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
            <PaymentComparisonPie data={metrics.statusData} />
          </div>
          <div className='col-span-3'>
            <TopCustomersCard 
              data={metrics.topCustomers}
              title="Top Users"
            />
          </div>
        </div>

        <MultiLineChart
          data={metrics.dailyTransactionVolume}
          series={[{ data: (metrics.dailyTransactionVolume || []).map(d => d.value), color: '#B54103', label: 'Value' }]}
          title="Daily Transaction Value"
        />

        {/* Use actual dailyTransactionCounts from API */}
        <BarChartComponent 
          data={metrics.dailyTransactionCounts}
          series={[{ data: (metrics?.dailyTransactionCounts || []).map(d => d.value), color: '#FF5B04' }]}
          title="Daily Transaction Count"
        />

        <RegionsTable
          data={metrics.topRegions}
          onViewDetails={handleViewRegionDetails}
        />

        <DataTable 
          data={transactions}
          title="Transactions"
          actions={transactionActions}
          columns={transactionColumns}
          pagination={pagination}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onFilter={handleFilter}
          isLoading={isTransactionsLoading}
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

export default Transfers;