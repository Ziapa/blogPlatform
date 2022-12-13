import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";


export const blogsRouter = Router()

blogsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(blogsRepositories.findBlog())
})

