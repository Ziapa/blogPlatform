import {UsersDbType} from "../types/usersType";
import jwt from "jsonwebtoken"

export const jwtService = {
    async createJWT(user: UsersDbType) {
        return jwt.sign({userId: user.id}, "123", {expiresIn: "1h"})
    },
    async getUserIdByToke(token: string) {
        try {
            const result: any = jwt.verify(token, "123")
            return {userID: result.userId}
        } catch (error) {
            return null
        }
    }
}