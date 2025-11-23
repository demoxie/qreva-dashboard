import { Card, CardContent } from '@/components/ui/card';

const TransferStats = () => {
  const stats = [
    { 
      label: 'Total Transfers', 
      value: '45,823', 
      subtext: '50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-green-500'
    },
    { 
      label: 'Total Transfers Volume', 
      value: '₦4,005,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Total Transfers Revenue', 
      value: '₦1,070,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Success Rate', 
      value: '98%', 
      subtext: '2% in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <Card key={idx}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-general text-[#7C8D96]">{stat.label}</span>
              <span className={`text-xs font-general ${stat.changeColor}`}>{stat.change}</span>
            </div>
            <div className="text-2xl font-urbanist font-bold text-[#084059] mb-1">
              {stat.value}
            </div>
            <div className="text-xs font-general text-[#B0B7C3]">{stat.subtext}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransferStats;