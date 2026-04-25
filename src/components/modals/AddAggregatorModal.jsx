import { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useAggregatorReferralLink } from '@/store/features/users/useUsers';

const FALLBACK_LINK = 'https://qreva.com/register?role=aggregator';

const AddAggregatorModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [copied, setCopied] = useState(false);

  const { data: linkResponse, isLoading: isLinkLoading } = useAggregatorReferralLink();
  const referralLink = linkResponse?.data?.referralLink || linkResponse?.referralLink || FALLBACK_LINK;

  useEffect(() => {
    if (!isOpen) {
      setFormData({ fullName: '', email: '' });
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black cursor-pointer">
          <X size={20} />
        </button>

        <h2 className="text-xl font-urbanist font-bold text-[#1E1E1E] mb-1">Add Aggregator</h2>
        <p className="text-sm text-[#808C91] font-general font-medium mb-4">
          Fill out the info below to add an aggregator or copy the link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
              required
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-between gap-3 items-center text-sm text-gray-500 font-medium mb-6">
            <div className="w-full border h-[0.5px] border-[#B0B7C3]" />
            OR
            <div className="w-full border h-[0.5px] border-[#B0B7C3]" />
          </div>

          <div className="mb-6">
            <div className="relative border border-[#D9D9D9] rounded-lg px-4 py-3 bg-gray-50">
              <label className="block text-[#B0B7C3] font-medium text-xs mb-0.5">Referral Link</label>
              {isLinkLoading ? (
                <p className="text-xs text-[#808C91] animate-pulse">Generating link...</p>
              ) : (
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full pr-10 text-[#808C91] font-general text-sm bg-transparent outline-none truncate"
                />
              )}
              <button
                type="button"
                onClick={handleCopyLink}
                disabled={isLinkLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.fullName || !formData.email || isSubmitting}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !formData.fullName || !formData.email || isSubmitting
                ? 'opacity-50 cursor-not-allowed bg-[#9A9A9A]/60 text-white'
                : 'bg-[#FF5B04] text-white hover:bg-[#E54F03]'
            }`}
          >
            {isSubmitting ? 'Sending Invite...' : 'Add Aggregator'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAggregatorModal;
