export interface Order {
  id: string;
  userId?: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
}
