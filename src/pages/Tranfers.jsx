import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import TransferStats from '@/components/base/TransferStats';
import TransferStatusPie from '@/components/charts/TransferStatusPie';
import TopAgentsCard from '@/components/cards/TopAgentsCard';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import TransferRegionsTable from '@/components/tables/TransferRegionsTable';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import { topCustomers } from '@/constants/mockData';

const Transfers = () => {
  const [timeFilter, setTimeFilter] = useState('Today');

  const breadcrumbs = [
    { label: 'Transfers', path: '/transfers' }
  ];

  const multiLineData = [
    { day: 'Today', bank: 14500, wallet: 14200 },
    { day: 'Yesterday', bank: 14200, wallet: 14800 },
    { day: '2 Days Ago', bank: 14800, wallet: 14600 },
    { day: '3 Days Ago', bank: 14600, wallet: 15200 },
    { day: '4 Days Ago', bank: 15200, wallet: 15800 },
    { day: '5 Days Ago', bank: 15800, wallet: 16200 },
    { day: '6 Days Ago', bank: 16200, wallet: 15600 },
    { day: '7 Days Ago', bank: 15600, wallet: 16800 },
    { day: 'Week Ago', bank: 16800, wallet: 16200 },
    { day: '2 Weeks Ago', bank: 16200, wallet: 13800 },
    { day: '3 Weeks Ago', bank: 13800, wallet: 17200 },
    { day: '4 Weeks Ago', bank: 17200, wallet: 18000 }
  ];

  const barData = [
    { day: 'Today', bank: 600, wallet: 700 },
    { day: 'Yesterday', bank: 450, wallet: 750 },
    { day: '2 Days Ago', bank: 500, wallet: 400 },
    { day: '3 Days Ago', bank: 650, wallet: 700 },
    { day: '4 Days Ago', bank: 350, wallet: 400 },
    { day: '5 Days Ago', bank: 580, wallet: 500 },
    { day: '6 Days Ago', bank: 480, wallet: 450 },
    { day: '7 Days Ago', bank: 520, wallet: 280 },
    { day: 'Week Ago', bank: 600, wallet: 550 },
    { day: '2 Weeks Ago', bank: 850, wallet: 780 },
    { day: '3 Weeks Ago', bank: 620, wallet: 800 },
    { day: '4 Weeks Ago', bank: 600, wallet: 620 }
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

  const transferTransactions = [
    { id: 1, senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Successful', type: 'Credit', revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025' },
    { id: 2, senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Pending', type: 'Debit', revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025' },
    { id: 3, senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Successful', type: 'Credit', revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025' },
    { id: 4, senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Failed', type: 'Credit', revenue: 100, amount: 400, date: '10:00 AM | 25th March, 2025' },
    { id: 5, senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Successful', type: 'Debit', revenue: 100, amount: 20000, date: '10:00 AM | 25th March, 2025' }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Transfers"
          subtitle="Here is how this has been performing so far"
          breadcrumbs={breadcrumbs}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <TransferStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TransferStatusPie />
          <TopAgentsCard 
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

        <TransferRegionsTable data={transferRegions} />

        <TransactionHistoryTable 
          data={transferTransactions}
          title="Transactions"
        />
      </div>
    </div>
  );
};

export default Transfers;