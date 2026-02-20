"use client";

import React, { useEffect, useState } from "react";
import { getWishlistLogged } from "../waishlistActions/getWishlistLogged.action";
import { removeWishlist } from "../waishlistActions/removeWishlist.actions";
import { addToCart } from "../waishlistActions/addWishlist.action";
import { toast } from "sonner";
import Link from "next/link";
import { getAllProducts } from "@/api/allProducts.api";
// نوع المنتلج
interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
}

// مؤقتًا: جلب كل المنتجات للعرض لو wishlist فاضي


export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const wishlistData = await getWishlistLogged();
      console.log("Wishlist API response:", wishlistData);

      if (wishlistData?.status === "success" && wishlistData.data?.length) {
        setProducts(wishlistData.data);
      } else {
        // لو الـ wishlist فاضي، جلب كل المنتجات مؤقتًا
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { duration: 2000 });
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId: string) => {
    setUpdatingId(productId);
    const toastId = toast.loading("Removing product...", { position: "top-center" });

    try {
      const res = await removeWishlist(productId);
      if (res?.status === "success") {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Removed from wishlist", { id: toastId, duration: 2000 });
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

  const moveToCart = async (productId: string) => {
    setUpdatingId(productId);
    const toastId = toast.loading("Moving to cart...", { position: "top-center" });

    try {
      const cartRes = await addToCart(productId);
      if (cartRes?.status !== "success") throw new Error(cartRes?.message || "Failed to add to cart");

      const removeRes = await removeWishlist(productId);
      if (removeRes?.status === "success") {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Moved to cart ✅", { id: toastId, duration: 2000 });
      } else {
        throw new Error(removeRes?.message || "Failed to remove from wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const SkeletonCard = () => (
    <div className="border p-4 rounded-xl shadow animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg mb-2" />
      <div className="h-6 bg-gray-300 rounded mb-1" />
      <div className="h-6 w-20 bg-gray-300 rounded" />
      <div className="h-8 w-full bg-gray-300 rounded mt-2" />
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto pt-32">
        <h1 className="text-3xl font-bold mb-8">My Wishlist ❤️</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-32 max-w-6xl px-4">
      <h1 className="text-3xl font-bold mb-8">My Wishlist ❤️</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg text-center py-12">
          Your wishlist is empty 🛒
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            const isUpdating = updatingId === prod._id;
            return (
              <div key={prod._id} className="border p-4 rounded-xl shadow flex flex-col">
                <img
                  src={prod.imageCover}
                  alt={prod.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h2 className="font-semibold">{prod.title}</h2>
                <p className="text-green-600 font-bold mt-1">{prod.price} EGP</p>

                <div className="mt-auto space-y-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => removeProduct(prod._id)}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
                  >
                    {isUpdating ? "Processing..." : "Remove"}
                  </button>

                  <button
                    disabled={isUpdating}
                    onClick={() => moveToCart(prod._id)}
                    className="w-full px-4 py-2 rounded-lg font-medium bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-300"
                  >
                    {isUpdating ? "Processing..." : "Move to Cart 🛒"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/products">
          <button className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-semibold">
            Browse Products
          </button>
        </Link>
      </div>
    </div>
  );
}
