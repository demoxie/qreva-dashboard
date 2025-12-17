import { X, CheckCircle } from 'lucide-react';

const ApprovalModals = ({
  modals,
  setters,
  selectedUser,
  declineReason,
  setDeclineReason,
  onAccept,
  onDecline,
  feedbackType
}) => {
  return (
    <>
      {/* Accept Modal */}
      {modals.showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accept Approval</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to accept the approval for{' '}
              <span className="font-medium">{selectedUser?.name}</span>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setters.setShowAcceptModal(false);
                  setters.setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onAccept}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4ED17E] rounded-lg hover:bg-[#3DB86A]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {modals.showDeclineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Reason for Declining</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Kindly write down your reason for declining this KYC approval
                </p>
              </div>
              <button
                onClick={() => setters.setShowDeclineModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B04] mb-6 h-32 resize-none"
              placeholder="Reason For Declining..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            />
            <button
              onClick={onDecline}
              className="w-full py-3 bg-[#E56566] text-white rounded-lg font-medium hover:bg-[#D14546]"
            >
              Decline Approval
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modals.showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <button
              onClick={() => setters.setShowSuccessModal(false)}
              className="ml-auto block text-gray-400 hover:text-gray-600 mb-4"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                feedbackType === 'approved' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {feedbackType === 'approved' ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">
                KYC {feedbackType === 'approved' ? 'Approved' : 'Declined'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                The user will be notified about the {feedbackType === 'approved' ? 'approved' : 'declined'} KYC as this action has been successfully completed
              </p>

              <button
                onClick={() => setters.setShowSuccessModal(false)}
                className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guidelines Modal */}
      {modals.showGuidelinesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#1E1E1E]">Guidelines for Good Upload</h3>
                <p className="text-sm text-gray-500 mt-1">Here are the following guidelines</p>
              </div>
              <button
                onClick={() => setters.setShowGuidelinesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Example Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2 relative">
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div className="text-xs text-gray-600">ID Card Sample</div>
                </div>
                <p className="text-sm font-medium text-gray-700">Good</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2 relative">
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                    ✗
                  </div>
                  <div className="text-xs text-gray-600">Blurred</div>
                </div>
                <p className="text-sm font-medium text-gray-700">No blur</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2 relative">
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                    ✗
                  </div>
                  <div className="text-xs text-gray-600">Cut off</div>
                </div>
                <p className="text-sm font-medium text-gray-700">No cut</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Must Be:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Government Issued</span>
                  </div>
                  <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Original Full size, unedited</span>
                  </div>
                  <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Place document against a single colored background</span>
                  </div>
                  <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Readable, well lit and colored</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Must Not Be:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border border-red-200 bg-red-50 rounded-lg p-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Black or white images</span>
                  </div>
                  <div className="flex items-center gap-2 border border-red-200 bg-red-50 rounded-lg p-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Blurred or cut images</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setters.setShowGuidelinesModal(false)}
              className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApprovalModals;