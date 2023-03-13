import createHttpError from "http-errors"
import { Prisma } from "@prisma/client"

import { prisma } from "../config"

import { CreateUser } from "../interface/user.interface"

export const findAllUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (err) {
        throw new createHttpError.InternalServerError()
    }
}

export const createUser = async (data: CreateUser) => {
    try {
        return await prisma.user.create({ data })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw createHttpError(409, "User already existed with that email")
            }
        }
        throw new createHttpError.InternalServerError()
    }
}

export const findOne = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) throw createHttpError(404, "User not found")

        return user
    } catch (err) {
        console.log(err)
        throw createHttpError(500)
    }
}
