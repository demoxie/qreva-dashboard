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
  useInviteAggregator,
} from "@/store/features/users/useUsers";
import { formatUserStats } from "@/utils/formatUserStats";

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

  const { data: totalAggregatorsResponse } = useUsers({
    type: "Aggregator",
    limit: 1,
  });

  const { data: activeAggregatorsResponse } = useUsers({
    type: "Aggregator",
    status: "Active",
    limit: 1,
  });

  const metricsStats = useMemo(
    () => formatUserStats(totalAggregatorsResponse, activeAggregatorsResponse, "Aggregators"),
    [totalAggregatorsResponse, activeAggregatorsResponse],
  );

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
  const inviteAggregatorMutation = useInviteAggregator();

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
      inviteAggregatorMutation.mutate(
        { fullName: aggregatorData.fullName, email: aggregatorData.email },
        {
          onSuccess: () => {
            setters.setShowAddAggregatorModal(false);
            setters.setShowAggregatorAddedModal(true);
          },
          onError: () => {
            setters.setShowAddAggregatorModal(false);
            setters.setShowAggregatorAddedModal(true);
          },
        },
      );
    },
    [setters, inviteAggregatorMutation],
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
              Add Aggregator Manager
            </button>
          }
        />

        <DashboardStats stats={metricsStats} route="aggregator-managers" />

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
        isSubmittingInvite={inviteAggregatorMutation.isPending}
        onSuspendManager={handleConfirmSuspend}
      />
    </div>
  );
};

export default AggregatorManagers;
