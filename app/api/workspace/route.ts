import { prisma } from "@lib/prisma";
import { createWorkspaceSchema } from "dto/workspace.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = createWorkspaceSchema.parse(req.body);

  const newWorkspace = prisma.workspace.create({
    data: {
      name: data.name,
    },
  });

  return NextResponse.json({});
}
