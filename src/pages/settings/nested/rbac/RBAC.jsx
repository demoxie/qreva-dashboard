import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/tables/DataTable";
import { RBAC_COLUMNS, RBAC_ACTIONS } from "./constants";
import AssignRoleToUserModal from "@/components/modals/AssignRoleToUserModal";
import ConfirmDialog from "@/components/modals/ConfirmDialogComponent";
import { useAssignRole, useDeleteRole, useRoles } from "@/store/features/settings/useRbac";
import { handleError } from "@/store/utils/handleError";
import { handleSuccess } from "@/store/utils/handleSuccess";

const RBAC = () => {
  const navigate = useNavigate();
  const { data: rolesResponse, isLoading } = useRoles();
  const assignRoleMutation = useAssignRole();
  const deleteRoleMutation = useDeleteRole();
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const roles = rolesResponse?.data || [];

  const handleAction = (action, row) => {
    if (action.label === "View Details") {
      navigate(`/settings/rbac/view/${row._id || row.id}`);
    } else if (action.label === "Edit Details") {
      navigate(`/settings/rbac/edit/${row._id || row.id}`);
    } else if (action.label === "Assign Role") {
      setSelectedRole(row);
    } else if (action.label === "Delete Role") {
      setRoleToDelete(row);
    }
  };

  const handleAssignRole = (userId) => {
    const roleId = selectedRole?._id || selectedRole?.id;
    if (!userId || !roleId) return;

    assignRoleMutation.mutate(
      { userId, roleId },
      {
        onSuccess: () => setSelectedRole(null),
      },
    );
  };

  const handleConfirmDelete = () => {
    const id = roleToDelete?._id || roleToDelete?.id;
    if (!id) return;
    deleteRoleMutation.mutate(id, {
      onSuccess: () => {
        handleSuccess("Role deleted successfully");
        setRoleToDelete(null);
      },
      onError: (error) => {
        handleError(error);
        setRoleToDelete(null);
      },
    });
  };

  const actionsWithHandler = RBAC_ACTIONS.map((action) => ({
    ...action,
    onClick: (row) => handleAction(action, row),
  }));

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">
            RBAC (Role Based Permissions)
          </h1>
          <p className="text-[#808C91] mt-1">
            View all the full information about role based permissions on the
            platform
          </p>
        </div>
        <Button
          className="bg-[#FF5B04] hover:bg-[#E54F03] text-white"
          onClick={() => navigate("/settings/rbac/create")}
        >
          Create Role
        </Button>
      </div>

      <DataTable
        data={roles}
        columns={RBAC_COLUMNS}
        title="Permissions"
        actions={actionsWithHandler}
        showSearch={true}
        showCheckbox={true}
        loading={isLoading}
      />

      <AssignRoleToUserModal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        onAssign={handleAssignRole}
        role={selectedRole}
        isSubmitting={assignRoleMutation.isPending}
      />

      <ConfirmDialog
        isOpen={!!roleToDelete}
        onClose={() => setRoleToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the "${roleToDelete?.roleName || roleToDelete?.name || 'this'}" role? Users currently assigned to it will lose its permissions. This action cannot be undone.`}
        confirmText={deleteRoleMutation.isPending ? "Deleting..." : "Yes, delete"}
        confirmStyle="danger"
      />
    </div>
  );
};

export default RBAC;
