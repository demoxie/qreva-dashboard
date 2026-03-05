import CustomEye from '../icons/CustomEye';
import CustomHistory from '../icons/CustomHistory';
import CustomShare from '../icons/CustomShare';
import DataTable from './DataTable';

const TransactionHistoryTable = ({ 
  data, 
  title = "Transaction History",
  actions = [],
  ...rest
}) => {
  // Define default columns for transaction history
  const columns = [
    { 
      field: 'title', 
      headerName: 'Title', 
      width: 180,
      flex: 1,
      renderCell: (params) => (
        <div className='flex flex-col justify-center h-full'>
          <div className="text-sm font-general font-medium flex items-center h-full">{params.row.title}</div>
          <div className="text-xs text-gray-500 flex items-center h-full">{params.row.acc}</div>
        </div>
      )
    },
    { 
      field: 'desc', 
      headerName: 'Description',
      width: 180,
      flex: 1,
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
          Completed: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]',
          Failed: 'border border-[#E85304] bg-[#FCECE8] text-[#E85304]'
        };
        const statusClass = statusColors[params.value] || 'border border-gray-300 bg-gray-50 text-gray-500';
        return(
        <span className={`px-2 py-1.5 text-center ${statusClass} font-general font-medium  text-xs rounded-md flex items-center justify-center h-full`}>
          {params.value}
        </span>
        );
      }
    },
    { 
      field: 'type',
      headerName: 'Type',
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
      headerName: 'Amount (₦)', 
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

  // Default actions if none provided
  const defaultActions = [
    {
      label: 'View Details',
      icon: CustomEye,
      onClick: (row) => console.log('View:', row)
    },
    {
      label: 'Share Transaction',
      icon: CustomShare,
      onClick: (row) => console.log('Share:', row)
    },
    {
      label: 'View History',
      icon: CustomHistory,
      onClick: (row) => console.log('History:', row)
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title={title}
      actions={actions.length > 0 ? actions : defaultActions}
      {...rest}
    />
  );
};

export default TransactionHistoryTable;