import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const category = params.get("category")?.trim().slice(0, 60);
    const query = params.get("q")?.trim().slice(0, 100);
    const requestedPage = Number(params.get("page") ?? 1);
    const requestedLimit = Number(params.get("limit") ?? 12);

    if (!Number.isInteger(requestedPage) || requestedPage < 1 || !Number.isInteger(requestedLimit) || requestedLimit < 1) {
      return NextResponse.json(
        { error: "Page and limit must be positive integers." },
        { status: 400 },
      );
    }

    const limit = Math.min(requestedLimit, 50);
    const page = Math.min(requestedPage, 100_000);
    const filter: Record<string, unknown> = { status: "active" };

    if (category) {
      const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.category = { $regex: `^${escapedCategory}$`, $options: "i" };
    }

    if (query) {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: escapedQuery, $options: "i" } },
        { description: { $regex: escapedQuery, $options: "i" } },
        { category: { $regex: escapedQuery, $options: "i" } },
      ];
    }

    await connectToDatabase();

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      Product.countDocuments(filter).exec(),
    ]);

    return NextResponse.json({
      products, pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ error: "Unable to load products." }, { status: 500 })
}
