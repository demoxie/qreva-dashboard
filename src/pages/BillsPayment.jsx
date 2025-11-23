import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TopTransactionValueCard from '@/components/cards/TopTransactionValueCard';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import TransactionVolumeChart from '@/components/charts/TransactionVolumeChart';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import RegionsTable from '@/components/tables/RegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import {
  dailyTransactionData,
  topTransactionTypes,
  transactionPercentages,
  topCustomers,
  regionsData,
  transactionHistoryData,
  airtimeProviders
} from '@/constants/mockData';

const BillsPayment = () => {
  const [timeFilter, setTimeFilter] = useState('Today');

  const billsTransaction = transactionHistoryData.filter(tx => 
    tx.category === 'Bills' || ['Cable Tv', 'Electricity', 'Airtime', 'Data'].includes(tx.desc)
  );

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        {/* Page Header */}
        <PageHeader
          title="Bills Payment"
          subtitle="Here is how this has been performing so far"
          breadcrumb="Bills Payment"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts Section - 40-60 Split */}
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
              showAgentToggle={true}
            />
          </div>
        </div>

        {/* Transaction Volume and Percentage Charts */}
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

        {/* Top Regions Table */}
        <RegionsTable 
          data={regionsData}
          title="Top Regions"
        />

        {/* Transaction History Table */}
        <TransactionHistoryTable 
          data={billsTransaction}
          title="Transactions"
        />
      </div>
    </div>
  );
};

export default BillsPayment;