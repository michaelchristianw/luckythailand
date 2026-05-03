import { NextRequest, NextResponse } from "next/server";
import { AuthConfigurationError, verifyToken, type JWTPayload } from "./jwt";

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
    let payload: JWTPayload | null;

    try {
      payload = verifyToken(token);
    } catch (error) {
      if (error instanceof AuthConfigurationError) {
        console.error(error.message);
        return NextResponse.json(
          { error: "Authentication is not configured" },
          { status: 500 }
        );
      }

      payload = null;
    }

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
