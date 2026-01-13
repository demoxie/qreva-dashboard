import CustomEye from '@/components/icons/CustomEye';
import CustomShare from '@/components/icons/CustomShare';
import CustomHistory from '@/components/icons/CustomHistory';

const createRegioncolumns = (handleViewRegionDetails) => [
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

  const transactionColumns =  [
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

  const createTransactionActions = ({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  }) => [
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

  const createRegionTransactionActions = ({
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
          navigate(`/transfers/details/transaction/${transaction.id}`);
        }
      }
    ];

    const createCustomerTransactionActions = ({
        setSelectedTransaction,
        setShowDetailsModal,
        setShowShareModal,
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
      }
    ];


export { createRegioncolumns, transactionColumns, createTransactionActions, createRegionTransactionActions, createCustomerTransactionActions };  