import { NextResponse } from "next/server";
import { withAuth, type AuthenticatedRequest } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";
import { parseProductId, readJsonBody } from "@/lib/product-validation";

export const runtime = "nodejs";

async function deleteProductHandler(req: AuthenticatedRequest) {
  try {
    const body = await readJsonBody(req);
    const id = body ? parseProductId(body.id) : null;
    if (!id) {
      return NextResponse.json(
        { error: "A valid product id is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export const DELETE = withAuth(deleteProductHandler, { requireAdmin: true });
