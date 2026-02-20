import React from "react";
import { getAllProducts } from "@/api/allProducts.api";
import SingleProducts from "../_components/SingleProducts/SingleProducts";
import { Product } from '@/types/products.types';
export default async function Products() {
  const products: Product[] = await getAllProducts();

  return (
    <div className="container w-[80%] mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod: Product) => (
          <SingleProducts key={prod._id} product={prod} />
        ))}
      </div>
    </div>
  );
}