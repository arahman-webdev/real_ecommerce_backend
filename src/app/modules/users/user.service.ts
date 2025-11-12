import { Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";

const createUser = async (payload: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
        data: payload
    })
    return user

}

export const userService = {
    createUser
}