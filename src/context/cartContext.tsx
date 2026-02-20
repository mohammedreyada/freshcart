"use client";

import { getUserCart } from "@/CartActions/getUserCart.action";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

/* =======================
   Types
======================= */

interface CartProduct {
  count: number;
}

interface CartResponse {
  status: string;
  data: {
    products: CartProduct[];
  };
}

interface CartContextType {
  numberOfItems: number;
  setNumberOfItems: Dispatch<SetStateAction<number>>;
}

interface CartProviderProps {
  children: ReactNode;
}

/* =======================
   Context
======================= */

// ❌ شيلنا undefined
export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

/* =======================
   Provider
======================= */

export function CartContextProvider({ children }: CartProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(0);

  async function getLoggedUserCart(): Promise<void> {
    try {
      const res: CartResponse = await getUserCart();

      if (res.status === "success") {
        const sum = res.data.products.reduce(
          (total, product) => total + product.count,
          0
        );

        setNumberOfItems(sum);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  );
}

/* =======================
   Safe Hook
======================= */

export function useCart() {
  return useContext(CartContext);
}