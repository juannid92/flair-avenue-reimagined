import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { SHOP } from "@/lib/shop-config";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/carrello")({
  head: () => ({
    meta: [
      { title: "Carrello | Flair Avenue" },
      { name: "description", content: "Rivedi i capi nel tuo carrello e completa l'ordine." },
      { property: "og:title", content: "Carrello | Flair Avenue" },
      { property: "og:description", content: "Rivedi i capi nel tuo carrello." },
      { property: "og:url", content: "/carrello" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/carrello" }],
  }),
  component: CarrelloPage,
});

function CarrelloPage() {
  const { cart, cartTotal, lineProduct, removeFromCart, updateQty } = useShop();
  const missing = Math.max(0, SHOP.freeShippingThreshold - cartTotal);

  return (
    <>
      <PageHeader title="Carrello" />
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Non ci sono prodotti nel carrello.</p>
            <Link
              to="/shop"
              className="label-wide mt-8 inline-flex bg-primary px-10 py-4 text-primary-foreground"
            >
              Vai allo shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <ul className="divide-y divide-border border-y border-border">
              {cart.map((line, index) => {
                const product = lineProduct(line);
                if (!product) return null;
                return (
                  <li key={`${line.productId}-${index}`} className="flex gap-5 py-6">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="aspect-3/4 w-24 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                        <p className="min-w-0 text-sm">{product.name}</p>
                        <button
                          type="button"
                          aria-label="Rimuovi dal carrello"
                          onClick={() => removeFromCart(index)}
                          className="shrink-0 text-muted-foreground"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {[line.size, line.color].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Diminuisci quantità"
                            className="px-3 py-2"
                            onClick={() => updateQty(index, line.qty - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="min-w-7 text-center text-xs">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Aumenta quantità"
                            className="px-3 py-2"
                            onClick={() => updateQty(index, line.qty + 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm">{formatPrice(product.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit border border-border p-6">
              <h2 className="label-wide mb-6">Riepilogo</h2>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotale</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {missing > 0
                  ? `Aggiungi ${formatPrice(missing)} al carrello per ottenere la spedizione gratuita`
                  : "Spedizione gratuita in tutta Italia, senza importo minimo"}
              </p>
              <button
                type="button"
                className="label-wide mt-6 w-full bg-primary py-4 text-primary-foreground"
              >
                Procedi al pagamento
              </button>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
