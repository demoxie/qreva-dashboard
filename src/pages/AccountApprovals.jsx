import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/tables/DataTable';
import CustomEye from '@/components/icons/CustomEye';
import CustomUser from '@/components/icons/CustomUser';
import CustomHistory from '@/components/icons/CustomHistory';

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

  const tabs = [
    { label: 'Pending', count: 9 },
    { label: 'Approved', count: 0 },
    { label: 'Declined', count: 0 }
  ];

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
      field: 
      'tier', 
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
        icon: CustomUser,
        onClick: (row) => {
          setSelectedAggregator(row);
          setShowSuspendModal(true);
        }
      },
      {
        label: 'Decline Approval',
        icon: CustomHistory,
        onClick: (row) => navigate(`/users/${row.id}?tab=transactions`)
      }
    ];


  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Account Approvals"
          subtitle="Here is the full list of KYC approvals on the platform"
          showTimeFilter={false} // Custom filter UI below
        />

        {/* Custom Tabs */}
        <div className="border-b border-gray-200 mb-6">
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
    </div>
  );
};

export default AccountApprovals;