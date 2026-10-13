import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/novita")({
  head: () => ({
    meta: [
      { title: "Novità — Nuovi arrivi settimanali | Flair Avenue" },
      {
        name: "description",
        content: "I nuovi arrivi Flair Avenue: i capi aggiunti ogni settimana allo shop online.",
      },
      { property: "og:title", content: "Novità — Nuovi arrivi settimanali | Flair Avenue" },
      { property: "og:description", content: "Nuovi capi femminili ogni settimana." },
      { property: "og:url", content: "/novita" },
    ],
    links: [{ rel: "canonical", href: "/novita" }],
  }),
  component: NovitaPage,
});

function NovitaPage() {
  const items = products.filter((p) => p.isNew);

  return (
    <>
      <PageHeader title="Novità" subtitle="Tutte le settimane nuovi arrivi." />
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
