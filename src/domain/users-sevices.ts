import {v4 as uuidV4} from "uuid"
import bcrypt from 'bcrypt'
import {usersRepositories} from "../repositories/users/users-repositories";
import {UserRequest} from "../types/usersType";

export const usersServices = {

    async _generationHash(password: string, salt: string) {
        return  await bcrypt.hash(password, salt)
    },

    async crateUser(body: UserRequest) {


        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generationHash(body.password, passwordSalt)


        const newUser = {
            id: uuidV4(),
            login: body.login,
            email: body.email,
            passwordSalt,
            passwordHash,
            createdAt: new Date().toISOString()
        }

        return await usersRepositories.createUser(newUser)

    },

    async deleteUser(id: string): Promise<boolean | undefined> {
        return await usersRepositories.deleteUser(id)
    }

}
