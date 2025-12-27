import { useParams } from 'react-router-dom';
import RegionDetailsView from '@/components/airtime-purchase/RegionDetailsView';
import TransactionDetailsView from '@/components/airtime-purchase/TransactionDetailsView';

const AirtimeDetails = () => {
  const { type } = useParams();

  if (type === 'region') return <RegionDetailsView />;
  if (type === 'transaction') return <TransactionDetailsView />;

  return <div>Invalid view type</div>;
};

export default AirtimeDetails;
