import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import {
  dailyTransactionData,
  topTransactionTypes,
  transactionPercentages,
  topCustomers,
  regionsData,
  transactionHistoryData
} from '@/constants/mockData';

const BillsDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // REGION DETAILS VIEW
  if (type === 'region') {
    const region = regionsData.find(r => r.id === parseInt(id));
    
    if (!region) {
      return <div>Region not found</div>;
    }

    // Filter transactions for this region
    const regionTransactions = transactionHistoryData.filter(
      tx => tx.location === region.location
    ).map(tx => ({
      ...tx,
      category: 'Bills',
    }));

    // Custom stats for region view
    const regionStats = [
      { 
        label: 'Total Transactions', 
        value: region.total?.toLocaleString() || '0', 
        change: '+15%', 
        subtext: '60,000 in last 24 hours' 
      },
      { 
        label: 'Total Revenue (₦)', 
        value: `₦${region.revenue?.toLocaleString() || '0'}`, 
        change: '+20%', 
        subtext: '₦30,000 in last 24 hours' 
      },
      { 
        label: 'Transaction Volume (₦)', 
        value: `₦${region.volume?.toLocaleString() || '0'}`, 
        change: '+12%', 
        subtext: '₦40,000 in last 24 hours' 
      },
      { 
        label: 'Success Rate', 
        value: `${region.rate}%`, 
        change: '+4%', 
        subtext: '99% in last 24 hours' 
      }
    ];

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
          navigate(`/bills/details/transaction/${transaction.id}`);
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

          {/* Region Stats - Dynamic */}
          <DashboardStats stats={regionStats} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-2">
              <TopTransactionValueCard 
                data={topTransactionTypes}
                title="Top Transaction Value"
              />
            </div>
            <div className="lg:col-span-3">
              <TopCustomersCard 
                data={topCustomers} 
                title="Top Customers"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <TransactionVolumeChart 
                data={dailyTransactionData}
                title="Daily Transaction Volume"
              />
            </div>
            <div className="lg:col-span-1">
              <TransactionPercentagePie 
                data={transactionPercentages}
                title="Top % Purchase from Customers"
              />
            </div>
          </div>

          {/* Region Transactions */}
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
    const transaction = transactionHistoryData.find(tx => tx.id === parseInt(id));
    
    if (!transaction) {
      return <div>Transaction not found</div>;
    }

    // Get all transactions for this customer
    const customerTransactions = transactionHistoryData.filter(
      tx => tx.title === transaction.title
    ).map(tx => ({
      ...tx,
      category: 'Bills',
    }));

    // Custom stats for transaction/customer view
    const customerStats = [
      { 
        label: 'Total Transactions', 
        value: '48,920', 
        change: '+22%', 
        subtext: '55,000 in last 24 hours' 
      },
      { 
        label: 'Total Transaction Volume', 
        value: '₦3,980,500', 
        change: '-12%', 
        subtext: '₦60,000 in last 24 hours' 
      },
      { 
        label: 'Highest One Time Purchase', 
        value: '₦6,200', 
        change: '+15%', 
        subtext: '620 in last 24 hours' 
      },
      { 
        label: 'Success Rate', 
        value: '91%', 
        change: '+4%', 
        subtext: '4% in last 24 hours' 
      }
    ];

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
            subtitle="Here is the full bills payment transaction history for this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          {/* Customer Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">
                  {transaction.title?.split(' ').map(n => n[0]).join('') || 'RR'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{transaction.title}</h3>
                <p className="text-gray-600">{transaction.acc}</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Repeat Buyer
                </span>
              </div>
            </div>
          </div>

          {/* Customer Stats - Dynamic */}
          <DashboardStats stats={customerStats} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-2">
              <TopTransactionValueCard 
                data={topTransactionTypes}
                title="Top Transaction Value"
              />
            </div>
            <div className="lg:col-span-3">
              <TransactionPercentagePie 
                data={transactionPercentages}
                title="Top % Purchase"
              />
            </div>
          </div>

          {/* All Transactions for this customer */}
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

export default BillsDetails;