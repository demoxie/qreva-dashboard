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
  transactionHistoryData
} from '@/constants/mockData';

const DataPurchase = () => {
  const [timeFilter, setTimeFilter] = useState('Today');

  // Filter for Data providers
  const dataProviders = [
    { id: 1, name: 'Airtel', value: 2000000, color: '#E31E24', percentage: 85 },
    { id: 2, name: 'MTN', value: 2000000, color: '#FFCB05', percentage: 75 },
    { id: 3, name: 'Glo', value: 2000000, color: '#00A65A', percentage: 65 },
    { id: 4, name: 'Etisalat', value: 2000000, color: '#006F3E', percentage: 70 },
    { id: 5, name: '9Mobile', value: 2000000, color: '#00923F', percentage: 60 }
  ];

  const dataTransactions = transactionHistoryData.map(tx => ({
    ...tx,
    category: 'Data',
    desc: tx.desc.includes('Transfer') ? `${tx.desc.split(' ')[2]} Data Bundle` : tx.desc,
    dataPlan: '1.5GB Weekly Plan + Youtube Social Plan'
  }));

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Data Purchase"
          subtitle="Here is how this has been performing so far"
          breadcrumb="Data Purchase"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TopTransactionValueCard 
              data={dataProviders}
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

        {/* Volume and Percentage Charts */}
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

        <RegionsTable data={regionsData} title="Top Regions" />

        <TransactionHistoryTable 
          data={dataTransactions}
          title="Transactions"
        />
      </div>
    </div>
  );
};

export default DataPurchase;