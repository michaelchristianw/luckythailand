import { NextResponse } from "next/server";
import { withAuth, type AuthenticatedRequest } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";
import { readJsonBody, validateCreateProduct } from "@/lib/product-validation";

export const runtime = "nodejs";

async function addProductHandler(req: AuthenticatedRequest) {
  try {
    const body = await readJsonBody(req);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateCreateProduct(body);
    if (validation.error) return validation.error;

    const product = await prisma.product.create({
      data: validation.data,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[API ERROR]", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export const POST = withAuth(addProductHandler, { requireAdmin: true });
