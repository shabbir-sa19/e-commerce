import BreadCrumb from '@/components/BreadCrumb';
import { type Product } from '@/types/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> }

const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  let url = `http://localhost:3000/api/products/${slug}`;
  let options = {
    method: 'GET'
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const err = await response.json()
    console.log(err.error)
    return undefined
  }
  const data: Product = await response.json()

  return data
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