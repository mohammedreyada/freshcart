import { Order } from "@/types/Order";

export async function getAllOrders(token: string): Promise<Order[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Error fetching orders:", await res.text());
      return [];
    }

    const data = await res.json();
    return data.orders; // أو حسب شكل الـ API
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
