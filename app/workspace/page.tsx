"use client";
import { useCreateWorkspaceModal } from "@cmp/workspace/create-workspace-modal";

export default function Workspace() {
  const { ModalCMP, openModal } = useCreateWorkspaceModal();
  return (
    <div className="">
      <h1>My workspaces</h1>

      <button type="button" onClick={() => openModal(true)}>
        create workspace
      </button>

      <ModalCMP />
    </div>
  );
}
