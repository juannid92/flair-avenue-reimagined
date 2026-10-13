import { products } from "@/data/products";

/** Foto reali del catalogo (flairavenue.it) usate nel racconto della home e in "Chi siamo". */
const photo = (id: string, index = 0) =>
  (products.find((p) => p.id === id) ?? products[0]).images[index] ?? products[0].images[0];

/**
 * Riduce una foto Cloudinary alla larghezza richiesta (mantiene le proporzioni).
 * Qualsiasi altro URL viene restituito invariato.
 */
export function sized(url: string, width: number): string {
  if (!url.includes("res.cloudinary.com")) return url;
  return url
    .replace(/\/images\/w_\d+,h_\d+,c_scale\//, `/images/w_${width},c_scale/`)
    .replace(/\/images\/c_limit,w_\d+\//, `/images/c_limit,w_${width}/`);
}

export const media = {
  /** Corpetto a righe — apertura */
  hero: photo("3095"),
  /** Abito lungo azzurro in pizzo con spacco */
  dress: photo("2848"),
  /** Top con stampa sole */
  topSun: photo("2857"),
  /** Top halter */
  topHalter: photo("3125"),
  /** Top halter marrone, formato più grande */
  topHalterBrown: photo("3116"),
  /** Vestito lungo leopardato con corpetto in pizzo */
  lace: photo("2800"),
  /** Abito lungo in pizzo marrone */
  laceBrown: photo("2518"),
  /** Canotta e jeans con frange — banner */
  banner: photo("2502"),
};
