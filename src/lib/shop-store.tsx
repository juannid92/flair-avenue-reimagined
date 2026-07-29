import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export interface CartLine {
  productId: string;
  size?: string;
  color?: string;
  qty: number;
}

interface ShopState {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (productId: string, opts?: { size?: string; color?: string; qty?: number }) => void;
  removeFromCart: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
  lineProduct: (line: CartLine) => Product | undefined;
}

const ShopContext = createContext<ShopState | null>(null);

const STORAGE_KEY = "flair-avenue-shop";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<{
        cart: CartLine[];
        wishlist: string[];
        compare: string[];
      }>;
      if (parsed.cart) setCart(parsed.cart);
      if (parsed.wishlist) setWishlist(parsed.wishlist);
      if (parsed.compare) setCompare(parsed.compare);
    } catch {
      /* storage non disponibile */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, compare }));
    } catch {
      /* storage non disponibile */
    }
  }, [cart, wishlist, compare]);

  const value = useMemo<ShopState>(() => {
    const lineProduct = (line: CartLine) => products.find((p) => p.id === line.productId);

    return {
      cart,
      wishlist,
      compare,
      cartOpen,
      setCartOpen,
      lineProduct,
      addToCart: (productId, opts) =>
        setCart((prev) => {
          const qty = opts?.qty ?? 1;
          const idx = prev.findIndex(
            (l) => l.productId === productId && l.size === opts?.size && l.color === opts?.color,
          );
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...prev, { productId, size: opts?.size, color: opts?.color, qty }];
        }),
      removeFromCart: (index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      updateQty: (index, qty) =>
        setCart((prev) =>
          prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      toggleWishlist: (productId) =>
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        ),
      toggleCompare: (productId) =>
        setCompare((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        ),
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
      cartTotal: cart.reduce((sum, l) => {
        const p = products.find((item) => item.id === l.productId);
        return sum + (p ? p.price * l.qty : 0);
      }, 0),
    };
  }, [cart, wishlist, compare, cartOpen]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopState {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve essere usato all'interno di ShopProvider");
  return ctx;
}
