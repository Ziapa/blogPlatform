import {usersCollection} from "../db";
import {UsersDbType, UsersOutputType} from "../../types/usersType";

export const  queryUsersRepositories = {

    mapUserToViewType(user: UsersDbType): UsersOutputType {
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        }
    },

   async getUsers () {

       const users = await usersCollection.find({}).toArray()
       // return users.map(el => {this.mapUserToViewType(el)})
return users.map(el => {
    return {
        id: el.id,
        login: el.login,
        email: el.email,
        createdAt: el.createdAt
    }
})
   }
}