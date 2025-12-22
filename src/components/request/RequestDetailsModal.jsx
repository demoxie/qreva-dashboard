import { X } from 'lucide-react';

const RequestDetailsModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  const getStatusBadge = () => {
    const statusStyles = {
      pending: 'bg-[#FFF8E6] border border-[#FFC535] text-[#B58202]',
      accepted: 'bg-[#E9F9EF] border border-[#4ED17E] text-[#188C43]',
      declined: 'bg-[#FCECEC] border border-[#E56566] text-[#9E2D2D]'
    };

    return (
      <span className={`px-3 py-1.5 rounded-md text-xs font-general font-semibold capitalize ${statusStyles[request.status]}`}>
        {request.status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-general font-bold text-[#1E1E1E]">
                View Details
              </h2>
              <p className="text-sm font-general text-[#475367] mt-1">
                Here are the details of this request
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info Card */}
          <div className="bg-[#F7FAFA] rounded-lg p-6 mb-6 text-center">
            <div className="w-12 h-12 bg-[#D0E7ED] rounded-full flex items-center justify-center text-[#084059] font-general font-semibold mx-auto mb-3">
              {request.avatar}
            </div>
            <h3 className="text-base font-general font-medium text-[#1E1E1E] mb-2">
              Rejoice Regina Rose
            </h3>
            <p className="text-2xl font-general font-bold text-[#1E1E1E] mb-3">
              {request.amount.toLocaleString()}
            </p>
            {getStatusBadge()}
          </div>

          {/* Decline Reason (if declined) */}
          {request.status === 'declined' && request.declineReason && (
            <div className="mb-6">
              <p className="text-xs font-general text-[#808C91] mb-2">
                Reason for Declining
              </p>
              <p className="text-sm font-general text-[#1E1E1E]">
                {request.declineReason}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-general text-[#808C91] mb-1">Sent To</p>
              <p className="text-sm font-general font-medium text-[#1E1E1E]">
                {request.sentTo}
              </p>
            </div>
            <div>
              <p className="text-xs font-general text-[#808C91] mb-1">Title</p>
              <p className="text-sm font-general font-medium text-[#1E1E1E]">
                {request.title}
              </p>
            </div>
            <div>
              <p className="text-xs font-general text-[#808C91] mb-1">Due Date</p>
              <p className="text-sm font-general font-medium text-[#1E1E1E]">
                {request.dueDate}
              </p>
            </div>
            <div>
              <p className="text-xs font-general text-[#808C91] mb-1">Date Sent</p>
              <p className="text-sm font-general font-medium text-[#1E1E1E]">
                {request.dateSent}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-xs font-general text-[#808C91] mb-2">
              Short Description
            </p>
            <p className="text-sm font-general text-[#1E1E1E]">
              {request.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {request.status === 'accepted' && (
              <button className="w-full py-3 bg-[#FFF8E6] text-[#FF5B04] rounded-lg text-sm font-general font-medium hover:bg-[#FFE4CC] transition-colors">
                View Receipt
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#FF5B04] text-white rounded-lg text-sm font-general font-medium hover:bg-[#E54F03] transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;