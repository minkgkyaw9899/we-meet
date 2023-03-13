import * as dotenv from "dotenv"
import * as process from "process"
import { PrismaClient } from "@prisma/client"

dotenv.config()

export const PORT = process.env.PORT || 5000

export const prisma = new PrismaClient()

export const jwtSecret = process.env.JWT_SECRET_KEY || "jwt secret key"
