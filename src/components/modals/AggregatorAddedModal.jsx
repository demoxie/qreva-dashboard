import ActionSuccessModal from './ActionSuccessModal';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const AggregatorAddedModal = ({ isOpen, onClose, referralLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ActionSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      title="Aggregator added"
      message="This aggregator has been sent an invitation link to the email just registered and can go ahead to onboard on the app!"
      buttonText="Dismiss"
    >
      {referralLink && (
        <div className="mb-6 text-left">
          <label className="block text-[#B0B7C3] font-medium text-xs mb-1">
            Referral Link
          </label>
          <div className="relative border border-[#D9D9D9] rounded-lg px-3 py-2 bg-gray-50">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full pr-9 text-[#808C91] font-general text-sm bg-transparent outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy referral link"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      )}
    </ActionSuccessModal>
  );
};

export default AggregatorAddedModal;
