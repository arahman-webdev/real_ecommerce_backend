import { NextFunction, Request, Response } from "express";
import { productService } from "./product.service";
import { uploadToCloudinary } from "../../../config/uploadToCloudinary";







// Creating product category

const createCategory = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await productService.createCategory(req.body)

        res.status(201).json({
            success: true,
            message: "Created Successfully",
            data: result
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}


const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = req.body;
        console.log("before creating parse", data)
        if (data.data && typeof data.data === 'string') {
            data = JSON.parse(data.data)
            
        }

        const { name,slug, description, price, category,categoryId, stock } = data;



        const images = []

        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                try {
                    const uploaded = await uploadToCloudinary(file.buffer, "products");
                    // Here you can choose to store multiple image URLs/IDs as needed
                    // For simplicity, we're just assigning the last uploaded image
                    images.push({
                        imageUrl: uploaded.secure_url,
                        imageId: uploaded.public_id,
                    });
                } catch (uploadError: any) {
                   
                }
            }
        }

        const result = await productService.createProduct({
            name,slug, description, price: parseFloat(price), category,categoryId, stock: parseInt(stock), productImages: {
                create: images
            }, 

        })

        res.json({
            success: true,
            message: "Product created successfully",
            data: result
        })
    } catch (err) {
        next(err)
        console.log("from controller.....", err)
    }
}

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10
        const searchTerm = (req.query.searchTerm as string) || ""
        const category = (req.query.category as string) || ""
        const sortBy = (req.query.sortBy as string)
        const orderBy = (req.query.orderBy as string)

        console.log("from controller.....", orderBy, sortBy)
    
        const result = await productService.getProduct({ page, limit, searchTerm, category, sortBy, orderBy })
        res.json({
            success: true,
            data: result
        })
    } catch (err) {
        next(err)
    }
}



export const productController = {
    createProduct,
    getProduct,
    createCategory
}