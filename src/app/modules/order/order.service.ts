
import { prisma } from "../../../config/db";
import AppError from "../../helper/AppError";
import { HTTP_STATUS } from "../../status/statusCode";


const checkout = async (
    userId: string,
    items: { productId: string; quantity: number }[]
) => {
    if (!items || items.length === 0) {
        throw new AppError(HTTP_STATUS.BAD_REQUEST, "Cart is empty");
    }

    let totalAmount = 0;

    // 1. Fetch products
    const products = await prisma.product.findMany({
        where: {
            id: { in: items.map(i => i.productId) },
        },
    });

    // 2. Validate stock & calculate total
    const orderItems = items.map(item => {
        const product = products.find(p => p.id === item.productId);

        if (!product) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, "Product not found");
        }

        if (product.stock < item.quantity) {
            throw new AppError(
                HTTP_STATUS.BAD_REQUEST,
                `${product.name} is out of stock`,
            );
        }

        totalAmount += product.price * item.quantity;

        return {
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
        };
    });

    // 3. Transaction (IMPORTANT)
    const order = await prisma.$transaction(async tx => {
        // Create order
        const newOrder = await tx.order.create({
            data: {
                userId,
                totalAmount,
                orderItem: {
                    create: orderItems,
                },
            },
        });

        // Reduce stock
        for (const item of orderItems) {
            await tx.product.update({
                where: { id: item.productId },
                data: {
                    stock: { decrement: item.quantity },
                },
            });
        }

        return newOrder;
    });

    return order;
};


export const orderService = {
    checkout
}