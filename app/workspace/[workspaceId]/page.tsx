import { WorkspaceInfoHeader } from "@cmp/workspace/workspace-info-header";
import { WriteTodo } from "@cmp/workspace/write-todo";
import { API_URL } from "@lib/constants";
import { Workspace } from "@prisma/client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

async function getWorkspaceInfo(id: string): Promise<Workspace | null> {
  try {
    const res = await fetch(`${API_URL}/workspace/${id}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function Workspace({
  params,
}: IPageProps<{
  workspaceId: string;
}>) {
  const { workspaceId } = params;
  if (!workspaceId || typeof workspaceId != "string") return notFound();

  const workspace = await getWorkspaceInfo(workspaceId);
  if (!workspace) return notFound();

  return (
    <>
      <WorkspaceInfoHeader title={workspace?.name} />
      {/* <WorkspaceWrapper workspaces={workspaces} /> */}

      <WriteTodo />
    </>
  );
}
