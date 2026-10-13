import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/confronta")({
  head: () => ({
    meta: [
      { title: "Confronta prodotti | Flair Avenue" },
      { name: "description", content: "Confronta prezzo, taglie e colori dei capi selezionati." },
      { property: "og:title", content: "Confronta prodotti | Flair Avenue" },
      { property: "og:description", content: "Confronta i capi selezionati." },
      { property: "og:url", content: "/confronta" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/confronta" }],
  }),
  component: ConfrontaPage,
});

function ConfrontaPage() {
  const { compare, toggleCompare, addToCart, setCartOpen } = useShop();
  const items = products.filter((p) => compare.includes(p.id));

  return (
    <>
      <PageHeader title="Confronta" />
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Non ci sono prodotti da confrontare.</p>
            <Link to="/shop" className="label-wide mt-8 inline-flex bg-primary px-10 py-4 text-primary-foreground">
              Vai allo shop
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid min-w-[640px] auto-cols-[minmax(220px,1fr)] grid-flow-col gap-6">
              {items.map((product) => (
                <div key={product.id} className="border border-border p-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="aspect-3/4 w-full object-cover"
                  />
                  <h2 className="mt-4 text-sm leading-relaxed">{product.name}</h2>
                  <p className="mt-2 text-sm">{formatPrice(product.price)}</p>
                  <dl className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between gap-3">
                      <dt>Taglie</dt>
                      <dd className="text-right">{product.sizes.join(", ")}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Colori</dt>
                      <dd className="text-right">{product.colors.join(", ")}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product.id, { size: product.sizes[1] ?? product.sizes[0], color: product.colors[0] });
                      setCartOpen(true);
                    }}
                    className="label-wide mt-5 w-full bg-primary py-3 text-primary-foreground"
                  >
                    Aggiungi al carrello
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    className="mt-3 w-full text-xs text-muted-foreground underline underline-offset-4"
                  >
                    Rimuovi dal confronto
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
