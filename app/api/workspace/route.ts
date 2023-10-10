import { currentUser } from "@lib/auth";
import { inputError, unauthemticatedError } from "@lib/err-handler";
import { prisma } from "@lib/prisma";
import { createWorkspaceSchema } from "dto/workspace.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser(req);
  if (!user) return unauthemticatedError();
  
  const workspaces = await prisma.workspace.findMany({
    where: {
      userId: user.id,
    },
  });
  
  return NextResponse.json(workspaces);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validationResult = await createWorkspaceSchema.safeParseAsync(body);
  if (!validationResult.success) return inputError();

  const user = await currentUser(req);
  if (!user) return unauthemticatedError();

  const newWorkspace = await prisma.workspace.create({
    data: {
      name: body.name,
      userId: user.id,
    },
  });

  return NextResponse.json(newWorkspace);
}
