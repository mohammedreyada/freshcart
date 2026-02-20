"use client";

import React, { useEffect, useState } from "react";
import { getUserCart } from "@/CartActions/getUserCart.action";
import { removeCartItem } from "@/CartActions/removeCartItem.action";
import { removeCart } from "@/CartActions/removeCart.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { updateCartItem } from '@/CartActions/updateCartItme.action';
import { addToCart } from "../waishlistActions/addWishlist.action";
interface Product {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState<string | undefined>();

  const { setNumberOfItems } = useCart();

  // حساب العدد الكلي والسعر الكلي
  useEffect(() => {
    const totalItems = products.reduce((acc, p) => acc + p.count, 0);
    const total = products.reduce((acc, p) => acc + p.price * p.count, 0);

    setNumberOfItems(totalItems);
    setTotalPrice(total);
  }, [products, setNumberOfItems]);

  // جلب بيانات الكارت للمستخدم
  const getUserCartProducts = async () => {
    setLoading(true);
    try {
      const res = await getUserCart();
      setCartId(res?.cartId);

      if (res?.status === "success") {
        setProducts(res.data.products);
      } else if (res?.message?.includes("Invalid Token")) {
        toast.error("Session expired. Please login again.", { duration: 2000 });
        window.location.href = "/Login";
      } else {
        toast.error(res?.message || "Failed to load cart", { duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart", { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  // إزالة منتج من الكارت
  const removeProductFromCart = async (id: string) => {
    if (updatingId) return;

    setUpdatingId(id);
    const toastId = toast.loading("Removing product...", { position: "top-center" });

    try {
      const res = await removeCartItem(id);

      if (res?.status === "success") {
        setProducts(res.data.products);
        toast.success("Product removed from cart", { id: toastId, duration: 2000 });
      } else if (res?.message?.includes("Invalid Token")) {
        toast.error("Session expired. Please login again.", { id: toastId, duration: 2000 });
        window.location.href = "/Login";
      } else {
        toast.error(res?.message || "Failed to remove product", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    } finally {
      setUpdatingId(null);
    }
  };

  // تحديث كمية منتج
  const updateCartProduct = async (id: string, count: number) => {
    if (updatingId) return;

    if (count === 0) {
      await removeProductFromCart(id);
      return;
    }

    setUpdatingId(id);
    const toastId = toast.loading("Updating quantity...", { position: "top-center" });

    try {
      // لو دالة updateCartItem تتوقع string:
      const res = await updateCartItem(id, count.toString()); 

      if (res?.status === "success") {
        setProducts(res.data.products);
        toast.success("Quantity updated", { id: toastId, duration: 2000 });
      } else if (res?.message?.includes("Invalid Token")) {
        toast.error("Session expired. Please login again.", { id: toastId, duration: 2000 });
        window.location.href = "/Login";
      } else {
        toast.error(res?.message || "Quantity update failed", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    } finally {
      setUpdatingId(null);
    }
  };

  // إزالة الكارت بالكامل
  const removeUserCart = async () => {
    try {
      const res = await removeCart();

      if (res?.status === "success" || res?.message === "success") {
        setProducts([]);
        setNumberOfItems(0);
        setTotalPrice(0);
        toast.success("Cart cleared successfully", { duration: 2000 });
      } else if (res?.message?.includes("Invalid Token")) {
        toast.error("Session expired. Please login again.", { duration: 2000 });
        window.location.href = "/Login";
      } else {
        toast.error("Failed to clear cart", { duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  // نقل المنتج للـ Wishlist
  const moveToWishlist = async (productId: string) => {
    if (updatingId) return;

    setUpdatingId(productId);
    const toastId = toast.loading("Moving to wishlist...", { position: "top-center" });

    try {
      const wishRes = await addToCart(productId);

      if (wishRes?.status !== "success") {
        throw new Error(wishRes?.message || "Failed to add to wishlist");
      }

      const cartRes = await removeCartItem(productId);

      if (cartRes?.status === "success") {
        setProducts(cartRes.data.products);
        toast.success("Moved to wishlist ❤️", { id: toastId, duration: 2000 });
      } else {
        throw new Error(cartRes?.message || "Failed to remove from cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    getUserCartProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold text-gray-500">
        Loading your cart 🛒....
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <Button
        className="bg-emerald-500 text-white my-6 block ms-auto"
        onClick={removeUserCart}
      >
        Clear Cart
      </Button>

      <h2 className="text-2xl font-semibold text-gray-800">
        Total Price:
        <span className="ml-2 text-emerald-600 font-bold">{totalPrice} EGP</span>
      </h2>

      <div className="overflow-hidden rounded-2xl shadow-xl border bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => {
              const isUpdating = updatingId === prod.product._id;

              return (
                <tr key={prod._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img
                      src={prod.product.imageCover}
                      alt={prod.product.title}
                      className="w-20 h-20 object-cover rounded-xl shadow"
                    />
                  </td>

                  <td className="p-4 font-semibold text-gray-800">{prod.product.title}</td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={isUpdating}
                        onClick={() => updateCartProduct(prod.product._id, prod.count - 1)}
                        className="w-8 h-8 rounded-full border hover:bg-red-100 disabled:opacity-40"
                      >
                        −
                      </button>

                      {isUpdating ? (
                        <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <span className="font-semibold">{prod.count}</span>
                      )}

                      <button
                        disabled={isUpdating}
                        onClick={() => updateCartProduct(prod.product._id, prod.count + 1)}
                        className="w-8 h-8 rounded-full border hover:bg-emerald-100 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-emerald-600">{prod.price * prod.count} EGP</td>

                  <td className="p-4 text-center space-y-2">
                    <button
                      disabled={isUpdating}
                      onClick={() => removeProductFromCart(prod.product._id)}
                      className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300 w-full"
                    >
                      {isUpdating ? "Processing..." : "Remove"}
                    </button>

                    <button
                      disabled={isUpdating}
                      onClick={() => moveToWishlist(prod.product._id)}
                      className="px-4 py-2 rounded-lg font-medium bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-300 w-full"
                    >
                      {isUpdating ? "Processing..." : "Move to Wishlist ❤️"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">Your cart is empty 🧺</div>
        )}
      </div>

      {cartId && (
        <Button className="my-6 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 block ms-auto">
          <Link href={`/checkout/${cartId}`}>Checkout</Link>
        </Button>
      )}
    </div>
  );
}