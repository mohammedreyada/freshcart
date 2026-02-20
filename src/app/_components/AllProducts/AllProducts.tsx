// src/app/_components/AllProducts/AllProducts.tsx
"use client"; // ✅ يحول المكون لـ Client Component

import React, { useEffect, useState } from "react";
import { getAllProducts} from "@/api/allProducts.api";
import SingleProducts from "../SingleProducts/SingleProducts";
import { Product } from './../../../types/products.types';

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="w-[90%] xl:w-[80%] mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No products available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <SingleProducts key={prod._id} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
}