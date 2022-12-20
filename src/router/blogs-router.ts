import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {blogsType} from "../types/blogsTypes";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../types/types";
import {CreateBlogsModel} from "../model/blogsModel/createBlogsModel";
import {QueryBlogsModelType} from "../model/blogsModel/queryBlogsModel";
import {authorization} from "../middlewares/authorization-middleware";


export const blogsRouter = Router()

blogsRouter.get('/', (req: Request, res: Response<blogsType[] | blogsType>) => {

    const findBlogs = blogsRepositories.findBlog()

    if (findBlogs) {
        res.status(200).send(findBlogs)
    }

})
blogsRouter.get('/:id', (req: RequestWithParams<QueryBlogsModelType>, res: Response<blogsType[] | blogsType>) => {

    const findBlog = blogsRepositories.findBlog(req.params.id)

    if (findBlog) {
        res.status(200).send(findBlog)
    } else {
        res.sendStatus(404)
    }


})
blogsRouter.post('/',

    authorization,

    (req: RequestWithBody<CreateBlogsModel | any>, res: Response) => {

    const newBlog = blogsRepositories.crateBlog(req.body)
    if (newBlog) {
        res.status(201).send(newBlog)
    } else {
        res.sendStatus(400)
    }
})
blogsRouter.put('/:id',

    authorization,

    (req: RequestWithParamsAndBody<QueryBlogsModelType, CreateBlogsModel>, res: Response) => {
    const updateBlog = blogsRepositories.updateBlog(req.params.id, req.body)
    if (updateBlog) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
blogsRouter.delete('/:id',

    authorization,

    (req: Request, res: Response) => {
    if (blogsRepositories.deletedBlog(req.params.id)) {
        res.sendStatus(204)
    } else  {
        res.sendStatus(404)
    }
} )

