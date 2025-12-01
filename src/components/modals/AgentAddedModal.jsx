import { X, CheckCircle } from 'lucide-react';

const AgentAddedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Success Icon with confetti decoration */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
            </div>
            
            {/* Confetti dots */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-400 rounded-full"></div>
            <div className="absolute top-0 -right-4 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-2 left-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-2 -right-2 w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="absolute top-8 -left-4 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute top-12 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="absolute -bottom-1 -left-3 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-6 -right-4 w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>

          <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-3">Agent added</h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            This agent has been sent an invitation link to the email just registered and can go ahead to onboard on the app!
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#FF5B04] text-white rounded-lg font-medium hover:bg-[#E54F03] transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentAddedModal;