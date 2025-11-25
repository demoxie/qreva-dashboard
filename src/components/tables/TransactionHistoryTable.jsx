import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import { MoreVertical, Eye, Share2, History } from 'lucide-react';
import SearchFilterBar from '../common/SearchFilterBar';

const TransactionHistoryTable = ({ 
  data, 
  title = "Transaction History",
  actions = [] // Array of action objects from parent
}) => {
  // Dropdown state
  const [dropdown, setDropdown] = useState({ open: false, anchor: null, row: null, x: 0, y: 0 });

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdown.open && dropdown.anchor && !dropdown.anchor.contains(e.target)) {
        setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
      }
    }
    if (dropdown.open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdown]);

  // Default icon mapping
  const iconMap = {
    'view': Eye,
    'share': Share2,
    'history': History,
  };

  const handleAction = (action, row) => {
    if (action.onClick) {
      action.onClick(row);
    }
    setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
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
        <button
          className="text-[#7C8D96] hover:text-[#1E1E1E]"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            setDropdown({
              open: true,
              anchor: e.currentTarget,
              row: params.row,
              x: rect.right - 192,
              y: rect.bottom + 4
            });
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          <MoreVertical size={16} />
        </button>
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
          />
        </CardContent>
      </Card>

      {/* Dynamic Dropdown menu */}
      {dropdown.open && actions.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: dropdown.y,
            left: dropdown.x,
            zIndex: 9999,
          }}
          className="bg-white rounded-lg shadow-lg border border-[#E8EBED] py-2 w-48"
          onMouseDown={e => e.stopPropagation()}
        >
          {actions.map((action, index) => {
            const Icon = action.icon || iconMap[action.type] || Eye;
            return (
              <button
                key={index}
                onClick={() => handleAction(action, dropdown.row)}
                className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
              >
                <Icon size={16} />
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TransactionHistoryTable;