import {BlogsOutputType} from "../types/blogsTypes";
import { v4 as uuidV4 } from 'uuid'
import {blogsRepositories} from "../repositories/blogs-repositories";

export const blogsServices = {


    async crateBlog(body: { name: string, description: string, websiteUrl: string }): Promise<BlogsOutputType | null > {

        const newBlog = {
            id: uuidV4(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString()
        }
        return await blogsRepositories.crateBlog(newBlog)
    },


    async updateBlog(id: string, body: { name: string, description: string, websiteUrl: string }): Promise<boolean> {

        return await blogsRepositories.updateBlog(id, body)

    },


    async deletedBlog(id: string): Promise<boolean | undefined> {

        return await blogsRepositories.deletedBlog(id)

    }
}