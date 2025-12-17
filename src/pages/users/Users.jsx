import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import UserModals from '@/components/user/UserModal';
import { useUserModals } from '@/hooks/useUserModals';
import { useUserSearch } from '@/hooks/useUserSearch';
import { usersData } from './data';
import { userStats, userColumns, createUserActions } from './constants';

const Users = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  
  const { modals, setters, selectedUser, setSelectedUser } = useUserModals();
  const { searchQuery, setSearchQuery, filteredUsers } = useUserSearch(usersData);

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

        <DashboardStats stats={userStats} />

        <DataTable
          className="font-general"
          data={filteredUsers}
          columns={userColumns}
          title="Users"
          actions={tableActions}
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