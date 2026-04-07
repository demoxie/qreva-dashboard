import { useParams, useSearchParams } from 'react-router-dom';
import { useProfileModals } from '@/hooks/useProfileModals';
import { useTransactionSearch } from '@/hooks/useTransactionSearch';
import { useUserById, useSuspendUser, useActivateUser } from '@/store/features/users/useUsers';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileDetailsView from '@/components/profile/ProfileDetailsView';
import TransactionView from '@/components/profile/TransactionView';
import ProfileModals from '@/components/profile/ProfileModals';
import LoadingState from '@/components/common/LoadingState';
import {
  createUserActions,
  getAvailableTabs,
  tabConfig
} from '@/utils/profileUtils';
import { userTransactions } from '../data';

const UserProfileDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const currentTab = tabConfig[activeTab] || tabConfig.transactions;

  const { data: userResponse, isLoading: loading } = useUserById(id);
  const userData = userResponse?.data;
  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();

  const data = userData?.[currentTab.dataKey] || [];

  const { searchQuery, setSearchQuery, filteredTransactions } =
    useTransactionSearch(userTransactions);

  const {
    modals,
    setters,
    selectedTransaction,
    promotionType,
    setPromotionType
  } = useProfileModals();

  const handleSuspend = () => {
    if (!userData?._id) return;
    const isActive = userData.status === 'Active' || userData.status === 'active';
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(userData._id, {
      onSettled: () => setters.setShowSuspendModal(false),
    });
  };

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };


  const userActions = createUserActions(
    userData,
    setters.setShowSuspendModal,
    setters.setShowPromoteModal,
    setPromotionType,
    setters.setShowActionsMenu
  );

  if (loading) return <LoadingState />;
  if (!userData) return <LoadingState message="User not found" />;

  return (
    <ProfileLayout
      userData={userData}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      availableTabs={getAvailableTabs(userData.accountType)}
      actions={userActions}
    >
      {activeTab === 'profile' ? (
        <ProfileDetailsView
          userData={userData}
          showBusinessDetails={userData.accountType !== 'Personal Account'}
        />
      ) : (
        <TransactionView
          title={currentTab.title}
          transactions={data}
          columns={currentTab.columns}
          setSearchQuery={setSearchQuery}
        />
      )}

      <ProfileModals
        modals={modals}
        setters={setters}
        selectedTransaction={selectedTransaction}
        promotionType={promotionType}
        onSuspend={handleSuspend}
      />
    </ProfileLayout>
  );
};

export default UserProfileDetails;