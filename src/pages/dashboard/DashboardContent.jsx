import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardMetrics } from '@/store/features/dashboard/useDashboard';
import { useEarnings } from '@/store/features/earnings/useEarnings';
import { useTransactions } from '@/store/features/transactions/useTransactions';
import { useUserMetrics } from '@/store/features/users/useUsers';
import { formatDashboardStats } from '@/utils/formatDashboardStats';
import PageHeader from '@/components/common/PageHeader';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import AgentDashboard from '@/components/dashboard/AgentDashboard';
import AggregatorDashboard from '@/components/dashboard/AggregatorDashboard';
import CustomEye from '@/components/icons/CustomEye';
import CustomShare from '@/components/icons/CustomShare';

const DashboardContent = () => {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('today');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch dashboard metrics
  const { data, isLoading, isError, refetch } = useDashboardMetrics({
    category: 'all',
    range: timeFilter,
  });

  // Role checks
  const isAdmin = ['SuperAdmin', 'Operation', 'Support'].includes(user?.role || '');
  const isAgent = user?.role === 'agent';
  const isAggregator = user?.role === 'aggregator';
  const isAggregatorManager = user?.role === 'aggregator_manager';
  const isPortalUpline = isAggregator || isAggregatorManager;

  const { data: earningsResponse } = useEarnings({
    enabled: isPortalUpline,
  });
  const { data: userMetricsResponse } = useUserMetrics(
    isPortalUpline ? { range: timeFilter } : {},
  );

  // Fetch transactions using the new API
  const { 
    data: transactionData, 
    isLoading: isTransactionsLoading 
  } = useTransactions({
    page,
    limit,
    search,
    status
  });

  // Extract data from API response
  const metrics = useMemo(() => {
    if (!data?.data) return null;

    return {
      summary: data.data.summary || {},
      changePercentages: data.data.changePercentages || {},
      topTransactionValues: data.data.topTransactionValues || [],
      topCustomers: data.data.topCustomers || [],
      topAgents: data.data.topAgents || [],
      dailyTransactionVolume: (data.data.dailyTransactionVolume || []).map(d => ({
        label: d.label,
        value: d.amount
      })),
      dailyTransactionCounts: (data.data.dailyTransactionCounts || []).map(d => ({
        label: d.label,
        value: d.count
      })),
      topPurchasePercentages: data.data.topPurchasePercentages || [],
      topRegions: data.data.topRegions || [],
      transferStatusBreakdown: (data.data.transferStatusBreakdown || []).map(item => ({
        id: item.status,
        value: item.percentage,
        label: item.status,
        color: item.status === 'Completed' ? '#26C8B9' : item.status === 'Pending' ? '#FFA500' : '#E85304'
      })),
      softPosPaymentBreakdown: (data.data.softPosPaymentBreakdown || []).map(item => ({
        id: item.method,
        value: item.percentage,
        label: `${item.method} Payments`,
        color: item.method === 'Card' ? '#E85304' : '#26C8B9'
      })),
      hourlyBreakdown: data.data.hourlyBreakdown || [],
      paymentRequestVolume: data.data.paymentRequestVolume || 0,
      paymentRequestDailyVolume: data.data.paymentRequestDailyVolume || [],
      paymentRequests: data.data.paymentRequests || [],
    };
  }, [data]);

  const transactions = useMemo(() => transactionData?.data || [], [transactionData]);
  const pagination = useMemo(() => transactionData?.pagination || {}, [transactionData]);

  // Format stats for DashboardStats component
  const baseFormattedStats = useMemo(() => {
    if (!metrics?.summary) return null;
    return formatDashboardStats(metrics.summary, metrics.changePercentages, timeFilter);
  }, [metrics, timeFilter]);

  const formattedStats = useMemo(() => {
    if (!baseFormattedStats) return null;
    if (!isPortalUpline) return baseFormattedStats;

    const totalEarnings = Number(earningsResponse?.data?.totalEarnings || 0);
    const totalAgents = Number(userMetricsResponse?.data?.agents || 0);
    const totalAgentsChange = String(userMetricsResponse?.data?.agentsChange || '0%');
    const formatCurrency = (amount) =>
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
      }).format(amount);
    const formatNumber = (count) =>
      new Intl.NumberFormat('en-US').format(count);

    const earningsCard = {
      label: 'Your Earnings',
      value: formatCurrency(totalEarnings),
      change: '',
      subtext: 'All-time earned on the system',
    };
    const totalAgentsCard = {
      label: 'Total Agents',
      value: formatNumber(totalAgents),
      change: totalAgentsChange,
      subtext: 'Total downline agents',
    };

    return [
      earningsCard,
      baseFormattedStats[0], // Total Transaction Volume (downline only)
      baseFormattedStats[1], // Total Transaction Value (downline only)
      totalAgentsCard,
    ].filter(Boolean);
  }, [baseFormattedStats, earningsResponse, isPortalUpline, userMetricsResponse]);

  // Transaction actions
  const transactionActions = [
    {
      label: 'View Transaction Details',
      type: 'view',
      icon: CustomEye,
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
      },
    },
    {
      label: 'Download Receipt',
      type: 'share',
      icon: CustomShare,
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowShareModal(true);
      },
    },
  ];

  // Handle time filter change
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

  const handleFilter = ({ status } = {}) => {
    setStatus(status || '');
    setPage(1);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-bold font-urbanist">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !metrics) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load dashboard data</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Common props for all dashboards
  const dashboardProps = {
    formattedStats,
    metrics,
    transactions,
    pagination,
    timeFilter,
    handlePageChange,
    handleSearch,
    handleFilter,
    isTransactionsLoading,
  };

  const modalProps = {
    showDetailsModal,
    setShowDetailsModal,
    showShareModal,
    setShowShareModal,
    selectedTransaction,
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        <PageHeader
          title="Dashboard"
          subtitle="Here is how this has been performing so far"
          breadcrumb="Dashboard"
          timeFilter={timeFilter}
          onTimeFilterChange={handleTimeFilterChange}
        />

        {/* Render appropriate dashboard based on role */}
        {isAdmin && (
          <AdminDashboard 
            {...dashboardProps}
            transactionActions={transactionActions}
            {...modalProps}
          />
        )}

        {isAgent && (
          <AgentDashboard
            {...dashboardProps}
          />
        )}

        {(isAggregator || isAggregatorManager) && (
          <AggregatorDashboard
            {...dashboardProps}
            userRole={user?.role}
            transactionActions={transactionActions}
            {...modalProps}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
