import { Router} from "express";
import { queryUsersRepositories } from "../repositories/users/users-query-repositories";
import {usersServices} from "../domain/users-sevices";
import {RequestWithBody} from "../types/types";
import {UsersDbType} from "../types/usersType";
import {basicAuthorization} from "../middlewares/authorization-middleware";

export const usersRouter = Router()

usersRouter.get("/",

    basicAuthorization,

    async (req, res ) => {
    const findUsers = await queryUsersRepositories.getUsers()
        console.log(findUsers)
    res.status(200).send(findUsers)

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
