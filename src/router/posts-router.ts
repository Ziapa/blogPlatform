import {Request, Response, Router} from "express";
import {postsRepositories} from "../repositories/posts-repositories";
import {body, validationResult} from "express-validator";


export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(postsRepositories.findPosts())
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    res.status(200).send(postsRepositories.findPosts(req.params.id))
})

postsRouter.post('/',

    body('title').isString().isLength({min: 1, max: 30}).trim(),
    body('shortDescription').isString().isLength({min: 1, max: 100}).trim(),
    body('content').isString().isLength({min: 1, max: 1000}).trim(),
    body('blogId').isString().trim(),


    (req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

    const newPost = postsRepositories.createPost(req.body)
    if (newPost) {
        res.status(201).send(newPost)
    } else {
        res.status(404)
    }
})

postsRouter.put('/:id', (req: Request, res: Response) => {
    const updatePost = postsRepositories.updatePost(req.params.id, req.body)
    if (updatePost) {
        res.status(204)
    } else {
        res.status(404)
    }

})
postsRouter.delete('/:id', (req: Request, res: Response) => {
    if (postsRepositories.deletePost(req.params.id)) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
