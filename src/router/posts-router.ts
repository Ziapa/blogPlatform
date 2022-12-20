import {Request, Response, Router} from "express";
import {postsRepositories} from "../repositories/posts-repositories";
import {basicAuthorization} from "../middlewares/authorization-middleware";
import {createBlogValidation, updateBlogValidation} from "../validation/posts-validation";


export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(postsRepositories.findPosts())
})
postsRouter.get('/:id', (req: Request, res: Response) => {

    const findPost = postsRepositories.findPosts(req.params.id)

    if (findPost) {
        res.status(200).send(findPost)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('/',

    createBlogValidation,

    basicAuthorization,

    (req: Request, res: Response) => {
    const newPost = postsRepositories.createPost(req.body)
    if (newPost) {
        res.status(201).send(newPost)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put('/:id',

    basicAuthorization,

    (req: Request, res: Response) => {
    const updatePost = postsRepositories.updatePost(req.params.id, req.body)
    if (updatePost) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})
postsRouter.delete('/:id',

    updateBlogValidation,

    basicAuthorization,

    (req: Request, res: Response) => {
    if (postsRepositories.deletePost(req.params.id)) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
