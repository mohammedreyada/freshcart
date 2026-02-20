import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6">

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-emerald-600">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 max-w-md mx-auto">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
}
