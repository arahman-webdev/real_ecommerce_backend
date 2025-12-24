import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../status/statusCode";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode: number = err.statusCode || 500;
    let success: boolean = false;
    let message: string = err.message || "Internal Server Error";
    let error = err

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            message = `This ${err.meta?.target} already exists.`,
                error = err.meta?.target,
                statusCode = HTTP_STATUS.BAD_REQUEST
        }
       if(err.code === "P2013"){
        
        message = `${err.meta?.target} is required.`,
           error = err,
           statusCode = HTTP_STATUS.BAD_REQUEST
           console.log("from global handler error",message)
       }

       if(err.code === "P2025"){
        message = `${err?.meta?.modelName} not found.`,
              error = err,
              statusCode = HTTP_STATUS.NOT_FOUND
       }

       if(err.code === "P2003"){
        message=`${err?.meta?.constraint} is required`,
        error = err,
        statusCode = HTTP_STATUS.BAD_REQUEST
       }
    }

    else if (err instanceof Prisma.PrismaClientValidationError) {
        message = "Validation Error",
            error = err.message,
            statusCode = HTTP_STATUS.BAD_REQUEST
    }
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        message = "Unknown Prisma error occured!",
            error = err.message,
            statusCode = HTTP_STATUS.BAD_REQUEST
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        message = "Prisma client failed to initialize!",
            error = err.message,
            statusCode = HTTP_STATUS.BAD_REQUEST
    }


    res.status(statusCode).json({
        success,
        message,
        error
    })
}

export default globalErrorHandler;