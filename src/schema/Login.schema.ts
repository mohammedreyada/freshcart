// src/schema/Login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("This field can't be empty")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("This field can't be empty")
    .min(6, "At least 6 characters"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;