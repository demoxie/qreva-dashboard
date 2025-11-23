import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import { MoreVertical, Eye, Share2 } from 'lucide-react';
import SearchFilterBar from '../common/SearchFilterBar';
import PopupDialog from '../common/PopupDialog';

const TransactionHistoryTable = ({ data, title = "Transaction History" }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleShareReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setShowReceiptModal(true);
  };


  const columns = [
    { 
      field: 'title', 
      headerName: 'Title', 
      width: 180,
      renderCell: (params) => (
        <div>
          <div className="text-sm font-medium">{params.row.title}</div>
          <div className="text-xs text-gray-500">{params.row.acc}</div>
        </div>
      )
    },
    { field: 'desc', headerName: 'Description', width: 180 },
    { field: 'category', headerName: 'Category', width: 130 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
          {params.value}
        </span>
      )
    },
    { 
      field: 'type',
      headerName: 'Type',
      width: 100
    },
    { 
      field: 'amount', 
      headerName: 'Amount (₦)', 
      width: 150,
      valueFormatter: (params) => params?.toLocaleString() 
    },
    { 
      field: 'date', 
      headerName: 'Transaction Date', 
      width: 180,
      renderCell: (params) => (
        <span className="text-sm text-gray-500">{params.value}</span>
      )
    },
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <div className="relative group">
          <button className="text-[#7C8D96] hover:text-[#1E1E1E]">
            <MoreVertical size={16} />
          </button>
          
          {/* Dropdown menu */}
          <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-[#E8EBED] py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => handleViewDetails(params.row)}
              className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
            >
              <Eye size={16} />
              View Transaction Details
            </button>
            <button
              onClick={() => handleShareReceipt(params.row)}
              className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
            >
              <Share2 size={16} />
              Share Receipt
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{title}</CardTitle>
          <SearchFilterBar 
            onSearch={(value) => console.log('Search:', value)}
            onFilter={() => console.log('Filter clicked')}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fafafa',
              borderBottom: '1px solid #e0e0e0',
            },
          }}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </CardContent>
    </Card>
     {/* View Details Modal */}
      <PopupDialog
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="View Details"
        data={selectedTransaction}
        type="transaction"
      />

      {/* Share Receipt Modal */}
      <PopupDialog
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        title="Share Receipt"
        data={selectedTransaction}
        type="transaction"
      />
      </>
  );
};

export default TransactionHistoryTable;