import { User } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const currentUser = async (req: NextRequest): Promise<User | null> => {
  const token = await getToken({ req });
  return (token?.user as User) ?? null;
};
