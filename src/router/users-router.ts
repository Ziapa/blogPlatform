import {Response, Router} from "express";
import { queryUsersRepositories } from "../repositories/users/users-query-repositories";
import {usersServices} from "../domain/users-sevices";
import {RequestWithBody, RequestWithParams} from "../types/types";
import {UsersDbType, UsersOutputType} from "../types/usersType";
import {basicAuthorization} from "../middlewares/authorization-middleware";
import {QueryUsersModelType} from "../model/usersModel/queryUsersModel";

export const usersRouter = Router()

usersRouter.get("/",

    basicAuthorization,

    async (req, res: Response<UsersOutputType[]> ) => {
    const findUsers = await queryUsersRepositories.getUsers()
        console.log(findUsers)
    res.status(201).send(findUsers)

})

usersRouter.post("/",

    basicAuthorization,

    async (req:RequestWithBody<UsersDbType>, res) => {

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

    async (req:RequestWithParams<QueryUsersModelType>, res) => {

    const result = await usersServices.deleteUser(req.params.id)

        if (result) {
            res.sendStatus(204)
        } else  {
            res.sendStatus(404)
        }
    }
)
