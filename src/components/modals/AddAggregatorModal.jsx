import { useState } from 'react';
import { X, Copy } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-[#1E1E1E] mb-2">Add Aggregator</h2>
        <p className="text-sm text-gray-600 mb-6">Fill out the info below to add an aggregator or copy the link</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Rejoice Regina Rose"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="text-sm text-gray-500 font-medium">OR</span>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Referral Link</label>
            <div className="relative">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
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
            className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03] transition-colors"
          >
            Add Aggregator
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAggregatorModal;