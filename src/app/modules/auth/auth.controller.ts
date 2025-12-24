import { NextFunction, Request, response, Response } from "express"
import { authService } from "./auth.service"
import { HTTP_STATUS } from "../../status/statusCode"
import { auth } from "../../../lib/auth"


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await authService.loginUser(
            req.body,

        )

        console.log(result)
        res.status(HTTP_STATUS.OK).json({
            message: "User logged in successfully",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getSession = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const session = await auth.api.getSession({
            headers: new Headers(req.headers as any), // FIXED
        });

        res.status(HTTP_STATUS.OK).json({
            data: session
        })

    } catch (error) {
        console.log(error)
        next()
    }
}


export const authController = {
    loginUser,
    getSession
}