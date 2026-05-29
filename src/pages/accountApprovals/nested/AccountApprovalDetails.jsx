import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ApprovalModals from '@/components/account-approvals/ApprovalModals';
import { useApprovalModals } from '@/hooks/useApprovalModals';
import { useAccountApprovalDetails, useApproveAccount, useDeclineAccount } from '@/store/features/approvals/useAccountApprovals';
import { handleError } from '@/store/utils/handleError';
import { handleSuccess } from '@/store/utils/handleSuccess';

const DetailItem = ({ label, value, className = '' }) => (
  <div className={className}>
    <p className="text-xs text-[#808C91] mb-1">{label}</p>
    <p className="font-medium text-sm text-[#1E1E1E]">{value || '-'}</p>
  </div>
);

const ImagePreview = ({ label, src, alt }) => (
  <div>
    <p className="text-xs text-[#808C91] mb-2">{label}</p>
    <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      ) : (
        <div className="text-gray-400">{alt || 'No image uploaded'}</div>
      )}
    </div>
  </div>
);

const AccountApprovalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [approvalStatus, setApprovalStatus] = useState('pending');

  const { data: approvalResponse, isLoading } = useAccountApprovalDetails(id);
  const approveAccount = useApproveAccount();
  const declineAccount = useDeclineAccount();

  // API returns { user: {...}, client: {...} }
  const responseData = approvalResponse?.data || {};
  const user = responseData.user || responseData;
  const client = responseData.client || {};

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

  useEffect(() => {
    const normalizedTierStatus = String(
      user?.kycTier3ReviewStatus || user?.kycTier3Status || ''
    )
      .trim()
      .toLowerCase();

    if (normalizedTierStatus === 'approved') {
      setApprovalStatus('approved');
      return;
    }
    if (normalizedTierStatus === 'declined' || normalizedTierStatus === 'rejected') {
      setApprovalStatus('declined');
      return;
    }
    setApprovalStatus('pending');
  }, [user?.kycTier3ReviewStatus, user?.kycTier3Status]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user || !user._id) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown';
  const initials = `${(user.firstName || '?')[0]}${(user.lastName || '?')[0]}`.toUpperCase();
  const kycLevel = client.kycLevel || '-';
  const tierReviewStatus = user.kycTier3ReviewStatus || user.status || 'Pending';
  const address = user.address || {};
  const kycDocs = user.kycTier3Documents || {};

  const formatDate = (val) => {
    if (!val) return '-';
    const d = new Date(val);
    if (isNaN(d)) return val;
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <button
              onClick={() => navigate('/account-approvals')}
              className="flex items-center gap-2 text-sm text-[#808C91] hover:text-[#1E1E1E] mb-2"
            >
              <ArrowLeft size={16} />
              Back to Approvals
            </button>
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
        <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-[#1E1E1E]">{fullName}</h2>
                <span className="bg-[#E0F2FE] text-[#0284C7] text-xs px-2 py-0.5 rounded">
                  KYC Level {kycLevel}
                </span>
              </div>
              <p className="text-sm text-gray-500">Tier 3 Review: {tierReviewStatus} | {user.type || 'Individual'}</p>
            </div>
          </div>

          {approvalStatus === 'pending' && (
            <button
              onClick={() => setters.setShowGuidelinesModal(true)}
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mt-3"
            >
              Guidelines for Good Upload →
            </button>
          )}

          {approvalStatus === 'approved' && (
            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium mt-3 w-fit">
              Approved <CheckCircle size={16} />
            </span>
          )}
        </div>

        {/* Decline Reason */}
        {approvalStatus === 'declined' && (
          <div className="bg-[#FFF4F2] border border-[#FECACA] rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-[#7F1D1D] mb-1">Reason For Declining</h4>
            <p className="text-sm text-[#991B1B]">{declineReason}</p>
          </div>
        )}

        {/* Details Sections */}
        <div className="space-y-6">
          {/* Personal Details */}
          <Card className="shadow-none border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Personal Details</h3>
            </div>
            <CardContent className="p-4 grid grid-cols-2 gap-6">
              <DetailItem label="First Name" value={user.firstName} />
              <DetailItem label="Last Name" value={user.lastName} />
              <DetailItem label="Email Address" value={user.emailAddress} />
              <DetailItem label="Phone Number" value={user.phoneNumber} />
              <DetailItem label="Date of Birth" value={formatDate(user.dateOfBirth)} />
              <DetailItem label="Account Type" value={user.type} />
              <DetailItem label="Status" value={user.status} />
              <DetailItem label="Created" value={formatDate(user.createdAt)} />
            </CardContent>
          </Card>

          {/* Address */}
          {address.address1 && (
            <Card className="shadow-none border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Address</h3>
              </div>
              <CardContent className="p-4 grid grid-cols-2 gap-6">
                <DetailItem label="Address" value={address.address1} className="col-span-2" />
                <DetailItem label="City" value={address.city} />
                <DetailItem label="State" value={address.state} />
                <DetailItem label="Country" value={address.country} />
              </CardContent>
            </Card>
          )}

          {/* Identity Verification */}
          <Card className="shadow-none border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Identity Verification</h3>
            </div>
            <CardContent className="p-4 grid grid-cols-2 gap-6">
              {user.bvn && (
                <>
                  <DetailItem label="Identity Type" value={user.identityType2 || 'BVN'} />
                  <DetailItem label="BVN Number" value={user.bvn} />
                </>
              )}
              {user.nin && (
                <>
                  <DetailItem label="Identity Type" value={user.identityType || 'NIN'} />
                  <DetailItem label="NIN Number" value={user.nin} />
                </>
              )}
            </CardContent>
          </Card>

          {/* KYC Tier 3 Documents */}
          {(kycDocs.proofOfAddress || kycDocs.photoId) && (
            <Card className="shadow-none border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">KYC Tier 3 Documents</h3>
                {user.kycTier3SubmittedAt && (
                  <p className="text-xs text-[#808C91] mt-1">Submitted: {formatDate(user.kycTier3SubmittedAt)}</p>
                )}
              </div>
              <CardContent className="p-4 space-y-6">
                {kycDocs.photoId && (
                  <ImagePreview label="Photo ID" src={kycDocs.photoId} alt="Photo ID" />
                )}
                {kycDocs.proofOfAddress && (
                  <ImagePreview label="Proof of Address" src={kycDocs.proofOfAddress} alt="Proof of Address" />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ApprovalModals
        modals={modals}
        setters={setters}
        selectedUser={user}
        declineReason={declineReason}
        setDeclineReason={setDeclineReason}
        onAccept={handleApprove}
        onDecline={handleDeclineSubmit}
        feedbackType={feedbackType}
      />
    </div>
  );
};

export default AccountApprovalDetails;
