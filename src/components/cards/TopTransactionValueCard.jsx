import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopTransactionValueCard = ({ data = [], title = "Top Transaction Value" }) => {
  // Handle empty or undefined data
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
            No transaction data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-3 flex flex-col justify-between h-full">
          {data.map((item, idx) => (
            <div key={item.id || idx} className="flex items-center gap-3">
              {/* Icon container */}
              {item.icon && (
                <span className="w-6 h-6 flex items-center justify-center">
                  <img 
                    src={item.icon} 
                    alt={item.name || 'Transaction'}
                    className="w-6 h-6"
                    style={{
                      // CSS filter for #6EDAD0 color
                      //filter: 'invert(80%) sepia(23%) saturate(754%) hue-rotate(123deg) brightness(99%) contrast(81%)'
                    }}
                  />
                </span>
              )}

              {/* Transaction name */}
              <span className="text-sm font-general font-medium text-[#808C91] flex-1">
                {item.name || 'Unknown'}
              </span>

              {/* Progress bar */}
              <div className="flex-1 h-2 bg-[#D6DADB] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300" 
                  style={{
                    backgroundColor: '#084059',
                    width: `${item.percentage || 60}%`
                  }}
                ></div>
              </div>

              {/* Amount */}
              <span className="text-sm font-general font-medium leading-[124%] text-[#084059] w-24 text-right">
                N{(item.value || 0).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTransactionValueCard;