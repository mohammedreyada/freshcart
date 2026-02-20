// src/api/categories.api.ts

export interface Product {
  _id: string;
  title: string;
  description?: string;
  imageCover: string;
  price: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image: string;
}

export async function getCategoryDetails(id: string): Promise<Category | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      { cache: "no-store" }
    );

    console.log("Status:", res.status);

    if (!res.ok) {
      console.warn(`Category ${id} not found. Status: ${res.status}`);
      return null;
    }

    const result = await res.json();
    console.log("Response:", result);

    return result?.data ?? null;
  } catch (error) {
    console.error("Error fetching category details:", error);
    return null;
  }
}

export async function getCategoryProducts(id: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const result = await res.json();
    return result?.data ?? [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}