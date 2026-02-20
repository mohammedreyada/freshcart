"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/api/allProducts.api";
import SingleProducts from "../SingleProducts/SingleProducts";
import { Product } from "@/types/products.types";
export default function AllProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getAllProducts();
        console.log("API response:", res); // 👈 لتتبع شكل البيانات

        // التعامل مع أي شكل للـ API
        let productsArray: Product[] = [];

        if (Array.isArray(res?.data)) {
          productsArray = res.data;
        } else if (Array.isArray(res?.products)) {
          productsArray = res.products;
        } else if (Array.isArray(res?.data?.products)) {
          productsArray = res.data.products;
        } else if (Array.isArray(res?.items)) {
          productsArray = res.items;
        }

        if (productsArray.length === 0) {
          console.warn("No products found in API response!");
        }

        setData(productsArray);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-10">{error}</p>;
  }

  return (
    <section className="w-[90%] xl:w-[80%] mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Products</h2>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((prod: Product) => (
            <SingleProducts key={prod._id} product={prod} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">
          No products available at the moment.
        </p>
      )}
    </section>
  );
}