import {BlogsOutputType} from "../types/blogsTypes";
import {ObjectId} from "mongodb";
import {blogsRepositories} from "../repositories/blogs-repositories";

export const blogsServices = {

    async getBlogs(): Promise<BlogsOutputType[]> {
        return await blogsRepositories.getBlogs()
    },

    async findBlog(id: string | undefined): Promise<BlogsOutputType | null> {
        return await blogsRepositories.findBlog(id)
    },

    async crateBlog(body: { name: string, description: string, websiteUrl: string }): Promise<BlogsOutputType> {


        const newBlog = {
            _id: ObjectId,
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