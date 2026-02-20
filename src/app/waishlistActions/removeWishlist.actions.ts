"use server";

import { getMyToken } from "@/utillities/getMyToken";
import { revalidatePath } from "next/cache";

export async function removeWishlist(productId: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("Not authenticated");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to remove");
    }

    revalidatePath("/wishlist");

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong",
    };
  }
}
