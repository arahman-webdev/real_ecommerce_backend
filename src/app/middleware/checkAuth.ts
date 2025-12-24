import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

export const checkAuth =
  (...roles: UserRole[]) =>
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
