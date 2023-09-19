import * as z from "zod";

export const EditProfileValidation = z.object({
  pic: z.string(),
  username: z.string(),
  bio: z.string(),
  Location: z.string(),
  Website: z.string(),
});
