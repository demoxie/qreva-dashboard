import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import { useCategoryDetailMetrics } from '@/store/features/category/useCategory';
import { useTransfersBreakdown } from '@/store/features/category/useCategory';
import { useTransactions } from '@/store/features/transactions/useTransactions';
import { createRegionTransactionActions, createCustomerTransactionActions } from '../constants';

const TransferDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const regionParam = type === 'region' ? id : undefined;
  const { data: metricsResponse } = useCategoryDetailMetrics('transfers', { region: regionParam });
  const { data: breakdownResponse } = useTransfersBreakdown({ region: regionParam });
  const { data: txResponse } = useTransactions({ category: 'transfer', region: regionParam });

  const metrics = metricsResponse?.data || {};
  const breakdown = breakdownResponse?.data || {};
  const transactions = txResponse?.data || [];

  const stats = useMemo(() => [
    { label: 'Total Transaction Volume', value: (metrics.totalTransactions || 0).toLocaleString(), change: '+0%', subtext: 'in last 24 hours' },
    { label: 'Total Transaction Value', value: `₦${(metrics.totalVolume || 0).toLocaleString()}`, change: '+0%', subtext: 'in last 24 hours' },
    { label: 'Success Rate', value: `${metrics.successRate || 0}%`, change: '+0%', subtext: 'in last 24 hours' },
    { label: 'Average Value', value: `₦${(metrics.averageValue || 0).toLocaleString()}`, change: '+0%', subtext: 'in last 24 hours' },
  ], [metrics]);

  const topCustomers = (metrics.topCustomers || []).map(c => ({
    name: `${c.firstName} ${c.lastName}`,
    amount: c.totalVolume,
    transactions: c.totalTransactions,
  }));

  const pieData = [
    { id: 0, value: breakdown.internalTransfers?.count || 0, label: 'Internal Transfers', color: '#06b6d4' },
    { id: 1, value: breakdown.externalTransfers?.count || 0, label: 'External Transfers', color: '#F59E0B' },
  ];

  const dailyBreakdown = breakdown.dailyBreakdown || [];
  const lineChartData = dailyBreakdown.map(d => ({ date: d.date, internal: d.internal, external: d.external }));
  const lineChartSeries = [
    { dataKey: 'internal', label: 'Internal', color: '#06b6d4' },
    { dataKey: 'external', label: 'External', color: '#F59E0B' },
  ];
  const barChartData = (metrics.dailyBreakdown || []).map(d => ({ date: d.date, count: d.count }));
  const barChartSeries = [{ dataKey: 'count', label: 'Transactions', color: '#FF5B04' }];

  const regionTransactionActions = createRegionTransactionActions({
    setSelectedTransaction, setShowDetailsModal, setShowShareModal, navigate
  });
  const customerTransactionActions = createCustomerTransactionActions({
    setSelectedTransaction, setShowDetailsModal, setShowShareModal
  });

  if (type === 'region') {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader title={id} subtitle="Here is how this location has been performing so far" timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />
          <DashboardStats stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie data={pieData} />
            <TopCustomersCard data={topCustomers} title="Top Users" />
          </div>
          <MultiLineChart data={lineChartData} series={lineChartSeries} title="Daily Transaction Value" />
          <BarChartComponent data={barChartData} series={barChartSeries} title="Daily Transaction Count" />
          <TransactionHistoryTable data={transactions} title="Transactions" actions={regionTransactionActions} />
        </div>
        <TransactionDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} transaction={selectedTransaction} />
        <ShareReceiptModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} transaction={selectedTransaction} />
      </div>
    );
  }

  if (type === 'transaction') {
    const transaction = transactions.find(tx => String(tx.id || tx._id) === String(id));
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader title="Transaction History" subtitle="Here is the full transfer transaction history for this user" timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />
          {transaction && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">
                    {(transaction.senderName || transaction.transferId?.nameEnquiryId?.accountName || transaction.narration || transaction.typeCategory || transaction.customerName || transaction.title || '')?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'TX'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{transaction.senderName || transaction.transferId?.nameEnquiryId?.accountName || transaction.narration || transaction.typeCategory || transaction.customerName || transaction.title}</h3>
                  <p className="text-gray-600">{transaction.phoneNumber || transaction.creditAccountNumber || transaction.accountNumber || transaction.customerPhone || transaction.acc}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{transaction.status}</span>
                </div>
              </div>
            </div>
          )}
          <DashboardStats stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie data={pieData} />
            <TopCustomersCard data={topCustomers} title="Transfer Distribution" />
          </div>
          <MultiLineChart data={lineChartData} series={lineChartSeries} title="Daily Transaction Value" />
          <BarChartComponent data={barChartData} series={barChartSeries} title="Daily Transaction Count" />
          <TransactionHistoryTable data={transactions} title="Transactions" actions={customerTransactionActions} />
        </div>
        <TransactionDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} transaction={selectedTransaction} />
        <ShareReceiptModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} transaction={selectedTransaction} />
      </div>
    );
  }

  return <div>Invalid view type</div>;
};

export default TransferDetails;
