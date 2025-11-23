import { Card, CardContent } from '@/components/ui/card';

const KYCStats = () => {
  const stats = [
    { 
      label: 'Total KYC Verification Sum', 
      value: '₦4,005,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Total BVN Verification Sum', 
      value: '45,823', 
      subtext: '50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-green-500'
    },
    { 
      label: 'Total NIN Verification Sum', 
      value: '₦1,070,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Total Revenue', 
      value: '₦1,070,823', 
      subtext: '₦50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
  ];

  const additionalStats = [
    { 
      label: 'Total Verifications', 
      value: '45,823', 
      subtext: '50,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-green-500'
    },
    { 
      label: 'Total BVN Verifications', 
      value: '5,823', 
      subtext: '1,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Total NIN Verifications', 
      value: '70,823', 
      subtext: '1,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
    { 
      label: 'Total Agent Commission', 
      value: '₦40,823', 
      subtext: '₦5,000 in last 24 hours',
      change: '+200%',
      changeColor: 'text-red-500'
    },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {additionalStats.map((stat, idx) => (
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
    </div>
  );
};

export default KYCStats;