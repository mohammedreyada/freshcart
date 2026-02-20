"use server";

export async function getRelatedProducts(categId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categId}`
  );

  const payload = await res.json();

  return payload;
}