import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { MoreVertical, Eye, Filter } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';

// Mock Data
const mockApprovals = [
  { id: 1, name: 'Rejoice Regina Rose', email: 'emailaddress@gmail.com', account: 'Personal Account', tier: 'Tier 2', status: 'Declined', date: '10:00 AM | 25th March, 2025' },
  { id: 2, name: 'John Doe', email: 'johndoe@gmail.com', account: 'Agent Account', tier: 'Tier 2', status: 'Declined', date: '10:00 AM | 24th March, 2025' },
  { id: 3, name: 'Sarah Smith', email: 'sarah@gmail.com', account: 'Merchant', tier: 'Tier 2', status: 'Declined', date: '09:00 AM | 25th March, 2025' },
  { id: 4, name: 'Michael Brown', email: 'michael@gmail.com', account: 'Agent Account', tier: 'Tier 2', status: 'Declined', date: '10:00 AM | 25th March, 2025' },
  { id: 5, name: 'Emily Davis', email: 'emily@gmail.com', account: 'Personal Account', tier: 'Tier 2', status: 'Declined', date: '11:00 AM | 25th March, 2025' },
];

const AccountApprovals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending');
  const [dropdown, setDropdown] = useState({ open: false, row: null, x: 0, y: 0 });

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
    { field: 'account', headerName: 'User Account', width: 180 },
    { field: 'tier', headerName: 'Tier', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        let styleClass = '';
        if (activeTab === 'Approved') styleClass = 'bg-green-50 text-green-600 border border-green-100';
        else if (activeTab === 'Declined') styleClass = 'bg-red-50 text-red-600 border border-red-100';
        else styleClass = 'bg-yellow-50 text-yellow-600 border border-yellow-100'; // Pending default style if needed

        // Override based on row data for demo
        if (params.value === 'Declined') styleClass = 'bg-red-50 text-red-600 border border-red-100';
        if (params.value === 'Approved') styleClass = 'bg-green-50 text-green-600 border border-green-100';

        return (
          <span className={`px-3 py-1 rounded-md text-xs font-medium ${styleClass}`}>
            {params.value}
          </span>
        );
      }
    },
    { field: 'date', headerName: 'Submission Date', width: 220 },
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <button
          className="p-1 hover:bg-gray-100 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            setDropdown({ open: true, row: params.row, x: rect.right - 180, y: rect.bottom + window.scrollY });
          }}
        >
          <MoreVertical size={16} className="text-gray-400" />
        </button>
      )
    }
  ];

  // Close dropdown handler
  const handleCloseDropdown = () => setDropdown({ open: false, row: null, x: 0, y: 0 });

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]" onClick={handleCloseDropdown}>
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
        <TransactionHistoryTable 
          data={mockApprovals}
          title="Pending Approvals"
         // actions={transactionActions}
        />
      </div>

      {/* Floating Dropdown */}
      {dropdown.open && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-100 w-40 py-1 z-50"
          style={{ top: dropdown.y, left: dropdown.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => navigate(`/account-approvals/${dropdown.row.id}`)}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Eye size={16} className="text-gray-400" /> View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountApprovals;