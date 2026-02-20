import { z } from "zod";

export const CheckoutSchema = z.object({
  details: z
    .string()
    .min(5, "Details must be at least 5 characters"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters"),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;