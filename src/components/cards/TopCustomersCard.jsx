import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const TopCustomersCard = ({ 
  data = [], 
  title = "Top Customers",
  showAgentToggle = true 
}) => {
  const [selectedType, setSelectedType] = useState('agents'); // 'agents' or 'personal'

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 text-center py-4">
            No customer data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get rank badge styling
  const getRankBadgeStyle = (index) => {
    switch(index) {
      case 0: // 1st place - Gold
        return 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white shadow-md';
      case 1: // 2nd place - Silver
        return 'bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8] text-white shadow-md';
      case 2: // 3rd place - Bronze
        return 'bg-gradient-to-br from-[#CD7F32] to-[#B87333] text-white shadow-md';
      default: // Rest - Neutral
        return 'bg-[#E8EBED] text-[#7C8D96]';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
            {title}
          </CardTitle>
          {showAgentToggle && (
            <div className="inline-flex rounded-lg bg-[#F5F6F7] p-1">
              <button
                onClick={() => setSelectedType('agents')}
                className={`
                  px-3 py-1.5 text-xs font-general font-medium rounded-md transition-all duration-200
                  ${selectedType === 'agents' 
                    ? 'bg-white text-[#FF6B2C] shadow-sm' 
                    : 'text-[#7C8D96] hover:text-[#1E1E1E]'
                  }
                `}
              >
                <span className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedType === 'agents' ? 'bg-[#FF6B2C]' : 'bg-[#B0B7C3]'
                  }`}></div>
                  Agents
                </span>
              </button>
              <button
                onClick={() => setSelectedType('personal')}
                className={`
                  px-3 py-1.5 text-xs font-general font-medium rounded-md transition-all duration-200
                  ${selectedType === 'personal' 
                    ? 'bg-white text-[#FF6B2C] shadow-sm' 
                    : 'text-[#7C8D96] hover:text-[#1E1E1E]'
                  }
                `}
              >
                <span className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedType === 'personal' ? 'bg-[#FF6B2C]' : 'bg-[#B0B7C3]'
                  }`}></div>
                  Personal Accounts
                </span>
              </button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
          <div className="flex gap-x-8">
            {/* First column: first 5 customers */}
            <div className="flex flex-col gap-y-2 flex-1">
            {data.slice(0, 5).map((customer, idx) => (
                <div key={customer.id || idx} className="flex items-center justify-between py-1 border border-[#E9F1F3] rounded-lg p-2 bg-[#FCFDFE]">
                <div className="flex items-center gap-2">
                    {/* Rank badge */}
                    <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center 
                    text-xs font-urbanist font-bold
                    ${getRankBadgeStyle(idx)}
                    `}>
                    {customer.rank || idx + 1}
                    </div>
                    {/* Avatar */}
                    <div className="w-6 h-6 bg-[#FFE8DC] rounded-full flex items-center justify-center">
                    <img src={customer.avatar} alt={customer.name} className="w-6 h-6 rounded-full" />
                    </div>
                    {/* Name */}
                    <div className="text-sm font-general text-[#1E1E1E]">
                    {customer.name}
                    </div>
                </div>
                {/* Amount */}
                <div className="text-sm font-general font-semibold text-[#084059]">
                    ₦{customer.amount.toLocaleString()}
                </div>
                </div>
            ))}
            </div>
            {/* Second column: rest of the customers */}
            {data.length > 5 && (
            <div className="flex flex-col gap-y-2 flex-1">
                {data.slice(5).map((customer, idx) => (
                <div key={customer.id || idx + 5} className="flex items-center justify-between py-1 border border-[#E9F1F3] rounded-lg p-2 bg-[#FCFDFE]">
                    <div className="flex items-center gap-2">
                    {/* Rank badge */}
                    <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center 
                        text-xs font-urbanist font-bold
                        ${getRankBadgeStyle(idx + 5)}
                    `}>
                        {customer.rank || idx + 6}
                    </div>
                    {/* Avatar */}
                    <div className="w-6 h-6 bg-[#FFE8DC] rounded-full flex items-center justify-center">
                        <img src={customer.avatar} alt={customer.name} className="w-6 h-6 rounded-full" />
                    </div>
                    {/* Name */}
                    <div className="text-sm font-general font-medium text-[#1E1E1E]">
                        {customer.name}
                    </div>
                    </div>
                    {/* Amount */}
                    <div className="text-sm font-general font-semibold text-[#084059]">
                    ₦{customer.amount.toLocaleString()}
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCustomersCard;