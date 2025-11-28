const TierDetailsCard = ({ tier, data }) => {
  if (!data) return null;

  const renderTier1 = () => (
    <div className="grid grid-cols-2 gap-4">
      <DetailItem label="Valid ID" value={data.validId} />
      <DetailItem label="BVN Number" value={data.bvnNumber} />
    </div>
  );

  const renderTier2 = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DetailItem label="Valid ID" value={data.validId} />
        <DetailItem label="BVN Number" value={data.bvnNumber} />
        <DetailItem label="Valid ID" value={data.validId2} />
        <DetailItem label="NIN Number" value={data.ninNumber} />
      </div>
      <ImagePreview 
        label="Uploaded Photo" 
        src={data.photo} 
        alt="NIN Card Image" 
      />
    </>
  );

  const renderTier3 = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DetailItem label="State" value={data.state} />
        <DetailItem label="Local Government Area" value={data.lga} />
        <DetailItem label="Address" value={data.address} className="col-span-2" />
        <DetailItem label="Document Type" value={data.documentType} className="col-span-2" />
      </div>
      <ImagePreview 
        label="Uploaded Photo" 
        src={data.document} 
        alt={`${data.documentType} Image`} 
      />
    </>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Tier {tier} Details</h3>
      {tier === 1 && renderTier1()}
      {tier === 2 && renderTier2()}
      {tier === 3 && renderTier3()}
    </div>
  );
};

const DetailItem = ({ label, value, className = '' }) => (
  <div className={className}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium text-gray-900">{value || '-'}</p>
  </div>
);

const ImagePreview = ({ label, src, alt }) => (
  <div>
    <p className="text-sm text-gray-600 mb-2">{label}</p>
    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">{alt}</span>
        </div>
      )}
    </div>
  </div>
);

export default TierDetailsCard;