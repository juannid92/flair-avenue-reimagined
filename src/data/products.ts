import p1a from "@/assets/p1-a.jpg";
import p1b from "@/assets/p1-b.jpg";
import p2a from "@/assets/p2-a.jpg";
import p2b from "@/assets/p2-b.jpg";
import p3a from "@/assets/p3-a.jpg";
import p3b from "@/assets/p3-b.jpg";
import p4a from "@/assets/p4-a.jpg";
import p4b from "@/assets/p4-b.jpg";
import t1a from "@/assets/t1-a.jpg";
import t2a from "@/assets/t2-a.jpg";
import catAbiti from "@/assets/cat-abiti.jpg";
import catTop from "@/assets/cat-top.jpg";

export type CategorySlug = "abiti" | "top" | "giacche" | "gonne-e-shorts";

export interface Category {
  slug: CategorySlug;
  name: string;
  count: number;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: CategorySlug;
  images: string[];
  colors: string[];
  sizes: string[];
  hasVariants: boolean;
  isNew: boolean;
  createdAt: string;
  description: string;
}

/** Soglia unica per la spedizione gratuita (in €). */
export const FREE_SHIPPING_THRESHOLD = 69;

export const categories: Category[] = [
  { slug: "abiti", name: "Abiti", count: 8, image: catAbiti },
  { slug: "top", name: "Top", count: 7, image: catTop },
  { slug: "giacche", name: "Giacche", count: 4, image: catTop },
  { slug: "gonne-e-shorts", name: "Gonne e Shorts", count: 5, image: catAbiti },
];

const TAGLIE = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    id: "1",
    slug: "abito-lungo-pizzo-spacco-avanti-azzurro",
    name: "Abito lungo in pizzo con spacco avanti – Azzurro",
    price: 40,
    category: "abiti",
    images: [p1a, p1b],
    colors: ["Azzurro"],
    sizes: TAGLIE,
    hasVariants: true,
    isNew: true,
    createdAt: "2026-07-20",
    description:
      "Abito lungo in pizzo con spacco frontale, maniche lunghe trasparenti e cintura in vita. Un capo elegante pensato per le occasioni speciali.",
  },
  {
    id: "2",
    slug: "abito-corto-voulant-laterali-manica-pipistrello-giallo",
    name: "Abito corto con voulant laterali e manica a pipistrello – Giallo",
    price: 30,
    category: "abiti",
    images: [p2a, p2b],
    colors: ["Giallo"],
    sizes: TAGLIE,
    hasVariants: true,
    isNew: true,
    createdAt: "2026-07-18",
    description:
      "Abito corto in tessuto fluido con voulant laterali e manica a pipistrello. Silhouette morbida e femminile, perfetta per il giorno e la sera.",
  },
  {
    id: "3",
    slug: "vestito-corto-scollo-dietro-rosso",
    name: "Vestito corto con scollo dietro – Rosso",
    price: 15,
    category: "abiti",
    images: [p3a, p3b],
    colors: ["Rosso"],
    sizes: TAGLIE,
    hasVariants: false,
    isNew: true,
    createdAt: "2026-07-15",
    description:
      "Vestito corto dalla linea essenziale con profondo scollo sulla schiena e allacciatura regolabile.",
  },
  {
    id: "4",
    slug: "abito-lungo-pizzo-marrone",
    name: "Abito lungo in pizzo – Marrone",
    price: 25,
    category: "abiti",
    images: [p4a, p4b],
    colors: ["Marrone"],
    sizes: TAGLIE,
    hasVariants: true,
    isNew: false,
    createdAt: "2026-07-02",
    description:
      "Abito lungo in pizzo dai toni caldi, con inserti ricamati e balza finale. Un classico rivisitato in chiave contemporanea.",
  },
  {
    id: "5",
    slug: "top-in-raso-avorio",
    name: "Top in raso con schiena aperta – Avorio",
    price: 22,
    category: "top",
    images: [t1a, t2a],
    colors: ["Avorio"],
    sizes: TAGLIE,
    hasVariants: true,
    isNew: true,
    createdAt: "2026-07-22",
    description:
      "Top in raso lucido con apertura sulla schiena e polsini elasticizzati. Da abbinare a pantaloni o gonne midi.",
  },
  {
    id: "6",
    slug: "top-smanicato-raso-nero",
    name: "Top smanicato in raso – Nero",
    price: 18,
    category: "top",
    images: [t2a, t1a],
    colors: ["Nero"],
    sizes: TAGLIE,
    hasVariants: false,
    isNew: true,
    createdAt: "2026-07-21",
    description:
      "Top smanicato in raso nero dalla vestibilità morbida e scollo a barchetta. Un essenziale del guardaroba.",
  },
  {
    id: "7",
    slug: "abito-lungo-crema-scollo-v",
    name: "Abito lungo con scollo a V – Crema",
    price: 45,
    category: "abiti",
    images: [p1b, p1a],
    colors: ["Crema"],
    sizes: TAGLIE,
    hasVariants: true,
    isNew: false,
    createdAt: "2026-06-28",
    description: "Abito lungo in tessuto fluido con scollo a V e gonna ampia.",
  },
  {
    id: "8",
    slug: "abito-corto-giallo-volant",
    name: "Abito corto con volant – Giallo sole",
    price: 28,
    category: "abiti",
    images: [p2b, p2a],
    colors: ["Giallo"],
    sizes: TAGLIE,
    hasVariants: false,
    isNew: false,
    createdAt: "2026-06-20",
    description: "Abito corto con spalle scoperte e doppio volant.",
  },
];

/**
 * Interfaccia astratta del catalogo: l'implementazione locale può essere
 * sostituita con chiamate API senza modificare i componenti.
 */
export interface CatalogRepository {
  listProducts(): Promise<Product[]>;
  listByCategory(slug: CategorySlug): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
  listCategories(): Promise<Category[]>;
  listNew(): Promise<Product[]>;
}

export const localCatalog: CatalogRepository = {
  async listProducts() {
    return products;
  },
  async listByCategory(slug) {
    return products.filter((p) => p.category === slug);
  },
  async getProduct(slug) {
    return products.find((p) => p.slug === slug);
  },
  async listCategories() {
    return categories;
  },
  async listNew() {
    return products.filter((p) => p.isNew);
  },
};

export const catalog: CatalogRepository = localCatalog;

/* Accessori sincroni per il rendering SSR immediato */
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: CategorySlug) =>
  products.filter((p) => p.category === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
