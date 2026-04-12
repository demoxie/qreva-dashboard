import { useState } from 'react';
import { X, Copy } from 'lucide-react';

// TODO: Wire to real API when backend endpoint for adding aggregators/aggregator managers is ready. Currently uses mock data.
const AddAggregatorModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [referralLink, setReferralLink] = useState('https://qreva.com/reflink-REJ123');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ fullName: '', email: '' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    console.log('Link copied!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-0">
          <h2 className="text-xl font-urbanist font-bold text-[#1E1E1E]">Add Aggregator</h2>
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-semibold font-general rounded-full border border-yellow-300 uppercase tracking-wide">Mock Data</span>
        </div>
        <p className="text-sm text-[#808C91] font-general font-medium mb-4">Fill out the info below to add an aggregator or copy the link</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="flex justify-between gap-3 items-center text-sm text-gray-500 font-medium">
              <div className='w-full border h-[0.5px] border-[#B0B7C3]'></div>
              OR
              <div className='w-full border h-[0.5px] border-[#B0B7C3]'></div>
              </span>
          </div>

          <div className="mb-6">
            <div className="relative border border-[#D9D9D9] rounded-lg px-4 py-3 bg-gray-50">
              <label className="block text-[#B0B7C3] font-medium text-xs">Referral Link</label>
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full pr-12 text-[#808C91] font-general"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.fullName || !formData.email}
            className={`w-full py-3 rounded-lg font-medium ${!formData.fullName || !formData.email ? 'opacity-50 cursor-not-allowed bg-[#9A9A9A]/60' : 'bg-[#FF5B04] text-white hover:bg-[#E54F03] transition-colors'}`}
          >
            Add Aggregator
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAggregatorModal;