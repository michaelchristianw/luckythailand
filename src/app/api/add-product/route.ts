import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, name, price, imageurl } = body;

    const product = await prisma.product.create({
      data: { category, name, price, imageurl },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[API ERROR]", error);
    const message =
      error instanceof Error ? error.message : "Failed to add product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
