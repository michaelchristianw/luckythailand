import { NextRequest, NextResponse } from "next/server";
import { verifyToken, type JWTPayload } from "./jwt";

export type AuthenticatedRequest = NextRequest & {
  user: JWTPayload;
};

type AuthenticatedHandler = (
  request: AuthenticatedRequest,
  ...args: unknown[]
) => NextResponse | Promise<NextResponse>;

export function withAuth(
  handler: AuthenticatedHandler,
  options?: { requireAdmin?: boolean }
) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (options?.requireAdmin && payload.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = payload;

    return handler(authenticatedRequest, ...args);
  };
}
