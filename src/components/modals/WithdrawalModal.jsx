import React from 'react';
import BaseModal from './BaseModal';

const WithdrawModal = ({
  isOpen,
  onClose,
  frequentBeneficiaries,
  setBankName,
  setAccountNumber,
  setAccountName,
  bankName,
  accountNumber,
  accountName,
  amount,
  formatAmount,
  handleAmountChange,
  handleWithdraw,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Withdraw Now">
      <p className="text-sm text-[#808C91] mb-4">Kindly input the right info to perform this action</p>

      {/* Frequent Beneficiaries */}
      <div className="mb-4">
        <label className="text-xs text-[#808C91] mb-2 block">Frequent Beneficiaries</label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {frequentBeneficiaries.map((beneficiary, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center min-w-[60px]"
              onClick={() => {
                setBankName('Access Bank');
                setAccountNumber('0123456789');
                setAccountName('PECULIAR REGINA');
              }}
            >
              <div className="w-10 h-10 rounded-full bg-[#FFECE5] flex items-center justify-center text-[#FF5B04] font-medium text-sm mb-1">
                {beneficiary.initial}
              </div>
              <span className="text-xs text-[#1E1E1E]">{beneficiary.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bank Name Dropdown */}
      <div className="mb-4">
        <label className="text-sm text-[#808C91] mb-1 block">Recipient Bank Name</label>
        <select
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20"
        >
          <option value="">Bank Name</option>
          <option value="Access Bank">Access Bank</option>
          <option value="GTBank">GTBank</option>
          <option value="First Bank">First Bank</option>
        </select>
      </div>

      {/* Account Number */}
      <div className="mb-4">
        <label className="text-sm text-[#808C91] mb-1 block">Account Number</label>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EBED] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B04]/20"
        />
        {accountNumber && (
          <div className="text-xs text-[#FF5B04] mt-1 text-right">{accountName}</div>
        )}
      </div>

      {/* Amount */}
      <div className="mb-6">
        <div className="border-2 border-[#17B4A5] rounded-lg p-4">
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-[#1E1E1E] mr-1">₦</span>
            <input
              type="text"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              placeholder="100 - 50,000"
              className="text-3xl font-semibold text-[#1E1E1E] focus:outline-none flex-1"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-[#808C91]">Transfer Amount (Min. 200)</span>
            <span className="text-xs text-[#1E1E1E]">Your Earnings: <span className="font-semibold">3,000,000</span></span>
          </div>
        </div>
      </div>

      <button
        onClick={handleWithdraw}
        disabled={!bankName || !accountNumber || !amount}
        className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Withdraw
      </button>
    </BaseModal>
  );
};

export default WithdrawModal;