import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from '@mui/x-charts/PieChart';

const TransactionPercentagePie = ({ data, title = "Top % Transactions" , wrapped }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center gap-8 ${wrapped ? 'flex flex-col justify-between h-full space-y-3' : ''}`}>
          <div className="w-full min-w-[150px]">
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
          </div>
          <div className=" w-full px-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {data.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="w-1 h-7 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-[#808C91] font-general">{item.label}</span>
                  <span className="text-sm font-medium ml-auto flex items-center gap-1">{item.value}<p className='text-[#808C91]'>%</p></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPercentagePie;