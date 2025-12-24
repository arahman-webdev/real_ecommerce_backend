import express from "express";
import { userController } from "./user.controller";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../../../lib/auth";


const router = express.Router();


router.post("/sign-up/email", toNodeHandler(auth.handler))
router.post("/sign-in/email", toNodeHandler(auth.handler))
router.get("/get-session", toNodeHandler(auth.handler))
router.post("/sign-out", toNodeHandler(auth.handler))
// router.get('/me', userController.getCurrentUser)

export const userRouter = router;