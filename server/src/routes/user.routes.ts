import { Router } from "express"
import { getAllUsers, normalRegister } from "../handlers/user.handlers"
import { validator } from "../middleware"
import { normalRegisterSchema } from "../schema"

const router = Router()

router
    .get("/", getAllUsers)
    .post("/create/normal", validator(normalRegisterSchema), normalRegister)
    .post("/login/normal")

export default router
