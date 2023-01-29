import {Response, Router} from "express";
import {RequestWithQuery} from "../types/types";
import {queryCommentsRepositories} from "../repositories/comments/comments-query-repositories";

export const commentsRouter = Router()

commentsRouter.get("/:id", async (req: RequestWithQuery<{ id: string }>, res:Response) => {

    const findComment = await queryCommentsRepositories.getComment(req.query.id)

    if (findComment) {
        res.status(200).send(findComment)
    } else {
        res.sendStatus(404)
    }

})
