import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';

const SoftPOSDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const multiLineData = [
    { day: 'Today', cardPayments: 14500, qrPayments: 14200 },
    { day: 'Yesterday', cardPayments: 14200, qrPayments: 14800 },
    { day: '2 Days Ago', cardPayments: 14800, qrPayments: 14600 },
    { day: '3 Days Ago', cardPayments: 14600, qrPayments: 15200 },
    { day: '4 Days Ago', cardPayments: 15200, qrPayments: 15800 },
    { day: '5 Days Ago', cardPayments: 15800, qrPayments: 16200 },
    { day: '6 Days Ago', cardPayments: 16200, qrPayments: 15600 },
    { day: '7 Days Ago', cardPayments: 15600, qrPayments: 16800 }
  ];

  const chartSeries = [
    { data: multiLineData.map(d => d.cardPayments), color: '#06b6d4', label: 'Card Payments' },
    { data: multiLineData.map(d => d.qrPayments), color: '#F59E0B', label: 'QR Payments' }
  ];

  const SoftPOSRegionsData = [
    { id: 1, location: 'Lagos', totalKYC: 500000, totalSum: 40000, revenue: 40000, commission: 40000 },
    { id: 2, location: 'Abuja', totalKYC: 50000, totalSum: 50000, revenue: 20000, commission: 20000 },
    { id: 3, location: 'Enugu', totalKYC: 20000, totalSum: 20000, revenue: 10000, commission: 10000 },
    { id: 4, location: 'Rivers', totalKYC: 50000, totalSum: 4000, revenue: 10000, commission: 10000 },
    { id: 5, location: 'Cross Rivers', totalKYC: 100000, totalSum: 20000, revenue: 40000, commission: 40000 }
  ];

  const allSoftPOSTransactions = [
    { id: 1, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'qrPayments', status: 'First Time', category: 'SoftPOS', desc: 'QR Payment', location: 'Lagos', commission: 200, revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025' },
    { id: 2, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'cardPayments', status: 'Repeat Buyer', category: 'SoftPOS', desc: 'Card Payment', location: 'Lagos', commission: 200, revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025' },
    { id: 3, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'qrPayments', status: 'First Time', category: 'SoftPOS', desc: 'QR Payment', location: 'Abia', commission: 200, revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025' },
    { id: 4, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'qrPayments', status: 'Repeat Buyer', category: 'SoftPOS', desc: 'QR Payment', location: 'Enugu', commission: 200, revenue: 100, amount: 400, date: '10:00 AM | 25th March, 2025' },
    { id: 5, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'cardPayments', status: 'First Time', category: 'SoftPOS', desc: 'Card Payment', location: 'Abuja', commission: 200, revenue: 100, amount: 20000, date: '10:00 AM | 25th March, 2025' }
  ];

  // REGION DETAILS VIEW
  if (type === 'region') {
    const region = SoftPOSRegionsData.find(r => r.id === parseInt(id));
    
    if (!region) {
      return <div>Region not found</div>;
    }

    // Filter transactions for this region
    const regionTransactions = allSoftPOSTransactions.filter(
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
          navigate(`/softpos/details/transaction/${transaction.id}`);
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

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TransactionPercentagePie 
              data={[
                { id: 0, value: 30, label: 'Card Payments', color: '#F59E0B' },
                { id: 1, value: 70, label: 'QR Payments', color: '#06b6d4' }
              ]}
              title="Card Payments vs QR Payments %"
            />
            <TopCustomersCard 
              data={topCustomers}
              title="Top Agents"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={chartSeries}
            title="Daily Transaction Volume"
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
    const transaction = allSoftPOSTransactions.find(tx => tx.id === parseInt(id));
    
    if (!transaction) {
      return <div>Transaction not found</div>;
    }

    // Get all transactions for this agent
    const agentTransactions = allSoftPOSTransactions.filter(
      tx => tx.agentName === transaction.agentName
    );

    // Actions for agent transaction history
    const agentTransactionActions = [
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
            subtitle="Here is the full SoftPOS transaction history for this agent"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          {/* Agent Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {transaction.agentName?.split(' ').map(n => n[0]).join('') || 'RR'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{transaction.agentName}</h3>
                <p className="text-gray-600">{transaction.phoneNumber}</p>
                <p className="text-sm text-gray-500">{transaction.email}</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TransactionPercentagePie 
              data={[
                { id: 0, value: 30, label: 'Card Payments', color: '#F59E0B' },
                { id: 1, value: 70, label: 'QR Payments', color: '#06b6d4' }
              ]}
              title="Payment Distribution"
            />
            <TopCustomersCard 
              data={topCustomers}
              title="Related Agents"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={chartSeries}
            title="Daily Transaction Volume"
          />

          <TransactionHistoryTable 
            data={agentTransactions}
            title="Transactions"
            actions={agentTransactionActions}
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

export default SoftPOSDetails;