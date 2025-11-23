import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopAgentsCard = ({ data = [], title = "Top Agents" }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-sm text-gray-500 text-center py-4">
            No agent data available
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 h-full content-center">
          {data.map((agent, idx) => (
            <div key={agent.id || idx} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-urbanist font-bold ${
                  idx < 3 
                    ? idx === 0 
                      ? 'bg-linear-to-br from-[#FFD700] to-[#FFA500] text-white' 
                      : idx === 1 
                      ? 'bg-linear-to-br from-[#C0C0C0] to-[#A8A8A8] text-white'
                      : 'bg-linear-to-br from-[#CD7F32] to-[#B87333] text-white'
                    : 'bg-[#E8EBED] text-[#7C8D96]'
                }`}>
                  {agent.rank || idx + 1}
                </div>
                <div className="w-6 h-6 bg-[#FFE8DC] rounded-full flex items-center justify-center">
                  <img src={agent.avatar} alt='avatar' className="text-xs" />
                </div>
                <div className="text-sm font-general text-[#1E1E1E]">{agent.name}</div>
              </div>
              <div className="text-sm font-general font-semibold text-[#084059]">
                ₦{agent.amount?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopAgentsCard;