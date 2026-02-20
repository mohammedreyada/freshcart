import { getBrandDetails } from "@/api/brandDetalis.api";
import Link from "next/link";
import { Brand } from "@/types/Brand";

interface BrandPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { id } = await params; // مهم في Next 16

  // جلب بيانات البراند باستخدام _id
  const brand: Brand | null = await getBrandDetails(id);

  // لو البراند مش موجود
  if (!brand) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-3xl text-red-500 font-bold mb-4">
          😢 Brand not found
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          The brand you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/Brands"
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
        >
          Back to Brands
        </Link>
      </div>
    );
  }

  // تحويل التواريخ بشكل آمن
  const createdAt = brand.createdAt
    ? new Date(brand.createdAt).toLocaleDateString()
    : "N/A";

  const updatedAt = brand.updatedAt
    ? new Date(brand.updatedAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">

          {/* الصورة + الاسم */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src={brand.image || "/fallback-image.png"}
              alt={brand.name}
              className="w-64 h-64 object-contain rounded-2xl border p-4 bg-gray-50"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-emerald-600 mb-4">
                {brand.name}
              </h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {brand.description || "No description available for this brand."}
              </p>

              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>

          {/* خط فاصل */}
          <div className="my-10 border-t"></div>

          {/* تفاصيل إضافية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Brand ID</p>
              <h3 className="font-semibold text-gray-700 break-all">
                {brand._id}
              </h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Created At</p>
              <h3 className="font-semibold text-gray-700">{createdAt}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Updated At</p>
              <h3 className="font-semibold text-gray-700">{updatedAt}</h3>
            </div>

          </div>

          {/* زر الرجوع */}
          <div className="flex justify-center mt-10">
            <Link
              href="/Brands"
              className="px-8 py-3 border border-emerald-600 text-emerald-600 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition"
            >
              Back to Brands
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}