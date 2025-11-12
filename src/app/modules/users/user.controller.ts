import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { HTTP_STATUS } from "../../status/statusCode";

const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const result = await userService.createUser(req.body)
        res.status(HTTP_STATUS.CREATED).json({
            message: "User created successfully",
            data: result
        })
    }catch(err){
        next(err)
    }
}


export const userController = {
    createUser
}