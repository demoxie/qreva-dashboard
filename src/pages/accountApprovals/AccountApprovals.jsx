import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomApprove from '@/components/icons/CustomApprove';
import CustomDecline from '@/components/icons/CustomDecline';

// Mock Data
const mockApprovals = [
  { id: 1, name: 'Rejoice Regina Rose', email: 'emailaddress@gmail.com', account: 'Personal Account', tier: 'Tier 2', status: 'Declined', date: '10:00 AM | 25th March, 2025' },
  { id: 2, name: 'John Doe', email: 'johndoe@gmail.com', account: 'Agent Account', tier: 'Tier 2', status: 'Pending', date: '10:00 AM | 24th March, 2025' },
  { id: 3, name: 'Sarah Smith', email: 'sarah@gmail.com', account: 'Merchant', tier: 'Tier 2', status: 'Declined', date: '09:00 AM | 25th March, 2025' },
  { id: 4, name: 'Michael Brown', email: 'michael@gmail.com', account: 'Agent Account', tier: 'Tier 2', status: 'Approved', date: '10:00 AM | 25th March, 2025' },
  { id: 5, name: 'Emily Davis', email: 'emily@gmail.com', account: 'Personal Account', tier: 'Tier 2', status: 'Declined', date: '11:00 AM | 25th March, 2025' },
];

const AccountApprovals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const tabs = [
    { label: 'Pending', count: 9 },
    { label: 'Approved', count: 0 },
    { label: 'Declined', count: 0 }
  ];

  // Handle Accept Approval
  const handleAcceptApproval = () => {
    console.log('Accepting approval for:', selectedUser);
    // Add your API call here
    setShowAcceptModal(false);
    setSelectedUser(null);
  };

  // Handle Decline Approval
  const handleDeclineApproval = () => {
    console.log('Declining approval for:', selectedUser);
    // Add your API call here
    setShowDeclineModal(false);
    setSelectedUser(null);
  };

  // Columns definition
  const columns = [
    {
      field: 'name',
      headerName: 'Customer Name',
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
           {/* Checkbox is handled by DataGrid checkboxSelection prop */}
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
        let styleClass = '';
        if (activeTab === 'Approved') styleClass = 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]';
        else if (activeTab === 'Declined') styleClass = 'border border-[#E56566] bg-[#FCECEC] text-[#9E2D2D]';
        else styleClass = 'border border-[#FFC535] bg-[#FFF8E6] text-[#B58202]';

        // Override based on row data for demo
        if (params.value === 'Declined') styleClass = 'border border-[#E56566] bg-[#FCECEC] text-[#9E2D2D]';
        if (params.value === 'Approved') styleClass = 'border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]';
        return (
          <span className={`px-3 py-1 rounded-md text-xs font-medium ${styleClass}`}>
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

  const tableActions = [
    {
      label: 'View Details',
      icon: CustomEye,
      onClick: (row) => navigate(`/users/${row.id}`)
    },
    {
      label: 'Accept Approval',
      icon: CustomApprove,
      onClick: (row) => {
        setSelectedUser(row);
        setShowAcceptModal(true);
      }
    },
    {
      label: 'Decline Approval',
      icon: CustomDecline,
      onClick: (row) => {
        setSelectedUser(row);
        setShowDeclineModal(true);
      }
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Account Approvals"
          subtitle="Here is the full list of KYC approvals on the platform"
          showTimeFilter={false}
          hidden={true}
        />

        {/* Custom Tabs */}
        <div className="border-b border-gray-200 mb-6 mt-4">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`pb-3 text-sm font-medium relative ${
                  activeTab === tab.label ? 'text-[#FF5B04]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && activeTab === tab.label && (
                   <span className="ml-2 bg-[#FF5B041A] text-[#FF5B04] text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
                )}
                 {tab.count > 0 && activeTab !== tab.label && (
                   <span className="ml-2 bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
                )}
                {activeTab === tab.label && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5B04]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <DataTable 
          data={mockApprovals}
          title="Pending Approvals"
          columns={columns}
          actions={tableActions}
        />
      </div>

      {/* Accept Approval Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accept Approval</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to accept the approval for <span className="font-medium">{selectedUser?.name}</span>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAcceptModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAcceptApproval}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4ED17E] rounded-lg hover:bg-[#3DB86A]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Approval Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Decline Approval</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to decline the approval for <span className="font-medium">{selectedUser?.name}</span>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeclineModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineApproval}
                className="px-4 py-2 text-sm font-medium text-white bg-[#E56566] rounded-lg hover:bg-[#D14546]"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountApprovals;