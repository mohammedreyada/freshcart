"use client";

type ErrorProps = {
  reset: () => void; // reset دالة بدون باراميتر ولا قيمة راجعة
};

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white px-8 py-6 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-500 mb-5">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={reset} // ممكن مباشرة من غير arrow function
          className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}