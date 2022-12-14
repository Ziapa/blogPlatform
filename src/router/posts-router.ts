import {Request, Response, Router} from "express";
import {postsRepositories} from "../repositories/posts-repositories";


export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(postsRepositories.findPosts())
})

