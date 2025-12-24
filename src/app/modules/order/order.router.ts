import express from "express"
import { orderController } from "./order.controller"
import { UserRole } from "@prisma/client"
import { checkAuth } from "../../middleware/checkAuth"



const router = express.Router()

/* -----Order-----   checkout*/

router.post('/checkout',checkAuth(UserRole.CUSTOMER) ,orderController.checkout )


 
export const orderRouter = router