import {Request, Response, Router} from "express";
import {BlogsOutputType} from "../types/blogsTypes";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types/types";
import {CreateBlogsModel} from "../model/blogsModel/createBlogsModel";
import {QueryBlogsModelType} from "../model/blogsModel/queryBlogsModel";
import {basicAuthorization} from "../middlewares/authorization-middleware";
import {createPostByUserIdValidation, createBlogValidation, updateBlogValidation} from "../validation/blogs-validation";
import {QueryPostModelType} from "../model/postsModel/queryPostModel";
import {
    CreateBlogByUserIdType,
} from "../model/postsModel/createPostModel";
import {blogsServices} from "../domain/blogs-services";
import {postsServices} from "../domain/posts-services";
import {queryBlogsRepositories} from "../repositories/blogs-query-repositories";
import {queryPostsRepositories} from "../repositories/posts-query-repositories";

type queryRequest = {
    searchNameTerm: string | null
    sortDirection: "asc" | "desc"
    pageNumber: number
    pageSize: number
    sortBy: string
}


export const blogsRouter = Router()

blogsRouter.get('/', async (req: RequestWithQuery<queryRequest>, res: Response<BlogsOutputType[]>) => {
    console.log(req.query.sortDirection)
    const pageSize = +req.query.pageSize || 10
    const pageNumber = +req.query.pageNumber || 1
    const sortDirection = req.query.sortDirection === "asc" ? "asc" : "desc"
    const searchNameTerm = req.query.searchNameTerm || null
    const sortBy = req.query.sortBy || "createdAt"
    console.log(sortDirection)


    const findBlogs = await queryBlogsRepositories.getBlogs(searchNameTerm, sortDirection,
        pageNumber, pageSize, sortBy)

    if (findBlogs) {
        res.status(200).send(findBlogs)
    } else {
        res.sendStatus(404)
    }

})
blogsRouter.get('/:id', async (req: RequestWithParams<QueryBlogsModelType>, res: Response<BlogsOutputType>) => {

    const findBlog = await queryBlogsRepositories.findBlog(req.params.id)

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

        const newBlog = await blogsServices.crateBlog(req.body)
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
        const updateBlog = await blogsServices.updateBlog(req.params.id, req.body)
        if (updateBlog) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
blogsRouter.delete('/:id',

    basicAuthorization,

    async (req: Request, res: Response) => {
        if (await blogsServices.deletedBlog(req.params.id)) {
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
        console.log('ya tut')
        const newPost = await postsServices.createPost(req.body, req.params.id)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.sendStatus(404)
        }
    }
)
blogsRouter.get('/:id/posts',
    async (req: RequestWithParams<QueryPostModelType>, res: Response) => {
        const findPostsByBlogId = await queryPostsRepositories.filterPostsByBlogId(req.params.id)
        if (findPostsByBlogId) {
            res.status(200).send(findPostsByBlogId)
        } else {
            res.sendStatus(404)
        }
    }
)

