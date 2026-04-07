import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import UserModals from '@/components/user/UserModal';
import { useUserModals } from '@/hooks/useUserModals';
import { useUsers, useUserMetrics, useSuspendUser, useActivateUser } from '@/store/features/users/useUsers';
import { userStats, userColumns, createUserActions } from './constants';

const Users = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const navigate = useNavigate();
  
  const { modals, setters, selectedUser, setSelectedUser } = useUserModals();

  // Fetch user metrics
  const { data: metricsData } = useUserMetrics();

  // Fetch users with pagination and search
  const {
    data: usersData,
    isLoading: isLoadingUsers
  } = useUsers({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchQuery || undefined,
  });

  const users = usersData?.data || [];

  // Map metrics data to stats format
  const stats = useMemo(() => {
    if (!metricsData?.data) return userStats;

    const { users, agents, accounts, aggregators, aggregatorManagers } = metricsData.data;

    return [
      { label: 'Total Users', value: users?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Accounts', value: accounts?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Agents', value: agents?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Aggregators', value: aggregators?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Aggregator Managers', value: aggregatorManagers?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' }
    ];
  }, [metricsData]);

  const handleSuspendClick = useCallback((user) => {
    setSelectedUser(user);
    setters.setShowSuspendModal(true);
  }, [setSelectedUser, setters]);

  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();

  const handleConfirmSuspend = useCallback(() => {
    if (!selectedUser?._id) return;
    const isActive = selectedUser.status === 'Active' || selectedUser.status === 'active';
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(selectedUser._id, {
      onSettled: () => {
        setters.setShowSuspendModal(false);
        setSelectedUser(null);
      },
    });
  }, [selectedUser, setters, setSelectedUser, suspendUserMutation, activateUserMutation]);

  const tableActions = useMemo(
    () => createUserActions(navigate, handleSuspendClick),
    [navigate, handleSuspendClick]
  );

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Users"
          subtitle="Here is the full list of users on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats stats={stats} />

        <DataTable
          className="font-general"
          data={users}
          columns={userColumns}
          title="Users"
          actions={tableActions}
          loading={isLoadingUsers}
          paginationMode="server"
          rowCount={usersData?.pagination?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
      </div>

      <UserModals
        modals={modals}
        setters={setters}
        selectedUser={selectedUser}
        onSuspendUser={handleConfirmSuspend}
      />
    </div>
  );
};

export default Users;