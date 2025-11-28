const PersonalDetailsCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="First Name" value={user.firstName} />
        <DetailItem label="Middle Name" value={user.middleName} />
        <DetailItem label="Last Name" value={user.lastName} />
        <DetailItem label="Email Address" value={user.email} />
        <DetailItem label="Mobile Number" value={user.phone} />
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium text-gray-900">{value || '-'}</p>
  </div>
);

export default PersonalDetailsCard;