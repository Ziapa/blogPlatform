import {Response, Router} from "express";
import {queryUsersRepositories} from "../repositories/users/users-query-repositories";
import {usersServices} from "../domain/users-sevices";
import {QueryRequest, RequestWithBody, RequestWithParams, RequestWithQuery} from "../types/types";
import {UserRequest, UsersOutputType} from "../types/usersType";
import {basicAuthorization, basicAuthorizationRequests} from "../middlewares/authorization-middleware";
import {QueryUsersModelType} from "../model/usersModel/queryUsersModel";
import {paginationQuery, PaginationViewModel} from "../helpers/pagination";
import {createUserValidation} from "../validation/users-validation";

export const usersRouter = Router()

usersRouter.get("/",

    basicAuthorizationRequests,

    createUserValidation,

// TODO
    async (req: RequestWithQuery<QueryRequest>, res: Response<PaginationViewModel<UsersOutputType[]>>) => {

        const pagination = paginationQuery(req.query)

        const findUsers = await queryUsersRepositories.getUsers(pagination)

        res.status(200).send(findUsers)

    })

usersRouter.post("/",

    basicAuthorization,

    async (req: RequestWithBody<UserRequest>, res) => {

        const result = await usersServices.crateUser(req.body)
        if (result) {
            res.status(201).send(result)
        } else {
            res.sendStatus(400)
        }
        return res
    })

usersRouter.delete("/:id",

    basicAuthorization,

    async (req: RequestWithParams<QueryUsersModelType>, res) => {

        const result = await usersServices.deleteUser(req.params.id)
        console.log(result)
        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
)
