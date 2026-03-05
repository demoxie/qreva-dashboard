import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@mui/x-charts/BarChart';

const BarChartComponent = ({ 
  data = [], 
  series = [], 
  title = "Daily Transaction Count",
  height = 300 
}) => {
  const getXAxisLabel = (index) => {
    const labels = [
      'Today', 'Yesterday', '2 Days Ago', '3 Days Ago', '4 Days Ago', 
      '5 Days Ago', '6 Days Ago', '7 Days Ago', 'Week Ago', 
      '2 Weeks Ago', '3 Weeks Ago', '4 Weeks Ago'
    ];
    return labels[index] || `${index} days ago`;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
            {title}
          </CardTitle>
          <div className="flex gap-4">
            {series.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: s.color }}
                ></div>
                <span className="text-xs font-general text-[#7C8D96]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <BarChart
          xAxis={[{ 
            data: data.map((d, idx) => d.label || getXAxisLabel(idx)),
            scaleType: 'band',
            tickLabelStyle: { 
              fontSize: 12,
              fill: '#7C8D96',
              fontFamily: 'General Sans, sans-serif',
              transform: 'rotate(0deg)',
            },
          }]}
          series={series.map(s => ({
            data: s.data,
            color: s.color,
            label: s.label,
          }))}
          height={height}
          margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
          grid={{
            horizontal: true,
          }}
          sx={{
             ".MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "transparent",
            },
            ".MuiChartsGrid-horizontal line": {
              stroke: "#BCC6CC",
              strokeDasharray: "4 4",
              opacity: 0.4,
            },
            ".MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "transparent",
            },
            ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              dy: "10px",
            },
            ".MuiBarElement-root": {
              rx: 4,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;