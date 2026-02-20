import Link from "next/link";
import {getAllBrands } from '@/api/brandDetalis.api'; // ✅ صح

export default async function BrandsPage() {
  const brands = await getAllBrands(); // ✅ دالة بدون arguments

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          Our Brands
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <Link
             key={brand._id}
href={`/Brands/${brand._id}`}
              className="group bg-white border border-emerald-100 rounded-2xl shadow-sm hover:shadow-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-3 cursor-pointer overflow-hidden relative"
            >
              <div className="p-6 flex flex-col items-center">
                <img
                  src={brand.image || "/fallback-image.png"}
                  alt={brand.name}
                  className="w-28 h-28 object-contain mb-5 transition-transform duration-300 group-hover:scale-110"
                />
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition">
                  {brand.name}
                </h2>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 rounded-2xl bg-emerald-50 opacity-0 group-hover:opacity-20 transition-all"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
