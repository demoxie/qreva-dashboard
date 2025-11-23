import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import SearchFilterBar from '../common/SearchFilterBar';
import PopupDialog from '../common/PopupDialog';

const TransferRegionsTable = ({ data = [], title = "Top Regions" }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleViewDetails = (region) => {
    setSelectedRegion(region);
    setShowDetailsModal(true);
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
      field: 'totalTransfers', 
      headerName: 'Total Transfers', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'volume', 
      headerName: 'Total Transfers Volume(₦)', 
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'revenue', 
      headerName: 'Total Revenue (₦)', 
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
          {params.value?.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'successRate', 
      headerName: 'Success Rate (%)', 
      flex: 0.8,
      minWidth: 140,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E]">
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
          onClick={() => handleViewDetails(params.row)}
          className="font-general text-sm text-[#06b6d4] hover:text-[#0891b2] font-medium transition-colors"
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <>
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
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #F5F6F7',
                padding: '16px',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'transparent',
                borderBottom: '1px solid #E8EBED',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: '12px',
                fontWeight: 500,
                color: '#7C8D96',
              },
            }}
          />
        </CardContent>
      </Card>

      <PopupDialog
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={`Region Details - ${selectedRegion?.location}`}
        data={selectedRegion}
        type="region"
      />
    </>
  );
};

export default TransferRegionsTable;