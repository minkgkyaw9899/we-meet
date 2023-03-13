import expressAsyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { assign, omit } from "lodash"
import argon2 from "argon2"
import passport from "passport"

import { createUser, findAllUsers } from "../services/user.services"
import { NormalRegisterSchema } from "../schema"
import { generateOTPCode, generateToken } from "../lib"

export const getAllUsers = expressAsyncHandler(async (_req: Request, res: Response) => {
    const users = await findAllUsers()

    res.status(200).json({
        meta: {
            status: 200,
            total: users.length,
        },
        users: users.map((user) => omit(user, ["password", "otp"])),
    })
})

export const normalRegister = expressAsyncHandler(
    async (
        req: Request<unknown, unknown, NormalRegisterSchema>,
        res: Response,
        next: NextFunction
    ) => {
        const otp = generateOTPCode(6)

        const password = await argon2.hash(req.body.password)

        const data = assign(omit(req.body, ["password"]), { password, otp })

        const user = await createUser(data)

        if (!user) return next(createHttpError(422, "Can't create user"))

        res.status(201).json({
            meta: {
                status: 201,
                message: "Successfully create new user",
            },
            user: omit(user, ["password", "otp"]),
        })
    }
)

export const loginWithLocal = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (_err: any, user: any, info: any) => {
        if (!user) return next(createHttpError(401, info.message))

        const token = generateToken(user.id, user.email)

        if (!token) return next(createHttpError(500, "Can't create user token"))

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Successfully login",
            },
            user,
            token,
        })
    })(req, res, next)
}
