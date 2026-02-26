import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import UserModals from '@/components/user/UserModal';
import { useUserModals } from '@/hooks/useUserModals';
import { useUsers, useUserMetrics } from '@/store/features/users/useUsers';
import { userStats, userColumns, createUserActions } from './constants';

const Users = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const navigate = useNavigate();
  
  const { modals, setters, selectedUser, setSelectedUser } = useUserModals();

  // Fetch users with pagination and search
  const { 
    data: usersData, 
    isLoading: isLoadingUsers 
  } = useUsers({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchQuery,
    status: '' // Add status filter handling if needed
  });

  // Fetch user metrics
  const { data: metricsData } = useUserMetrics();

  // Map metrics data to stats format
  const stats = useMemo(() => {
    if (!metricsData?.data) return userStats;
    
    const { users, agents, aggregators, aggregatorManagers } = metricsData.data;

    return [
      { label: 'Total Users', value: users?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Personal Accounts', value: '0', change: '0%', subtext: '0 in last 24 hours' }, // Not in API
      { label: 'Total Merchants', value: '0', change: '0%', subtext: '0 in last 24 hours' }, // Not in API
      { label: 'Total Agents', value: agents?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Aggregators', value: aggregators?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' },
      { label: 'Total Aggregator Manager', value: aggregatorManagers?.toLocaleString() || '0', change: '+0%', subtext: 'in last 24 hours' }
    ];
  }, [metricsData]);

  // Map users data to table format
  const mappedUsers = useMemo(() => {
    return usersData?.data?.map(user => ({
      id: user.id || user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddress,
      accountType: user.type,
      status: user.status,
      // Default values for fields not in API response yet
      totalTransactions: 0,
      totalVolume: 0,
       // Using dateOfBirth or potentially createdAt if available. API example showed dateOfBirth
      joinedDate: user.dateOfBirth || new Date().toISOString().split('T')[0] 
    })) || [];
  }, [usersData]);

  const handleSuspendClick = useCallback((user) => {
    setSelectedUser(user);
    setters.setShowSuspendModal(true);
  }, [setSelectedUser, setters]);

  const handleConfirmSuspend = useCallback(() => {
    console.log('Suspend user:', selectedUser);
    // Add API call here to suspend user
    setters.setShowSuspendModal(false);
    setSelectedUser(null);
  }, [selectedUser, setters, setSelectedUser]);

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
          data={mappedUsers}
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