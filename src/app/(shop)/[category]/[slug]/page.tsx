import BreadCrumb from '@/components/BreadCrumb';
import { Badge } from '@/components/ui/badge';
import { AddToCart } from '@/components/AddToCart';
import { getProductBySlug } from '@/lib/seeds';
import { formatPrice } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

type Props = { params: Promise<{ slug: string }> }


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default function Page({ params }: Props) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <BreadCrumb />
      <Suspense fallback={<ProductDetailsFallback />}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  )
}

async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {product.featured && (
          <Badge className="absolute left-4 top-4">Bestseller</Badge>
        )}
      </div>
      <section className="flex flex-col justify-center py-2">
        <Link href="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          {product.category}
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
        <div className="mt-5 flex items-baseline gap-3">
          <p className="text-2xl font-semibold">{formatPrice(product.priceMinor, product.currency)}</p>
          {product.mrp > product.priceMinor && (
            <p className="text-base text-muted-foreground line-through">{formatPrice(product.mrp, product.currency)}</p>
          )}
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">{product.description}</p>
        <p className={`mt-6 text-sm ${product.stock > 0 ? "text-emerald-700 dark:text-emerald-400" : "text-destructive"}`}>
          {product.stock > 0 ? `${product.stock} in stock` : "Currently out of stock"}
        </p>
        <div className="mt-5 max-w-sm">
          <AddToCart product={product} />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Secure checkout and shipping details are confirmed before payment.</p>
      </section>
    </div>
  )
}

function ProductDetailsFallback() {
  return (
    <div className="mt-8 grid animate-pulse gap-10 lg:grid-cols-2 lg:gap-16" aria-busy="true">
      <div className="aspect-square rounded-3xl bg-muted" />
      <div className="flex flex-col justify-center gap-5 py-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-10 w-3/4 rounded bg-muted" />
        <div className="h-7 w-32 rounded bg-muted" />
        <div className="h-20 w-full rounded bg-muted" />
        <div className="h-11 w-full max-w-sm rounded bg-muted" />
      </div>
    </div>
  )
}