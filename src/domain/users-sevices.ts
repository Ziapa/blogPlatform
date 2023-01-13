import {UsersDbType} from "../types/usersType";
import { v4 as uuidV4 } from "uuid"
import {usersRepositories} from "../repositories/users/users-repositories";

export const usersServices = {


    async crateUser(body: UsersDbType) {


        const newUser = {
            id: uuidV4(),
            login: body.login,
            email: body.email,
            password: body.password,
            createdAt: new Date().toISOString()
        }

         return await usersRepositories.createUser(newUser)

    }

}
