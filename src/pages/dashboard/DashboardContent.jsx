import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardStats from '@/components/base/DashboardStats';
import PageHeader from '@/components/common/PageHeader';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import RegionsTable from '@/components/tables/RegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import {
  dailyTransactionData,
  topTransactionTypes,
  transactionPercentages,
  cardVsQRPayments,
  topCustomers,
  regionsData,
  transactionHistoryData
} from '@/constants/mockData';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';

const DashboardContent = () => {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('Today');

    // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  // Role checks
  const isAdmin = user?.role === 'SuperAdmin';
  const isAgent = user?.role === 'agent';
  const isAggregator = user?.role === 'aggregator';
  const isAggregatorManager = user?.role === 'aggregator_manager';

    // Transaction actions - defined in parent, passed to table
  const transactionActions = [
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
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        <PageHeader
          title="Dashboard"
          subtitle="Here is how this has been performing so far"
          breadcrumb="Dashboard"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />           

        {/* Admin Layout */}
        {isAdmin && (
          <>
          <DashboardStats 
            role="admin"
          />
            {/* Top Transaction Value + Top Customers - 40-60 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TopTransactionValueCard data={topTransactionTypes} />
              </div>
              <div className="lg:col-span-3">
                <TopCustomersCard 
                  data={topCustomers} 
                  title="Top Customers"
                />
              </div>
            </div>

            {/* Daily Transaction Volume */}
            <TransactionVolumeChart data={dailyTransactionData} />

            {/* Top Regions Table */}
            <RegionsTable data={regionsData} />

            {/* Transaction History */}
             <TransactionHistoryTable 
            data={transactionHistoryData} 
            actions={transactionActions}
            />
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
          </>
        )}

        {/* Agent Layout */}
        {isAgent && (
          <>
          <DashboardStats 
            role="agent"
          />
            {/* Top Transaction Value + Top % Transactions - 40-60 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TopTransactionValueCard data={topTransactionTypes} />
              </div>
              <div className="lg:col-span-3">
                <TransactionPercentagePie data={transactionPercentages} />
              </div>
            </div>

            {/* Daily Transaction Volume */}
            <TransactionVolumeChart data={dailyTransactionData} />

            {/* Card vs QR Payments - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <PaymentComparisonPie
                data={cardVsQRPayments}
                title="Card Payments vs QR Payments %"
                showPercentage={true}
              />
              <PaymentComparisonPie
                data={cardVsQRPayments}
                title="Card Payments vs QR Payments Commission"
                showPercentage={false}
                amountData={['₦4,000,000', '₦170,823']}
              />
            </div>

            {/* Transaction History */}
            <TransactionHistoryTable data={transactionHistoryData} />
          </>
        )}

        {/* Aggregator & Aggregator Manager Layout */}
        {(isAggregator || isAggregatorManager) && (
          <>
          <DashboardStats 
            role="aggregator"
          />
            {/* Top Transaction Value + Top % Transactions - 40-60 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TopTransactionValueCard data={topTransactionTypes} />
              </div>
              <div className="lg:col-span-3">
                <TransactionPercentagePie data={transactionPercentages} />
              </div>
            </div>

            {/* Daily Transaction Volume */}
            <TransactionVolumeChart data={dailyTransactionData} />

            {/* Top Agents + Card vs QR Payments - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <TopCustomersCard 
                data={topCustomers} 
                title="Top Agents"
                showTabs={true}
              />
              <PaymentComparisonPie
                data={cardVsQRPayments}
                title="Card Payments vs QR Payments %"
                showPercentage={true}
              />
            </div>

            {/* Transaction History */}
            <TransactionHistoryTable 
            data={transactionHistoryData} 
            actions={transactionActions}
            />
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
          </>

          
        )}
      </div>
    </div>
  );
};

export default DashboardContent;