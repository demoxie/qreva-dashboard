import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/tables/DataTable";
import AggregatorModals from "@/components/aggregators/AggregatorModals";
import { useAggregatorModals } from "@/hooks/useAggregatorModals";
import { aggregatorColumns, createAggregatorActions } from "./constants";
import DashboardStats from "@/components/base/DashboardStats";
import {
  useUsers,
  useSuspendUser,
  useActivateUser,
  useInviteAggregator,
} from "@/store/features/users/useUsers";
import { useCategoryMetrics } from "@/store/features/dashboard/useDashboard";
import { formatDashboardStats } from "@/utils/formatDashboardStats";

const Aggregators = () => {
  const [timeFilter, setTimeFilter] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const navigate = useNavigate();

  const { data: usersResponse, isLoading } = useUsers({
    type: "Aggregator",
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchQuery || undefined,
  });

  const aggregators = usersResponse?.data || [];

  const { data: metricsData } = useCategoryMetrics("aggregators", {
    range: timeFilter.toLowerCase(),
  });
  const metricsStats = useMemo(() => {
    if (!metricsData?.data?.summary) return null;
    return formatDashboardStats(
      metricsData.data.summary,
      metricsData.data.changePercentages || {},
      timeFilter.toLowerCase(),
    );
  }, [metricsData, timeFilter]);

  const { modals, setters, selectedAggregator, setSelectedAggregator } =
    useAggregatorModals();

  const handleSuspendClick = useCallback(
    (aggregator) => {
      setSelectedAggregator(aggregator);
      setters.setShowSuspendModal(true);
    },
    [setSelectedAggregator, setters],
  );

  const suspendUserMutation = useSuspendUser();
  const activateUserMutation = useActivateUser();
  const inviteAggregatorMutation = useInviteAggregator();

  const handleConfirmSuspend = useCallback(() => {
    if (!selectedAggregator?._id) return;
    const isActive =
      selectedAggregator.status === "Active" ||
      selectedAggregator.status === "active";
    const mutation = isActive ? suspendUserMutation : activateUserMutation;
    mutation.mutate(selectedAggregator._id, {
      onSettled: () => {
        setters.setShowSuspendModal(false);
        setSelectedAggregator(null);
      },
    });
  }, [
    selectedAggregator,
    setters,
    setSelectedAggregator,
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
    () => createAggregatorActions(navigate, handleSuspendClick),
    [navigate, handleSuspendClick],
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

        <DashboardStats stats={metricsStats} />

        <DataTable
          data={aggregators}
          columns={aggregatorColumns}
          title="Aggregators"
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

      <AggregatorModals
        modals={modals}
        setters={setters}
        selectedAggregator={selectedAggregator}
        onAddAggregator={handleAddAggregator}
        isSubmittingInvite={inviteAggregatorMutation.isPending}
        onSuspendAggregator={handleConfirmSuspend}
      />
    </div>
  );
};

export default Aggregators;
