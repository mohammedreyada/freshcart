"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { addToCart } from "@/CartActions/addToCart.action";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext"; // عدل المسار حسب مشروعك

interface AddBtnProps {
  id: string;
}

export default function AddBtn({ id }: AddBtnProps) {
  const { setNumberOfItems } = useCart();
  const [loading, setLoading] = useState(false);

  async function addProductToCart(id: string) {
    if (loading) return;

    setLoading(true);
    try {
      const res = await addToCart(id);

      if (res.status === "success") {
        toast.success(res.message, { duration: 2000, position: "top-center" });
        // هنا نحدد نوع prev صراحة لتجنب الخطأ
        setNumberOfItems((prev: number) => prev + 1);
      } else {
        toast.error(res.message || "You can't add product now", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Server error. Please try again later.", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={() => addProductToCart(id)}
      disabled={loading}
      className="mt-3 w-full bg-emerald-600 text-white py-2 rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
