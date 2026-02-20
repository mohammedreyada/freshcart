"use server";

import { decode, JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

interface MyToken extends JWT {
  token?: string;
}

export async function getMyToken(): Promise<string | null> {
  const cookieStore = await cookies();

  const rawToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!rawToken) return null;

  const decoded = (await decode({
    token: rawToken,
    secret: process.env.AUTH_SECRET!,
  })) as MyToken | null;

  return decoded?.token ?? null;
}