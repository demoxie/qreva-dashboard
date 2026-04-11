import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataGrid } from "@mui/x-data-grid";
import SearchFilterBar from "../common/SearchFilterBar";
import CustomPagination from "../common/Pagination";

const RegionsTable = ({
  data = [],
  columns = [],
  title = "Top Regions",
  onViewDetails,
}) => {
  const handleViewDetails = (region) => {
    if (onViewDetails) {
      onViewDetails(region._id || region.id || region.location);
    }
  };

  const defaultColumns = [
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm flex items-center gap-3">
          <p className="bg-[#F7FAFA] rounded-full w-6 h-6 flex items-center justify-center text-[#808C91] text-center border-2 border-[#E9F1F3]">
            {params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}
          </p>{" "}
          <p className="font-medium leading-[148%] text-[#1E1E1E]">
            {params.row.location}
          </p>
        </span>
      ),
    },
    {
      field: "total",
      headerName: "Total Transactions",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center leading-[156%]">
          {params.row.totalTransactions?.toLocaleString() ||
            params.value?.toLocaleString() ||
            0}
        </span>
      ),
    },
    {
      field: "revenue",
      headerName: "Total Revenue (₦)",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center font-medium">
          {params.row.totalRevenue?.toLocaleString() ||
            params.value?.toLocaleString()}
        </span>
      ),
    },
    {
      field: "volume",
      headerName: "Total Transaction Volume(₦)",
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center font-medium">
          {params.row.totalTransactionVolume?.toLocaleString() ||
            params.value?.toLocaleString()}
        </span>
      ),
    },
    {
      field: "rate",
      headerName: "Success Rate (%)",
      flex: 0.8,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-general text-sm text-[#1E1E1E] flex items-center">
          {params.row.successRate || params.value}%
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleViewDetails(params.row)}
          className="font-general flex items-center text-sm text-[#26C8B9] underline underline-offset-2 cursor-pointer font-semibold"
        >
          View Details
        </button>
      ),
    },
  ];

  const tableColumns = columns.length > 0 ? columns : defaultColumns;

  return (
    <Card className="mb-6 px-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-urbanist leading-[145%] font-semibold text-[#1E1E1E]">
            {title}
          </CardTitle>
          <SearchFilterBar
            onSearch={(value) => console.log("Search:", value)}
            onFilter={() => console.log("Filter clicked")}
          />
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <DataGrid
          rows={data}
          columns={tableColumns}
          getRowId={(row) =>
            row._id || row.id || row.location || row.name || Math.random()
          }
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterSelectedRowCount
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-main": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F5F6F7",
              padding: "16px",
              fontSize: "14px",
              fontFamily: "General Sans, sans-serif",
              color: "#1E1E1E",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "transparent",
              borderBottom: "1px solid #E8EBED",
              minHeight: "48px !important",
              maxHeight: "48px !important",
              lineHeight: "48px !important",
            },
            "& .MuiDataGrid-columnHeader": {
              padding: "12px 16px",
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
              fontWeight: 600,
              fontFamily: "Urbanist, sans-serif",
              color: "#344054",
              textTransform: "none",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: "#FAFBFB",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              marginTop: "16px",
              minHeight: "56px",
            },
            "& .MuiTablePagination-root": {
              color: "#7C8D96",
              fontFamily: "General Sans, sans-serif",
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: "14px",
              fontFamily: "General Sans, sans-serif",
              color: "#7C8D96",
            },
            "& .MuiTablePagination-actions": {
              gap: "8px",
            },
            "& .MuiTablePagination-actions button": {
              padding: "8px 12px",
              border: "1px solid #E8EBED",
              borderRadius: "6px",
              color: "#7C8D96",
              fontFamily: "General Sans, sans-serif",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#F5F6F7",
              },
              "&.Mui-disabled": {
                opacity: 0.5,
                border: "1px solid #E8EBED",
              },
            },
            "& .MuiDataGrid-virtualScroller": {
              marginTop: "48px !important",
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

export default RegionsTable;
