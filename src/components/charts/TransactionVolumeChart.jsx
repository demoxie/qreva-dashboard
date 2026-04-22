import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@mui/x-charts/LineChart';

const TransactionVolumeChart = ({ data = [], title = "Daily Transaction Value" }) => {
  // Format labels for x-axis
  const getXAxisLabel = (index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Yesterday';
    return `${index} days`;
  };

  const formatYAxis = (value) => {
    const formatNumber = (num, divisor, suffix) => {
      const result = num / divisor;
      // Show decimal only if needed and value is small
      const decimals = (result < 10 && result % 1 !== 0) ? 1 : 0;
      return `N${result.toFixed(decimals)}${suffix}`;
    };

    const absValue = Math.abs(value);

    if (absValue >= 1000000) {
      return formatNumber(value, 1000000, 'M');
    } else if (absValue >= 1000) {
      return formatNumber(value, 1000, 'K');
    } else {
      return `N${value}`;
    }
  };

  return (
    <Card className="mb-6 h-full">
      <CardHeader>
        <CardTitle className="text-base font-urbanist font-semibold text-[#1E1E1E]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          xAxis={[{ 
            data: data.map((d, idx) => d.label || getXAxisLabel(idx)),
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
          series={[{
            data: data.map(d => d.value),
            area: true,
            color: '#06b6d4',
            curve: 'natural',
            showMark: false
          }]}
          height={300}
          margin={{ left: 60, right: 20, top: 20, bottom: 40 }} 
          grid={{ 
            vertical: false, 
            horizontal: true,
            horizontalStrokeDasharray: '4 4'
          }}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiAreaElement-root': {
              fillOpacity: 0.1,
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
            },
            '.MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
              transform: 'translateX(-10px)', 
              fontSize: '11px',
            }
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TransactionVolumeChart;