import * as z from "zod";

export const SignUpFormValidation = z.object({
  name: z.string().nonempty("name is required"),
  email: z.string().nonempty("email is required"),
  password: z.string().nonempty("password is empty"),
});
