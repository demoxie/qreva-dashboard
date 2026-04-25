const RANGE_SUBTEXT = {
  today: 'current day total',
  last12hours: 'in the last 1 hour',
  hourly: 'in the last 1 hour',
  weekly: 'in the last 7 days',
  monthly: 'in the last 30 days',
  yearly: 'in the last 12 months',
};

export const formatDashboardStats = (summary, changePercentages = {}, timeFilter = 'today') => {
  if (!summary) return null;

  const periodLabel = RANGE_SUBTEXT[timeFilter] || RANGE_SUBTEXT.today;

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
      label: 'Total Transaction Volume',
      value: formatNumber(summary.totalTransactions || 0),
      change: getChange(changePercentages.totalTransactions),
      subtext: `${formatNumber(summary.dailyTransactions || 0)} ${periodLabel}`,
    },
    {
      label: 'Total Transaction Value',
      value: formatCurrency(summary.totalTransactionVolume || 0),
      change: getChange(changePercentages.totalTransactionVolume),
      subtext: `${formatCurrency(summary.dailyVolume || 0)} ${periodLabel}`,
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue || 0),
      change: getChange(changePercentages.totalRevenue),
      subtext: `${formatCurrency(summary.dailyRevenue || 0)} ${periodLabel}`,
    },
    {
      label: 'Success Rate',
      value: `${summary.successRate || 0}%`,
      change: getChange(changePercentages.successRate),
      subtext: `Out of ${periodLabel}`,
    },
  ];
};