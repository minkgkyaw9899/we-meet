import jwt from "jsonwebtoken"
import { jwtSecret } from "../config"

interface JwtPayload {
    id: number
    email: string
}
export const verifyToken = (token: string): JwtPayload => jwt.verify(token, jwtSecret) as JwtPayload
