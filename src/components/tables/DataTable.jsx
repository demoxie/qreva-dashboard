import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataGrid } from '@mui/x-data-grid';
import { MoreVertical } from 'lucide-react';
import SearchFilterBar from '../common/SearchFilterBar';
import CustomPagination from '../common/Pagination';
import { Skeleton, Box } from '@mui/material';
import { GridOverlay } from '@mui/x-data-grid';

const DataTable = ({
  data = [],
  columns = [],
  title = "Data Table",
  actions = [], // Array of action objects: [{ label, icon, onClick }]
  onSearch,
  onFilter,
  showSearch = true,
  showCheckbox = true,
  pageSize = 5,
  pageSizeOptions = [5, 10, 25],
  getRowId,
  ...rest
}) => {
  const [dropdown, setDropdown] = useState({ open: false, anchor: null, row: null, x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleAction = (action, row) => {
    if (action.onClick) {
      action.onClick(row);
    }
    setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Add actions column if actions are provided
  const gridColumns = actions.length > 0 
    ? [
        ...columns,
        {
          field: 'actions',
          headerName: '',
          width: 80,
          sortable: false,
          renderCell: (params) => (
            <button
              className="text-[#7C8D96] hover:text-[#1E1E1E] flex items-center cursor-pointer border border-[#E4E7EC] p-2 rounded h-full"
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
      ]
    : columns;

  const CustomLoadingOverlay = () => (
    <GridOverlay>
      <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Skeleton variant="rectangular" width="30%" height={20} />
            <Skeleton variant="rectangular" width="40%" height={20} />
            <Skeleton variant="rectangular" width="15%" height={20} />
            <Skeleton variant="rectangular" width="15%" height={20} />
          </Box>
        ))}
      </Box>
    </GridOverlay>
  );

  const isLoading = rest.loading || rest.isLoading;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-urbanist font-semibold text-[#1E1E1E]">{title}</CardTitle>
            {showSearch && (
              <SearchFilterBar 
                onSearch={handleSearch}
                onFilter={onFilter || (() => console.log('Filter clicked'))}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="px-0 h-full">
          <DataGrid
            className='w-full'
            rows={data}
            columns={gridColumns}
            getRowId={getRowId || ((row) => row._id || row.id || row.userId || row.clientId)}
            checkboxSelection={showCheckbox}
            disableRowSelectionOnClick
            disableColumnResize
            columnBufferPx={0}
            paginationMode={rest.pagination ? "server" : "client"}
            rowCount={rest.pagination?.total || data.length}
            loading={isLoading}
            paginationModel={{ 
              page: (rest.pagination?.page || 1) - 1, 
              pageSize: rest.pagination?.limit || pageSize 
            }}
            onPaginationModelChange={(model) => {
              if (rest.onPageChange) {
                rest.onPageChange(model.page + 1);
              }
            }}
            {...rest}
            sx={{
              border: 0,
              width: '%100',
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'transparent !important',
                },
                '& .MuiDataGrid-cell:hover': {
                    backgroundColor: 'transparent !important',
                },
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important',
                },
                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                    outline: 'none !important',
                },
                '& .MuiDataGrid-row.Mui-selected': {
                    backgroundColor: 'transparent !important',
                },
                '& .MuiDataGrid-row.Mui-selected:hover': {
                    backgroundColor: 'transparent !important',
                },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
                padding: '12px 16px',
                //margin: '16px 0px',
                fontSize: '14px',
                fontFamily: 'General Sans, sans-serif',
                color: '#1E1E1E',
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'transparent',
                borderBottom: '1px solid #E8EBED',
                minHeight: '48px !important',
                maxHeight: '48px !important',
                lineHeight: '48px !important',
              },
              '& .MuiDataGrid-columnHeader': {
                padding: '12px 0px',
                backgroundColor: '#F9FAFB',
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-within': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: '12px',
                marginLeft: '16px',
                fontWeight: 600,
                fontFamily: 'Urbanist, sans-serif',
                color: '#344054',
                textTransform: 'none',
              },
            }}
            slots={{
              pagination: CustomPagination,
              loadingOverlay: CustomLoadingOverlay,
            }}
            slotProps={{
              pagination: {
                currentPage: rest.pagination?.page || 1,
                totalPages: rest.pagination?.totalPages || Math.ceil((rest.pagination?.total || data.length) / (rest.pagination?.limit || pageSize)),
                onPageChange: rest.onPageChange,
                totalItems: rest.pagination?.total || data.length,
                itemsPerPage: rest.pagination?.limit || pageSize
              }
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
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleAction(action, dropdown.row)}
                className="w-full px-4 py-2 text-left text-sm font-general text-[#1E1E1E] hover:bg-[#F5F6F7] flex items-center gap-2"
              >
                {Icon && <Icon size={16} />}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DataTable;