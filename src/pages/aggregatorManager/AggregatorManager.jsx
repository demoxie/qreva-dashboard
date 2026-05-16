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
  useResolveAggregatorInvitee,
  useAggregatorNetwork,
  useResolveAggregatorNetworkCandidate,
  useAssignAggregatorNetworkMember,
  useRemoveAggregatorNetworkMember,
} from "@/store/features/users/useUsers";
import { formatUserStats } from "@/utils/formatUserStats";
import { useAuth } from "@/hooks/useAuth";
import ManageNetworkModal from "@/components/modals/ManageNetworkModal";

const AggregatorManagers = () => {
  const [timeFilter, setTimeFilter] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [showManageNetworkModal, setShowManageNetworkModal] = useState(false);
  const [selectedNetworkOwner, setSelectedNetworkOwner] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const normalizedRole = (user?.role || "").toLowerCase();
  const canManageAggregatorManagers = normalizedRole !== "aggregator" && normalizedRole !== "aggregator_manager";

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
  const resolveInviteeMutation = useResolveAggregatorInvitee();
  const resolveNetworkCandidateMutation = useResolveAggregatorNetworkCandidate();
  const assignNetworkMemberMutation = useAssignAggregatorNetworkMember();
  const removeNetworkMemberMutation = useRemoveAggregatorNetworkMember();
  const { data: networkResponse, isLoading: isLoadingNetwork } = useAggregatorNetwork(
    selectedNetworkOwner?._id,
    {
      page: 1,
      limit: 100,
    },
    {
      enabled: showManageNetworkModal && !!selectedNetworkOwner?._id,
    },
  );
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
      if (!canManageAggregatorManagers) return;
      inviteAggregatorMutation.mutate(
        {
          fullName: aggregatorData.fullName,
          email: aggregatorData.email,
          inviteType: 'aggregator_manager',
        },
        {
          onSuccess: async () => {
            setters.setShowAddAggregatorModal(false);
            setters.setShowAggregatorAddedModal(true);
          },
        },
      );
    },
    [setters, inviteAggregatorMutation, canManageAggregatorManagers],
  );

  const handleResolveInvitee = useCallback(async (email) => {
    if (!canManageAggregatorManagers) return null;
    const response = await resolveInviteeMutation.mutateAsync({
      email,
      inviteType: 'aggregator_manager',
    });
    return response?.data || null;
  }, [resolveInviteeMutation, canManageAggregatorManagers]);

  const openAddAggregatorModal = useCallback(() => {
    setters.setShowAddAggregatorModal(true);
  }, [setters]);

  const openManageNetworkModal = useCallback((owner) => {
    setSelectedNetworkOwner(owner);
    setShowManageNetworkModal(true);
  }, []);

  const tableActions = useMemo(
    () =>
      createAggregatorManagerActions(
        navigate,
        canManageAggregatorManagers ? handleSuspendClick : undefined,
        canManageAggregatorManagers ? openManageNetworkModal : undefined,
      ),
    [navigate, handleSuspendClick, canManageAggregatorManagers, openManageNetworkModal],
  );

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Aggregator Manager"
          subtitle="Here is the full list of aggregators on the platform"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          actionButton={canManageAggregatorManagers ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openAddAggregatorModal}
                className="px-6 py-2.5 bg-[#FF5B04] text-white rounded-lg text-sm font-medium hover:bg-[#E54F03] transition-colors"
              >
                Add Aggregator Manager
              </button>
            </div>
          ) : null}
        />

        <DashboardStats stats={metricsStats} route="aggregator-managers" />

        <DataTable
          className="font-general"
          data={managers}
          columns={aggregatorManagerColumns}
          title="Aggregator Managers Transaction History"
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
        onResolveInvitee={handleResolveInvitee}
        isResolvingInvitee={resolveInviteeMutation.isPending}
        isSubmittingInvite={inviteAggregatorMutation.isPending}
        onSuspendManager={handleConfirmSuspend}
      />

      <ManageNetworkModal
        isOpen={showManageNetworkModal}
        onClose={() => setShowManageNetworkModal(false)}
        owner={selectedNetworkOwner}
        networkResponse={networkResponse}
        isLoadingNetwork={isLoadingNetwork}
        onResolveCandidate={(ownerUserId, email) =>
          resolveNetworkCandidateMutation.mutateAsync({ ownerUserId, email })
        }
        isResolvingCandidate={resolveNetworkCandidateMutation.isPending}
        onAssign={(ownerUserId, email) =>
          assignNetworkMemberMutation.mutate({ ownerUserId, payload: { email } })
        }
        isAssigning={assignNetworkMemberMutation.isPending}
        onRemove={(ownerUserId, memberUserId) => {
          removeNetworkMemberMutation.mutate({ ownerUserId, memberUserId });
        }}
        isRemoving={removeNetworkMemberMutation.isPending}
      />
    </div>
  );
};

export default AggregatorManagers;
