import { z } from "zod";
// interface Body {
//   userId: string;

//   newOrganization: {
//     name: string;
//     users: string[];
//   }
// }

export const createWorkspaceSchema = z.object({
  name: z.string(),
});
