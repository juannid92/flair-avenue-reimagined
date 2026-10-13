import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Flair Avenue" },
      { name: "description", content: "I capi che hai salvato nella tua wishlist Flair Avenue." },
      { property: "og:title", content: "Wishlist | Flair Avenue" },
      { property: "og:description", content: "I capi salvati nella tua wishlist." },
      { property: "og:url", content: "/wishlist" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <PageHeader title="Wishlist" />
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Non ci sono prodotti nella wishlist.</p>
            <Link to="/shop" className="label-wide mt-8 inline-flex bg-primary px-10 py-4 text-primary-foreground">
              Vai allo shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
