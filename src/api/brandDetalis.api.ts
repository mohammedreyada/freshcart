import { Brand } from "@/types/Brand";

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Failed to fetch brands. Status: ${res.status}`);
      return [];
    }

    const result = await res.json();
    return result?.data ?? [];
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return [];
  }
}

export async function getBrandDetails(id: string): Promise<Brand | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.warn(`Brand ${id} not found. Status: ${res.status}`);
      return null;
    }

    const result = await res.json();
    return result?.data ?? null;
  } catch (error) {
    console.error("Error fetching brand details:", error);
    return null;
  }
}