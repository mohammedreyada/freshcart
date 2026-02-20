"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddBtn from "../addBtn/addBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/products.types";
interface SingleProductsProps {
  product: Product;
}

export default function SingleProducts({ product }: SingleProductsProps) {
  return (
    <div>
      {/* CARD clickable */}
      <Link href={`/Products/${product._id}`} className="block">
        <Card className="group rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer">
          
          {/* IMAGE */}
          <div className="overflow-hidden">
            <Image
              width={300}
              height={300}
              src={product.imageCover || "/placeholder.png"} // fallback
              alt={product.title || "Product"}
              className="w-full h-56 object-cover group-hover:scale-110 transition duration-300"
            />
          </div>

          {/* HEADER */}
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-600 font-medium">
              {product.category?.name || "Uncategorized"} {/* fallback */}
            </CardDescription>

            <CardTitle className="text-lg line-clamp-1">
              {product.title || "No Title"}
            </CardTitle>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-emerald-600">
                {product.price != null ? product.price : 0} EGP
              </span>

              <span className="flex items-center gap-1 text-sm">
                <i className="fa fa-star text-yellow-400"></i>
                {product.ratingsAverage != null ? product.ratingsAverage : 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* BUTTON outside the card */}
      <AddBtn id={product._id} />
    </div>
  );
}