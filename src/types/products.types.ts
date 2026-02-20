// types/product.ts

export interface ProductsResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Product[];
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface Product {
  _id: string;
  id: string; // أحيانًا API بيرجع الاتنين
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  sold: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;

  category: Category;
  brand: Brand;
  subcategory: SubCategory[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}