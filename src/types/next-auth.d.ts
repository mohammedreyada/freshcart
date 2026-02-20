import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    user: {
      role: string;
      name: string;
      email: string;
    };
    token: string;
  }

  interface Session {
    user: {
      role: string;
      name: string;
      email: string;
    };
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      role: string;
      name: string;
      email: string;
    };
    token?: string;
    idToken?: string;
  }
}
