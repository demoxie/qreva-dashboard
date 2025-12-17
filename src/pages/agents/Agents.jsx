import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import AgentModals from '@/components/agents/AgentsModals';
import { useAgentModals } from '@/hooks/useAgentModals';
import { useAgentSearch } from '@/hooks/useAgentSearch';
import { agentsData } from './data';
import { agentStats, agentColumns, createAgentActions } from './constants';

const Agents = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  
  const { modals, setters, selectedAgent, setSelectedAgent } = useAgentModals();
  const { searchQuery, setSearchQuery, filteredAgents } = useAgentSearch(agentsData);

  const handleSuspendClick = useCallback((agent) => {
    setSelectedAgent(agent);
    setters.setShowSuspendModal(true);
  }, [setSelectedAgent, setters]);

  const handleConfirmSuspend = useCallback(() => {
    console.log('Suspend agent:', selectedAgent);
    setters.setShowSuspendModal(false);
    setSelectedAgent(null);
  }, [selectedAgent, setters, setSelectedAgent]);

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
          data={filteredAgents}
          columns={agentColumns}
          title="Agents"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
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