import { Badge } from '@/components/ui/badge';
import { getProducts } from '@/lib/seeds';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-10 flex flex-col gap-3 sm:mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">The collection</p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Made for your everyday routine</h1>
        <p className="max-w-xl text-muted-foreground">
          Thoughtful objects, honest materials, and small details that make a space feel like yours.
        </p>
      </header>
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-card px-6 py-20 text-center">
          <p className="text-lg font-medium">Our collection is being prepared.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <article key={product.slug} className="group min-w-0">
              <Link href={`/${product.category}/${product.slug}`} className="block">
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.featured && (
                    <Badge className="absolute left-3 top-3">Bestseller</Badge>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h2 className="mt-1 truncate font-medium transition-colors group-hover:text-primary">{product.name}</h2>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-medium">{formatPrice(product.priceMinor, product.currency)}</p>
                    {product.mrp > product.priceMinor && (
                      <p className="text-sm text-muted-foreground line-through">{formatPrice(product.mrp, product.currency)}</p>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}