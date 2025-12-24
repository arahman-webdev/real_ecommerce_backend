import { Prisma } from "@prisma/client"
import { prisma } from "../../../config/db"
import { deleteFromCloudinary } from "../../../config/deleteFromCloudinary"




// creating product category

const createCategory = async (payload: Prisma.CategoryCreateInput) => {

    const result = await prisma.category.create({
        data: payload
    })

    return result
}
const updateCategory = async (id: string, payload: Partial<Prisma.CategoryCreateInput>) => {

    const result = await prisma.category.update({
        where: { id },
        data: payload
    })

    return result
}


const getCategory = async () => {

    const result = await prisma.category.findMany({

    })

    return result
}
const deleteCategory = async (id: string) => {

    const result = await prisma.category.delete({
        where: { id }
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


const updateProduct = async (id: string, payload: Partial<Prisma.ProductUpdateInput>) => {
    const result = await prisma.product.update({
        where: { id },
        data: payload,
        include: {
            productImages: true,
            category: true
        }
    })

    return result
}



const getProduct = async ({
    page, limit, searchTerm, category, orderBy = 'asc', sortBy = 'createdAt'
}: {
    page: number, limit: number, searchTerm?: string, category?: string, orderBy?: string, sortBy?: string
}) => {
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (searchTerm) {
        where.name = { contains: searchTerm, mode: "insensitive" };
    }

    if (category) {
        where.category = { name: { equals: category, mode: "insensitive" } };
    }

    // Validate and set orderBy
    const allowedSortFields = ['price', 'rating', 'createdAt', 'name'];
    const allowedOrders = ['asc', 'desc'];

    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const validOrderBy = allowedOrders.includes(orderBy) ? orderBy : 'asc';

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            skip,
            take: limit,
            where,
            orderBy: { [validSortBy]: validOrderBy },
            include: {
                productImages: true,
                category: true
            },
        }),
        prisma.product.count({ where })
    ]);

    return {
        products,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

const getSingleProduct = async (slug: string) => {
    const product = await prisma.product.findUniqueOrThrow({
        where: { slug },
        include:{
            productImages: true
        }
    })

    return product
}


const deleteProduct = async(id:string)=>{
    const product = await prisma.product.findFirstOrThrow({
        where:{id},
        include:{
            productImages:true
        }
    })


    if(product.productImages.length > 0){
        for(const image of product.productImages){
            try {
                await deleteFromCloudinary(image.imageId as string)
                console.log(image.imageId)
            } catch (error) {
                console.log(error)
            }
        }
    }


    for(const image of product.productImages){
        const imageId = image.imageId
        try {
            await deleteFromCloudinary(imageId as string)
        } catch (error) {
            console.log(error)
        }
    }


    await prisma.productImage.deleteMany({
        where:{productId:id}
    })


    const result = await prisma.product.delete({where:{id}})



    return result
}



export const productService = {
    createProduct,
    updateProduct,
    getProduct,
    createCategory,
    getSingleProduct,
    getCategory,
    deleteCategory,
    updateCategory,
    deleteProduct

}