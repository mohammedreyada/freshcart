export async function getAllProducts() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { cache: "no-store" }
  );

  const result = await res.json();
  return result.data; // 👈 Array of products
}
