"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
  note?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (productId: string, quantity?: number, note?: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  getLine: (productId: string) => { product: Product; item: CartItem } | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "fogo-na-seda-cart-v1";
const DELIVERY_FEE = 5;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (productId: string, quantity = 1, note?: string) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === productId
              ? {
                  ...i,
                  quantity: i.quantity + quantity,
                  note: note ?? i.note,
                }
              : i,
          );
        }
        return [...prev, { productId, quantity, note }];
      });
    },
    [],
  );

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const getLine = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.productId === productId);
      const product = getProduct(productId);
      if (!item || !product) return null;
      return { product, item };
    },
    [items],
  );

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const item of items) {
      const product = getProduct(item.productId);
      if (!product) continue;
      c += item.quantity;
      s += product.price * item.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      deliveryFee,
      total,
      addItem,
      setQuantity,
      removeItem,
      clear,
      getLine,
    }),
    [
      items,
      count,
      subtotal,
      deliveryFee,
      total,
      addItem,
      setQuantity,
      removeItem,
      clear,
      getLine,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
