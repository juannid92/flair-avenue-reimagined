const defaultItems = [
  "Tutte le settimane nuovi arrivi",
  "Spedizione gratuita in Italia",
  "Pagamenti sicuri",
  "Resi entro 14 giorni",
  "Assistenza rapida",
];

/** Fascia di testo infinita, serif grande: separa i capitoli e porta i messaggi di fiducia. */
export function Marquee({
  items = defaultItems,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="story-title whitespace-nowrap px-8 text-[clamp(2rem,5vw,4.2rem)] italic">
            {item}
          </span>
          <span className="text-terracotta">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden border-y border-border py-6 md:py-9 ${className}`}>
      <p className="sr-only">{items.join(". ")}.</p>
      <div className="marquee-track flex">
        {row}
        {row}
      </div>
    </div>
  );
}
