
import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import UserProfileHeader from '@/components/base/UserProfileHeader';
import PersonalDetailsCard from '@/components/cards/PersonalDetailsCard';
import BusinessDetailsCard from '@/components/cards/BusinessDetailsCard';
import TierDetailsCard from '@/components/cards/TierDetailsCard';
import ProfileModals from '@/components/profile/ProfileModals';
import LoadingState from '@/components/common/LoadingState';
import AgentsTable from '@/components/aggregators/AgentsTable';
import AgentDropdownMenu from '@/components/aggregators/AgentDropdownMenu';
import TransactionChartsSection from '@/components/aggregators/TransactionChartSection';
import { useUserById, useUserTransactions, useSuspendUser, useActivateUser } from '@/store/features/users/useUsers';
import { useAggregatorProfileModals } from '@/hooks/useAggregatorProfileModals';
import { useAgentDropdown } from '@/hooks/useAgentDropdown';
import { createTransactionActions } from '@/utils/profileUtils';
import { aggregatorProfileTabs, createChartSeries } from '../constants';

const AggregatorProfileDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeFilter, setTimeFilter] = useState('Today');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  
  const { data: aggregatorResponse, isLoading: loading } = useUserById(id, 'aggregators');
  const aggregatorData = aggregatorResponse?.data;
  const { data: txResponse } = useUserTransactions(id, 'aggregators');
  const aggregatorTransactions = txResponse?.data || [];
  const { modals, setters, selectedTransaction, setSelectedTransaction } = useAggregatorProfileModals();
  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();
  const { agentDropdown, openDropdown, closeDropdown } = useAgentDropdown();

  // Sync tab with URL
  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  }, [setSearchParams]);

  const handleAgentActionClick = useCallback((row, rect) => {
    openDropdown(row, rect.right - 192, rect.bottom + window.scrollY + 4);
  }, [openDropdown]);

  const transactionActions = createTransactionActions(
    setSelectedTransaction,
    setters.setShowDetailsModal,
    setters.setShowShareModal
  );

  const aggregatorActions = [
    {
      label: 'Suspend Aggregator',
      onClick: () => {
        setters.setShowActionsMenu(false);
        setters.setShowSuspendModal(true);
      }
    }
  ];

  const handleSuspend = useCallback(() => {
    if (!aggregatorData?._id) return;
    const isActive = aggregatorData.status === 'Active' || aggregatorData.status === 'active';
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(aggregatorData._id, {
      onSettled: () => setters.setShowSuspendModal(false),
    });
  }, [aggregatorData, setters, suspendUserMutation, activateUserMutation]);

  if (loading) return <LoadingState />;
  if (!aggregatorData) return <LoadingState message="Aggregator not found" />;

  const chartSeries = createChartSeries(aggregatorData.chartData);

  // Profile View
  if (activeTab === 'profile') {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="View Profile Details"
            subtitle="Here is the full profile details of this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <UserProfileHeader
            user={aggregatorData}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            availableTabs={aggregatorProfileTabs}
            showActionsMenu={modals.showActionsMenu}
            onToggleActionsMenu={() => setters.setShowActionsMenu(!modals.showActionsMenu)}
            actions={aggregatorActions}
          />

          <PersonalDetailsCard user={aggregatorData} />
          {aggregatorData.businessDetails && <BusinessDetailsCard business={aggregatorData.businessDetails} />}
          <TierDetailsCard tier={1} data={aggregatorData.tier1} />
          <TierDetailsCard tier={2} data={aggregatorData.tier2} />
          <TierDetailsCard tier={3} data={aggregatorData.tier3} />
        </div>

        <ProfileModals
          modals={modals}
          setters={setters}
          selectedTransaction={selectedTransaction}
          onSuspend={handleSuspend}
          suspendTitle="Suspend Aggregator"
          suspendMessage="Are you sure you want to suspend this aggregator?"
        />
      </div>
    );
  }

  // Agents View
  if (activeTab === 'agents') {
    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="View Profile Details"
            subtitle="Here is the full profile details of this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <UserProfileHeader
            user={aggregatorData}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            availableTabs={aggregatorProfileTabs}
            showActionsMenu={modals.showActionsMenu}
            onToggleActionsMenu={() => setters.setShowActionsMenu(!modals.showActionsMenu)}
            actions={aggregatorActions}
          />

          <DashboardStats stats={aggregatorData?.stats} />
          <AgentsTable agents={aggregatorData.agents} onActionClick={handleAgentActionClick} />
        </div>

        <AgentDropdownMenu dropdown={agentDropdown} onClose={closeDropdown} />
      </div>
    );
  }

  // Transaction History View
  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="View Profile Details"
          subtitle="Here is the full profile details of this user"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <UserProfileHeader
          user={aggregatorData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          availableTabs={aggregatorProfileTabs}
          showActionsMenu={modals.showActionsMenu}
          onToggleActionsMenu={() => setters.setShowActionsMenu(!modals.showActionsMenu)}
          actions={aggregatorActions}
        />

        <DashboardStats stats={aggregatorData?.stats} />

        <TransactionChartsSection 
          chartData={aggregatorData.chartData}
          chartSeries={chartSeries}
        />

        <TransactionHistoryTable 
          data={aggregatorTransactions}
          title="Transaction History"
          actions={transactionActions}
        />
      </div>

      <ProfileModals
        modals={modals}
        setters={setters}
        selectedTransaction={selectedTransaction}
        onSuspend={handleSuspend}
        suspendTitle="Suspend Aggregator"
        suspendMessage="Are you sure you want to suspend this aggregator?"
      />
    </div>
  );
};

export default AggregatorProfileDetails;