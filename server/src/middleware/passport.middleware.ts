import passport from "passport"
import { localStrategy } from "../strategy"

export const passportInitializer = () => {
    passport.initialize()
    passport.use(localStrategy)
}
