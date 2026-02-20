// src/api/allCategories.api.ts
export async function getAllCategories(id?: string) {
  try {
    // لو id موجود، نجيب فئة معينة، لو لا نجيب كل الكاتيجوريز
    const url = id
      ? `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      : "https://ecommerce.routemisr.com/api/v1/categories";

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const result = await res.json();

    // debug
    console.log("Categories fetched:", result);

    // تأكد من أن البيانات موجودة
    return result?.data ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}