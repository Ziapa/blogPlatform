import {usersCollection} from "../db";
import {UsersDbType, UsersOutputType} from "../../types/usersType";

export const  usersRepositories = {
    async createUser (newUser: UsersDbType): Promise<UsersOutputType| null>  {

        const result = await usersCollection.insertOne(newUser)

        if (result.acknowledged) {
            return {
                id: newUser.id,
                login: newUser.login,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        } else {
            return null
        }
    },

    async deleteUser (id: string) {

        const result = await usersCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async findByLoginOrEmail (loginOrEmail: string) {
        return await usersCollection.findOne({
            $or: [
                {email: loginOrEmail, $options: "i"},
                {login: loginOrEmail, $options: "i"}
            ]
        })
    }
}