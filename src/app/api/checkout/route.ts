import { auth, currentUser } from "@clerk/nextjs/server";
import * as z from "zod";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse, type NextRequest } from "next/server";

const checkoutSchema = z.object({
  shippingAddress: z.object({
    name: z.string().trim().min(1).max(100),
    line1: z.string().trim().min(1).max(200),
    city: z.string().trim().min(1).max(100),
    postalCode: z.string().trim().min(1).max(30),
    country: z.string().trim().min(2).max(100),
  }).strict(),
}).strict();

export async function POST(request: NextRequest) {
  await auth.protect()

  const { userId, sessionId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  const body = await request.json()
  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 402 })
    }

    await connectToDatabase();
    const email = user.primaryEmailAddress?.emailAddress || "";
    const cart = await Cart.findOne({ userId }).lean().exec();
    console.log(sessionId);
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 409 });
    }

    const slugs = cart.items.map((item) => item.slug);
    if (new Set(slugs).size !== slugs.length) {
      return NextResponse.json({ error: "Cart contains duplicate products. Update the cart and try again." }, { status: 409 });
    }

    const products = await Product.find({ slug: { $in: slugs }, status: "active" })
      .select("slug name sku priceMinor currency stock")
      .lean()
      .exec();
    const productsBySlug = new Map(products.map((product) => [product.slug, product]));
    const orderItems = [];

    for (const item of cart.items) {
      const product = productsBySlug.get(item.slug);
      if (!product) NextResponse.json({ error: `Product "${item.slug}" is no longer available.` }, { status: 409 });
      if (!Number.isInteger(product.stock) || product.stock < 0) {
        return NextResponse.json({ error: "A product has invalid stock and cannot be checked out." }, { status: 409 });
      }
      if (item.quantity > product.stock) {
        return NextResponse.json({ error: `Insufficient stock for "${product.name}".` }, { status: 409 });
      }
      if (!Number.isSafeInteger(product.priceMinor) || product.priceMinor < 0) {
        return NextResponse.json({ error: "A product has an invalid price and cannot be checked out." }, { status: 409 });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        sku: product.sku,
        priceMinor: product.priceMinor,
        quantity: item.quantity,
      });
    }

    const currencies = new Set(products.map((product) => product.currency));
    if (currencies.size !== 1) {
      return NextResponse.json({ error: "Products in one order must use the same currency." }, { status: 409 });
    }

    const subtotalMinor = orderItems.reduce(
      (subtotal, item) => subtotal + item.priceMinor * item.quantity,
      0,
    );
    if (!Number.isSafeInteger(subtotalMinor)) {
      return NextResponse.json({ error: "Order total is outside the supported range." }, { status: 409 });
    }

    const order = await Order.create({
      userId,
      email,
      items: orderItems,
      currency: products[0].currency,
      subtotalMinor,
      status: "payment_required",
      shippingAddress: parsed.data.shippingAddress,
    });

    return NextResponse.json(
      {
        order: {
          id: order._id.toString(),
          status: order.status,
          currency: order.currency,
          subtotalMinor: order.subtotalMinor,
          items: order.items,
          shippingAddress: order.shippingAddress,
        },
        paymentRequired: true,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}