import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '@/components/tables/DataTable';
import AggregatorManagerModals from '@/components/aggregatorManager/AggregatorManagerModals';
import { useAggregatorManagerModals } from '@/hooks/useAggregatorManagerModals';
import { useAggregatorManagerSearch } from '@/hooks/useAggregatorManagerSearch';
import { aggregatorManagersData } from './data';
import { 
  aggregatorManagerStats, 
  aggregatorManagerColumns, 
  createAggregatorManagerActions 
} from './constants';

const AggregatorManagers = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  
  const { modals, setters, selectedManager, setSelectedManager } = useAggregatorManagerModals();
  const { searchQuery, setSearchQuery, filteredManagers } = useAggregatorManagerSearch(aggregatorManagersData);

  const handleSuspendClick = useCallback((manager) => {
    setSelectedManager(manager);
    setters.setShowSuspendModal(true);
  }, [setSelectedManager, setters]);

  const handleConfirmSuspend = useCallback(() => {
    console.log('Suspend aggregator manager:', selectedManager);
    setters.setShowSuspendModal(false);
    setSelectedManager(null);
  }, [selectedManager, setters, setSelectedManager]);

  const handleAddAggregator = useCallback((aggregatorData) => {
    console.log('Add aggregator:', aggregatorData);
    setters.setShowAddAggregatorModal(false);
    setters.setShowAggregatorAddedModal(true);
  }, [setters]);

  const tableActions = useMemo(
    () => createAggregatorManagerActions(navigate, handleSuspendClick),
    [navigate, handleSuspendClick]
  );

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Aggregator Manager"
          subtitle="Here is the full list of aggregators on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          actionButton={
            <button
              onClick={() => setters.setShowAddAggregatorModal(true)}
              className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
            >
              Add Aggregator
            </button>
          }
        />

        <DashboardStats stats={aggregatorManagerStats} />

        <DataTable
          className="font-general"
          data={filteredManagers}
          columns={aggregatorManagerColumns}
          title="Aggregator Managers"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
      </div>

      <AggregatorManagerModals
        modals={modals}
        setters={setters}
        selectedManager={selectedManager}
        onAddAggregator={handleAddAggregator}
        onSuspendManager={handleConfirmSuspend}
      />
    </div>
  );
};

export default AggregatorManagers;