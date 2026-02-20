"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, loginSchemaType } from "@/schema/Login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control } = form;

  async function handleLogin(values: loginSchemaType) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      // لو مفيش رد من السيرفر
      if (!res) {
        toast.error("No response from server");
        return;
      }

      // لو في error
      if (res.error) {
        toast.error("Invalid email or password");
        return;
      }

      // نجاح
      toast.success("Login successful 🎉");

      // مهم جدًا عشان تحدث session في App Router
      router.push("/");
      router.refresh();

    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  }

  return (
    <div className="w-[50%] mx-auto my-5">
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <form onSubmit={handleSubmit(handleLogin)}>
        {/* Email Field */}
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email:</FieldLabel>
                <Input
                  type="email"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Password Field */}
        <FieldGroup>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password:</FieldLabel>
                <Input
                  type="password"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button className="bg-emerald-600 w-full my-4" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
