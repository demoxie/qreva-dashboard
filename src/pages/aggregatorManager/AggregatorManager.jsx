import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DashboardStats from "@/components/base/DashboardStats";
import DataTable from "@/components/tables/DataTable";
import AggregatorManagerModals from "@/components/aggregatorManager/AggregatorManagerModals";
import { useAggregatorManagerModals } from "@/hooks/useAggregatorManagerModals";
import {
  aggregatorManagerColumns,
  createAggregatorManagerActions,
} from "./constants";
import {
  useUsers,
  useSuspendUser,
  useActivateUser,
} from "@/store/features/users/useUsers";
import { useCategoryMetrics } from "@/store/features/dashboard/useDashboard";
import { formatDashboardStats } from "@/utils/formatDashboardStats";

const AggregatorManagers = () => {
  const [timeFilter, setTimeFilter] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const navigate = useNavigate();

  const { data: usersResponse, isLoading } = useUsers({
    type: "AggregatorManager",
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchQuery || undefined,
  });

  const managers = usersResponse?.data || [];

  const { data: metricsData } = useCategoryMetrics("aggregator-managers", {
    range: timeFilter.toLowerCase(),
  });
  const metricsStats = useMemo(() => {
    if (!metricsData?.data?.summary) return null;
    return formatDashboardStats(
      metricsData.data.summary,
      metricsData.data.changePercentages || {},
    );
  }, [metricsData]);

  const { modals, setters, selectedManager, setSelectedManager } =
    useAggregatorManagerModals();

  const handleSuspendClick = useCallback(
    (manager) => {
      setSelectedManager(manager);
      setters.setShowSuspendModal(true);
    },
    [setSelectedManager, setters],
  );

  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();

  const handleConfirmSuspend = useCallback(() => {
    if (!selectedManager?._id) return;
    const isActive =
      selectedManager.status === "Active" ||
      selectedManager.status === "active";
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(selectedManager._id, {
      onSettled: () => {
        setters.setShowSuspendModal(false);
        setSelectedManager(null);
      },
    });
  }, [
    selectedManager,
    setters,
    setSelectedManager,
    suspendUserMutation,
    activateUserMutation,
  ]);

  const handleAddAggregator = useCallback(
    (aggregatorData) => {
      console.log("Add aggregator:", aggregatorData);
      setters.setShowAddAggregatorModal(false);
      setters.setShowAggregatorAddedModal(true);
    },
    [setters],
  );

  const tableActions = useMemo(
    () => createAggregatorManagerActions(navigate, handleSuspendClick),
    [navigate, handleSuspendClick],
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

        <DashboardStats stats={metricsStats} />

        <DataTable
          className="font-general"
          data={managers}
          columns={aggregatorManagerColumns}
          title="Aggregator Managers"
          actions={tableActions}
          onSearch={setSearchQuery}
          onFilter={() => console.log("Filter clicked")}
          loading={isLoading}
          paginationMode="server"
          rowCount={usersResponse?.pagination?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
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
