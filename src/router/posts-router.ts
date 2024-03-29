import {Request, Response, Router} from "express";
import {createPostValidation, updatePostValidation} from "../validation/posts-validation";
import {PostsOutputType} from "../types/postsTypes";
import {CreatePostModelType} from "../model/postsModel/createPostModel";
import {
    QueryRequest,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithParamsAndQuery,
    RequestWithQuery
} from "../types/types";
import {QueryPostModelType} from "../model/postsModel/queryPostModel";
import {postsServices} from "../domain/posts-services";
import {queryPostsRepositories} from "../repositories/posts/posts-query-repositories";
import {paginationQuery, PaginationViewModel} from "../helpers/pagination";
import {basicAuthorization} from "../middlewares/baseAuthorization-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {CreateCommentsModel} from "../model/comments/createCommentsModel";
import {commentsServices} from "../domain/comments-services";
import {commentsValidation} from "../validation/comments-validation";
import {CommentsDbOutputType} from "../types/commentsType";
import {queryCommentsRepositories} from "../repositories/comments/comments-query-repositories";


export const postsRouter = Router()

postsRouter.get("/", async (req: RequestWithQuery<QueryRequest>, res: Response<PaginationViewModel<PostsOutputType[]>>) => {

    const pagination = paginationQuery(req.query)

    const findPosts = await queryPostsRepositories.getPost(pagination)

    res.status(200).send(findPosts)

})
postsRouter.get("/:id", async (req: Request, res: Response<PostsOutputType>) => {
    const findPost = await queryPostsRepositories.findPost(req.params.id)
    if (findPost) {
        res.status(200).send(findPost)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post("/",

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

postsRouter.put("/:id",

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
postsRouter.delete("/:id",

    basicAuthorization,

    async (req: RequestWithParams<QueryPostModelType>, res: Response) => {
        if (await postsServices.deletePost(req.params.id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }),
    postsRouter.post("/:postId/comments",

        authorizationMiddleware,

        commentsValidation,

        async (req: RequestWithParamsAndBody<{ postId: string }, CreateCommentsModel>, res: Response) => {

            const postId = req.params.postId

            const post = await queryPostsRepositories.findPost(postId)
            if (!post) return res.sendStatus(404)

            const createComment = await commentsServices.createComment(req.body.content, req.user!, postId)

            if (createComment) {
                res.status(201).send(createComment)

            } else {
                res.sendStatus(404)
            }
        }
    ),

    postsRouter.get("/:postId/comments",

        async (req: RequestWithParamsAndQuery<{ postId: string }, QueryRequest>, res: Response<PaginationViewModel<CommentsDbOutputType[]>>) => {

            const pagination = paginationQuery(req.query)

            const postId = req.params.postId
            const post = await queryPostsRepositories.findPost(postId)
            if (!post) return res.sendStatus(404)

            const findComments = await queryCommentsRepositories.getComments(pagination, postId)

            res.status(200).send(findComments)
        }
    )


