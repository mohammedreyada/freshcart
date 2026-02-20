"use server";
import { getMyToken } from "@/utillities/getMyToken";

export async function addToCart(id: string) {
try {
  let token = await getMyToken();

  if (!token) throw new Error("you should log in first");

  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  let payload = await res.json();
  return payload;
} catch (error) {
  return error;
}

}
