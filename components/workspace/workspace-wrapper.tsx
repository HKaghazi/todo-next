"use client";
import { Workspace } from "@prisma/client";
import React from "react";
import { WorkspaceCard } from "./workspace-card";

type Props = {
  workspaces: Workspace[];
};

export const WorkspaceWrapper: React.FC<Props> = ({ workspaces }) => {
  return (
    <div className="grid gap-2">
      {workspaces.map((ws) => (
        <WorkspaceCard key={ws.id} workspace={ws} />
      ))}
    </div>
  );
};
