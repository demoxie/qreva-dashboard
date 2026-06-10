import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProfileModals } from '@/hooks/useProfileModals';
import { useUserById, useUserMetrics, useUserTransactions, useSuspendUser, useActivateUser } from '@/store/features/users/useUsers';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileDetailsView from '@/components/profile/ProfileDetailsView';
import TransactionView from '@/components/profile/TransactionView';
import ProfileModals from '@/components/profile/ProfileModals';
import LoadingState from '@/components/common/LoadingState';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import MultiLineChart from '@/components/charts/MultiLineChart';
import { createTransactionActions } from '@/utils/profileUtils';
import { formatProfileMetrics, getProfileChartData } from '@/utils/formatProfileMetrics';
import { userTransactionColumns } from '@/pages/users/constants';
import { availableTabs, createChartSeries } from '../constants'

const AgentProfileDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'transactions';
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  
  
  const { data: agentResponse, isLoading: loading } = useUserById(id, 'agents');
  const agentData = agentResponse?.data;
  const { data: metricsResponse } = useUserMetrics({
    type: 'Agent',
    userId: id,
  });
  const { data: txResponse, isLoading: loadingTransactions } = useUserTransactions(id, 'agents', {
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchQuery || undefined,
  });
  const agentTransactions = txResponse?.data || [];
  const transactionPagination = txResponse?.pagination || {};
  const { modals, setters, selectedTransaction, setSelectedTransaction } = useProfileModals();
  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const transactionActions = createTransactionActions(
    setSelectedTransaction,
    setters.setShowDetailsModal,
    setters.setShowShareModal
  );

  const agentStats = useMemo(() => {
    return formatProfileMetrics(metricsResponse, agentData?.stats);
  }, [agentData?.stats, metricsResponse]);

  const chartData = useMemo(() => {
    return getProfileChartData(metricsResponse, agentData?.chartData);
  }, [agentData?.chartData, metricsResponse]);

  const handleTransactionSearch = (value) => {
    setSearchQuery(value);
    setPaginationModel((model) => ({ ...model, page: 0 }));
  };

  const handleSuspend = () => {
    if (!agentData?._id) return;
    const isActive = agentData.status === 'Active' || agentData.status === 'active';
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(agentData._id, {
      onSettled: () => setters.setShowSuspendModal(false),
    });
  };

  if (loading) return <LoadingState />;
  if (!agentData) return <LoadingState message="Agent not found" />;

  return (
     <ProfileLayout
      userData={agentData}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      availableTabs={availableTabs}
      actions={[
        {
          label: 'Suspend Agent',
          onClick: () => {
            setters.setShowActionsMenu(false);
            setters.setShowSuspendModal(true);
          }
        }
      ]}
    >
      {activeTab === 'profile' ? (
        <ProfileDetailsView userData={agentData} showBusinessDetails />
      ) : (
        <TransactionView
          stats={agentStats}
          transactions={agentTransactions}
          actions={transactionActions}
          columns={userTransactionColumns}
          setSearchQuery={handleTransactionSearch}
          loading={loadingTransactions}
          paginationMode="server"
          rowCount={transactionPagination.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie data={chartData} />
            <MultiLineChart data={chartData} series={createChartSeries(chartData)} />
          </div>
        </TransactionView>
      )}

      <ProfileModals
        modals={modals}
        setters={setters}
        selectedTransaction={selectedTransaction}
        onSuspend={handleSuspend}
        suspendTitle="Suspend Agent"
        suspendMessage="Are you sure you want to suspend this agent?"
      />
    </ProfileLayout>
  );
};

export default AgentProfileDetails;
