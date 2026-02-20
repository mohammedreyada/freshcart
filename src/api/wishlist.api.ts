export async function getUserWishlist(token: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET",
      headers: {
        token: token,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch wishlist");
  }

  return data;
}
