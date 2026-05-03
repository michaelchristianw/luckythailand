import { NextResponse } from "next/server";
import { withAuth, type AuthenticatedRequest } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";
import { readJsonBody, validateUpdateProduct } from "@/lib/product-validation";

export const runtime = "nodejs";

async function updateProductHandler(req: AuthenticatedRequest) {
  try {
    const body = await readJsonBody(req);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateUpdateProduct(body);
    if (validation.error) return validation.error;

    const updatedProduct = await prisma.product.update({
      where: { id: validation.id },
      data: validation.data,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(updateProductHandler, { requireAdmin: true });
