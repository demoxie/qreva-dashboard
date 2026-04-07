import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import ApprovalModals from '@/components/account-approvals/ApprovalModals';
import { useApprovalModals } from '@/hooks/useApprovalModals';
import { useAccountApprovalDetails, useApproveAccount, useDeclineAccount } from '@/store/features/approvals/useAccountApprovals';
import { handleError } from '@/store/utils/handleError';
import { handleSuccess } from '@/store/utils/handleSuccess';

const AccountApprovalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [approvalStatus, setApprovalStatus] = useState('pending');

  const { data: approvalResponse, isLoading } = useAccountApprovalDetails(id);
  const approveAccount = useApproveAccount();
  const declineAccount = useDeclineAccount();
  const userData = approvalResponse?.data || null;

  const {
    modals,
    setters,
    declineReason,
    setDeclineReason,
    feedbackType,
    setFeedbackType
  } = useApprovalModals();

  const handleApprove = useCallback(() => {
    approveAccount.mutate(id, {
      onSuccess: () => {
        setApprovalStatus('approved');
        setFeedbackType('approved');
        setters.setShowSuccessModal(true);
        handleSuccess('Account approved successfully');
      },
      onError: (error) => handleError(error),
    });
  }, [id, approveAccount, setFeedbackType, setters]);

  const handleDeclineSubmit = useCallback(() => {
    declineAccount.mutate({ userId: id, reason: declineReason }, {
      onSuccess: () => {
        setApprovalStatus('declined');
        setFeedbackType('declined');
        setters.setShowDeclineModal(false);
        setters.setShowSuccessModal(true);
        handleSuccess('Account declined successfully');
      },
      onError: (error) => {
        setters.setShowDeclineModal(false);
        handleError(error);
      },
    });
  }, [id, declineReason, declineAccount, setFeedbackType, setters]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1E1E]">View Details</h1>
            <p className="text-gray-500 text-sm">Here is the full details submitted by the user</p>
          </div>

          {approvalStatus === 'pending' && (
            <div className="flex gap-3">
              <button
                onClick={() => setters.setShowDeclineModal(true)}
                className="px-6 py-2 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100"
                disabled={declineAccount.isPending}
              >
                Decline
              </button>
              <button
                onClick={handleApprove}
                className="px-6 py-2 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03]"
                disabled={approveAccount.isPending}
              >
                {approveAccount.isPending ? 'Approving...' : 'Approve'}
              </button>
            </div>
          )}
        </div>

        {/* User Banner */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6 flex flex-col justify-between ">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              {(userData.firstName || '')[0]}{(userData.lastName || '')[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-[#1E1E1E]">{userData.name || `${userData.firstName} ${userData.lastName}`}</h2>
                <span className="bg-[#E0F2FE] text-[#0284C7] text-xs px-2 py-0.5 rounded">
                  {userData.tier}
                </span>
              </div>
              <p className="text-sm text-gray-500">{userData.tier} KYC | {userData.account || userData.accountType}</p>
            </div>
          </div>

          {approvalStatus === 'pending' && (
            <button
              onClick={() => setters.setShowGuidelinesModal(true)}
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              Guidelines for Good Upload →
            </button>
          )}

          {approvalStatus === 'approved' && (
            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
              Approved <CheckCircle size={16} />
            </span>
          )}
          {/* Decline Reason */}
        {approvalStatus === 'declined' && (
          <div className="bg-[#FFF4F2] border border-[#FECACA] rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-[#7F1D1D] mb-1">Reason For Declining</h4>
            <p className="text-sm text-[#991B1B]">
              {declineReason || userData.declineReason}
            </p>
          </div>
        )}

        {/* Details Sections */}
        <div className="space-y-6">
          <PersonalDetailsCard user={userData} />

          {/* Tier 1 */}
          {userData.tier1 && (
            <Card className="shadow-none border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Tier 1 Details</h3>
              </div>
              <CardContent className="p-4 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Valid ID</p>
                  <p className="font-medium text-sm">{userData.tier1.validId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">BVN Number</p>
                  <p className="font-medium text-sm">{userData.tier1.bvnNumber}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tier 2 */}
          {userData.tier2 && (
            <Card className="shadow-none border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Tier 2 Details</h3>
              </div>
              <CardContent className="p-4 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Valid ID</p>
                  <p className="font-medium text-sm">{userData.tier2.validId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">BVN Number</p>
                  <p className="font-medium text-sm">{userData.tier2.bvnNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Valid ID</p>
                  <p className="font-medium text-sm">NIN</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">NIN Number</p>
                  <p className="font-medium text-sm">{userData.tier2.ninNumber}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Uploaded Photo */}
          <div>
            <h3 className="text-sm text-gray-500">Uploaded Photo</h3>
            <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
              <div className="text-gray-400">Image Preview Placeholder</div>
            </div>
          </div>
        </div>
      </div>

      <ApprovalModals
        modals={modals}
        setters={setters}
        selectedUser={userData}
        declineReason={declineReason}
        setDeclineReason={setDeclineReason}
        onAccept={handleApprove}
        onDecline={handleDeclineSubmit}
        feedbackType={feedbackType}
      />
      </div>
    </div>
  );
};

export default AccountApprovalDetails;
