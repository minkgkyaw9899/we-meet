import toobusy_js from "toobusy-js"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"

export const toobusy = () => (_req: Request, _res: Response, next: NextFunction) => {
    if (toobusy_js()) return next(createHttpError(503))

    next()
}
