"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckoutSchema, CheckoutSchemaType } from "@/schema/checkout.schema";
import { checkPayment } from "@/checkoutAction/checkout.action";

export default function CheckoutForm() {
  const params = useParams();
  const router = useRouter();

  // الحصول على cartId بأمان
  const cartId = typeof params?.id === "string" ? params.id : undefined;

  const { handleSubmit, control, reset } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleCheckout(values: CheckoutSchemaType) {
    if (!cartId) {
      toast.error("Cart ID is missing");
      return;
    }

    try {
      const res = await checkPayment(cartId, values);

      if (res?.session?.url) {
        toast.success("Redirecting to payment...");
        reset();
        router.push(res.session.url);
      } else {
        throw new Error("Invalid session URL");
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong during checkout");
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Checkout Details
      </h2>

      <form
        onSubmit={handleSubmit(handleCheckout)}
        className="flex flex-col gap-4"
      >
        {/* Details */}
        <FieldGroup>
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Details:</FieldLabel>
                <Input {...field} />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Phone */}
        <FieldGroup>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Phone:</FieldLabel>
                <Input type="tel" {...field} />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* City */}
        <FieldGroup>
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>City:</FieldLabel>
                <Input {...field} />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="bg-emerald-600 w-full py-2 mt-4 hover:bg-emerald-700 transition"
        >
          Pay Now!
        </Button>
      </form>
    </div>
  );
}