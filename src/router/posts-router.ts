import {Request, Response, Router} from "express";
import {postsRepositories} from "../repositories/posts-repositories";


export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(postsRepositories.findPosts())
})

postsRouter.post('/', (req: Request, res: Response) => {
    const newPost = postsRepositories.createPost(req.body)
    if (newPost) {
        res.status(201).send(newPost)
    } else {
        res.status(404)
    }
})

