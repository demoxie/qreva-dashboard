import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import DashboardStats from '@/components/base/DashboardStats';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomShare from '@/components/icons/CustomShare';
import CustomHistory from '@/components/icons/CustomHistory';

const KYCVerification = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const bvnVsNinData = [
    { id: 0, value: 30, label: 'NIN Verifications', color: '#E85304' },
    { id: 1, value: 70, label: 'BVN Verification', color: '#26C8B9' }
  ];

  const multiLineData = [
    { day: 'Today', bvn: 14500, nin: 14200 },
    { day: 'Yesterday', bvn: 14200, nin: 14800 },
    { day: '2 Days Ago', bvn: 14800, nin: 14600 },
    { day: '3 Days Ago', bvn: 14600, nin: 15200 },
    { day: '4 Days Ago', bvn: 15200, nin: 15800 },
    { day: '5 Days Ago', bvn: 15800, nin: 16200 },
    { day: '6 Days Ago', bvn: 16200, nin: 15600 },
    { day: '7 Days Ago', bvn: 15600, nin: 16800 },
    { day: 'Week Ago', bvn: 16800, nin: 16200 },
    { day: '2 Weeks Ago', bvn: 16200, nin: 13800 },
    { day: '3 Weeks Ago', bvn: 13800, nin: 17200 },
    { day: '4 Weeks Ago', bvn: 17200, nin: 18000 }
  ];

  const chartSeries = [
    { data: multiLineData.map(d => d.bvn), color: '#26C8B9', label: 'BVN' },
    { data: multiLineData.map(d => d.nin), color: '#E85304', label: 'NIN' }
  ];

  const kycRegionsData = [
    { id: 1, location: 'Lagos', totalKYC: 500000, totalSum: 40000, revenue: 40000, commission: 40000 },
    { id: 2, location: 'Abuja', totalKYC: 50000, totalSum: 50000, revenue: 20000, commission: 20000 },
    { id: 3, location: 'Enugu', totalKYC: 20000, totalSum: 20000, revenue: 10000, commission: 10000 },
    { id: 4, location: 'Rivers', totalKYC: 50000, totalSum: 4000, revenue: 10000, commission: 10000 },
    { id: 5, location: 'Cross Rivers', totalKYC: 100000, totalSum: 20000, revenue: 40000, commission: 40000 }
  ];

  const kycTransactions = [
    { id: 1, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'NIN', status: 'First Time', category: 'KYC', desc: 'NIN Verification', location: 'Lagos', commission: 200, revenue: 100, amount: 4000, date: '10:00 AM | 25th March, 2025' },
    { id: 2, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'BVN', status: 'Repeat Buyer', category: 'KYC', desc: 'BVN Verification', location: 'Lagos', commission: 200, revenue: 100, amount: 5000, date: '10:00 AM | 25th March, 2025' },
    { id: 3, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'NIN', status: 'First Time', category: 'KYC', desc: 'NIN Verification', location: 'Abia', commission: 200, revenue: 100, amount: 200, date: '10:00 AM | 25th March, 2025' },
    { id: 4, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'NIN', status: 'Repeat Buyer', category: 'KYC', desc: 'NIN Verification', location: 'Enugu', commission: 200, revenue: 100, amount: 400, date: '10:00 AM | 25th March, 2025' },
    { id: 5, title: 'Rejoice Regina Rose', acc: '+234 801 234 5678', agentName: 'Rejoice Regina Rose', phoneNumber: '+234 801 234 5678', email: 'emailaddress@...om', type: 'BVN', status: 'First Time', category: 'KYC', desc: 'BVN Verification', location: 'Abuja', commission: 200, revenue: 100, amount: 20000, date: '10:00 AM | 25th March, 2025' }
  ];

  const stats = [
    { 
      label: 'Total KYC Verification Sum', 
      value: '₦4,005,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
    },
    { 
      label: 'Total BVN Verification Sum', 
      value: '45,823', 
      subtext: '50,000 in last 24 hours',
      change: '+200%',
    },
    { 
      label: 'Total NIN Verification Sum', 
      value: '₦1,070,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
    },
    { 
      label: 'Total Revenue', 
      value: '₦1,070,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
    },
     { 
      label: 'Total Verifications', 
      value: '45,823', 
      subtext: '50,000 in last 24 hours',
      change: '-200%',
    },
    { 
      label: 'Total BVN Verifications', 
      value: '5,823', 
      subtext: '1,000 in last 24 hours',
      change: '+200%',
    },
    { 
      label: 'Total NIN Verifications', 
      value: '70,823', 
      subtext: '1,000 in last 24 hours',
      change: '+200%',
    },
    { 
      label: 'Total Agent Commission', 
      value: '₦40,823', 
      subtext: '₦5,000 in last 24 hours',
      change: '+200%',
    },
  ];

    // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/kyc/details/region/${regionId}`);
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
      field: 'totalKYC', 
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
      field: 'totalSum', 
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
        navigate(`/kyc/details/transaction/${transaction.id}`);
      }
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="KYC Verification"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats 
         stats={stats}
        />

        {/* BVN vs NIN and Top Agents */}
        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
            <PaymentComparisonPie 
            data={bvnVsNinData}
            title="BVN VS NIN %"
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
          data={kycRegionsData}
          onViewDetails={handleViewRegionDetails}
          columns={columns}
        />

        <TransactionHistoryTable 
          data={kycTransactions}
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

export default KYCVerification;