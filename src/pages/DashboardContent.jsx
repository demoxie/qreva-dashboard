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

        {/* Charts Section - 40-60 Split for Admin/Agent */}
        {(isAdmin || isAgent) && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6  ">
            <div className="lg:col-span-2 ">
              <TopTransactionValueCard data={topTransactionTypes} />
            </div>
            <div className="lg:col-span-3">
              <TopCustomersCard 
                data={topCustomers} 
                title={isAdmin ? 'Top Customers' : 'Top Agents'}
              />
            </div>
          </div>
        )}

        {/* Charts Section for Agent/Aggregator (50-50 split) */}
        {(isAgent || isAggregator) && !isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TransactionPercentagePie data={transactionPercentages} />
          </div>
        )}

        {/* Charts Section for Aggregator Manager */}
        {isAggregatorManager && (
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
        )}

        <TransactionVolumeChart data={dailyTransactionData} />

        {(isAdmin || isAggregatorManager) && (
          <RegionsTable data={regionsData} />
        )}

        <TransactionHistoryTable data={transactionHistoryData} />
      </div>
    </div>
  );
};

export default DashboardContent;