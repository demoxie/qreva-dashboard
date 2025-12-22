import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/tables/DataTable';
import ApprovalTabs from '@/components/account-approvals/ApprovalTabs';
import ApprovalModals from '@/components/account-approvals/ApprovalModals';
import { useApprovalFilters } from '@/hooks/useApprovalFilters';
import { useApprovalModals } from '@/hooks/useApprovalModals';
import { mockApprovals } from './data';
import { approvalTabs, approvalColumns, createApprovalActions } from './constants';

const AccountApprovals = () => {
  const navigate = useNavigate();

  const { activeTab, setActiveTab, filteredApprovals, tabCounts } = useApprovalFilters(mockApprovals);
  const {
    modals,
    setters,
    selectedUser,
    setSelectedUser,
    declineReason,
    setDeclineReason,
    feedbackType,
    setFeedbackType
  } = useApprovalModals();

  const handleAcceptClick = useCallback((user) => {
    setSelectedUser(user);
    setters.setShowAcceptModal(true);
  }, [setSelectedUser, setters]);

  const handleDeclineClick = useCallback((user) => {
    setSelectedUser(user);
    setters.setShowDeclineModal(true);
  }, [setSelectedUser, setters]);

  const handleAcceptApproval = useCallback(() => {
    console.log('Accepting approval for:', selectedUser);
    setFeedbackType('approved');
    setters.setShowAcceptModal(false);
    setters.setShowSuccessModal(true);
  }, [selectedUser, setFeedbackType, setters]);

  const handleDeclineApproval = useCallback(() => {
    console.log('Declining approval for:', selectedUser, 'Reason:', declineReason);
    setFeedbackType('declined');
    setters.setShowDeclineModal(false);
    setters.setShowSuccessModal(true);
  }, [selectedUser, declineReason, setFeedbackType, setters]);

  const tableActions = useMemo(
  () =>
    createApprovalActions(
      navigate,
      activeTab,
      handleAcceptClick,
      handleDeclineClick
    ),
  [navigate, activeTab, handleAcceptClick, handleDeclineClick]
);

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Account Approvals"
          subtitle="Here is the full list of KYC approvals on the platform"
          showTimeFilter={false}
        />

        <ApprovalTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={approvalTabs}
          tabCounts={tabCounts}
        />

        <DataTable
          data={filteredApprovals}
          title={`${activeTab} KYC`}
          columns={approvalColumns}
          actions={tableActions}
        />
      </div>

      <ApprovalModals
        modals={modals}
        setters={setters}
        selectedUser={selectedUser}
        declineReason={declineReason}
        setDeclineReason={setDeclineReason}
        onAccept={handleAcceptApproval}
        onDecline={handleDeclineApproval}
        feedbackType={feedbackType}
      />
    </div>
  );
  };

export default AccountApprovals;