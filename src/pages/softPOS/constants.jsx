import CustomEye from '@/components/icons/CustomEye';
import CustomShare from '@/components/icons/CustomShare';
import CustomHistory from '@/components/icons/CustomHistory';

const resolveCustomerName = (row) =>
    row.customerName ||
    row.senderName ||
    row.clientName ||
    row.transferId?.nameEnquiryId?.accountName ||
    row.utilityId?.vasVerificationId?.name ||
    row.title ||
    '-';

const resolveCustomerSub = (row) =>
    row.senderPhone ||
    row.phoneNumber ||
    row.utilityId?.phoneNumber ||
    row.creditAccountNumber ||
    row.accountNumber ||
    row.utilityId?.accountNumber ||
    row.acc ||
    '';

const resolveLocation = (row) => {
    const meta = row.metadata || {};
    const sender = row.senderId || row.userId || {};
    const senderPersonal = sender.personalDetails || {};
    const senderAddress = sender.address || {};
    const state =
        row.location?.state ||
        meta.state ||
        meta.location?.state ||
        senderPersonal.state ||
        senderAddress.state ||
        '';
    const lga =
        row.location?.lga ||
        meta.lga ||
        meta.location?.lga ||
        senderPersonal.lga ||
        senderAddress.lga ||
        senderAddress.city ||
        '';
    if (state && lga) return `${lga}, ${state}`;
    return state || lga || row.state || row.region || row.location || '-';
};

const softposTransactionColumns = [
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 200,
        flex: 1,
        valueGetter: (value, row) => resolveCustomerName(row),
        renderCell: (params) => {
            const name = resolveCustomerName(params.row);
            const sub = resolveCustomerSub(params.row);
            return (
                <div className="flex flex-col justify-center h-full">
                    <div className="text-sm font-general font-medium">{name}</div>
                    {sub && <div className="text-xs text-gray-500">{sub}</div>}
                </div>
            );
        },
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 110,
        flex: 0.7,
        renderCell: (params) => (
            <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
                {params.value || '-'}
            </span>
        ),
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 130,
        flex: 0.8,
        renderCell: (params) => {
            const statusColors = {
                Pending: 'border border-[#FFC535] bg-[#FFF8E6] text-[#B58202]',
                Successful: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]',
                Completed: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]',
                Failed: 'border border-[#E85304] bg-[#FCECE8] text-[#E85304]',
            };
            const statusClass = statusColors[params.value] || 'border border-gray-300 bg-gray-50 text-gray-500';
            return (
                <span className={`px-2 py-1.5 text-center ${statusClass} font-general font-medium text-xs rounded-md flex items-center justify-center h-full`}>
                    {params.value || '-'}
                </span>
            );
        },
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 160,
        flex: 0.9,
        valueGetter: (value, row) => resolveLocation(row),
        renderCell: (params) => (
            <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
                {params.value || '-'}
            </span>
        ),
    },
    {
        field: 'revenue',
        headerName: 'Revenue (₦)',
        width: 130,
        flex: 0.8,
        valueGetter: (value, row) =>
            row.revenue ?? row.commission ?? row.fees ?? row.metadata?.revenue ?? 0,
        renderCell: (params) => (
            <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
                {Number(params.value || 0).toLocaleString()}
            </span>
        ),
    },
    {
        field: 'amount',
        headerName: 'Amount (₦)',
        width: 140,
        flex: 1,
        renderCell: (params) => (
            <span className="text-sm font-general text-[#1E1E1E] flex items-center font-medium h-full">
                {Number(params.value || 0).toLocaleString()}
            </span>
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Transaction Date',
        width: 180,
        flex: 1,
        renderCell: (params) => {
            const val = params.value || params.row.date;
            if (!val) return <span className="text-sm text-gray-500 flex items-center h-full">-</span>;
            const d = new Date(val);
            if (isNaN(d)) return <span className="text-sm text-gray-500 flex items-center h-full">{val}</span>;
            return (
                <span className="text-sm text-gray-500 flex items-center h-full">
                    {d.toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            );
        },
    },
];

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

  const createRegioncolumns = (handleViewRegionDetails) => {
    if (typeof handleViewRegionDetails !== 'function') {
    console.error('handleViewRegionDetails is not a function', handleViewRegionDetails);
    } 
    return [
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
          onClick={() => handleViewRegionDetails(params.row._id || params.row.id || params.row.location)}
          className="font-general flex items-center text-sm text-[#26C8B9] underline underline-offset-2 cursor-pointer font-semibold"
        >
          View Details
        </button>
      )
    }
  ];}

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
      label: 'Download Receipt',
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
        label: 'Download Receipt',
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
          navigate(`/softpos/details/transaction/${transaction.id}`);
        }
      }
    ];

    const createAgentTransactionActions = ({
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
        label: 'Download Receipt',
        type: 'share',
        icon: CustomShare,
        onClick: (tx) => {
          setSelectedTransaction(tx);
          setShowShareModal(true);
        }
      }
    ];


export {multiLineData, chartSeries, createTransactionActions, createRegionTransactionActions, createAgentTransactionActions, createRegioncolumns, softposTransactionColumns};