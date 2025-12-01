const BusinessDetailsCard = ({ business }) => {
  if (!business) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Business Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Business Name" value={business.businessName} />
        <DetailItem label="Business Email" value={business.businessEmail} />
        <DetailItem label="Business Phone" value={business.businessPhone} />
        <DetailItem 
          label="Business Address" 
          value={business.businessAddress} 
          className="col-span-2" 
        />
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, className = '' }) => (
  <div className={className}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium text-gray-900">{value || '-'}</p>
  </div>
);

export default BusinessDetailsCard;