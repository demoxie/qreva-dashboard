import DashboardStats from '@/components/base/DashboardStats';
import PageHeader from '@/components/common/PageHeader';
import RequestTabs from '@/components/request/RequestTabs';
import RequestsSearch from '@/components/request/RequestSearch';
import RequestsGrid from '@/components/request/RequestGrid';
import RequestDetailsModal from '@/components/request/RequestDetailsModal';
import { useRequestFilters } from '@/hooks/useRequestFilters';
import { useRequestModals } from '@/hooks/useRequestModals';
import { requestsData } from './data';
import { stats, requestTabs } from './constants';

export default function Request() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredRequests,
    pendingCount
  } = useRequestFilters(requestsData);

  const {
    showDetailsModal,
    selectedRequest,
    openDetailsModal,
    closeDetailsModal
  } = useRequestModals();

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Requests"
          subtitle="View all your earnings and withdraw earnings here"
          hidden={true}
        />

        <DashboardStats stats={stats} />

        <RequestTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={requestTabs}
          pendingCount={pendingCount}
        />

        <RequestsSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <RequestsGrid
          requests={filteredRequests}
          onViewDetails={openDetailsModal}
        />
      </div>

      <RequestDetailsModal
        isOpen={showDetailsModal}
        onClose={closeDetailsModal}
        request={selectedRequest}
      />
    </div>
  );
}