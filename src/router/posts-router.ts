import {Request, Response, Router} from "express";
import {basicAuthorization} from "../middlewares/authorization-middleware";
import {createPostValidation, updatePostValidation} from "../validation/posts-validation";
import {PostsOutputType} from "../types/postsTypes";
import {CreatePostModelType} from "../model/postsModel/createPostModel";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../types/types";
import {QueryPostModelType} from "../model/postsModel/queryPostModel";
import {postsServices} from "../domain/posts-services";


export const postsRouter = Router()

postsRouter.get('/', async (req: Request, res: Response<PostsOutputType[]>) => {

    const findPosts = await postsServices.getPost()

    if (findPosts) {
        res.status(200).send(findPosts)
    } else {
        res.sendStatus(400)
    }
})
postsRouter.get('/:id', async (req: Request, res: Response<PostsOutputType>) => {
    const findPost = await postsServices.findPost(req.params.id)


    if (findPost) {
        res.status(200).send(findPost)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('/',

    basicAuthorization,

    createPostValidation,

    async (req: RequestWithBody<CreatePostModelType>, res: Response) => {
        const newPost = await postsServices.createPost(req.body)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id',

    basicAuthorization,

    updatePostValidation,

    async (req: RequestWithParamsAndBody<QueryPostModelType, CreatePostModelType>, res: Response) => {
        const updatePost = await postsServices.updatePost(req.params.id, req.body)
        if (updatePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })
postsRouter.delete('/:id',

    basicAuthorization,

    async (req: RequestWithParams<QueryPostModelType>, res: Response) => {
        if (await postsServices.deletePost(req.params.id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
