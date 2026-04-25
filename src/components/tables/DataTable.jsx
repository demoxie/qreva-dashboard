import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataGrid } from "@mui/x-data-grid";
import { MoreVertical, Download, Search } from "lucide-react";
import CustomPagination from "../common/Pagination";
import { Skeleton, Box } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";

const DataTable = ({
  data = [],
  columns = [],
  title = "Data Table",
  actions = [], // Array of action objects: [{ label, icon, onClick }]
  onSearch,
  onFilter,
  onExport,
  showSearch = true,
  showCheckbox = true,
  showExport = true,
  pageSize = 5,
  pageSizeOptions = [5, 10, 25],
  getRowId,
  // Extract pagination props so they don't conflict via {...rest}
  pagination,
  onPageChange,
  paginationMode,
  paginationModel: externalPaginationModel,
  onPaginationModelChange,
  rowCount,
  ...rest
}) => {
  const [dropdown, setDropdown] = useState({
    open: false,
    anchor: null,
    row: null,
    x: 0,
    y: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const filterRef = useRef(null);
  const searchDebounceRef = useRef(null);

  const STATUS_OPTIONS = ["All", "Successful", "Pending", "Failed"];

  // CSV Export utility
  const handleExport = useCallback(() => {
    if (onExport) {
      onExport(data);
      return;
    }

    // Default: export visible columns + rows as CSV
    const exportColumns = columns.filter(col => col.field !== 'actions');
    const headers = exportColumns.map(col => col.headerName || col.field).join(',');
    const rows = data.map(row =>
      exportColumns.map(col => {
        const value = row[col.field];
        // Escape commas and quotes in CSV values
        const strVal = value !== undefined && value !== null ? String(value) : '';
        return strVal.includes(',') || strVal.includes('"')
          ? `"${strVal.replace(/"/g, '""')}"`
          : strVal;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_').toLowerCase()}_report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data, columns, title, onExport]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e) {
      if (
        dropdown.open &&
        dropdown.anchor &&
        !dropdown.anchor.contains(e.target)
      ) {
        setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
      }
    }
    if (dropdown.open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  const handleAction = (action, row) => {
    if (action.onClick) {
      action.onClick(row);
    }
    setDropdown({ open: false, anchor: null, row: null, x: 0, y: 0 });
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      if (onSearch) onSearch(value);
    }, 400);
  };

  const handleFilterSelect = (status) => {
    setSelectedStatus(status);
    setFilterOpen(false);
    if (onFilter) onFilter({ status: status === "All" ? "" : status });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  // Add actions column if actions are provided
  const gridColumns =
    actions.length > 0
      ? [
          ...columns,
          {
            field: "actions",
            headerName: "",
            width: 80,
            sortable: false,
            renderCell: (params) => (
              <button
                className="text-[#7C8D96] hover:text-[#1E1E1E] flex items-center cursor-pointer border border-[#E4E7EC] p-2 rounded h-full"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setDropdown({
                    open: true,
                    anchor: e.currentTarget,
                    row: params.row,
                    x: rect.right - 192,
                    y: rect.bottom + 4,
                  });
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <MoreVertical size={16} />
              </button>
            ),
          },
        ]
      : columns;

  const CustomLoadingOverlay = () => (
    <GridOverlay>
      <Box
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ display: "flex", gap: 2, width: "100%" }}>
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
            <CardTitle className="text-lg font-urbanist font-semibold text-[#1E1E1E]">
              {title}
            </CardTitle>
            <div className="flex items-center gap-3">
              {showSearch && (
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 pr-3 py-2 text-sm font-general border border-[#E8EBED] rounded-lg outline-none focus:border-[#84C4CF] bg-white w-52"
                    />
                  </div>
                  <div className="relative" ref={filterRef}>
                    <button
                      onClick={() => setFilterOpen((v) => !v)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-general border rounded-lg transition-colors ${filterOpen || selectedStatus !== "All" ? "border-[#084059] text-[#084059] bg-[#F0F8FA]" : "border-[#E8EBED] text-[#98A2B3] bg-white hover:bg-[#F5F6F7]"}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 5.83337H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path opacity="0.4" d="M2.5 14.1666H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M15 14.1666H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path opacity="0.4" d="M12.5 5.83337H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M5 5.83337C5 5.05681 5 4.66852 5.12687 4.36223C5.29602 3.95386 5.62048 3.6294 6.02886 3.46024C6.33515 3.33337 6.72343 3.33337 7.5 3.33337C8.27657 3.33337 8.66483 3.33337 8.97117 3.46024C9.3795 3.6294 9.704 3.95386 9.87317 4.36223C10 4.66852 10 5.05681 10 5.83337C10 6.60994 10 6.99822 9.87317 7.30452C9.704 7.71289 9.3795 8.03735 8.97117 8.20651C8.66483 8.33337 8.27657 8.33337 7.5 8.33337C6.72343 8.33337 6.33515 8.33337 6.02886 8.20651C5.62048 8.03735 5.29602 7.71289 5.12687 7.30452C5 6.99822 5 6.60994 5 5.83337Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 14.1666C10 13.39 10 13.0018 10.1268 12.6955C10.296 12.2871 10.6205 11.9626 11.0288 11.7935C11.3352 11.6666 11.7234 11.6666 12.5 11.6666C13.2766 11.6666 13.6648 11.6666 13.9712 11.7935C14.3795 11.9626 14.704 12.2871 14.8732 12.6955C15 13.0018 15 13.39 15 14.1666C15 14.9432 15 15.3315 14.8732 15.6378C14.704 16.0461 14.3795 16.3706 13.9712 16.5398C13.6648 16.6666 13.2766 16.6666 12.5 16.6666C11.7234 16.6666 11.3352 16.6666 11.0288 16.5398C10.6205 16.3706 10.296 16.0461 10.1268 15.6378C10 15.3315 10 14.9432 10 14.1666Z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      Filter
                      {selectedStatus !== "All" && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#084059] text-white rounded-full">{selectedStatus}</span>
                      )}
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-[#E8EBED] rounded-lg shadow-lg py-1 w-44">
                        <p className="px-3 py-1.5 text-xs font-urbanist font-semibold text-[#7C8D96] uppercase tracking-wide">Status</p>
                        {STATUS_OPTIONS.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleFilterSelect(status)}
                            className={`w-full text-left px-3 py-2 text-sm font-general transition-colors flex items-center justify-between ${selectedStatus === status ? "text-[#084059] bg-[#F0F8FA] font-medium" : "text-[#1E1E1E] hover:bg-[#F5F6F7]"}`}
                          >
                            {status}
                            {selectedStatus === status && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {showExport && (
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-general font-medium text-[#1E1E1E] bg-white border border-[#E8EBED] rounded-lg hover:bg-[#F5F6F7] transition-colors"
                  title="Download Report"
                >
                  <Download size={16} className="text-[#7C8D96]" />
                  <span className="hidden sm:inline">Download Report</span>
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 h-full">
          <DataGrid
            className="w-full"
            rows={data}
            columns={gridColumns}
            getRowId={
              getRowId ||
              ((row) => row._id || row.id || row.userId || row.clientId)
            }
            checkboxSelection={showCheckbox}
            disableRowSelectionOnClick
            disableColumnResize
            columnBufferPx={0}
            paginationMode={
              paginationMode || (pagination ? "server" : "client")
            }
            rowCount={rowCount ?? pagination?.total ?? data.length}
            loading={isLoading}
            paginationModel={
              externalPaginationModel
                ? externalPaginationModel
                : {
                    page: (pagination?.page || 1) - 1,
                    pageSize: pagination?.limit || pageSize,
                  }
            }
            onPaginationModelChange={(model) => {
              if (onPaginationModelChange) {
                onPaginationModelChange(model);
              } else if (onPageChange) {
                onPageChange(model.page + 1);
              }
            }}
            {...rest}
            sx={{
              border: 0,
              width: "%100",
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-cell:hover": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                {
                  outline: "none !important",
                },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
                padding: "12px 16px",
                margin: "12px 0px",
                fontSize: "14px",
                fontFamily: "General Sans, sans-serif",
                color: "#1E1E1E",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "transparent",
                borderBottom: "1px solid #E8EBED",
                minHeight: "48px !important",
                maxHeight: "48px !important",
                lineHeight: "48px !important",
              },
              "& .MuiDataGrid-columnHeader": {
                padding: "12px 0px",
                backgroundColor: "#F9FAFB",
                "&:focus": {
                  outline: "none",
                },
                "&:focus-within": {
                  outline: "none",
                },
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "12px",
                marginLeft: "16px",
                fontWeight: 600,
                fontFamily: "Urbanist, sans-serif",
                color: "#344054",
                textTransform: "none",
              },
            }}
            slots={{
              pagination: CustomPagination,
              loadingOverlay: CustomLoadingOverlay,
            }}
            slotProps={{
              pagination: {
                currentPage: externalPaginationModel
                  ? externalPaginationModel.page + 1
                  : pagination?.page || 1,
                totalPages: externalPaginationModel
                  ? Math.ceil(
                      (rowCount || data.length) /
                        (externalPaginationModel.pageSize || pageSize),
                    )
                  : pagination?.totalPages ||
                    Math.ceil(
                      (pagination?.total || data.length) /
                        (pagination?.limit || pageSize),
                    ),
                onPageChange: externalPaginationModel
                  ? (page) =>
                      onPaginationModelChange?.({
                        ...externalPaginationModel,
                        page: page - 1,
                      })
                  : onPageChange,
                totalItems: rowCount ?? pagination?.total ?? data.length,
                itemsPerPage:
                  externalPaginationModel?.pageSize ||
                  pagination?.limit ||
                  pageSize,
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Dynamic Dropdown menu */}
      {dropdown.open && actions.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: dropdown.y,
            left: dropdown.x,
            zIndex: 9999,
          }}
          className="bg-white rounded-lg shadow-lg border border-[#E8EBED] py-2 w-48"
          onMouseDown={(e) => e.stopPropagation()}
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
