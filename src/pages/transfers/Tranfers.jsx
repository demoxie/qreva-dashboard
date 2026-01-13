import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransferMetrics } from '@/store/features/dashboard/useDashboard';
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
import { createRegioncolumns, transactionColumns, createTransactionActions } from './constants';
// TODO: Import mock data for charts not available in API
import { multiLineData, barData, lineChartSeries, barChartSeries } from './data';

const Transfers = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('today');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data, isLoading, isError, refetch } = useTransferMetrics({
    range: timeFilter,
    page,
    limit,
  });

  const metrics = useMemo(() => {
    if (!data?.data) return null;
    return {
      summary: data.data.summary || {},
      topCustomers: data.data.topCustomers || [],
      topRegions: data.data.topRegions || [],
      transactions: data.data.transactions || [],
      pagination: data.data.pagination || {},
      // TODO: API doesn't provide status breakdown - using mock for now
      statusData: data.data.statusBreakdown || [
        { id: 0, value: 70, label: 'Successful', color: '#26C8B9' },
        { id: 1, value: 20, label: 'Pending', color: '#FFA500' },
        { id: 2, value: 10, label: 'Failed', color: '#E85304' }
      ],
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
    navigate(`/transfers/details/region/${regionId}`);
  };

  const regionColumns = createRegioncolumns(handleViewRegionDetails);

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

        {/* TODO: API doesn't provide multi-line chart data - using mock */}
        <MultiLineChart 
          data={multiLineData}
          series={lineChartSeries}
          title="Daily Transaction Volume"
        />

        {/* TODO: API doesn't provide bar chart data - using mock */}
        <BarChartComponent 
          data={barData}
          series={barChartSeries}
          title="Daily Transaction Count"
        />

        <RegionsTable 
          data={metrics.topRegions}
          onViewDetails={handleViewRegionDetails}
          columns={regionColumns}
        />

        <DataTable 
          data={metrics.transactions}
          title="Transactions"
          actions={transactionActions}
          columns={transactionColumns}
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

export default Transfers;