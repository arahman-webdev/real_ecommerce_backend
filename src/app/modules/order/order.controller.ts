import { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import { HTTP_STATUS } from "../../status/statusCode";

const checkout = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id; // from auth middleware
        const itmes = req.body.items

        const order = await orderService.checkout(userId, itmes);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: "Order placed successfully",
            data: order,
        });
    } catch (err) {
        next(err);
    }
};


export const orderController ={
    checkout
}
