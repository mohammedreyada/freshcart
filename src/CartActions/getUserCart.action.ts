"use server";

import { getMyToken } from "@/utillities/getMyToken";

export async function getUserCart() {
  try {
    const token = await getMyToken();

    if (!token) throw new Error("not logged in");

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return error;
  }
}
