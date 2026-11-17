import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/models/Cart";
import ProductModel from "@/models/Product";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Product } from "@/types/types";
import { Types } from "mongoose";

const addItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.number().int().min(1).max(99).default(1),
}).strict();

function cartResponse(items: Array<{
  slug: string;
  name: string;
  image: string;
  priceMinor: number;
  currency: string;
  quantity: number;
}>) {
  const subtotalMinor = items.reduce((subtotal, item) => subtotal + item.priceMinor * item.quantity, 0,);
  if (!Number.isSafeInteger(subtotalMinor)) return null;
  return { items, subtotalMinor };
}

function respondWithCart(
  items: Parameters<typeof cartResponse>[0],
  status = 200,
) {
  const cart = cartResponse(items);
  if (!cart) return NextResponse.json({ error: "Cart total is outside the supported range." }, { status: 409 });
  return NextResponse.json({ cart }, { status });
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const cart = await Cart.findOne({ userId }).lean().exec();
    // return respondWithCart(cart?.items ?? []);
    if (!cart) {
      return NextResponse.json({ error: "Cart total is outside the supported range." }, { status: 409 });
    }
    const items = cart.items
    const subtotalMinor = items.reduce((subtotal, item) => subtotal + item.priceMinor * item.quantity, 0,);
    return NextResponse.json({ items, subtotalMinor }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = addItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    await connectToDatabase();

    const product: Product = await ProductModel.findOne({ productId: parsed.data.productId, status: "active" })
      .select("slug name image priceMinor currency stock")
      .lean()
      .exec();

    if (!product) { return NextResponse.json({ error: "Product not found." }, { status: 404 }) }
    if (!Number.isSafeInteger(product.priceMinor) || product.priceMinor < 0 || !Number.isInteger(product.stock) || product.stock < 0) {
      return NextResponse.json({ error: "Product pricing or stock is invalid." }, { status: 409 });
    }
    if (parsed.data.quantity > product.stock) {
      return NextResponse.json({ error: "Requested quantity exceeds available stock." }, { status: 409 });
    }

    let cart = await Cart.findOne({ userId }).exec();
    if (!cart) cart = new Cart({ userId, items: [] });
    if (cart.items.some((item) => item.currency !== product.currency)) {
      return NextResponse.json({ error: "Products in one cart must use the same currency." }, { status: 409 });
    }

    const existingItem = cart.items.find((item) => item.slug === product.slug);

    if (existingItem) {
      const quantity = existingItem.quantity + parsed.data.quantity;
      if (quantity > product.stock || quantity > 99) {
        return NextResponse.json({ error: "Requested quantity exceeds available stock or cart limit." }, { status: 409 });
      }
      existingItem.quantity = quantity;
      existingItem.name = product.name;
      existingItem.image = product.image;
      existingItem.priceMinor = product.priceMinor;
      existingItem.currency = product.currency;
    } else {
      if (cart.items.length >= 50) {
        return NextResponse.json({ error: "Cart item limit reached." }, { status: 409 });
      }
      cart.items.push({
        slug: product.slug,
        name: product.name,
        image: product.image,
        priceMinor: product.priceMinor,
        currency: product.currency,
        quantity: parsed.data.quantity,
        productId: new Types.ObjectId
      });
    }

    await cart.save();
    const res = cartResponse(cart.items);
    if (!res) {
      return NextResponse.json({ error: "Cart item error." }, { status: 409 });
    }
    return NextResponse.json({ items: res.items, subTotal: Number(res.subtotalMinor) }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = addItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    await connectToDatabase();
    const [cart, product] = await Promise.all([
      Cart.findOne({ userId }).exec(),
      ProductModel.findOne({ _id: parsed.data.productId, status: "active" })
        .select("slug name image priceMinor currency stock")
        .lean()
        .exec(),
    ]);

    if (!cart) return NextResponse.json({ error: "Cart not found." }, { status: 404 });
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    if (
      !Number.isSafeInteger(product.priceMinor) ||
      product.priceMinor < 0 ||
      !Number.isInteger(product.stock) ||
      product.stock < 0
    ) {
      return NextResponse.json({ error: "Product pricing or stock is invalid." }, { status: 409 });
    }
    // review fontend quantity value and to be fixed.
    if (parsed.data.quantity > product.stock) {
      return NextResponse.json({ error: "Requested quantity exceeds available stock." }, { status: 409 });
    }
    if (cart.items.some((cartItem) => cartItem.currency !== product.currency)) {
      return NextResponse.json({ error: "Products in one cart must use the same currency." }, { status: 409 });
    }

    const item = cart.items.find((cartItem) => cartItem.slug === product.slug);
    if (!item) {
      return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
    }

    item.quantity = parsed.data.quantity;
    item.name = product.name;
    item.image = product.image;
    item.priceMinor = product.priceMinor;
    item.currency = product.currency;
    await cart.save();

    return respondWithCart(cart.items);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  try {
    const body = await request.json();

    await connectToDatabase();
    const slug = request.nextUrl.searchParams.get("slug")?.trim().toLowerCase();

    if (slug) {
      if (slug.length > 120) return NextResponse.json({ error: "Invalid product slug." }, { status: 400 });
      const cart = await Cart.findOne({ userId }).exec();
      if (!cart) return respondWithCart([]);

      cart.items = cart.items.filter((item) => item.slug !== slug);
      await cart.save();
      return respondWithCart(cart.items);
    }

    await Cart.deleteOne({ userId }).exec();
    return respondWithCart([]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
