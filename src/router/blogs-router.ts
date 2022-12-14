import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";


export const blogsRouter = Router()

blogsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(blogsRepositories.findBlog())
})
blogsRouter.post('/', (req: Request, res: Response) => {
    const newBlog = blogsRepositories.crateBlog(req.body)
    if (newBlog) {
        res.status(201).send(newBlog)
    } else {
        res.status(404)
    }
})

