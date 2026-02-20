// src/api/categories.api.ts
export async function getCategoriesDetails(id: string): Promise<any | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.warn(`Category ${id} not found. Status: ${res.status}`);
      return null;
    }

    const result = await res.json();
    return result?.data ?? null;
  } catch (error) {
    console.error("Error fetching category details:", error);
    return null;
  }
}