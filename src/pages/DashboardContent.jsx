import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
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

const DashboardContent = () => {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('Today');

  // Role checks
  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';
  const isAggregator = user?.role === 'aggregator';
  const isAggregatorManager = user?.role === 'aggregator_manager';

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

         <DashboardStats />

        {/* Admin Layout */}
        {isAdmin && (
          <>
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
            <TransactionHistoryTable data={transactionHistoryData} />
          </>
        )}

        {/* Agent Layout */}
        {isAgent && (
          <>
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
            <TransactionHistoryTable data={transactionHistoryData} />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;