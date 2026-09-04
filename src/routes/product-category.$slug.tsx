import { createFileRoute, notFound, Link } from "@tanstack/react-router";
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
  loader: ({ params }): { category: Category; items: Product[] } | { notFound: true } => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    const items = getProductsByCategory(category.slug as CategorySlug);
    return { category, items };
  },
  head: ({ loaderData }) => {
    if (!loaderData || "notFound" in loaderData) {
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
  const loaderData = Route.useLoaderData();
  if (!loaderData || "notFound" in loaderData) {
    return (
      <>
        <PageHeader title="Collezione non disponibile" />
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Questa collezione non è disponibile.
          </p>
        </div>
      </>
    );
  }
  const { category, items }: { category: Category; items: Product[] } = loaderData;

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle={items.length > 0 ? `${items.length} capi disponibili nella collezione.` : undefined}
      />
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <p className="text-sm text-muted-foreground">
              Presto nuovi arrivi in questa categoria.
            </p>
            <Link
              to="/shop"
              className="label-wide bg-primary px-10 py-4 text-primary-foreground"
            >
              Vedi tutta la boutique
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
