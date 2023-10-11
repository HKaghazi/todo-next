"use client";

import Button from "@cmp/shared/button";
import { useCreateWorkspaceModal } from "./create-workspace-modal";
import { FiPlus } from "react-icons/fi";

export const WorkspacesHeader = () => {
  const { ModalCMP, openModal } = useCreateWorkspaceModal();
  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-3xl font-light">My workspaces</h1>

      <Button
        onClick={() => openModal(true)}
        text="create workspace"
        className="w-max"
        variant="secondary"
        icon={<FiPlus />}
      />
      <ModalCMP />
    </div>
  );
};
