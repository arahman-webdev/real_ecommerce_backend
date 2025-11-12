import { Prisma } from "@prisma/client"
import { prisma } from "../../../config/db"



// creating product category

const createCategory = async(payload:Prisma.CategoryCreateInput) =>{
   
    const result = await prisma.category.create({
        data: payload
    })

    return result
}





// creating product ----------------
const createProduct = async (payload: Prisma.ProductCreateInput) => {

    const baseSlug = payload.name.toLocaleLowerCase().split(" ").join("-")

    payload.slug = baseSlug



    const result = await prisma.product.create({
        data: payload,
        include: {
            productImages: true,
            category: true
        }
    })

    return result
}


const updateProduct = async (id:string, payload: Partial<Prisma.ProductUpdateInput>) => {
    const result = await prisma.product.update({
        where:{id},
        data: payload,
        include: {
            productImages: true,
            category: true
        }
    })

    return result
}



const getProduct = async ({ 
    page, limit, searchTerm, category, orderBy, sortBy 
}: { 
    page: number, limit: number, searchTerm?: string, category?:string, orderBy?:string, sortBy?:string 
}) => {
    console.log("from service...........")

    const skip = (page - 1) * limit

    const result = await prisma.product.findMany({
        skip,
        take: limit,
        where:{
            ...(searchTerm && {name: {contains: searchTerm, mode:"insensitive"}}),
            ...(category && { category: { name: { equals: category } } }),
            
        },
        
        orderBy: orderBy && sortBy ? {
            [sortBy]: orderBy
        }:{
            createdAt: "asc"
        },
        include: {
            productImages: true,
            category: true
        },
    })

    return result
}



export const productService = {
    createProduct,
    updateProduct,
    getProduct,
    createCategory
}