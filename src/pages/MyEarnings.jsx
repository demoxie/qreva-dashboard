    import { useState } from 'react';
    import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
    import DashboardStats from '@/components/base/DashboardStats';
    import WithdrawModal from '@/components/modals/WithdrawalModal';
    import ProcessingModal from '@/components/modals/ProccessingModal';
    import TransferSuccessModal from '@/components/modals/TransferSuccessModal';
    import SaveBeneficiaryModal from '@/components/modals/SaveBeneficiaryModal';
    import SuccessModal from '@/components/modals/SuccessModal';

    const MyEarnings = () => {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showSaveBeneficiaryModal, setShowSaveBeneficiaryModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showTransferSuccessModal, setShowTransferSuccessModal] = useState(false);
    const [showProcessingModal, setShowProcessingModal] = useState(false);
    const [dropdown, setDropdown] = useState({ open: false, row: null, x: 0, y: 0 });
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [accountName, setAccountName] = useState('PECULIAR REGINA');
    

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

    const handleClickOutside = () => {
        // Close dropdown and modals that close on outside click
        if (dropdown.open) {
          setDropdown({ open: false, row: null, x: 0, y: 0 });
        }
    };

    return (
    <div className="min-h-screen bg-[#F7FAFA]" onClick={handleClickOutside}>
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
    <TransactionHistoryTable 
        data={withdrawals} 
        title="Transaction History" 
        actions={[
        { label: 'View Details', onClick: (t) => { setSelectedTransaction(t); setShowDetailsModal(true); } },
        ]} 
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

        <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            beneficiaryName={beneficiaryName}
        />
        
    </div>
    );
    };

    export default MyEarnings;