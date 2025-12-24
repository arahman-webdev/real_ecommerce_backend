// import { UserStatus } from "@prisma/client"
// import { prisma } from "../../../config/db"
// import AppError from "../../helper/AppError"
// import { HTTP_STATUS } from "../../status/statusCode"
// import bcryptjs from "bcryptjs"
// const loginUser = async(payload:{email:string, password:string})=>{
// const user = await prisma.user.findFirstOrThrow({
//     where:{
//         email: payload.email,
//         status: UserStatus.ACTIVE
//     }
// })

import { auth } from "../../../lib/auth"

// const correctedPassword = await bcryptjs.compare(payload.password, user.password)

// if(!correctedPassword){
//     throw new AppError("Invalid credentials", HTTP_STATUS.UNAUTHORIZED)
// }



// return user


// }


const loginUser = async (payload: any) => {

    const user = await auth.api.signInEmail({
        body: {
            ...payload
        }
    })

    console.log("from auth service.......",payload)

    return user
}






export const authService = {
    loginUser
}