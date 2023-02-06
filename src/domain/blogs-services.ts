import {BlogsDbType, BlogsOutputType} from "../types/blogsTypes";
import {blogsRepositories} from "../repositories/blogs/blogs-repositories";
import {randomUUID} from "crypto";

export const blogsServices = {


    async crateBlog(body: { name: string, description: string, websiteUrl: string }): Promise<BlogsOutputType | null> {

        const newBlog: BlogsDbType = {
            id: randomUUID(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            isMembership: false,
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