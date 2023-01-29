import {Response, Router} from "express";
import {RequestWithParams, RequestWithQuery} from "../types/types";
import {queryCommentsRepositories} from "../repositories/comments/comments-query-repositories";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {commentsServices} from "../domain/comments-services";

export const commentsRouter = Router()

commentsRouter.get("/:id", async (req: RequestWithQuery<{ id: string }>, res:Response) => {

    const findComment = await queryCommentsRepositories.getComment(req.query.id)

    if (findComment) {
        res.status(201).send(findComment)
    } else {
        res.sendStatus(404)
    }

}),

    commentsRouter.delete("/:id",

        authorizationMiddleware,

        async (req: RequestWithParams<{id: string}>, res: Response) => {

        if (await commentsServices.deleteComment(req.params.id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })
