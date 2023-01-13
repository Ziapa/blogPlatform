import {UsersDbType} from "../types/usersType";
import {usersRepositories} from "../repositories/users/users-repositories";

export const usersServices = {


    async crateUser(body: UsersDbType) {


        const newUser = {
            login: body.login,
            email: body.email,
            password: body.password,
            createdAt: new Date().toISOString()
        }

         return await usersRepositories.createUser(newUser)

    }

}
