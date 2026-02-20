import Link from "next/link";
import { getAllCategories } from '@/api/allCategories.api';

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const categories = await getAllCategories(id);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6">

        {/* العنوان */}
        <h1 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
          Shop By Category
        </h1>

        {categories.length === 0 ? (
          <div className="text-center bg-white shadow-lg rounded-3xl p-10 max-w-xl mx-auto">
            <p className="text-gray-500 text-lg">No categories found.</p>
            <Link
              href="/Categories"
              className="inline-block mt-6 px-6 py-3 border border-emerald-600 text-emerald-600 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition"
            >
              Back to Categories
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((category: any) => (
              <Link
                key={category._id}
                href={`/Categories/${category._id}`}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-500 hover:shadow-2xl hover:-translate-y-3">

                  {/* صورة */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500"></div>
                  </div>

                  {/* الاسم */}
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition">
                      {category.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                      Explore Products →
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
