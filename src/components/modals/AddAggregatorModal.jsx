import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddAggregatorModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '' });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ fullName: '', email: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black cursor-pointer">
          <X size={20} />
        </button>

        <h2 className="text-xl font-urbanist font-bold text-[#1E1E1E] mb-1">Add Aggregator</h2>
        <p className="text-sm text-[#808C91] font-general font-medium mb-4">
          Fill out the info below to invite an aggregator
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
