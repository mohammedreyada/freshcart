"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCategories } from "@/api/allCategories.api";

interface Product {
  _id: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
  image: string;
  products?: Product[];
}

interface CategoryPageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);

        // جلب كل الفئات
        const allCategories = await getAllCategories();

        // اختيار الفئة المناسبة حسب id
        const cat = allCategories.find((c: Category) => c._id === id) ?? null;

        setCategory(cat);

        if (!cat) {
          setError("Category not found");
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!category) return <p className="text-center mt-20">Category not found.</p>;

  const products = category.products ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-40 pb-24">
      <div className="container mx-auto px-6">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-gray-100">
          <img
            src={category.image}
            alt={category.name}
            className="w-64 h-64 object-cover rounded-3xl shadow-md hover:scale-105 transition duration-500"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-14 text-center">
          Products in {category.name}
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No products found in this category.
          </p>
        ) : (
          <div className="flex flex-col gap-14 items-center">
            {products.map((product) => (
              <div
                key={product._id}
                className="group w-full max-w-5xl bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:-translate-y-2"
              >
                {/* Product Image */}
                <Link href={`/products/${product._id}`} className="md:w-1/3">
                  <div className="h-80 md:h-full overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition duration-500"></div>
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {product.ratingsAverage && (
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-yellow-500 text-lg">
                          ⭐ {product.ratingsAverage}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({product.ratingsQuantity ?? 0} reviews)
                        </span>
                      </div>
                    )}

                    <p className="text-3xl font-extrabold text-emerald-600">
                      {product.price} EGP
                    </p>
                  </div>

                  <button className="mt-8 w-full md:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}