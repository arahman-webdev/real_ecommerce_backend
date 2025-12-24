// import { Prisma } from "@prisma/client";
// import { prisma } from "../../../config/db";
// import bcrypt from 'bcryptjs';
// const createUser = async (payload: Prisma.UserCreateInput) => {
//     const hashPassword = await bcrypt.hash(payload.password, 10)
//     const user = await prisma.user.create({
//         data: {
//             ...payload,
//             password: hashPassword
//         }
//     })
//     return user


import { auth } from "../../../lib/auth";

const createUser = async (payload: any) => {
    const user = await auth.api.signUpEmail({
        body: {
            ...payload,
            
        }
    })


    return user
}


export const userService = {
    createUser
}