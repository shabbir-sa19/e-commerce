import BreadCrumb from '@/components/BreadCrumb';
import { type Product } from '@/types/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> }

const getProductBySlug = async (slug: string): Promise<Product> => {
  const s: Product = {
    name: "",
    slug: slug,
    category: "" as unknown as Product['category'],
    description: "",
    image: "",
    priceMinor: 0,
    mrp: 0,
    currency: "",
    sku: "",
    stock: 0,
    featured: false,
  }
  return s
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  return (
    <div className="">
      <BreadCrumb />
      <div className="">
        <div className="">
          <Image src={product.image} alt="" width={300} height={300} />
        </div>
        <div className="">
          <p className="">{product.name}</p>
          <p className="">{product.description}</p>
          <p className="">{product.priceMinor}</p>
          <p className="">{product.stock}</p>
          <p className="">{product.featured}</p>
        </div>
      </div>
    </div>
  )
}