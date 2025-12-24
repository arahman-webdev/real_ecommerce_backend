import express from "express"
import { productController } from "./product.controller"
import { upload } from "../../../config/multer.config"


const router = express.Router()

/* -----Product                Category----- */

router.post('/create-category', productController.createCategory)
router.delete('/category/:id', productController.deleteCategory)
router.get('/all-category', productController.getCategory)
router.put('/category/:id', productController.updateCategory)




/* -----Product    ----- */

router.post('/create',upload.array('image'), productController.createProduct)
router.get('/', productController.getProduct)
router.get('/:slug', productController.getSingleProduct)
router.delete('/:id', productController.deleteProduct)

 
export const productRouter = router