import { Router} from "express";
import {queryBlogsRepositories} from "../repositories/users-query-repositories";

export const usersRouter = Router()

usersRouter.get("/", async () => {
    await queryBlogsRepositories.getUsers()

})
