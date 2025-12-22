import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/tables/DataTable';
import AggregatorModals from '@/components/aggregators/AggregatorModals';
import { useAggregatorModals } from '@/hooks/useAggregatorModals';
import { useAggregatorSearch } from '@/hooks/useAggregatorSearch';
import { aggregatorsData,aggregatorStats } from './data';
import { aggregatorColumns, createAggregatorActions } from './constants';
import DashboardStats from '@/components/base/DashboardStats';

const Aggregators = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();
  
  const { modals, setters, selectedAggregator, setSelectedAggregator } = useAggregatorModals();
  const { searchQuery, setSearchQuery, filteredAggregators } = useAggregatorSearch(aggregatorsData);

  const handleSuspendClick = useCallback((aggregator) => {
    setSelectedAggregator(aggregator);
    setters.setShowSuspendModal(true);
  }, [setSelectedAggregator, setters]);

  const handleConfirmSuspend = useCallback(() => {
    console.log('Suspend aggregator:', selectedAggregator);
    setters.setShowSuspendModal(false);
    setSelectedAggregator(null);
  }, [selectedAggregator, setters, setSelectedAggregator]);

  const handleAddAggregator = useCallback((aggregatorData) => {
    console.log('Add aggregator:', aggregatorData);
    setters.setShowAddAggregatorModal(false);
    setters.setShowAggregatorAddedModal(true);
  }, [setters]);

  const tableActions = useMemo(
    () => createAggregatorActions(navigate, handleSuspendClick),
    [navigate, handleSuspendClick]
  );

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Aggregators"
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

        <DashboardStats stats={aggregatorStats} />

        <DataTable
          data={filteredAggregators}
          columns={aggregatorColumns}
          title="Aggregators"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
        />
      </div>

      <AggregatorModals
        modals={modals}
        setters={setters}
        selectedAggregator={selectedAggregator}
        onAddAggregator={handleAddAggregator}
        onSuspendAggregator={handleConfirmSuspend}
      />
    </div>
  );
};

export default Aggregators;