// app/categories/[id]/page.tsx
import Link from "next/link";
import {
  getCategoryDetails,
  getCategoryProducts,
  Category,
  Product,
} from "@/api/categories.api";

interface PageProps {
  params: Promise<{ id: string }>; // Next.js 15+ params is a Promise
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params; // ✅ unwrap the promise

  const category: Category | null = await getCategoryDetails(id);
  const products: Product[] = await getCategoryProducts(id);

  if (!category) {
    return (
      <p className="text-center mt-20 text-red-500">
        Category not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-40 pb-24">
      <div className="container mx-auto px-6">

        {/* Category Header */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-white shadow-xl rounded-3xl p-8">
          <img
            src={category.image}
            alt={category.name}
            className="w-64 h-64 object-cover rounded-3xl"
          />

          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-emerald-600 mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-600 text-lg">{category.description}</p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <h2 className="text-3xl font-bold mb-10 text-center">
          Products in {category.name}
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <Link href={`/products/${product._id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-60 object-cover rounded-xl mb-4"
                  />
                </Link>

                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-emerald-600 font-bold text-lg">
                  {product.price} EGP
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}