import { connectToDatabase } from "@/lib/db";
import ProductModel from "@/models/Product";
import { type NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ slug: string }>; };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    await connectToDatabase();

    const product = await ProductModel.findOne({ slug: slug.toLowerCase(), status: "active", }).lean().exec();
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ error: "Unable to find products." }, { status: 500 })
}
