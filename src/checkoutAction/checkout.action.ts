"use server";

import { CheckoutSchemaType } from "@/schema/checkout.schema";
import { getMyToken } from "@/utillities/getMyToken";

export async function checkPayment(
  cartId: string,
  formValues: CheckoutSchemaType
) {
  const token = await getMyToken();
  const url = process.env.NEXT_URL;

  if (!token) {
    throw new Error("You should be logged in first to complete payment");
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: formValues,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Checkout session failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Payment failed:", err);
    throw new Error("Payment failed. Please try again.");
  }
}