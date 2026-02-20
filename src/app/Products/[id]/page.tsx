import React from 'react';
import { getProductDetails } from '@/api/poroductDetails.api';
import AddBtn from "@/app/_components/addBtn/addBtn";
import { getRelatedProducts } from '@/productCategoryAction/relatedProducts.action';
import { Product } from '@/types/products.types';
import SingleProducts from '@/app/_components/SingleProducts/SingleProducts';
// لازم نحدد Server Component
export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  // نفك الـ Promise
  const { id } = await params;

  const data = await getProductDetails(id);
  if (!data) return <h1>No product details here</h1>;

  const res = await getRelatedProducts(data.category._id);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-3xl flex gap-8">
        <div className="w-1/3 flex items-center justify-center">
          <img 
            src={data.imageCover} 
            alt={data.title} 
            className="rounded-2xl shadow-lg object-cover w-full h-[400px]" 
          />
        </div>

        <div className="w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{data.title}</h1>
            <p className="text-gray-600 mb-6">{data.description}</p>
            <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium text-sm">
              {data.category.name}
            </span>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <span className="text-3xl font-bold text-emerald-600">{data.price} EGP</span>
            <span className="flex items-center gap-2 text-yellow-500 font-semibold text-lg">
              ⭐ {data.ratingsAverage}
            </span>
          </div>

          <AddBtn id={data._id} />
        </div>
      </div>

      <section className="w-[90%] xl:w-[80%] mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
        {res.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {res.data.map((prod: Product) => (
              <SingleProducts key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No products available at the moment.
          </p>
        )}
      </section>
    </>
  );
}
