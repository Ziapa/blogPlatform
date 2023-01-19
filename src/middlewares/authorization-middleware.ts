import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.send(401)
    }

    const token = req.headers.authorization.split(" ")[1]

    const userId = await jwtService.getUserIdByToke(token)
    if (userId) {
        // req.user = await queryUsersRepositories.getUserById(userId)
        next()
    }
}