import bcrypt from 'bcrypt'
import {usersRepositories} from "../repositories/users/users-repositories";
import {UserAuthRequest, UserRegistrationType} from "../types/usersType";

export const authServices = {

    async _generationHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },
    async checkCredentials(body: UserAuthRequest) {
        const user = await usersRepositories.findByLoginOrEmail(body.loginOrEmail)
        if (!user) return false

        const passwordHash = await this._generationHash(body.password, user.passwordSalt)
        if (user.passwordHash === passwordHash) {
            return user
        }
    },

    async createUser(body: UserRegistrationType) {
        const newUser = {

        }
    }

}
