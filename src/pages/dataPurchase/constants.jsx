import CustomEye from "@/components/icons/CustomEye";
import CustomHistory from "@/components/icons/CustomHistory";
import CustomShare from "@/components/icons/CustomShare";


export const dataProviders = [
    { id: 1, name: 'Airtel', value: 2000000, color: '#E31E24', percentage: 85 },
    { id: 2, name: 'MTN', value: 2000000, color: '#FFCB05', percentage: 75 },
    { id: 3, name: 'Glo', value: 2000000, color: '#00A65A', percentage: 65 },
    { id: 4, name: 'Etisalat', value: 2000000, color: '#006F3E', percentage: 70 },
    { id: 5, name: '9Mobile', value: 2000000, color: '#00923F', percentage: 60 }
];

export const createCustomerTransactionActions = ({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
}) => [
    {
      label: 'View Transaction Details',
      type: 'view',
      icon: CustomEye,
      onClick: (tx) => {
        setSelectedTransaction(tx);
        setShowDetailsModal(true);
      }
    },
    {
      label: 'Share Receipt',
      type: 'share',
      icon: CustomShare,
      onClick: (tx) => {
        setSelectedTransaction(tx);
        setShowShareModal(true);
      }
    },
    {
      label: 'View Transaction History',
      type: 'history',
      icon: CustomHistory,
      onClick: (tx) => {
        navigate(`/data/details/transaction/${tx.id}`);
      }
    }
  ];


// Custom stats for region view
export const createRegionStats = (region) => [
    { 
    label: 'Total Transactions', 
    value: region.total?.toLocaleString() || '0', 
    change: '+12%', 
    subtext: '55,000 in last 24 hours' 
    },
    { 
    label: 'Total Revenue (₦)', 
    value: `₦${region.revenue?.toLocaleString() || '0'}`, 
    change: '+18%', 
    subtext: '₦25,000 in last 24 hours' 
    },
    { 
    label: 'Transaction Volume (₦)', 
    value: `₦${region.volume?.toLocaleString() || '0'}`, 
    change: '+10%', 
    subtext: '₦35,000 in last 24 hours' 
    },
    { 
    label: 'Success Rate', 
    value: `${region.rate}%`, 
    change: '+3%', 
    subtext: '99% in last 24 hours' 
    }
];

    // Actions for region transactions
export const createRegionTransactionActions = ({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
}) => [
    {
    label: 'View Transaction Details',
    type: 'view',
    onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
    }
    },
    {
    label: 'Share Receipt',
    type: 'share',
    onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setShowShareModal(true);
    }
    },
    {
    label: 'View Transaction History',
    type: 'history',
    onClick: (transaction) => {
        navigate(`/data/details/transaction/${transaction.id}`);
    }
    }
];


  // Custom stats for transaction/customer view
export const customerStats = [
    { 
    label: 'Total Transactions', 
    value: '52,145', 
    change: '+25%', 
    subtext: '60,000 in last 24 hours' 
    },
    { 
    label: 'Total Transaction Volume', 
    value: '₦4,250,000', 
    change: '-8%', 
    subtext: '₦55,000 in last 24 hours' 
    },
    { 
    label: 'Highest One Time Purchase', 
    value: '₦5,500', 
    change: '+12%', 
    subtext: '550 in last 24 hours' 
    },
    { 
    label: 'Success Rate', 
    value: '92%', 
    change: '+3%', 
    subtext: '3% in last 24 hours' 
    }
];
