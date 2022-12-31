import {blogsCollection, postsCollection} from "./db";


export const testingRepositories = {
    async deleteAll() {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})
        return true
    }
}