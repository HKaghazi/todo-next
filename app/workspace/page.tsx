import { WorkspaceWrapper } from "@cmp/workspace/workspace-wrapper";
import { WorkspacesHeader } from "@cmp/workspace/worspaces-header";
import { API_URL } from "@lib/constants";
import { Workspace } from "@prisma/client";
import { cookies } from "next/headers";

async function getWorkspaces(): Promise<Workspace[]> {
  try {
    const res = await fetch(`${API_URL}/workspace`, {
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Workspace() {
  const workspaces = await getWorkspaces();

  return (
    <>
      <WorkspacesHeader />
      <WorkspaceWrapper workspaces={workspaces} />
    </>
  );
}
