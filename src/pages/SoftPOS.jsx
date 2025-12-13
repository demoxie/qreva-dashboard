import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomShare from '@/components/icons/CustomShare';
import CustomHistory from '@/components/icons/CustomHistory';

const SoftPOS = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

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
    { day: '7 Days Ago', cardPayments: 15600, qrPayments: 16800 },
    { day: 'Week Ago', cardPayments: 16800, qrPayments: 16200 },
    { day: '2 Weeks Ago', cardPayments: 16200, qrPayments: 13800 },
    { day: '3 Weeks Ago', cardPayments: 13800, qrPayments: 17200 },
    { day: '4 Weeks Ago', cardPayments: 17200, qrPayments: 18000 }
  ];

  const chartSeries = [
    { data: multiLineData.map(d => d.cardPayments), color: '#26C8B9', label: 'Card Payments' },
    { data: multiLineData.map(d => d.qrPayments), color: '#E85304', label: 'QR Payments ' }
  ];

  const SoftPOSRegionsData = [
    { id: 1, location: 'Lagos', totalSoftPOSTransactions: 500000, totalTansactionVolume: 40000, revenue: 40000, commission: 40000 },
    { id: 2, location: 'Abuja', totalSoftPOSTransactions: 50000, totalTansactionVolume: 50000, revenue: 20000, commission: 20000 },
    { id: 3, location: 'Enugu', totalSoftPOSTransactions: 20000, totalTansactionVolume: 20000, revenue: 10000, commission: 10000 },
    { id: 4, location: 'Rivers', totalSoftPOSTransactions: 50000, totalTansactionVolume: 4000, revenue: 10000, commission: 10000 },
    { id: 5, location: 'Cross Rivers', totalSoftPOSTransactions: 100000, totalTansactionVolume: 20000, revenue: 40000, commission: 40000 }
  ];

  const SoftPOSTransactions = [
    { id: 1, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'qrPayments', status: 'First Time', category: 'SoftPOS', desc: 'QR Payment', location: 'Lagos', commission: 200, revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025' },
    { id: 2, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'cardPayments', status: 'Repeat Buyer', category: 'SoftPOS', desc: 'Card Payment', location: 'Lagos', commission: 200, revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025' },
    { id: 3, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'qrPayments', status: 'First Time', category: 'SoftPOS', desc: 'QR Payment', location: 'Abia', commission: 200, revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025' },
    { id: 4, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'qrPayments', status: 'Repeat Buyer', category: 'SoftPOS', desc: 'QR Payment', location: 'Enugu', commission: 200, revenue: 100, amount: 400, date: '10:00 AM | 25th March, 2025' },
    { id: 5, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'cardPayments', status: 'First Time', category: 'SoftPOS', desc: 'Card Payment', location: 'Abuja', commission: 200, revenue: 100, amount: 20000, date: '10:00 AM | 25th March, 2025' }
  ];

  // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/softpos/details/region/${regionId}`);
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
      field: 'totalSoftPOSTransactions', 
      headerName: 'Total SOftPOS Transactions', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center leading-[156%]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'totalTansactionVolume', 
      headerName: 'Total Transaction Volume(N)', 
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
      field: 'commission', 
      headerName: 'Total Commissions (N)', 
      flex: 0.8,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center">
          {params.value}
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
        navigate(`/softpos/details/transaction/${transaction.id}`);
      }
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Soft POS"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats />

        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
            <PaymentComparisonPie
            data={[
              { id: 0, value: 30, label: 'Card Payments', color: '#E85304' },
              { id: 1, value: 70, label: 'QR Payments', color: '#26C8B9' }
            ]}
            title="Card Payments vs QR Payments %"
          />
          </div>
          <div className='col-span-3'>
            <TopCustomersCard 
            data={topCustomers}
            title="Top Agents"
          />
          </div> 
        </div>

        <MultiLineChart 
          data={multiLineData}
          series={chartSeries}
          title="Daily Transaction Volume"
        />

        <RegionsTable 
          data={SoftPOSRegionsData}
          onViewDetails={handleViewRegionDetails}
          columns={columns}
        />

        <TransactionHistoryTable 
          data={SoftPOSTransactions}
          title="Transactions"
          actions={transactionActions}
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

export default SoftPOS;