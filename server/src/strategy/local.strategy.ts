import * as local from "passport-local"
import argon2 from "argon2"
import { omit } from "lodash"
import { findOne } from "../services/user.services"

const Strategy = local.Strategy

export const localStrategy = new Strategy(
    { usernameField: "email", session: false },
    async (email, password, done) => {
        const user = await findOne(email)

        if (!user) return done(null, false, { message: "User not found" })

        if (!user.password) return done(null, false, { message: "User can't login with local" })

        const isMatchPwd = await argon2.verify(user.password, password)

        if (!isMatchPwd) return done(null, false, { message: "Invalid email or password" })

        return done(null, omit(user, ["password", "otp"]))
    }
)
