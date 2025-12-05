import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from '@mui/x-charts/PieChart';

const PaymentComparisonPie = ({ 
  data, 
  title, 
  showPercentage = true,
  amountData = null 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#1E1E1E] font-urbanist font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <PieChart
            series={[{
              data: data,
              innerRadius: 80,
              outerRadius: 100,
              paddingAngle: 0,
              cornerRadius: 5,
            }]}
            height={200}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            slotProps={{
              legend: { hidden: true }
            }}
          />
          <div className="flex gap-6 mt-4">
            {data.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="w-1 h-7 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-[#808C91] font-general  ">{item.label}</span>
                <span className="text-sm font-medium">
                  {showPercentage ? `${item.value}%` : amountData?.[idx] || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentComparisonPie;