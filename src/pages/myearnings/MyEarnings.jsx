import { useState } from 'react';
import DashboardStats from '@/components/base/DashboardStats';
import WithdrawModal from '@/components/modals/WithdrawalModal';
import ProcessingModal from '@/components/modals/ProccessingModal';
import TransferSuccessModal from '@/components/modals/TransferSuccessModal';
import SaveBeneficiaryModal from '@/components/modals/SaveBeneficiaryModal';
import SuccessModal from '@/components/modals/SuccessModal';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';


const MyEarnings = () => {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showSaveBeneficiaryModal, setShowSaveBeneficiaryModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showTransferSuccessModal, setShowTransferSuccessModal] = useState(false);
    const [showProcessingModal, setShowProcessingModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [accountName, setAccountName] = useState('PECULIAR REGINA');
    const [searchQuery, setSearchQuery] = useState('');
    

    const earningsStats = [
     { label: 'Your Earnings', value: '₦1,570,823', change: '10%', subtext: '₦100,000 in last 24 hours', showEye: true },
     { label: 'Your Commission', value: '₦1,070,823', change: '10%', subtext: '₦50,000 in last 24 hours' },
     { label: 'Total Agent Commission', value: '₦570,823', change: '10%', subtext: '₦100,000 in last 24 hours' }
    ];

    const frequentBeneficiaries = [
        { initial: 'M', name: 'Mum', color: '#FF5B04' },
        { initial: 'BS', name: 'Big Sis', color: '#FF5B04' },
        { initial: 'P', name: 'Precious', color: '#FF5B04' },
        { initial: 'V', name: 'Veee', color: '#FF5B04' },
        { initial: 'VN', name: 'Victor New', color: '#FF5B04' },
        { initial: 'VN', name: 'Victor New', color: '#FF5B04' }
    ];

    const withdrawals = [
     { id: 1, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Pending', date: '10:00 AM | 25th March, 2025' },
     { id: 2, name: 'Rejoice Regina Rose', bank: 'Qreva Wallet | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 3, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 4, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 5, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 6, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 7, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 8, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' },
     { id: 9, name: 'Rejoice Regina Rose', bank: 'GTB | 0123456789', transactionId: '123465GFHGF6768', amount: 400000, status: 'Successful', date: '10:00 AM | 25th March, 2025' }
    ];

      const columns = [
    {
      field: 'name',
      headerName: 'Agent Name',
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <div>
          <div className="text-sm font-general text-[#1E1E1E] font-medium">{params.row.name}</div>
          <div className="text-sm font-general text-[#475367]">{params.row.email}</div>
        </div>
      )
    },
    { 
      field: 'bank', 
      headerName: 'Bank', 
      width: 150 ,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
          {params.value}
          </span>
      )
    },
    {    
    },
    {
      field: 'transactionId',
      headerName: 'Transaction ID',
      width: 150,
      flex: 1,
      valueFormatter: (params) => params?.toLocaleString(),
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount (₦)',
      width: 150,
      flex: 1,
      valueFormatter: (params) => params?.toLocaleString(),
      renderCell: (params) => (
        <span className='className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full"'>
         {params.value?.toLocaleString()}
        </span>
      )  
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      flex: 1,
      valueFormatter: (params) => params?.toLocaleString(),
      renderCell: (params) => {
        const statusColors = {
          Pending: 'border border-[#FFC535] bg-[#FFF8E6] text-[#B58202]',
          Successful: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]'
        };
        return(
        <span className={`px-2 py-1.5 text-center ${statusColors[params.value]} font-general font-medium  text-xs rounded-md flex items-center justify-center h-full`}>
          {params.value}
        </span>
        );
      }
    },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 180,
      flex: 1, 
      renderCell: (params) => (
        <span className="text-sm text-[#1E1E1E] font-general  flex flex-wrap items-center h-full">{params.value}</span>
      )
    },
  ];

    const handleWithdraw = () => {
      // Add actual withdrawal logic validation here
      setShowWithdrawModal(false);
      setShowProcessingModal(true);
     
      setTimeout(() => {
       setShowProcessingModal(false);
       setShowTransferSuccessModal(true);
      }, 2000); // Simulate API call delay
    };

    const handleSaveBeneficiary = () => {
      setShowTransferSuccessModal(false);
      // Pre-fill beneficiary name if available from account lookup
      setBeneficiaryName(accountName); 
      setShowSaveBeneficiaryModal(true);
    };

    const confirmSaveBeneficiary = () => {
      // Add actual save beneficiary API call here
      setShowSaveBeneficiaryModal(false);
      setShowSuccessModal(true);
    };

    const handleAmountChange = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      setAmount(value);
    };

    const formatAmount = (value) => {
      if (!value) return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };


   

  const tableActions = [
        {
          label: 'View Details',
          icon: CustomEye,
          onClick: (row) => {
            setSelectedTransaction(row);
            setShowDetailsModal(true);
          }
        },
      ];

return (
    <div className="min-h-screen bg-[#F7FAFA]">
        <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
        <div>
        <h1 className="text-2xl font-semibold text-[#1E1E1E] mb-1">My Earnings</h1>
        <p className="text-sm text-[#808C91]">View all your earnings and withdraw earnings here</p>
        </div>
        <button 
        onClick={() => setShowWithdrawModal(true)}
        className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
        >
        Withdraw Now
        </button>
        </div>

        {/* Earnings Stats */}
        <DashboardStats
        stats={earningsStats}
        route="my-earnings"
        />

        {/* Withdrawals Table */}
        <DataTable
          className='font-general'
          data={withdrawals}
          columns={columns}
          title='Transaction History'
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
        </div>



        <WithdrawModal
            isOpen={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
            frequentBeneficiaries={frequentBeneficiaries}
            setBankName={setBankName}
            setAccountNumber={setAccountNumber}
            setAccountName={setAccountName}
            bankName={bankName}
            accountNumber={accountNumber}
            accountName={accountName}
            amount={amount}
            formatAmount={formatAmount}
            handleAmountChange={handleAmountChange}
            handleWithdraw={handleWithdraw}
        />

        <ProcessingModal
            isOpen={showProcessingModal}
            onClose={() => setShowProcessingModal(false)}
        />

        <TransferSuccessModal
            isOpen={showTransferSuccessModal}
            onClose={() => setShowTransferSuccessModal(false)}
            handleSaveBeneficiary={handleSaveBeneficiary}
        />
        
        <SaveBeneficiaryModal
            isOpen={showSaveBeneficiaryModal}
            onClose={() => setShowSaveBeneficiaryModal(false)}
            accountName={accountName}
            accountNumber={accountNumber}
            bankName={bankName}
            beneficiaryName={beneficiaryName}
            setBeneficiaryName={setBeneficiaryName}
            confirmSaveBeneficiary={confirmSaveBeneficiary}
        />

        <TransactionDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        transaction={selectedTransaction}
      />

        <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            beneficiaryName={beneficiaryName}
        />
        
    </div>
    );
    };

    export default MyEarnings;