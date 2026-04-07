import CustomEye from '@/components/icons/CustomEye';
import CustomApprove from '@/components/icons/CustomApprove';
import CustomDecline from '@/components/icons/CustomDecline';

export const approvalTabs = [
  { key: 'Pending', label: 'Pending' },
  { key: 'Approved', label: 'Approved' },
  { key: 'Declined', label: 'Declined' }
];

export const approvalColumns = [
  {
    field: 'name',
    headerName: 'Customer Name',
    width: 250,
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="text-sm font-medium text-[#1E1E1E]">{params.row.name}</div>
          <div className="text-xs text-gray-500">{params.row.email}</div>
        </div>
      </div>
    )
  },
  { 
    field: 'account', 
    headerName: 'User Account', 
    width: 180,
    flex: 1,
  },
  { 
    field: 'tier', 
    headerName: 'Tier', 
    width: 100,
    flex: 1, 
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    flex: 1,
    renderCell: (params) => {
      const statusStyles = {
        Approved: 'border border-[#4ED17E] bg-[#E9F9EF] text-[#188C43]',
        Declined: 'border border-[#E56566] bg-[#FCECEC] text-[#9E2D2D]',
        Pending: 'border border-[#FFC535] bg-[#FFF8E6] text-[#B58202]'
      };
      
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-medium ${statusStyles[params.value]}`}>
          {params.value}
        </span>
      );
    }
  },
  { 
    field: 'date', 
    headerName: 'Submission Date', 
    width: 220,
    flex: 1, 
  },
];

export const createApprovalActions = (
  navigate,
  activeTab,
  onAccept,
  onDecline
) => [
  {
    label: 'View Details',
    icon: CustomEye,
    onClick: (row) =>
      navigate(`/account-approvals/${activeTab}/${row._id}`)
  },
  {
    label: 'Accept Approval',
    icon: CustomApprove,
    onClick: (row) => onAccept(row)
  },
  {
    label: 'Decline Approval',
    icon: CustomDecline,
    onClick: (row) => onDecline(row)
  }
];