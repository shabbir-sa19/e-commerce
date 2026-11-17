import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <section className="relative flex w-full h-full ">
      <div className="">
        <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"
          alt="Warm, sunlit living room with natural materials"
          fill
          priority
          sizes=""
          className="object-cover object-center"
        />
      </div>
      <div className="flex w-full justify-center items-center uppercase mx-2">
        <div className="relative p-4 lg:p-8 rounded-lg bg-linear-120 from-secondary/50 via-secondary/35 to-secondary/20 space-y-4">
          <p className="text-base">Objects for slower living</p>
          <h1 className="tracking-tight font-normal font-heading text-5xl">Make room for the everyday.</h1>
          <p className="text-2xl font-semibold">Thoughtful things, made to be used, loved, and kept.</p>
          <Link className={buttonVariants({ variant: 'default', className: "inline min-h-12 gap-2 align-middle font-semibold" })} href="/products">Explore the collection <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  )
}

export default HomePage