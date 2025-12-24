import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { HTTP_STATUS } from "../../status/statusCode";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../../lib/auth";

const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
      console.log("from creating user controller.........",req.headers)
        const result = await userService.createUser(req.body)
        res.status(HTTP_STATUS.CREATED).json({
            message: "User created successfully",
            data: result
        })
    }catch(err){
        next(err)
    }
}


// const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const session = await auth.api.getSession({ headers: req.headers });
    
//     if (!session) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     res.status(200).json({
//       message: "User fetched successfully",
//       user: session.user, // contains id, name, email, etc.
//     });
//   } catch (error) {
//     next(error);
//   }
// };


export const userController = {
    createUser,
    
}