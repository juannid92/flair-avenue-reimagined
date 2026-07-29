import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Heart, Repeat, Minus, Plus, ChevronDown } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/lib/shop-store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Prodotto non disponibile | Flair Avenue" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | Flair Avenue` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | Flair Avenue` },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${product.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${product.slug}` }],
    };
  },
  component: ProductPage,
});

const accordions = [
  { id: "descrizione", title: "Descrizione" },
  { id: "spedizioni", title: "Spedizioni e resi" },
  { id: "taglie", title: "Guida alle taglie" },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, setCartOpen, toggleWishlist, toggleCompare, wishlist, compare } = useShop();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[1]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("descrizione");

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Immagine ${index + 1}`}
                className={`w-16 shrink-0 border ${
                  activeImage === index ? "border-foreground" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} miniatura ${index + 1}`}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="aspect-3/4 w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="min-w-0 flex-1 bg-sand">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              width={900}
              height={1200}
              className="aspect-3/4 w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-40 lg:self-start">
          <h1 className="heading-wide text-lg leading-relaxed md:text-xl">{product.name}</h1>
          <p className="mt-4 text-lg">{formatPrice(product.price)}</p>

          <div className="mt-8">
            <p className="label-wide mb-3">Taglia</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-12 border px-3 py-2 text-xs tracking-wide ${
                    size === s
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="label-wide mb-3">Colore</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`border px-4 py-2 text-xs tracking-wide ${
                    color === c
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button type="button" aria-label="Diminuisci quantità" className="px-4 py-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus size={14} />
              </button>
              <span className="min-w-8 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Aumenta quantità" className="px-4 py-3" onClick={() => setQty((q) => q + 1)}>
                <Plus size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(product.id, { size, color, qty });
                setCartOpen(true);
              }}
              className="label-wide flex-1 bg-primary py-4 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Aggiungi al carrello
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-xs tracking-wide text-muted-foreground">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Heart
                size={14}
                strokeWidth={1.3}
                className={wishlist.includes(product.id) ? "fill-foreground text-foreground" : ""}
              />
              Aggiungi alla wishlist
            </button>
            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Repeat size={14} strokeWidth={1.3} />
              {compare.includes(product.id) ? "Rimuovi dal confronto" : "Confronta"}
            </button>
          </div>

          <div className="mt-10 border-t border-border">
            {accordions.map((item) => (
              <div key={item.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(open === item.id ? null : item.id)}
                  className="label-wide flex w-full items-center justify-between py-5 text-left"
                  aria-expanded={open === item.id}
                >
                  {item.title}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${open === item.id ? "rotate-180" : ""}`}
                  />
                </button>
                {open === item.id && (
                  <div className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.id === "descrizione" && product.description}
                    {item.id === "spedizioni" &&
                      "Spedizione tracciata in 2-4 giorni lavorativi in tutta Italia. Reso disponibile entro 14 giorni dalla consegna."}
                    {item.id === "taglie" &&
                      "Le taglie seguono la vestibilità italiana standard: XS (38), S (40), M (42), L (44), XL (46). In caso di dubbio scegli la taglia superiore."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="heading-wide text-center text-lg">Ti potrebbe piacere anche</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop" className="label-wide border border-border px-8 py-4">
            Torna alla boutique
          </Link>
        </div>
      </section>
    </div>
  );
}
