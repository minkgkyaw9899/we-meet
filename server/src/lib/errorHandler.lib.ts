import createHttpError from "http-errors"
import { Express, NextFunction, Request, Response, ErrorRequestHandler } from "express"

export const errorHandler = (app: Express) => {
    app.use((_req: Request, _res: Response, next: NextFunction) => {
        return next(createHttpError(404, "Your Request was not found."))
    })

    app.use(((err, _req, res, _next) => {
        const status = err.status || 500
        const message = err.message || "Internal Server Error"

        return res.status(status).json({
            error: {
                status,
                message,
            },
        })
    }) as ErrorRequestHandler)
}
