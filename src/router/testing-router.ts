import {Request, Response, Router} from "express";
import {testingRepositories} from "../repositories/testing-repositories";
import {blogs} from "../repositories/blogs-repositories";
import {posts} from "../repositories/posts-repositories";


export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    if (testingRepositories.deleteAll()) {
    res.status(204).send({
        blogs, posts
    })
} else {
    res.status(404)
}
})




