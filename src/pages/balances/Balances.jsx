import { useMemo, useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { useBalancesSummary } from '@/store/features/dashboard/useDashboard';
import DashboardStats from '@/components/base/DashboardStats';

const RANGE_MAP = {
  Today: 'today',
  Hourly: 'hourly',
  Weekly: 'weekly',
  Monthly: 'monthly',
  Yearly: 'yearly',
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `₦${amount.toLocaleString('en-NG')}`;
};

const Balances = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const queryParams = useMemo(
    () => ({
      range: timeFilter,
      from: from || undefined,
      to: to || undefined,
    }),
    [timeFilter, from, to],
  );

  const { data, isLoading, isError, refetch } = useBalancesSummary(queryParams);

  const summary = data?.data?.period?.summary || {};
  const reconciliation = data?.data?.reconciliation || {};

  const cards = [
    {
      label: 'Total Wallet Balance',
      value: formatCurrency(reconciliation.totalCustomerWalletBalance),
      change: '',
      subtext: '',
    },
    {
      label: 'Total Commission Made',
      value: formatCurrency(summary.totalCommission),
      change: '',
      subtext: '',
    },
    {
      label: 'Total Aggregator/Manager Commission',
      value: formatCurrency(summary.totalUplineCommission),
      change: '',
      subtext: '',
    },
    {
      label: 'Total Charges',
      value: formatCurrency(summary.totalCharges),
      change: '',
      subtext: '',
    },
    {
      label: 'Total VAT',
      value: formatCurrency(summary.totalVat),
      change: '',
      subtext: '',
    },
    {
      label: 'Total Stamp Duty',
      value: formatCurrency(summary.totalStampDuty),
      change: '',
      subtext: '',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue),
      change: '',
      subtext: '',
    },
    {
      label: 'Net Revenue After Commissions',
      value: formatCurrency(summary.netRevenueAfterCommissions),
      change: '',
      subtext: '',
    },
  ];

  const handleTimeFilterChange = (label) => {
    setTimeFilter(RANGE_MAP[label] || 'today');
  };

  const clearCustomRange = () => {
    setFrom('');
    setTo('');
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <div className="text-sm text-[#7C8D96]">Loading balances summary...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <p className="mb-4 text-sm text-red-600">Failed to fetch balances summary.</p>
          <button
            onClick={() => refetch()}
            className="rounded-md bg-[#FF6B2C] px-4 py-2 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6 pb-16 min-h-full">
        <PageHeader
          title="Balances"
          subtitle="Accounting and reconciliation summary across transactions"
          timeFilter={timeFilter}
          onTimeFilterChange={handleTimeFilterChange}
        />

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-[#7C8D96]">From</label>
            <input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="h-10 w-full rounded-md border border-[#D7DEE3] bg-white px-3 text-sm"
            />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-[#7C8D96]">To</label>
            <input
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="h-10 w-full rounded-md border border-[#D7DEE3] bg-white px-3 text-sm"
            />
          </div>
          <div className="md:col-span-2 flex items-end justify-end gap-2">
            <button
              onClick={clearCustomRange}
              className="h-10 rounded-md border border-[#D7DEE3] bg-white px-4 text-sm text-[#1E1E1E]"
            >
              Clear Date Range
            </button>
          </div>
        </div>

        <DashboardStats stats={cards} route="balances" />

        <div className="mt-5 rounded-xl border border-[#E8EBED] bg-white p-4">
          <h3 className="text-sm font-semibold text-[#1E1E1E]">Reconciliation Details</h3>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
            <div>
              <p className="text-xs text-[#7C8D96]">Customer Wallet Balance</p>
              <p className="text-base font-semibold text-[#11435A]">
                {formatCurrency(reconciliation.totalCustomerWalletBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#7C8D96]">Customer Book Balance</p>
              <p className="text-base font-semibold text-[#11435A]">
                {formatCurrency(reconciliation.totalCustomerBookBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#7C8D96]">Customer Locked Balance</p>
              <p className="text-base font-semibold text-[#11435A]">
                {formatCurrency(reconciliation.totalCustomerLockedBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#7C8D96]">Total Customer Accounts</p>
              <p className="text-base font-semibold text-[#11435A]">
                {Number(reconciliation.totalCustomerAccounts || 0).toLocaleString('en-NG')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
