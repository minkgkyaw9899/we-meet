import { Server, Socket } from "socket.io"
import http from "http"
import consola from "consola"
import { verifyToken } from "./lib"

export const socketInitializer = (httpServer: http.Server): Server => {
    const io = new Server(httpServer)

    io.on("connection", (socket: Socket) => {
        const token = socket.handshake.auth.token
        if (!token) {
            socket.disconnect(true)
            return
        }

        const { id: userId } = verifyToken(token)

        consola.info(`Socket connected with user ID: ${userId}`)
    })

    return io
}
