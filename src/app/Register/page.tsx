"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "../../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const { handleSubmit, control } = form;

  function handleRegister(values: registerSchemaType) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("You registered successfully", {
            duration: 3000,
            position: "top-center",
          });
          router.push("/Login");
        } else {
          toast.error(res.data.message || "Registration failed", {
            duration: 3000,
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message, {
          duration: 3000,
          position: "top-center",
        });
      });
  }

  return (
    <div className="w-[50%] mx-auto my-5">
      <h2 className="text-2xl font-semibold text-center">Register Now!</h2>

      <form onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Name:</FieldLabel>
                <Input {...field} type="text" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email:</FieldLabel>
                <Input {...field} type="email" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password:</FieldLabel>
                <Input {...field} type="password" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>RePassword:</FieldLabel>
                <Input {...field} type="password" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Phone:</FieldLabel>
                <Input {...field} type="tel" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="bg-emerald-600 w-full my-4">
          Register
        </Button>
      </form>
    </div>
  );
}