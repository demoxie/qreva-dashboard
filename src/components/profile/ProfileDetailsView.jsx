import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import TierDetailsCard from '@/components/cards/TierDetailsCard';
import BusinessDetailsCard from '@/components/cards/BusinessDetailsCard';
import AccountCreationIssueCard from '@/components/cards/AccountCreationIssueCard';

const ProfileDetailsView = ({
  userData,
  showBusinessDetails = false,
  onRetryAccountCreation,
  isRetryingAccountCreation = false,
  canRetryAccountCreation = false,
}) => {
  return (
    <>
      <AccountCreationIssueCard
        accountCreation={userData?.accountCreation}
        onRetry={onRetryAccountCreation}
        isRetrying={isRetryingAccountCreation}
        canRetry={canRetryAccountCreation}
      />
      <PersonalDetailsCard user={userData} />
      
      {showBusinessDetails && userData.businessDetails && (
        <BusinessDetailsCard business={userData.businessDetails} />
      )}
      
      {userData.tier1 && <TierDetailsCard tier={1} data={userData.tier1} />}
      {userData.tier2 && <TierDetailsCard tier={2} data={userData.tier2} />}
      {userData.tier3 && <TierDetailsCard tier={3} data={userData.tier3} />}
    </>
  );
};

export default ProfileDetailsView;
