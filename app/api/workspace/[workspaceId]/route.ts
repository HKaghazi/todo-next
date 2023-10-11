import { currentUser } from "@lib/auth";
import { inputError, unauthemticatedError } from "@lib/err-handler";
import { prisma } from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type GetParams = {
  workspaceId: string;
};
export async function GET(req: NextRequest, { params }: API_Params<GetParams>) {
  if (!params.workspaceId || typeof params.workspaceId != "string")
    return inputError();

  const user = await currentUser(req);
  if (!user) return unauthemticatedError();

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: params.workspaceId,
    },
  });

  // TODO: check user has access to this workspace

  return NextResponse.json(workspace);
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const validationResult = await createWorkspaceSchema.safeParseAsync(body);
//   if (!validationResult.success) return inputError();

//   const user = await currentUser(req);
//   if (!user) return unauthemticatedError();

//   const newWorkspace = await prisma.workspace.create({
//     data: {
//       name: body.name,
//       userId: user.id,
//     },
//   });

//   return NextResponse.json(newWorkspace);
// }
