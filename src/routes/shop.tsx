import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { products, categories, type Product } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageShell";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Boutique — Tutti i capi | Flair Avenue" },
      {
        name: "description",
        content:
          "Sfoglia tutta la boutique Flair Avenue: abiti, top, giacche e gonne. Filtra per categoria, taglia, colore e prezzo.",
      },
      { property: "og:title", content: "Boutique — Tutti i capi | Flair Avenue" },
      { property: "og:description", content: "Abiti, top, giacche e gonne selezionati." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const taglie = ["XS", "S", "M", "L", "XL"];
const colori = ["Azzurro", "Giallo", "Rosso", "Marrone", "Avorio", "Nero", "Crema"];
type Sort = "novita" | "prezzo-asc" | "prezzo-desc";

function ShopPage() {
  const [cats, setCats] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(50);
  const [sort, setSort] = useState<Sort>("novita");
  const [drawer, setDrawer] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const result = products.filter(
      (p: Product) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c))) &&
        p.price <= maxPrice,
    );
    return [...result].sort((a, b) => {
      if (sort === "prezzo-asc") return a.price - b.price;
      if (sort === "prezzo-desc") return b.price - a.price;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [cats, sizes, colors, maxPrice, sort]);

  const filters = (
    <div className="space-y-10">
      <fieldset>
        <legend className="label-wide mb-4">Categoria</legend>
        <div className="space-y-3">
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={cats.includes(c.slug)}
                onChange={() => toggle(cats, setCats, c.slug)}
                className="h-4 w-4 accent-foreground"
              />
              <span className="text-muted-foreground">{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-wide mb-4">Taglia</legend>
        <div className="flex flex-wrap gap-2">
          {taglie.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(sizes, setSizes, s)}
              className={`min-w-11 border px-3 py-2 text-xs tracking-wide ${
                sizes.includes(s)
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-wide mb-4">Colore</legend>
        <div className="space-y-3">
          {colori.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={colors.includes(c)}
                onChange={() => toggle(colors, setColors, c)}
                className="h-4 w-4 accent-foreground"
              />
              <span className="text-muted-foreground">{c}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-wide mb-4">Prezzo massimo</legend>
        <input
          type="range"
          min={10}
          max={50}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-foreground"
          aria-label="Prezzo massimo"
        />
        <p className="mt-2 text-xs text-muted-foreground">Fino a {formatPrice(maxPrice)}</p>
      </fieldset>
    </div>
  );

  return (
    <>
      <PageHeader title="Boutique" subtitle="Tutti i capi disponibili, selezionati ogni settimana." />

      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6">
        <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <p className="min-w-0 truncate text-xs tracking-wide text-muted-foreground">
            {filtered.length} prodotti
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="label-wide flex items-center gap-2 border border-border px-4 py-3 lg:hidden"
            >
              <SlidersHorizontal size={14} strokeWidth={1.4} />
              Filtri
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Ordinamento"
              className="label-wide border border-border bg-background px-4 py-3"
            >
              <option value="novita">Novità</option>
              <option value="prezzo-asc">Prezzo crescente</option>
              <option value="prezzo-desc">Prezzo decrescente</option>
            </select>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">{filters}</aside>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
                Nessun prodotto corrisponde ai filtri selezionati.
              </p>
            )}
          </div>
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[62] lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="label-wide">Filtri</h2>
              <button type="button" aria-label="Chiudi i filtri" onClick={() => setDrawer(false)}>
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>
            <div className="px-5 py-6">{filters}</div>
            <div className="px-5 pb-8">
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="label-wide w-full bg-primary py-4 text-primary-foreground"
              >
                Mostra {filtered.length} prodotti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
