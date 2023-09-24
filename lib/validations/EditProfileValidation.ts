import * as z from "zod";

export const EditProfileValidation = z.object({
  profilePic: z.string(),
  username: z.string(),
  Bio: z.string(),
  Location: z.string(),
  Website: z.string(),
});
