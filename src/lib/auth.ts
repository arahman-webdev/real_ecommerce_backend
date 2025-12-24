import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 20,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "CUSTOMER", // Default role
      },
    },
  },
  // Remove trustedOrigins completely for now
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  // Completely disable security checks for development
  advanced: {
    disableOriginCheck: true,
    // Add this to disable all security checks in development
    publicRoutes: ["/api/auth/**"]
  }
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;