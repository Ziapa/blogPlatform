import {usersCollection} from "./db";

export const  queryBlogsRepositories = {
   async getUsers () {

       return usersCollection.find({})
   }
}