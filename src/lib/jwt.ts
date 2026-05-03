import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export class AuthConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthConfigurationError";
  }
}

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new AuthConfigurationError("JWT_SECRET is not configured");
  }

  return process.env.JWT_SECRET;
}

function isJwtPayload(payload: unknown): payload is JWTPayload {
  if (!payload || typeof payload !== "object") return false;

  const candidate = payload as Partial<JWTPayload>;
  return (
    typeof candidate.userId === "number" &&
    Number.isFinite(candidate.userId) &&
    typeof candidate.email === "string" &&
    candidate.email.length > 0 &&
    typeof candidate.role === "string" &&
    candidate.role.length > 0
  );
}

export function verifyToken(token: string): JWTPayload | null {
  const payload = jwt.verify(token, getJwtSecret());
  return isJwtPayload(payload) ? payload : null;
}
