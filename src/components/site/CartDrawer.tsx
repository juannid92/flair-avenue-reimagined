import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { SHOP } from "@/lib/shop-config";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, cartTotal, lineProduct, removeFromCart, updateQty } =
    useShop();

  const missing = Math.max(0, SHOP.freeShippingThreshold - cartTotal);
  const progress = Math.min(100, (cartTotal / SHOP.freeShippingThreshold) * 100);

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[60] bg-foreground/40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-[420px] flex-col bg-background transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrello"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="label-wide">Carrello</h2>
          <button type="button" aria-label="Chiudi il carrello" onClick={() => setCartOpen(false)}>
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        <div className="border-b border-border px-5 py-4">
          <p className="text-xs tracking-wide text-muted-foreground">
            {missing > 0
              ? `Aggiungi ${formatPrice(missing)} al carrello per ottenere la spedizione gratuita`
              : "Hai ottenuto la spedizione gratuita"}
          </p>
          <div className="mt-3 h-[3px] w-full bg-sand">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {cart.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Non ci sono prodotti nel carrello.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((line, index) => {
                const product = lineProduct(line);
                if (!product) return null;
                return (
                  <li key={`${line.productId}-${index}`} className="flex gap-4 py-5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="h-28 w-21 shrink-0 object-cover"
                      style={{ width: 84, height: 112 }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{product.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {[line.size, line.color].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Diminuisci quantità"
                            className="px-2 py-1"
                            onClick={() => updateQty(index, line.qty - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="min-w-6 text-center text-xs">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Aumenta quantità"
                            className="px-2 py-1"
                            onClick={() => updateQty(index, line.qty + 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm">{formatPrice(product.price * line.qty)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(index)}
                        className="mt-2 text-xs text-muted-foreground underline underline-offset-4"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="label-wide">Totale</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <Link
            to="/carrello"
            onClick={() => setCartOpen(false)}
            className="label-wide block w-full bg-primary py-4 text-center text-primary-foreground transition-opacity hover:opacity-90"
          >
            Vai al carrello
          </Link>
        </div>
      </aside>
    </>
  );
}
