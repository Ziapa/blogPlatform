import {Request, Response, Router} from "express";
import {postsRepositories} from "../repositories/posts-repositories";
import {basicAuthorization} from "../middlewares/authorization-middleware";
import {createPostValidation, updatePostValidation} from "../validation/posts-validation";
import {PostsType} from "../types/postsTypes";
import {CreatePostModelType} from "../model/postsModel/createPostModel";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../types/types";
import {QueryPostModelType} from "../model/postsModel/queryPostModel";


export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response<PostsType[]>) => {
    res.status(200).send(postsRepositories.getPost())
})
postsRouter.get('/:id', (req: Request, res: Response<PostsType>) => {
    const findPost = postsRepositories.findPost(req.params.id)

    if (findPost) {
        res.status(200).send(findPost)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('/',

    basicAuthorization,

    createPostValidation,

    (req: RequestWithBody<CreatePostModelType>, res: Response) => {
        const newPost = postsRepositories.createPost(req.body)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id',

    basicAuthorization,

    updatePostValidation,

    (req: RequestWithParamsAndBody<QueryPostModelType, CreatePostModelType>, res: Response) => {
        const updatePost = postsRepositories.updatePost(req.params.id, req.body)
        if (updatePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })
postsRouter.delete('/:id',

    basicAuthorization,

    (req: RequestWithParams<QueryPostModelType>, res: Response) => {
        if (postsRepositories.deletePost(req.params.id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
