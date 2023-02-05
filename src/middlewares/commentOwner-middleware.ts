import {NextFunction, Request, Response} from "express";
import {queryCommentsRepositories} from "../repositories/comments/comments-query-repositories";

export const commentOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const comment = await queryCommentsRepositories.getComment(req.params.id)

    if (comment) {
        if (req.user!.userId !== comment?.commentatorInfo.userId) {
            res.sendStatus(403)
        }
    } else {
        next()
    }

}