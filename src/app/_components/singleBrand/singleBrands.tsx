"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "@/types/Brand";
import { getAllBrands } from "@/api/allBrand.api";

export default function SingleBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      const res: Brand[] = await getAllBrands();
      setBrands(res);
    }

    fetchBrands();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {brands.map((brand) => (
        <Link
          key={brand._id} // ← الآن _id موجود في type
          href={`/Brands/${brand._id}`}
          className="border p-4 rounded-lg hover:shadow-lg transition"
        >
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-32 object-contain"
          />
          <h3 className="text-center mt-3 font-semibold">{brand.name}</h3>
        </Link>
      ))}
    </div>
  );
}