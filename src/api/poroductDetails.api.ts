export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "no-store", // منع التخزين المؤقت
      }
    );

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    // تحقق آمن من وجود data
    const data = result?.data || null;

    if (!data) {
     
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}
