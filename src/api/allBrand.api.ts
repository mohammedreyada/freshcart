
import { Brand } from './../types/Brand';

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error fetching brands:", await res.text());
      return [];
    }

    const data = await res.json();
    return data.brands || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}
