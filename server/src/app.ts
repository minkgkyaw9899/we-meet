import http from "http"
import express from "express"
import logger from "morgan"
import consola from "consola"
import helmet from "helmet"
import * as process from "process"

import { PORT, prisma } from "./config"
import { passportInitializer, toobusy } from "./middleware"
import { errorHandler } from "./lib"
import userRoutes from "./routes/user.routes"
import { socketInitializer } from "./socket"

const app = express()

// middleware
app.use(logger("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(toobusy())
passportInitializer()

// routes
app.use("/api/v1/users", userRoutes)

// error handler
errorHandler(app)

const server = http.createServer(app)

socketInitializer(server)

server.listen(PORT, async () => {
    try {
        await prisma.$connect()
        consola.info("Successfully connected to Db")
        consola.success(`Server listening on ${PORT}`)
    } catch (err) {
        consola.error(err)
        await prisma.$disconnect()
        server.close()
        process.exit(1)
    }
})
