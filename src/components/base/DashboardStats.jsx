import { Card, CardContent } from "../ui/card";
import StatGreen from "../../assets/icons/stats.svg";
import StatRed from "../../assets/icons/stat-red.svg";

const DashboardStats = ({ stats }) => {
  // Default stats if none provided
  const defaultStats = [
    { label: 'Total Transactions', value: '45,823', change: '+20%', subtext: '80,000 Last 24 hours' },
    { label: 'Total Transaction Volume', value: '₦4,005,823', change: '-10%', subtext: '₦80,000 in last 24 hours' },
    { label: 'Total Revenue', value: '₦1,070,823', change: '-20%', subtext: '₦80,000 in last 24 hours' },
    { label: 'Success Rate', value: '90%', change: '+19%', subtext: '24 % out of 24 hours' }
  ];

  const statsToDisplay = stats || defaultStats;

  const getChangeColor = (change) => 
    change?.startsWith('+') ? 'text-green-500' : 'text-red-500';

  const renderStatIcon = (change) => (
    change?.startsWith('+') ? (
      <img
        src={StatGreen}
        alt="stat"
        className={`w-4 h-4 ${getChangeColor(change)}`}
        aria-label="statIcon"
      />
    ) : (
      <img
        src={StatRed}
        alt="stat"
        className={`w-4 h-4 ${getChangeColor(change)}`}
        aria-label="statIcon"
      />
    )
  );

  const getBgColor = (change) => 
    change?.startsWith('+') ? 'bg-[#E9F9EF]' : 'bg-[#FFECE5]';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsToDisplay.map((stat, idx) => (
        <Card key={idx}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-urbanist font-medium text-[#808C91]">
                {stat.label}
              </span>
              {stat.change && (
                <span className={`text-xs flex items-center p-1 rounded-2xl ${getBgColor(stat.change)} ${getChangeColor(stat.change)}`}>
                  {renderStatIcon(stat.change)}
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-[32px] font-semibold font-general text-[#084059] mb-1">
              {stat.value}
            </div>
            {stat.subtext && (
              <div className="text-xs font-urbanist font-medium leading-[145%] text-[#808c91]">
                {stat.subtext}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;