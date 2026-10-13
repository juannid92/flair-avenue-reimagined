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
  /** Giacca in pelle marrone — apertura */
  hero: photo("2987"),
  /** Vestito lungo marrone in pizzo */
  dress: photo("3362"),
  /** Body a camicia bianco */
  topSun: photo("3346"),
  /** Top halter */
  topHalter: photo("3125"),
  /** Top halter marrone, formato più grande */
  topHalterBrown: photo("3116"),
  /** Dettaglio del minidress nero con pizzo */
  lace: photo("3535", 1),
  /** Corpetto e longuette in pizzo marrone */
  laceBrown: photo("3360"),
  /** Giacca in pelle, vista da dietro — banner */
  banner: photo("2987", 2),
};
