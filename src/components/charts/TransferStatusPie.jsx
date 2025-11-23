import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from '@mui/x-charts/PieChart';

const TransferStatusPie = ({ title = "Transfers Status %" }) => {
  const statusData = [
    { id: 0, value: 30, label: 'Success', color: '#10B981' },
    { id: 1, value: 20, label: 'Failed', color: '#F59E0B' },
    { id: 2, value: 20, label: 'Reverted', color: '#06b6d4' },
    { id: 3, value: 10, label: 'Pending', color: '#FCD34D' }
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <PieChart
              series={[{
                data: statusData,
                innerRadius: 60,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 5,
              }]}
              height={200}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              slotProps={{
                legend: { hidden: true }
              }}
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {statusData.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-general text-[#1E1E1E]">{item.label}</span>
                  <span className="text-sm font-general font-medium text-[#084059] ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferStatusPie;