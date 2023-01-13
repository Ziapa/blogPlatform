import {usersCollection} from "../db";

export const  queryUsersRepositories = {
   async getUsers () {

       return usersCollection.find({})
   }
}