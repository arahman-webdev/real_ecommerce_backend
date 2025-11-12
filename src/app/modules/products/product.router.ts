import express from "express"
import { productController } from "./product.controller"
import { upload } from "../../../config/multer.config"


const router = express.Router()

/* -----Product                Category----- */

router.post('/create-category', productController.createCategory)




/* -----Product           ----- */

router.post('/create',upload.array('image'), productController.createProduct)
router.get('/', productController.getProduct)

 
export const productRouter = router