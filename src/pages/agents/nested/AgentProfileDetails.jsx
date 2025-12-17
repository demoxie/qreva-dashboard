import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProfileData } from '@/hooks/useProfileData';
import { useProfileModals } from '@/hooks/useProfileModals';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileDetailsView from '@/components/profile/ProfileDetailsView';
import TransactionView from '@/components/profile/TransactionView';
import ProfileModals from '@/components/profile/ProfileModals';
import LoadingState from '@/components/common/LoadingState';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import MultiLineChart from '@/components/charts/MultiLineChart';
import { createTransactionActions } from '@/utils/profileUtils';
import { cardVsQRPayments } from '@/constants/mockData';
import { mockAgent, agentTransactions, multiLineData } from '../data';
import { availableTabs, chartSeries } from '../constants'

const AgentProfileDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'transactions';

  
  
  const { data: agentData, loading } = useProfileData(id, async () => mockAgent);
  const { modals, setters, selectedTransaction, setSelectedTransaction } = useProfileModals();

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const transactionActions = createTransactionActions(
    setSelectedTransaction,
    setters.setShowDetailsModal,
    setters.setShowShareModal
  );


  const handleSuspend = () => {
    console.log('Suspend agent:', id);
    setters.setShowSuspendModal(false);
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
          stats={agentData.stats}
          transactions={agentTransactions}
          actions={transactionActions}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie data={cardVsQRPayments} />
            <MultiLineChart data={multiLineData} series={chartSeries} />
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