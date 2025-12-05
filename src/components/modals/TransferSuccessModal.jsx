import React from 'react';
import BaseModal from './BaseModal';

const TransferSuccessModal = ({ isOpen, onClose, handleSaveBeneficiary }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={null} hasCloseButton={true} maxWidth="max-w-md">
      <div className="p-2 text-center relative">
        
        {/* Confetti effect & Success Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-linear-to-br from-[#17B4A5] to-[#0D8F83] rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Confetti dots (retaining original style) */}
          <style>{`
            @keyframes confetti-fall {
                0% { transform: translateY(-50vh) rotate(0deg); opacity: 1; }
                100% { transform: translateY(50vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-70"
                style={{
                  backgroundColor: ['#FF5B04', '#17B4A5', '#FFC107', '#E91E63'][i % 4],
                  left: `${50 + (Math.cos(i * 18 * Math.PI / 180) * 60)}%`,
                  top: `${50 + (Math.sin(i * 18 * Math.PI / 180) * 60)}%`,
                  animation: `confetti-fall ${Math.random() * 2 + 1}s linear infinite ${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-2">Transfer Successful</h3>
        <p className="text-sm text-[#808C91] mb-6">Transaction ID: 12345FGTRI567</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleSaveBeneficiary}
            className="flex flex-col items-center justify-center p-4 border border-[#E8EBED] rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-[#808C91] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm text-[#1E1E1E]">Save Beneficiary</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-4 border border-[#E8EBED] rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-[#808C91] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-sm text-[#1E1E1E]">Share Receipt</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03] transition-colors"
        >
          Dismiss
        </button>
      </div>
    </BaseModal>
  );
};

export default TransferSuccessModal;