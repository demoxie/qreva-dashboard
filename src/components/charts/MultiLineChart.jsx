import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@mui/x-charts/LineChart';

const MultiLineChart = ({ 
  data = [], 
  series = [], 
  title = "Daily Transaction Volume",
  height = 300 
}) => {
  const formatYAxis = (value) => {
    const formatNumber = (num, divisor, suffix) => {
      const result = num / divisor;
      const decimals = (result < 10 && result % 1 !== 0) ? 1 : 0;
      return `₦${result.toFixed(decimals)}${suffix}`;
    };

    const absValue = Math.abs(value);

    if (absValue >= 1000000) {
      return formatNumber(value, 1000000, 'M');
    } else if (absValue >= 1000) {
      return formatNumber(value, 1000, 'K');
    } else {
      return `₦${value}`;
    }
  };

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
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: s.color }}
                ></div>
                <span className="text-xs font-general text-[#7C8D96]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <LineChart
          xAxis={[{ 
            data: data.map((_, idx) => getXAxisLabel(idx)),
            scaleType: 'point',
            tickLabelStyle: { 
              fontSize: 12,
              fill: '#7C8D96',
              fontFamily: 'General Sans, sans-serif'
            },
            axisLine: {
              stroke: '#D0D5DD',
              strokeWidth: 1
            },
            tickLine: {
              stroke: 'none'
            }
          }]}
          yAxis={[{
            valueFormatter: formatYAxis,
            tickLabelStyle: { 
              fontSize: 12,
              fill: '#7C8D96',
              fontFamily: 'General Sans, sans-serif'
            },
            axisLine: {
              stroke: 'none'
            },
            tickLine: {
              stroke: 'none'
            }
          }]}
          series={series.map(s => ({
            data: s.data,
            color: s.color,
            curve: 'natural',
            showMark: false
          }))}
          height={height}
          margin={{ left: 70, right: 20, top: 20, bottom: 40 }}
          grid={{ 
            vertical: false, 
            horizontal: true,
            horizontalStrokeDasharray: '4 4'
          }}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiChartsGrid-line': {
              stroke: '#E8EBED',
              strokeDasharray: '4 4',
            },
            '.MuiChartsAxis-bottom .MuiChartsAxis-line': {
              stroke: '#D0D5DD',
              strokeWidth: 1
            },
            '.MuiChartsAxis-left .MuiChartsAxis-line': {
              stroke: 'none' 
            },
            '.MuiChartsAxis-left .MuiChartsAxis-tick': {
              stroke: 'none' 
            },
            '.MuiChartsAxis-bottom .MuiChartsAxis-tick': {
              stroke: 'none' 
            }
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MultiLineChart;