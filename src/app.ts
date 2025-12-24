import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { productRouter } from "./app/modules/products/product.router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";

export const app = express()

// Simple CORS - allow everything in development
app.use(cors({
  origin: true, // Allow any origin
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

// Add middleware to set Origin header if missing
// app.use((req, res, next) => {
//   // If no origin header, set one
//   if (!req.headers.origin) {
//     req.headers.origin = `http://${req.headers.host}`;
//   }
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
//   next();
// });

// Better Auth API routes - mount ALL auth routes
app.use("/api/auth", toNodeHandler(auth.handler))

// Product routes
app.use('/api/v1/product', productRouter)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Server is running")
})





app.use(globalErrorHandler)

console.log("Auth routes mounted at /api/auth");