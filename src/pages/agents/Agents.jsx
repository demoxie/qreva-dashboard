import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import AgentModals from '@/components/agents/AgentsModals';
import { useAgentModals } from '@/hooks/useAgentModals';
import { agentStats, agentColumns, createAgentActions } from './constants';
import { useUsers, useSuspendUser, useActivateUser } from '@/store/features/users/useUsers';

const Agents = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: usersResponse, isLoading } = useUsers({
    type: 'Agent',
    search: searchQuery || undefined,
  });

  const agents = usersResponse?.data || [];

  const { modals, setters, selectedAgent, setSelectedAgent } = useAgentModals();

  const handleSuspendClick = useCallback((agent) => {
    setSelectedAgent(agent);
    setters.setShowSuspendModal(true);
  }, [setSelectedAgent, setters]);

  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();

  const handleConfirmSuspend = useCallback(() => {
    if (!selectedAgent?._id) return;
    const isActive = selectedAgent.status === 'Active' || selectedAgent.status === 'active';
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(selectedAgent._id, {
      onSettled: () => {
        setters.setShowSuspendModal(false);
        setSelectedAgent(null);
      },
    });
  }, [selectedAgent, setters, setSelectedAgent, suspendUserMutation, activateUserMutation]);

  const handleAddAgent = useCallback((agentData) => {
    console.log('Add agent:', agentData);
    setters.setShowAddAgentModal(false);
    setters.setShowAgentAddedModal(true);
  }, [setters]);

  const tableActions = useMemo(
    () => createAgentActions(navigate, handleSuspendClick),
    [navigate, handleSuspendClick]
  );

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Agents"
          subtitle="Here is the full list of agents on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          actionButton={
            <button
              onClick={() => setters.setShowAddAgentModal(true)}
              className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
            >
              Add Agent
            </button>
          }
        />

        <DashboardStats stats={agentStats} />

        <DataTable
          className="font-general"
          data={agents}
          columns={agentColumns}
          title="Agents"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
          loading={isLoading}
        />
      </div>

      <AgentModals
        modals={modals}
        setters={setters}
        selectedAgent={selectedAgent}
        onAddAgent={handleAddAgent}
        onSuspendAgent={handleConfirmSuspend}
      />
    </div>
  );
};

export default Agents;
