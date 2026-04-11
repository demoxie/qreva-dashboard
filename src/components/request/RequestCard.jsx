import { User, Calendar, Mail } from 'lucide-react';

const RequestCard = ({ request, onViewDetails }) => {
  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })
    : '-';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-general font-semibold text-[#1E1E1E]">
          {request.requestType}
        </h3>
        <button
          onClick={() => onViewDetails(request)}
          className="text-[#FF5B04] text-sm font-general font-medium hover:underline"
        >
          View Details →
        </button>
      </div>

      <p className="text-sm font-general text-[#475367] mb-4">
        {request.reason}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <User size={16} />
          <span>Requester: {request.requesterName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <Mail size={16} />
          <span>Email: {request.requesterEmail || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <User size={16} />
          <span>Role: {request.requesterRole}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <Calendar size={16} />
          <span>Date: {formattedDate}</span>
        </div>
      </div>

      <div className="text-right">
        <span className="text-2xl font-general font-bold text-[#1E1E1E]">
          ₦{(request.amount || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default RequestCard;