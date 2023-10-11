"use client";

import React from "react";

type Props = {
  title?: string;
};
export const WorkspaceInfoHeader: React.FC<Props> = ({ title }) => {
  // const { ModalCMP, openModal } = useCreateWorkspaceModal();
  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-3xl font-light">{title}</h1>

      {/* <Button
        onClick={() => openModal(true)}
        text="create workspace"
        className="w-max"
        variant="secondary"
        icon={<FiPlus />}
      /> */}
      {/* <ModalCMP /> */}
    </div>
  );
};
