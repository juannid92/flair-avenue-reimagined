import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  getCategory,
  getProductsByCategory,
  type Category,
  type CategorySlug,
  type Product,
} from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/product-category/$slug")({
  loader: ({ params }): { category: Category; items: Product[] } => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, items: getProductsByCategory(category.slug as CategorySlug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Collezione non disponibile | Flair Avenue" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    const description = `Scopri la collezione ${category.name} di Flair Avenue: capi femminili selezionati, nuovi arrivi ogni settimana.`;
    return {
      meta: [
        { title: `${category.name} | Flair Avenue` },
        { name: "description", content: description },
        { property: "og:title", content: `${category.name} | Flair Avenue` },
        { property: "og:description", content: description },
        { property: "og:url", content: `/product-category/${category.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product-category/${category.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle={`${items.length} capi disponibili nella collezione.`}
      />
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {items.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
              Nessun prodotto disponibile in questa collezione.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
