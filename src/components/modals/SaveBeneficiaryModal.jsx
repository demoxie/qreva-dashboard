import React from 'react';
import BaseModal from './BaseModal';

const SaveBeneficiaryModal = ({
  isOpen,
  onClose,
  accountName,
  accountNumber,
  bankName,
  beneficiaryName,
  setBeneficiaryName,
  confirmSaveBeneficiary,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Save Beneficiary">
      <p className="text-sm text-[#808C91] mb-4">Give this beneficiary a nickname to save them for future use.</p>

      {/* Current Account Details (Read-only) */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[#808C91]">Account Name:</span>
          <span className="font-medium text-[#1E1E1E]">{accountName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#808C91]">Account/Bank:</span>
          <span className="font-medium text-[#1E1E1E]">{accountNumber} ({bankName})</span>
        </div>
      </div>

      {/* Beneficiary Nickname Input */}
      <div className="mb-6">
        <label className="text-sm text-[#808C91] mb-1 block">Beneficiary Nickname</label>
        <input
          type="text"
          placeholder="e.g., Mom's Account, Secondary Bank"
          value={beneficiaryName}
          onChange={(e) => setBeneficiaryName(e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20"
        />
      </div>

      <button
        onClick={confirmSaveBeneficiary}
        disabled={!beneficiaryName}
        className="w-full py-3 bg-[#17B4A5] text-white rounded-lg font-medium hover:bg-[#0D8F83] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Confirm & Save
      </button>
    </BaseModal>
  );
};

export default SaveBeneficiaryModal;