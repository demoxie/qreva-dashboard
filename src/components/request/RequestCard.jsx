import { User, Calendar } from 'lucide-react';

const RequestCard = ({ request, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-general font-semibold text-[#1E1E1E]">
          {request.title}
        </h3>
        <button
          onClick={() => onViewDetails(request)}
          className="text-[#FF5B04] text-sm font-general font-medium hover:underline"
        >
          View Details →
        </button>
      </div>

      <p className="text-sm font-general text-[#475367] mb-4">
        {request.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <User size={16} />
          <span>Sent By: {request.sentBy}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <User size={16} />
          <span>Sent To: {request.sentTo}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-general text-[#475367]">
          <Calendar size={16} />
          <span>Due Date: {request.dueDate}</span>
        </div>
      </div>

      <div className="text-right">
        <span className="text-2xl font-general font-bold text-[#1E1E1E]">
          ₦{request.amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default RequestCard;