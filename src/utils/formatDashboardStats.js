export const formatDashboardStats = (summary) => {
  if (!summary) return null;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format number
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return [
    {
      label: 'Total Transactions',
      value: formatNumber(summary.totalTransactions || 0),
      change: '+20%', // TODO: Calculate from historical data or get from API
      subtext: '80,000 Last 24 hours', // TODO: Get from API
    },
    {
      label: 'Total Transaction Volume',
      value: formatCurrency(summary.totalTransactionVolume || 0),
      change: '+10%', // TODO: Calculate from historical data or get from API
      subtext: formatCurrency(summary.dailyVolume || 80000) + ' in last 24 hours',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue || 0),
      change: '+15%', // TODO: Calculate from historical data or get from API
      subtext: formatCurrency(summary.dailyRevenue || 80000) + ' in last 24 hours',
    },
    {
      label: 'Success Rate',
      value: `${summary.successRate || 0}%`,
      change: summary.successRate >= 90 ? '+19%' : '-5%',
      subtext: '24 % out of 24 hours', // TODO: Get from API
    },
  ];
};