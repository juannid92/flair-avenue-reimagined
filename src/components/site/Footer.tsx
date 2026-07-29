import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import logo from "@/assets/flairavenue-logo-dark.png.asset.json";

const perks = [
  {
    icon: Truck,
    title: "Spedizione tracciata",
    text: "Costi e tempi sempre visibili prima del checkout.",
    to: "/tracciamento-ordine" as const,
  },
  {
    icon: ShieldCheck,
    title: "Pagamenti sicuri",
    text: "Transazioni protette con carta e Klarna.",
    to: "/termini-e-condizioni" as const,
  },
  {
    icon: RotateCcw,
    title: "Resi semplici",
    text: "Informazioni sul reso consultabili prima dell'acquisto.",
    to: "/politica-di-reso" as const,
  },
  {
    icon: Headset,
    title: "Contatti rapidi",
    text: "Supporto per ordini, taglie e resi.",
    to: "/contatti" as const,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="border-b border-border bg-sand">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-px px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
          {perks.map((perk) => (
            <Link
              key={perk.title}
              to={perk.to}
              className="flex items-start gap-3 border-b border-border/60 py-6 pr-4 transition-opacity last:border-b-0 hover:opacity-70 lg:border-b-0"
            >
              <perk.icon size={20} strokeWidth={1.1} className="mt-0.5 shrink-0" />
              <p className="min-w-0 text-sm leading-relaxed">
                <span className="font-semibold">{perk.title}</span>{" "}
                <span className="text-muted-foreground">— {perk.text}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <img src={logo.url} alt="FLAIR AVENUE" width={600} height={80} className="h-5 w-auto" loading="lazy" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Boutique fashion femminile online. Nuovi arrivi ogni settimana, selezione curata e
            spedizione in tutta Italia.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.instagram.com/flair___avenue/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-foreground transition-opacity hover:opacity-60"
            >
              <Instagram size={18} strokeWidth={1.25} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-foreground transition-opacity hover:opacity-60"
            >
              <Facebook size={18} strokeWidth={1.25} />
            </a>
            <a
              href="mailto:info@flairavenue.it"
              aria-label="Scrivici una email"
              className="text-foreground transition-opacity hover:opacity-60"
            >
              <Mail size={18} strokeWidth={1.25} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="label-wide mb-5">Negozio</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/shop" className="hover:text-foreground">
                Boutique
              </Link>
            </li>
            <li>
              <Link to="/novita" className="hover:text-foreground">
                Novità
              </Link>
            </li>
            <li>
              <Link to="/product-category/$slug" params={{ slug: "abiti" }} className="hover:text-foreground">
                Collezioni
              </Link>
            </li>
            <li>
              <Link to="/contatti" className="hover:text-foreground">
                Contatti
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label-wide mb-5">Assistenza</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/chi-siamo" className="hover:text-foreground">
                Chi siamo
              </Link>
            </li>
            <li>
              <Link to="/tracciamento-ordine" className="hover:text-foreground">
                Tracciamento ordine
              </Link>
            </li>
            <li>
              <Link to="/politica-di-reso" className="hover:text-foreground">
                Politica di reso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label-wide mb-5">Legale</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/termini-e-condizioni" className="hover:text-foreground">
                Termini e condizioni
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/il-mio-account" className="hover:text-foreground">
                Il mio account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-6 text-xs tracking-wide text-muted-foreground md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} Flair Avenue. Tutti i diritti riservati.</p>
          <p>P.IVA 00000000000 — flairavenue.it</p>
        </div>
      </div>
    </footer>
  );
}
