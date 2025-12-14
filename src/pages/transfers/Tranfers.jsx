import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomShare from '@/components/icons/CustomShare';
import CustomHistory from '@/components/icons/CustomHistory';

const Transfers = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

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
    { data: multiLineData.map(d => d.bank), color: '#B54103', label: 'Wallet - Bank' },
    { data: multiLineData.map(d => d.wallet), color: '#FF9157', label: 'Wallet - Wallet' }
  ];

  const barChartSeries = [
    { data: barData.map(d => d.bank), color: '#B54103', label: 'Wallet - Bank' },
    { data: barData.map(d => d.wallet), color: '#FF9157', label: 'Wallet - Wallet' }
  ];

  const transferRegions = [
    { id: 1, location: 'Lagos', totalTransfers: 500000, volume: 40000, revenue: 40000, successRate: 98 },
    { id: 2, location: 'Abuja', totalTransfers: 50000, volume: 50000, revenue: 20000, successRate: 98 },
    { id: 3, location: 'Enugu', totalTransfers: 20000, volume: 20000, revenue: 10000, successRate: 98 },
    { id: 4, location: 'Rivers', totalTransfers: 50000, volume: 4000, revenue: 10000, successRate: 98 },
    { id: 5, location: 'Cross Rivers', totalTransfers: 100000, volume: 20000, revenue: 40000, successRate: 98 }
  ];

  const transferTransactions = [
    { id: 1, title: 'Transfer from Victor Odinaka', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Successful', type: 'Credit', revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Wallet Transfer', location: 'Lagos' },
    { id: 2, title: 'Transfer from Victor Odinaka', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Pending', type: 'Debit', revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Bank Transfer', location: 'Abuja' },
    { id: 3, title: 'Transfer from Victor Odinaka', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Successful', type: 'Credit', revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Wallet Transfer', location: 'Enugu' },
    { id: 4, title: 'Transfer from Victor Odinaka', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Failed', type: 'Credit', revenue: 100, amount: 400, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Bank Transfer', location: 'Rivers' },
    { id: 5, title: 'Transfer from Victor Odinaka', acc: '+234 801 234 5678', senderName: 'Rejoice Regina Rose', recipientName: 'Peculiar Regina', status: 'Successful', type: 'Debit', revenue: 100, amount: 20000, date: '10:00 AM | 25th March, 2025', category: 'Transfer', desc: 'Wallet Transfer', location: 'Lagos' }
  ];

   const statusData = [
    { id: 0, value: 30, label: 'Success', color: '#22C55E' },
    { id: 1, value: 20, label: 'Failed', color: '#FF5B04' },
    { id: 2, value: 20, label: 'Reversed', color: '#26C8B9' },
    { id: 3, value: 10, label: 'Pending', color: '#FFB703' }
  ];

   const stats = [
    { 
      label: 'Total Transfers', 
      value: '45,823', 
      subtext: '50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-green-500'
    },
    { 
      label: 'Total Transfers Volume', 
      value: '₦4,005,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Total Transfers Revenue', 
      value: '₦1,070,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Success Rate', 
      value: '98%', 
      subtext: '2% in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
  ];

  // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/transfers/details/region/${regionId}`);
  };

   const columns = [
    { 
      field: 'location', 
      headerName: 'Location', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm flex items-center gap-3">
          <p className='bg-[#F7FAFA] rounded-full w-6 h-6 flex items-center justify-center text-[#808C91] text-center border-2 border-[#E9F1F3]'>{params.row.id}</p> <p className='font-medium leading-[148%] text-[#1E1E1E]'>{params.row.location}</p>
        </span>
      )
    },
    { 
      field: 'totalTransfers', 
      headerName: 'Total KYC Verifications', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center leading-[156%]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'volume', 
      headerName: 'Total KYC Verifications Sum(N)', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center font-medium">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'revenue', 
      headerName: 'Total Revenue (N)', 
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center font-medium">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'successRate', 
      headerName: 'Success Rate (%)', 
      flex: 0.8,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center">
          {params.value}%
        </span>
      )
    },
    {
      field: 'actions',
      headerName: '',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <button 
          onClick={() => handleViewRegionDetails(params.row.id)}
          className="font-general flex items-center text-sm text-[#26C8B9] underline underline-offset-2 cursor-pointer font-semibold"
        >
          View Details
        </button>
      )
    }
  ];

   const transactionColumns = [
    { 
      field: 'senderName', 
      headerName: 'Senders Name', 
      width: 180,
      flex: 1,
      renderCell: (params) => (
        <div className='flex flex-col justify-center h-full'>
          <div className="text-sm font-general font-medium flex items-center h-full">{params.row.senderName}</div>
        </div>
      )
    },
    { 
      field: 'recipientName', 
      headerName: 'Recipient Name',
      width: 180,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
          {params.value}  
        </span>
      ) 
    },

    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      flex: 1,
      renderCell: (params) => {
        const statusColors = {
          Pending: 'border border-[#FFC535] bg-[#FFF8E6] text-[#B58202]',
          Successful: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]',
          Failed: 'border border-[#E56566] bg-[#FCECEC] text-[#9E2D2D]'
        };
        return(
        <span className={`px-2 py-1.5 text-center ${statusColors[params.value]} font-general font-medium  text-xs rounded-md flex items-center justify-center h-full`}>
          {params.value}
        </span>
        );
      }
    },
    { 
      field: 'revenue',
      headerName: 'Revenue (N)',
      width: 100,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
          {params.value}
        </span>
      )
    },
    { 
      field: 'amount', 
      headerName: 'Amount (N)', 
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'date', 
      headerName: 'Transaction Date', 
      width: 180,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm text-gray-500 flex items-center h-full">{params.value}</span>
      )
    }
  ];

  // Transaction actions
  const transactionActions = [
    {
      label: 'View Transaction Details',
      type: 'view',
      icon: CustomEye,
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
      }
    },
    {
      label: 'Share Receipt',
      type: 'share',
      icon: CustomShare,
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowShareModal(true);
      }
    },
    {
      label: 'View Transaction History',
      type: 'history',
      icon: CustomHistory,
      onClick: (transaction) => {
        navigate(`/transfers/details/transaction/${transaction.id}`);
      }
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Transfers"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats
         stats={stats} />

        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
          <PaymentComparisonPie 
            data={statusData} />
          </div>
          <div className='col-span-3'>
            <TopCustomersCard 
            data={topCustomers}
            title="Top Users"
          />
          </div>
         
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

        <RegionsTable 
          data={transferRegions}
          onViewDetails={handleViewRegionDetails}
          columns={columns}
        />

        <DataTable 
          data={transferTransactions}
          title="Transactions"
          actions={transactionActions}
          columns={transactionColumns}
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
};

export default Transfers;