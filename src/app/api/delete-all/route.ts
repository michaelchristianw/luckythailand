import { NextResponse } from "next/server";
import { withAuth, type AuthenticatedRequest } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

async function deleteHandler(request: AuthenticatedRequest) {
  try {
    const { user } = request;

    console.log(`Admin ${user.email} is deleting all products`);

    await prisma.product.deleteMany();

    return NextResponse.json(
      {
        message: "All data deleted successfully",
        deletedBy: user.email,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}

export const DELETE = withAuth(deleteHandler, { requireAdmin: true });
