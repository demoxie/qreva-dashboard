import DataTable from './DataTable';
import { Eye, Share2, History } from 'lucide-react';

const TransactionHistoryTable = ({ 
  data, 
  title = "Transaction History",
  actions = []
}) => {
  // Define default columns for transaction history
  const columns = [
    { 
      field: 'title', 
      headerName: 'Title', 
      width: 180,
      renderCell: (params) => (
        <div className='flex flex-col justify-center h-full'>
          <div className="text-sm font-medium flex items-center h-full">{params.row.title}</div>
          <div className="text-xs text-gray-500 flex items-center h-full">{params.row.acc}</div>
        </div>
      )
    },
    { 
      field: 'desc', 
      headerName: 'Description',
      width: 180,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
          {params.value}
        </span>
      ) 
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 130,
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
      renderCell: (params) => (
        <span className="px-2 py-1.5 text-center bg-[#E9F9EF] text-[#4ED17E] font-general font-medium border border-[#4ED17E] text-xs rounded-md flex items-center justify-center h-full">
          {params.value}
        </span>
      )
    },
    { 
      field: 'type',
      headerName: 'Type',
      width: 100,
      renderCell: (params) => (
        <span className="text-sm font-general text-[#1E1E1E] flex items-center h-full">
          {params.value}
        </span>
      )
    },
    { 
      field: 'amount', 
      headerName: 'Amount (₦)', 
      width: 150,
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
      renderCell: (params) => (
        <span className="text-sm text-gray-500 flex items-center h-full">{params.value}</span>
      )
    }
  ];

  // Default actions if none provided
  const defaultActions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: (row) => console.log('View:', row)
    },
    {
      label: 'Share Transaction',
      icon: Share2,
      onClick: (row) => console.log('Share:', row)
    },
    {
      label: 'View History',
      icon: History,
      onClick: (row) => console.log('History:', row)
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title={title}
      actions={actions.length > 0 ? actions : defaultActions}
    />
  );
};

export default TransactionHistoryTable;