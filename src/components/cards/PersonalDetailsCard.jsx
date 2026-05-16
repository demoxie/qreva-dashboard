const PersonalDetailsCard = ({ user }) => {
  const personal = user.personalDetails || {};
  const dob = personal.dateOfBirth
    ? new Date(personal.dateOfBirth).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="First Name" value={user.firstName} />
        <DetailItem label="Last Name" value={user.lastName} />
        <DetailItem label="Email Address" value={user.emailAddress} />
        <DetailItem label="Mobile Number" value={user.phoneNumber} />
        <DetailItem label="Date of Birth" value={dob} />
        <DetailItem label="Gender" value={personal.gender} />
        <DetailItem label="State" value={personal.state} />
        <DetailItem label="LGA" value={personal.lga} />
        {(user.referralCode || user.referralLink) && (
          <DetailItem label="Referral Code" value={user.referralCode} />
        )}
        {(user.referralCode || user.referralLink) && (
          <DetailItem label="Referral Link" value={user.referralLink} />
        )}
        <DetailItem label="Address" value={personal.address} className="col-span-2" />
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

export default PersonalDetailsCard;
