import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {queryUsersRepositories} from "../repositories/users/users-query-repositories";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.send(401)
    }

    const token = req.headers.authorization.split(" ")[1]

    const userId: string | null = await jwtService.getUserIdByToken(token)
    if (!userId) {
        res.sendStatus(401)
    }else{
        req.user = await queryUsersRepositories.getUserById(userId)
        next()
    }
}