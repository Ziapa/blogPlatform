import {blogsCollection, postsCollection, usersCollection} from "./db";


export const testingRepositories = {
    async deleteAll() {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
        return true
    }
}