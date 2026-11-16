import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { NextResponse, type NextRequest } from "next/server";

const addItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.number().int().min(1).max(99).default(1),
}).strict();

const updateItemSchema = z.object({
  slug: z.string().trim().min(1).max(120).transform((slug) => slug.toLowerCase()),
  quantity: z.number().int().min(1).max(99),
}).strict();

function cartResponse(items: Array<{
  slug: string;
  name: string;
  image: string;
  priceMinor: number;
  currency: string;
  quantity: number;
}>) {
  const subtotalMinor = items.reduce(
    (subtotal, item) => subtotal + item.priceMinor * item.quantity,
    0,
  );
  if (!Number.isSafeInteger(subtotalMinor)) return null;
  return { items, subtotalMinor };
}

function respondWithCart(
  items: Parameters<typeof cartResponse>[0],
  status = 200,
) {
  const cart = cartResponse(items);
  if (!cart) return apiError("Cart total is outside the supported range.", 409);
  return NextResponse.json({ cart }, { status });
}

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const cart = await Cart.findOne({ userId }).lean().exec();
    return respondWithCart(cart?.items ?? []);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  const parsed = await parseJsonBody(request, addItemSchema);
  if (!parsed.ok) return parsed.response;

  try {
    await connectToDatabase();
    const product = await Product.findOne({
      slug: parsed.data.slug,
      status: "active",
    })
      .select("slug name image priceMinor currency stock")
      .lean()
      .exec();

    if (!product) return apiError("Product not found.", 404);
    if (
      !Number.isSafeInteger(product.priceMinor) ||
      product.priceMinor < 0 ||
      !Number.isInteger(product.stock) ||
      product.stock < 0
    ) {
      return apiError("Product pricing or stock is invalid.", 409);
    }
    if (parsed.data.quantity > product.stock) {
      return apiError("Requested quantity exceeds available stock.", 409);
    }

    let cart = await Cart.findOne({ userId }).exec();
    if (!cart) cart = new Cart({ userId, items: [] });
    if (cart.items.some((item) => item.currency !== product.currency)) {
      return apiError("Products in one cart must use the same currency.", 409);
    }

    const existingItem = cart.items.find((item) => item.slug === product.slug);
    if (existingItem) {
      const quantity = existingItem.quantity + parsed.data.quantity;
      if (quantity > product.stock || quantity > 99) {
        return apiError("Requested quantity exceeds available stock or cart limit.", 409);
      }
      existingItem.quantity = quantity;
      existingItem.name = product.name;
      existingItem.image = product.image;
      existingItem.priceMinor = product.priceMinor;
      existingItem.currency = product.currency;
    } else {
      if (cart.items.length >= 50) return apiError("Cart item limit reached.", 409);
      cart.items.push({
        slug: product.slug,
        name: product.name,
        image: product.image,
        priceMinor: product.priceMinor,
        currency: product.currency,
        quantity: parsed.data.quantity,
      });
    }

    await cart.save();
    return respondWithCart(cart.items, 201);
  } catch (error) {
    return handleApiError("POST /api/cart", error);
  }
}

export async function PUT(request: NextRequest) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  const parsed = await parseJsonBody(request, updateItemSchema);
  if (!parsed.ok) return parsed.response;

  try {
    await connectToDatabase();
    const [cart, product] = await Promise.all([
      Cart.findOne({ userId }).exec(),
      Product.findOne({ slug: parsed.data.slug, status: "active" })
        .select("slug name image priceMinor currency stock")
        .lean()
        .exec(),
    ]);

    if (!cart) return apiError("Cart not found.", 404);
    if (!product) return apiError("Product not found.", 404);
    if (
      !Number.isSafeInteger(product.priceMinor) ||
      product.priceMinor < 0 ||
      !Number.isInteger(product.stock) ||
      product.stock < 0
    ) {
      return apiError("Product pricing or stock is invalid.", 409);
    }
    if (parsed.data.quantity > product.stock) {
      return apiError("Requested quantity exceeds available stock.", 409);
    }
    if (cart.items.some((cartItem) => cartItem.currency !== product.currency)) {
      return apiError("Products in one cart must use the same currency.", 409);
    }

    const item = cart.items.find((cartItem) => cartItem.slug === product.slug);
    if (!item) return apiError("Cart item not found.", 404);

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
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication Required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectToDatabase();
    const slug = request.nextUrl.searchParams.get("slug")?.trim().toLowerCase();

    if (slug) {
      if (slug.length > 120) return apiError("Invalid product slug.", 400);
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
