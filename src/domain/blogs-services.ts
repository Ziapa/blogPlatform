import {BlogsType} from "../types/blogsTypes";
import {InsertOneResult, WithId} from "mongodb";
import {blogsRepositories} from "../repositories/blogs-repositories";
import { v4 as uuidV4 } from 'uuid';

export const blogsServices = {

    async getBlogs(): Promise<BlogsType[]> {
        return await blogsRepositories.getBlogs()
    },

    async findBlog(id: string | undefined): Promise<WithId<BlogsType> | null> {
        return await blogsRepositories.findBlog(id)
    },

    async crateBlog(body: { name: string, description: string, websiteUrl: string }): Promise<InsertOneResult<BlogsType>> {


        const newBlog = {
            id: uuidV4.toString(),
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