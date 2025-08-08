import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// Extend the NextAuth types
declare module "next-auth" {
  /**
   * The shape of the user object returned in the API route.
   */
  interface User extends DefaultUser {
    role?: string;
  }

  /**
   * The shape of the session object returned in the API route.
   */
  interface Session extends DefaultSession {
    user?: {
      role?: string;
    } & DefaultSession["user"];
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  /**
   * The shape of the JWT token.
   */
  interface JWT extends DefaultJWT {
    role?: string;
  }
}