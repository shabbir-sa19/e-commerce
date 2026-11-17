import { Product } from "@/types/types"

const products: Product[] = [
  {
    name: "Everyday ceramic mug",
    slug: "everyday-ceramic-mug",
    category: "Ceramics",
    description: "A quietly beautiful stoneware mug with a comfortable handle and a softly glazed finish. Made for slow mornings and long conversations.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 3200,
    currency: "INR",
    sku: "CER-MUG-001",
    stock: 24,
    featured: true,
    mrp: 3500,
  },
  {
    name: "Linen table runner",
    slug: "linen-table-runner",
    category: "Textiles",
    description: "Washed European linen with an easy drape and a lived-in softness. A thoughtful foundation for everyday meals and special gatherings.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 6800,
    currency: "INR",
    sku: "TEX-RUN-002",
    stock: 12,
    featured: true,
    mrp: 8000
  },
  {
    name: "Hand-carved serving spoon",
    slug: "hand-carved-serving-spoon",
    category: "Kitchen",
    description: "Carved from responsibly sourced hardwood, each spoon carries subtle marks of the maker. Finished with food-safe oil.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 2800,
    currency: "INR",
    sku: "KIT-SPN-003",
    stock: 18,
    featured: false,
    mrp: 8000
  },
  {
    name: "Soft form glass vase",
    slug: "soft-form-glass-vase",
    category: "Objects",
    description: "A sculptural, hand-finished glass vase that looks just as lovely holding a single stem as it does standing on its own.",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 5400,
    currency: "INR",
    sku: "OBJ-VAS-004",
    stock: 9,
    featured: false,
    mrp: 8000
  },
  {
    name: "Terracotta planter set",
    slug: "terracotta-planter-set",
    category: "Home",
    description: "A pair of softly glazed terracotta planters with a warm earthy finish and a wide base that suits herbs, foliage, or sculptural branches.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 6200,
    currency: "INR",
    sku: "HOM-PLA-005",
    stock: 15,
    featured: true,
    mrp: 7900
  },
  {
    name: "Ribbed linen cushion",
    slug: "ribbed-linen-cushion",
    category: "Textiles",
    description: "A softly structured cushion in washed linen that adds texture to a reading chair, sofa corner, or bedroom bench.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 4800,
    currency: "INR",
    sku: "TEX-CUH-006",
    stock: 21,
    featured: false,
    mrp: 6200
  },
  {
    name: "Walnut spice box",
    slug: "walnut-spice-box",
    category: "Kitchen",
    description: "A compact walnut spice box with a smooth interior and layered compartments for everyday staples and slow-cooking ingredients.",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 7600,
    currency: "INR",
    sku: "KIT-SPI-007",
    stock: 11,
    featured: true,
    mrp: 9200
  },
  {
    name: "Folded brass lamp",
    slug: "folded-brass-lamp",
    category: "Lighting",
    description: "A warm brass table lamp with a folded silhouette and a softly diffused glow designed to lend atmosphere to side tables and entryways.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 8900,
    currency: "INR",
    sku: "LIT-LAM-008",
    stock: 7,
    featured: true,
    mrp: 10500
  },
  {
    name: "Woven market basket",
    slug: "woven-market-basket",
    category: "Textiles",
    description: "A sturdy, hand-woven basket with a gently rounded shape for fresh produce, throw blankets, or a tidy entryway catch-all.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 4300,
    currency: "INR",
    sku: "TEX-BAS-009",
    stock: 17,
    featured: false,
    mrp: 5600
  },
  {
    name: "Stoneware serving bowl",
    slug: "stoneware-serving-bowl",
    category: "Ceramics",
    description: "A generous stoneware bowl with a matte glaze and organic rim, ideal for fruit, salads, or a shared table centerpiece.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 5100,
    currency: "INR",
    sku: "CER-BWL-010",
    stock: 13,
    featured: false,
    mrp: 6700
  },
  {
    name: "Leather journal",
    slug: "leather-journal",
    category: "Objects",
    description: "A supple leather-bound journal with lined pages and a rounded spine for notes, lists, and everyday reflections.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 3600,
    currency: "INR",
    sku: "OBJ-JRN-011",
    stock: 26,
    featured: false,
    mrp: 4700
  },
  {
    name: "Natural cotton throw",
    slug: "natural-cotton-throw",
    category: "Textiles",
    description: "A lightweight cotton throw in a warm neutral tone, generous enough for a bed, sofa, or reading nook.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 7200,
    currency: "INR",
    sku: "TEX-THR-012",
    stock: 9,
    featured: true,
    mrp: 9000
  },
  {
    name: "Ceramic fruit bowl",
    slug: "ceramic-fruit-bowl",
    category: "Ceramics",
    description: "A modern fruit bowl with a softly curved silhouette and subtle speckled glaze that brings an artisanal note to the counter.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 3900,
    currency: "INR",
    sku: "CER-FRB-013",
    stock: 18,
    featured: false,
    mrp: 5200
  },
  {
    name: "Brass candle holder",
    slug: "brass-candle-holder",
    category: "Objects",
    description: "A compact brass candle holder with a quiet patina and sculptural profile that works equally well on a shelf or dining table.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85",
    priceMinor: 4700,
    currency: "INR",
    sku: "OBJ-CAN-014",
    stock: 16,
    featured: false,
    mrp: 6600
  }
];


export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  let payload: Product | null = null;
  products.map((item) => {
    if (item.slug === slug) {
      payload = item;
      return payload;
    }
  })
  return payload
}

export const getProducts = async (): Promise<Product[]> => {
  return products
}