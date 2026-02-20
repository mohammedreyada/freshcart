"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  totalOrderPrice: number;
  isPaid: boolean;
}

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/orders");

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        console.error("Failed to fetch orders");
        return;
      }

      const data = await res.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Total Price:</span> {order.totalOrderPrice} EGP
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
