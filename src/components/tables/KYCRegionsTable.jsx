import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import SearchFilterBar from '../common/SearchFilterBar';
import CustomPagination from '../common/Pagination';

const KYCRegionsTable = ({ data = [], title = "Top Regions", onViewDetails }) => {
  const handleViewDetails = (region) => {
    // If parent provides handler, use it (for navigation)
    if (onViewDetails) {
      onViewDetails(region.id);
    }
  };

  const columns = [
    { 
      field: 'location', 
      headerName: 'Location', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.row.id}. {params.row.location}
        </span>
      )
    },
    { 
      field: 'totalKYC', 
      headerName: 'Total Transactions', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'totalSum', 
      headerName: 'Total Sum (₦)', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'revenue', 
      headerName: 'Revenue (₦)', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'commission', 
      headerName: 'Commission (₦)', 
      flex: 0.8,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
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
          onClick={() => handleViewDetails(params.row)}
          className="font-general text-sm text-[#06b6d4] hover:text-[#0891b2] font-medium transition-colors"
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-urbanist font-semibold text-[#1E1E1E]">
            {title}
          </CardTitle>
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
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterSelectedRowCount
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-main': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #F5F6F7',
              padding: '16px',
              fontSize: '14px',
              fontFamily: 'General Sans, sans-serif',
              color: '#1E1E1E',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'transparent',
              borderBottom: '1px solid #E8EBED',
              minHeight: '48px !important',
              maxHeight: '48px !important',
              lineHeight: '48px !important',
            },
            '& .MuiDataGrid-columnHeader': {
              padding: '12px 16px',
              '&:focus': {
                outline: 'none',
              },
              '&:focus-within': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'General Sans, sans-serif',
              color: '#7C8D96',
              textTransform: 'none',
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: '#FAFBFB',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              marginTop: '16px',
              minHeight: '56px',
            },
            '& .MuiTablePagination-root': {
              color: '#7C8D96',
              fontFamily: 'General Sans, sans-serif',
            },
            '& .MuiTablePagination-displayedRows': {
              fontSize: '14px',
              fontFamily: 'General Sans, sans-serif',
              color: '#7C8D96',
            },
            '& .MuiTablePagination-actions': {
              gap: '8px',
            },
            '& .MuiTablePagination-actions button': {
              padding: '8px 12px',
              border: '1px solid #E8EBED',
              borderRadius: '6px',
              color: '#7C8D96',
              fontFamily: 'General Sans, sans-serif',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#F5F6F7',
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                border: '1px solid #E8EBED',
              },
            },
            '& .MuiDataGrid-virtualScroller': {
              marginTop: '48px !important',
            },
          }}
          slots={{
            pagination: CustomPagination,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default KYCRegionsTable;