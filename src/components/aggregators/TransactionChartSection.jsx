import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import MultiLineChart from '@/components/charts/MultiLineChart';
import { cardVsQRPayments } from '@/constants/mockData';

const TransactionChartsSection = ({ chartData, chartSeries }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <PaymentComparisonPie
          data={cardVsQRPayments}
          title="Card Payments vs QR Payments %"
          showPercentage={true}
        />
        <PaymentComparisonPie
          data={cardVsQRPayments}
          title="Card Payments vs QR Payments Commission"
          showPercentage={false}
          amountData={['₦4,000,000', '₦170,823']}
        />
      </div>

      <MultiLineChart 
        data={chartData}
        series={chartSeries}
        title="Daily Transaction Volume"
      />
    </>
  );
};

export default TransactionChartsSection;