import {UsersDbType} from "../types/usersType";
import jwt from "jsonwebtoken"

export const jwtService = {
    async createJWT(user: UsersDbType) {
        return jwt.sign({userId: user.id}, "123", {expiresIn: "1h"})
    },
    async getUserIdByToken(token: string) {
        try {
            const result = jwt.verify(token, "123")
            console.log(result)
            //@ts-ignore
            return  result.userId as string
        } catch (error) {
            return null
        }
    }
}