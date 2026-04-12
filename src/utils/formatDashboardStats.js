export const formatDashboardStats = (summary, changePercentages = {}) => {
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

  const getChange = (val) => {
    if (val === undefined || val === null) return '0%';
    const prefix = val > 0 ? '+' : '';
    return `${prefix}${val}%`;
  };

  return [
    {
      label: 'Total Transactions',
      value: formatNumber(summary.totalTransactions || 0),
      change: getChange(changePercentages.totalTransactions),
      subtext: `${formatNumber(summary.dailyTransactions || 0)} Last 24 hours`,
    },
    {
      label: 'Total Transaction Volume',
      value: formatCurrency(summary.totalTransactionVolume || 0),
      change: getChange(changePercentages.totalTransactionVolume),
      subtext: formatCurrency(summary.dailyVolume || 0) + ' in last 24 hours',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue || 0),
      change: getChange(changePercentages.totalRevenue),
      subtext: formatCurrency(summary.dailyRevenue || 0) + ' in last 24 hours',
    },
    {
      label: 'Success Rate',
      value: `${summary.successRate || 0}%`,
      change: getChange(changePercentages.successRate),
      subtext: 'Out of last 24 hours',
    },
  ];
};