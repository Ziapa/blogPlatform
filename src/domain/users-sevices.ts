import {v4 as uuidV4} from "uuid"
import bcrypt from 'bcrypt'
import {usersRepositories} from "../repositories/users/users-repositories";
import {UserAuthRequest, UserRequest} from "../types/usersType";

export const usersServices = {

    async _generationHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },
    async checkCredentials(body: UserAuthRequest) {
        const user = await usersRepositories.findByLoginOrEmail(body.loginOrEmail)
        if (!user) return false

        const passwordHash = await this._generationHash(body.password, user.passwordSalt)
        return user.passwordHash === passwordHash;

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
