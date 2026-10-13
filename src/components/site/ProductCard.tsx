import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/lib/shop-store";
import { sized } from "@/lib/media";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart, setCartOpen } = useShop();
  const inWishlist = wishlist.includes(product.id);
  const secondary = product.images[1] ?? product.images[0];

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-sand">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={sized(product.images[0], 700)}
            alt={product.name}
            width={900}
            height={1200}
            loading="lazy"
            className="aspect-3/4 w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={sized(secondary, 700)}
            alt={`${product.name} — vista alternativa`}
            width={900}
            height={1200}
            loading="lazy"
            className="absolute inset-0 aspect-3/4 w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        <button
          type="button"
          aria-label="Aggiungi alla wishlist"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-background transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${
            inWishlist ? "md:opacity-100" : ""
          }`}
        >
          <Heart
            size={16}
            strokeWidth={1.3}
            className={inWishlist ? "fill-foreground text-foreground" : "text-foreground"}
          />
        </button>

        <button
          type="button"
          onClick={() => {
            addToCart(product.id, { size: product.sizes[1] ?? product.sizes[0], color: product.colors[0] });
            setCartOpen(true);
          }}
          className="label-wide absolute inset-x-3 bottom-3 translate-y-2 bg-primary py-3 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Scegli
        </button>
      </div>

      <div className="pt-4">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-sm leading-relaxed text-foreground"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-sm">{formatPrice(product.price)}</p>
        {product.hasVariants && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Questo prodotto ha più varianti. Le opzioni possono essere scelte nella pagina del
            prodotto
          </p>
        )}
      </div>
    </article>
  );
}
