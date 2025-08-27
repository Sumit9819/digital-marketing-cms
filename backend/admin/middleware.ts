import { APIError } from "encore.dev/api";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";
import { adminDB } from "./db";

const jwtSecret = secret("JWTSecret");

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: 'administrator' | 'editor' | 'author';
  name: string;
}

export async function requireAuth(authHeader?: string): Promise<AuthenticatedUser> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw APIError.unauthenticated("Authentication required");
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, jwtSecret()) as any;
    
    const user = await adminDB.queryRow<any>`
      SELECT * FROM users WHERE id = ${decoded.userId}
    `;

    if (!user) {
      throw APIError.unauthenticated("Invalid token");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };
  } catch (error) {
    throw APIError.unauthenticated("Invalid token");
  }
}

export function requireRole(user: AuthenticatedUser, allowedRoles: string[]) {
  if (!allowedRoles.includes(user.role)) {
    throw APIError.permissionDenied("Insufficient permissions");
  }
}
