import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {BlogsType} from "../types/blogsTypes";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../types/types";
import {CreateBlogsModel} from "../model/blogsModel/createBlogsModel";
import {QueryBlogsModelType} from "../model/blogsModel/queryBlogsModel";
import {basicAuthorization} from "../middlewares/authorization-middleware";
import {createPostByUserIdValidation, createBlogValidation, updateBlogValidation} from "../validation/blogs-validation";
import {QueryPostModelType} from "../model/postsModel/queryPostModel";
import {
    CreateBlogByUserIdType,
} from "../model/postsModel/createPostModel";
import {postsRepositories} from "../repositories/posts-repositories";


export const blogsRouter = Router()

blogsRouter.get('/', async (req: Request, res: Response<BlogsType[]>) => {

    const findBlogs = await blogsRepositories.getBlogs()

    if (findBlogs) {
        res.status(200).send(findBlogs)
    } else {
        res.sendStatus(404)
    }

})
blogsRouter.get('/:id', async (req: RequestWithParams<QueryBlogsModelType>, res: Response<BlogsType>) => {

    const findBlog = await blogsRepositories.findBlog(req.params.id)

    if (findBlog) {
        res.status(200).send(findBlog)
    } else {
        res.sendStatus(404)
    }


})

blogsRouter.post('/',

    basicAuthorization,

    createBlogValidation,

    async (req: RequestWithBody<CreateBlogsModel>, res: Response) => {

        const newBlog = await blogsRepositories.crateBlog(req.body)
        if (newBlog) {
            res.status(201).send(newBlog)
        } else {
            res.sendStatus(401)
        }
    })
blogsRouter.put('/:id',

    basicAuthorization,

    updateBlogValidation,

    async (req: RequestWithParamsAndBody<QueryBlogsModelType, CreateBlogsModel>, res: Response) => {
        const updateBlog = await blogsRepositories.updateBlog(req.params.id, req.body)
        if (updateBlog) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
blogsRouter.delete('/:id',

    basicAuthorization,

    async (req: Request, res: Response) => {
        if (await blogsRepositories.deletedBlog(req.params.id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

// TODO
blogsRouter.post('/:id/posts',
    basicAuthorization,
    createPostByUserIdValidation,
    async (req: RequestWithParamsAndBody<QueryPostModelType, CreateBlogByUserIdType>, res: Response) => {
        const newPost = await postsRepositories.createPost(req.body, req.params.id)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.sendStatus(401)
        }
    }
)
blogsRouter.get('/:id/posts',
    async (req: RequestWithParams<QueryPostModelType>, res: Response) => {
        const findPostsByUserId = await postsRepositories.filterPostsByUserId(req.params.id)
        if (findPostsByUserId) {
            res.status(200).send(findPostsByUserId)
        } else {
            res.sendStatus(404)
        }
    }
)

