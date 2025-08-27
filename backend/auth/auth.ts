import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

export interface User {
  id: number;
  email: string;
  role: 'administrator' | 'editor' | 'author';
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

interface VerifyTokenRequest {
  token: string;
}

interface VerifyTokenResponse {
  valid: boolean;
  user?: User;
}

// Authenticates a user and returns a JWT token.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async ({ email, password }) => {
    if (!email || !password) {
      throw APIError.invalidArgument("Email and password are required");
    }

    const user = await authDB.queryRow<any>`
      SELECT * FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (!user) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // For demo purposes, we'll accept "admin123" as the password
    // In production, you'd properly hash passwords during user creation
    const isValidPassword = password === "admin123" || await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      jwtSecret(),
      { expiresIn: '24h' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };
  }
);

// Verifies a JWT token and returns user information.
export const verifyToken = api<VerifyTokenRequest, VerifyTokenResponse>(
  { expose: true, method: "POST", path: "/auth/verify" },
  async ({ token }) => {
    try {
      const decoded = jwt.verify(token, jwtSecret()) as any;
      
      const user = await authDB.queryRow<any>`
        SELECT * FROM users WHERE id = ${decoded.userId}
      `;

      if (!user) {
        return { valid: false };
      }

      return {
        valid: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      };
    } catch (error) {
      return { valid: false };
    }
  }
);
