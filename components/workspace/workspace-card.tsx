"use client";
import { Avatar } from "@cmp/shared/avatar";
import { AvatarGroup } from "@cmp/shared/avatar-group";
import { Workspace } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  workspace: Workspace;
};

export const WorkspaceCard: React.FC<Props> = ({ workspace }) => {
  return (
    <div className="border rounded-lg flex justify-between items-center hover:shadow-md duration-300">
      <Link href={`/worksapce/${workspace.id}`} className="px-4 py-2 flex-1">
        <p className="font-semibold">{workspace.name}</p>

        <div className="inline-flex gap-1 items-center">
          <Avatar className="bg-blue-100 border-2" size={20} />
          <Avatar className="bg-red-100 border-2 -ml-2" size={20} />

          <small className="text-gray-500 text-xs">You, Ali, ...</small>
        </div>
      </Link>

      <div className="px-4 py-2 flex-grow-0">actions</div>
    </div>
  );
};
