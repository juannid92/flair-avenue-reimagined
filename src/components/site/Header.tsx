import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, User, Repeat, Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/flairavenue-logo-dark.png.asset.json";
import { useShop } from "@/lib/shop-store";
import { categories, getProductsByCategory } from "@/data/products";

const navItems = [
  { label: "Boutique", to: "/shop" as const },
  { label: "Novità", to: "/novita" as const },
];

function Badge({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
      {value}
    </span>
  );
}

export function Header() {
  const { cartCount, wishlist, compare, setCartOpen } = useShop();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const availableCategories = categories.filter((c) => getProductsByCategory(c.slug).length > 0);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="hidden border-b border-border bg-sand md:block">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 px-6 py-2">
          <p className="label-wide text-center text-foreground">
            Spedizione tracciata, pagamenti sicuri e resi semplici
          </p>
          <div className="flex shrink-0 items-center gap-5 text-[11px] tracking-wide text-muted-foreground">
            <Link to="/tracciamento-ordine" className="link-underline hover:text-foreground">
              Tracciamento dell'ordine
            </Link>
            <span aria-hidden>·</span>
            <Link to="/chi-siamo" className="link-underline hover:text-foreground">
              Chi siamo
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 transition-all duration-300 md:px-6 ${
          compact ? "py-3" : "py-5 md:py-7"
        }`}
      >
        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-label="Apri il menu"
            onClick={() => setMenuOpen(true)}
            className="p-1"
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>
        </div>
        <div className="hidden md:block" />

        <Link to="/" className="justify-self-center" aria-label="FLAIR AVENUE — home">
          <img
            src={logo.url}
            alt="FLAIR AVENUE"
            width={600}
            height={80}
            className={`w-auto transition-all duration-300 ${compact ? "h-4 md:h-5" : "h-5 md:h-8"}`}
          />
        </Link>

        <div className="flex items-center justify-end gap-4 md:gap-6">
          <Link
            to="/il-mio-account"
            aria-label="Account"
            className="hidden text-foreground md:block"
          >
            <User size={20} strokeWidth={1.25} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hidden md:block">
            <Heart size={20} strokeWidth={1.25} />
            <Badge value={wishlist.length} />
          </Link>
          <Link to="/confronta" aria-label="Confronta" className="relative hidden md:block">
            <Repeat size={20} strokeWidth={1.25} />
            <Badge value={compare.length} />
          </Link>
          <button
            type="button"
            aria-label="Carrello"
            onClick={() => setCartOpen(true)}
            className="relative"
          >
            <ShoppingBag size={20} strokeWidth={1.25} />
            <Badge value={cartCount} />
          </button>
        </div>
      </div>

      <nav
        className={`hidden justify-center gap-10 border-t border-border transition-all duration-300 md:flex ${
          compact ? "py-2" : "py-3"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="label-wide text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "label-wide text-foreground" }}
          >
            {item.label}
          </Link>
        ))}

        <div
          className="relative"
          onMouseEnter={() => setCollectionsOpen(true)}
          onMouseLeave={() => setCollectionsOpen(false)}
        >
          <button
            type="button"
            className="label-wide flex items-center gap-1 text-foreground/80 hover:text-foreground"
            onClick={() => setCollectionsOpen((v) => !v)}
            aria-expanded={collectionsOpen}
          >
            Collezioni
            <ChevronDown size={12} strokeWidth={1.5} />
          </button>
          {collectionsOpen && (
            <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 border border-border bg-background py-3">
              {availableCategories.map((c) => (
                <Link
                  key={c.slug}
                  to="/product-category/$slug"
                  params={{ slug: c.slug }}
                  className="block px-5 py-2 text-sm tracking-wide text-muted-foreground transition-colors hover:bg-sand hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/contatti"
          className="label-wide text-foreground/80 transition-colors hover:text-foreground"
          activeProps={{ className: "label-wide text-foreground" }}
        >
          Contatti
        </Link>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <img src={logo.url} alt="FLAIR AVENUE" width={600} height={80} className="h-4 w-auto" />
            <button type="button" aria-label="Chiudi il menu" onClick={() => setMenuOpen(false)}>
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-6 py-8">
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="heading-wide py-3 text-lg">
              Boutique
            </Link>
            <Link
              to="/novita"
              onClick={() => setMenuOpen(false)}
              className="heading-wide py-3 text-lg"
            >
              Novità
            </Link>
            <p className="heading-wide pt-3 text-lg">Collezioni</p>
            {availableCategories.map((c) => (
              <Link
                key={c.slug}
                to="/product-category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setMenuOpen(false)}
                className="py-2 pl-4 text-sm tracking-wide text-muted-foreground"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/contatti"
              onClick={() => setMenuOpen(false)}
              className="heading-wide py-3 text-lg"
            >
              Contatti
            </Link>
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-sm tracking-wide text-muted-foreground">
              <Link to="/il-mio-account" onClick={() => setMenuOpen(false)}>
                Il mio account
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/confronta" onClick={() => setMenuOpen(false)}>
                Confronta ({compare.length})
              </Link>
              <Link to="/tracciamento-ordine" onClick={() => setMenuOpen(false)}>
                Tracciamento dell'ordine
              </Link>
              <Link to="/chi-siamo" onClick={() => setMenuOpen(false)}>
                Chi siamo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
