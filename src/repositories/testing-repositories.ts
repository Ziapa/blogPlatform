import {blogs} from "./blogs-repositories";


export const testingRepositories = {
    deleteAll() {
      return  blogs.splice(0)
    }
}