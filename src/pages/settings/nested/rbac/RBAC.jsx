import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/tables/DataTable";
import BaseModal from "@/components/modals/BaseModal";
import ConfirmDialog from "@/components/modals/ConfirmDialogComponent";
import {
  useAdminUsers,
  useInviteAdmin,
  useResendAdminInvite,
  useUpdateAdminStatus,
} from "@/store/features/admin/useAdminUsers";
import {
  ADMIN_COLUMNS,
  ADMIN_FILTER_GROUPS,
  ADMIN_LEVEL_OPTIONS,
  ADMIN_ROW_ACTIONS,
} from "./constants";
import { handleError } from "@/store/utils/handleError";
import { handleSuccess } from "@/store/utils/handleSuccess";
import { useAuth } from "@/hooks/useAuth";

const INITIAL_INVITE_FORM = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  role: "Operation",
};

const RBAC = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "SuperAdmin";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState(INITIAL_INVITE_FORM);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [statusTarget, setStatusTarget] = useState(null);
  const [resendTarget, setResendTarget] = useState(null);

  const { data: adminsResponse, isLoading } = useAdminUsers({
    page,
    limit,
    search: search || undefined,
    role: roleFilter || undefined,
    status: statusFilter || undefined,
  });

  const inviteAdminMutation = useInviteAdmin();
  const updateAdminStatusMutation = useUpdateAdminStatus();
  const resendAdminInviteMutation = useResendAdminInvite();

  const admins = useMemo(() => {
    const rows = adminsResponse?.data || [];
    return rows.map((admin) => ({
      ...admin,
      id: admin._id,
      fullName: `${admin.firstName || ""} ${admin.lastName || ""}`.trim(),
    }));
  }, [adminsResponse]);

  const pagination = useMemo(() => {
    const source = adminsResponse?.pagination || {};
    return {
      page: source.page || page,
      limit: source.limit || limit,
      total: source.total || 0,
      totalPages: source.totalPages || 1,
    };
  }, [adminsResponse, page, limit]);

  const resetInviteForm = () => {
    setInviteForm(INITIAL_INVITE_FORM);
  };

  const handleOpenInviteModal = () => {
    resetInviteForm();
    setIsInviteModalOpen(true);
  };

  const handleInviteInputChange = (event) => {
    const { name, value } = event.target;
    setInviteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitInvite = (event) => {
    event.preventDefault();

    if (!inviteForm.firstName.trim() || !inviteForm.lastName.trim() || !inviteForm.emailAddress.trim()) {
      handleError(new Error("First name, last name, and email are required."));
      return;
    }

    inviteAdminMutation.mutate(
      {
        ...inviteForm,
        firstName: inviteForm.firstName.trim(),
        lastName: inviteForm.lastName.trim(),
        emailAddress: inviteForm.emailAddress.trim().toLowerCase(),
      },
      {
        onSuccess: (response) => {
          handleSuccess(response?.message || "Admin invite sent successfully");
          setIsInviteModalOpen(false);
          resetInviteForm();
        },
        onError: (error) => {
          handleError(error, "Failed to send admin invite.");
        },
      }
    );
  };

  const handleConfirmStatusToggle = () => {
    if (!statusTarget?._id) {
      setStatusTarget(null);
      return;
    }

    const nextStatus = statusTarget.status === "Active" ? "Inactive" : "Active";
    updateAdminStatusMutation.mutate(
      {
        adminId: statusTarget._id,
        status: nextStatus,
      },
      {
        onSuccess: (response) => {
          handleSuccess(response?.message || "Admin status updated successfully");
          setStatusTarget(null);
        },
        onError: (error) => {
          handleError(error, "Unable to update admin status.");
          setStatusTarget(null);
        },
      }
    );
  };

  const handleConfirmResendInvite = () => {
    if (!resendTarget?._id) {
      setResendTarget(null);
      return;
    }

    resendAdminInviteMutation.mutate(resendTarget._id, {
      onSuccess: (response) => {
        handleSuccess(response?.message || "Admin invite resent successfully");
        setResendTarget(null);
      },
      onError: (error) => {
        handleError(error, "Unable to resend admin invite.");
        setResendTarget(null);
      },
    });
  };

  const handleAction = (actionKey, row) => {
    if (!row) return;

    if (actionKey === "view") {
      setSelectedAdmin(row);
      return;
    }

    if (!isSuperAdmin) {
      handleError(new Error("Only super admins can perform this action."));
      return;
    }

    if (actionKey === "resendInvite") {
      setResendTarget(row);
      return;
    }

    if (actionKey === "toggleStatus") {
      setStatusTarget(row);
    }
  };

  const actions = useMemo(() => {
    if (!isSuperAdmin) {
      return [
        {
          label: "View Details",
          icon: ADMIN_ROW_ACTIONS.find((item) => item.key === "view")?.icon,
          onClick: (row) => handleAction("view", row),
        },
      ];
    }

    return [
      {
        label: "View Details",
        icon: ADMIN_ROW_ACTIONS.find((item) => item.key === "view")?.icon,
        onClick: (row) => handleAction("view", row),
      },
      {
        label: "Resend Invite",
        icon: ADMIN_ROW_ACTIONS.find((item) => item.key === "resendInvite")?.icon,
        onClick: (row) => handleAction("resendInvite", row),
      },
      {
        label: "Suspend / Activate",
        icon: ADMIN_ROW_ACTIONS.find((item) => item.key === "toggleStatus")?.icon,
        onClick: (row) => handleAction("toggleStatus", row),
      },
    ];
  }, [isSuperAdmin]);

  const handleFilter = (filters = {}) => {
    setPage(1);
    setRoleFilter(filters.role || "");
    setStatusFilter(filters.status || "");
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">Admin Management</h1>
          <p className="text-[#808C91] mt-1">
            Invite, list, and manage admin access levels and invitation lifecycle status.
          </p>
        </div>

        {isSuperAdmin && (
          <Button
            className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
            onClick={handleOpenInviteModal}
          >
            Add Admin
          </Button>
        )}
      </div>

      <DataTable
        data={admins}
        columns={ADMIN_COLUMNS}
        title="Admin Users"
        actions={actions}
        showSearch
        showCheckbox={false}
        loading={isLoading}
        onSearch={(value) => {
          setSearch(value || "");
          setPage(1);
        }}
        onFilter={handleFilter}
        filterGroups={ADMIN_FILTER_GROUPS}
        pagination={pagination}
        onPageChange={setPage}
        pageSize={limit}
        onPaginationModelChange={(model) => {
          setPage((model.page || 0) + 1);
          if (model.pageSize && model.pageSize !== limit) {
            setLimit(model.pageSize);
            setPage(1);
          }
        }}
      />

      <BaseModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Add Admin"
        maxWidth="max-w-xl"
      >
        <form className="space-y-4" onSubmit={handleSubmitInvite}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[#344054]">First Name</span>
              <input
                type="text"
                name="firstName"
                value={inviteForm.firstName}
                onChange={handleInviteInputChange}
                className="border border-[#D0D5DD] rounded-md px-3 py-2 text-sm outline-none focus:border-[#84C4CF]"
                placeholder="First name"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[#344054]">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={inviteForm.lastName}
                onChange={handleInviteInputChange}
                className="border border-[#D0D5DD] rounded-md px-3 py-2 text-sm outline-none focus:border-[#84C4CF]"
                placeholder="Last name"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#344054]">Email Address</span>
            <input
              type="email"
              name="emailAddress"
              value={inviteForm.emailAddress}
              onChange={handleInviteInputChange}
              className="border border-[#D0D5DD] rounded-md px-3 py-2 text-sm outline-none focus:border-[#84C4CF]"
              placeholder="admin@qreva.com"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#344054]">Admin Level</span>
            <select
              name="role"
              value={inviteForm.role}
              onChange={handleInviteInputChange}
              className="border border-[#D0D5DD] rounded-md px-3 py-2 text-sm outline-none focus:border-[#84C4CF]"
            >
              {ADMIN_LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
              disabled={inviteAdminMutation.isPending}
            >
              {inviteAdminMutation.isPending ? "Sending Invite..." : "Send Invite"}
            </Button>
          </div>
        </form>
      </BaseModal>

      <BaseModal
        isOpen={!!selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        title="Admin Details"
        maxWidth="max-w-lg"
      >
        {selectedAdmin && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#667085]">Name</p>
                <p className="font-semibold text-[#1D2939]">{selectedAdmin.fullName}</p>
              </div>
              <div>
                <p className="text-[#667085]">Admin Level</p>
                <p className="font-semibold text-[#1D2939]">{selectedAdmin.role}</p>
              </div>
              <div>
                <p className="text-[#667085]">Invite Status</p>
                <p className="font-semibold text-[#1D2939]">{selectedAdmin.inviteStatus || "-"}</p>
              </div>
              <div>
                <p className="text-[#667085]">Account Status</p>
                <p className="font-semibold text-[#1D2939]">{selectedAdmin.status || "-"}</p>
              </div>
            </div>
            <div>
              <p className="text-[#667085]">Email Address</p>
              <p className="font-semibold text-[#1D2939]">{selectedAdmin.emailAddress || "-"}</p>
            </div>
          </div>
        )}
      </BaseModal>

      <ConfirmDialog
        isOpen={!!statusTarget}
        onClose={() => setStatusTarget(null)}
        onConfirm={handleConfirmStatusToggle}
        title={`${statusTarget?.status === "Active" ? "Suspend" : "Activate"} Admin`}
        message={`Are you sure you want to ${statusTarget?.status === "Active" ? "suspend" : "activate"} ${statusTarget?.fullName || "this admin"}?`}
        confirmText={
          updateAdminStatusMutation.isPending
            ? "Processing..."
            : statusTarget?.status === "Active"
              ? "Suspend"
              : "Activate"
        }
        confirmStyle={statusTarget?.status === "Active" ? "danger" : "primary"}
      />

      <ConfirmDialog
        isOpen={!!resendTarget}
        onClose={() => setResendTarget(null)}
        onConfirm={handleConfirmResendInvite}
        title="Resend Invite"
        message={`Resend admin invite to ${resendTarget?.emailAddress || "this user"}?`}
        confirmText={resendAdminInviteMutation.isPending ? "Sending..." : "Resend Invite"}
        confirmStyle="primary"
      />
    </div>
  );
};

export default RBAC;
