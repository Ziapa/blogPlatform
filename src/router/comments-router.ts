import {Response, Router} from "express";
import {RequestWithParams, RequestWithParamsAndBody} from "../types/types";
import {queryCommentsRepositories} from "../repositories/comments/comments-query-repositories";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {commentsServices} from "../domain/comments-services";
import {commentsValidation} from "../validation/comments-validation";
import {commentOwnerMiddleware} from "../middlewares/commentOwner-middleware";

export const commentsRouter = Router()

commentsRouter.get("/:id", async (req: RequestWithParams<{ id: string }>, res: Response) => {

    const findComment = await queryCommentsRepositories.getComment(req.params.id)

    if (findComment) {
        res.status(200).send(findComment)
    } else {
        res.sendStatus(404)
    }

}),

    commentsRouter.delete("/:id",

        authorizationMiddleware,
        commentOwnerMiddleware,

        async (req: RequestWithParams<{ id: string }>, res: Response) => {

            if (await commentsServices.deleteComment(req.params.id)) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        }),
    commentsRouter.put("/:id",

        authorizationMiddleware,
        commentOwnerMiddleware,

        commentsValidation,

        async (req: RequestWithParamsAndBody<{ id: string }, { content: string }>, res: Response) => {
            const updateComments = await commentsServices.updateComment(req.params.id, req.body.content)

            if (updateComments) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }

        }
    )
