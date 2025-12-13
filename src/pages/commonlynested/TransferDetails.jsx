import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';

const TransferDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const multiLineData = [
    { day: 'Today', bank: 14500, wallet: 14200 },
    { day: 'Yesterday', bank: 14200, wallet: 14800 },
    { day: '2 Days Ago', bank: 14800, wallet: 14600 },
    { day: '3 Days Ago', bank: 14600, wallet: 15200 },
    { day: '4 Days Ago', bank: 15200, wallet: 15800 },
    { day: '5 Days Ago', bank: 15800, wallet: 16200 },
    { day: '6 Days Ago', bank: 16200, wallet: 15600 },
    { day: '7 Days Ago', bank: 15600, wallet: 16800 }
  ];

  const barData = [
    { day: 'Today', bank: 600, wallet: 700 },
    { day: 'Yesterday', bank: 450, wallet: 750 },
    { day: '2 Days Ago', bank: 500, wallet: 400 },
    { day: '3 Days Ago', bank: 650, wallet: 700 },
    { day: '4 Days Ago', bank: 350, wallet: 400 },
    { day: '5 Days Ago', bank: 580, wallet: 500 },
    { day: '6 Days Ago', bank: 480, wallet: 450 },
    { day: '7 Days Ago', bank: 520, wallet: 280 }
  ];

  const lineChartSeries = [
    { data: multiLineData.map(d => d.bank), color: '#F59E0B', label: 'Wallet - Bank' },
    { data: multiLineData.map(d => d.wallet), color: '#06b6d4', label: 'Wallet - Wallet' }
  ];

  const barChartSeries = [
    { data: barData.map(d => d.bank), color: '#F59E0B', label: 'Wallet - Bank' },
    { data: barData.map(d => d.wallet), color: '#D97706', label: 'Wallet - Wallet' }
  ];

  const transferRegions = [
    { id: 1, location: 'Lagos', totalTransfers: 500000, volume: 40000, revenue: 40000, successRate: 98 },
    { id: 2, location: 'Abuja', totalTransfers: 50000, volume: 50000, revenue: 20000, successRate: 98 },
    { id: 3, location: 'Enugu', totalTransfers: 20000, volume: 20000, revenue: 10000, successRate: 98 },
    { id: 4, location: 'Rivers', totalTransfers: 50000, volume: 4000, revenue: 10000, successRate: 98 },
    { id: 5, location: 'Cross Rivers', totalTransfers: 100000, volume: 20000, revenue: 40000, successRate: 98 }
  ];

  const allTransferTransactions = [
    { id: 1, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'First Time', type: 'Credit', revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Wallet Transfer', location: 'Lagos' },
    { id: 2, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Repeat Buyer', type: 'Debit', revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Bank Transfer', location: 'Abuja' },
    { id: 3, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'First Time', type: 'Credit', revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Wallet Transfer', location: 'Enugu' },
    { id: 4, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Repeat Buyer', type: 'Credit', revenue: 100, amount: 400, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Bank Transfer', location: 'Rivers' },
    { id: 5, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'First Time', type: 'Debit', revenue: 100, amount: 20000, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Wallet Transfer', location: 'Lagos' }
  ];

  // REGION DETAILS VIEW
  if (type === 'region') {
    const region = transferRegions.find(r => r.id === parseInt(id));
    
    if (!region) {
      return <div>Region not found</div>;
    }

    // Filter transactions for this region
    const regionTransactions = allTransferTransactions.filter(
      tx => tx.location === region.location
    );

    // Actions for region transactions
    const regionTransactionActions = [
      {
        label: 'View Transaction Details',
        type: 'view',
        onClick: (transaction) => {
          setSelectedTransaction(transaction);
          setShowDetailsModal(true);
        }
      },
      {
        label: 'Share Receipt',
        type: 'share',
        onClick: (transaction) => {
          setSelectedTransaction(transaction);
          setShowShareModal(true);
        }
      },
      {
        label: 'View Transaction History',
        type: 'history',
        onClick: (transaction) => {
          navigate(`/transfers/details/transaction/${transaction.id}`);
        }
      }
    ];

    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title={`${region.location} State`}
            subtitle="Here is how this location has been performing so far"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <DashboardStats
            stats={[]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie
             data={[]} />
            <TopCustomersCard
              data={topCustomers}
              title="Top Users"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={lineChartSeries}
            title="Daily Transaction Volume"
          />

          <BarChartComponent 
            data={barData}
            series={barChartSeries}
            title="Daily Transaction Count"
          />

          <TransactionHistoryTable 
            data={regionTransactions}
            title="Transactions"
            actions={regionTransactionActions}
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
  }

  // TRANSACTION DETAILS VIEW
  if (type === 'transaction') {
    const transaction = allTransferTransactions.find(tx => tx.id === parseInt(id));
    
    if (!transaction) {
      return <div>Transaction not found</div>;
    }

    // Get all transactions for this customer
    const customerTransactions = allTransferTransactions.filter(
      tx => tx.title === transaction.title
    );

    // Actions for customer transaction history
    const customerTransactionActions = [
      {
        label: 'View Transaction Details',
        type: 'view',
        onClick: (tx) => {
          setSelectedTransaction(tx);
          setShowDetailsModal(true);
        }
      },
      {
        label: 'Share Receipt',
        type: 'share',
        onClick: (tx) => {
          setSelectedTransaction(tx);
          setShowShareModal(true);
        }
      }
    ];

    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="Transaction History"
            subtitle="Here is the full transfer transaction history for this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          {/* Customer Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">
                  {transaction.title?.split(' ').map(n => n[0]).join('') || 'RR'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{transaction.title}</h3>
                <p className="text-gray-600">{transaction.acc}</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          <DashboardStats
           stats={[]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie
             data={[]} />
            <TopCustomersCard
              data={topCustomers}
              title="Transfer Distribution"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={lineChartSeries}
            title="Daily Transaction Volume"
          />

          <BarChartComponent 
            data={barData}
            series={barChartSeries}
            title="Daily Transaction Count"
          />

          <TransactionHistoryTable 
            data={customerTransactions}
            title="Transactions"
            actions={customerTransactionActions}
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
  }

  // Fallback
  return <div>Invalid view type</div>;
};

export default TransferDetails;