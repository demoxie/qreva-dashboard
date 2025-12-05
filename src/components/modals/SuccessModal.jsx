import React from 'react';
import BaseModal from './BaseModal';

const SuccessModal = ({ isOpen, onClose, beneficiaryName }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={null} hasCloseButton={false} maxWidth="max-w-sm">
      <div className="p-2 text-center relative">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-[#17B4A5] rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">Beneficiary Saved!</h3>
        <p className="text-sm text-[#808C91] mb-6">You can now easily select **{beneficiaryName}** for future withdrawals.</p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03] transition-colors"
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
};

export default SuccessModal;