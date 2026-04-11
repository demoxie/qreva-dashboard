import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import { useTransactions } from '@/store/features/transactions/useTransactions';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import DashboardStats from '@/components/base/DashboardStats';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import { useCategoryMetrics } from '@/store/features/dashboard/useDashboard';
import { formatDashboardStats } from '@/utils/formatDashboardStats';
import { createRegioncolumns, createTransactionActions } from './constants';
import { useMemo } from 'react';

const KYCVerification = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  const handleViewRegionDetails = (regionId) => {
    navigate(`/kyc/details/region/${regionId}`);
  };

  const regionColumns = createRegioncolumns(handleViewRegionDetails);

  const {
    data: kycMetricsData, 
    isLoading: isMetricsLoading,
    isError: isMetricsError
  } = useCategoryMetrics('kyc', { range: timeFilter.toLowerCase() });

  const metrics = useMemo(() => {
    if (!kycMetricsData?.data) return null;
    return {
      summary: kycMetricsData.data.summary || {},
      changePercentages: kycMetricsData.data.changePercentages || {},
      topTransactionValues: kycMetricsData.data.topTransactionValues || [],
      topCustomers: kycMetricsData.data.topCustomers || [],
      dailyTransactionVolume: (kycMetricsData.data.dailyTransactionVolume || []).map(d => ({
        label: d.label,
        value: d.amount
      })),
      topRegions: kycMetricsData.data.topRegions || [],
      bvnVsNin: [
        { id: 'BVN', value: kycMetricsData.data.summary?.bvnPercentage || 60, label: 'BVN', color: '#26C8B9' },
        { id: 'NIN', value: kycMetricsData.data.summary?.ninPercentage || 40, label: 'NIN', color: '#E85304' }
      ]
    };
  }, [kycMetricsData]);

  // Fetch transactions using the new API
  const { 
    data: transactionData, 
    isLoading: isTransactionsLoading 
  } = useTransactions({
    typeCategory: 'KYC',
    page: 1,
    limit: 10
  });

  const transactions = transactionData?.data || [];
  const pagination = transactionData?.pagination || {};

  const formattedStats = useMemo(() => {
    if (!metrics?.summary) return null;
    return formatDashboardStats(metrics.summary, metrics.changePercentages);
  }, [metrics]);




  // Transaction actions
  const transactionActions = createTransactionActions({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  })

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="KYC Verification"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats 
         stats={formattedStats}
        />

        {/* BVN vs NIN and Top Customers */}
        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
            <PaymentComparisonPie 
              data={metrics?.bvnVsNin || []}
              title="BVN VS NIN %"
            />
          </div>
          <div className='col-span-3'>
            <TopCustomersCard 
              data={metrics?.topCustomers || []}
              title="Top Customers"
            />
          </div>
        </div>

        <MultiLineChart 
          data={metrics?.dailyTransactionVolume || []}
          series={[{ data: (metrics?.dailyTransactionVolume || []).map(d => d.value), color: '#26C8B9', label: 'Volume' }]}
          title="Daily Transaction Volume"
        />

        <RegionsTable
          data={metrics?.topRegions || []}
          onViewDetails={handleViewRegionDetails}
          columns={regionColumns}
        />

        <TransactionHistoryTable 
          data={transactions}
          title="Transactions"
          actions={transactionActions}
          pagination={pagination}
          isLoading={isTransactionsLoading}
        />
      </div>

      {/* External Modals */}
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

export default KYCVerification;