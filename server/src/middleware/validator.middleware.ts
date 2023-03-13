import { AnyZodObject, ZodError } from "zod"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"

export const validator =
    (obj: AnyZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await obj.parseAsync({
                param: req.param,
                body: req.body,
                query: req.query,
            })

            return next()
        } catch (err) {
            if (err instanceof ZodError) {
                console.log(err)
                const message = err.issues.map((issue) => issue.message)[0]

                return next(createHttpError(422, message))
            }
        }
        return next(createHttpError(500))
    }
