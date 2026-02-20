"use server";
import { getMyToken } from "@/utillities/getMyToken";

export async function getWishlistLogged() {
  try {
    const token = await getMyToken();

    if (!token) throw new Error("You should log in first");

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const payload = await res.json();
    return payload;
  } catch (error) {
    return { status: "error", message: (error as any).message || "Something went wrong" };
  }
}
