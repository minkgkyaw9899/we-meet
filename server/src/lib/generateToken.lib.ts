import jwt from "jsonwebtoken"
import { jwtSecret } from "../config"

export const generateToken = (id: number, email: string) => {
    return jwt.sign({ email, sub: id }, jwtSecret)
}
