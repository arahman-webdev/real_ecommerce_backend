import "dotenv/config";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"), // fixed path
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL as string, // make sure DATABASE_URL is in your .env
  },
});
