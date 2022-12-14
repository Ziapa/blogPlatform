import {blogs} from "./blogs-repositories";
import { posts } from "./posts-repositories";


export const testingRepositories = {
    deleteAll() {
        blogs.splice(0)
        posts.splice(0)
        return true
    }
}