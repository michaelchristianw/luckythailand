import { NextResponse } from "next/server";
import { fallbackProducts, normalizeProductImage } from "@/data/products";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await prisma.product.findMany({});
    return NextResponse.json(products.map(normalizeProductImage), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(fallbackProducts, { status: 200 });
    }

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
