import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("This field can't be empty")
    .min(2, "Minimum length is 2 characters")
    .max(15, "Maximum length is 15 characters"),

  email: z
    .string()
    .nonempty("This field can't be empty")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("This field can't be empty")
    .min(6, "At least 6 characters"),

  rePassword: z.string().nonempty("This field can't be empty"),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
    .transform((val) => val.replace(/\D/g, "")),
}).refine((data) => data.password === data.rePassword, {
  message: "Password and RePassword do not match",
  path: ["rePassword"],
});

export type registerSchemaType = z.infer<typeof registerSchema>;