import {usersCollection} from "../db";
import {UsersDbType} from "../../types/usersType";

export const  usersRepositories = {
    async createUser (newUser: UsersDbType): Promise<UsersDbType| null>  {

        const result = await usersCollection.insertOne(newUser)

        if (result.acknowledged) {
            return {
                id: newUser.id,
                login: newUser.login,
                email: newUser.email,
                password: newUser.password,
                createdAt: newUser.createdAt
            }
        } else {
            return null
        }
    },

    async deleteUser (id: string) {

        const result = await usersCollection.deleteOne({id: id})

        return result.deletedCount === 1
    }
}