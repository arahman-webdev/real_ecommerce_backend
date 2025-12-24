import express from "express"
import { authController } from "./auth.controller"

const router = express.Router()



router.post("/sign-in/email", authController.loginUser)
router.get("/get-session", authController.getSession)

export const authRouter = router