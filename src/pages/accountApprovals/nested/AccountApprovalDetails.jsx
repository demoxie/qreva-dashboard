import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

// Reusing your BaseModal
import BaseModal from '@/components/modals/BaseModal';

// Reusing existing display components (assumed available from context)
import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import BusinessDetailsCard from '@/components/cards/BusinessDetailsCard';
import TierDetailsCard from '@/components/cards/TierDetailsCard';

const AccountApprovalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Modal States
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState('pending'); // pending, approved, declined
  const [declineReason, setDeclineReason] = useState('');
  const [feedbackType, setFeedbackType] = useState(null); // 'approved' or 'declined' for success modal

  // Mock User Data
  const userData = {
    id: 1,
    name: 'Rejoice Regina Rose',
    email: 'emailaddress@gmail.com',
    tier: 'Tier 2',
    accountType: 'Personal Account',
    status: 'Pending', // Initial status
    firstName: 'Rejoice',
    middleName: 'Regina',
    lastName: 'Rose',
    phone: '08012345678',
    address: '9, Figma Street, Ladipo',
    
    // Tier Data
    tier1: { validId: 'BVN', bvnNumber: '2018****90' },
    tier2: { validId: 'NIN', bvnNumber: '2018****90', ninNumber: '2018****90' },
    
    // Images
    uploadedPhoto: '/path/to/id-card-sample.jpg'
  };

  const handleApprove = () => {
    setApprovalStatus('approved');
    setFeedbackType('approved');
    setShowSuccessModal(true);
  };

  const handleDeclineSubmit = () => {
    setApprovalStatus('declined');
    setFeedbackType('declined');
    setShowDeclineModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6 pb-20">
        
        {/* Navigation Header */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <button onClick={() => navigate(-1)} className="hover:text-gray-900">
             <ArrowLeft size={16} />
          </button>
          <span>Account Approval</span>
          <span>/</span>
          <span className="text-[#FF5B04]">View Details</span>
        </div>

        {/* Title and Actions */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1E1E]">View Details</h1>
            <p className="text-gray-500 text-sm">Here is the full details submitted by the user</p>
          </div>
          
          {approvalStatus === 'pending' && (
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeclineModal(true)}
                className="px-6 py-2 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100"
              >
                Decline
              </button>
              <button 
                onClick={handleApprove}
                className="px-6 py-2 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03]"
              >
                Approve
              </button>
            </div>
          )}
        </div>

        {/* User Banner Card */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              {userData.firstName[0]}{userData.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-[#1E1E1E]">{userData.name}</h2>
                <span className="bg-[#E0F2FE] text-[#0284C7] text-xs px-2 py-0.5 rounded">
                  {userData.tier}
                </span>
              </div>
              <p className="text-sm text-gray-500">{userData.tier} KYC | {userData.accountType}</p>
            </div>
          </div>

          {/* Guidelines Link */}
          {approvalStatus === 'pending' && (
             <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
               Guidelines for Good Upload &gt;
             </button>
          )}

          {/* Status Badge (if not pending) */}
          {approvalStatus === 'approved' && (
            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
              Approved <CheckCircle size={16} />
            </span>
          )}
          {approvalStatus === 'declined' && (
            <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
              Declined <XCircle size={16} />
            </span>
          )}
        </div>

        {/* Reason for Declining Box (Visible if Declined) */}
        {approvalStatus === 'declined' && (
          <div className="bg-[#FFF4F2] border border-[#FECACA] rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-[#7F1D1D] mb-1">Reason For Declining</h4>
            <p className="text-sm text-[#991B1B]">
              {declineReason || "Your NIN photo isn't well lit and it looks blurry. Please kindly look through again and retake the photo."}
            </p>
          </div>
        )}

        {/* Details Sections */}
        <div className="space-y-6">
          <PersonalDetailsCard user={userData} />
          {userData.accountType === 'Agent Account' && <BusinessDetailsCard business={{}} />}
          
          {/* Tier 1 Details */}
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

          {/* Tier 2 Details */}
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
                   <p className="font-medium text-sm">{userData.tier2.validId}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 mb-1">NIN Number</p>
                   <p className="font-medium text-sm">{userData.tier2.ninNumber}</p>
                </div>
             </CardContent>
          </Card>

          {/* Uploaded Photo */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Uploaded Photo</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
               {/* Placeholder for the ID Card Image - replace 'src' with actual data */}
               <img 
                 src="https://placehold.co/800x400/e2e8f0/1e293b?text=Federal+Republic+of+Nigeria+ID+Card+Placeholder" 
                 alt="Uploaded ID" 
                 className="w-full h-auto object-cover"
               />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Decline Modal */}
      <BaseModal 
        isOpen={showDeclineModal} 
        onClose={() => setShowDeclineModal(false)} 
        title="Reason for Declining"
        maxWidth="max-w-md"
      >
        <p className="text-sm text-gray-500 mb-4">Kindly write down your reason for declining this KYC approval</p>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6 h-32 resize-none"
          placeholder="Reason For Declining..."
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
        ></textarea>
        <button 
          onClick={handleDeclineSubmit}
          className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03]"
        >
          Decline Approval
        </button>
      </BaseModal>

      {/* Success/Feedback Modal */}
      <BaseModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        title={null}
        hasCloseButton={true}
        maxWidth="max-w-sm"
      >
        <div className="text-center p-4">
           {/* Success Icon */}
           <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feedbackType === 'approved' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
              {feedbackType === 'approved' ? (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              ) : (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              )}
           </div>

           <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">
             KYC {feedbackType === 'approved' ? 'Approved' : 'Declined'}
           </h3>
           <p className="text-sm text-gray-500 mb-6">
             {feedbackType === 'approved' 
               ? 'The user will be notified about the approved KYC as this action has been successfully completed' 
               : 'The user will be notified about the declined KYC approval as this action has been successfully completed'}
           </p>

           <button 
             onClick={() => setShowSuccessModal(false)}
             className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03]"
           >
             Dismiss
           </button>
        </div>
      </BaseModal>
    </div>
  );
};

export default AccountApprovalDetails;